"use client";

import { AlertTriangle, CheckCircle2, CloudLightning, Activity } from "lucide-react";

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

export function RealTimeFeed() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-saudi-green flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    البث المباشر للذكاء الاصطناعي
                </h3>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 -mr-2 space-y-3 custom-scrollbar">
                {feedData.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                        <div className={`mt-1 min-w-[24px] h-6 rounded-full flex items-center justify-center
                            ${item.type === 'critical' ? 'bg-red-50 text-red-700 border border-red-100' :
                                item.type === 'warning' ? 'bg-saudi-gold/10 text-saudi-gold-dark border border-saudi-gold/20' :
                                    item.type === 'success' ? 'bg-saudi-green/10 text-saudi-green border border-saudi-green/20' :
                                        'bg-gray-50 text-gray-600 border border-gray-100'}`}>
                            {item.type === 'critical' && <CloudLightning className="w-3 h-3" />}
                            {item.type === 'warning' && <AlertTriangle className="w-3 h-3" />}
                            {item.type === 'success' && <CheckCircle2 className="w-3 h-3" />}
                            {item.type === 'info' && <Activity className="w-3 h-3" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <p className="text-xs font-bold text-gray-800 line-clamp-1">{item.message}</p>
                                <span className="text-[10px] text-gray-400 whitespace-nowrap">{item.time}</span>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                                <span className="w-3 h-3 inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                </span>
                                <span>{item.location}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}
