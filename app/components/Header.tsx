"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, User, Menu, X } from "lucide-react";

export function Header({ toggleSidebar }: { toggleSidebar?: () => void }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/complaints?search=${encodeURIComponent(searchTerm.trim())}`);
            setMobileSearchOpen(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch(e);
        if (e.key === 'Escape') setMobileSearchOpen(false);
    };

    return (
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between gap-4 shadow-sm">

            {/* Left: Search (desktop) */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Desktop search */}
                <form onSubmit={handleSearch} className="relative hidden sm:block w-72">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="بحث في الشكاوى..."
                        className="w-full h-9 pr-10 pl-4 rounded-full bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-saudi-green/30 focus:border-saudi-green outline-none transition-all placeholder:text-gray-400 text-gray-700 hover:bg-gray-100"
                    />
                </form>

                {/* Mobile search toggle */}
                <button
                    className="sm:hidden p-2 text-gray-500 hover:text-saudi-green transition-colors rounded-lg hover:bg-gray-100"
                    onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                >
                    {mobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                </button>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-2 md:gap-3">
                {/* Notification Bell */}
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-saudi-green">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-white text-[8px] font-bold leading-none">3</span>
                    </span>
                </button>

                <div className="hidden md:block h-6 w-px bg-gray-200 mx-1" />

                {/* Profile */}
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="text-left hidden md:block">
                        <p className="text-sm font-bold text-gray-700 leading-none">خالد</p>
                        <p className="text-xs text-gray-400 mt-0.5">مدير النظام</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-saudi-green to-saudi-green-light flex items-center justify-center shadow-sm ring-2 ring-saudi-green/20 cursor-pointer hover:ring-saudi-green/40 transition-all">
                        <User className="w-4 h-4 text-white" />
                    </div>
                </div>

                {/* Mobile hamburger – far left in RTL (visually rightmost) */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-2 text-gray-500 hover:text-saudi-green transition-colors rounded-lg hover:bg-gray-100 mr-1"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            {/* Mobile Search Fullscreen Overlay */}
            {mobileSearchOpen && (
                <div className="sm:hidden absolute top-full right-0 left-0 bg-white border-b border-gray-200 p-3 shadow-lg animate-fade-in-up z-50">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="بحث في الشكاوى..."
                            autoFocus
                            className="w-full h-10 pr-10 pl-4 rounded-full bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-saudi-green/30 focus:border-saudi-green outline-none"
                        />
                    </form>
                </div>
            )}
        </header>
    );
}
