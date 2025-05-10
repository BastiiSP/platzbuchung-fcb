"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // 🌅 Beim ersten Laden prüfen, ob ein Theme im localStorage gespeichert ist
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // 🌗 Theme auf <html> anwenden + im localStorage speichern
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      {/* ☀️ Sonnen-Icon für Light Mode */}
      <span className="text-xl">☀️</span>

      {/* 🌙 Umschalter für Dark Mode */}
      <label className="relative inline-block w-12 h-6">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={theme === "dark"}
          onChange={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
          aria-label="Dark Mode umschalten"
        />
        <span className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 dark:bg-gray-600 rounded-full transition duration-300"></span>
        <span
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition transform ${
            theme === "dark" ? "translate-x-6" : ""
          }`}
        ></span>
      </label>

      {/* 🌙 Mond-Icon für Dark Mode */}
      <span className="text-xl">🌙</span>
    </div>
  );
}
