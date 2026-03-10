"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
    Map,
    Building2,
    BrainCircuit,
    LayoutDashboard,
    LogOut,
    X
} from "lucide-react";
import Link from "next/link";

const menuItems = [
    { name: "مركز الذكاء", icon: BrainCircuit, href: "/" },
    { name: "الخريطة التفاعلية", icon: Map, href: "/map" },
    { name: "أداء الجهات", icon: Building2, href: "/entities" },
    { name: "جميع الشكاوى", icon: LayoutDashboard, href: "/complaints" },
];

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        router.push('/login');
    };

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 right-0 z-50 w-64 bg-white border-l border-gray-100 shadow-xl flex flex-col transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Brand / Logo Area */}
                <div className="h-24 flex items-center justify-between px-4 border-b border-gray-100 bg-gradient-to-b from-saudi-green/5 to-transparent">
                    <Link href="/" className="flex items-center gap-3 w-full justify-center" onClick={() => setIsOpen(false)}>
                        <div className="relative w-32 h-16">
                            <Image
                                src="/homepage-logo.png"
                                alt="المراقب الذكي"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </Link>
                    <button
                        className="md:hidden text-gray-400 hover:text-saudi-green transition-colors p-1 rounded-lg hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                    {menuItems.map((item, index) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                style={{ animationDelay: `${index * 60}ms` }}
                                className={`group flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 animate-fade-in-up relative
                                    ${active
                                        ? 'bg-saudi-green text-white shadow-md shadow-saudi-green/20'
                                        : 'text-gray-600 hover:bg-stone-50 hover:text-saudi-green'
                                    }`}
                            >
                                {/* Active indicator */}
                                {active && (
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/40 rounded-l-full" />
                                )}
                                <item.icon className={`w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110
                                    ${active ? 'text-white' : 'text-gray-400 group-hover:text-saudi-green'}`}
                                />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer / Logout */}
                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 border border-red-100 hover:border-red-200 group"
                    >
                        <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
