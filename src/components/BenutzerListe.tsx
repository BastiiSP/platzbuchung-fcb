"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { FiEdit2, FiChevronDown, FiChevronUp } from "react-icons/fi";

type Nutzer = {
  id: string;
  vorname: string;
  nachname: string;
  email: string;
  rollen: string[];
  telefonnummer?: string;
  mannschaften?: string[] | null;
  sonstige_mannschaft?: string | null;
};

export default function BenutzerListe() {
  const supabase = createClient();
  const [nutzer, setNutzer] = useState<Nutzer[]>([]);
  const [suche, setSuche] = useState("");
  const [expandedUserIds, setExpandedUserIds] = useState<string[]>([]);

  useEffect(() => {
    const ladeNutzer = async () => {
      const { data, error } = await supabase
        .from("profile")
        .select(
          "id, vorname, nachname, email, rollen, telefonnummer, mannschaften, sonstige_mannschaft"
        );
    };

    ladeNutzer();
  }, [supabase]);

  const gefiltert = nutzer.filter((n) =>
    `${n.vorname} ${n.nachname}`.toLowerCase().includes(suche.toLowerCase())
  );

  const toggleDetails = (id: string) => {
    setExpandedUserIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="🔍 Nutzer suchen …"
        value={suche}
        onChange={(e) => setSuche(e.target.value)}
        className="form-field mb-4"
      />

      <div className="space-y-4">
        {gefiltert.map((n) => (
          <div
            key={n.id}
            className="border rounded p-4 transition bg-[var(--background)] text-[var(--foreground)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold">
                  {n.vorname} {n.nachname}
                </p>
                <p className="text-sm opacity-80">
                  Rolle(n): {n.rollen?.join(", ") || "–"}
                </p>
              </div>

              <div className="flex items-center mt-2 sm:mt-0 space-x-3">
                <button
                  onClick={() => toggleDetails(n.id)}
                  className="text-sm underline flex items-center"
                >
                  {expandedUserIds.includes(n.id) ? (
                    <>
                      Details ausblenden <FiChevronUp className="ml-1" />
                    </>
                  ) : (
                    <>
                      Weitere Infos <FiChevronDown className="ml-1" />
                    </>
                  )}
                </button>

                <button
                  onClick={() => alert("Rollen bearbeiten folgt")}
                  title="Rollen bearbeiten"
                  className="p-2 border rounded hover:opacity-80 transition"
                >
                  <FiEdit2 />
                </button>
              </div>
            </div>

            {expandedUserIds.includes(n.id) && (
              <div className="mt-4 text-sm space-y-1">
                <p>📧 E-Mail: {n.email}</p>
                {n.telefonnummer && <p>📞 Telefon: {n.telefonnummer}</p>}
                {n.mannschaften &&
                  Array.isArray(n.mannschaften) &&
                  n.mannschaften.length > 0 && (
                    <p>👥 Mannschaft(en): {n.mannschaften.join(", ")}</p>
                  )}
                {n.sonstige_mannschaft && (
                  <p>📝 Sonstige Mannschaft: {n.sonstige_mannschaft}</p>
                )}
              </div>
            )}
          </div>
        ))}

        {gefiltert.length === 0 && (
          <p className="text-sm italic text-center opacity-70">
            Keine Nutzer gefunden.
          </p>
        )}
      </div>
    </div>
  );
}
