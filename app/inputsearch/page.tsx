"use client";

import Inputsearch from "@/components/inputsearch";
import Navbar from "@/components/Navbar";

export default function Inputs() { //ชื่อของ class หลัง export ต้องขึ้นด้วยตัวใหญ่เสมอ
  return (
    <div >
      <Navbar />
          <main className="flex flex-col items-center justify-center min-h-screen py-2">
          <Inputsearch name="John" /> 
          </main>
    </div>
  );
}
