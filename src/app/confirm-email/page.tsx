"use client";

import Link from "next/link";
import Image from "next/image";

export default function ConfirmEmailPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-white text-black dark:bg-neutral-900 dark:text-white">
      <div className="bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg p-8 max-w-md w-full text-center shadow-md">
        <div className="flex justify-center mb-4">
          <Image src="/logo.svg" alt="Vereinswappen" width={60} height={60} />
        </div>
        <h1 className="text-2xl font-bold mb-2">
          ✅ Registrierung erfolgreich
        </h1>
        <p className="mb-4 text-sm">
          Bitte bestätige deine E-Mail-Adresse über den Link in deinem Postfach,
          um dich einzuloggen.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-5 py-2 border border-black dark:border-white rounded hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
        >
          🔙 Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
