"use client";

import { KSAMap } from "../components/KSAMap";

export default function MapPage() {
    return (
        <div className="h-[calc(100vh-140px)] flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-saudi-green mb-2">
                    الخريطة الحرارية الوطنية
                </h1>
                <p className="text-gray-500">
                    توزيع البلاغات والشكاوى حسب المناطق الجغرافية
                </p>
            </div>

            <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-100 relative">
                <KSAMap />
                {/* Overlay Stats */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur p-4 rounded-xl border border-gray-100 shadow-lg">
                    <div className="text-xs text-gray-500">إجمالي البلاغات النشطة</div>
                    <div className="text-2xl font-bold text-gray-800">45,200</div>
                </div>
            </div>
        </div>
    );
}
