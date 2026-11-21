"use client";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

export default function Greeting() { //ชื่อของ class หลัง export ต้องขึ้นด้วยตัวใหญ่เสมอ
  return (
    <div>
      <Navbar />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
        <Card title="อยากลาออก" body="มาทำไม" />
        <Card title="อยากลาออก" body="มาทำไม" />
        <Card title="ลง system" body="ตื่นมาทำไม" />
      </div>
    </div>
  );
}
    