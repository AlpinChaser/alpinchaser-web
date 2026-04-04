"use client";

import { useEffect, useState } from "react";

interface Props {
  unsavedCount: number;
  onDismiss: () => void;
}

export default function SaveProgressModal({ unsavedCount, onDismiss }: Props) {
  const [visible, setVisible] = useState(false);

  // Fade + scale in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 350);
  };

  const headline =
    unsavedCount === 1
      ? "Erster Pass erobert! 🎉"
      : `${unsavedCount} Pässe markiert! 🏆`;

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center px-4 pointer-events-none"
      style={{
        background: visible ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(6px)" : "none",
        WebkitBackdropFilter: visible ? "blur(6px)" : "none",
        transition: "background 0.35s ease, backdrop-filter 0.35s ease",
      }}
    >
      <div
        className={`w-full max-w-[520px] rounded-2xl p-6 flex flex-col gap-5 pointer-events-auto${visible ? " ac-modal-flash" : ""}`}
        style={{
          background: "rgba(8,8,11,0.97)",
          border: "1px solid rgba(212,175,55,0.3)",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.92) translateY(24px)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease",
        }}
      >
        {/* Gold top accent */}
        <div style={{ height: 2, background: "linear-gradient(90deg,#D4AF37 0%,#D4AF3760 50%,transparent 100%)", margin: "-24px -24px 0", borderRadius: "12px 12px 0 0" }} />

        {/* Header */}
        <div className="flex items-start gap-4 mt-1">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-2xl"
            style={{ background: "rgba(212,175,55,0.14)", border: "1px solid rgba(212,175,55,0.3)" }}
          >
            🏆
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[16px] font-bold text-white mb-1">{headline}</div>
            <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Melde dich an um deinen Fortschritt zu speichern —
              sonst geht er beim Schließen verloren.
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors"
            style={{ color: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.04)" }}
            onMouseOver={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
            onMouseOut={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)")}
          >×</button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

        {/* Buttons */}
        <div className="flex gap-2.5">
          <button
            className="flex-1 py-3 rounded-xl text-[13px] font-bold transition-all duration-150"
            style={{
              background: "linear-gradient(135deg, rgba(212,175,55,0.22), rgba(212,175,55,0.1))",
              border: "1px solid rgba(212,175,55,0.5)",
              color: "#D4AF37",
            }}
            onMouseOver={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(212,175,55,0.3)")}
            onMouseOut={e => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
          >
            Anmelden
          </button>
          <button
            className="flex-1 py-3 rounded-xl text-[13px] font-bold transition-all duration-150"
            style={{
              background: "rgba(57,255,20,0.07)",
              border: "1px solid rgba(57,255,20,0.28)",
              color: "#39FF14",
            }}
            onMouseOver={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(57,255,20,0.18)")}
            onMouseOut={e => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
          >
            App laden
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-3 rounded-xl text-[12px] transition-colors"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Später
          </button>
        </div>
      </div>
    </div>
  );
}
