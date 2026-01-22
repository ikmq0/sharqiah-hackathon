"use client";

import { Lightbulb, ArrowLeft, CheckCircle, AlertTriangle, Users, Clock, Target } from "lucide-react";

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

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'تصعيد': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'تحذير': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-blue-100 text-blue-700 border-blue-200';
        }
    };

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'حرج': return 'text-red-600';
            case 'عالي': return 'text-orange-600';
            default: return 'text-yellow-600';
        }
    };

    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-saudi-gold-dark" />
                        توصيات الذكاء الاصطناعي
                    </h2>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                        قرارات مقترحة بناءً على تحليل البيانات
                    </p>
                </div>
            </div>

            <div className="space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                {recommendations.map((rec) => (
                    <div
                        key={rec.id}
                        className="p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all group cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getTypeColor(rec.type)}`}>
                                    {rec.type}
                                </span>
                                <h3 className="font-bold text-gray-800 text-sm">
                                    {rec.title}
                                </h3>
                            </div>
                        </div>

                        <p className="text-[11px] text-gray-500 mb-3">
                            {rec.reason}
                        </p>

                        <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                                <Target className={`w-3 h-3 ${getImpactColor(rec.impact)}`} />
                                <span>التأثير: {rec.impact}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{rec.urgency}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>{rec.affectedCitizens.toLocaleString('en-US')} مواطن</span>
                            </div>
                        </div>

                        {/* Action Box */}
                        <div className="bg-saudi-green/5 border border-saudi-green/20 rounded-lg p-2 flex items-center justify-between">
                            <div className="text-[10px] text-gray-600">
                                <span className="font-bold text-saudi-green">الإجراء المقترح: </span>
                                {rec.suggestedAction}
                            </div>
                            <button className="text-[10px] bg-saudi-green text-white px-2 py-1 rounded font-bold hover:bg-saudi-green/90 transition-colors flex items-center gap-1">
                                تنفيذ
                                <CheckCircle className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
