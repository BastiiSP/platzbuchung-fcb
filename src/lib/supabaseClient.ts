import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ✅ Direkte Instanz für schnellen Zugriff
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

// ✅ Factory-Funktion mit manuellem JSON-Header (gegen 406-Fehler)
export const createClient = () =>
  createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Accept: "application/json",
      },
    },
  });