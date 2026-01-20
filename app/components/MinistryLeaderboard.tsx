"use client";

import { ArrowUp, ArrowDown, Minus } from "lucide-react";

type Ministry = {
    id: number;
    name: string;
    complaints: number;
    resolvedRate: number;
    sentiment: number; // 0-100
    trend: "up" | "down" | "stable";
};

const mockMinistries: Ministry[] = [
    { id: 1, name: "وزارة الصحة", complaints: 15430, resolvedRate: 88, sentiment: 65, trend: "up" },
    { id: 2, name: "وزارة التعليم", complaints: 12100, resolvedRate: 75, sentiment: 58, trend: "down" },
    { id: 3, name: "وزارة الشؤون البلدية", complaints: 8900, resolvedRate: 60, sentiment: 42, trend: "down" },
    { id: 4, name: "وزارة النقل", complaints: 6500, resolvedRate: 92, sentiment: 80, trend: "up" },
    { id: 5, name: "وزارة الموارد البشرية", complaints: 4200, resolvedRate: 85, sentiment: 72, trend: "stable" },
    { id: 6, name: "وزارة التجارة", complaints: 3100, resolvedRate: 95, sentiment: 88, trend: "up" },
];

export function MinistryLeaderboard() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-saudi-green flex items-center gap-2">
                    📊 ترتيب الوزارات
                </h3>
                <button className="text-xs text-saudi-gold hover:underline">عرض الكل</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
                    <thead className="text-xs text-gray-500 font-medium bg-gray-50 rounded-lg">
                        <tr>
                            <th className="pb-3 pt-3 pr-3 rounded-r-lg">الوزارة</th>
                            <th className="pb-3 pt-3">الشكاوى</th>
                            <th className="pb-3 pt-3">نسبة الحل</th>
                            <th className="pb-3 pt-3 pl-3 rounded-l-lg">الرضا</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {mockMinistries.map((ministry) => (
                            <tr key={ministry.id} className="group hover:bg-gray-50 transition-colors">
                                <td className="py-4 pr-3 font-medium text-gray-800">
                                    {ministry.name}
                                </td>
                                <td className="py-4 text-gray-600 font-mono">
                                    {ministry.complaints.toLocaleString('en-US')}
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-saudi-green"
                                                style={{ width: `${ministry.resolvedRate}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500 font-mono">{ministry.resolvedRate}%</span>
                                    </div>
                                </td>
                                <td className="py-4 pl-3">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-bold font-mono ${ministry.sentiment > 70 ? 'text-green-600' :
                                            ministry.sentiment > 50 ? 'text-yellow-600' : 'text-red-500'
                                            }`}>
                                            {ministry.sentiment}/100
                                        </span>
                                        {ministry.trend === 'up' && <ArrowUp className="w-3 h-3 text-green-500" />}
                                        {ministry.trend === 'down' && <ArrowDown className="w-3 h-3 text-red-500" />}
                                        {ministry.trend === 'stable' && <Minus className="w-3 h-3 text-gray-400" />}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
