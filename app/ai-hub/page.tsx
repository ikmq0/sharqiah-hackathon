"use client";

import { RecurringIssuesChart } from "../components/AIHub/RecurringIssuesChart";
import { CriticalAlertCard } from "../components/AIHub/CriticalAlertCard";
import { BrainCircuit, Sparkles } from "lucide-react";

export default function AIHubPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-saudi-gold/10 rounded-2xl flex items-center justify-center border border-saudi-gold/30">
                        <BrainCircuit className="w-6 h-6 text-saudi-gold" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-saudi-green dark:text-white mb-1">
                            مركز الذكاء الاصطناعي
                        </h1>
                        <p className="text-gray-500 dark:text-stone-400">
                            نظام تحليل الإشارات والضجيج (Signal vs Noise)
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-saudi-gold text-[#003323] font-bold rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        تحديث التحليل
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
                {/* Left: The "Noise" / High Volume */}
                <div className="h-full">
                    <RecurringIssuesChart />
                </div>

                {/* Right: The "Signal" / High Risk */}
                <div className="h-full">
                    <CriticalAlertCard />
                </div>
            </div>

            {/* Additional Metrics / Feed */}
            <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white dark:bg-[#003323] p-4 rounded-xl border border-gray-100 dark:border-[#004d35]">
                        <div className="text-xs text-gray-400 mb-2">تنبيه ذكي #{i}</div>
                        <div className="font-bold text-gray-800 dark:text-gray-200 mb-2">ارتفاع مفاجئ في شكاوى "المياه" في حي النسيم</div>
                        <div className="h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-400 w-2/3"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
