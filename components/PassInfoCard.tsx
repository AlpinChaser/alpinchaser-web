"use client";

import { useState } from "react";
import Link from "next/link";
import { Pass } from "@/types/pass";

const APP_STORE_URL =
  "https://apps.apple.com/at/app/alpinchaser/id6761077147";

interface Props {
  pass: Pass;
  onClose: () => void;
  isLocallyRidden: boolean;
  onMarkRidden: (id: string) => void;
}

const FLAG: Record<string, string> = {
  AT: "🇦🇹", CH: "🇨🇭", IT: "🇮🇹", FR: "🇫🇷", DE: "🇩🇪", SLO: "🇸🇮",
  "AT-IT": "🇦🇹🇮🇹", "CH-IT": "🇨🇭🇮🇹", "FR-IT": "🇫🇷🇮🇹",
  "CH-FR": "🇨🇭🇫🇷", "AT-DE": "🇦🇹🇩🇪", "CH-FL": "🇨🇭🇱🇮",
};

function AppCTAButton({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="relative group">
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.4)",
        }}
        onMouseOver={e => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
          (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
        }}
        onMouseOut={e => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
          (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
        }}
      >
        <span>{icon}</span>
        <span>{label}</span>
      </a>
      {/* Tooltip */}
      <div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg text-[10px] font-mono whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{
          background: "rgba(10,10,13,0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.5)",
          zIndex: 10,
        }}
      >
        Verfügbar in der App
      </div>
    </div>
  );
}

export default function PassInfoCard({ pass, onClose, isLocallyRidden, onMarkRidden }: Props) {
  const [bursting, setBursting] = useState(false);

  const handleMarkRidden = () => {
    if (isLocallyRidden) return;
    setBursting(true);
    onMarkRidden(pass.id);
    setTimeout(() => setBursting(false), 700);
  };
  const passFlag = FLAG[pass.country] ?? "🏔️";
  const isRidden = pass.status === "gefahren";
  const score = parseFloat(pass.ride_score);
  const scoreColor = score >= 4.0 ? "#D4AF37" : "#39FF14";
  const scoreGlow = score >= 4.0 ? "0 0 14px #D4AF3760" : "0 0 14px #39FF1460";

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "rgba(6,6,8,0.95)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.05)",
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
      }}
    >
      {/* Gold accent line */}
      <div style={{ height: 2, background: "linear-gradient(90deg,#D4AF37 0%,#D4AF3760 50%,transparent 100%)", flexShrink: 0 }} />

      <div className="p-5 flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-base leading-none">{passFlag}</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.28)" }}>
                {pass.region}
              </span>
              {isRidden && (
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.22)" }}
                >
                  ✓ {pass.year ?? "Gefahren"}
                </span>
              )}
            </div>
            <h2 className="text-[15px] font-semibold leading-snug text-white pr-2">{pass.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg leading-none transition-colors"
            style={{ color: "rgba(255,255,255,0.28)", background: "rgba(255,255,255,0.04)" }}
            onMouseOver={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)")}
            onMouseOut={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.28)")}
          >×</button>
        </div>

        {/* Elevation + Score */}
        <div className="flex items-end gap-6">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Höhe</div>
            <div className="text-3xl font-bold font-mono leading-none" style={{ color: "#39FF14", textShadow: "0 0 20px #39FF1450" }}>
              {pass.elevation.toLocaleString()}
              <span className="text-sm font-normal ml-1" style={{ color: "rgba(255,255,255,0.3)" }}>m</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Score</div>
            <div className="text-xl font-bold font-mono" style={{ color: scoreColor, textShadow: scoreGlow }}>
              ★ {score.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Hero claim */}
        <p className="text-[12px] italic leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
          &ldquo;{pass.heroClaim}&rdquo;
        </p>

        <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

        {/* Must-ride description (short) */}
        <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
          {pass.mustRideDescription}
        </p>

        {/* ── Locked content teaser ── */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.09)" }}
        >
          {/* Blurred preview rows */}
          <div className="px-3 pt-3 pb-2 flex flex-col gap-2.5" style={{ background: "rgba(255,255,255,0.025)" }}>
            {[
              [14, 60], [22, 45], [18, 55], [12, 70], [20, 40],
            ].map(([w, flex], i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="h-2 rounded-full shrink-0" style={{ width: `${w}%`, background: "rgba(255,255,255,0.14)" }} />
                <div className="h-2 rounded-full" style={{ flex: 1, background: "rgba(255,255,255,0.08)", filter: "blur(1.5px)" }} />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="px-3 py-3 flex flex-col gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(8,8,11,0.7)" }}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base leading-none">🔒</span>
              <div>
                <div className="text-[12px] font-semibold text-white">Alle Details freischalten</div>
                <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.32)" }}>
                  Beste Anfahrt · Bewertungen · Insider-Tipps
                </div>
              </div>
            </div>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ac-app-cta-btn flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.08))",
                border: "1px solid rgba(212,175,55,0.45)",
                color: "#D4AF37",
              }}
            >
              <span className="text-sm">📱</span>
              In der App ansehen
            </a>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          {/* Detail page link */}
          <Link
            href={`/pass/${pass.id}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150"
            style={{
              background: "rgba(57,255,20,0.06)",
              border: "1px solid rgba(57,255,20,0.2)",
              color: "rgba(57,255,20,0.75)",
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(57,255,20,0.45)";
              (e.currentTarget as HTMLElement).style.color = "#39FF14";
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(57,255,20,0.2)";
              (e.currentTarget as HTMLElement).style.color = "rgba(57,255,20,0.75)";
            }}
          >
            <span>Alle Details</span>
            <span style={{ fontSize: 10 }}>→</span>
          </Link>

          {/* Functional "ridden" button */}
          <button
            onClick={handleMarkRidden}
            disabled={isLocallyRidden}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${bursting ? "ac-gold-burst" : ""}`}
            style={
              isLocallyRidden
                ? {
                    background: "rgba(212,175,55,0.12)",
                    border: "1px solid rgba(212,175,55,0.4)",
                    color: "#D4AF37",
                    cursor: "default",
                  }
                : {
                    background: "rgba(212,175,55,0.07)",
                    border: "1px solid rgba(212,175,55,0.25)",
                    color: "rgba(212,175,55,0.7)",
                  }
            }
            onMouseOver={e => {
              if (!isLocallyRidden) {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.55)";
                (e.currentTarget as HTMLElement).style.color = "#D4AF37";
              }
            }}
            onMouseOut={e => {
              if (!isLocallyRidden) {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.25)";
                (e.currentTarget as HTMLElement).style.color = "rgba(212,175,55,0.7)";
              }
            }}
          >
            <span>{isLocallyRidden ? "✓" : "○"}</span>
            <span>{isLocallyRidden ? "Gefahren!" : "Als gefahren markieren"}</span>
          </button>
          <AppCTAButton label="Merken" icon="♥" />
          <AppCTAButton label="Route planen" icon="🗺️" />
        </div>
      </div>
    </div>
  );
}
