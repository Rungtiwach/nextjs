
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/inputsearch";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Link href="/count" className="text-blue-600 underline">
          ไปหน้าปุ่มนับเลข
        </Link>
         <Input name="John" ></Input> 
         <Input name="Jane" />
      </main>
    </div>
  );
}