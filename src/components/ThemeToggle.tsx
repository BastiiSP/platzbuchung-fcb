"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <span className="text-xl">☀️</span>
      <label className="relative inline-block w-12 h-6">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={theme === "dark"}
          onChange={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
        />
        <span className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 dark:bg-gray-600 rounded-full transition duration-300"></span>
        <span
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition transform ${
            theme === "dark" ? "translate-x-6" : ""
          }`}
        ></span>
      </label>
      <span className="text-xl">🌙</span>
    </div>
  );
}
