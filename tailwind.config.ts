import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        ink: {
          primary: "#F5F5F0",
          secondary: "#A0A0A0",
          muted: "#666666",
        },
        surface: {
          DEFAULT: "#050505",
          raised: "#0A0A0A",
          elevated: "#141414",
        },
        accent: {
          DEFAULT: "#EAB308",
          dim: "rgba(234, 179, 8, 0.15)",
          hover: "rgba(234, 179, 8, 0.25)",
        },
        border: {
          subtle: "#1A1A1A",
          DEFAULT: "#222222",
        },
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
        "42": "10.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "glow": "0 0 40px rgba(234, 179, 8, 0.08)",
        "glow-lg": "0 0 80px rgba(234, 179, 8, 0.12)",
        "elevated": "0 8px 32px rgba(0, 0, 0, 0.4)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        "ambient-glow":
          "radial-gradient(ellipse 70% 60% at 18% 12%, rgba(234,179,8,0.06) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 82% 88%, rgba(234,179,8,0.04) 0%, transparent 60%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "500": "500ms",
        "700": "700ms",
        "900": "900ms",
      },
      fontSize: {
        "display": ["clamp(3.5rem, 10vw, 10rem)", { lineHeight: "0.9", letterSpacing: "-0.04em", fontWeight: "900" }],
        "headline": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "800" }],
        "title": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      animation: {
        "marquee": "marquee 40s linear infinite",
      },
      keyframes: {
        "grain": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(12%, 9%)" },
          "70%": { transform: "translate(9%, 4%)" },
          "90%": { transform: "translate(-1%, 7%)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
