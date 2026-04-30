"use client";

import Image from "next/image";

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
      className="scroll-mt-24 border-t border-[rgba(212,175,55,0.08)] bg-[#080809] px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        {CARDS.map((card, i) => (
          <article
            key={card.title}
            className={`group flex flex-col overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[rgba(10,10,12,0.92)] shadow-[0_10px_48px_rgba(0,0,0,0.42)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[rgba(212,175,55,0.38)] hover:shadow-[0_22px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,175,55,0.08)] ${
              visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{
              transitionDelay: visible ? `${80 + i * 70}ms` : "0ms",
            }}
          >
            <div className="relative aspect-[10/19] w-full shrink-0 bg-[#050506] md:aspect-[10/18]">
              <Image
                src={card.image}
                alt=""
                fill
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 border-t border-[rgba(212,175,55,0.1)] p-6 md:p-8">
              <h3 className="text-lg font-bold leading-snug tracking-tight text-[#F0F0F5] md:text-xl">
                {card.title}
              </h3>
              <p
                className="text-sm leading-relaxed md:text-[0.95rem]"
                style={{ color: "rgba(255,255,255,0.58)" }}
              >
                {card.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
