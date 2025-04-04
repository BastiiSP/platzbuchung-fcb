import { createClient } from "@/lib/supabaseClient";

export type NewsItem = {
  id: number;
  titel: string;
  teaser: string;
  bild_url: string;
  kategorie: string;
  datum: string;
};

export async function fetchNews(): Promise<NewsItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("news")
    .select("id, titel, teaser, bild_url, kategorie, datum")
    .eq("veröffentlicht", true)
    .order("datum", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Fehler beim Laden der News:", error);
    return [];
  }

  return data as NewsItem[];
}
