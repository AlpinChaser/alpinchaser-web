"use client";
import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(code: string) {
    document.cookie = `locale=${code};path=/;max-age=31536000`;
    window.location.reload();
  }

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-neutral-300 transition-all hover:border-[rgba(212,175,55,0.35)] hover:text-[#D4AF37]"
        aria-label="Switch language"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span>{current.flag} {current.code.toUpperCase()}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-xl border border-white/10 bg-[#111113] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { switchLocale(lang.code); setOpen(false); }}
              className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors hover:bg-white/[0.06] ${
                lang.code === locale ? "text-[#D4AF37]" : "text-neutral-300"
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.label}</span>
              {lang.code === locale && (
                <svg className="ml-auto" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
