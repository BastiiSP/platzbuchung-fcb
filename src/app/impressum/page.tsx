"use client";

export default function ImpressumPage() {
  return (
    <main className="min-h-screen p-6 max-w-3xl mx-auto text-[var(--foreground)]">
      <h1 className="text-3xl font-bold mb-4">Impressum</h1>
      <p>
        <strong>Angaben gemäß § 5 TMG</strong>
      </p>
      <p>
        1. FC 1911 Burgkunstadt e.V.
        <br />
        Alter Postweg 10
        <br />
        96224 Burgkunstadt
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Eintragung im Vereinsregister
      </h2>
      <p>
        Eingetragen im Vereinsregister beim Amtsgericht Coburg unter der Nummer
        VR 20074
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Vertreten durch:</h2>
      <p>1. Vorsitzender: Wolfgang Strassgürtel</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Kontakt</h2>
      <p>
        Telefon: 09572 2090152
        <br />
        E-Mail: info@fcburgkunstadt.de
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
      </h2>
      <p>
        Wolfgang Strassgürtel
        <br />
        Alter Postweg 10
        <br />
        96224 Burgkunstadt
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Haftungsausschluss</h2>
      <p>
        Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt.
        Für die Richtigkeit, Vollständigkeit und Aktualität übernehmen wir
        jedoch keine Gewähr.
      </p>

      <p className="mt-8 text-sm opacity-60">Letzte Aktualisierung: Mai 2025</p>
    </main>
  );
}
