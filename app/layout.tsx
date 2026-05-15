import type { Metadata } from "next";
import "./globals.css";
import { getLocale } from "@/lib/i18n";
import { LocaleProvider } from "@/components/LocaleProvider";
import FooterClient from "@/components/FooterClient";

export const metadata: Metadata = {
  title: "AlpinChaser — Alpine Pass Map",
  description: "Interactive map of alpine motorcycle passes across the Alps.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getLocale();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="antialiased overflow-x-hidden">
        <LocaleProvider>
          {children}
          <FooterClient />
        </LocaleProvider>
      </body>
    </html>
  );
}
