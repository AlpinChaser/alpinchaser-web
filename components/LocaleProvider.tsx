"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { AppMessages, Locale } from "@/lib/i18n";
import de from "@/messages/de.json";
import en from "@/messages/en.json";

const allMessages = { de, en };

interface LocaleContextType {
  locale: Locale;
  messages: AppMessages;
}

const LocaleContext = createContext<LocaleContextType>({ locale: "de", messages: de });

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("de");
  const [messages, setMessages] = useState<AppMessages>(de);

  useEffect(() => {
    const stored = (localStorage.getItem("locale") as Locale) ?? "de";
    const valid = stored === "en" || stored === "de" ? stored : "de";
    setLocale(valid);
    setMessages(allMessages[valid]);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, messages }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
