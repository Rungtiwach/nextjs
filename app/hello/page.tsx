
"use client";

import { useState, useEffect } from "react";

type Hello = {
  message: string;
  time: string;
};

export default function HelloPage() {
  const [data, setData] = useState<Hello | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/helloSend?name=John", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setData(await res.json());
    } catch {
      setError("เรียก API ไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);


  return (
    <main className="flex flex-col items-center py-2 p-4">
    <div className="w-full max-w-xl rounded-lg bg-blue-100 p-4">
      <h1 className="text-2xl font-bold">/api/helloSend</h1>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">
          {loading ? "กำลังโหลด..." : data?.message}
        </h2>
      </div>

      <p className="mt-2 text-slate-600">
        {error ? error : data?.time}
      </p>
        <button
          onClick={load}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "กำลังโหลด..." : "↻ รีเฟรช"}
        </button>
    </div>
    </main>
  );

}
