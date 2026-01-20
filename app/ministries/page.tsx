"use client";

import { Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

const ministries = [
    { id: 1, name: "وزارة الصحة", score: 88 },
    { id: 2, name: "وزارة التعليم", score: 75 },
    { id: 3, name: "وزارة الشؤون البلدية", score: 60 },
    { id: 4, name: "وزارة النقل", score: 92 },
    { id: 5, name: "وزارة الموارد البشرية", score: 85 },
    { id: 6, name: "وزارة التجارة", score: 95 },
];

export default function MinistriesListPage() {
    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-saudi-green dark:text-white mb-2">الوزارات</h1>
                <p className="text-gray-500 dark:text-stone-400">اختر وزارة لعرض التحليل التفصيلي</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ministries.map((min) => (
                    <Link
                        key={min.id}
                        href={`/ministry/${min.id}`}
                        className="group bg-white dark:bg-[#003323] p-6 rounded-2xl border border-gray-100 dark:border-[#004d35] hover:border-saudi-gold hover:shadow-lg transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gray-50 dark:bg-[#004d35] rounded-full flex items-center justify-center text-gray-400 dark:text-gray-300">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div className={`text-2xl font-bold ${min.score > 80 ? 'text-green-500' : min.score > 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                                {min.score}%
                            </div>
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">{min.name}</h3>
                        <div className="flex items-center text-sm text-saudi-gold group-hover:translate-x-[-5px] transition-transform">
                            <span>عرض التفاصيل</span>
                            <ArrowRight className="w-4 h-4 mr-2" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
