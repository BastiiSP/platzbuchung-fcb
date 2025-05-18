"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Menu } from "@headlessui/react";
import { FiUser } from "react-icons/fi";

interface UserData {
  email: string;
  vorname: string | null;
  nachname: string | null;
  avatar_url: string | null;
}

export default function UserDropdown() {
  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Session prüfen & auf Auth-Status reagieren
  useEffect(() => {
    const getSessionAndListen = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { data, error } = await supabase
          .from("profile")
          .select("vorname, nachname, avatar_url")
          .eq("id", session.user.id)
          .single();

        if (!error) {
          setUser({
            email: session.user.email ?? "",
            vorname: data?.vorname ?? "",
            nachname: data?.nachname ?? "",
            avatar_url: data?.avatar_url ?? null,
          });
          setIsLoggedIn(true);
        }
      }

      // Auth-Änderungen live mitverfolgen
      const { data: listener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            const { data, error } = await supabase
              .from("profile")
              .select("vorname, nachname, avatar_url")
              .eq("id", session.user.id)
              .single();

            if (!error) {
              setUser({
                email: session.user.email ?? "",
                vorname: data?.vorname ?? "",
                nachname: data?.nachname ?? "",
                avatar_url: data?.avatar_url ?? null,
              });
              setIsLoggedIn(true);
            }
          } else {
            setUser(null);
            setIsLoggedIn(false);
          }
        }
      );

      return () => {
        listener?.subscription.unsubscribe();
      };
    };

    getSessionAndListen();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const getInitials = () => {
    const vor = user?.vorname?.charAt(0) ?? "";
    const nach = user?.nachname?.charAt(0) ?? "";
    return `${vor}${nach}`.toUpperCase();
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* Button im Header */}
      <Menu.Button className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--foreground)] text-[var(--background)] font-bold overflow-hidden">
        {isLoggedIn ? (
          user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="Profilbild"
              className="w-10 h-10 object-cover rounded-full"
            />
          ) : (
            <span>{getInitials()}</span>
          )
        ) : (
          <FiUser className="w-5 h-5" />
        )}
      </Menu.Button>

      {/* Dropdown-Inhalt */}
      <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right rounded-md bg-[var(--background)] text-[var(--foreground)] shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999] px-2 pb-2">
        {isLoggedIn ? (
          <>
            <div className="px-2 pt-2 text-sm">
              Eingeloggt als {user?.vorname ?? "Unbekannt"}
            </div>
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <button
                  onClick={handleLogout}
                  className={`mt-3 px-4 py-2 w-full font-bold text-sm text-center rounded border ${
                    active
                      ? "bg-red-700 border-red-800"
                      : "bg-red-600 hover:bg-red-700 border-red-700"
                  } text-white transition`}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </>
        ) : (
          <Menu.Item>
            {({ active }: { active: boolean }) => (
              <button
                onClick={() => router.push("/login")}
                className={`mt-3 px-4 py-2 w-full font-bold text-sm text-center rounded border ${
                  active
                    ? "bg-green-700 border-green-800"
                    : "bg-green-600 hover:bg-green-700 border-green-700"
                } text-white transition`}
              >
                Login
              </button>
            )}
          </Menu.Item>
        )}
      </Menu.Items>
    </Menu>
  );
}
