"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AndroidWaitlistModal } from "@/components/HeroSection";
import { Pass } from "@/types/pass";

const APP_STORE_URL =
  "https://apps.apple.com/at/app/alpinchaser/id6761077147";

const APPLE_PATH =
  "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z";

const ANDROID_ICON_PATH =
  "M10 3h4l1 2H9l1-2zm8.6 7.48 1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.4 11.4 0 0 0-8.94 0L5.65 6.67c-.18-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18A9.45 9.45 0 0 0 4.5 15.5h15a9.45 9.45 0 0 0-1.9-5.02zM8 17h1.5v3H8v-3zm6.5 0H16v3h-1.5v-3z";

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
  const [showPlatforms, setShowPlatforms] = useState(false);
  const [showAndroidModal, setShowAndroidModal] = useState(false);
  const platformDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPlatforms) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const el = platformDropdownRef.current;
      if (el && !el.contains(e.target as Node)) {
        setShowPlatforms(false);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [showPlatforms]);

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
          className="rounded-xl overflow-visible"
          style={{ border: "1px solid rgba(255,255,255,0.09)" }}
        >
          {/* Blurred preview rows */}
          <div className="overflow-hidden rounded-t-xl px-3 pt-3 pb-2 flex flex-col gap-2.5" style={{ background: "rgba(255,255,255,0.025)" }}>
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
            className="relative overflow-visible rounded-b-xl px-3 py-3 flex flex-col gap-3"
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
            <div ref={platformDropdownRef} className="relative w-full">
              {showPlatforms ? (
                <div
                  className="absolute bottom-full left-0 right-0 z-[100] mb-2 overflow-hidden rounded-xl border border-[rgba(212,175,55,0.42)] bg-[rgba(15,15,18,0.98)] shadow-[0_-12px_32px_rgba(0,0,0,0.55)] backdrop-blur-md"
                  role="menu"
                  aria-label="App herunterladen"
                >
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    className="flex items-center gap-2.5 px-3 py-2.5 text-left text-xs font-semibold text-[#F0F0F5] transition-colors hover:bg-white/5"
                    onClick={() => setShowPlatforms(false)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="shrink-0 text-[#D4AF37]"
                      aria-hidden
                    >
                      <path d={APPLE_PATH} />
                    </svg>
                    iOS – App Store
                  </a>
                  <div className="h-px bg-[rgba(212,175,55,0.28)]" aria-hidden />
                  <a
                    href="#"
                    role="menuitem"
                    className="flex items-center gap-2.5 px-3 py-2.5 text-left text-xs font-semibold text-[#F0F0F5] transition-colors hover:bg-white/5"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPlatforms(false);
                      setShowAndroidModal(true);
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="shrink-0 text-[#D4AF37]"
                      aria-hidden
                    >
                      <path d={ANDROID_ICON_PATH} />
                    </svg>
                    Android – Google Play
                  </a>
                </div>
              ) : null}
              <button
                type="button"
                aria-expanded={showPlatforms}
                aria-haspopup="menu"
                onClick={() => setShowPlatforms((v) => !v)}
                className="ac-app-cta-btn flex w-full cursor-pointer items-center justify-center gap-2 border-0 py-3 font-[inherit] text-xs font-bold uppercase tracking-widest transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.08))",
                  border: "1px solid rgba(212,175,55,0.45)",
                  color: "#D4AF37",
                  borderRadius: 12,
                }}
              >
                <span className="text-sm">📱</span>
                In der App ansehen
              </button>
            </div>
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
      <AndroidWaitlistModal
        isOpen={showAndroidModal}
        onClose={() => setShowAndroidModal(false)}
      />
    </div>
  );
}
