"use client";

import { ArrowUp, ArrowDown, Minus } from "lucide-react";

type Department = {
    id: number;
    name: string;
    complaints: number;
    resolvedRate: number;
    sentiment: number; // 0-100
    trend: "up" | "down" | "stable";
};

// Eastern Province Government Departments
const easternDepartments: Department[] = [
    { id: 1, name: "أمانة المنطقة الشرقية", complaints: 4230, resolvedRate: 72, sentiment: 55, trend: "up" },
    { id: 2, name: "بلدية الدمام", complaints: 3100, resolvedRate: 68, sentiment: 48, trend: "down" },
    { id: 3, name: "بلدية الخبر", complaints: 2450, resolvedRate: 85, sentiment: 72, trend: "up" },
    { id: 4, name: "بلدية الظهران", complaints: 890, resolvedRate: 92, sentiment: 88, trend: "stable" },
    { id: 5, name: "شركة المياه الوطنية", complaints: 1800, resolvedRate: 58, sentiment: 42, trend: "down" },
    { id: 6, name: "شركة الكهرباء", complaints: 1200, resolvedRate: 78, sentiment: 65, trend: "up" },
];

export function MinistryLeaderboard() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-saudi-green flex items-center gap-2">
                    📊 ترتيب الجهات الحكومية
                </h3>
                <button className="text-xs text-saudi-gold hover:underline">عرض الكل</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
                    <thead className="text-xs text-gray-500 font-medium bg-gray-50 rounded-lg">
                        <tr>
                            <th className="pb-3 pt-3 pr-3 rounded-r-lg">الجهة</th>
                            <th className="pb-3 pt-3">الشكاوى</th>
                            <th className="pb-3 pt-3">نسبة الحل</th>
                            <th className="pb-3 pt-3 pl-3 rounded-l-lg">الرضا</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {easternDepartments.map((dept) => (
                            <tr key={dept.id} className="group hover:bg-gray-50 transition-colors">
                                <td className="py-4 pr-3 font-medium text-gray-800">
                                    {dept.name}
                                </td>
                                <td className="py-4 text-gray-600 font-mono">
                                    {dept.complaints.toLocaleString('en-US')}
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-saudi-green"
                                                style={{ width: `${dept.resolvedRate}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500 font-mono">{dept.resolvedRate}%</span>
                                    </div>
                                </td>
                                <td className="py-4 pl-3">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-bold font-mono ${dept.sentiment > 70 ? 'text-green-600' :
                                            dept.sentiment > 50 ? 'text-yellow-600' : 'text-red-500'
                                            }`}>
                                            {dept.sentiment}/100
                                        </span>
                                        {dept.trend === 'up' && <ArrowUp className="w-3 h-3 text-green-500" />}
                                        {dept.trend === 'down' && <ArrowDown className="w-3 h-3 text-red-500" />}
                                        {dept.trend === 'stable' && <Minus className="w-3 h-3 text-gray-400" />}
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
