"use client";
import { Card } from "@/components/Card";
import { HeaderPage } from "@/components/Header";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <HeaderPage />
      <div className="w-[1440px] grid grid-cols-3 gap-y-8">
        <div className="flex items-center justify-center">
          <Card />
        </div>
        <div className="flex items-center justify-center">
          <Card />
        </div>
        <div className="flex items-center justify-center">
          <Card />
        </div>
        <div className="flex items-center justify-center">
          <Card />
        </div>
      </div>
    </div>
  );
}
