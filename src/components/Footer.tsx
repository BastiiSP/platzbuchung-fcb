"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`w-full border-t border-gray-300 px-6 py-4 mt-6 bg-neutral-100 dark:bg-neutral-800 text-[var(--foreground)] text-sm text-left shadow-inner fade-in-up ${
        visible ? "fade-in-up-visible" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 max-w-5xl mx-auto">
        <div className="text-center md:text-left">
          © 2025
          <p>1. FC 1911 Burgkunstadt e. V.</p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/impressum" className="hover:underline">
            Impressum
          </Link>
          <span className="text-[var(--foreground)] text-lg font-bold leading-none">
            ·
          </span>
          <Link href="/datenschutz" className="hover:underline">
            Datenschutz
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <Link
            href="https://www.facebook.com/fc1911?locale=de_DE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--foreground)] hover:text-[#1877F2] transition"
            aria-label="Facebook"
          >
            <FaFacebook size={25} />
          </Link>
          <Link
            href="https://www.instagram.com/schuhstaedter1911"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--foreground)] hover:text-[#E4405F] transition"
            aria-label="Instagram"
          >
            <FaInstagram size={25} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
