"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Pass } from "@/types/pass";

// ── Helpers ────────────────────────────────────────────────────────────────────

const FLAG: Record<string, string> = {
  AT: "🇦🇹", CH: "🇨🇭", IT: "🇮🇹", FR: "🇫🇷", DE: "🇩🇪", SLO: "🇸🇮",
  "AT-IT": "🇦🇹🇮🇹", "CH-IT": "🇨🇭🇮🇹", "FR-IT": "🇫🇷🇮🇹",
  "CH-FR": "🇨🇭🇫🇷", "AT-DE": "🇦🇹🇩🇪", "CH-FL": "🇨🇭🇱🇮",
};
const flag = (country: string) => FLAG[country] ?? "🏔️";

// ── Category definitions ───────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "flow",
    icon: "🌊",
    label: "Flow",
    tagline: "Perfekte Kurven",
    color: "#4FC3F7",
    rgb: "79,195,247",
    description: "Die geschmeidigsten Passstraßen der Alpen — maximaler Flow, minimale Unterbrechungen.",
  },
  {
    id: "technik",
    icon: "⚙️",
    label: "Technik",
    tagline: "Kurvig & präzise",
    color: "#FF8C42",
    rgb: "255,140,66",
    description: "Enge Kehren, technische Sektionen — für Fahrer die Präzision und Kontrolle lieben.",
  },
  {
    id: "panorama",
    icon: "🏔️",
    label: "Panorama",
    tagline: "Atemberaubend",
    color: "#B39DDB",
    rgb: "179,157,219",
    description: "Die spektakulärsten Ausblicke der Alpen — für unvergessliche Fahrt und Fotografie.",
  },
  {
    id: "top",
    icon: "⭐",
    label: "Top Rated",
    tagline: "Score ≥ 4.5",
    color: "#D4AF37",
    rgb: "212,175,55",
    description: "Nur die allerbesten Pässe — nach Gesamtbewertung der AlpinChaser Community.",
  },
  {
    id: "hoechste",
    icon: "📈",
    label: "Höchste",
    tagline: "Über 2500m",
    color: "#39FF14",
    rgb: "57,255,20",
    description: "Über den Wolken — die höchsten befahrbaren Passstraßen der Alpen.",
  },
  {
    id: "legenden",
    icon: "🏆",
    label: "Legenden",
    tagline: "Stelvio & Co.",
    color: "#FFB300",
    rgb: "255,179,0",
    description: "Stelvio, Grossglockner, Timmelsjoch — die ikonischen Pässe die jeder Biker kennt.",
  },
] as const;

type Category = typeof CATEGORIES[number];

// ── Category Modal ─────────────────────────────────────────────────────────────

function CategoryModal({ category, onClose }: { category: Category; onClose: () => void }) {
  const { color, rgb } = category;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "rgba(10,10,13,0.97)",
          border: `1px solid rgba(${rgb},0.22)`,
          boxShadow: `0 32px 80px rgba(0,0,0,0.85), 0 0 60px rgba(${rgb},0.08)`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Color accent line */}
        <div style={{ height: 2, background: `linear-gradient(90deg, ${color} 0%, ${color}60 55%, transparent 100%)` }} />

        <div className="p-6 flex flex-col gap-5">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-7 h-7 rounded-full flex items-center justify-center text-lg transition-colors"
            style={{ color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.05)" }}
            onMouseOver={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)")}
            onMouseOut={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
          >×</button>

          {/* Icon */}
          <div
            className="flex items-center justify-center w-16 h-16 rounded-2xl mx-auto text-3xl"
            style={{ background: `rgba(${rgb},0.12)`, border: `1px solid rgba(${rgb},0.28)` }}
          >
            {category.icon}
          </div>

          {/* Text */}
          <div className="text-center flex flex-col gap-2">
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] font-bold" style={{ color: `rgba(${rgb},0.7)` }}>
              Freischalten
            </div>
            <h3 className="text-[15px] font-bold text-white">
              🔓 {category.label}-Pässe entdecken
            </h3>
            <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              {category.description}
            </p>
            <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.32)" }}>
              Filtere, sortiere und finde deinen perfekten Pass mit{" "}
              <span style={{ color, fontWeight: 700 }}>AlpinChaser Pro</span>.
            </p>
          </div>

          {/* App Store Buttons */}
          <div className="flex flex-col gap-2.5">
            <a
              href="#"
              className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: `rgba(${rgb},0.08)`,
                border: `1px solid rgba(${rgb},0.25)`,
                color,
              }}
              onMouseOver={e => ((e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px rgba(${rgb},0.2)`)}
              onMouseOut={e => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.85 }}>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store — iOS
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#f0f0f5",
              }}
              onMouseOver={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)")}
              onMouseOut={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)")}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
                <path d="M3.18 23.76a2 2 0 0 0 2.05-.22l11.62-6.7-2.5-2.52zM1.5 1.47A2 2 0 0 0 1 3v18a2 2 0 0 0 .5 1.53l.07.07 10.08-10.09v-.23zm20.56 8.17L19.4 7.93l-2.8 2.8 2.8 2.82 1.68-.97a2.02 2.02 0 0 0 0-2.94zM5.23.46a2 2 0 0 0-2.05-.22L14.35 12.54l-2.5 2.52z"/>
              </svg>
              Google Play — Android
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>oder</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>

          <button
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: `rgba(${rgb},0.07)`,
              border: `1px solid rgba(${rgb},0.22)`,
              color,
            }}
            onMouseOver={e => ((e.currentTarget as HTMLElement).style.background = `rgba(${rgb},0.14)`)}
            onMouseOut={e => ((e.currentTarget as HTMLElement).style.background = `rgba(${rgb},0.07)`)}
          >
            Bereits Pro? Anmelden
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Category Card ──────────────────────────────────────────────────────────────

function CategoryCard({ category, onClick }: { category: Category; onClick: () => void }) {
  const [active, setActive] = useState(false);
  const { color, rgb } = category;

  const handleClick = () => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
      onClick();
    }, 220);
  };

  return (
    <button
      onClick={handleClick}
      className="relative flex flex-col items-start p-3 rounded-xl text-left overflow-hidden"
      style={{
        background: active ? `rgba(${rgb},0.14)` : `rgba(${rgb},0.06)`,
        border: `1px solid rgba(${rgb},${active ? "0.55" : "0.18"})`,
        boxShadow: active ? `0 0 28px rgba(${rgb},0.28)` : "none",
        transform: active ? "scale(1.03)" : "scale(1)",
        transition: "transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease",
      }}
      onMouseEnter={e => {
        if (active) return;
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `rgba(${rgb},0.45)`;
        el.style.boxShadow = `0 0 18px rgba(${rgb},0.2)`;
        el.style.transform = "scale(1.02)";
      }}
      onMouseLeave={e => {
        if (active) return;
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `rgba(${rgb},0.18)`;
        el.style.boxShadow = "none";
        el.style.transform = "scale(1)";
      }}
    >
      {/* Radial glow in bottom-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 10% 90%, rgba(${rgb},0.22) 0%, transparent 65%)` }}
      />

      {/* Icon */}
      <span className="text-[22px] leading-none mb-2.5 relative z-10">{category.icon}</span>

      {/* Label + tagline */}
      <div className="relative z-10">
        <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-white leading-tight">
          {category.label}
        </div>
        <div className="text-[10px] font-mono mt-0.5 leading-tight" style={{ color: `rgba(${rgb},0.75)` }}>
          {category.tagline}
        </div>
      </div>
    </button>
  );
}

// ── Pass Card ──────────────────────────────────────────────────────────────────

function PassCard({
  pass, selected, onClick, locallyRidden, justMarked,
}: {
  pass: Pass; selected: boolean; onClick: () => void;
  locallyRidden: boolean; justMarked: boolean;
}) {
  const score = parseFloat(pass.ride_score);
  const isRidden = pass.status === "gefahren" || locallyRidden;
  const isUnsaved = locallyRidden && pass.status !== "gefahren";

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 ${justMarked ? "ac-gold-burst" : ""}`}
      style={{
        background: isRidden
          ? "rgba(212,175,55,0.06)"
          : selected
          ? "rgba(57,255,20,0.07)"
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${
          isRidden
            ? `rgba(212,175,55,${selected ? "0.5" : "0.25"})`
            : selected
            ? "rgba(57,255,20,0.35)"
            : "rgba(255,255,255,0.045)"
        }`,
        boxShadow: isRidden
          ? "0 0 16px rgba(212,175,55,0.08)"
          : selected
          ? "0 0 18px rgba(57,255,20,0.1)"
          : "none",
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <span
          className="text-[13px] font-semibold leading-tight"
          style={{ color: selected || isRidden ? "#f0f0f5" : "#b8b8cc" }}
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
        {isUnsaved && (
          <>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <span className="text-[9px] font-mono" style={{ color: "rgba(212,175,55,0.45)" }}>
              nicht gespeichert
            </span>
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
  localRiddenIds: Set<string>;
  justMarkedId: string | null;
}

export default function PassListPanel({ passes, selectedPass, onSelectPass, localRiddenIds, justMarkedId }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
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

  useEffect(() => {
    if (!selectedPass || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-id="${selectedPass.id}"]`) as HTMLElement | null;
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedPass]);

  return (
    <>
      {activeCategory && (
        <CategoryModal category={activeCategory} onClose={() => setActiveCategory(null)} />
      )}

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

              {/* ── Categories ── */}
              <div className="shrink-0 px-2.5 pt-3 pb-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2 mb-2.5 px-0.5">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.22)" }}>
                    Entdecken
                  </span>
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                  <span className="text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.15)" }}>PRO</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      onClick={() => setActiveCategory(cat)}
                    />
                  ))}
                </div>
              </div>

              {/* ── All passes header ── */}
              <div className="flex items-center gap-2 px-3 pt-3 pb-1.5 shrink-0">
                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.22)" }}>
                  Alle Pässe
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                <span className="text-[9px] font-mono" style={{ color: "rgba(57,255,20,0.45)" }}>
                  {filtered.length}
                </span>
              </div>

              {/* Pass list */}
              <div ref={listRef} className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
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
                        locallyRidden={localRiddenIds.has(pass.id)}
                        justMarked={justMarkedId === pass.id}
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
