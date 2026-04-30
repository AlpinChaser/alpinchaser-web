import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AlpinChaser — Alpine Pass Map",
  description: "Interactive map of alpine motorcycle passes across the Alps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className="antialiased overflow-x-hidden">
        {children}
        <footer className="border-t border-[#D4AF37]/20 bg-[#050506] text-neutral-300">
          <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10 lg:gap-14">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/logo-glow.jpg"
                    alt="AlpinChaser"
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0 rounded-md object-cover"
                  />
                  <p className="text-xs font-bold tracking-[0.35em] text-[#D4AF37]">
                    ALPINCHASER
                  </p>
                </div>
                <p className="max-w-xs text-sm leading-relaxed text-neutral-400">
                  658+ Alpenpässe. Deine Sammlung.
                </p>
              </div>

              <div className="space-y-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Rechtliches
                </p>
                <nav className="flex flex-col gap-2.5 text-sm">
                  <Link
                    href="/privacy"
                    className="w-fit text-neutral-300 transition-colors hover:text-[#D4AF37]"
                  >
                    Datenschutz
                  </Link>
                  <Link
                    href="/terms"
                    className="w-fit text-neutral-300 transition-colors hover:text-[#D4AF37]"
                  >
                    Nutzungsbedingungen
                  </Link>
                </nav>
                <div className="border-t border-white/[0.06] pt-5">
                  <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Impressum
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    Christoph Larcher
                    <br />
                    Telfs, Tirol, Österreich
                    <br />
                    <a
                      href="mailto:support@alpinchaser.com"
                      className="mt-1 inline-block text-[#D4AF37]/90 transition-colors hover:text-[#D4AF37]"
                    >
                      support@alpinchaser.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  App
                </p>
                <nav className="flex flex-col gap-2.5 text-sm">
                  <a
                    href="https://apps.apple.com/at/app/alpinchaser/id6761077147"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit text-neutral-300 transition-colors hover:text-[#D4AF37]"
                  >
                    App Store
                  </a>
                  <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit text-neutral-300 transition-colors hover:text-[#D4AF37]"
                  >
                    Google Play
                  </a>
                  <a
                    href="mailto:support@alpinchaser.com"
                    className="w-fit text-neutral-300 transition-colors hover:text-[#D4AF37]"
                  >
                    support@alpinchaser.com
                  </a>
                </nav>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.06] bg-black/50">
            <p className="mx-auto max-w-6xl px-5 py-4 text-center text-xs text-neutral-500 md:text-left">
              © 2026 AlpinChaser – Christoph Larcher. Alle Rechte vorbehalten.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
