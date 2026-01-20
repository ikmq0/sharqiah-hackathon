"use client";

import { useState } from "react";

// Simplified Region Data with rough relative positioning (Mock Map)
const regions = [
    { id: 1, name: "الرياض", x: 55, y: 55, intensity: "high", count: 12500 },
    { id: 2, name: "مكة المكرمة", x: 30, y: 60, intensity: "critical", count: 18000 },
    { id: 3, name: "المدينة المنورة", x: 30, y: 40, intensity: "medium", count: 5000 },
    { id: 4, name: "الشرقية", x: 70, y: 50, intensity: "medium", count: 8200 },
    { id: 5, name: "عسير", x: 35, y: 75, intensity: "low", count: 2100 },
    { id: 6, name: "تبوك", x: 20, y: 25, intensity: "low", count: 1500 },
    { id: 7, name: "حائل", x: 40, y: 35, intensity: "low", count: 1200 },
    { id: 8, name: "الحدود الشمالية", x: 50, y: 20, intensity: "low", count: 800 },
    { id: 9, name: "جازان", x: 35, y: 85, intensity: "critical", count: 3500 },
    { id: 10, name: "نجران", x: 50, y: 80, intensity: "medium", count: 1800 },
    { id: 11, name: "الباحة", x: 32, y: 70, intensity: "low", count: 900 },
    { id: 12, name: "الجوف", x: 30, y: 20, intensity: "low", count: 1000 },
    { id: 13, name: "القصيم", x: 45, y: 45, intensity: "high", count: 4500 },
];

export function KSAMap() {
    const [selectedRegion, setSelectedRegion] = useState<number | null>(null);

    const getColor = (intensity: string) => {
        switch (intensity) {
            case 'critical': return 'bg-red-500 animate-pulse';
            case 'high': return 'bg-orange-500';
            case 'medium': return 'bg-yellow-500';
            default: return 'bg-saudi-green';
        }
    };

    return (
        <div className="w-full h-full min-h-[500px] relative bg-[#f8fcfb] dark:bg-[#002b1d] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-8">
            {/* Background Pattern / Texture could go here */}

            <div className="absolute top-6 right-6 z-10 bg-white/90 dark:bg-[#004d35]/90 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-saudi-gold/20 backdrop-blur-sm">
                <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-2">مؤشر البلاغات الحرارية</h4>
                <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> <span>حرج (أكثر من 10k)</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span> <span>مرتفع (5k - 10k)</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> <span>متوسط (2k - 5k)</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-saudi-green"></span> <span>طبيعي</span></div>
                </div>
            </div>

            <div className="relative w-full max-w-[600px] aspect-[4/5]">
                {/* Placeholder SVG - stylized map shape */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl opacity-50 absolute inset-0">
                    <path d="M25,20 C30,10 60,10 70,20 L80,45 L75,70 L55,90 L30,85 L20,60 L20,30 Z" fill="#004d35" className="fill-gray-200 dark:fill-[#003323] stroke-saudi-gold stroke-[0.5]" />
                </svg>

                {/* Region Nodes */}
                {regions.map((region) => (
                    <button
                        key={region.id}
                        onClick={() => setSelectedRegion(region.id)}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                        style={{ left: `${region.x}%`, top: `${region.y}%` }}
                    >
                        <div className={`relative flex items-center justify-center transition-all duration-300 ${selectedRegion === region.id ? 'scale-125 z-20' : 'hover:scale-110'}`}>
                            {/* Ripple Effect for Critical */}
                            {region.intensity === 'critical' && (
                                <span className="absolute w-full h-full rounded-full bg-red-500/30 animate-ping"></span>
                            )}

                            {/* Dot */}
                            <div className={`w-4 h-4 rounded-full border-2 border-white dark:border-[#002b1d] shadow-md ${getColor(region.intensity)}`}></div>

                            {/* Tooltip Label - Always visible on selected or hover */}
                            <div className={`absolute top-6 whitespace-nowrap bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg text-xs font-bold transition-opacity
                        ${selectedRegion === region.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                    `}>
                                {region.name} ({region.count})
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
