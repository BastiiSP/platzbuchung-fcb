"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

const supabase = createClient();

// 👉 Dummy-Komponente für Live-Umgebung
function RegistrierenDebugDisabled() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        ⚠️ Diese Seite ist nur in der lokalen Entwicklungsumgebung verfügbar.
      </p>
    </main>
  );
}

// 👉 Eigentliche Debug-Komponente
function RegistrierenDebugActive() {
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [vorname, setVorname] = useState("Test");
  const [nachname, setNachname] = useState("User");
  const [telefonnummer, setTelefonnummer] = useState("0000000000");
  const [mannschaften, setMannschaften] = useState('["Herren 1"]');
  const [sonstigeMannschaft, setSonstigeMannschaft] = useState("");
  const [feedback, setFeedback] = useState("");
  const [passwortStarke, setPasswortStarke] = useState(0);
  const [passwortFeedback, setPasswortFeedback] = useState({
    hasLower: false,
    hasUpper: false,
    hasNumber: false,
    hasSymbol: false,
    hasMinLength: false,
  });

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

  const handleDebugRegistrierung = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback("");

    let parsedMannschaften = [];
    try {
      parsedMannschaften = JSON.parse(mannschaften);
    } catch (err) {
      console.error("❌ Ungültiges JSON im Mannschaften-Feld", err);
      setFeedback("❌ Ungültiges JSON im Mannschaften-Feld");
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
          mannschaften: parsedMannschaften,
          sonstige_mannschaft: sonstigeMannschaft || null,
        },
      },
    });

    if (error) {
      console.error("❌ Supabase Fehler:", error);
      setFeedback(`❌ Fehler: ${error.message}`);
    } else {
      setFeedback("✅ Erfolgreich! Bitte Mail checken.");
    }
  };

  return (
    <main className="min-h-screen p-6 bg-[var(--background)] dark:bg-neutral-900 text-[var(--foreground)] dark:text-white">
      <h1 className="text-xl font-bold mb-4">🧪 Debug Registrierung</h1>

      <form onSubmit={handleDebugRegistrierung} className="space-y-3 max-w-md">
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-field"
        />

        <input
          type="password"
          placeholder="Passwort"
          value={passwort}
          onChange={(e) => handlePasswortChange(e.target.value)}
          required
          className="form-field"
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

        <input
          type="text"
          placeholder="Vorname"
          value={vorname}
          onChange={(e) => setVorname(e.target.value)}
          className="form-field"
        />
        <input
          type="text"
          placeholder="Nachname"
          value={nachname}
          onChange={(e) => setNachname(e.target.value)}
          className="form-field"
        />
        <input
          type="text"
          placeholder="Telefonnummer"
          value={telefonnummer}
          onChange={(e) => setTelefonnummer(e.target.value)}
          className="form-field"
        />
        <input
          type="text"
          placeholder='Mannschaften (z. B. ["Herren 1", "A1-Jugend"])'
          value={mannschaften}
          onChange={(e) => setMannschaften(e.target.value)}
          className="form-field"
        />
        <input
          type="text"
          placeholder="Sonstige Mannschaft (optional)"
          value={sonstigeMannschaft}
          onChange={(e) => setSonstigeMannschaft(e.target.value)}
          className="form-field"
        />
        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          ➡️ Jetzt testen
        </button>

        {feedback && <p className="mt-3 text-sm font-medium">{feedback}</p>}
      </form>
    </main>
  );
}

// ✅ Bedingter Export basierend auf Umgebungsvariable
export default process.env.NEXT_PUBLIC_DEBUG_MODE === "true"
  ? RegistrierenDebugActive
  : RegistrierenDebugDisabled;
