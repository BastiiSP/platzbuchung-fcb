"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatCapitalized } from "@/utils/formatCapitalized";
import { NewsItem } from "@/utils/fetchNews";

interface NewsCardProps {
  item: NewsItem;
  index: number;
}

export default function NewsCard({ item, index }: NewsCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isClient, setIsClient] = useState(() => typeof window !== "undefined");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  if (!isClient) return null;

  return (
    <article
      ref={ref}
      className={`bg-[var(--background)] text-[var(--foreground)] border border-gray-200 rounded-lg shadow hover:shadow-lg transition overflow-hidden fade-in-up ${
        visible ? `fade-in-up-visible fade-delay-${Math.min(index, 5)}` : ""
      }`}
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
  );
}
