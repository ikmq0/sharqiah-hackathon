"use client";

import { RecurringIssuesChart } from "./components/AIHub/RecurringIssuesChart";
import { CriticalAlertCard } from "./components/AIHub/CriticalAlertCard";
import { RealTimeFeed } from "./components/AIHub/RealTimeFeed";
import { EmergingPatterns } from "./components/AIHub/EmergingPatterns";
import { AIRecommendations } from "./components/AIHub/AIRecommendations";
import { BrainCircuit } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-saudi-green mb-2 flex items-center gap-3">
            <BrainCircuit className="w-8 h-8" />
            مركز الذكاء الاصطناعي
          </h1>
          <p className="text-gray-500">تحليل فوري للبيانات الضخمة للكشف عن الأنماط والمخاطر واتخاذ القرارات</p>
        </div>
      </div>

      {/* Top Row: Critical Alert (Wide) + Emerging Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Card takes 2 slots */}
        <div className="lg:col-span-2 min-h-[380px] h-auto flex flex-col">
          <CriticalAlertCard />
        </div>

        {/* Emerging Patterns takes 1 slot */}
        <div className="min-h-[380px] h-auto flex flex-col">
          <EmergingPatterns />
        </div>
      </div>

      {/* Middle Row: AI Recommendations + Real Time Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="min-h-[400px] h-auto flex flex-col">
          <AIRecommendations />
        </div>
        <div className="min-h-[400px] h-auto flex flex-col">
          <RealTimeFeed />
        </div>
      </div>

      {/* Bottom Row: Recurring Issues Chart */}
      <div className="grid grid-cols-1 min-h-[350px] h-auto flex flex-col">
        <RecurringIssuesChart />
      </div>
    </div>
  );
}
