"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();

    const handleNafathLogin = () => {
        // Simulate Nafath login - in production this would redirect to Nafath SSO
        localStorage.setItem('isAuthenticated', 'true');
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-saudi-green/5 via-white to-saudi-gold/5 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="w-40 h-40 mx-auto mb-6 relative">
                        <Image
                            src="/homepage-logo.png"
                            alt="إمارة المنطقة الشرقية"
                            width={128}
                            height={128}
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">تسجيل الدخول</h2>
                        <p className="text-sm text-gray-500">يرجى تسجيل الدخول للوصول للوحة التحكم</p>
                    </div>

                    {/* Nafath Login Button */}
                    <button
                        onClick={handleNafathLogin}
                        className="w-full py-4 px-6 bg-gradient-to-r from-[#1a472a] to-[#2d5a3d] text-white rounded-2xl font-bold text-lg hover:from-[#153d23] hover:to-[#245032] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
                    >
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <span>تسجيل الدخول عن طريق نفاذ</span>
                    </button>

                    {/* Nafath Info */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-400">
                            نفاذ - الهوية الوطنية الرقمية
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">

                </div>
            </div>
        </div>
    );
}
