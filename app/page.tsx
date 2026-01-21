"use client";

import { RecurringIssuesChart } from "./components/AIHub/RecurringIssuesChart";
import { CriticalAlertCard } from "./components/AIHub/CriticalAlertCard";
import { RealTimeFeed } from "./components/AIHub/RealTimeFeed";
import { SentimentDistribution } from "./components/AIHub/SentimentDistribution";
import { BrainCircuit, TrendingUp, Activity, Database } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-saudi-green mb-2 flex items-center gap-3">
            <BrainCircuit className="w-8 h-8" />
            مركز الذكاء الاصطناعي
          </h1>
          <p className="text-gray-500">تحليل فوري للبيانات الضخمة للكشف عن الأنماط والمخاطر</p>
        </div>

        {/* Quick AI Stats */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
            <div className="p-2 bg-saudi-green/10 rounded-lg text-saudi-green"><TrendingUp className="w-4 h-4" /></div>
            <div>
              <div className="text-xs text-gray-400">تنبؤات اليوم</div>
              <div className="font-bold text-sm text-gray-800">1,240</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
            <div className="p-2 bg-saudi-gold/10 rounded-lg text-saudi-gold-dark"><Activity className="w-4 h-4" /></div>
            <div>
              <div className="text-xs text-gray-400">سرعة المعالجة</div>
              <div className="font-bold text-sm text-gray-800">0.4 ثانية</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Database className="w-4 h-4" /></div>
            <div>
              <div className="text-xs text-gray-400">مصادر البيانات</div>
              <div className="font-bold text-sm text-gray-800">18 جهة</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Row: Critical Alerts & Real Time Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[400px]">
        {/* Critical Card takes 1 slot */}
        <CriticalAlertCard />

        {/* Real Time Feed takes 1 slot */}
        <RealTimeFeed />

        {/* Sentiment takes 1 slot */}
        <SentimentDistribution />
      </div>

      {/* Middle Row: Recurring Issues Chart */}
      <div className="grid grid-cols-1 h-[400px]">
        <RecurringIssuesChart />
      </div>
    </div>
  );
}
