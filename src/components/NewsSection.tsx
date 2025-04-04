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
            key={item.id}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden border dark:border-neutral-700"
          >
            <Image
              src={item.bild_url || "/placeholder.jpg"}
              alt={item.titel}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <span className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
                {formatCapitalized(item.kategorie)}
              </span>
              <h3 className="text-lg font-bold">{item.titel}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
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
