"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, Search, Filter, Eye } from "lucide-react";
import Link from "next/link";

type Ministry = {
    id: number;
    name: string;
    complaints: number;
    resolvedPercentage: number;
    responseTime: number; // in hours
    sentimentScore: number;
    region: string;
};

const initialMinistries: Ministry[] = [
    { id: 1, name: "وزارة الصحة", complaints: 15430, resolvedPercentage: 88, responseTime: 24, sentimentScore: 65, region: "الرياض" },
    { id: 2, name: "وزارة التعليم", complaints: 12100, resolvedPercentage: 75, responseTime: 48, sentimentScore: 58, region: "الرياض" },
    { id: 3, name: "وزارة الشؤون البلدية", complaints: 8900, resolvedPercentage: 60, responseTime: 72, sentimentScore: 42, region: "مكة المكرمة" },
    { id: 4, name: "وزارة النقل", complaints: 6500, resolvedPercentage: 92, responseTime: 12, sentimentScore: 80, region: "الشرقية" },
    { id: 5, name: "وزارة الموارد البشرية", complaints: 4200, resolvedPercentage: 85, responseTime: 36, sentimentScore: 72, region: "الرياض" },
    { id: 6, name: "وزارة التجارة", complaints: 3100, resolvedPercentage: 95, responseTime: 8, sentimentScore: 88, region: "الرياض" },
    { id: 7, name: "وزارة الطاقة", complaints: 1200, resolvedPercentage: 98, responseTime: 4, sentimentScore: 92, region: "الشرقية" },
    { id: 8, name: "وزارة الإعلام", complaints: 800, resolvedPercentage: 90, responseTime: 20, sentimentScore: 85, region: "الرياض" },
];

type SortConfig = {
    key: keyof Ministry;
    direction: 'asc' | 'desc';
};

export function MinistriesTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'complaints', direction: 'desc' });

    const handleSort = (key: keyof Ministry) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedMinistries = useMemo(() => {
        let result = [...initialMinistries];

        // Filter
        if (searchTerm) {
            result = result.filter(m => m.name.includes(searchTerm));
        }

        // Sort
        result.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return result;
    }, [searchTerm, sortConfig]);

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Controls */}
            <div className="p-4 border-b border-gray-100 flex gap-4 bg-gray-50/50">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="بحث عن وزارة..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-10 pr-10 pl-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-saudi-green focus:border-saudi-green outline-none text-sm transition-all bg-white"
                    />
                </div>
                <button className="h-10 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>تصفية متقدمة</span>
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-medium">
                        <tr>
                            <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('name')}>
                                <div className="flex items-center gap-2">
                                    الوزارة
                                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                                </div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('complaints')}>
                                <div className="flex items-center gap-2">
                                    إجمالي البلاغات
                                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                                </div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('resolvedPercentage')}>
                                <div className="flex items-center gap-2">
                                    نسبة الحل
                                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                                </div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('responseTime')}>
                                <div className="flex items-center gap-2">
                                    متوسط وقت الاستجابة
                                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                                </div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('sentimentScore')}>
                                <div className="flex items-center gap-2">
                                    مؤشر الرضا
                                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                                </div>
                            </th>
                            <th className="px-6 py-4">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredAndSortedMinistries.map((ministry) => (
                            <tr key={ministry.id} className="group hover:bg-blue-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-800">{ministry.name}</td>
                                <td className="px-6 py-4 font-mono text-gray-600">{ministry.complaints.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${ministry.resolvedPercentage >= 80 ? 'bg-green-100 text-green-700' :
                                            ministry.resolvedPercentage >= 60 ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                        }`}>
                                        {ministry.resolvedPercentage}%
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-mono text-gray-600">{ministry.responseTime} ساعة</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${ministry.sentimentScore > 75 ? 'bg-green-500' :
                                                        ministry.sentimentScore > 50 ? 'bg-yellow-500' :
                                                            'bg-red-500'
                                                    }`}
                                                style={{ width: `${ministry.sentimentScore}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-bold">{ministry.sentimentScore}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/ministry/${ministry.id}`}
                                        className="flex items-center gap-1 text-saudi-green font-bold text-xs hover:underline"
                                    >
                                        <Eye className="w-3 h-3" />
                                        عرض التفاصيل
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination Placeholder */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
                <span>عرض {filteredAndSortedMinistries.length} من {initialMinistries.length} وزارة</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>السابق</button>
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>التالي</button>
                </div>
            </div>
        </div>
    );
}
