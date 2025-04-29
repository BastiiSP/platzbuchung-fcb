"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabaseClient";
import ThemeToggle from "@/components/ThemeToggle";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Registrierungsseite() {
  const supabase = createClient();
  const router = useRouter();

  // 🧠 Formularzustände
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [passwortBestaetigung, setPasswortBestaetigung] = useState("");
  const [fehler, setFehler] = useState("");
  const [erfolg, setErfolg] = useState("");
  const [passwortAnzeigen, setPasswortAnzeigen] = useState(false);

  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [telefonnummer, setTelefonnummer] = useState("");
  const [mannschaften, setMannschaften] = useState<string[]>([]);
  const [sonstigeMannschaft, setSonstigeMannschaft] = useState("");

  const alleMannschaften = [
    "Herren 1",
    "Herren 2",
    "A1-Jugend",
    "B1-Jugend",
    "B2-Jugend",
    "C1-Jugend",
    "C2-Jugend",
    "D1-Jugend",
    "E-Jugend",
    "F-Jugend",
    "G-Jugend",
    "Sonstige",
  ];

  const toggleMannschaft = (wert: string) => {
    if (mannschaften.includes(wert)) {
      setMannschaften(mannschaften.filter((m) => m !== wert));
    } else {
      setMannschaften([...mannschaften, wert]);
    }
  };

  const handleRegistrierung = async (e: React.FormEvent) => {
    e.preventDefault();
    setFehler("");
    setErfolg("");

    // Zusätzliche Sicherheitsprüfung für Pflichtfelder
    if (!vorname || !nachname || !telefonnummer) {
      setFehler("❌ Bitte alle Pflichtfelder ausfüllen.");
      return;
    }

    if (passwort !== passwortBestaetigung) {
      setFehler("❌ Die Passwörter stimmen nicht überein.");
      return;
    }

    console.log("🧪 Registrierungsdaten", {
      email,
      password: passwort,
      data: {
        vorname,
        nachname,
        telefonnummer,
        mannschaften,
        sonstige_mannschaft: sonstigeMannschaft || null,
      },
    });

    const { error } = await supabase.auth.signUp({
      email,
      password: passwort,
      options: {
        data: {
          vorname,
          nachname,
          telefonnummer,
          mannschaften, //: JSON.stringify(mannschaften), // ✅ JSON-stringified!
          sonstige_mannschaft: sonstigeMannschaft || null,
        },
      },
    });

    if (error) {
      console.error("Supabase-Fehler:", error.message);
      setFehler(`❌ Registrierung fehlgeschlagen: ${error.message}`);
    } else {
      setErfolg(
        "✅ Bitte bestätige deine E-Mail-Adresse über den Link in deinem Postfach."
      );
    }
  };

  const istFormularGueltig =
    email && passwort.length >= 6 && passwort === passwortBestaetigung;
  // vorname &&
  // nachname &&
  // telefonnummer;

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white flex flex-col items-center justify-center px-4">
      <header className="absolute top-0 left-0 w-full flex items-center justify-between p-4 border-b border-gray-300 dark:border-neutral-700">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Vereinslogo" width={32} height={32} />
          <span className="font-semibold text-sm sm:text-base">
            1. FC 1911 Burgkunstadt
          </span>
        </div>
        {/* <ThemeToggle /> */}
      </header>

      <div className="w-full max-w-xl bg-gray-100 dark:bg-neutral-800 p-6 rounded shadow mt-20">
        <h1 className="text-2xl font-bold text-center mb-4">📝 Registrieren</h1>
        <form onSubmit={handleRegistrierung} className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Vorname"
              value={vorname}
              onChange={(e) => setVorname(e.target.value)}
              // required
              className="flex-1 p-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Nachname"
              value={nachname}
              onChange={(e) => setNachname(e.target.value)}
              // required
              className="flex-1 p-2 border rounded text-black"
            />
          </div>

          <div>
            <input
              type="tel"
              placeholder="Telefonnummer"
              value={telefonnummer}
              onChange={(e) => setTelefonnummer(e.target.value)}
              className="w-full p-2 border rounded text-black"
              // required
            />
            <p className="text-xs text-gray-500 mt-1">
              ℹ️ Wird benötigt, um dich bei kurzfristigen Änderungen zu
              erreichen.
            </p>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Mannschaftsauswahl (Mehrfachauswahl möglich)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {alleMannschaften.map((m) => (
                <label key={m} className="text-sm">
                  <input
                    type="checkbox"
                    checked={mannschaften.includes(m)}
                    onChange={() => toggleMannschaft(m)}
                    className="mr-2"
                  />
                  {m}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              ℹ️ Wir brauchen diese Info, um dich korrekt zuordnen zu können.
            </p>
            {mannschaften.includes("Sonstige") && (
              <input
                type="text"
                placeholder="z. B. Redaktion, Fan, Sponsor, Platzwart"
                value={sonstigeMannschaft}
                onChange={(e) => setSonstigeMannschaft(e.target.value)}
                className="mt-2 w-full p-2 border rounded text-black"
              />
            )}
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail-Adresse"
            required
            className="w-full p-2 border rounded text-black"
          />

          <input
            type={passwortAnzeigen ? "text" : "password"}
            value={passwort}
            onChange={(e) => setPasswort(e.target.value)}
            placeholder="Passwort"
            required
            className="w-full p-2 border rounded text-black"
          />

          <div className="relative">
            <input
              type={passwortAnzeigen ? "text" : "password"}
              value={passwortBestaetigung}
              onChange={(e) => setPasswortBestaetigung(e.target.value)}
              placeholder="Passwort bestätigen"
              required
              className="w-full p-2 border rounded text-black pr-10"
            />
            {passwortBestaetigung && (
              <span className="absolute top-2 right-3">
                {passwort === passwortBestaetigung ? (
                  <FaCheckCircle className="text-green-600" />
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )}
              </span>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={passwortAnzeigen}
              onChange={() => setPasswortAnzeigen((prev) => !prev)}
            />
            Passwort anzeigen
          </label>

          <button
            type="submit"
            disabled={!istFormularGueltig}
            className={`w-full px-4 py-2 rounded text-white transition ${
              istFormularGueltig
                ? "bg-black hover:bg-gray-800 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            ➡️ Jetzt registrieren
          </button>

          {fehler && (
            <p className="text-red-500 text-sm text-center">{fehler}</p>
          )}
          {erfolg && (
            <p className="text-green-600 text-sm text-center">{erfolg}</p>
          )}
        </form>

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
