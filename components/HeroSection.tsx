"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MapView from "@/components/MapView";
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

const FEATURES = [
  {
    image: "/images/screen5.png",
    title: "Pässe sammeln & markieren",
    text: "Hak ab was du gefahren hast. Bau deine Sammlung auf. Werde zur Legende.",
  },
  {
    image: "/images/screen2.png",
    title: "Touren planen",
    text: "Kombiniere Pässe zu deiner perfekten Route. Starte direkt in Google Maps.",
  },
  {
    image: "/images/screen10.png",
    title: "Freunde herausfordern",
    text: "Wer hat mehr Pässe? Der Vergleich zeigt wer wirklich die Alpen kennt.",
  },
  {
    image: "/images/screen1.png",
    title: "Missionen & Rangsystem",
    text: "Vom Entdecker zum Meister. Jede Mission bringt dich näher an den Gipfel.",
  },
] as const;

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="whitespace-nowrap text-sm text-[rgba(255,255,255,0.75)] transition-colors hover:text-[#D4AF37]"
    >
      {children}
    </a>
  );
}

export default function HeroSection({ passes }: Props) {
  const passCount = passes.length;
  const countryCount = 7;

  const [heroMounted, setHeroMounted] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setHeroMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const featuresReveal = useIntersectionReveal<HTMLElement>();
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
        className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(212,175,55,0.15)] bg-[rgba(10,10,11,0.85)] backdrop-blur-md"
        style={{ WebkitBackdropFilter: "blur(12px)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-2 px-4 py-3 md:flex-nowrap">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Image
              src="/images/logo-transparent.png"
              alt="AlpinChaser"
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 object-contain"
              priority
            />
            <span className="text-xs font-bold tracking-[0.35em] text-[#D4AF37]">
              ALPINCHASER
            </span>
          </Link>

          <nav className="order-3 flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 py-1 text-sm md:order-none md:w-auto md:flex-nowrap md:gap-x-3 md:py-0">
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
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-[#D4AF37] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] transition-colors hover:bg-[rgba(212,175,55,0.12)] md:text-[13px]"
          >
            App downloaden
          </a>
        </div>
      </header>

      {/* —— Hero —— */}
      <section
        className="relative flex min-h-screen flex-col overflow-hidden pt-[76px] lg:min-h-screen"
        style={{ background: "#0A0A0B" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/images/hero-hoodie.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,5,6,0.96) 0%, rgba(10,10,11,0.75) 35%, rgba(10,10,11,0.35) 65%, rgba(10,10,11,0.55) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col gap-12 px-5 pb-16 pt-10 lg:flex-row lg:items-center lg:gap-16 lg:pb-24 lg:pt-8">
          <div className="flex max-w-xl flex-1 flex-col lg:max-w-[50%]">
            <Reveal show={heroMounted} delayMs={0}>
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-[#39FF14] md:text-sm">
                — ALPINE PASS TRACKING —
              </p>
            </Reveal>

            <Reveal show={heroMounted} delayMs={120}>
              <h1
                className="mb-2 font-black leading-[0.95] text-white"
                style={{ fontSize: "clamp(2.75rem, 9vw, 6.25rem)" }}
              >
                JEDER PASS.
              </h1>
            </Reveal>
            <Reveal show={heroMounted} delayMs={240}>
              <h1
                className="mb-6 font-black leading-[0.95] text-[#D4AF37]"
                style={{ fontSize: "clamp(2.75rem, 9vw, 6.25rem)" }}
              >
                DEINE GESCHICHTE.
              </h1>
            </Reveal>

            <Reveal show={heroMounted} delayMs={360}>
              <p
                className="mb-8 max-w-lg text-base leading-relaxed md:text-lg"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                658 Alpenpässe in {countryCount} Ländern. Sammle, bewerte,
                vergleiche — und beweise, dass du die Alpen wirklich kennst.
              </p>
            </Reveal>

            <Reveal show={heroMounted} delayMs={480}>
              <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#0A0A0B]"
                  style={{
                    background: "#D4AF37",
                    animationName: "appBtnPulseGold",
                    animationDuration: "1.5s",
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                  }}
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
                <a
                  href="#map"
                  onClick={scrollToMap}
                  className="inline-flex items-center justify-center rounded-xl border-2 border-[#D4AF37] bg-transparent px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#D4AF37] transition-colors hover:bg-[rgba(212,175,55,0.08)]"
                  style={{ opacity: 0.6 }}
                >
                  Karte erkunden
                </a>
              </div>
            </Reveal>

            <Reveal show={heroMounted} delayMs={620}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-3 text-sm sm:gap-x-5">
                <div>
                  <p className="text-2xl font-bold tabular-nums text-[#D4AF37] md:text-3xl">
                    {passCount}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[rgba(255,255,255,0.6)]">
                    Pässe
                  </p>
                </div>
                <span className="select-none text-lg text-[#D4AF37]/45" aria-hidden>
                  ·
                </span>
                <div>
                  <p className="text-2xl font-bold tabular-nums text-[#D4AF37] md:text-3xl">
                    {countryCount}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[rgba(255,255,255,0.6)]">
                    Länder
                  </p>
                </div>
                <span className="select-none text-lg text-[#D4AF37]/45" aria-hidden>
                  ·
                </span>
                <div>
                  <p className="text-2xl font-bold text-[#D4AF37] md:text-3xl">∞</p>
                  <p className="text-xs uppercase tracking-wider text-[rgba(255,255,255,0.6)]">
                    Abenteuer
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal
            show={heroMounted}
            delayMs={400}
            className="relative flex flex-1 justify-center lg:justify-end"
          >
            <div
              className="relative shrink-0"
              style={{
                filter:
                  "drop-shadow(0 0 28px rgba(212,175,55,0.45)) drop-shadow(0 24px 48px rgba(0,0,0,0.65))",
              }}
            >
              <div
                className="relative w-[min(100%,300px)] overflow-hidden rounded-[2.25rem] border border-[rgba(212,175,55,0.35)]"
                style={{
                  aspectRatio: "9 / 19",
                  transform: "rotate(-3deg)",
                }}
              >
                <Image
                  src="/images/screen2.png"
                  alt="AlpinChaser App Screenshot"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 280px, 320px"
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* —— Features —— */}
      <section
        id="features"
        ref={featuresReveal.ref}
        className="scroll-mt-24 border-t border-[rgba(212,175,55,0.08)] bg-[#0A0A0B] px-5 py-20 md:py-28"
      >
        <div
          className={`mx-auto max-w-6xl text-center transition-all duration-700 ${
            featuresReveal.visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-4 text-2xl font-black uppercase tracking-[0.2em] text-[#D4AF37] md:text-3xl">
            Alles in einer App
          </h2>
          <p
            className="mx-auto max-w-2xl text-base md:text-lg"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Nicht nur ein Navi. Ein Begleiter für jeden Kilometer.
          </p>
        </div>

        <div className="mx-auto mt-14 flex max-w-6xl snap-x snap-mandatory gap-6 overflow-x-auto pb-3 md:grid md:grid-cols-2 md:gap-10 md:overflow-visible md:pb-0">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              className={`group flex min-w-[min(100%,340px)] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border-t-2 border-[#D4AF37] bg-[rgba(255,255,255,0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(212,175,55,0.18)] md:min-w-0 md:w-full ${
                featuresReveal.visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: featuresReveal.visible ? `${120 + i * 100}ms` : "0ms",
              }}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={f.image}
                  alt=""
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
                <h3 className="text-lg font-bold text-[#F0F0F5] md:text-xl">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed md:text-base" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {f.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

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
            {passCount} Pässe. Eine Karte.
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
              {passCount}+
            </p>
            <p className="mt-3 text-sm uppercase tracking-widest text-[#F0F0F5] md:text-base">
              Alpenpässe
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
              5 Sterne
            </p>
            <p className="mt-3 text-sm uppercase tracking-widest text-[#F0F0F5] md:text-base">
              App Store Bewertung
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
