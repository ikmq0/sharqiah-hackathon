"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();

    const handleNafathLogin = () => {
        localStorage.setItem('isAuthenticated', 'true');
        router.push('/');
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">

            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-saudi-green/5 via-slate-50 to-gray-100/50" />

            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-saudi-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-200/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gray-100/80 rounded-full blur-2xl" />

            <div className="relative w-full max-w-sm animate-fade-in-up">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-36 h-36 mx-auto mb-4 relative animate-float">
                        <Image
                            src="/homepage-logo.png"
                            alt="إمارة المنطقة الشرقية"
                            fill
                            className="object-contain drop-shadow-sm"
                            priority
                        />
                    </div>
                    <h1 className="text-xl font-bold text-saudi-green">المراقب الذكي</h1>
                    <p className="text-sm text-gray-400 mt-1">إمارة المنطقة الشرقية</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-8 animate-fade-in-up delay-150">
                    <div className="text-center mb-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-1">تسجيل الدخول</h2>
                        <p className="text-sm text-gray-400">يرجى تسجيل الدخول للوصول للوحة التحكم</p>
                    </div>

                    {/* Nafath Login Button */}
                    <button
                        onClick={handleNafathLogin}
                        className="shimmer-btn w-full py-4 px-6 text-white rounded-2xl font-bold text-base shadow-lg shadow-saudi-green/20 hover:shadow-xl hover:shadow-saudi-green/30 flex items-center justify-center gap-3 group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <span>تسجيل الدخول عن طريق نفاذ</span>
                    </button>

                    {/* Divider */}
                    <div className="mt-6 flex items-center gap-3">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-xs text-gray-300">نفاذ</span>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    {/* Info */}
                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-400">
                            الهوية الوطنية الرقمية الموحدة
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 animate-fade-in-up delay-300">
                    <p className="text-xs text-gray-400">إمارة المنطقة الشرقية © 2026</p>
                </div>
            </div>
        </div>
    );
}
