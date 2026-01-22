"use client";

import { AlertTriangle, MapPin, Zap, ArrowLeft, PhoneCall, Users, FileText } from "lucide-react";

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
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-saudi-gold-dark" />
                        الأنماط الناشئة الخطيرة
                    </h2>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                        رصد لحظي عبر الذكاء الاصطناعي
                    </p>
                </div>
                <div className="px-2.5 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-full animate-pulse">
                    3 أنماط نشطة
                </div>
            </div>

            <div className="space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                {patterns.map((pattern) => (
                    <div
                        key={pattern.id}
                        className="p-3 rounded-xl border border-red-100 bg-red-50/30 hover:bg-red-50 transition-colors group cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-800 text-sm group-hover:text-red-700 transition-colors">
                                {pattern.title}
                            </h3>
                            <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${pattern.riskLevel === "حرج"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-orange-100 text-orange-700"
                                    }`}
                            >
                                {pattern.riskLevel}
                            </span>
                        </div>

                        <p className="text-[11px] text-gray-500 mb-2 leading-relaxed line-clamp-2">
                            {pattern.description}
                        </p>

                        {/* Decision Support Section */}
                        <div className="bg-saudi-green/5 border border-saudi-green/20 rounded-lg p-2 mb-2">
                            <div className="text-[10px] font-bold text-saudi-green mb-1">التوصية:</div>
                            <div className="text-[10px] text-gray-600">{pattern.recommendation}</div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-[10px] text-gray-400">
                                <div className="flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3 text-saudi-gold" />
                                    <span>الثقة: {pattern.confidence}%</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-red-500" />
                                    <span>{pattern.location}</span>
                                </div>
                            </div>
                            <button className="text-[10px] text-saudi-green font-bold flex items-center gap-1 hover:underline">
                                اتخاذ إجراء
                                <ArrowLeft className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
