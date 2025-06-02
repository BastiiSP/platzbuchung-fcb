"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { checkSession } from "@/utils/checkSession";
import { createClient } from "@/lib/supabaseClient";

const supabase = createClient();

export default function HomePage() {
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

  // 📌 Script für LightWidget einbinden
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
        {/* 🏠 Hauptinhalt */}
        <section className="flex flex-col items-center justify-center flex-1 text-center px-4 mb-4">
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
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/kalender"
              className="w-full sm:w-auto border border-[var(--foreground)] px-5 py-2 rounded text-center hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
            >
              📅 Zur Platzbuchung
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto border border-[var(--foreground)] px-5 py-2 rounded text-center hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
            >
              🔐 Login / Registrierung
            </Link>
          </div>
        </section>

        {/* 📰 Vereins-News im NewsCard-Stil */}
        <section className="px-4 py-10 text-center">
          <h2 className="text-2xl font-bold mb-4">📰 Vereins-News</h2>
          <div className="w-full max-w-4xl mx-auto bg-white dark:bg-neutral-800 shadow-md rounded-lg p-4">
            <iframe
              src="https://cdn.lightwidget.com/widgets/e0ddd3f07e445ffcadd888b4c0f4c053.html"
              scrolling="no"
              allowTransparency={true}
              className="lightwidget-widget w-full"
              style={{
                border: 0,
                overflow: "hidden",
                minHeight: "400px",
              }}
            ></iframe>
          </div>
        </section>

        {/* ⛔️ Vereins-News via Supabase (vorerst deaktiviert) */}
        {/* <NewsSection /> */}
      </main>
    </>
  );
}
