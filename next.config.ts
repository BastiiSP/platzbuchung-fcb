import type { NextConfig } from "next";

// ✅ Konfiguration für Next.js – ESLint wird beim Build ignoriert
const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // verhindert Build-Abbruch durch Lint-Fehler
  },
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com", // ← erlaubt Google Bilder
      "img.olympics.com",
      "contents.mediadecathlon.com",
      // weitere Domains, die du verwendest
    ],
  },
};

export default nextConfig;
