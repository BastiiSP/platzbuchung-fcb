"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { fetchNews, NewsItem } from "@/utils/fetchNews";
import NewsSection from "@/components/NewsSection";

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  return (
    <>
      <main className="min-h-screen bg-white text-black dark:bg-neutral-900 dark:text-white flex flex-col">
        {/* 🔝 Obere Leiste */}
        <header className="flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Vereinswappen" width={40} height={40} />
            <h1 className="text-lg font-semibold">1. FC 1911 Burgkunstadt</h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex gap-4 text-sm font-medium">
              <Link href="/kalender" className="hover:underline">
                📅 Kalender
              </Link>
              <Link href="/login" className="hover:underline">
                🔐 Login
              </Link>
              {/* Platzhalter für spätere Seiten */}
              {/* <Link href="/teams" className="hover:underline">👥 Teams</Link> */}
            </nav>
            <ThemeToggle />
          </div>
        </header>

        {/* 🏠 Hauptinhalt */}
        <section className="flex flex-col items-center justify-center flex-1 text-center px-4">
          <h2 className="text-3xl font-bold mb-2">
            Willkommen auf der offiziellen Homepage des 1. FC 1911 Burgkunstadt
          </h2>
          <Image
            src="/logo.svg"
            alt="Vereinswappen"
            width={300}
            height={300}
            className="mb-6"
          />
          <h3 className="text-3xl mb-2">
            Fußball. Charakter. Burgkunstadt.
            <p>Tradition seit 1911</p>
          </h3>
          <div className="mt-8 space-x-4">
            <Link
              href="/kalender"
              className="border border-black dark:border-white px-5 py-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
            >
              📅 Zur Platzbuchung
            </Link>
            <Link
              href="/login"
              className="border border-black dark:border-white px-5 py-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
            >
              🔐 Login / Registrierung
            </Link>
          </div>
        </section>
        <NewsSection />
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">📰 Vereins-News</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item: NewsItem) => (
              <div
                key={item.id}
                className="border rounded-lg overflow-hidden shadow-sm bg-white dark:bg-neutral-800"
              >
                <img
                  src={item.bild_url}
                  alt={item.titel}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    {item.kategorie} ·{" "}
                    {new Date(item.datum).toLocaleDateString()}
                  </span>
                  <h3 className="font-semibold text-lg mt-2">{item.titel}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {item.teaser}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
