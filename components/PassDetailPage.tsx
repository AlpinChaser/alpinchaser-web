"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Pass } from "@/types/pass";
import { useRiddenState } from "@/hooks/useRiddenState";

const PassMiniMap = dynamic(() => import("./PassMiniMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center" style={{ background: "#0A0A0B", minHeight: 320 }}>
      <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: "#D4AF3740", borderTopColor: "#D4AF37" }} />
    </div>
  ),
});

const APP_STORE_URL =
  "https://apps.apple.com/at/app/alpinchaser/id6761077147";
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.alpinchaser.app";

const FLAG: Record<string, string> = {
  AT: "🇦🇹", CH: "🇨🇭", IT: "🇮🇹", FR: "🇫🇷", DE: "🇩🇪", SLO: "🇸🇮",
  "AT-IT": "🇦🇹🇮🇹", "CH-IT": "🇨🇭🇮🇹", "FR-IT": "🇫🇷🇮🇹",
  "CH-FR": "🇨🇭🇫🇷", "AT-DE": "🇦🇹🇩🇪", "CH-FL": "🇨🇭🇱🇮",
};

function distKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function RatingBar({ label, value }: { label: string; value: number }) {
  const pct = Math.min(100, (value / 5) * 100);
  const color = value >= 4 ? "#D4AF37" : value >= 3 ? "#39FF14" : "#666688";
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.35)" }}>
          {label}
        </span>
        <span className="text-[11px] font-mono font-bold" style={{ color }}>
          {value.toFixed(1)}
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}60` }}
        />
      </div>
    </div>
  );
}

function NearbyCard({ pass }: { pass: Pass }) {
  const score = parseFloat(pass.ride_score);
  const scoreColor = score >= 4 ? "#D4AF37" : "#39FF14";
  const passFlag = FLAG[pass.country] ?? "🏔️";

  return (
    <Link
      href={`/pass/${pass.id}`}
      className="shrink-0 flex flex-col gap-2 p-3 rounded-xl transition-all duration-150"
      style={{
        width: 160,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      onMouseOver={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.16)";
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
      }}
      onMouseOut={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
      }}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="text-base leading-none">{passFlag}</span>
        <span className="text-[11px] font-mono font-bold" style={{ color: scoreColor }}>★{score.toFixed(1)}</span>
      </div>
      <div className="text-[12px] font-semibold leading-tight text-white line-clamp-2">{pass.name}</div>
      <div className="text-[11px] font-mono font-bold" style={{ color: "#39FF14" }}>
        {pass.elevation.toLocaleString()}m
      </div>
    </Link>
  );
}

interface Props {
  pass: Pass;
  allPasses: Pass[];
}

export default function PassDetailPage({ pass, allPasses }: Props) {
  const { riddenIds, markAsRidden } = useRiddenState();
  const isRidden = pass.status === "gefahren" || riddenIds.has(pass.id);
  const score = parseFloat(pass.ride_score);
  const scoreColor = score >= 4 ? "#D4AF37" : "#39FF14";
  const passFlag = FLAG[pass.country] ?? "🏔️";

  // Alternate hero photo based on pass id hash
  const heroPhoto = useMemo(() => {
    const hash = pass.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return hash % 2 === 0 ? "/images/pass_photo_1.jpg" : "/images/pass_photo_2.jpg";
  }, [pass.id]);

  const nearby = useMemo(() =>
    allPasses
      .filter(p => p.id !== pass.id)
      .map(p => ({ pass: p, dist: distKm(pass.lat, pass.lon, p.lat, p.lon) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 8)
      .map(({ pass }) => pass),
  [pass, allPasses]);

  const highlights = [pass.highlight_1, pass.highlight_2, pass.highlight_3].filter(Boolean);
  const cautions = [pass.caution_1, pass.caution_2, pass.caution_3].filter(Boolean);

  return (
    <div style={{ background: "#0A0A0B", minHeight: "100vh", color: "#f0f0f5" }}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div
        className="relative flex flex-col justify-end overflow-hidden"
        style={{ minHeight: "40vh", paddingBottom: "3rem", background: "#0A0A0B" }}
      >
        {/* Hero photo */}
        <Image
          src={heroPhoto}
          alt={pass.name}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
        />

        {/* Cinematic overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(to bottom, rgba(10,10,11,0.35) 0%, rgba(10,10,11,0.25) 30%, rgba(10,10,11,0.65) 70%, rgba(10,10,11,0.97) 100%)",
        }} />

        {/* Neon accent grade */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 50% 40% at 20% 70%, rgba(57,255,20,0.05) 0%, transparent 65%)",
        }} />

        {/* Bottom fade to page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{
          background: "linear-gradient(to bottom, transparent, #0A0A0B)",
        }} />

        <div className="relative max-w-5xl mx-auto w-full px-5 sm:px-8 flex flex-col gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
            <Link href="/" className="transition-colors hover:text-white/70">Home</Link>
            <span>/</span>
            <Link href="/#map" className="transition-colors hover:text-white/70">Pässe</Link>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>{pass.name}</span>
          </div>

          {/* Name + flag */}
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-2xl">{passFlag}</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.3)" }}>
                {pass.region}
              </span>
              {isRidden && (
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.25)" }}
                >
                  ✓ Gefahren{pass.year ? ` ${pass.year}` : ""}
                </span>
              )}
            </div>
            <h1
              className="font-bold leading-tight tracking-tight"
              style={{ fontSize: "clamp(32px, 6vw, 52px)", color: "#ffffff", textShadow: "0 2px 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.6)" }}
            >
              {pass.name}
            </h1>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-3xl font-bold font-mono" style={{ color: "#39FF14", textShadow: "0 0 16px #39FF1450" }}>
                {pass.elevation.toLocaleString()}
              </span>
              <span className="text-sm font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>m</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold font-mono" style={{ color: scoreColor, textShadow: `0 0 12px ${scoreColor}60` }}>
                ★ {score.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Hero claim */}
          <p className="text-[13px] sm:text-sm italic max-w-xl" style={{ color: "rgba(255,255,255,0.45)" }}>
            &ldquo;{pass.heroClaim}&rdquo;
          </p>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Mini Map ── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              height: 380,
              position: "relative",
            }}
          >
            <PassMiniMap passId={pass.id} lat={pass.lat} lon={pass.lon} isRidden={isRidden} />
          </div>

          {/* ── Details panel ── */}
          <div className="flex flex-col gap-5">

            {/* Must-ride description */}
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                {pass.mustRideDescription}
              </p>
            </div>

            {/* Beste Anfahrt */}
            <div
              className="rounded-xl p-4 flex flex-col gap-2"
              style={{ background: "rgba(57,255,20,0.04)", border: "1px solid rgba(57,255,20,0.12)" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">🧭</span>
                <span className="text-[11px] font-mono uppercase tracking-[0.15em] font-bold" style={{ color: "rgba(57,255,20,0.7)" }}>
                  Beste Anfahrt
                </span>
                <span
                  className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(57,255,20,0.1)", color: "#39FF14", border: "1px solid rgba(57,255,20,0.2)" }}
                >
                  {pass.bestApproachSide}
                </span>
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {pass.bestApproachReason}
              </p>
            </div>

            {/* Ratings */}
            <div
              className="rounded-xl p-4 flex flex-col gap-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <span className="text-[11px] font-mono uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.25)" }}>
                Bewertungen
              </span>
              <RatingBar label="Landschaft" value={pass.rating_scenery} />
              <RatingBar label="Flow" value={pass.rating_flow} />
              <RatingBar label="Technik" value={pass.rating_technique} />
              <RatingBar label="Straße" value={pass.rating_road} />
              <RatingBar label="Verkehr" value={pass.rating_traffic} />
              <RatingBar label="Bekanntheit" value={pass.rating_popularity} />
            </div>

            {/* Mark as ridden */}
            <button
              onClick={() => !isRidden && markAsRidden(pass.id)}
              disabled={isRidden}
              className="w-full py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200"
              style={
                isRidden
                  ? { background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37", cursor: "default" }
                  : { background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.25)", color: "rgba(212,175,55,0.7)" }
              }
              onMouseOver={e => {
                if (!isRidden) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.55)";
                  (e.currentTarget as HTMLElement).style.color = "#D4AF37";
                }
              }}
              onMouseOut={e => {
                if (!isRidden) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.25)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(212,175,55,0.7)";
                }
              }}
            >
              {isRidden ? "✓ Gefahren!" : "Als gefahren markieren"}
            </button>
          </div>
        </div>

        {/* ── Highlights + Cautions ──────────────────────────────────── */}
        {(highlights.length > 0 || cautions.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
            {highlights.length > 0 && (
              <div
                className="rounded-xl p-5 flex flex-col gap-3"
                style={{ background: "rgba(57,255,20,0.04)", border: "1px solid rgba(57,255,20,0.1)" }}
              >
                <span className="text-[11px] font-mono uppercase tracking-[0.15em] font-bold" style={{ color: "rgba(57,255,20,0.6)" }}>
                  ✓ Highlights
                </span>
                <ul className="flex flex-col gap-2">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                      <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "#39FF14" }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {cautions.length > 0 && (
              <div
                className="rounded-xl p-5 flex flex-col gap-3"
                style={{ background: "rgba(255,140,0,0.04)", border: "1px solid rgba(255,140,0,0.12)" }}
              >
                <span className="text-[11px] font-mono uppercase tracking-[0.15em] font-bold" style={{ color: "rgba(255,140,0,0.7)" }}>
                  ⚠ Achtung
                </span>
                <ul className="flex flex-col gap-2">
                  {cautions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                      <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "#FF8C00" }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── App CTA Banner ────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-10">
        <div
          className="relative rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 overflow-hidden"
          style={{ border: "1px solid rgba(212,175,55,0.25)" }}
        >
          {/* CTA background image */}
          <Image
            src="/images/pass_ambient_2.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, rgba(10,10,11,0.88) 0%, rgba(10,10,11,0.75) 50%, rgba(10,10,11,0.88) 100%)",
          }} />
          {/* Gold tint */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 70% 80% at 30% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)",
          }} />
          <div className="relative z-10 flex-1 text-center sm:text-left">
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] mb-2" style={{ color: "rgba(212,175,55,0.6)" }}>
              AlpinChaser Pro
            </div>
            <h2 className="text-[18px] font-bold text-white mb-1">
              Erlebe den {pass.name} mit AlpinChaser
            </h2>
            <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
              Routen planen, Pässe tracken, Insider-Tipps entdecken.
            </p>
          </div>
          <div className="relative z-10 flex flex-col gap-2.5 w-full sm:w-auto">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.22), rgba(212,175,55,0.1))",
                border: "1px solid rgba(212,175,55,0.5)",
                color: "#D4AF37",
                whiteSpace: "nowrap",
              }}
              onMouseOver={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(212,175,55,0.25)")}
              onMouseOut={e => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              In der App ansehen
            </a>
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                whiteSpace: "nowrap",
              }}
              onMouseOver={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)")}
              onMouseOut={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
                <path d="M3.18 23.76a2 2 0 0 0 2.05-.22l11.62-6.7-2.5-2.52zM1.5 1.47A2 2 0 0 0 1 3v18a2 2 0 0 0 .5 1.53l.07.07 10.08-10.09v-.23zm20.56 8.17L19.4 7.93l-2.8 2.8 2.8 2.82 1.68-.97a2.02 2.02 0 0 0 0-2.94zM5.23.46a2 2 0 0 0-2.05-.22L14.35 12.54l-2.5 2.52z"/>
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </div>

      {/* ── Nearby passes ──────────────────────────────────────────────── */}
      {nearby.length > 0 && (
        <div className="relative overflow-hidden">
          {/* Section background */}
          <Image
            src="/images/hero_ambient.png"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 60%" }}
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(10,10,11,0.92) 0%, rgba(10,10,11,0.8) 50%, rgba(10,10,11,0.95) 100%)",
          }} />

          <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-10 pb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold" style={{ color: "rgba(255,255,255,0.3)" }}>
                Pässe in der Nähe
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {nearby.map(p => (
                <NearbyCard key={p.id} pass={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
