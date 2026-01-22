"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, Search, Filter, Eye, ChevronDown, ChevronUp, Check } from "lucide-react";
import Link from "next/link";

type Department = {
    id: number;
    name: string;
    sector: string;
    complaints: number;
    resolvedPercentage: number;
    responseTime: number; // in hours
    sentimentScore: number;
    district: string;
};

// Expanded Data: Eastern Province Government Entities
const initialDepartments: Department[] = [
    // Municipalities (Amanah/Baladiyah)
    { id: 1, name: "أمانة المنطقة الشرقية", sector: "بلدي", complaints: 4230, resolvedPercentage: 72, responseTime: 48, sentimentScore: 55, district: "الدمام" },
    { id: 2, name: "بلدية وسط الدمام", sector: "بلدي", complaints: 3100, resolvedPercentage: 68, responseTime: 72, sentimentScore: 48, district: "الدمام" },
    { id: 3, name: "بلدية محافظة الخبر", sector: "بلدي", complaints: 2450, resolvedPercentage: 85, responseTime: 24, sentimentScore: 72, district: "الخبر" },
    { id: 4, name: "بلدية الظهران", sector: "بلدي", complaints: 890, resolvedPercentage: 92, responseTime: 12, sentimentScore: 88, district: "الظهران" },
    { id: 5, name: "بلدية محافظة القطيف", sector: "بلدي", complaints: 1850, resolvedPercentage: 75, responseTime: 36, sentimentScore: 60, district: "القطيف" },
    { id: 6, name: "بلدية محافظة الجبيل", sector: "بلدي", complaints: 1200, resolvedPercentage: 80, responseTime: 28, sentimentScore: 68, district: "الجبيل" },

    // Services (Water, Electricity, Transport)
    { id: 7, name: "شركة المياه الوطنية (القطاع الشرقي)", sector: "خدمي", complaints: 2100, resolvedPercentage: 58, responseTime: 96, sentimentScore: 42, district: "المنطقة الشرقية" },
    { id: 8, name: "الشركة السعودية للكهرباء", sector: "خدمي", complaints: 1300, resolvedPercentage: 78, responseTime: 8, sentimentScore: 65, district: "المنطقة الشرقية" },
    { id: 9, name: "فرع وزارة النقل والخدمات اللوجستية", sector: "خدمي", complaints: 1450, resolvedPercentage: 65, responseTime: 120, sentimentScore: 38, district: "المنطقة الشرقية" },

    // Security & Safety (Police, Civil Defense)
    { id: 10, name: "شرطة المنطقة الشرقية", sector: "أمني", complaints: 450, resolvedPercentage: 95, responseTime: 2, sentimentScore: 85, district: "المنطقة الشرقية" },
    { id: 11, name: "مرور الدمام", sector: "أمني", complaints: 890, resolvedPercentage: 88, responseTime: 4, sentimentScore: 70, district: "الدمام" },
    { id: 12, name: "مرور الخبر", sector: "أمني", complaints: 650, resolvedPercentage: 90, responseTime: 3, sentimentScore: 75, district: "الخبر" },
    { id: 13, name: "مديرية الدفاع المدني بالشرقية", sector: "أمني", complaints: 120, resolvedPercentage: 98, responseTime: 1, sentimentScore: 92, district: "المنطقة الشرقية" },

    // Health
    { id: 14, name: "تجمع الشرقية الصحي", sector: "صحي", complaints: 3200, resolvedPercentage: 60, responseTime: 48, sentimentScore: 50, district: "المنطقة الشرقية" },
    { id: 15, name: "مستشفى الملك فهد التخصصي", sector: "صحي", complaints: 540, resolvedPercentage: 82, responseTime: 24, sentimentScore: 78, district: "الدمام" },
    { id: 16, name: "مستشفى الملك فهد الجامعي", sector: "صحي", complaints: 480, resolvedPercentage: 80, responseTime: 30, sentimentScore: 75, district: "الخبر" },

    // Education
    { id: 17, name: "جامعة الإمام عبد الرحمن بن فيصل", sector: "تعليمي", complaints: 670, resolvedPercentage: 75, responseTime: 72, sentimentScore: 68, district: "الدمام" },
    { id: 18, name: "جامعة الملك فهد للبترول والمعادن", sector: "تعليمي", complaints: 230, resolvedPercentage: 90, responseTime: 24, sentimentScore: 85, district: "الظهران" },
    { id: 19, name: "إدارة تعليم الشرقية", sector: "تعليمي", complaints: 1500, resolvedPercentage: 68, responseTime: 96, sentimentScore: 55, district: "الدمام" },

    // Commerce & Others
    { id: 20, name: "فرع وزارة التجارة", sector: "رقابي", complaints: 2800, resolvedPercentage: 85, responseTime: 12, sentimentScore: 65, district: "المنطقة الشرقية" },
    { id: 21, name: "فرع وزارة الموارد البشرية", sector: "رقابي", complaints: 1950, resolvedPercentage: 62, responseTime: 72, sentimentScore: 45, district: "المنطقة الشرقية" },
];

type SortConfig = {
    key: keyof Department;
    direction: 'asc' | 'desc';
};

export function MinistriesTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCity, setSelectedCity] = useState("all");
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'complaints', direction: 'desc' });

    // Advanced Filter States
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

    // Metric Filters
    const [minResolution, setMinResolution] = useState(0);
    const [minSatisfaction, setMinSatisfaction] = useState(0);

    // Extract unique cities and sectors
    const cities = useMemo(() => ["all", ...Array.from(new Set(initialDepartments.map(d => d.district)))], []);
    const sectors = useMemo(() => Array.from(new Set(initialDepartments.map(d => d.sector))), []);

    const toggleSector = (sector: string) => {
        setSelectedSectors(prev =>
            prev.includes(sector) ? prev.filter(s => s !== sector) : [...prev, sector]
        );
    };

    const handleSort = (key: keyof Department) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const filteredAndSortedDepartments = useMemo(() => {
        let result = [...initialDepartments];

        if (searchTerm) result = result.filter(m => m.name.includes(searchTerm));
        if (selectedCity !== 'all') result = result.filter(m => m.district === selectedCity);
        if (selectedSectors.length > 0) result = result.filter(m => selectedSectors.includes(m.sector));

        // Metric Filtering
        result = result.filter(m => m.resolvedPercentage >= minResolution);
        result = result.filter(m => m.sentimentScore >= minSatisfaction);

        result.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return result;
    }, [searchTerm, selectedCity, selectedSectors, sortConfig, minResolution, minSatisfaction]);

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden font-sans">
            {/* Main Controls */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 space-y-4">
                <div className="flex flex-wrap gap-4">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="بحث عن جهة..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-10 pr-10 pl-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-saudi-green focus:border-saudi-green outline-none text-sm transition-all bg-white"
                        />
                    </div>

                    <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="h-10 px-4 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-saudi-green outline-none text-sm text-gray-600 cursor-pointer"
                    >
                        <option value="all">جميع المدن</option>
                        {cities.filter(c => c !== 'all').map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>

                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`h-10 px-4 rounded-lg border flex items-center gap-2 text-sm font-medium transition-colors
                            ${showAdvanced ? 'border-saudi-green bg-green-50 text-saudi-green' : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'}`}
                    >
                        <Filter className="w-4 h-4" />
                        <span>تصفية متقدمة</span>
                        {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                </div>

                {/* Advanced Filters Panel */}
                {showAdvanced && (
                    <div className="pt-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Sectors */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-2 block">القطاع</label>
                                <div className="flex flex-wrap gap-2">
                                    {sectors.map(sector => (
                                        <button
                                            key={sector}
                                            onClick={() => toggleSector(sector)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5
                                                ${selectedSectors.includes(sector)
                                                    ? 'bg-saudi-green text-white border-saudi-green'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                                        >
                                            {selectedSectors.includes(sector) && <Check className="w-3 h-3" />}
                                            {sector}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Metrics Sliders */}
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <label className="font-bold text-gray-500">الحد الأدنى لنسبة الحل</label>
                                        <span className="text-saudi-green font-bold">{minResolution}%</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="100" value={minResolution}
                                        onChange={(e) => setMinResolution(Number(e.target.value))}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-saudi-green"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <label className="font-bold text-gray-500">الحد الأدنى لمؤشر الرضا</label>
                                        <span className="text-saudi-green font-bold">{minSatisfaction}</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="100" value={minSatisfaction}
                                        onChange={(e) => setMinSatisfaction(Number(e.target.value))}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-saudi-green"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-medium">
                        <tr>
                            <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('name')}>
                                <div className="flex items-center gap-2">
                                    الجهة
                                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                                </div>
                            </th>
                            <th className="px-6 py-4">القطاع</th>
                            <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('complaints')}>
                                <div className="flex items-center gap-2">
                                    إجمالي الشكاوى
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
                                    وقت الاستجابة
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
                            <tr key={dept.id} className="group hover:bg-green-50/30 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-800">
                                    <div>{dept.name}</div>
                                    <div className="text-[10px] text-gray-400 font-normal">{dept.district}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600 border border-gray-200">
                                        {dept.sector}
                                    </span>
                                </td>
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
                                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
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
                                        href={`/entity/${dept.id}`}
                                        className="flex items-center gap-1 text-saudi-green font-bold text-xs hover:underline"
                                    >
                                        <Eye className="w-3 h-3" />
                                        عرض
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination */}
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
