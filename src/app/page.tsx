"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? null);
      }
    };

    getUser();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6 flex-col gap-4">
      <h1 className="text-3xl font-bold text-blue-600">
        Willkommen zur Platzbuchung FCB ⚽
      </h1>
      {userEmail ? (
        <p className="text-lg text-green-700">Eingeloggt als: {userEmail}</p>
      ) : (
        <p className="text-lg text-red-600">Nicht eingeloggt</p>
      )}
    </main>
  );
}
