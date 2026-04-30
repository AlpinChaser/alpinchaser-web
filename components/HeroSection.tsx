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

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.alpinchaser.app";

const APPLE_PATH =
  "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z";

/** Simple Android-style robot head (24×24) */
const ANDROID_ICON_PATH =
  "M10 3h4l1 2H9l1-2zm8.6 7.48 1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.4 11.4 0 0 0-8.94 0L5.65 6.67c-.18-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18A9.45 9.45 0 0 0 4.5 15.5h15a9.45 9.45 0 0 0-1.9-5.02zM8 17h1.5v3H8v-3zm6.5 0H16v3h-1.5v-3z";

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

  const [showPlatforms, setShowPlatforms] = useState(false);
  const platformDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPlatforms) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const el = platformDropdownRef.current;
      if (el && !el.contains(e.target as Node)) {
        setShowPlatforms(false);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [showPlatforms]);

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
        <div className="mx-auto flex h-[52px] max-w-7xl flex-nowrap items-center justify-between gap-y-0 overflow-hidden px-4 md:h-[58px] md:gap-x-2 md:overflow-visible md:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-1.5 md:gap-3">
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
            <span className="text-[0.6rem] font-bold tracking-[0.3em] text-[#D4AF37] md:text-xs md:tracking-[0.35em]">
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
      <section className="relative flex flex-col overflow-x-hidden bg-[#0A0A0B] max-md:min-h-[max(780px,100svh)] md:h-[100svh] md:min-h-screen">
        {/* Full-hero cinematic grade: readability + vignette + warm accent (desktop) */}
        <div
          className="pointer-events-none absolute inset-0 z-10 hidden md:block"
          style={{
            background: [
              "linear-gradient(to bottom, rgba(10,10,11,0.9) 0%, rgba(10,10,11,0.5) 30%, rgba(10,10,11,0.7) 70%, rgba(10,10,11,0.95) 100%)",
              "radial-gradient(ellipse 40% 46% at 86% 34%, rgba(212,175,55,0.075) 0%, transparent 64%)",
              "radial-gradient(ellipse 105% 92% at 50% 50%, transparent 48%, rgba(0,0,0,0.48) 100%)",
              "linear-gradient(to right, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.14) 44%, transparent 72%)",
            ].join(", "),
          }}
          aria-hidden
        />

        {/* Hoodie image only — z-0; gradients live in sibling layers so copy stays on top */}
        <div className="absolute left-0 right-0 top-0 z-0 h-[62%] w-full sm:h-[64%] md:inset-0 md:h-full md:w-[60%] md:py-16">
          <div className="relative h-full w-full min-h-0">
            <Image
              src="/images/hero-hoodie.jpg"
              alt=""
              fill
              priority
              className="object-[center_18%] md:object-[75%_center] object-cover md:object-cover"
              style={{
                filter: "brightness(1.11) contrast(1.085) saturate(1.02)",
              }}
              sizes="(max-width: 767px) 100vw, 60vw"
            />
            {/* Local lifts: upper-right silhouette + broader center/right read */}
            <div
              className="pointer-events-none absolute inset-0 z-[1] hidden mix-blend-soft-light md:block"
              style={{
                background: [
                  "radial-gradient(ellipse 50% 38% at 87% 25%, rgba(255,253,248,0.155) 0%, rgba(255,250,245,0.045) 36%, transparent 54%)",
                  "radial-gradient(ellipse 95% 88% at 72% 46%, rgba(255,252,245,0.14) 0%, rgba(255,250,240,0.04) 42%, transparent 62%)",
                ].join(", "),
              }}
            />
            {/* Micro contrast along diagonal (road / leading line) */}
            <div
              className="pointer-events-none absolute inset-0 z-[2] hidden mix-blend-overlay opacity-[0.29] md:block"
              style={{
                background:
                  "linear-gradient(118deg, transparent 0%, transparent 39%, rgba(255,255,255,0.048) 49%, rgba(0,0,0,0.058) 54%, transparent 62%, transparent 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-[3] hidden md:block"
              style={{
                background:
                  "linear-gradient(to right, #0A0A0B 0%, rgba(10,10,11,0.95) 15%, rgba(10,10,11,0.7) 35%, rgba(10,10,11,0.2) 60%, transparent 80%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-[4] hidden md:block"
              style={{
                background:
                  "linear-gradient(to bottom, #0A0A0B 0%, rgba(10,10,11,0.6) 15%, transparent 40%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-[5] hidden md:block"
              style={{
                background:
                  "linear-gradient(to top, #0A0A0B 0%, rgba(10,10,11,0.6) 15%, transparent 40%)",
              }}
            />
          </div>
        </div>

        {/* Mobile: full-bleed cinematic overlays above image, below copy (z-10) */}
        <div
          className="pointer-events-none absolute inset-0 z-10 md:hidden"
          style={{
            background: [
              "linear-gradient(to bottom, rgba(10,10,11,0.52) 0%, rgba(10,10,11,0.12) 28%, transparent 42%)",
              "radial-gradient(ellipse 120% 85% at 50% -5%, rgba(0,0,0,0.42) 0%, transparent 52%)",
              "radial-gradient(ellipse 95% 70% at 88% 28%, rgba(212,175,55,0.06) 0%, transparent 55%)",
              "radial-gradient(ellipse 72% 58% at 50% 36%, rgba(5,5,7,0.42) 0%, rgba(10,10,11,0.14) 48%, transparent 72%)",
            ].join(", "),
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 md:hidden"
          style={{
            background:
              "linear-gradient(to top, #0A0A0B 0%, #0A0A0B 8%, rgba(10,10,11,0.92) 18%, rgba(10,10,11,0.55) 38%, transparent 58%)",
          }}
          aria-hidden
        />

        {/* Copy + CTAs — left column */}
        <div className="relative z-20 flex min-h-0 w-full flex-1 flex-col justify-end px-4 pb-8 pt-[calc(52px+env(safe-area-inset-top,0px)+0.5rem)] text-left sm:px-5 max-md:pb-5 max-md:pt-[calc(52px+env(safe-area-inset-top,0px)+1.35rem)] md:h-full md:w-1/2 md:justify-center md:px-0 md:pb-10 md:pl-[8%] md:pr-12 md:pt-[88px]">
          <div className="relative isolate mx-auto w-full max-w-[430px] pb-2 max-md:pb-1 md:mx-0 md:max-w-xl md:pb-0">
            <Reveal show={heroMounted} delayMs={0}>
              <p className="mb-2.5 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#39FF14] [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] max-md:mb-3 md:mb-6 md:text-sm md:tracking-[0.35em]">
                — ALPEN-PASSBUCH —
              </p>
            </Reveal>

            <Reveal show={heroMounted} delayMs={120}>
              <h1
                className="mb-0 font-black text-white [text-shadow:0_4px_48px_rgba(0,0,0,0.75),0_1px_0_rgba(0,0,0,0.4)] max-md:leading-[0.94] max-md:tracking-[-0.02em] max-md:text-[clamp(1.58rem,5.35vw,2.2rem)] md:mb-2 md:leading-[0.95] md:text-[clamp(2.75rem,9vw,6.25rem)] md:tracking-normal"
              >
                <span className="block md:hidden">Wie viele Pässe hast du?</span>
                <span className="hidden md:contents">
                  <span>Wie viele </span>
                  <span className="whitespace-nowrap">Pässe hast du?</span>
                </span>
              </h1>
            </Reveal>
            <Reveal show={heroMounted} delayMs={240}>
              <h1
                className="mt-1 mb-3 font-black text-[#D4AF37] [text-shadow:0_0_1px_rgba(0,0,0,0.45),0_1px_0_rgba(0,0,0,0.4),0_3px_14px_rgba(0,0,0,0.42)] max-md:mb-2 max-md:font-extrabold max-md:leading-[0.96] max-md:tracking-[-0.02em] max-md:text-[clamp(1.5rem,5.1vw,2.06rem)] md:mb-6 md:mt-0 md:font-black md:leading-[0.95] md:text-[clamp(2.75rem,9vw,6.25rem)] md:tracking-normal"
              >
                <span className="block md:hidden">Sammle deine Alpen.</span>
                <span className="hidden md:inline">Sammle deine Alpen.</span>
              </h1>
            </Reveal>

            <Reveal show={heroMounted} delayMs={360}>
              <p
                className="mb-6 max-w-lg text-[0.9375rem] leading-relaxed [text-shadow:0_2px_20px_rgba(0,0,0,0.45)] max-md:mb-6 max-md:leading-snug md:mb-8 md:text-lg"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                650+ Alpenpässe in 7 Ländern. Sieh, was du gefahren bist.{" "}
                <span className="text-[1.07em] font-medium text-[rgba(255,255,255,0.82)]">
                  Und was dir noch fehlt.
                </span>
              </p>
            </Reveal>

            <Reveal show={heroMounted} delayMs={480}>
              <div className="mb-3 flex w-full flex-col gap-0 max-md:mb-3 md:mb-10 md:w-auto md:flex-row md:items-start md:gap-5">
                <div className="flex min-w-0 w-full flex-col gap-0 md:w-auto md:gap-1.5">
                  <div className="max-md:rounded-[18px] max-md:bg-[rgba(0,0,0,0.14)] max-md:px-3.5 max-md:py-3 max-md:ring-1 max-md:ring-white/[0.05] md:contents">
                    <div
                      ref={platformDropdownRef}
                      className="relative w-full max-w-full md:w-fit md:max-w-none"
                    >
                      {showPlatforms ? (
                        <div
                          className="absolute bottom-full left-0 right-0 z-[60] max-md:mb-2.5 max-md:translate-y-3 md:left-auto md:right-0 md:mb-4 md:min-w-[18.25rem] md:translate-y-0"
                          role="presentation"
                        >
                          <div className="ac-hero-platform-dropdown-enter flex w-full flex-col items-center">
                            <div
                              className="w-full max-w-[18.25rem] overflow-hidden rounded-[1.125rem] border border-[rgba(212,175,55,0.16)] bg-[rgba(7,7,9,0.94)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_-20px_56px_rgba(0,0,0,0.55),0_0_40px_-10px_rgba(212,175,55,0.17)] backdrop-blur-xl backdrop-saturate-150 max-md:mx-auto md:max-w-none md:min-w-[18.25rem]"
                              role="menu"
                              aria-label="App herunterladen"
                            >
                              <p className="border-b border-[rgba(255,255,255,0.06)] px-4 pb-2.5 pt-3.5 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-[rgba(196,164,74,0.72)] max-md:px-3.5 max-md:pb-1.5 max-md:pt-2">
                                Download wählen
                              </p>
                              <a
                                href={APP_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                role="menuitem"
                                className="group flex items-center gap-3.5 px-4 py-4 text-left transition-[background-color,box-shadow] duration-200 ease-out hover:bg-[rgba(255,255,255,0.045)] active:bg-[rgba(255,255,255,0.07)] max-md:gap-3 max-md:px-3.5 max-md:py-2 md:py-3.5"
                                onClick={() => setShowPlatforms(false)}
                              >
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.625rem] bg-[rgba(255,255,255,0.035)] ring-1 ring-[rgba(255,255,255,0.06)] transition-[background-color,box-shadow] duration-200 group-hover:bg-[rgba(255,255,255,0.055)] group-hover:ring-[rgba(212,175,55,0.12)] max-md:h-8 max-md:w-8">
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-[22px] w-[22px] text-[#D4AF37] max-md:h-4 max-md:w-4"
                                    aria-hidden
                                  >
                                    <path d={APPLE_PATH} />
                                  </svg>
                                </span>
                                <span className="min-w-0 flex-1 text-[0.9375rem] font-semibold leading-snug tracking-tight text-[#F2F2F8] max-md:text-[0.875rem]">
                                  iOS – App Store
                                </span>
                              </a>
                              <div
                                className="mx-4 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.22)] to-transparent max-md:mx-3.5"
                                aria-hidden
                              />
                              <a
                                href={GOOGLE_PLAY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                role="menuitem"
                                className="group flex items-center gap-3.5 px-4 py-4 text-left transition-[background-color,box-shadow] duration-200 ease-out hover:bg-[rgba(255,255,255,0.045)] active:bg-[rgba(255,255,255,0.07)] max-md:gap-3 max-md:px-3.5 max-md:py-2 md:py-3.5"
                                onClick={() => setShowPlatforms(false)}
                              >
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.625rem] bg-[rgba(255,255,255,0.035)] ring-1 ring-[rgba(255,255,255,0.06)] transition-[background-color,box-shadow] duration-200 group-hover:bg-[rgba(255,255,255,0.055)] group-hover:ring-[rgba(212,175,55,0.12)] max-md:h-8 max-md:w-8">
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-[22px] w-[22px] text-[#D4AF37] max-md:h-4 max-md:w-4"
                                    aria-hidden
                                  >
                                    <path d={ANDROID_ICON_PATH} />
                                  </svg>
                                </span>
                                <span className="min-w-0 flex-1 text-[0.9375rem] font-semibold leading-snug tracking-tight text-[#F2F2F8] max-md:text-[0.875rem]">
                                  Android – Google Play
                                </span>
                              </a>
                            </div>
                            <svg
                              className="-mt-px h-[7px] w-[14px] shrink-0 text-[rgba(180,150,65,0.55)]"
                              viewBox="0 0 14 7"
                              aria-hidden
                            >
                              <path
                                d="M0 0 L7 7 L14 0 Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                      ) : null}
                      <button
                        type="button"
                        aria-expanded={showPlatforms}
                        aria-haspopup="menu"
                        onClick={() => setShowPlatforms((v) => !v)}
                        className="ac-hero-cta-primary ac-hero-cta-primary--mobile w-full max-w-full cursor-pointer justify-center border-0 bg-transparent font-[inherit] md:w-fit md:max-w-none md:justify-center"
                      >
                        <span
                          className="inline-flex shrink-0 items-center gap-1 text-[#0a0a0b]/90"
                          aria-hidden
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="shrink-0"
                          >
                            <path d={APPLE_PATH} />
                          </svg>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="shrink-0"
                          >
                            <path d={ANDROID_ICON_PATH} />
                          </svg>
                        </span>
                        APP DOWNLOADEN
                      </button>
                    </div>
                  </div>
                  <p className="mt-1.5 max-w-none text-[11px] font-medium leading-snug tracking-wide text-[rgba(255,255,255,0.72)] max-md:mt-3.5 max-md:text-[10px] max-md:text-[rgba(255,255,255,0.48)] md:mt-3 md:max-w-[240px] md:hidden">
                    Du fährst sie sowieso. Jetzt zählen sie.
                  </p>
                  <p className="mt-0.5 max-w-none text-[11px] font-medium leading-snug tracking-wide text-[rgba(255,255,255,0.34)] max-md:mt-1 max-md:mb-2 max-md:text-[10px] max-md:text-[rgba(255,255,255,0.28)] md:mb-0 md:mt-1.5 md:max-w-[240px] md:text-left">
                    Sammle deine ersten Pässe.
                  </p>
                </div>
                <a
                  href="#map"
                  onClick={scrollToMap}
                  className="ac-hero-cta-secondary ac-hero-cta-secondary--desktop-only md:mt-0.5 md:inline-flex md:w-auto md:max-w-none md:shrink-0"
                >
                  Karte erkunden
                </a>
              </div>
            </Reveal>

            <Reveal show={heroMounted} delayMs={620}>
              <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1.5 border-t border-[rgba(212,175,55,0.14)] pt-2.5 text-sm max-md:mt-3 max-md:gap-x-2.5 max-md:pt-3 sm:gap-x-9 md:mt-0 md:gap-x-5 md:gap-y-3 md:border-t-0 md:pt-0">
                <div>
                  <p className="text-2xl font-bold tabular-nums text-[#D4AF37] md:text-3xl">
                    650+
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[rgba(255,255,255,0.6)] max-md:text-[0.58rem] max-md:tracking-wide">
                    Pässe
                  </p>
                </div>
                <span className="select-none text-base text-[#D4AF37]/25 md:text-lg max-md:text-xs" aria-hidden>
                  ·
                </span>
                <div>
                  <p className="text-2xl font-bold tabular-nums text-[#D4AF37] md:text-3xl">
                    7
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[rgba(255,255,255,0.6)] max-md:text-[0.58rem] max-md:tracking-wide">
                    Länder
                  </p>
                </div>
                <span className="select-none text-base text-[#D4AF37]/25 md:text-lg max-md:text-xs" aria-hidden>
                  ·
                </span>
                <div>
                  <p className="text-lg font-semibold leading-none text-[#D4AF37] max-md:tracking-tight md:text-3xl md:font-bold md:tracking-normal">
                    Sammlung
                  </p>
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
          className="pointer-events-none absolute bottom-[calc(11%+14px)] right-[4%] z-30 hidden w-[min(210px,calc(38vw-1rem))] rounded-xl border border-[rgba(212,175,55,0.34)] bg-[rgba(10,10,12,0.58)] px-4 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md md:block"
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

      {/* —— Map (desktop only: no in-browser map promo on mobile) —— */}
      <section
        id="map"
        ref={mapReveal.ref}
        className="hidden scroll-mt-24 bg-[#0A0A0B] md:block"
      >
        <div
          className={`mx-auto max-w-[430px] px-4 pb-5 pt-12 text-center transition-all duration-700 sm:px-5 md:max-w-6xl md:px-5 md:pb-6 md:pt-20 ${
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
        className="scroll-mt-24 border-t border-[rgba(212,175,55,0.12)] bg-[#050506] px-4 py-14 max-md:py-10 sm:px-5 md:py-28"
      >
        <div className="mx-auto flex max-w-[430px] flex-col divide-y divide-[rgba(212,175,55,0.14)] sm:max-w-5xl sm:flex-row sm:items-center sm:divide-y-0 sm:gap-0">
          <div
            className={`flex flex-1 flex-col items-center py-5 text-center transition-all duration-700 ease-out max-md:py-3 sm:py-0 ${
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
            <p className="mt-3 text-sm uppercase tracking-widest text-[#F0F0F5] max-md:mt-2 md:text-base">
              Pässe
            </p>
          </div>
          <div
            className="hidden h-24 w-px shrink-0 bg-[rgba(212,175,55,0.35)] sm:block"
            aria-hidden
          />
          <div
            className={`flex flex-1 flex-col items-center py-5 text-center transition-all duration-700 ease-out max-md:py-3 sm:py-0 ${
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
            <p className="mt-3 text-sm uppercase tracking-widest text-[#F0F0F5] max-md:mt-2 md:text-base">
              Länder
            </p>
          </div>
          <div
            className="hidden h-24 w-px shrink-0 bg-[rgba(212,175,55,0.35)] sm:block"
            aria-hidden
          />
          <div
            className={`flex flex-1 flex-col items-center py-5 text-center transition-all duration-700 ease-out max-md:py-3 sm:py-0 ${
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
            <p className="mt-3 text-sm uppercase tracking-widest text-[#F0F0F5] max-md:mt-2 md:text-base">
              Digital
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
