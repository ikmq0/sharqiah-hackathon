import {
    LayoutDashboard,
    Map,
    Building2,
    AlertTriangle,
    LogOut
} from "lucide-react";
import Link from "next/link";

const menuItems = [
    { name: "مركز الذكاء", icon: AlertTriangle, href: "/" },
    { name: "الخريطة التفاعلية", icon: Map, href: "/map" },
    { name: "أداء الجهات", icon: Building2, href: "/ministries" },
];

export function Sidebar() {
    return (
        <aside className="fixed inset-y-0 right-0 z-50 w-64 bg-white border-l border-gray-200 shadow-xl flex flex-col transition-all duration-300">
            {/* Brand / Logo Area */}
            <div className="h-20 flex items-center justify-center border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-saudi-green">منصة رصد</span>
                        <span className="text-xs text-stone-500">نظام الرقابة الذكي</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-stone-100 hover:text-saudi-green transition-colors"
                    >
                        <item.icon className="w-5 h-5 text-gray-400 group-hover:text-saudi-green" />
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* Footer / Ministry Logos Placeholder */}
            <div className="p-4 border-t border-gray-100">

                <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>تسجيل الخروج</span>
                </button>
            </div>
        </aside>
    );
}
