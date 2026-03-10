"use client";

import { AlertTriangle, CheckCircle2, CloudLightning, Activity, MapPin } from "lucide-react";

type FeedItem = {
    id: number;
    time: string;
    message: string;
    type: "critical" | "warning" | "info" | "success";
    location: string;
};

const feedData: FeedItem[] = [
    { id: 1, time: "الآن", message: "رصد تجمعات غير اعتيادية", location: "كورنيش الدمام", type: "warning" },
    { id: 2, time: "منذ 2 د", message: "انخفاض مؤشر جودة الهواء", location: "المنطقة الصناعية - الدمام", type: "critical" },
    { id: 3, time: "منذ 5 د", message: "تم حل شكوى تسرب مياه", location: "حي الفيصلية - الدمام", type: "success" },
    { id: 4, time: "منذ 12 د", message: "ازدياد في شكاوى الازدحام", location: "طريق الملك فهد - الخبر", type: "info" },
    { id: 5, time: "منذ 15 د", message: "رصد حفرية غير مطابقة", location: "حي الراكة - الخبر", type: "warning" },
    { id: 6, time: "منذ 22 د", message: "اكتمال معالجة التشوه البصري", location: "واجهة الظهران البحرية", type: "success" },
];

const typeConfig = {
    critical: {
        icon: CloudLightning,
        bg: "bg-red-50/50 border-red-100",
        dot: "bg-red-600",
        iconColor: "text-red-600",
    },
    warning: {
        icon: AlertTriangle,
        bg: "bg-amber-50 border-amber-200",
        dot: "bg-amber-500",
        iconColor: "text-amber-600",
    },
    success: {
        icon: CheckCircle2,
        bg: "bg-saudi-green/5 border-saudi-green/10",
        dot: "bg-saudi-green",
        iconColor: "text-saudi-green",
    },
    info: {
        icon: Activity,
        bg: "bg-gray-50 border-gray-100",
        dot: "bg-gray-400",
        iconColor: "text-gray-500",
    },
};

export function RealTimeFeed() {
    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm h-full overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-gray-800 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-saudi-green" />
                    البث المباشر للذكاء الاصطناعي
                </h3>
                {/* Live indicator with ring animation */}
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">مباشر</span>
                    <div className="pulse-ring w-2.5 h-2.5 rounded-full bg-saudi-green" />
                </div>
            </div>

            {/* Feed */}
            <div className="flex-1 overflow-y-auto space-y-2.5 -ml-1 pl-1">
                {feedData.map((item, index) => {
                    const config = typeConfig[item.type];
                    const Icon = config.icon;
                    return (
                        <div
                            key={item.id}
                            className={`flex gap-3 p-3 rounded-xl border transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer animate-fade-in-up ${config.bg}`}
                            style={{ animationDelay: `${index * 60}ms` }}
                        >
                            <div className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-white/70 ${config.iconColor}`}>
                                <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-2">
                                    <p className="text-xs font-bold text-gray-800 leading-tight">{item.message}</p>
                                    <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">{item.time}</span>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                                    <MapPin className="w-2.5 h-2.5 shrink-0" />
                                    {item.location}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
