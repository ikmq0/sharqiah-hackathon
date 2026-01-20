"use client";

import { KSAMap } from "../components/KSAMap";

export default function MapPage() {
    return (
        <div className="h-[calc(100vh-140px)] flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-saudi-green dark:text-white mb-2">
                    الخريطة الحرارية الوطنية
                </h1>
                <p className="text-gray-500 dark:text-stone-400">
                    توزيع البلاغات والشكاوى حسب المناطق الجغرافية
                </p>
            </div>

            <div className="flex-1 bg-white dark:bg-[#003323] rounded-2xl p-6 border border-gray-100 dark:border-[#004d35] relative">
                <KSAMap />
                {/* Overlay Stats */}
                <div className="absolute top-6 left-6 bg-white/90 dark:bg-black/40 backdrop-blur p-4 rounded-xl border border-gray-100 dark:border-white/10 shadow-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي البلاغات النشطة</div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">45,200</div>
                </div>
            </div>
        </div>
    );
}
