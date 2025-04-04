import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Exportiere eine Instanz für direkten Gebrauch
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

// Exportiere auch die Factory-Funktion für flexible Instanzen
export const createClient = () => createSupabaseClient(supabaseUrl, supabaseAnonKey);
