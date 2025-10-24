/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7f5af0",
        secondary: "#2cb67d",
        accent: "#00f0ff",
        backgroundLight: "#f9fafb",
        backgroundDark: "#0a0a0f",
        foregroundLight: "#111827",
        foregroundDark: "#e5e7eb",
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      transitionTimingFunction: {
        smooth: "ease-in-out",
      },
    },
  },
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [],
};

export default config;
