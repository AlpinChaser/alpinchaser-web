"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  passCount: number;
}

export default function HeroSection({ passCount }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleMapScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("map")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex flex-col items-center justify-start overflow-hidden"
      style={{ background: "#0A0A0B", paddingTop: "clamp(60px, 12vh, 120px)" }}
    >
      {/* Hero background image */}
      <Image
        src="/images/hero-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 40%" }}
      />

      {/* Cinematic overlay — darker at edges, lighter in center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "linear-gradient(to bottom, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0.2) 25%, rgba(10,10,11,0.4) 60%, rgba(10,10,11,0.95) 100%)",
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(10,10,11,0.1) 0%, rgba(10,10,11,0.45) 100%)",
          ].join(", "),
        }}
      />

      {/* Subtle neon-gold color grade overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 60% 40% at 50% 75%, rgba(212,175,55,0.08) 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 30% at 50% 50%, rgba(57,255,20,0.04) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      {/* Mountain silhouette */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none">
        <svg
          viewBox="0 0 1440 260"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "260px", display: "block" }}
        >
          {/* Far range — subtle, lighter */}
          <path
            d="M0,260 L0,190 L60,165 L130,180 L210,130 L290,150 L360,100 L420,120 L480,75 L530,95
               L580,55 L630,75 L680,40 L730,58 L780,85 L830,65 L890,105 L950,75 L1010,115
               L1070,85 L1130,125 L1200,95 L1270,140 L1360,110 L1440,150 L1440,260 Z"
            fill="rgba(20,22,24,0.7)"
          />
          {/* Near range — solid, darker */}
          <path
            d="M0,260 L0,220 L70,205 L140,215 L200,195 L270,210 L340,188 L420,205 L490,182
               L550,198 L610,172 L665,190 L720,162 L775,180 L830,155 L890,175 L950,150
               L1010,168 L1070,145 L1130,162 L1200,178 L1280,158 L1360,188 L1440,168 L1440,260 Z"
            fill="rgba(10,10,11,0.98)"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">

        {/* Eyebrow label */}
        <div
          className={`mb-6 flex items-center gap-3 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="ac-hero-eyebrow-line" />
          <span
            className="text-xs font-mono tracking-[0.25em] uppercase"
            style={{ color: "#39FF14" }}
          >
            Alpine Pass Tracking
          </span>
          <span className="ac-hero-eyebrow-line" />
        </div>

        {/* Headline */}
        <h1
          className={`flex flex-wrap justify-center items-baseline gap-x-4 mb-5 transition-all duration-700 delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ lineHeight: 0.95 }}
        >
          <span
            style={{
              fontSize: "clamp(60px, 11vw, 108px)",
              fontWeight: 900,
              letterSpacing: "-0.025em",
              color: "#D4AF37",
              textShadow: "0 0 60px rgba(212,175,55,0.6), 0 2px 40px rgba(0,0,0,0.8)",
            }}
          >
            ALPIN
          </span>
          <span
            style={{
              fontSize: "clamp(60px, 11vw, 108px)",
              fontWeight: 900,
              letterSpacing: "-0.025em",
              color: "#F0F0F5",
              textShadow: "0 2px 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.5)",
            }}
          >
            CHASER
          </span>
        </h1>

        {/* Tagline */}
        <p
          className={`text-xl md:text-2xl mb-10 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ color: "rgba(255,255,255,0.72)", letterSpacing: "0.04em", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
        >
          <span style={{ color: "#39FF14", fontWeight: 700 }}>{passCount} Alpenpässe.</span>{" "}
          Ein Abenteuer.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-[450ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="https://apps.apple.com/at/app/alpinchaser/id6761077147"
            target="_blank"
            rel="noopener noreferrer"
            className="ac-btn-primary"
            style={{
              animationName: "appBtnPulse",
              animationDuration: "1.5s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-2 shrink-0"
              aria-hidden
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App downloaden
          </a>
          <a
            href="#map"
            onClick={handleMapScroll}
            className="ac-btn-secondary"
            style={{ opacity: 0.65 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
            </svg>
            Karte erkunden
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span
          className="text-[10px] font-mono tracking-[0.3em] uppercase"
          style={{ color: "#3a3a50" }}
        >
          Scroll
        </span>
        <div className="ac-scroll-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M12 19l-6-6M12 19l6-6"
              stroke="#39FF14"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

    </section>
  );
}
