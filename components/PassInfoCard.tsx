"use client";

import { Pass } from "@/types/pass";

interface Props {
  pass: Pass;
  onClose: () => void;
}

const COUNTRY_FLAGS: Record<string, string> = {
  FR: "🇫🇷", IT: "🇮🇹", CH: "🇨🇭", AT: "🇦🇹", DE: "🇩🇪", SI: "🇸🇮",
  "FR-IT": "🇫🇷🇮🇹", "IT-AT": "🇮🇹🇦🇹", "CH-IT": "🇨🇭🇮🇹",
  "AT-IT": "🇦🇹🇮🇹", "CH-AT": "🇨🇭🇦🇹",
};

const RATING_LABELS: [keyof Pass, string][] = [
  ["rating_scenery",    "Landschaft"],
  ["rating_flow",       "Flow"],
  ["rating_technique",  "Technik"],
  ["rating_road",       "Strasse"],
  ["rating_traffic",    "Verkehr"],
  ["rating_popularity", "Bekanntheit"],
];

function RatingBar({ label, value }: { label: string; value: number }) {
  const barColor = value >= 4
    ? { bg: "linear-gradient(90deg,#39FF14,#39FF1460)", glow: "0 0 8px #39FF1450", num: "#39FF14" }
    : value >= 3
    ? { bg: "linear-gradient(90deg,#D4AF37,#D4AF3760)", glow: "none", num: "#D4AF37" }
    : { bg: "linear-gradient(90deg,#555,#33333380)", glow: "none", num: "rgba(255,255,255,0.3)" };

  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-[11px]" style={{ color: "rgba(255,255,255,0.38)" }}>
        {label}
      </span>
      <div className="flex-1 h-[3px] rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
        <div
          className="h-[3px] rounded-full transition-all"
          style={{ width: `${(value / 5) * 100}%`, background: barColor.bg, boxShadow: barColor.glow }}
        />
      </div>
      <span className="text-[11px] font-mono w-4 text-right shrink-0" style={{ color: barColor.num }}>
        {value}
      </span>
    </div>
  );
}

export default function PassInfoCard({ pass, onClose }: Props) {
  const flag = COUNTRY_FLAGS[pass.country] ?? "";
  const isRidden = pass.status === "gefahren";
  const score = parseFloat(pass.ride_score);
  const scoreColor = score >= 4.0 ? "#D4AF37" : "#39FF14";
  const scoreGlow = score >= 4.0 ? "0 0 12px #D4AF3760" : "0 0 12px #39FF1460";

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "rgba(6,6,8,0.94)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.3)",
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
      }}
    >
      {/* Gold accent line — gradient fades right */}
      <div style={{ height: 2, background: "linear-gradient(90deg, #D4AF37 0%, #D4AF3780 50%, transparent 100%)", flexShrink: 0 }} />

      <div className="p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-base">{flag}</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.3)" }}>
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
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg leading-none"
            style={{ color: "rgba(255,255,255,0.28)", background: "rgba(255,255,255,0.04)" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
            onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
          >×</button>
        </div>

        {/* Elevation + Score */}
        <div className="flex items-end gap-5">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.28)" }}>Höhe</div>
            <div className="text-3xl font-bold font-mono leading-none" style={{ color: "#39FF14", textShadow: "0 0 20px #39FF1450" }}>
              {pass.elevation}
              <span className="text-sm font-normal ml-1" style={{ color: "rgba(255,255,255,0.35)" }}>m</span>
            </div>
          </div>
          <div className="mb-0.5">
            <div className="text-[10px] font-mono uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.28)" }}>Score</div>
            {/* Score color: gold ≥ 4.0, neon-green < 4.0 */}
            <div className="text-xl font-bold font-mono" style={{ color: scoreColor, textShadow: scoreGlow }}>
              ★ {pass.ride_score}
            </div>
          </div>
        </div>

        {/* Hero claim */}
        <p className="text-[12px] italic leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          &ldquo;{pass.heroClaim}&rdquo;
        </p>

        <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

        {/* Description */}
        <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
          {pass.mustRideDescription}
        </p>

        {/* Best approach — gold accent, neutral bg */}
        <div
          className="rounded-xl p-3"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="text-[10px] font-mono uppercase tracking-[0.15em] mb-1" style={{ color: "rgba(255,255,255,0.28)" }}>
            Beste Anfahrt
          </div>
          <div className="text-[13px] font-semibold mb-1" style={{ color: "#D4AF37" }}>
            {pass.bestApproachSide}
          </div>
          <div className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
            {pass.bestApproachReason}
          </div>
        </div>

        {/* Ratings */}
        <div className="flex flex-col gap-2.5">
          <div className="text-[10px] font-mono uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.28)" }}>Ratings</div>
          {RATING_LABELS.map(([key, label]) => (
            <RatingBar key={key} label={label} value={pass[key] as number} />
          ))}
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

        {/* Highlights & Cautions */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(255,255,255,0.28)" }}>
              Highlights
            </div>
            <div className="flex flex-col gap-1.5">
              {[pass.highlight_1, pass.highlight_2, pass.highlight_3].map((h, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[11px]" style={{ color: "rgba(255,255,255,0.52)" }}>
                  <span className="mt-0.5 shrink-0" style={{ color: "#39FF14" }}>▸</span>
                  {h}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(255,255,255,0.28)" }}>
              Achtung
            </div>
            <div className="flex flex-col gap-1.5">
              {/* Warning items in orange-red — ⚠ symbol */}
              {[pass.caution_1, pass.caution_2, pass.caution_3].map((c, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[11px]" style={{ color: "rgba(255,255,255,0.52)" }}>
                  <span className="mt-0.5 shrink-0" style={{ color: "#FF6B35" }}>⚠</span>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
