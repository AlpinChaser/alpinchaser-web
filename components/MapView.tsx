"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { Pass } from "@/types/pass";
import PassInfoCard from "./PassInfoCard";

const PassMap = dynamic(() => import("./PassMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center" style={{ background: "#0A0A0B" }}>
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 rounded-full border-2 animate-spin"
          style={{ borderColor: "#D4AF3740", borderTopColor: "#D4AF37" }}
        />
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold tracking-widest" style={{ color: "#D4AF37" }}>ALPIN</span>
          <span className="text-sm font-bold tracking-widest text-white">CHASER</span>
        </div>
      </div>
    </div>
  ),
});

interface Props {
  passes: Pass[];
}

export default function MapView({ passes }: Props) {
  const [selectedPass, setSelectedPass] = useState<Pass | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return passes;
    return passes.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.region?.toLowerCase().includes(q) ||
        p.country?.toLowerCase().includes(q)
    );
  }, [passes, search]);

  const stats = useMemo(() => {
    const ridden = passes.filter((p) => p.status === "gefahren").length;
    return { total: passes.length, ridden };
  }, [passes]);

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#0A0A0B" }}>
      <PassMap passes={filtered} selectedPass={selectedPass} onSelectPass={setSelectedPass} />

      {/* ── Top Bar ───────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-[1000] flex items-center gap-3 px-5 py-4 pointer-events-none">

        {/* Logo */}
        <div
          className="pointer-events-auto shrink-0 flex items-center gap-0 px-4 py-2.5 rounded-xl"
          style={{
            background: "rgba(10,10,11,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(212,175,55,0.25)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(212,175,55,0.1) inset",
          }}
        >
          <span
            className="text-sm font-bold tracking-[0.2em]"
            style={{ color: "#D4AF37", textShadow: "0 0 16px #D4AF3780" }}
          >
            ALPIN
          </span>
          <span className="text-sm font-bold tracking-[0.2em] text-white">CHASER</span>
        </div>

        {/* Search */}
        <div
          className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl flex-1 max-w-sm"
          style={{
            background: "rgba(10,10,11,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          <svg
            style={{ color: "#D4AF37", flexShrink: 0 }}
            width={14} height={14}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Pass suchen…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-white placeholder-white/30 text-sm outline-none w-full"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-white/30 hover:text-white/70 text-lg leading-none transition-colors"
            >×</button>
          )}
        </div>

        {/* Stats pills */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-2 shrink-0">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono"
            style={{
              background: "rgba(10,10,11,0.75)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(57,255,20,0.15)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            <span className="text-white/40 uppercase tracking-wider text-[10px]">Pässe</span>
            <span className="font-bold text-white">{stats.total}</span>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono"
            style={{
              background: "rgba(10,10,11,0.75)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(212,175,55,0.2)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            <span className="text-white/40 uppercase tracking-wider text-[10px]">Gefahren</span>
            <span className="font-bold" style={{ color: "#D4AF37" }}>{stats.ridden}</span>
          </div>
        </div>
      </div>

      {/* ── Info Card ─────────────────────────────────────────────── */}
      {selectedPass && (
        <div
          key={selectedPass.id}
          className="absolute bottom-6 right-5 z-[1000] w-[340px] pointer-events-auto ac-card-enter"
        >
          <PassInfoCard pass={selectedPass} onClose={() => setSelectedPass(null)} />
        </div>
      )}

      {/* ── Legend ────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-5 left-5 z-[1000] flex items-center gap-4 px-4 py-2.5 rounded-xl text-[11px] font-mono"
        style={{
          background: "rgba(10,10,11,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center gap-2 text-white/50">
          <div className="w-3 h-3 rounded-full" style={{ background: "#39FF14", boxShadow: "0 0 8px #39FF14" }} />
          Nicht gefahren
        </div>
        <div className="flex items-center gap-2 text-white/50">
          <div className="w-3 h-3 rounded-full" style={{ background: "#D4AF37", boxShadow: "0 0 8px #D4AF37" }} />
          Gefahren
        </div>
      </div>
    </div>
  );
}
