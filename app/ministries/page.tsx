"use client";

import { MinistriesTable } from "../components/MinistriesTable";

export default function MinistriesListPage() {
    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-saudi-green mb-2">أداء الوزارات</h1>
                <p className="text-gray-500">مشاهدة وتحليل بيانات الجهات الحكومية (عرض قاعدة البيانات)</p>
            </div>

            <MinistriesTable />
        </div>
    );
}
