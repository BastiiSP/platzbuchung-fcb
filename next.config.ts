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
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent-lga3-2.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent-frt3-1.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "instagram.fcgk3-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "instagram.fclo1-1.fna.fbcdn.net",
      },

      // 👉 Füge hier weitere Bildquellen hinzu, wenn nötig
    ],
  },
};

export default nextConfig;