"use client";

import { ServiceTree } from "../components/ServiceTree";

export default function MinistriesListPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="mb-2">
                <h1 className="text-xl md:text-3xl font-bold text-saudi-green mb-1">أداء الجهات</h1>
                <p className="text-sm text-gray-400">تصفح الهيكل التنظيمي للجهات الحكومية والخدمية في المنطقة الشرقية</p>
            </div>

            <ServiceTree />
        </div>
    );
}
