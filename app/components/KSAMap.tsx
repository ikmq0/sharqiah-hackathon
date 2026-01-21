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

// SVG Paths for the 13 Regions of Saudi Arabia (Stylized/Approximate)
const regionPaths: Record<number, string> = {
    1: "M55,45 L65,45 L65,60 L50,65 L45,55 Z", // Riyadh
    2: "M25,50 L35,55 L35,70 L25,65 Z", // Makkah
    3: "M25,30 L35,30 L35,50 L25,45 Z", // Madinah
    4: "M65,30 L90,35 L95,60 L65,65 L65,45 Z", // Eastern Province
    5: "M30,70 L40,70 L40,80 L30,80 Z", // Asir
    6: "M15,15 L30,15 L25,30 L15,25 Z", // Tabuk
    7: "M35,30 L45,30 L45,40 L35,40 Z", // Hail
    8: "M30,10 L70,10 L65,30 L35,25 Z", // Northern Borders
    9: "M30,80 L35,80 L35,85 L30,85 Z", // Jazan
    10: "M40,75 L60,75 L55,85 L40,85 Z", // Najran
    11: "M28,65 L32,65 L32,70 L28,70 Z", // Baha
    12: "M25,15 L35,15 L35,25 L25,25 Z", // Jouf
    13: "M40,40 L50,40 L50,45 L40,45 Z", // Qassim
};

export function KSAMap() {
    const [selectedRegion, setSelectedRegion] = useState<number | null>(null);

    const getIntensityColor = (intensity: string) => {
        switch (intensity) {
            case 'critical': return '#ef4444'; // red-500
            case 'high': return '#f97316'; // orange-500
            case 'medium': return '#eab308'; // yellow-500
            case 'low': return '#004d35'; // saudi-green
            default: return '#e5e7eb'; // gray-200
        }
    };

    return (
        <div className="w-full h-full min-h-[500px] relative bg-[#f8fcfb] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-8">
            <div className="absolute top-6 right-6 z-10 bg-white/90 p-4 rounded-xl shadow-lg border border-gray-100 backdrop-blur-sm">
                <h4 className="text-sm font-bold text-gray-800 mb-2">مؤشر الشكاوى الحرارية</h4>
                <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> <span>حرج</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span> <span>مرتفع</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> <span>متوسط</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-saudi-green"></span> <span>طبيعي</span></div>
                </div>
            </div>

            <div className="relative w-full max-w-[600px] aspect-[4/5] p-4">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl filter">
                    {regions.map((region) => (
                        <g key={region.id}
                            onClick={() => setSelectedRegion(region.id)}
                            className="group cursor-pointer transition-all duration-300"
                            onMouseEnter={() => setSelectedRegion(region.id)}
                            onMouseLeave={() => setSelectedRegion(null)}
                        >
                            <path
                                d={regionPaths[region.id] || "M0,0 Z"}
                                fill={getIntensityColor(region.intensity)}
                                fillOpacity={selectedRegion === region.id ? 1 : 0.8}
                                stroke="white"
                                strokeWidth={selectedRegion === region.id ? "1" : "0.5"}
                                className="transition-all duration-300 ease-in-out transform group-hover:scale-105 origin-center"
                            />

                            {/* Region Label Tooltip (Visible on Hover/Select) */}
                            {selectedRegion === region.id && (
                                <foreignObject x="0" y="0" width="100" height="100" className="pointer-events-none">
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div
                                            className="bg-white/95 px-3 py-1.5 rounded-lg shadow-xl text-[8px] font-bold text-gray-800 border border-saudi-green/20 transform -translate-y-8"
                                            style={{
                                                position: 'absolute',
                                                left: `${region.x}%`,
                                                top: `${region.y}%`
                                            }}
                                        >
                                            <div className="text-center">
                                                <div className="text-saudi-green">{region.name}</div>
                                                <div className="text-gray-500 font-mono">{region.count} شكوى</div>
                                            </div>
                                        </div>
                                    </div>
                                </foreignObject>
                            )}
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
}
