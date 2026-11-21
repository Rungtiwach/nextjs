"use client";
import { useState } from "react";
type CardProps = {
  name: string;
};
 
export default function Greeting({
    name
}: CardProps){
  return (
    <div className="p-8">
      {/* <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="พิมพ์ชื่อของคุณ"
        className="rounded border p-2"
      /> */}
      <p className="mt-4 text-xl">
        สวัสดี {name}
      </p>
    </div>
  );
}
 