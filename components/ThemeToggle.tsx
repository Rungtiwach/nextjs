
"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // ทุกครั้งที่ dark เปลี่ยน → ใส่/ถอด class "dark" ที่ <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="rounded-lg border border-slate-600 px-3 py-1"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
