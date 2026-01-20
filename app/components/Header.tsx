import { Bell, Search, User } from "lucide-react";

export function Header() {
    return (
        <header className="h-20 bg-white/80 dark:bg-[#003323]/90 backdrop-blur-md border-b border-gray-200 dark:border-[#004d35] sticky top-0 z-40 px-8 flex items-center justify-between">
            {/* Left Side (Search or Breadcrumbs) */}
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-96 hidden md:block">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="بحث في الشكاوى أو الوزارات..."
                        className="w-full h-10 pr-10 pl-4 rounded-full bg-stone-100 dark:bg-[#004d35] border-none text-sm focus:ring-2 focus:ring-saudi-gold outline-none transition-all placeholder:text-gray-400 dark:text-white"
                    />
                </div>
            </div>

            {/* Right Side (Actions & Profile) */}
            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#004d35] transition-colors text-gray-600 dark:text-gray-300">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#003323]"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 dark:bg-[#004d35] mx-2"></div>

                <div className="flex items-center gap-3">
                    <div className="text-left hidden md:block">
                        <p className="text-sm font-bold text-gray-700 dark:text-white">خالد</p>
                        <p className="text-xs text-gray-500 dark:text-saudi-gold">مدير النظام</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-[#004d35] flex items-center justify-center border border-gray-300 dark:border-saudi-gold">
                        <User className="w-5 h-5 text-gray-600 dark:text-saudi-gold" />
                    </div>
                </div>
            </div>
        </header>
    );
}
