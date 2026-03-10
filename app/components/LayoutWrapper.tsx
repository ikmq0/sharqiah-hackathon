"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Pages that should NOT show the sidebar/header
    const isAuthPage = pathname === '/login';

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen w-full relative">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full mr-0 md:mr-64 transition-all duration-300 w-full md:w-auto">
                <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
                    {children}
                </div>
            </main>
        </div>
    );
}
