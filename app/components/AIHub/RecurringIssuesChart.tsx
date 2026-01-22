"use client";

import { TrendingUp, MapPin, Building2, AlertTriangle } from "lucide-react";

const issues = [
    {
        label: "حفر في الطرق الرئيسية",
        count: 42000,
        percentage: 40,
        sector: "خدمات الطرق",
        region: "الدمام - حي الفيصلية، حي العزيزية، حي النخيل",
        responsible: "إدارة الصيانة والتشغيل - أمانة المنطقة الشرقية",
        trend: "تصاعدي"
    },
    {
        label: "انقطاع المياه المتكرر",
        count: 21000,
        percentage: 20,
        sector: "خدمات المياه",
        region: "الدمام - حي الشاطئ، الخبر - حي الراكة",
        responsible: "شركة المياه الوطنية - فرع الدمام",
        trend: "ثابت"
    },
    {
        label: "بطء تطبيق أبشر",
        count: 15000,
        percentage: 15,
        sector: "الخدمات الإلكترونية",
        region: "المنطقة الشرقية بالكامل",
        responsible: "وزارة الداخلية - إدارة الجوازات",
        trend: "تناقصي"
    },
    {
        label: "نقص مواقف السيارات",
        count: 10000,
        percentage: 10,
        sector: "الخدمات البلدية",
        region: "الدمام - وسط المدينة، الخبر - شارع الملك عبدالعزيز",
        responsible: "أمانة المنطقة الشرقية - وكالة التعمير",
        trend: "ثابت"
    },
    {
        label: "تأخر المواعيد الصحية",
        count: 5000,
        percentage: 5,
        sector: "الخدمات الصحية",
        region: "الدمام - مستشفى الملك فهد التخصصي",
        responsible: "تجمع الشرقية الصحي",
        trend: "تصاعدي"
    },
];

// Calculate max percentage for proper scaling
const maxPercentage = Math.max(...issues.map(i => i.percentage));

export function RecurringIssuesChart() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-lg text-saudi-green flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        الشكاوى الأكثر تكراراً (الضجيج)
                    </h3>
                    <p className="text-sm text-gray-500">قضايا ذات حجم شكاوى مرتفع جداً تتطلب تدخل الإمارة</p>
                </div>
                <div className="text-sm font-bold text-saudi-gold bg-saudi-gold/10 px-3 py-1 rounded-full">
                    حجم مرتفع
                </div>
            </div>

            <div className="space-y-5 flex-1 overflow-y-auto">
                {issues.map((issue, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                        {/* Header with label and count */}
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-gray-800">{index + 1}. {issue.label}</span>
                            <span className="text-gray-600 font-mono text-sm bg-white px-2 py-0.5 rounded">
                                {issue.count.toLocaleString('en-US')} <span className="text-gray-400">({issue.percentage}%)</span>
                            </span>
                        </div>

                        {/* Progress bar - properly scaled */}
                        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden mb-3">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${issue.percentage >= 30 ? 'bg-red-500' :
                                    issue.percentage >= 15 ? 'bg-orange-500' : 'bg-saudi-green'
                                    }`}
                                style={{ width: `${(issue.percentage / maxPercentage) * 100}%` }}
                            ></div>
                        </div>

                        {/* Detailed info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                            <div className="flex items-center gap-1.5 text-gray-500">
                                <Building2 className="w-3.5 h-3.5 text-saudi-green" />
                                <span className="font-bold text-gray-600">القطاع:</span>
                                <span>{issue.sector}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500">
                                <MapPin className="w-3.5 h-3.5 text-red-500" />
                                <span className="font-bold text-gray-600">المنطقة:</span>
                                <span className="truncate">{issue.region}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500">
                                <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
                                <span className="font-bold text-gray-600">المسؤول:</span>
                                <span className="truncate">{issue.responsible}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
