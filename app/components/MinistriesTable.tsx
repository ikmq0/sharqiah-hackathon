"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, Search, Filter, Eye } from "lucide-react";
import Link from "next/link";

type Department = {
    id: number;
    name: string;
    complaints: number;
    resolvedPercentage: number;
    responseTime: number; // in hours
    sentimentScore: number;
    district: string;
};

// Eastern Province Government Departments & Neighborhoods
const initialDepartments: Department[] = [
    { id: 1, name: "أمانة المنطقة الشرقية", complaints: 4230, resolvedPercentage: 72, responseTime: 48, sentimentScore: 55, district: "الدمام" },
    { id: 2, name: "بلدية الدمام", complaints: 3100, resolvedPercentage: 68, responseTime: 72, sentimentScore: 48, district: "الدمام" },
    { id: 3, name: "بلدية الخبر", complaints: 2450, resolvedPercentage: 85, responseTime: 24, sentimentScore: 72, district: "الخبر" },
    { id: 4, name: "بلدية الظهران", complaints: 890, resolvedPercentage: 92, responseTime: 12, sentimentScore: 88, district: "الظهران" },
    { id: 5, name: "شركة المياه الوطنية", complaints: 1800, resolvedPercentage: 58, responseTime: 96, sentimentScore: 42, district: "المنطقة الشرقية" },
    { id: 6, name: "شركة الكهرباء", complaints: 1200, resolvedPercentage: 78, responseTime: 8, sentimentScore: 65, district: "المنطقة الشرقية" },
    { id: 7, name: "إدارة النظافة", complaints: 980, resolvedPercentage: 82, responseTime: 24, sentimentScore: 70, district: "الدمام" },
    { id: 8, name: "إدارة الطرق", complaints: 1450, resolvedPercentage: 65, responseTime: 120, sentimentScore: 38, district: "المنطقة الشرقية" },
];

type SortConfig = {
    key: keyof Department;
    direction: 'asc' | 'desc';
};

export function MinistriesTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'complaints', direction: 'desc' });

    const handleSort = (key: keyof Department) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedDepartments = useMemo(() => {
        let result = [...initialDepartments];

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
                        placeholder="بحث عن جهة..."
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
                        {filteredAndSortedDepartments.map((dept) => (
                            <tr key={dept.id} className="group hover:bg-blue-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-800">{dept.name}</td>
                                <td className="px-6 py-4 font-mono text-gray-600">{dept.complaints.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${dept.resolvedPercentage >= 80 ? 'bg-green-100 text-green-700' :
                                        dept.resolvedPercentage >= 60 ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                        {dept.resolvedPercentage}%
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-mono text-gray-600">{dept.responseTime} ساعة</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${dept.sentimentScore > 75 ? 'bg-green-500' :
                                                    dept.sentimentScore > 50 ? 'bg-yellow-500' :
                                                        'bg-red-500'
                                                    }`}
                                                style={{ width: `${dept.sentimentScore}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-bold">{dept.sentimentScore}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/ministry/${dept.id}`}
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
                <span>عرض {filteredAndSortedDepartments.length} من {initialDepartments.length} جهة</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>السابق</button>
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>التالي</button>
                </div>
            </div>
        </div>
    );
}
