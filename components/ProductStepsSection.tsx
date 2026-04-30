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
      className="border-t border-[rgba(212,175,55,0.1)] bg-[#0A0A0B] px-5 py-10 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="emotional-lead-heading"
          className="max-w-3xl text-[clamp(1.85rem,4.8vw,2.75rem)] font-black leading-[1.08] tracking-tight text-[#F0F0F5]"
        >
          Wie viele hast du schon?
        </h2>
        <p
          className="mt-3 max-w-2xl text-base font-medium leading-relaxed md:mt-5 md:text-xl"
          style={{ color: "rgba(255,255,255,0.58)" }}
        >
          Du fährst sie sowieso. Jetzt zählen sie.
        </p>

        <ol className="mt-8 grid list-none gap-6 md:mt-24 md:grid-cols-3 md:gap-0 md:gap-x-10 lg:gap-x-16">
          {STEPS.map((step, index) => (
            <li
              key={step.num}
              className={`relative md:px-6 lg:px-8 ${index > 0 ? "md:border-l md:border-[rgba(212,175,55,0.12)]" : ""}`}
            >
              <div className="flex flex-col gap-4">
                <p className="font-mono text-xs font-semibold tracking-[0.35em] text-[#D4AF37]">
                  {step.num}
                </p>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight text-[#F0F0F5]">
                    {step.title}
                  </h3>
                  <p
                    className="max-w-[22rem] text-sm leading-relaxed text-[rgba(255,255,255,0.6)] md:text-[0.95rem] md:text-[rgba(255,255,255,0.52)]"
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
