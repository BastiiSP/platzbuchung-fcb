"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabaseClient";
import ThemeToggle from "@/components/ThemeToggle";

export default function Registrierungsseite() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [fehler, setFehler] = useState("");
  const [erfolg, setErfolg] = useState("");
  const [passwortAnzeigen, setPasswortAnzeigen] = useState(false);

  const handleRegistrierung = async (e: React.FormEvent) => {
    e.preventDefault();
    setFehler("");
    setErfolg("");

    const { error } = await supabase.auth.signUp({
      email,
      password: passwort,
    });

    if (error) {
      setFehler("❌ Registrierung fehlgeschlagen. Bitte versuche es erneut.");
    } else {
      router.push("/confirm-email"); // ✅ Weiterleitung zur Bestätigungsseite
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white flex flex-col items-center justify-center px-4">
      {/* 🔝 Header */}
      <header className="absolute top-0 left-0 w-full flex items-center justify-between p-4 border-b border-gray-300 dark:border-neutral-700">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Vereinslogo" width={32} height={32} />
          <span className="font-semibold text-sm sm:text-base">
            1. FC 1911 Burgkunstadt
          </span>
        </div>
        <ThemeToggle />
      </header>

      {/* 🧾 Registrierungsformular */}
      <div className="w-full max-w-md bg-gray-100 dark:bg-neutral-800 p-6 rounded shadow mt-20">
        <h1 className="text-2xl font-bold text-center mb-4">📝 Registrieren</h1>
        <form onSubmit={handleRegistrierung} className="space-y-4">
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

          {/* ✅ Registrierung Button */}
          <button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800 px-4 py-2 rounded"
          >
            ➡️ Jetzt registrieren
          </button>

          {/* 🔔 Feedback-Meldungen */}
          {fehler && (
            <p className="text-red-500 text-sm text-center">{fehler}</p>
          )}
          {erfolg && (
            <p className="text-green-600 text-sm text-center">{erfolg}</p>
          )}
        </form>

        {/* 🔙 Zurück zum Login */}
        <p className="text-sm text-center mt-6">
          Bereits registriert?{" "}
          <a href="/login" className="underline hover:text-gray-500">
            Hier einloggen
          </a>
        </p>
      </div>
    </main>
  );
}
