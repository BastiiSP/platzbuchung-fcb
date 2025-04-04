import { createClient } from "@/lib/supabaseClient";

export async function checkSession(supabase: ReturnType<typeof createClient>) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (!user) return { userId: null, rolle: null, userEmail: null };

  const { data: profile } = await supabase
    .from("profile")
    .select("rolle")
    .eq("id", user.id)
    .single();

  return {
    userId: user.id,
    rolle: profile?.rolle || null,
    userEmail: user.email ?? null,
  };
}

