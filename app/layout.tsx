import type { Metadata } from "next";
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
    <html lang="de">
      <body className="antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
