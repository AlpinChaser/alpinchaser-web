import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0B",
        surface: "#111114",
        "surface-2": "#1A1A1F",
        neon: "#39FF14",
        gold: "#D4AF37",
        "gold-muted": "#B8962E",
        muted: "#3A3A45",
        "text-primary": "#F0F0F5",
        "text-secondary": "#8888A0",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        neon: "0 0 8px #39FF14, 0 0 24px #39FF1440",
        "neon-lg": "0 0 16px #39FF14, 0 0 48px #39FF1460",
        gold: "0 0 8px #D4AF3780",
        glass: "0 4px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      backdropBlur: {
        glass: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
