import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm editorial palette pulled from the v3 mockups
        cream: {
          DEFAULT: "#F6F4EF",
          50: "#FBFAF7",
          100: "#F6F4EF",
          200: "#EEEAE2",
          300: "#E3DDD1",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          soft: "#2A2A2A",
          muted: "#6B6B6B",
          faint: "#9A9A93",
        },
        gold: {
          DEFAULT: "#B08D57",
          soft: "#C5A574",
          deep: "#8C6E40",
        },
        // deep bordeaux — the single high-contrast accent reserved for CTAs
        // and active states (editorial "one accent" rule)
        wine: {
          DEFAULT: "#6E1E2C",
          deep: "#571522",
          soft: "#8A3B49",
        },
        avail: {
          DEFAULT: "#3E7D5A",
          soft: "#5C9A78",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.18em",
      },
      opacity: {
        4: "0.04",
        6: "0.06",
        8: "0.08",
        12: "0.12",
        15: "0.15",
        35: "0.35",
        45: "0.45",
        55: "0.55",
        65: "0.65",
        85: "0.85",
      },
      maxWidth: {
        site: "1280px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,26,26,0.04), 0 12px 32px -16px rgba(26,26,26,0.18)",
        float: "0 8px 40px -12px rgba(26,26,26,0.22)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        kenburns: {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1.12)" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        stepIn: {
          "0%": { opacity: "0", transform: "translateX(28px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        stepBack: {
          "0%": { opacity: "0", transform: "translateX(-28px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pinDrop: {
          "0%": { opacity: "0", transform: "translateY(-12px) scale(0.6)" },
          "60%": { opacity: "1", transform: "translateY(2px) scale(1.05)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease forwards",
        fadeUp: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        kenburns: "kenburns 12s ease-out forwards",
        popIn: "popIn 0.35s cubic-bezier(0.22,1,0.36,1) forwards",
        stepIn: "stepIn 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
        stepBack: "stepBack 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
        marquee: "marquee 55s linear infinite",
        drift: "drift 7s ease-in-out infinite",
        pinDrop: "pinDrop 0.4s cubic-bezier(0.22,1,0.36,1) forwards",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
