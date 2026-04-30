const STEPS = [
  {
    num: "01",
    title: "Finde deinen Pass",
    text: "Über 650 direkt auf einer Karte.",
  },
  {
    num: "02",
    title: "Fahr ihn",
    text: "Entdecke neue Strecken und Highlights.",
  },
  {
    num: "03",
    title: "Hak ihn ab",
    text: "Dein Fortschritt wächst mit jeder Fahrt.",
  },
] as const;

export default function ProductStepsSection() {
  return (
    <section
      aria-labelledby="emotional-lead-heading"
      className="border-t border-[rgba(212,175,55,0.1)] bg-[#0A0A0B] px-4 py-11 sm:px-5 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[430px] md:max-w-6xl">
        <h2
          id="emotional-lead-heading"
          className="max-w-3xl text-[clamp(1.65rem,5vw,2.75rem)] font-black leading-[1.08] tracking-tight text-[#F0F0F5] md:text-[clamp(1.85rem,4.8vw,2.75rem)]"
        >
          Wie viele hast du schon?
        </h2>
        <div
          className="mt-3 h-px w-12 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80 md:hidden"
          aria-hidden
        />
        <p
          className="mt-3 max-w-2xl text-[0.9375rem] font-medium leading-relaxed md:mt-5 md:text-xl"
          style={{ color: "rgba(255,255,255,0.58)" }}
        >
          Du fährst sie sowieso. Jetzt zählen sie.
        </p>

        <ol className="relative mt-8 flex list-none flex-col gap-0 md:mt-24 md:grid md:grid-cols-3 md:gap-0 md:gap-x-10 lg:gap-x-16">
          {STEPS.map((step, index) => (
            <li
              key={step.num}
              className={`relative md:px-6 lg:px-8 ${
                index > 0 ? "md:border-l md:border-[rgba(212,175,55,0.12)]" : ""
              } ${index > 0 ? "mt-4 md:mt-0" : ""}`}
            >
              {/* Mobile: vertical rail + node */}
              {index < STEPS.length - 1 ? (
                <span
                  className="pointer-events-none absolute left-[7px] top-10 bottom-[-1.1rem] w-px bg-gradient-to-b from-[rgba(212,175,55,0.5)] via-[rgba(212,175,55,0.2)] to-[rgba(212,175,55,0.08)] md:hidden"
                  aria-hidden
                />
              ) : null}
              <span
                className="pointer-events-none absolute left-[4px] top-[1.25rem] z-[1] h-2 w-2 rounded-full border border-[rgba(212,175,55,0.5)] bg-[#0A0A0B] shadow-[0_0_0_3px_rgba(10,10,11,0.95)] md:hidden"
                aria-hidden
              />

              <div className="relative rounded-2xl border border-[rgba(212,175,55,0.14)] bg-[linear-gradient(165deg,rgba(255,255,255,0.055)_0%,rgba(255,255,255,0.02)_45%,transparent_100%)] py-5 pl-8 pr-5 shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md md:rounded-none md:border-0 md:bg-transparent md:py-0 md:pl-0 md:pr-0 md:shadow-none md:backdrop-blur-none">
                <div className="flex flex-col gap-3 md:gap-4">
                  <p className="font-mono text-[0.65rem] font-semibold tracking-[0.35em] text-[#D4AF37] md:text-xs">
                    {step.num}
                  </p>
                  <div className="space-y-1.5 md:space-y-2">
                    <h3 className="text-lg font-bold tracking-tight text-[#F0F0F5] md:text-xl">
                      {step.title}
                    </h3>
                    <p className="max-w-[22rem] text-[0.8125rem] leading-relaxed text-white/[0.62] md:text-[0.95rem] md:leading-relaxed md:text-white/[0.52]">
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
