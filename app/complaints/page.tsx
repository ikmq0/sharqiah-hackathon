"use client";

import { Suspense } from "react";
import { ComplaintsTable } from "../components/ComplaintsTable";
import { MessageSquareWarning } from "lucide-react";

export default function ComplaintsPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="mb-4">
                <h1 className="text-xl md:text-3xl font-bold text-saudi-green mb-1 flex items-center gap-3">
                    <MessageSquareWarning className="w-6 h-6 md:w-8 md:h-8" />
                    مركز الشكاوى الموحد
                </h1>
                <p className="text-sm text-gray-400">منصة مركزية لإدارة ومعالجة جميع الشكاوى الواردة من مختلف القنوات</p>
            </div>

            <Suspense fallback={
                <div className="h-64 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-saudi-green/20 border-t-saudi-green rounded-full animate-spin" />
                </div>
            }>
                <ComplaintsTable />
            </Suspense>
        </div>
    );
}
