"use client";

import { TrendingUp, MapPin, Building2, AlertTriangle } from "lucide-react";

const issues = [
    {
        label: "حفر في الطرق الرئيسية",
        count: 42000,
        percentage: 40,
        sector: "خدمات الطرق",
        region: "الدمام - حي الفيصلية، حي العزيزية",
        responsible: "إدارة الصيانة - أمانة المنطقة الشرقية",
        trend: "تصاعدي",
        color: "bg-red-500",
    },
    {
        label: "انقطاع المياه المتكرر",
        count: 21000,
        percentage: 20,
        sector: "خدمات المياه",
        region: "الدمام - حي الشاطئ، الخبر - حي الراكة",
        responsible: "شركة المياه الوطنية - فرع الدمام",
        trend: "ثابت",
        color: "bg-amber-500",
    },
    {
        label: "بطء تطبيق أبشر",
        count: 15000,
        percentage: 15,
        sector: "الخدمات الإلكترونية",
        region: "المنطقة الشرقية بالكامل",
        responsible: "وزارة الداخلية - إدارة الجوازات",
        trend: "تناقصي",
        color: "bg-saudi-green-light",
    },
    {
        label: "نقص مواقف السيارات",
        count: 10000,
        percentage: 10,
        sector: "الخدمات البلدية",
        region: "الدمام - وسط المدينة",
        responsible: "أمانة المنطقة الشرقية - وكالة التعمير",
        trend: "ثابت",
        color: "bg-saudi-green",
    },
    {
        label: "تأخر المواعيد الصحية",
        count: 5000,
        percentage: 5,
        sector: "الخدمات الصحية",
        region: "مستشفى الملك فهد التخصصي",
        responsible: "تجمع الشرقية الصحي",
        trend: "تصاعدي",
        color: "bg-saudi-green",
    },
];

const maxPercentage = Math.max(...issues.map(i => i.percentage));

export function RecurringIssuesChart() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full flex flex-col">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div>
                    <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-saudi-green" />
                        الشكاوى الأكثر تكراراً
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">قضايا ذات حجم مرتفع تتطلب تدخل الإمارة</p>
                </div>
                <div className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 whitespace-nowrap">
                    حجم مرتفع
                </div>
            </div>

            {/* Issue Bars */}
            <div className="space-y-4 flex-1 overflow-y-auto">
                {issues.map((issue, index) => (
                    <div
                        key={index}
                        className="group animate-fade-in-up"
                        style={{ animationDelay: `${index * 80}ms` }}
                    >
                        {/* Row Header */}
                        <div className="flex justify-between items-baseline mb-1.5">
                            <span className="font-bold text-sm text-gray-700 group-hover:text-saudi-green transition-colors">
                                {index + 1}. {issue.label}
                            </span>
                            <span className="text-xs font-mono text-gray-500 shrink-0 ms-2">
                                {issue.count.toLocaleString('en-US')}
                                <span className="text-gray-400 text-[10px] ms-1">({issue.percentage}%)</span>
                            </span>
                        </div>

                        {/* Animated Progress Bar */}
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                            <div
                                className={`h-full rounded-full animate-grow-width ${issue.color}`}
                                style={{
                                    width: `${(issue.percentage / maxPercentage) * 100}%`,
                                    animationDelay: `${index * 80 + 200}ms`,
                                    animationDuration: '0.8s',
                                }}
                            />
                        </div>

                        {/* Detail pills */}
                        <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-400">
                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
                                <Building2 className="w-3 h-3 text-saudi-green" />
                                <span>{issue.sector}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
                                <MapPin className="w-3 h-3 text-red-400" />
                                <span className="max-w-[140px] truncate">{issue.region}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
                                <AlertTriangle className="w-3 h-3 text-amber-500" />
                                <span className="max-w-[140px] truncate">{issue.responsible}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
