"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

export default function FooterClient() {
  const { messages } = useLocale();
  return (
    <footer className="border-t border-[#D4AF37]/20 bg-[#050506] text-neutral-300">
      <div className="mx-auto max-w-6xl px-5 py-11 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-10 lg:gap-14">
          <div className="space-y-3.5 md:space-y-3">
            <div className="flex items-center gap-2.5 md:gap-3">
              <span className="inline-flex shrink-0 rounded-md ring-1 ring-white/[0.06]" style={{ filter: "drop-shadow(0 0 14px rgba(212,175,55,0.18)) drop-shadow(0 2px 8px rgba(0,0,0,0.65))" }}>
                <Image src="/images/logo-transparent.png" alt="AlpinChaser" width={56} height={56} className="h-10 w-10 shrink-0 object-contain md:h-14 md:w-14" />
              </span>
              <p className="text-xs font-bold tracking-[0.35em] text-[#D4AF37]">ALPINCHASER</p>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-neutral-400">{messages.footer.tagline}</p>
          </div>
          <div className="space-y-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">{messages.footer.legal}</p>
            <nav className="flex flex-col gap-2.5 text-sm">
              <Link href="/privacy" className="w-fit text-neutral-300 transition-colors hover:text-[#D4AF37]">{messages.footer.privacy}</Link>
              <Link href="/terms" className="w-fit text-neutral-300 transition-colors hover:text-[#D4AF37]">{messages.footer.terms}</Link>
            </nav>
            <div className="border-t border-white/[0.06] pt-5">
              <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">{messages.footer.imprint}</p>
              <p className="text-sm leading-relaxed text-neutral-400">
                Christoph Larcher<br />
                Telfs, Tirol, Österreich<br />
                <a href="mailto:support@alpinchaser.com" className="mt-1 inline-block text-[#D4AF37]/90 transition-colors hover:text-[#D4AF37]">support@alpinchaser.com</a>
              </p>
            </div>
          </div>
          <div className="space-y-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">{messages.footer.app}</p>
            <nav className="flex flex-col gap-2.5 text-sm">
              <a href="https://apps.apple.com/at/app/alpinchaser/id6761077147" target="_blank" rel="noopener noreferrer" className="w-fit text-neutral-300 transition-colors hover:text-[#D4AF37]">App Store</a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="w-fit text-neutral-300 transition-colors hover:text-[#D4AF37]">Google Play</a>
              <a href="mailto:support@alpinchaser.com" className="w-fit text-neutral-300 transition-colors hover:text-[#D4AF37]">support@alpinchaser.com</a>
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.06] bg-black/50">
        <p className="mx-auto max-w-6xl px-5 py-4 text-center text-xs text-neutral-500 md:text-left">{messages.footer.rights}</p>
      </div>
    </footer>
  );
}
