"use client";

import { Lightbulb, CheckCircle, Clock, Target, Users } from "lucide-react";

export function AIRecommendations() {
    const recommendations = [
        {
            id: 1,
            type: "تصعيد",
            title: "تصعيد ملف الأمانة للجنة العليا",
            reason: "تكرار شكاوى النظافة في حي الفيصلية لمدة 15 يوم متتالي",
            impact: "عالي",
            urgency: "فوري",
            affectedCitizens: 2400,
            suggestedAction: "عقد اجتماع طوارئ مع مدير الأمانة خلال 24 ساعة",
        },
        {
            id: 2,
            type: "تحذير",
            title: "خطر تصاعد أزمة المياه",
            reason: "ارتفاع معدل شكاوى انقطاع المياه بنسبة 340% في الأسبوع الماضي",
            impact: "حرج",
            urgency: "خلال ساعات",
            affectedCitizens: 8500,
            suggestedAction: "التنسيق مع شركة المياه لخطة طوارئ وتوفير صهاريج بديلة",
        },
        {
            id: 3,
            type: "تحسين",
            title: "فرصة تحسين وقت الاستجابة",
            reason: "شعبة الرخص تحقق أداء أقل من المعدل العام بنسبة 25%",
            impact: "متوسط",
            urgency: "أسبوعي",
            affectedCitizens: 450,
            suggestedAction: "مراجعة إجراءات العمل وإضافة موظف إضافي في فترة الذروة",
        },
    ];

    const getTypeStyle = (type: string) => {
        switch (type) {
            case 'تصعيد': return { badge: 'bg-rose-50 text-rose-700 border-rose-200', accent: 'group-hover:border-r-rose-400' };
            case 'تحذير': return { badge: 'bg-red-50 text-red-700 border-red-200', accent: 'group-hover:border-r-red-400' };
            default: return { badge: 'bg-blue-50 text-blue-700 border-blue-200', accent: 'group-hover:border-r-saudi-green' };
        }
    };

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'حرج': return 'text-red-700';
            case 'عالي': return 'text-amber-700';
            default: return 'text-blue-600';
        }
    };

    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-gray-500" />
                        توصيات الذكاء الاصطناعي
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">قرارات مقترحة بناءً على تحليل البيانات</p>
                </div>
            </div>

            <div className="space-y-3 overflow-y-auto flex-1">
                {recommendations.map((rec, index) => {
                    const style = getTypeStyle(rec.type);
                    return (
                        <div
                            key={rec.id}
                            className={`p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group cursor-pointer
                                border-r-4 border-r-transparent ${style.accent} animate-fade-in-up`}
                            style={{ animationDelay: `${index * 80}ms` }}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold border ${style.badge}`}>
                                        {rec.type}
                                    </span>
                                    <h3 className="font-bold text-gray-800 text-sm truncate">
                                        {rec.title}
                                    </h3>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                                {rec.reason}
                            </p>

                            <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-3">
                                <div className="flex items-center gap-1">
                                    <Target className={`w-3 h-3 ${getImpactColor(rec.impact)}`} />
                                    <span>التأثير: <span className={`font-bold ${getImpactColor(rec.impact)}`}>{rec.impact}</span></span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-gray-400" />
                                    <span>{rec.urgency}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3 text-gray-400" />
                                    <span>{rec.affectedCitizens.toLocaleString('en-US')} مواطن</span>
                                </div>
                            </div>

                            {/* Action Box */}
                            <div className="bg-saudi-green/5 border border-saudi-green/15 rounded-lg p-2.5 flex items-center justify-between gap-2">
                                <div className="text-xs text-gray-600 flex-1 min-w-0">
                                    <span className="font-bold text-saudi-green">الإجراء: </span>
                                    {rec.suggestedAction}
                                </div>
                                <button className="shrink-0 text-xs bg-saudi-green text-white px-3 py-1.5 rounded-lg font-bold hover:bg-saudi-green-dark transition-all hover:scale-105 active:scale-95 flex items-center gap-1 shadow-sm">
                                    تنفيذ
                                    <CheckCircle className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
