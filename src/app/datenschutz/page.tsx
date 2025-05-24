"use client";

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen p-6 max-w-3xl mx-auto text-[var(--foreground)]">
      <h1 className="text-3xl font-bold mb-4">Datenschutzerklärung</h1>

      <p>
        Der Schutz deiner persönlichen Daten ist uns ein wichtiges Anliegen.
        Nachfolgend informieren wir dich über die Art, den Umfang und Zweck der
        Verarbeitung personenbezogener Daten innerhalb unserer Vereins-WebApp.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Verantwortlicher</h2>
      <p>
        1. FC 1911 Burgkunstadt e.V.
        <br />
        Wolfgang Strassgürtel
        <br />
        Alter Postweg 10
        <br />
        96224 Burgkunstadt
        <br />
        info@fcburgkunstadt.de
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Zugriffsdaten / Hosting
      </h2>
      <p>
        Diese WebApp wird über Vercel Inc. (USA) gehostet. Beim Aufruf der Seite
        werden automatisch technische Daten wie IP-Adresse, Browsertyp und
        Zugriffszeit erfasst. Diese Daten dienen der Sicherstellung des Betriebs
        und der Fehleranalyse.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Supabase</h2>
      <p>
        Zur Nutzerverwaltung, Buchung und Datenspeicherung verwenden wir
        Supabase. Dabei können Daten wie E-Mail-Adresse, Name, Mannschaft und
        Buchungsdetails verarbeitet werden.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Zweck der Datenverarbeitung
      </h2>
      <p>
        Die Datenverarbeitung dient ausschließlich der Organisation des
        Spielbetriebs und der Platzbelegung im Verein.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Rechtsgrundlage</h2>
      <p>
        Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO
        (Vertrag) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Cookies</h2>
      <p>
        Diese WebApp verwendet ausschließlich technisch notwendige Cookies,
        z. B. zur Verwaltung deiner Sitzung (Login-Status). Eine Einwilligung
        ist hierfür nicht erforderlich.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Betroffenenrechte</h2>
      <p>
        Du hast das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung
        der Verarbeitung deiner Daten sowie das Recht auf Datenübertragbarkeit.
        Wende dich dazu bitte an info@fcburgkunstadt.de.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Änderungen</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an
        aktuelle rechtliche Anforderungen oder Änderungen in der WebApp
        anzupassen.
      </p>

      <p className="mt-8 text-sm opacity-60">Letzte Aktualisierung: Mai 2025</p>
    </main>
  );
}
