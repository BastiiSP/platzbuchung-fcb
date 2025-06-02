import { NextResponse } from "next/server";

export async function GET() {
  try {
    const feedUrl =
      "https://rss-bridge.org/bridge01/?action=display&bridge=Instagram&u=schuhstaedter1911&media_type=all&format=Mrss";

    const res = await fetch(feedUrl);
    const xml = await res.text();

    return NextResponse.json({ xml });
  } catch (error) {
    console.error("❌ Fehler beim Server-Fetch des Instagram-Feeds:", error);
    return NextResponse.json({ error: "Server-Fehler" }, { status: 500 });
  }
}
