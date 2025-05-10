import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-300 px-6 py-4 bg-[var(--background)] text-[var(--foreground)] text-sm text-left">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 max-w-5xl mx-auto">
        <div>
          © 2025
          <p>1. FC 1911 Burgkunstadt e. V.</p>
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
