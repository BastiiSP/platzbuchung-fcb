import { createClient } from "@/lib/supabaseClient";

export type NewsItem = {
  id: number;
  titel: string;
  teaser: string;
  inhalt: string;
  bild_url: string;
  kategorie: string;
  created_at: string;
};

export async function fetchNews(): Promise<NewsItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("news")
    .select("id, titel, teaser, inhalt, bild_url, kategorie, created_at")
    .eq("veröffentlicht", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Fehler beim Laden der News:", error);
    return [];
  }

  console.log("Geladene News:", data);
  return data as NewsItem[];
}
