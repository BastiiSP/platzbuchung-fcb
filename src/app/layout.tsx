import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

// Imports für Header und Footer
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1. FC 1911 Burgkunstadt",
  description:
    "Die offizielle Vereinswebsite der Schuhstädter – mit aktuellen Spielberichten, Feierlichkeiten, Platzbuchung und mehr.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        {/* Globaler Header */}
        <Header />

        {/* Seiteninhalt */}
        <main className="pt-6">{children}</main>

        {/* Globaler Footer */}
        <Footer />

        {/* Vercel Monitoring */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
