"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { checkSession } from "@/utils/checkSession";

export default function VorstandPage() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [zugelassen, setZugelassen] = useState(false);
  const [activeTab, setActiveTab] = useState<"benutzer" | "buchungen">(
    "benutzer"
  );

  const isLocalhost =
    typeof window !== "undefined" && window.location.hostname === "localhost";

  useEffect(() => {
    const checkAccess = async () => {
      if (isLocalhost) {
        setZugelassen(true);
        setLoading(false);
        return;
      }

      const session = await checkSession(supabase);
      const rolle = session?.rolle;

      if (rolle === "vorstand" || rolle === "admin") {
        setZugelassen(true);
      } else {
        setZugelassen(false);
      }

      setLoading(false);
    };

    checkAccess();
  }, [supabase, isLocalhost]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg">🔄 Lade Inhalte …</p>
      </main>
    );
  }

  if (!zugelassen) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold">🚫 Kein Zugriff</p>
          <p className="text-sm opacity-75">
            Diese Seite ist nur für Vorstandsmitglieder und Admins zugänglich.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-6">
        Vorstandsbereich - Vereinsverwaltung
      </h1>

      {/* Tabs – mobil untereinander, ab sm nebeneinander */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-6">
        <button
          className={`px-4 py-2 rounded border transition w-full sm:w-auto ${
            activeTab === "benutzer"
              ? "bg-[var(--foreground)] text-[var(--background)]"
              : "bg-transparent border-[var(--foreground)] text-[var(--foreground)]"
          }`}
          onClick={() => setActiveTab("benutzer")}
        >
          👥 Benutzer
        </button>
        <button
          className={`px-4 py-2 rounded border transition w-full sm:w-auto ${
            activeTab === "buchungen"
              ? "bg-[var(--foreground)] text-[var(--background)]"
              : "bg-transparent border-[var(--foreground)] text-[var(--foreground)]"
          }`}
          onClick={() => setActiveTab("buchungen")}
        >
          📅 Buchungen
        </button>
      </div>

      {/* Inhalte */}
      {activeTab === "benutzer" && (
        <section>
          <p className="text-lg mb-2">Benutzerverwaltung folgt …</p>
        </section>
      )}

      {activeTab === "buchungen" && (
        <section>
          <p className="text-lg mb-2">Buchungsübersicht folgt …</p>
        </section>
      )}
    </main>
  );
}
