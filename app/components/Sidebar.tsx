"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
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
    { name: "أداء الجهات", icon: Building2, href: "/entities" },
    { name: "جميع الشكاوى", icon: LayoutDashboard, href: "/complaints" },
];

export function Sidebar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        router.push('/login');
    };

    return (
        <aside className="fixed inset-y-0 right-0 z-50 w-64 bg-white border-l-2 border-saudi-green/20 shadow-xl flex flex-col transition-all duration-300">
            {/* Brand / Logo Area */}
            <div className="h-24 flex items-center justify-center border-b-2 border-saudi-green/10 bg-gradient-to-b from-saudi-green/5 to-transparent">
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative w-35 h-35">
                        <Image
                            src="/homepage-logo.png"
                            alt="المراقب الذكي"
                            fill
                            className="object-contain"
                        />
                    </div>

                </Link>
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

            {/* Footer / Logout */}
            <div className="p-4 border-t-2 border-saudi-green/10">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                >
                    <LogOut className="w-4 h-4" />
                    <span>تسجيل الخروج</span>
                </button>
            </div>
        </aside>
    );
}
