"use client";

import { ServiceTree } from "../components/ServiceTree";

export default function MinistriesListPage() {
    return (
        <div className="space-y-6">
            <div className="mb-4">
                <h1 className="text-3xl font-bold text-saudi-green mb-2">أداء الجهات</h1>
                <p className="text-gray-500">تصفح الهيكل التنظيمي للجهات الحكومية والخدمية في المنطقة الشرقية</p>
            </div>

            <ServiceTree />
        </div>
    );
}
