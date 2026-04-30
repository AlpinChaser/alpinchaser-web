"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MapView from "@/components/MapView";
import ProductStepsSection from "@/components/ProductStepsSection";
import ScreenshotShowcaseSection from "@/components/ScreenshotShowcaseSection";
import type { Pass } from "@/types/pass";

const APP_STORE_URL =
  "https://apps.apple.com/at/app/alpinchaser/id6761077147";

const APPLE_PATH =
  "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z";

interface Props {
  passes: Pass[];
}

function useIntersectionReveal<T extends HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  const { threshold = 0.12, rootMargin = "0px 0px -10% 0px", once = true } =
    options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, visible };
}

function Reveal({
  show,
  delayMs,
  children,
  className = "",
}: {
  show: boolean;
  delayMs: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`transition-all duration-700 ease-out ${className} ${
        show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="whitespace-nowrap text-sm tracking-[0.06em] text-[rgba(255,255,255,0.68)] transition-colors duration-200 hover:text-[#D4AF37]"
    >
      {children}
    </a>
  );
}

export default function HeroSection({ passes }: Props) {
  const countryCount = 7;

  const [heroMounted, setHeroMounted] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setHeroMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const featuresReveal = useIntersectionReveal<HTMLDivElement>();
  const mapReveal = useIntersectionReveal<HTMLElement>();
  const statsReveal = useIntersectionReveal<HTMLElement>();

  const scrollToMap = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("map")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F0F0F5]">
      {/* —— Navbar —— */}
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(212,175,55,0.22)] bg-[rgba(5,5,7,0.58)] pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl backdrop-saturate-150"
        style={{ WebkitBackdropFilter: "blur(18px) saturate(1.12)" }}
      >
        <div className="mx-auto flex h-14 max-w-7xl flex-nowrap items-center justify-between gap-y-0 overflow-hidden px-4 md:h-[58px] md:gap-x-2 md:overflow-visible md:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2 md:gap-3">
            <span
              className="inline-flex shrink-0 rounded-md ring-1 ring-white/[0.06]"
              style={{
                filter:
                  "drop-shadow(0 0 14px rgba(212,175,55,0.18)) drop-shadow(0 2px 8px rgba(0,0,0,0.65))",
              }}
            >
              <Image
                src="/images/logo-transparent.png"
                alt="AlpinChaser"
                width={56}
                height={56}
                className="h-10 w-10 object-contain md:h-14 md:w-14"
                priority
              />
            </span>
            <span className="text-[0.65rem] font-bold tracking-[0.32em] text-[#D4AF37] md:text-xs md:tracking-[0.35em]">
              ALPINCHASER
            </span>
          </Link>

          <nav className="hidden flex-1 flex-nowrap items-center justify-center gap-x-3 py-0 text-sm md:flex md:w-auto md:gap-x-5 md:py-0">
            <NavLink href="#map">Pässe</NavLink>
            <span className="text-[#D4AF37]/50" aria-hidden>
              ·
            </span>
            <NavLink href="#map">Karte</NavLink>
            <span className="text-[#D4AF37]/50" aria-hidden>
              ·
            </span>
            <NavLink href="#features">Missionen</NavLink>
            <span className="text-[#D4AF37]/50" aria-hidden>
              ·
            </span>
            <NavLink href="#stats">Community</NavLink>
          </nav>

          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center justify-center rounded-lg border border-[rgba(212,175,55,0.42)] bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#D4AF37] shadow-[0_2px_16px_rgba(0,0,0,0.35)] transition-all duration-200 hover:border-[rgba(212,175,55,0.58)] hover:bg-[rgba(212,175,55,0.1)] hover:shadow-[0_4px_22px_rgba(0,0,0,0.4)] md:inline-flex md:text-[13px]"
          >
            App downloaden
          </a>
        </div>
      </header>

      {/* —— Hero —— */}
      <section className="relative min-h-[72svh] overflow-hidden bg-[#0A0A0B] md:min-h-screen">
        {/* Full-hero cinematic grade: readability + vignette + warm accent */}
        <div
          className="pointer-events-none absolute inset-0 z-[4]"
          style={{
            background: [
              "radial-gradient(ellipse 40% 46% at 86% 34%, rgba(212,175,55,0.075) 0%, transparent 64%)",
              "radial-gradient(ellipse 105% 92% at 50% 50%, transparent 48%, rgba(0,0,0,0.48) 100%)",
              "linear-gradient(to right, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.14) 44%, transparent 72%)",
            ].join(", "),
          }}
          aria-hidden
        />

        {/* Hoodie — right column only */}
        <div className="absolute bottom-0 right-0 top-0 z-0 w-[60%] min-w-0 py-10 md:py-16">
          <div className="relative h-full w-full min-h-0">
            <Image
              src="/images/hero-hoodie.jpg"
              alt=""
              fill
              priority
              className="object-cover"
              style={{
                objectFit: "cover",
                objectPosition: "40% center",
                filter: "brightness(1.11) contrast(1.085) saturate(1.02)",
              }}
              sizes="60vw"
            />
            {/* Local lifts: upper-right silhouette + broader center/right read */}
            <div
              className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light"
              style={{
                background: [
                  "radial-gradient(ellipse 50% 38% at 87% 25%, rgba(255,253,248,0.155) 0%, rgba(255,250,245,0.045) 36%, transparent 54%)",
                  "radial-gradient(ellipse 95% 88% at 72% 46%, rgba(255,252,245,0.14) 0%, rgba(255,250,240,0.04) 42%, transparent 62%)",
                ].join(", "),
              }}
            />
            {/* Micro contrast along diagonal (road / leading line) */}
            <div
              className="pointer-events-none absolute inset-0 z-[2] mix-blend-overlay opacity-[0.29]"
              style={{
                background:
                  "linear-gradient(118deg, transparent 0%, transparent 39%, rgba(255,255,255,0.048) 49%, rgba(0,0,0,0.058) 54%, transparent 62%, transparent 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-[3]"
              style={{
                background:
                  "linear-gradient(to right, #0A0A0B 0%, rgba(10,10,11,0.95) 15%, rgba(10,10,11,0.7) 35%, rgba(10,10,11,0.2) 60%, transparent 80%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-[4]"
              style={{
                background:
                  "linear-gradient(to bottom, #0A0A0B 0%, rgba(10,10,11,0.6) 15%, transparent 40%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-[5]"
              style={{
                background:
                  "linear-gradient(to top, #0A0A0B 0%, rgba(10,10,11,0.6) 15%, transparent 40%)",
              }}
            />
          </div>
        </div>

        {/* Copy + CTAs — left column */}
        <div className="absolute bottom-0 left-0 top-0 z-10 flex w-1/2 flex-col justify-start pl-[8%] pr-8 pt-[calc(env(safe-area-inset-top,0px)+3.5rem+1.25rem)] text-left md:justify-center md:pb-10 md:pr-12 md:pt-[88px]">
          <div className="relative isolate max-w-xl pb-4 md:pb-0">
            <Reveal show={heroMounted} delayMs={0}>
              <p className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#39FF14] [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] md:mb-6 md:text-sm md:tracking-[0.35em]">
                — ALPEN-PASSBUCH —
              </p>
            </Reveal>

            <Reveal show={heroMounted} delayMs={120}>
              <h1
                className="mb-1 font-black leading-[0.98] text-white [text-shadow:0_4px_48px_rgba(0,0,0,0.75),0_1px_0_rgba(0,0,0,0.4)] text-[clamp(1.45rem,5.2vw,2.05rem)] md:mb-2 md:leading-[0.95] md:text-[clamp(2.75rem,9vw,6.25rem)]"
              >
                <span className="flex flex-col md:hidden">
                  <span>Wie viele</span>
                  <span>Pässe hast du?</span>
                </span>
                <span className="hidden md:contents">
                  <span>Wie viele </span>
                  <span className="whitespace-nowrap">Pässe hast du?</span>
                </span>
              </h1>
            </Reveal>
            <Reveal show={heroMounted} delayMs={240}>
              <h1
                className="mb-4 font-black leading-[0.98] text-[#D4AF37] [text-shadow:0_0_1px_rgba(0,0,0,0.45),0_1px_0_rgba(0,0,0,0.4),0_3px_14px_rgba(0,0,0,0.42)] text-[clamp(1.45rem,5.2vw,2.05rem)] md:mb-6 md:leading-[0.95] md:text-[clamp(2.75rem,9vw,6.25rem)]"
              >
                <span className="flex flex-col md:hidden">
                  <span>Sammle</span>
                  <span>deine</span>
                  <span>Alpen.</span>
                </span>
                <span className="hidden md:inline">Sammle deine Alpen.</span>
              </h1>
            </Reveal>

            <Reveal show={heroMounted} delayMs={360}>
              <p
                className="mb-5 max-w-lg text-sm leading-relaxed [text-shadow:0_2px_20px_rgba(0,0,0,0.45)] md:mb-8 md:text-lg"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                650+ Alpenpässe in 7 Ländern. Sieh, was du gefahren bist.{" "}
                <span className="text-[1.07em] font-medium text-[rgba(255,255,255,0.82)]">
                  Und was dir noch fehlt.
                </span>
              </p>
            </Reveal>

            <Reveal show={heroMounted} delayMs={480}>
              <div className="mb-6 flex flex-col gap-3 md:mb-10 md:flex-row md:items-start md:gap-5">
                <div className="flex min-w-0 flex-col gap-1.5">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ac-hero-cta-primary w-fit"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="shrink-0"
                      aria-hidden
                    >
                      <path d={APPLE_PATH} />
                    </svg>
                    App downloaden
                  </a>
                  <p className="max-w-[240px] text-[11px] font-medium leading-snug tracking-wide text-[rgba(255,255,255,0.34)]">
                    Sammle deine ersten Pässe.
                  </p>
                </div>
                <a
                  href="#map"
                  onClick={scrollToMap}
                  className="ac-hero-cta-secondary md:mt-0.5"
                >
                  Karte erkunden
                </a>
              </div>
            </Reveal>

            <Reveal show={heroMounted} delayMs={620}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm sm:gap-x-9 md:gap-x-5 md:gap-y-3">
                <div>
                  <p className="text-2xl font-bold tabular-nums text-[#D4AF37] md:text-3xl">
                    650+
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[rgba(255,255,255,0.6)]">
                    Pässe
                  </p>
                </div>
                <span className="select-none text-lg text-[#D4AF37]/25" aria-hidden>
                  ·
                </span>
                <div>
                  <p className="text-2xl font-bold tabular-nums text-[#D4AF37] md:text-3xl">
                    7
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[rgba(255,255,255,0.6)]">
                    Länder
                  </p>
                </div>
                <span className="select-none text-lg text-[#D4AF37]/25" aria-hidden>
                  ·
                </span>
                <div>
                  <p className="text-2xl font-bold text-[#D4AF37] md:text-3xl">Sammlung</p>
                  <p
                    className="text-[0.65rem] font-medium tracking-wide text-[rgba(255,255,255,0)] md:text-xs"
                    aria-hidden
                  >
                    &nbsp;
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Subtle proof — GS / touring pass completion */}
        <div
          className="pointer-events-none absolute bottom-[calc(11%+14px)] right-[4%] z-[6] hidden w-[min(210px,calc(38vw-1rem))] rounded-xl border border-[rgba(212,175,55,0.34)] bg-[rgba(10,10,12,0.58)] px-4 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md md:block"
          style={{ WebkitBackdropFilter: "blur(14px)" }}
        >
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
            <span className="text-2xl font-black tabular-nums tracking-tight text-[#D4AF37] [text-shadow:0_1px_0_rgba(0,0,0,0.35)]">
              97%
            </span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.58)]">
              Österreich
            </span>
          </div>
          <p className="mt-2 text-[0.7rem] leading-snug text-[rgba(255,255,255,0.58)]">
            Noch 1 Pass bis zum Meister.
          </p>
          <div
            className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div
              className="h-full rounded-full bg-[#39FF14]"
              style={{
                width: "97%",
                opacity: 0.72,
                boxShadow: "0 0 10px rgba(57,255,20,0.2)",
              }}
            />
          </div>
        </div>
      </section>

      <div ref={featuresReveal.ref}>
        <ProductStepsSection />
        <ScreenshotShowcaseSection visible={featuresReveal.visible} />
      </div>

      {/* —— Map —— */}
      <section id="map" ref={mapReveal.ref} className="scroll-mt-24 bg-[#0A0A0B]">
        <div
          className={`mx-auto max-w-6xl px-5 pb-6 pt-16 text-center transition-all duration-700 md:pt-20 ${
            mapReveal.visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-4 text-2xl font-black uppercase tracking-[0.18em] text-[#D4AF37] md:text-3xl">
            650+ Pässe. Eine Karte.
          </h2>
          <p
            className="mx-auto max-w-2xl text-base md:text-lg"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Alle Alpenpässe auf einen Blick — zoom rein und entdecke deinen
            nächsten Pass.
          </p>
        </div>
        <div className="relative h-screen w-full">
          <MapView passes={passes} />
        </div>
      </section>

      {/* —— Stats —— */}
      <section
        id="stats"
        ref={statsReveal.ref}
        className="scroll-mt-24 border-t border-[rgba(212,175,55,0.12)] bg-[#050506] px-5 py-20 md:py-28"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-stretch justify-center gap-10 sm:flex-row sm:items-center sm:gap-0">
          <div
            className={`flex flex-1 flex-col items-center text-center transition-all duration-700 ease-out ${
              statsReveal.visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <p
              className="font-black tabular-nums leading-none text-[#D4AF37]"
              style={{ fontSize: "clamp(3rem, 10vw, 5rem)" }}
            >
              650+
            </p>
            <p className="mt-3 text-sm uppercase tracking-widest text-[#F0F0F5] md:text-base">
              Pässe
            </p>
          </div>
          <div
            className="hidden h-24 w-px shrink-0 bg-[rgba(212,175,55,0.35)] sm:block"
            aria-hidden
          />
          <div
            className={`flex flex-1 flex-col items-center text-center transition-all duration-700 ease-out ${
              statsReveal.visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: statsReveal.visible ? "100ms" : "0ms" }}
          >
            <p
              className="font-black tabular-nums leading-none text-[#D4AF37]"
              style={{ fontSize: "clamp(3rem, 10vw, 5rem)" }}
            >
              {countryCount}
            </p>
            <p className="mt-3 text-sm uppercase tracking-widest text-[#F0F0F5] md:text-base">
              Länder
            </p>
          </div>
          <div
            className="hidden h-24 w-px shrink-0 bg-[rgba(212,175,55,0.35)] sm:block"
            aria-hidden
          />
          <div
            className={`flex flex-1 flex-col items-center text-center transition-all duration-700 ease-out ${
              statsReveal.visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: statsReveal.visible ? "200ms" : "0ms" }}
          >
            <p
              className="font-black leading-none text-[#D4AF37]"
              style={{ fontSize: "clamp(2.25rem, 7vw, 5rem)" }}
            >
              Passbuch
            </p>
            <p className="mt-3 text-sm uppercase tracking-widest text-[#F0F0F5] md:text-base">
              Digital
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
