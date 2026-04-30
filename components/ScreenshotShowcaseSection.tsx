"use client";

const CARDS = [
  {
    image: "/images/appstore-iphone/5.png",
    title: "235 Pässe gefahren. Wie viele hast du?",
    text: "Dein Fortschritt wird sichtbar. Pass für Pass.",
  },
  {
    image: "/images/appstore-iphone/4.png",
    title: "Fahr die beste Seite.",
    text: "Nicht jede Auffahrt ist gleich. AlpinChaser zeigt dir, welche Seite sich wirklich lohnt.",
  },
  {
    image: "/images/appstore-iphone/6.png",
    title: "Flow, Technik oder Panorama?",
    text: "Finde Pässe nach deinem Fahrstil. Nicht irgendeinen Pass, sondern deinen nächsten.",
  },
  {
    image: "/images/appstore-iphone/7.png",
    title: "Kies in der Kehre?",
    text: "Teile Tipps und Warnungen mit anderen Bikern, bevor es unangenehm wird.",
  },
  {
    image: "/images/appstore-iphone/8.png",
    title: "Plane deine perfekte Tour.",
    text: "Kombiniere Pässe und starte direkt in Google Maps.",
  },
  {
    image: "/images/appstore-iphone/10.png",
    title: "Wer kennt die Alpen wirklich?",
    text: "Vergleiche dich mit Freunden. Zahlen lügen nicht.",
  },
  {
    image: "/images/appstore-iphone/1.png",
    title: "650+ Pässe. Eine Karte.",
    text: "Sieh auf einen Blick, was du gefahren bist und was dir noch fehlt.",
  },
  {
    image: "/images/appstore-iphone/9.png",
    title: "97% Österreich.",
    text: "Noch ein Pass bis zum Meister. Genau dieses Gefühl macht süchtig.",
  },
] as const;

type Props = {
  visible: boolean;
};

export default function ScreenshotShowcaseSection({ visible }: Props) {
  return (
    <section
      id="features"
      className="scroll-mt-24 border-t border-[rgba(212,175,55,0.08)] bg-[#080809] px-4 py-9 sm:px-5 md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-[430px] grid-cols-1 gap-5 md:max-w-6xl md:grid-cols-2 md:gap-10">
        {CARDS.map((card, i) => (
          <article
            key={card.title}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#121214] shadow-[0_12px_44px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.04)] transition-[box-shadow,border-color,transform] duration-500 ease-out hover:-translate-y-1.5 hover:border-[rgba(212,175,55,0.38)] hover:shadow-[0_22px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,175,55,0.08)] md:bg-[rgba(10,10,12,0.92)]"
          >
            <div className="relative flex h-[min(92vw,400px)] w-full shrink-0 items-center justify-center overflow-hidden bg-[#050506] px-2 sm:h-[min(90vw,420px)] sm:px-2.5 md:block md:aspect-[10/18] md:h-auto md:bg-[#0A0A0B] md:px-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt=""
                loading={i < 3 ? "eager" : "lazy"}
                decoding="async"
                className="max-h-full max-w-full object-contain object-center md:absolute md:inset-0 md:h-full md:w-full md:object-cover md:object-top"
              />
            </div>
            <div
              className={`flex flex-1 flex-col gap-2 border-t border-[rgba(212,175,55,0.14)] bg-[rgba(8,8,10,0.65)] px-5 pb-5 pt-4 backdrop-blur-md transition-[opacity,transform] duration-500 ease-out md:gap-3 md:bg-transparent md:p-8 md:backdrop-blur-none ${
                visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{
                transitionDelay: visible ? `${80 + i * 70}ms` : "0ms",
              }}
            >
              <h3 className="text-lg font-bold leading-tight tracking-tight text-[#F0F0F5] md:text-xl md:leading-snug">
                {card.title}
              </h3>
              <p className="text-[0.8125rem] leading-relaxed text-white/[0.58] md:text-[0.95rem] md:leading-relaxed">
                {card.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
