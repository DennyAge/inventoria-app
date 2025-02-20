import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{vue,js,ts}",
    "./composables/**/*.{js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
    "./server/**/*.{js,ts}",
    "./client/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        border: "hsl(var(--border))",
        primary: {
          DEFAULT: "#6979f8",
          25: "#e5e7fa",
          75: "#a5affb",
          100: "#6979f8",
        },
      },
      width: {
        "page-content-md": "calc(100% - 16.5rem)",
        "page-content-sm": "calc(100% - 6.5rem)",
        "sidebar-md": "16.5rem",
        "sidebar-sm": "5rem",
      },
      backgroundImage: {
        auth: "url('/images/chris-lee-unsplash.jpg')",
      },
      keyframes: {
        "slide-left": {
          from: { opacity: "0", transform: "translateX(-3rem)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-2.5rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-left": "slide-left 0.7s ease",
        "slide-down": "slide-down 0.5s ease",
      },
    },
  },
  plugins: [animate],
};

export default config;
