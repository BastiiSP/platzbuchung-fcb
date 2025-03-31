import type { NextConfig } from "next";

// ✅ Konfiguration für Next.js – ESLint wird beim Build ignoriert
const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // verhindert Build-Abbruch durch Lint-Fehler
  },
};

export default nextConfig;