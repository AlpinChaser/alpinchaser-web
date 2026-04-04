"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Pass } from "@/types/pass";

// ── Helpers ────────────────────────────────────────────────────────────────────

const FLAG: Record<string, string> = {
  AT: "🇦🇹", CH: "🇨🇭", IT: "🇮🇹", FR: "🇫🇷", DE: "🇩🇪", SLO: "🇸🇮",
  "AT-IT": "🇦🇹🇮🇹", "CH-IT": "🇨🇭🇮🇹", "FR-IT": "🇫🇷🇮🇹",
  "CH-FR": "🇨🇭🇫🇷", "AT-DE": "🇦🇹🇩🇪", "CH-FL": "🇨🇭🇱🇮",
};
const flag = (country: string) => FLAG[country] ?? "🏔️";

// ── Filter Upsell Modal ────────────────────────────────────────────────────────

function FilterModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl p-6 flex flex-col gap-5"
        style={{
          background: "rgba(10,10,13,0.97)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(57,255,20,0.08)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-lg"
          style={{ color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.05)" }}
        >×</button>

        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl mx-auto"
          style={{ background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.2)" }}>
          <span className="text-2xl">🔓</span>
        </div>

        {/* Text */}
        <div className="text-center flex flex-col gap-2">
          <h3 className="text-base font-bold text-white">Filter &amp; Sortierung</h3>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            Filtere nach Land, Höhe, Bewertung und mehr —
            verfügbar mit <span style={{ color: "#39FF14", fontWeight: 600 }}>AlpinChaser Pro</span>.
          </p>
        </div>

        {/* App Store Buttons */}
        <div className="flex flex-col gap-2.5">
          <a
            href="#"
            className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f0f0f5",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            App Store — iOS
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f0f0f5",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
              <path d="M3.18 23.76a2 2 0 0 0 2.05-.22l11.62-6.7-2.5-2.52zM1.5 1.47A2 2 0 0 0 1 3v18a2 2 0 0 0 .5 1.53l.07.07 10.08-10.09v-.23zm20.56 8.17L19.4 7.93l-2.8 2.8 2.8 2.82 1.68-.97a2.02 2.02 0 0 0 0-2.94zM5.23.46a2 2 0 0 0-2.05-.22L14.35 12.54l-2.5 2.52z"/>
            </svg>
            Google Play — Android
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>oder</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        </div>

        <button
          className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: "rgba(57,255,20,0.08)",
            border: "1px solid rgba(57,255,20,0.25)",
            color: "#39FF14",
          }}
        >
          Bereits Pro? Anmelden
        </button>
      </div>
    </div>
  );
}

// ── Pass Card ──────────────────────────────────────────────────────────────────

function PassCard({ pass, selected, onClick }: { pass: Pass; selected: boolean; onClick: () => void }) {
  const score = parseFloat(pass.ride_score);
  const isRidden = pass.status === "gefahren";

  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150"
      style={{
        background: selected ? "rgba(57,255,20,0.07)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${selected ? "rgba(57,255,20,0.35)" : "rgba(255,255,255,0.045)"}`,
        boxShadow: selected ? "0 0 18px rgba(57,255,20,0.1)" : "none",
      }}
    >
      {/* Name + score */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <span
          className="text-[13px] font-semibold leading-tight"
          style={{ color: selected ? "#f0f0f5" : "#b8b8cc" }}
        >
          {pass.name}
        </span>
        <span
          className="text-[11px] font-mono font-bold shrink-0"
          style={{ color: score >= 4 ? "#D4AF37" : score >= 3 ? "#39FF14" : "#66668a" }}
        >
          ★{score.toFixed(1)}
        </span>
      </div>

      {/* Elevation + flag + ridden badge */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] font-mono font-semibold" style={{ color: "#39FF14" }}>
          {pass.elevation.toLocaleString()}m
        </span>
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
        <span className="text-sm leading-none">{flag(pass.country)}</span>
        {isRidden && (
          <>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span className="text-[10px] font-mono font-bold" style={{ color: "#D4AF37" }}>✓</span>
          </>
        )}
      </div>
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  passes: Pass[];
  selectedPass: Pass | null;
  onSelectPass: (pass: Pass | null) => void;
}

export default function PassListPanel({ passes, selectedPass, onSelectPass }: Props) {
  const [search, setSearch] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(() =>
    [...passes].sort((a, b) => {
      if (a.status === "gefahren" && b.status !== "gefahren") return -1;
      if (b.status === "gefahren" && a.status !== "gefahren") return 1;
      return parseFloat(b.ride_score) - parseFloat(a.ride_score);
    }),
  [passes]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(p =>
      p.name.toLowerCase().includes(q) || p.region?.toLowerCase().includes(q)
    );
  }, [sorted, search]);

  // Scroll selected into view
  useEffect(() => {
    if (!selectedPass || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-id="${selectedPass.id}"]`) as HTMLElement | null;
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedPass]);

  return (
    <>
      {filterModalOpen && <FilterModal onClose={() => setFilterModalOpen(false)} />}

      <div
        className="absolute left-0 top-0 h-full z-[1000] flex flex-col transition-all duration-300"
        style={{ width: collapsed ? "48px" : "300px" }}
      >
        <div
          className="flex flex-col h-full overflow-hidden"
          style={{
            background: "rgba(8,8,10,0.9)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRight: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "4px 0 40px rgba(0,0,0,0.5)",
          }}
        >
          {/* ── Collapsed strip ── */}
          {collapsed && (
            <div className="flex flex-col items-center h-full">
              <button
                onClick={() => setCollapsed(false)}
                className="w-full flex items-center justify-center py-4 hover:bg-white/5 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8888a0" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <div className="flex-1 flex items-center justify-center">
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: "#39FF14", writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {filtered.length} Pässe
                </span>
              </div>
            </div>
          )}

          {/* ── Expanded ── */}
          {!collapsed && (
            <>
              {/* Header */}
              <div
                className="flex items-center gap-2 px-3 py-3 shrink-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase flex-1" style={{ color: "#D4AF37" }}>
                  Pässe
                </span>
                <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
                  {passes.length}
                </span>

                {/* Filter button */}
                <button
                  onClick={() => setFilterModalOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-all"
                  style={{
                    background: "rgba(57,255,20,0.06)",
                    border: "1px solid rgba(57,255,20,0.2)",
                    color: "rgba(57,255,20,0.7)",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                    <line x1="11" y1="18" x2="13" y2="18" />
                  </svg>
                  Filter
                </button>

                {/* Collapse */}
                <button
                  onClick={() => setCollapsed(true)}
                  className="w-6 h-6 flex items-center justify-center rounded-lg transition-colors hover:bg-white/5"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              </div>

              {/* Search */}
              <div className="px-3 py-2.5 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#44445a" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Pass suchen…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="bg-transparent text-sm outline-none w-full"
                    style={{ color: "#d0d0e0" }}
                  />
                  {search && (
                    <button onClick={() => setSearch("")} style={{ color: "#44445a" }} className="hover:text-white/40 transition-colors">
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* List */}
              <div ref={listRef} className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-2">
                    <span className="text-3xl opacity-20">🏔️</span>
                    <span className="text-xs font-mono" style={{ color: "#44445a" }}>Nichts gefunden</span>
                  </div>
                ) : (
                  filtered.map(pass => (
                    <div key={pass.id} data-id={pass.id}>
                      <PassCard
                        pass={pass}
                        selected={selectedPass?.id === pass.id}
                        onClick={() => onSelectPass(pass)}
                      />
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-between px-4 py-2.5 shrink-0"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-[11px] font-mono" style={{ color: "#44445a" }}>
                  {filtered.length === passes.length
                    ? `${passes.length} Pässe`
                    : `${filtered.length} von ${passes.length}`}
                </span>
                <span className="text-[10px] font-mono" style={{ color: "rgba(212,175,55,0.4)" }}>
                  AlpinChaser
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
