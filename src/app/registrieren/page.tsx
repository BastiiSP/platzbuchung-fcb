"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabaseClient";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Registrierungsseite() {
  const supabase = createClient();
  const router = useRouter();

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

  const [passwortStarke, setPasswortStarke] = useState(0);
  const [passwortFeedback, setPasswortFeedback] = useState({
    hasLower: false,
    hasUpper: false,
    hasNumber: false,
    hasSymbol: false,
    hasMinLength: false,
  });

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

  const handlePasswortChange = (value: string) => {
    setPasswort(value);

    const feedback = {
      hasLower: /[a-z]/.test(value),
      hasUpper: /[A-Z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSymbol: /[^A-Za-z0-9]/.test(value),
      hasMinLength: value.length >= 8,
    };
    setPasswortFeedback(feedback);

    const score =
      Number(feedback.hasLower) +
      Number(feedback.hasUpper) +
      Number(feedback.hasNumber) +
      Number(feedback.hasSymbol) +
      Number(feedback.hasMinLength);
    setPasswortStarke(score);
  };

  const handleRegistrierung = async (e: React.FormEvent) => {
    e.preventDefault();
    setFehler("");
    setErfolg("");

    if (!vorname || !nachname || !telefonnummer) {
      setFehler("❌ Bitte alle Pflichtfelder ausfüllen.");
      return;
    }

    if (passwort !== passwortBestaetigung) {
      setFehler("❌ Die Passwörter stimmen nicht überein.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password: passwort,
      options: {
        data: {
          vorname,
          nachname,
          telefonnummer,
          mannschaften,
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

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white flex flex-col items-center justify-center px-4">
      <header className="absolute top-0 left-0 w-full flex items-center justify-between p-4 border-b border-gray-300 dark:border-neutral-700">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Vereinslogo" width={32} height={32} />
          <span className="font-semibold text-sm sm:text-base">
            1. FC 1911 Burgkunstadt
          </span>
        </div>
      </header>

      <div className="w-full max-w-xl bg-gray-100 dark:bg-neutral-800 p-6 rounded shadow mt-20">
        <h1 className="text-2xl font-bold text-center mb-4">📝 Registrieren</h1>
        <form onSubmit={handleRegistrierung} className="space-y-4">
          {/* Vorname / Nachname */}
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Vorname"
              value={vorname}
              onChange={(e) => setVorname(e.target.value)}
              className="flex-1 p-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Nachname"
              value={nachname}
              onChange={(e) => setNachname(e.target.value)}
              className="flex-1 p-2 border rounded text-black"
            />
          </div>

          {/* Telefonnummer */}
          <div>
            <input
              type="tel"
              placeholder="Telefonnummer"
              value={telefonnummer}
              onChange={(e) => setTelefonnummer(e.target.value)}
              className="w-full p-2 border rounded text-black"
            />
            <p className="text-xs text-gray-500 mt-1">
              ℹ️ Wird benötigt, um dich bei kurzfristigen Änderungen zu
              erreichen.
            </p>
          </div>

          {/* Mannschaftsauswahl */}
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

          {/* E-Mail */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail-Adresse"
            required
            className="w-full p-2 border rounded text-black"
          />

          {/* Passwortfeld mit Live-Feedback */}
          <input
            type={passwortAnzeigen ? "text" : "password"}
            value={passwort}
            onChange={(e) => handlePasswortChange(e.target.value)}
            placeholder="Passwort"
            required
            className="w-full p-2 border rounded text-black"
          />

          <div className="text-sm mt-2 space-y-1">
            <div>{passwortFeedback.hasLower ? "✅" : "❌"} Kleinbuchstaben</div>
            <div>{passwortFeedback.hasUpper ? "✅" : "❌"} Großbuchstaben</div>
            <div>{passwortFeedback.hasNumber ? "✅" : "❌"} Zahl</div>
            <div>{passwortFeedback.hasSymbol ? "✅" : "❌"} Sonderzeichen</div>
            <div>
              {passwortFeedback.hasMinLength ? "✅" : "❌"} Mind. 8 Zeichen
            </div>
          </div>

          <div className="mt-2 h-2 w-full rounded bg-gray-300 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                passwortStarke <= 2
                  ? "bg-red-500 w-1/5"
                  : passwortStarke === 3
                  ? "bg-yellow-400 w-3/5"
                  : passwortStarke === 4
                  ? "bg-yellow-500 w-4/5"
                  : "bg-green-500 w-full"
              }`}
            />
          </div>
          <p className="text-xs mt-1">
            {passwortStarke <= 2
              ? "🔒 Sehr schwach"
              : passwortStarke === 3
              ? "🟡 Mittel"
              : passwortStarke === 4
              ? "🟠 Gut"
              : "🟢 Sehr stark"}
          </p>

          {/* Passwort bestätigen */}
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

          {/* Passwort anzeigen */}
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
