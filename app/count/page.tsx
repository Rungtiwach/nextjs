"use client";

import Image from "next/image";
import Counter from "@/components/count";
import Navbar from "@/components/Navbar";

export default function Count() {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <Counter />
      </main>
    </div>
  );
}
