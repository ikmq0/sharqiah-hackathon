import { AlertTriangle, Siren, ShieldAlert } from "lucide-react";

export function CriticalAlertCard() {
    return (
        <div className="gradient-border-red bg-white rounded-2xl h-full relative overflow-hidden group card-hover">
            {/* Animated background glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-red-500/10 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />

            <div className="relative p-6 h-full flex flex-col animate-fade-in">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0 shadow-sm">
                            <Siren className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-red-700 leading-tight">تنبيه ذكاء اصطناعي حرج</h3>
                            <p className="text-xs text-red-500/80 mt-0.5">تم اكتشاف نمط خطير غير اعتيادي</p>
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-md shadow-red-500/30 whitespace-nowrap animate-pulse">
                        🚨 إشارة خطر عالية
                    </div>
                </div>

                {/* Main Alert Content */}
                <div className="flex-1 flex flex-col justify-center py-2">
                    <div className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                        "تصدع هيكلي في جسر الكورنيش — الدمام"
                    </div>
                    <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-red-100 shadow-sm">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <ShieldAlert className="w-4 h-4 text-red-500" />
                            <span className="font-medium">تحليل الذكاء الاصطناعي</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                            على الرغم من ورود <span className="font-bold text-red-600">شكوى واحدة فقط</span>، إلا أن الصور المرفقة وتحليل الكلمات المفتاحية تشير إلى خطر وشيك يتطلب تدخلاً فورياً. تم تصعيد الحالة للدفاع المدني وأمانة الشرقية.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-red-200/60 pt-4 gap-3">
                    <span className="text-xs font-mono text-red-400">
                        Ref ID: #AI-992-K
                    </span>
                    <button className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 w-full sm:w-auto justify-center">
                        <AlertTriangle className="w-4 h-4" />
                        اتخاذ إجراء فوري
                    </button>
                </div>
            </div>
        </div>
    );
}
