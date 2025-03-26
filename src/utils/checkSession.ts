import { SupabaseClient } from "@supabase/supabase-js";
import { getUserRolle } from "./getUserRolle";

/**
 * Prüft, ob ein User eingeloggt ist und gibt User-ID & Rolle zurück.
 */
export async function checkSession(
  supabase: SupabaseClient
): Promise<{ userId: string | null; rolle: string | null }> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return { userId: null, rolle: null };
  }

  const userId = session.user.id;
  const rolle = await getUserRolle(supabase, userId);

  return { userId, rolle };
}
