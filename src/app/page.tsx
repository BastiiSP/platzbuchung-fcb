"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { fetchNews, NewsItem } from "@/utils/fetchNews";
import NewsSection from "@/components/NewsSection";
import { checkSession } from "@/utils/checkSession";
import { createClient } from "@/lib/supabaseClient";
const supabase = createClient();

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  useEffect(() => {
    console.log("Geladene News:", news);
  }, [news]);

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [rolle, setRolle] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { userId, rolle, userEmail } = await checkSession(supabase);
      setUserId(userId);
      setRolle(rolle);
      setIsLoggedIn(!!userId);
      setUserEmail(userEmail);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const testUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log("🔍 Startseiten-User:", data?.user, error);
    };
    testUser();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
        {/* 🏠 Hauptinhalt */}
        <section className="flex flex-col items-center justify-center flex-1 text-center px-4">
          <h2 className="text-3xl font-bold mb-2">
            Willkommen auf der Homepage des 1. FC 1911 Burgkunstadt
            <p>Servus bei den Schuhstädtern!</p>
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
              className="border border-[var(--foreground)] px-5 py-2 rounded hover:bg-gray-100 transition"
            >
              📅 Zur Platzbuchung
            </Link>
            <Link
              href="/login"
              className="border border-[var(--foreground)] px-5 py-2 rounded hover:bg-gray-100 transition"
            >
              🔐 Login / Registrierung
            </Link>
          </div>
        </section>
        <NewsSection />
      </main>
    </>
  );
}
