"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Pass } from "@/types/pass";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface FilterState {
  countries: string[];   // selected country group codes; empty = all
  elevMin: number;
  elevMax: number;
  scoreMin: number;
  flowMin: number;
  techMin: number;
  sceneryMin: number;
}

export const DEFAULT_FILTERS: FilterState = {
  countries: [],
  elevMin: 0,
  elevMax: 3000,
  scoreMin: 1,
  flowMin: 1,
  techMin: 1,
  sceneryMin: 1,
};

// ── Country groups ─────────────────────────────────────────────────────────────

const COUNTRY_GROUPS = [
  { code: "AT", flag: "🇦🇹", label: "Österreich",  match: (c: string) => c.startsWith("AT") },
  { code: "CH", flag: "🇨🇭", label: "Schweiz",     match: (c: string) => c.startsWith("CH") },
  { code: "IT", flag: "🇮🇹", label: "Italien",     match: (c: string) => c === "IT" || c === "FR-IT" || c === "AT-IT" || c === "CH-IT" },
  { code: "FR", flag: "🇫🇷", label: "Frankreich",  match: (c: string) => c.startsWith("FR") },
  { code: "DE", flag: "🇩🇪", label: "Deutschland", match: (c: string) => c === "DE" || c === "AT-DE" },
  { code: "SI", flag: "🇸🇮", label: "Slowenien",   match: (c: string) => c === "SLO" },
];

// ── Filter logic ───────────────────────────────────────────────────────────────

export function applyFilters(passes: Pass[], f: FilterState): Pass[] {
  const activeGroups = COUNTRY_GROUPS.filter(g => f.countries.includes(g.code));
  return passes.filter(pass => {
    if (activeGroups.length > 0 && !activeGroups.some(g => g.match(pass.country))) return false;
    if (pass.elevation < f.elevMin || pass.elevation > f.elevMax) return false;
    if (parseFloat(pass.ride_score) < f.scoreMin) return false;
    if (pass.rating_flow < f.flowMin) return false;
    if (pass.rating_technique < f.techMin) return false;
    if (pass.rating_scenery < f.sceneryMin) return false;
    return true;
  });
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function SliderRow({
  label, icon, value, min, max, step, format, onChange,
}: {
  label: string; icon: string; value: number;
  min: number; max: number; step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider" style={{ color: "#8888a0" }}>
          <span>{icon}</span>{label}
        </span>
        <span className="text-xs font-mono font-bold" style={{ color: "#39FF14" }}>
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="ac-range"
      />
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  passes: Pass[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export default function FilterPanel({ passes, filters, onChange }: Props) {
  const [open, setOpen] = useState(true);

  const filteredCount = useMemo(() => applyFilters(passes, filters).length, [passes, filters]);

  const set = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value });
  }, [filters, onChange]);

  const toggleCountry = useCallback((code: string) => {
    const next = filters.countries.includes(code)
      ? filters.countries.filter(c => c !== code)
      : [...filters.countries, code];
    set("countries", next);
  }, [filters.countries, set]);

  const hasActiveFilters =
    filters.countries.length > 0 ||
    filters.elevMin > 0 || filters.elevMax < 3000 ||
    filters.scoreMin > 1 || filters.flowMin > 1 ||
    filters.techMin > 1 || filters.sceneryMin > 1;

  return (
    <div
      className={`absolute left-4 top-1/2 -translate-y-1/2 z-[1000] flex flex-col transition-all duration-300 ease-in-out ${
        open ? "w-64" : "w-12"
      }`}
      style={{
        maxHeight: "calc(100vh - 120px)",
      }}
    >
      {/* Panel body */}
      <div
        className="relative flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "rgba(10,10,11,0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Neon accent stripe */}
        <div
          className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full"
          style={{ background: "linear-gradient(180deg, transparent, #39FF14, transparent)" }}
        />

        {/* Header / toggle button */}
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-3 px-3 py-3.5 w-full text-left shrink-0 hover:bg-white/5 transition-colors"
          style={{ borderBottom: open ? "1px solid rgba(255,255,255,0.07)" : "none" }}
        >
          <span className="text-lg shrink-0 ml-0.5">🗺️</span>
          {open && (
            <span className="flex-1 text-xs font-mono font-bold tracking-widest uppercase" style={{ color: "#f0f0f5" }}>
              Filter
            </span>
          )}
          {open && (
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#8888a0" strokeWidth="2.5" strokeLinecap="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          )}
          {!open && hasActiveFilters && (
            <span
              className="absolute top-2 right-2 w-2 h-2 rounded-full"
              style={{ background: "#39FF14", boxShadow: "0 0 6px #39FF14" }}
            />
          )}
        </button>

        {/* Collapsed icon list */}
        {!open && (
          <div className="flex flex-col items-center gap-3 py-3 px-2">
            {COUNTRY_GROUPS.filter(g => filters.countries.includes(g.code)).map(g => (
              <span key={g.code} className="text-base" title={g.label}>{g.flag}</span>
            ))}
            {filters.scoreMin > 1 && <span className="text-base">⭐</span>}
            {(filters.elevMin > 0 || filters.elevMax < 3000) && <span className="text-base">⛰️</span>}
          </div>
        )}

        {/* Expanded content */}
        {open && (
          <div className="flex flex-col gap-5 px-4 py-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>

            {/* Countries */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: "#8888a0" }}>
                Land
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {COUNTRY_GROUPS.map(g => {
                  const active = filters.countries.includes(g.code);
                  return (
                    <button
                      key={g.code}
                      onClick={() => toggleCountry(g.code)}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-150"
                      style={{
                        background: active ? "rgba(57,255,20,0.12)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${active ? "rgba(57,255,20,0.5)" : "rgba(255,255,255,0.06)"}`,
                        color: active ? "#39FF14" : "#8888a0",
                      }}
                    >
                      <span className="text-base leading-none">{g.flag}</span>
                      <span>{g.code}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* Elevation */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: "#8888a0" }}>
                Höhe
              </span>
              <SliderRow
                label="Minimum" icon="⬇️"
                value={filters.elevMin} min={0} max={2500} step={100}
                format={v => `${v} m`}
                onChange={v => set("elevMin", Math.min(v, filters.elevMax - 100))}
              />
              <SliderRow
                label="Maximum" icon="⬆️"
                value={filters.elevMax} min={500} max={3000} step={100}
                format={v => `${v} m`}
                onChange={v => set("elevMax", Math.max(v, filters.elevMin + 100))}
              />
            </div>

            <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* Ratings */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: "#8888a0" }}>
                Bewertung (min.)
              </span>
              <SliderRow
                label="Score" icon="🏆"
                value={filters.scoreMin} min={1} max={5} step={0.5}
                format={v => `${v.toFixed(1)}★`}
                onChange={v => set("scoreMin", v)}
              />
              <SliderRow
                label="Flow" icon="🌊"
                value={filters.flowMin} min={1} max={5} step={1}
                format={v => `${v}/5`}
                onChange={v => set("flowMin", v)}
              />
              <SliderRow
                label="Technik" icon="⚙️"
                value={filters.techMin} min={1} max={5} step={1}
                format={v => `${v}/5`}
                onChange={v => set("techMin", v)}
              />
              <SliderRow
                label="Landschaft" icon="🏔️"
                value={filters.sceneryMin} min={1} max={5} step={1}
                format={v => `${v}/5`}
                onChange={v => set("sceneryMin", v)}
              />
            </div>

            {/* Reset */}
            {hasActiveFilters && (
              <button
                onClick={() => onChange(DEFAULT_FILTERS)}
                className="text-xs font-mono py-1.5 px-3 rounded-lg transition-colors w-full text-center"
                style={{
                  background: "rgba(255,80,80,0.08)",
                  border: "1px solid rgba(255,80,80,0.2)",
                  color: "rgba(255,120,120,0.8)",
                }}
              >
                × Filter zurücksetzen
              </button>
            )}
          </div>
        )}

        {/* Footer counter */}
        <div
          className="flex items-center justify-center gap-2 px-3 py-2.5 shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span
            className="text-xs font-mono font-bold"
            style={{ color: "#39FF14" }}
          >
            {filteredCount}
          </span>
          {open && (
            <span className="text-xs font-mono" style={{ color: "#8888a0" }}>
              Pässe gefunden
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
