"use client";
 
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import ThemeToggle from "@/components/ThemeToggle";
 
export default function Navbar() {
  const { lang, setLang, t } = useLang();
 
  const links = [
    { href: "/", label: t.home },
    { href: "/posts", label: t.posts },
    { href: "/count", label: lang === "th" ? "ตัวนับ" : "Counter" },
    { href: "/Card", label: lang === "th" ? "การ์ด" : "Card" },
  ];
 
  return (
    <nav className="bg-slate-900 p-4 text-white">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold"></Link>
 
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-sky-400"
            >
              {link.label}
            </Link>
          ))}
 
          <button
            onClick={() => setLang(lang === "th" ? "en" : "th")}
            className="rounded border px-3 py-1"
          >
            {lang === "th" ? "EN" : "TH"}
          </button>
 
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}