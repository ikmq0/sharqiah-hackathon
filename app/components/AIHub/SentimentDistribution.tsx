"use client";

export function SentimentDistribution() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
            <h3 className="font-bold text-lg text-saudi-green mb-4">تحليل المشاعر العام</h3>

            <div className="flex-1 flex items-center justify-center relative">
                {/* CSS-only Donut Chart */}
                <div className="relative w-40 h-40 rounded-full"
                    style={{
                        background: `conic-gradient(
                            var(--color-saudi-green) 0% 65%, 
                            var(--color-saudi-gold) 65% 85%, 
                            #ef4444 85% 100%
                        )`
                    }}
                >
                    {/* Inner Circle for Donut Effect */}
                    <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center z-10">
                        <span className="text-3xl font-bold text-gray-800">65%</span>
                        <span className="text-xs text-gray-400">إيجابي</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-saudi-green"></span>
                        <span className="text-gray-600">إيجابي</span>
                    </div>
                    <span className="font-bold text-gray-800">65%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-saudi-gold"></span>
                        <span className="text-gray-600">محايد</span>
                    </div>
                    <span className="font-bold text-gray-800">20%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="text-gray-600">سلبي</span>
                    </div>
                    <span className="font-bold text-gray-800">15%</span>
                </div>
            </div>
        </div>
    );
}
