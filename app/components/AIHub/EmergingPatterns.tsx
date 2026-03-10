"use client";

import { AlertTriangle, MapPin, Zap, ArrowLeft } from "lucide-react";

export function EmergingPatterns() {
    const patterns = [
        {
            id: 1,
            title: "تسمم غذائي جماعي",
            location: "كورنيش الدمام",
            riskLevel: "حرج",
            confidence: 98,
            casesCount: 15,
            description: "رصد 15 حالة تسمم غذائي مرتبطة بمطاعم الوجبات السريعة في منطقة الكورنيش خلال 3 ساعات.",
            recommendation: "إغلاق فوري للمطاعم المشتبه بها وإرسال فريق الصحة العامة",
        },
        {
            id: 2,
            title: "تجمع مياه خطير",
            location: "نفق طريق الملك فهد",
            riskLevel: "عالي",
            confidence: 92,
            casesCount: 8,
            description: "ارتفاع منسوب المياه في النفق مما يهدد بتعطل حركة السير.",
            recommendation: "تحويل حركة المرور وإرسال فريق الدفاع المدني",
        },
        {
            id: 3,
            title: "اشتباه تسرب غاز",
            location: "المنطقة الصناعية الثانية",
            riskLevel: "عالي",
            confidence: 89,
            casesCount: 12,
            description: "شكاوى متعددة من روائح غاز قوية في المنطقة الصناعية.",
            recommendation: "إخلاء المنطقة وتفعيل بروتوكول الطوارئ الكيميائية",
        },
    ];

    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-2">
                <div>
                    <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-500" />
                        الأنماط الناشئة الخطيرة
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">رصد لحظي عبر الذكاء الاصطناعي</p>
                </div>
                <div className="px-2.5 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-full border border-red-100 animate-pulse whitespace-nowrap">
                    ● 3 أنماط نشطة
                </div>
            </div>

            {/* Pattern Cards */}
            <div className="space-y-3 overflow-y-auto flex-1">
                {patterns.map((pattern, index) => (
                    <div
                        key={pattern.id}
                        className="p-3.5 rounded-xl border border-red-100 bg-red-50/20 hover:bg-red-50/60 transition-all group cursor-pointer animate-fade-in-up"
                        style={{ animationDelay: `${index * 80}ms` }}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-800 text-sm group-hover:text-red-700 transition-colors">
                                {pattern.title}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ms-2
                                ${pattern.riskLevel === "حرج"
                                    ? "bg-red-100 text-red-700 border border-red-200 shadow-sm shadow-red-200"
                                    : "bg-amber-50 text-amber-700 border border-amber-200"
                                }`}
                            >
                                {pattern.riskLevel}
                            </span>
                        </div>

                        <p className="text-xs text-gray-500 mb-2.5 leading-relaxed line-clamp-2">
                            {pattern.description}
                        </p>

                        {/* Recommendation */}
                        <div className="bg-saudi-green/5 border border-saudi-green/15 rounded-lg p-2 mb-2.5">
                            <div className="text-[10px] font-bold text-saudi-green mb-0.5">التوصية:</div>
                            <div className="text-xs text-gray-600">{pattern.recommendation}</div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-[10px] text-gray-400">
                                <div className="flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3 text-gray-400" />
                                    <span>الثقة: {pattern.confidence}%</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-red-400" />
                                    <span>{pattern.location}</span>
                                </div>
                            </div>
                            <button className="text-[10px] text-saudi-green font-bold flex items-center gap-1 hover:underline group-hover:gap-2 transition-all">
                                إجراء
                                <ArrowLeft className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
