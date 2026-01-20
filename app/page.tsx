"use client";

import dynamic from "next/dynamic";
import { MinistryLeaderboard } from "./components/MinistryLeaderboard";

// Dynamically import map to avoid SSR issues with Leaflet
const EasternProvinceMap = dynamic(
  () => import("./components/EasternProvinceMap").then((mod) => mod.EasternProvinceMap),
  { ssr: false, loading: () => <div className="w-full h-full bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center text-gray-400">جاري تحميل الخريطة...</div> }
);

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-saudi-green mb-2">
            لوحة المنطقة الشرقية
          </h1>
          <p className="text-gray-500">
            نظرة شاملة على بلاغات أحياء الدمام والخبر والظهران
          </p>
        </div>
        <div className="flex gap-3">
          <span className="px-4 py-2 bg-white rounded-lg text-sm text-gray-500 border border-gray-100">
            آخر تحديث: منذ 5 دقائق
          </span>
        </div>
      </div>

      {/* Grid Layout for Map and Sidebar/Leaderboard */}
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)]">
        {/* Map Section (Wide) */}
        <div className="col-span-12 lg:col-span-8 relative bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <EasternProvinceMap />
        </div>

        {/* Leaderboard / Stats Section (Side) */}
        <div className="col-span-12 lg:col-span-4 h-full">
          <MinistryLeaderboard />
        </div>
      </div>
    </div>
  );
}
