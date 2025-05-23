"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchNews, NewsItem } from "@/utils/fetchNews";
import { formatCapitalized } from "@/utils/formatCapitalized";

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">📰 Vereins-News</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <article
            key={item.id.toString()}
            className="bg-[var(--background)] text-[var(--foreground)] border border-gray-200 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <Image
              src={item.bild_url || "/placeholder.jpg"}
              alt={item.titel}
              width={600}
              height={400}
              className="w-full h-60 sm:h-64 object-cover"
            />
            <div className="p-4 space-y-2">
              <span className="text-[10px] uppercase font-semibold text-gray-500">
                {formatCapitalized(item.kategorie)}
              </span>

              <h3 className="text-sm font-semibold leading-tight line-clamp-2">
                {item.titel}
              </h3>
              <p className="text-sm text-[var(--foreground)] opacity-80 line-clamp-4">
                {item.teaser}
              </p>

              <time className="block text-xs text-gray-400">
                📅 {new Date(item.created_at).toLocaleDateString("de-DE")}
              </time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
