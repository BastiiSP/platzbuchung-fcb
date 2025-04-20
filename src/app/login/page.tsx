"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabaseClient";
import ThemeToggle from "@/components/ThemeToggle";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [fehler, setFehler] = useState("");
  const [passwortAnzeigen, setPasswortAnzeigen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFehler("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: passwort,
    });

    if (error) {
      setFehler("❌ Login fehlgeschlagen. Bitte überprüfe deine Daten.");
    } else {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white flex flex-col items-center justify-center px-4">
      {/* 🔝 Header mit Logo & Toggle */}
      <header className="absolute top-0 left-0 w-full flex items-center justify-between p-4 border-b border-gray-300 dark:border-neutral-700">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Vereinslogo" width={32} height={32} />
          <span className="font-semibold text-sm sm:text-base">
            1. FC 1911 Burgkunstadt
          </span>
        </div>
        {/* <ThemeToggle /> */}
      </header>

      {/* 🧾 Login-Formular */}
      <div className="w-full max-w-md bg-gray-100 dark:bg-neutral-800 p-6 rounded shadow mt-20">
        <h1 className="text-2xl font-bold text-center mb-4">🔐 Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* 📧 E-Mail */}
          <div>
            <label className="block text-sm font-medium mb-1">
              E-Mail-Adresse
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded text-black"
            />
          </div>

          {/* 🔒 Passwort */}
          <div>
            <label className="block text-sm font-medium mb-1">Passwort</label>
            <input
              type={passwortAnzeigen ? "text" : "password"}
              value={passwort}
              onChange={(e) => setPasswort(e.target.value)}
              required
              className="w-full p-2 border rounded text-black"
            />
            <label className="flex items-center gap-2 mt-2 text-sm">
              <input
                type="checkbox"
                checked={passwortAnzeigen}
                onChange={() => setPasswortAnzeigen((prev) => !prev)}
              />
              Passwort anzeigen
            </label>
          </div>

          {/* 🔁 Passwort vergessen */}
          <div className="text-center">
            <a href="#" className="text-sm underline hover:text-gray-500">
              Passwort vergessen?
            </a>
          </div>

          {/* ✅ Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800 px-4 py-2 rounded"
          >
            ➡️ Einloggen
          </button>

          {/* ❌ Fehlermeldung */}
          {fehler && (
            <p className="text-red-500 text-sm text-center mt-2">{fehler}</p>
          )}
        </form>

        {/* 🆕 Registrieren */}
        <p className="text-sm text-center mt-6">
          Noch keinen Account?{" "}
          <a href="/registrieren" className="underline hover:text-gray-500">
            Jetzt registrieren
          </a>
        </p>
      </div>
    </main>
  );
}
