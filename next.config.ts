import type { NextConfig } from "next";

// ✅ Konfiguration für Next.js – ESLint wird beim Build ignoriert
const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // verhindert Build-Abbruch durch Lint-Fehler
  },
  images: {
    // 🧠 remotePatterns ersetzt das veraltete "domains"-Feld
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "img.olympics.com",
      },
      {
        protocol: "https",
        hostname: "contents.mediadecathlon.com",
      },
      // 👉 Füge hier weitere Bildquellen hinzu, wenn nötig
    ],
  },
};

export default nextConfig;