"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Props {
  onClose: () => void;
}

export default function ComingSoonModal({ onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Fade in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (visible) inputRef.current?.focus();
  }, [visible]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 250);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setError("Bitte gib eine gültige E-Mail ein.");
      return;
    }
    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem("waitlist_emails") ?? "[]") as string[];
      if (!existing.includes(trimmed)) {
        localStorage.setItem("waitlist_emails", JSON.stringify([...existing, trimmed]));
      }
    } catch { /* ignore */ }
    setSubmitted(true);
    setError("");
  };

  return (
    <div
      className="fixed inset-0 z-[4000] flex items-center justify-center px-4"
      style={{
        background: visible ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(8px)" : "none",
        WebkitBackdropFilter: visible ? "blur(8px)" : "none",
        transition: "background 0.25s ease, backdrop-filter 0.25s ease",
      }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[420px] rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "rgba(17,17,20,0.97)",
          border: "1px solid transparent",
          backgroundClip: "padding-box",
          boxShadow: "0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(212,175,55,0.18), 0 0 40px rgba(57,255,20,0.05) inset",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.94) translateY(16px)",
          transition: "opacity 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top accent: gold → neon-green gradient line */}
        <div style={{
          height: 2,
          background: "linear-gradient(90deg, #D4AF37 0%, #39FF14 60%, transparent 100%)",
          flexShrink: 0,
        }} />

        <div className="p-7 flex flex-col items-center gap-5">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors"
            style={{ color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.05)" }}
            onMouseOver={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)")}
            onMouseOut={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
            aria-label="Schließen"
          >
            ×
          </button>

          {/* Logo */}
          <div style={{ filter: "drop-shadow(0 0 20px rgba(212,175,55,0.35))" }}>
            <Image
              src="/images/logo.png"
              alt="AlpinChaser"
              width={140}
              height={70}
              style={{ height: 70, width: "auto" }}
            />
          </div>

          {/* Headline */}
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-[22px] font-bold text-white leading-tight">
              Die App kommt bald!
            </h2>
            <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Trag dich ein und erfahre als Erster,<br />wenn AlpinChaser startet.
            </p>
          </div>

          {/* Form or success */}
          {submitted ? (
            <div
              className="w-full flex flex-col items-center gap-3 py-4 px-5 rounded-xl"
              style={{ background: "rgba(57,255,20,0.07)", border: "1px solid rgba(57,255,20,0.25)" }}
            >
              <span className="text-2xl">🎉</span>
              <p className="text-[14px] font-semibold text-center" style={{ color: "#39FF14" }}>
                Du bist dabei!
              </p>
              <p className="text-[12px] text-center" style={{ color: "rgba(255,255,255,0.45)" }}>
                Wir melden uns, sobald AlpinChaser startet.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <input
                  ref={inputRef}
                  type="email"
                  placeholder="Deine E-Mail"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-150"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#f0f0f5",
                    caretColor: "#39FF14",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(57,255,20,0.55)")}
                  onBlur={e => (e.currentTarget.style.borderColor = error ? "rgba(255,80,80,0.5)" : "rgba(255,255,255,0.1)")}
                />
                {error && (
                  <span className="text-[11px] px-1" style={{ color: "rgba(255,80,80,0.8)" }}>{error}</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-150"
                style={{
                  background: "rgba(57,255,20,0.12)",
                  border: "1px solid rgba(57,255,20,0.45)",
                  color: "#39FF14",
                }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(57,255,20,0.2)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(57,255,20,0.2)";
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(57,255,20,0.12)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                Benachrichtige mich
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
              Bald verfügbar
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>

          {/* Store badges (grayed out) */}
          <div className="flex gap-3 w-full">
            <div
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                opacity: 0.4,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>App Store</span>
            </div>
            <div
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                opacity: 0.4,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                <path d="M3.18 23.76a2 2 0 0 0 2.05-.22l11.62-6.7-2.5-2.52zM1.5 1.47A2 2 0 0 0 1 3v18a2 2 0 0 0 .5 1.53l.07.07 10.08-10.09v-.23zm20.56 8.17L19.4 7.93l-2.8 2.8 2.8 2.82 1.68-.97a2.02 2.02 0 0 0 0-2.94zM5.23.46a2 2 0 0 0-2.05-.22L14.35 12.54l-2.5 2.52z"/>
              </svg>
              <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Google Play</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
