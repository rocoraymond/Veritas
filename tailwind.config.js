/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#292926",
        input: "#242421",
        ring: "#C6A56A",
        background: "#0E0E0D",
        foreground: "#F3EFE5",
        surface: {
          DEFAULT: "#1C1C1A",
          muted: "#131312",
          card: "#181816",
        },
        gold: {
          DEFAULT: "#C6A56A",
          light: "#DFC699",
          dark: "#A58448",
        },
        ivory: {
          DEFAULT: "#F3EFE5",
          light: "#FFFFFF",
          muted: "#EDE8D6",
        },
        slate: {
          DEFAULT: "#8B8D8A",
          dark: "#4E504D",
          light: "#ADADA3",
        },
        primary: {
          DEFAULT: "#F3EFE5",
          foreground: "#0E0E0D",
        },
        secondary: {
          DEFAULT: "#1C1C1A",
          foreground: "#F3EFE5",
        },
        muted: {
          DEFAULT: "#1F1F1C",
          foreground: "#8B8D8A",
        },
        accent: {
          DEFAULT: "#C6A56A",
          foreground: "#0E0E0D",
        },
      },
      fontFamily: {
        serif: ["'Cinzel'", "'Cormorant Garamond'", "serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
    },
  },
  plugins: [],
};
