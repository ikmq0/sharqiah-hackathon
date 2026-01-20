"use client";

import { ArrowRight, TrendingUp, Users, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function MinistryDetailPage({ params }: { params: { id: string } }) {
    // Mock data fetching based on ID would happen here
    const ministryName = "وزارة التعليم"; // Placeholder

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/ministries" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#004d35] text-gray-500">
                    <ArrowRight className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-saudi-green dark:text-white mb-1">
                        {ministryName}
                    </h1>
                    <p className="text-gray-500 dark:text-stone-400">
                        لوحة القيادة التفصيلية والتحليل العميق
                    </p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-[#003323] p-6 rounded-xl border border-gray-100 dark:border-[#004d35]">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">معدل الرضا العام</div>
                    <div className="text-3xl font-bold text-green-500">72%</div>
                </div>
                <div className="bg-white dark:bg-[#003323] p-6 rounded-xl border border-gray-100 dark:border-[#004d35]">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">إجمالي البلاغات</div>
                    <div className="text-3xl font-bold text-gray-800 dark:text-white">12,450</div>
                </div>
                <div className="bg-white dark:bg-[#003323] p-6 rounded-xl border border-gray-100 dark:border-[#004d35]">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">وقت الاستجابة</div>
                    <div className="text-3xl font-bold text-gray-800 dark:text-white">4.2 يوم</div>
                </div>
                <div className="bg-white dark:bg-[#003323] p-6 rounded-xl border border-gray-100 dark:border-[#004d35]">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">مشاعر الغضب</div>
                    <div className="text-3xl font-bold text-red-500">15%</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Word Cloud Section */}
                <div className="bg-white dark:bg-[#003323] p-6 rounded-2xl border border-gray-100 dark:border-[#004d35] min-h-[400px]">
                    <h3 className="font-bold text-lg text-saudi-green dark:text-white mb-6 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        أبرز مواضيع النقاش (Word Cloud)
                    </h3>

                    <div className="relative h-64 flex flex-wrap items-center justify-center gap-4 p-8 overflow-hidden">
                        <span className="text-4xl font-bold text-gray-800 dark:text-gray-200 opacity-90">قرارات تعليق الدراسة</span>
                        <span className="text-2xl font-bold text-saudi-gold opacity-80">المقاصف المدرسية</span>
                        <span className="text-xl font-bold text-gray-600 dark:text-gray-400 opacity-70">اختبارات نافس</span>
                        <span className="text-3xl font-bold text-red-500 opacity-90">تكدس الفصول</span>
                        <span className="text-lg font-bold text-saudi-green opacity-60">النقل المدرسي</span>
                        <span className="text-2xl font-bold text-gray-500 dark:text-gray-300 opacity-50">المباني المستأجرة</span>
                        <span className="text-sm font-bold text-gray-400 opacity-40">حركة النقل الخارجي</span>
                        <span className="text-xl font-bold text-saudi-gold opacity-75">منصة مدرستي</span>
                    </div>
                    <div className="text-center text-xs text-gray-400 mt-4">
                        * حجم الخط يمثل تكرار الكلمة في بلاغات الأسبوع الحالي
                    </div>
                </div>

                {/* Sentiment Trends Chart */}
                <div className="bg-white dark:bg-[#003323] p-6 rounded-2xl border border-gray-100 dark:border-[#004d35] min-h-[400px]">
                    <h3 className="font-bold text-lg text-saudi-green dark:text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        اتجاه المشاعر (أسبوعي)
                    </h3>

                    <div className="h-64 flex items-end justify-between px-4 pb-4 border-b border-gray-100 dark:border-gray-700 gap-2">
                        {/* Mock Chart Bars/Line */}
                        {[40, 55, 45, 60, 30, 45, 65].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">{h}%</div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-t-lg relative h-48">
                                    <div
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-saudi-green to-emerald-400 rounded-t-lg transition-all hover:opacity-90"
                                        style={{ height: `${h}%` }}
                                    ></div>
                                </div>
                                <div className="text-xs text-gray-400">اليوم {i + 1}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                        <span>بداية الأسبوع</span>
                        <span>نهاية الأسبوع</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
