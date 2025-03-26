"use client";

export default function ConfirmEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          📬 Bestätige deine E-Mail-Adresse
        </h1>
        <p className="text-gray-700">
          Wir haben dir eine E-Mail geschickt. Bitte klicke auf den
          Bestätigungslink, um dein Konto zu aktivieren.
        </p>
        <p className="text-gray-500 text-sm">
          Danach kannst du dich ganz normal einloggen.
        </p>
        <p className="text-blue-400 text-sm">
          ℹ️ Du kannst diese Seite schließen, sobald die Bestätigungsmail bei
          dir angekommen ist. Das kann bis zu 2 Minuten dauern - Habe etwas
          Geduld!
        </p>
      </div>
    </div>
  );
}
