function StepIconMap({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="10" r="3" />
      <path d="M12 21.5c-4-4.2-6-7.5-6-10a6 6 0 1 1 12 0c0 2.5-2 5.8-6 10Z" />
    </svg>
  );
}

function StepIconRoute({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 19Q12 11 19 5" />
    </svg>
  );
}

function StepIconCheck({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 5-5" />
    </svg>
  );
}

const STEPS = [
  {
    Icon: StepIconMap,
    title: "Finde deinen Pass",
    text: "Über 650 Pässe auf einer Karte.",
  },
  {
    Icon: StepIconRoute,
    title: "Fahr ihn",
    text: "Entdecke neue Strecken und Highlights.",
  },
  {
    Icon: StepIconCheck,
    title: "Hak ihn ab",
    text: "Dein Fortschritt wächst mit jeder Fahrt.",
  },
] as const;

export default function ProductStepsSection() {
  return (
    <section
      aria-labelledby="product-steps-heading"
      className="border-t border-[rgba(212,175,55,0.08)] bg-[#0A0A0B] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="product-steps-heading"
          className="max-w-3xl text-[clamp(1.65rem,4.2vw,2.35rem)] font-bold leading-tight tracking-tight text-[#F0F0F5]"
        >
          So sammelst du deine Pässe.
        </h2>

        <ol className="mt-16 grid list-none gap-14 md:mt-20 md:grid-cols-3 md:gap-0 md:gap-x-10 lg:gap-x-16">
          {STEPS.map((step, index) => {
            const Icon = step.Icon;
            return (
              <li
                key={step.title}
                className={`relative md:px-6 lg:px-8 ${index > 0 ? "md:border-l md:border-[rgba(212,175,55,0.12)]" : ""}`}
              >
                <div className="flex flex-col gap-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(212,175,55,0.28)] bg-[rgba(212,175,55,0.06)] text-[#D4AF37]">
                    <Icon />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight text-[#F0F0F5] md:text-xl">
                      {step.title}
                    </h3>
                    <p
                      className="max-w-[22rem] text-sm leading-relaxed md:text-[0.95rem]"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {step.text}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
