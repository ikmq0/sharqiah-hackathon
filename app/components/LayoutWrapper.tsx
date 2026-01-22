"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Pages that should NOT show the sidebar/header
    const isAuthPage = pathname === '/login';

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen w-full">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full mr-64 transition-all duration-300">
                <Header />
                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    {children}
                </div>
            </main>
        </div>
    );
}
