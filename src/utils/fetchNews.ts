import { createClient } from "@/lib/supabaseClient";
import { XMLParser } from "fast-xml-parser";

// Einheitlicher Typ für beide Quellen
export type NewsItem = {
  id: string | number;
  titel: string;
  teaser: string;
  inhalt?: string;
  bild_url: string;
  kategorie: string;
  created_at: string;
};

// Bild aus <description> extrahieren (z. B. <img src="...">)
function extractImageFromDescription(description: string): string | null {
  const match = description.match(/<img[^>]+src="([^">]+)"/);
  return match?.[1] || null;
}

// Supabase-News laden
async function fetchSupabaseNews(): Promise<NewsItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("news")
    .select("id, titel, teaser, inhalt, bild_url, kategorie, created_at")
    .eq("veröffentlicht", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("❌ Fehler beim Laden der Supabase-News:", error);
    return [];
  }

  return data as NewsItem[];
}

// Instagram-News aus RSS (rss.app)
async function fetchInstagramNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch("https://rss.app/feeds/qpbzqu7KkjNGT2rU.xml");
    const xml = await res.text();

    const parser = new XMLParser();
    const parsed = parser.parse(xml);

    const items = parsed.rss?.channel?.item || [];

    return items.slice(0, 3).map((item: any, index: number) => ({
      id: `ig-${index}`,
      titel: item.title || "Instagram-Beitrag",
      teaser:
        (item.description?.replace(/<[^>]+>/g, "").slice(0, 150) + "…") ||
        "Neuer Beitrag auf Instagram.",
      bild_url:
        item.enclosure?.["@_url"] ||
        item["media:content"]?.["@_url"] ||
        extractImageFromDescription(item.description || "") ||
        "/placeholder.jpg",
      kategorie: "Instagram",
      created_at: item.pubDate || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("❌ Fehler beim Laden des Instagram-Feeds:", error);
    return [];
  }
}

// Kombinierte Hauptfunktion
export async function fetchNews(): Promise<NewsItem[]> {
  const [supabaseNews, instagramNews] = await Promise.all([
    fetchSupabaseNews(),
    fetchInstagramNews(),
  ]);

  const combined = [...supabaseNews, ...instagramNews].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return combined.slice(0, 3); // maximal 3 Beiträge
}
