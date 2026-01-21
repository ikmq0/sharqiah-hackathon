"use client";

import { EasternProvinceMap } from "../components/EasternProvinceMap";

export default function MapPage() {
    return (
        <div className="h-[calc(100vh-140px)] flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-saudi-green mb-2">
                    خريطة المنطقة الشرقية
                </h1>
                <p className="text-gray-500">
                    توزيع الشكاوى حسب الأحياء (الدمام، الخبر، الظهران)
                </p>
            </div>

            <div className="flex-1 bg-white rounded-2xl border border-gray-100 relative overflow-hidden">
                <EasternProvinceMap />
            </div>
        </div>
    );
}
