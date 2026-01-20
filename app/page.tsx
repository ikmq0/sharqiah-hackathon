"use client";

import { KSAMap } from "./components/KSAMap";
import { MinistryLeaderboard } from "./components/MinistryLeaderboard";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-saudi-green mb-2">
            اللوحة الوطنية
          </h1>
          <p className="text-gray-500">
            نظرة شاملة على أداء الوزارات ورضا المواطنين
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
        <div className="col-span-12 lg:col-span-8 relative">
          <KSAMap />
        </div>

        {/* Leaderboard / Stats Section (Side) */}
        <div className="col-span-12 lg:col-span-4 h-full">
          <MinistryLeaderboard />
        </div>
      </div>
    </div>
  );
}
