"use client";

const issues = [
    { label: "حفر في الطرق الرئيسية", count: 42000, percentage: 40 },
    { label: "انقطاع المياه المتكرر", count: 21000, percentage: 20 },
    { label: "بطء تطبيق أبشر", count: 15000, percentage: 15 },
    { label: "نقص مواقف السيارات", count: 10000, percentage: 10 },
    { label: "تأخر المواعيد الصحية", count: 5000, percentage: 5 },
];

export function RecurringIssuesChart() {
    return (
        <div className="bg-white dark:bg-[#003323] rounded-2xl p-6 border border-gray-100 dark:border-[#004d35] h-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="font-bold text-lg text-saudi-green dark:text-white">الشكاوى الأكثر تكراراً (الضجيج)</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">قضايا ذات حجم بلاغات مرتفع جداً</p>
                </div>
                <div className="text-2xl font-bold text-gray-400 dark:text-gray-600">High Volume</div>
            </div>

            <div className="space-y-6">
                {issues.map((issue, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-700 dark:text-gray-200">{index + 1}. {issue.label}</span>
                            <span className="text-gray-500 dark:text-gray-400 font-mono">{issue.count.toLocaleString()} ({issue.percentage}%)</span>
                        </div>
                        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-saudi-green/80 dark:bg-saudi-green rounded-full transition-all duration-1000"
                                style={{ width: `${issue.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
