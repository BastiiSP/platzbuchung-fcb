"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rolle, setRolle] = useState("trainer"); // 👈 Neue Rolle-Auswahl
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
      return;
    }

    setSuccessMessage(
      "✅ Registrierung erfolgreich! Bitte bestätige deine E-Mail."
    );

    // Weiterleitung zur Info-Seite nach 2 Sekunden
    setTimeout(() => {
      router.push("/confirm-email");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-700 p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Login / Registrierung
        </h1>

        <input
          className="w-full text-gray-700 border p-2 rounded"
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full text-gray-700 border p-2 rounded"
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Rollen-Auswahl beim Registrieren */}
        <select
          className="w-full text-gray-700 border p-2 rounded"
          value={rolle}
          onChange={(e) => setRolle(e.target.value)}
        >
          <option value="trainer">Trainer</option>
          <option value="vorstand">Vorstand</option>
          <option value="platzwart">Platzwart</option>
        </select>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {successMessage && (
          <p className="text-green-600 text-sm">{successMessage}</p>
        )}

        {/* Login-Button */}
        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Bitte warten..." : "Login"}
        </button>

        {/* Registrierungs-Button */}
        <button
          className="w-full bg-gray-300 text-black p-2 rounded hover:bg-gray-400 disabled:opacity-50"
          onClick={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? "Registrierung läuft..." : "Registrierung"}
        </button>
      </div>
    </div>
  );
}
