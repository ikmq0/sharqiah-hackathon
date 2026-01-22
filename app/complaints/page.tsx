"use client";

import { Suspense } from "react";
import { ComplaintsTable } from "../components/ComplaintsTable";
import { MessageSquareWarning } from "lucide-react";

export default function ComplaintsPage() {
    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-saudi-green mb-2 flex items-center gap-3">
                    <MessageSquareWarning className="w-8 h-8" />
                    مركز الشكاوى الموحد
                </h1>
                <p className="text-gray-500">منصة مركزية لإدارة ومعالجة جميع الشكاوى الواردة من مختلف القنوات</p>
            </div>

            <Suspense fallback={<div>جاري التحميل...</div>}>
                <ComplaintsTable />
            </Suspense>
        </div>
    );
}
