"use client";

import Link from "next/link";
import Image from "next/image";

export default function ConfirmEmailPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--background)] text-[var(--foreground)]">
      <div className="bg-[#f9f9f9] border border-gray-300 rounded-lg p-8 max-w-md w-full text-center shadow-md space-y-4">
        <div className="flex justify-center">
          <Image src="/logo.svg" alt="Vereinswappen" width={60} height={60} />
        </div>

        <h1 className="text-2xl font-bold">
          🎉 Willkommen beim 1. FC 1911 Burgkunstadt!
        </h1>

        <p className="text-sm">
          Deine E-Mail-Adresse wurde erfolgreich bestätigt.
        </p>

        <p className="text-sm">
          Du bist nun automatisch eingeloggt. Oben rechts auf der Startseite
          siehst du deinen Login-Status.
        </p>

        <Link
          href="/"
          className="inline-block mt-4 px-5 py-2 border border-[var(--foreground)] rounded hover:bg-gray-100 transition"
        >
          🏠 Zur Startseite
        </Link>
      </div>
    </main>
  );
}
