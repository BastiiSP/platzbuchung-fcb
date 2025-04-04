import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-300 dark:border-neutral-700 px-6 py-4 bg-gray-100 dark:bg-neutral-800 text-sm text-left text-gray-700 dark:text-gray-300">
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
            className="hover:text-blue-600"
            aria-label="Facebook"
          >
            <FaFacebook size={20} />
          </Link>

          <Link
            href="https://www.instagram.com/schuhstaedter1911?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
