"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, useCallback } from "react";
import { Pass } from "@/types/pass";
import PassInfoCard from "./PassInfoCard";
import PassListPanel from "./PassListPanel";

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

  const stats = useMemo(() => ({
    total: passes.length,
    ridden: passes.filter(p => p.status === "gefahren").length,
  }), [passes]);

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "#0A0A0B" }}>
      <PassMap passes={passes} selectedPass={selectedPass} onSelectPass={setSelectedPass} />

      {/* ── Pass List Panel (left) ───────────────────────── */}
      <PassListPanel
        passes={passes}
        selectedPass={selectedPass}
        onSelectPass={setSelectedPass}
      />

      {/* ── Top-right stats ──────────────────────────────── */}
      <div className="absolute top-4 right-4 z-[1000] hidden sm:flex items-center gap-2 pointer-events-none">
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

      {/* ── Info Card (bottom right) ─────────────────────── */}
      {selectedPass && (
        <div
          key={selectedPass.id}
          className="absolute bottom-6 right-5 z-[1000] w-[340px] pointer-events-auto ac-card-enter"
        >
          <PassInfoCard pass={selectedPass} onClose={() => setSelectedPass(null)} />
        </div>
      )}

      {/* ── Legend (bottom center) ───────────────────────── */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-4 px-4 py-2.5 rounded-xl text-[11px] font-mono"
        style={{
          background: "rgba(10,10,11,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center gap-2 text-white/50">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#39FF14" }} />
          Nicht gefahren
        </div>
        <div className="flex items-center gap-2 text-white/50">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#D4AF37" }} />
          Gefahren
        </div>
      </div>
    </div>
  );
}
