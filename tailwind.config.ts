import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}", // durchsucht alle Komponenten und Seiten
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // wichtig: Umschaltung per .dark-Klasse möglich
  plugins: [
    forms,
    require("@tailwindcss/line-clamp"),
  ],
};

export default config;
