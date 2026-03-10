"use client";

import { ArrowRight, TrendingUp, MessageSquare, BarChart2 } from "lucide-react";
import Link from "next/link";

const kpiCards = [
    { label: "معدل الرضا العام", value: "72%", color: "text-saudi-green", accent: "bg-saudi-green", subtitle: "↑ جيد", border: "border-saudi-green/20" },
    { label: "إجمالي الشكاوى", value: "12,450", color: "text-blue-700", accent: "bg-blue-500", subtitle: "هذا العام", border: "border-blue-100" },
    { label: "وقت الاستجابة", value: "4.2 يوم", color: "text-amber-600", accent: "bg-amber-500", subtitle: "متوسط", border: "border-amber-200" },
    { label: "مشاعر الغضب", value: "15%", color: "text-red-600", accent: "bg-red-500", subtitle: "↓ تراجع طفيف", border: "border-red-100" },
];

const chartHeights = [40, 55, 45, 60, 30, 45, 65];

export default function MinistryDetailPage({ params }: { params: { id: string } }) {
    const ministryName = "وزارة التعليم";

    return (
        <div className="space-y-6 animate-fade-in">

            {/* Page Header */}
            <div className="flex items-center gap-3">
                <Link
                    href="/entities"
                    className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-saudi-green transition-all hover:scale-105"
                >
                    <ArrowRight className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-xl md:text-3xl font-bold text-saudi-green leading-tight">
                        {ministryName}
                    </h1>
                    <p className="text-sm text-gray-400 mt-0.5">لوحة القيادة التفصيلية والتحليل العميق</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {kpiCards.map((kpi, i) => (
                    <div
                        key={i}
                        className={`bg-white rounded-xl border ${kpi.border} p-4 relative overflow-hidden card-hover animate-fade-in-up`}
                        style={{ animationDelay: `${i * 80}ms` }}
                    >
                        {/* Color accent bar on top */}
                        <div className={`absolute top-0 right-0 left-0 h-1 ${kpi.accent} rounded-t-xl`} />
                        <div className="text-xs text-gray-500 mb-2">{kpi.label}</div>
                        <div className={`text-2xl md:text-3xl font-bold ${kpi.color}`}>{kpi.value}</div>
                        <div className="text-[10px] text-gray-400 mt-1">{kpi.subtitle}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Word Cloud */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[380px]">
                    <h3 className="font-bold text-base text-saudi-green mb-5 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        أبرز مواضيع النقاش
                    </h3>
                    <div className="relative h-56 flex flex-wrap items-center justify-center gap-3 p-6 overflow-hidden">
                        {[
                            { text: "قرارات تعليق الدراسة", size: "text-2xl md:text-3xl", color: "text-gray-800", delay: "0ms" },
                            { text: "المقاصف المدرسية", size: "text-xl", color: "text-gray-600", delay: "100ms" },
                            { text: "اختبارات نافس", size: "text-lg", color: "text-gray-500", delay: "200ms" },
                            { text: "تكدس الفصول", size: "text-2xl", color: "text-red-600", delay: "150ms" },
                            { text: "النقل المدرسي", size: "text-base", color: "text-saudi-green", delay: "300ms" },
                            { text: "المباني المستأجرة", size: "text-lg", color: "text-gray-400", delay: "250ms" },
                            { text: "منصة مدرستي", size: "text-xl", color: "text-gray-700", delay: "400ms" },
                        ].map((word, i) => (
                            <span
                                key={i}
                                className={`font-bold ${word.size} ${word.color} animate-float cursor-default hover:opacity-80 transition-opacity`}
                                style={{ animationDelay: word.delay, animationDuration: `${3 + i * 0.4}s` }}
                            >
                                {word.text}
                            </span>
                        ))}
                    </div>
                    <p className="text-center text-[10px] text-gray-300 mt-2">حجم الخط يمثل تكرار الكلمة في الشكاوى</p>
                </div>

                {/* Sentiment Chart */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[380px]">
                    <h3 className="font-bold text-base text-saudi-green mb-5 flex items-center gap-2">
                        <BarChart2 className="w-5 h-5" />
                        اتجاه المشاعر (أسبوعي)
                    </h3>
                    <div className="h-52 flex items-end justify-between px-2 pb-4 gap-2">
                        {chartHeights.map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                                    {h}%
                                </div>
                                <div className="w-full bg-gray-100 rounded-t-lg relative h-44">
                                    <div
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-saudi-green to-saudi-green/40 rounded-t-lg transition-all hover:opacity-80 animate-grow-width"
                                        style={{
                                            height: `${h}%`,
                                            animationDelay: `${i * 80 + 300}ms`,
                                            animationDuration: '0.8s',
                                        }}
                                    />
                                </div>
                                <div className="text-[10px] text-gray-400">يوم {i + 1}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-gray-400">
                        <span>بداية الأسبوع</span>
                        <span>نهاية الأسبوع</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
