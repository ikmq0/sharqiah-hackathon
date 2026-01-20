import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "منصة رصد | غرفة الموقف الوطنية",
  description: "نظام التفتيش والرقابة الذكي",
};

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${ibmPlexSansArabic.variable} antialiased bg-gray-50 text-gray-900 overflow-hidden`}
      >
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
      </body>
    </html>
  );
}
