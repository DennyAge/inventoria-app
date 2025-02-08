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
        "ibm-plex-sans": ["IBM Plex Sans", "sans-serif"],
        "bebas-neue": ["var(--bebas-neue)"],
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
        "sidebar-sm": "6.5rem",
      },
      screens: {
        xs: "480px",
      },
      backgroundImage: {
        auth: "url('/images/chris-lee-unsplash.jpg')",
      },
    },
  },
  plugins: [animate],
};

export default config;
