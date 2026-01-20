import { AlertTriangle, Siren, ShieldAlert } from "lucide-react";

export function CriticalAlertCard() {
    return (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-1 border-2 border-red-500/20 dark:border-red-500/50 h-full relative overflow-hidden group">
            {/* Pulse Animation Background */}
            <div className="absolute top-0 right-0 p-32 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-500/10 transition-all duration-700"></div>

            <div className="relative p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400 animate-pulse">
                            <Siren className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-red-700 dark:text-red-400">تنبيه ذكاء اصطناعي (حرج)</h3>
                            <p className="text-sm text-red-600/70 dark:text-red-400/70">تم اكتشاف نمط خطير غير اعتيادي</p>
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-bold rounded-full border border-red-200 dark:border-red-800">
                        High Risk Signal
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center py-4">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                        "تصدع هيكلي في جسر الملك فيصل - جازان"
                    </div>
                    <div className="p-4 bg-white dark:bg-black/20 rounded-xl border border-red-100 dark:border-red-900/30">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                            <ShieldAlert className="w-4 h-4" />
                            <span>تحليل الذكاء الاصطناعي:</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            على الرغم من ورود <span className="font-bold text-red-600">بلاغ واحد فقط</span>، إلا أن الصور المرفقة وتحليل الكلمات المفتاحية ("تشقق"، "سقوط"، "جسر") تشير إلى خطر وشيك يتطلب تدخلاً فورياً. تم تصعيد الحالة للدفاع المدني ووزارة النقل.
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-red-200 dark:border-red-800 pt-4">
                    <span className="text-xs font-mono text-red-600/80 dark:text-red-400/80">
                        Ref ID: #AI-992-K
                    </span>
                    <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg shadow-red-500/30 transition-all flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        اتخاذ إجراء فوري
                    </button>
                </div>
            </div>
        </div>
    );
}
