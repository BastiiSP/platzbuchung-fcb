import type { NextConfig } from "next";

// ✅ Konfiguration für Next.js – ESLint wird beim Build ignoriert
const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // verhindert Build-Abbruch durch Lint-Fehler
  },
  images: {
    remotePatterns: [
      // Bestehende erlaubte Bildquellen
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

      // ✅ Dynamische Instagram-Quellen (alle Subdomains via Wildcards)
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.fna.fbcdn.net",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
