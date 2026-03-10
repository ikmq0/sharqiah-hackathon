"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Building2, MapPin, Shield, Activity, GraduationCap, Home, Truck, ShieldAlert, Droplets, Car, Plane, TrendingUp, TrendingDown, Minus } from "lucide-react";
import servicesTreeData from "../data/services_tree.json";
import { ServiceNode } from "../types";

const iconMap: Record<string, any> = {
    "الخدمات الصحية": Activity,
    "الخدمات التعليمية": GraduationCap,
    "الخدمات البلدية": Building2,
    "خدمات الدفاع المدني": ShieldAlert,
    "الخدمات الأمنية": Shield,
    "الخدمات المرورية": Car,
    "خدمات المنافذ الحدودية": Plane,
    "خدمات الطرق": Truck,
    "خدمات المياه": Droplets,
};

export function ServiceTree() {
    const router = useRouter();
    const [currentNode, setCurrentNode] = useState<ServiceNode | null>(null);
    const [breadcrumbs, setBreadcrumbs] = useState<ServiceNode[]>([]);

    // Get the children array from the JSON structure
    const rootData = servicesTreeData as unknown as ServiceNode;
    const displayedNodes = currentNode ? currentNode.children : rootData.children;

    const handleNodeClick = (node: ServiceNode) => {
        if (!node.children || node.children.length === 0) {
            router.push(`/complaints?entity=${encodeURIComponent(node.name)}&sector=${encodeURIComponent(getRootSector(node))}`);
            return;
        }
        setBreadcrumbs([...breadcrumbs, node]);
        setCurrentNode(node);
    };

    const handleBreadcrumbClick = (index: number) => {
        if (index === -1) {
            setBreadcrumbs([]);
            setCurrentNode(null);
        } else {
            const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
            setBreadcrumbs(newBreadcrumbs);
            setCurrentNode(newBreadcrumbs[newBreadcrumbs.length - 1]);
        }
    };

    const getRootSector = (node: ServiceNode): string => {
        if (breadcrumbs.length > 0) return breadcrumbs[0].name;
        return node.name;
    };

    const IconComponent = (nodeName: string) => {
        if (iconMap[nodeName]) return iconMap[nodeName];
        if (breadcrumbs.length > 0 && iconMap[breadcrumbs[0].name]) return iconMap[breadcrumbs[0].name];
        return Building2;
    };

    const getPerformanceColor = (perf: number) => {
        if (perf >= 80) return 'text-saudi-green bg-saudi-green/10 border border-saudi-green/20';
        if (perf >= 60) return 'text-amber-700 bg-amber-50 border border-amber-200';
        return 'text-red-600 bg-red-50 border border-red-200';
    };

    const getPerformanceIcon = (perf: number) => {
        if (perf >= 80) return TrendingUp;
        if (perf >= 60) return Minus;
        return TrendingDown;
    };

    // Calculate average performance for sectors
    const getAveragePerformance = (node: ServiceNode): number => {
        if (node.performance) return node.performance;
        if (!node.children || node.children.length === 0) return 0;
        const performances = node.children.filter(c => c.performance).map(c => c.performance!);
        if (performances.length === 0) return 0;
        return Math.round(performances.reduce((a, b) => a + b, 0) / performances.length);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white p-3 rounded-lg border border-gray-100 shadow-sm overflow-x-auto">
                <button
                    onClick={() => handleBreadcrumbClick(-1)}
                    className="hover:text-saudi-green transition-colors flex items-center gap-1 font-bold"
                >
                    <Home className="w-4 h-4" />
                    الرئيسية
                </button>

                {breadcrumbs.map((crumb, idx) => (
                    <div key={crumb.id} className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-300 rtl:rotate-180" />
                        <button
                            onClick={() => handleBreadcrumbClick(idx)}
                            className={`hover:text-saudi-green transition-colors ${idx === breadcrumbs.length - 1 ? 'text-saudi-green font-bold' : ''}`}
                        >
                            {crumb.name}
                        </button>
                    </div>
                ))}
            </div>

            {/* Current Section Info */}
            {currentNode && currentNode.mainAuthority && (
                <div className="bg-saudi-green/5 border border-saudi-green/20 rounded-xl p-4">
                    <div className="text-sm text-gray-500">الجهة الرئيسية المسؤولة:</div>
                    <div className="font-bold text-saudi-green">{currentNode.mainAuthority}</div>
                </div>
            )}

            {/* Grid of Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedNodes?.map((node, index) => {
                    const Icon = IconComponent(node.name);
                    const avgPerf = getAveragePerformance(node);
                    const PerfIcon = getPerformanceIcon(avgPerf);

                    return (
                        <div
                            key={node.id}
                            onClick={() => handleNodeClick(node)}
                            className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm cursor-pointer overflow-hidden card-hover animate-fade-in-up"
                            style={{ animationDelay: `${index * 80}ms` }}
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-saudi-green/5 rounded-bl-full -mr-4 -ml-4 transition-transform group-hover:scale-110" />

                            <div className="relative z-10">
                                {/* Header with Icon and Performance */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saudi-green/10 to-transparent flex items-center justify-center text-saudi-green group-hover:bg-saudi-green group-hover:text-white transition-colors duration-300">
                                        <Icon className="w-6 h-6" />
                                    </div>

                                    {avgPerf > 0 && (
                                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${getPerformanceColor(avgPerf)}`}>
                                            <PerfIcon className="w-3 h-3" />
                                            <span>{avgPerf}%</span>
                                        </div>
                                    )}
                                </div>

                                {/* Name */}
                                <h3 className="font-bold text-gray-800 text-base mb-2 group-hover:text-saudi-green transition-colors">
                                    {node.name}
                                </h3>

                                {/* Coverage or Sub-entities count */}
                                {node.coverage && (
                                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                                        {node.coverage}
                                    </p>
                                )}

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                                    <p className="text-xs text-gray-400">
                                        {node.children && node.children.length > 0
                                            ? `${node.children.length} جهة فرعية`
                                            : 'عرض الشكاوى'
                                        }
                                    </p>

                                    {avgPerf > 0 && (
                                        <div className="flex-1 mx-3">
                                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full animate-grow-width ${avgPerf >= 80 ? 'bg-saudi-green' : avgPerf >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                    style={{ width: `${avgPerf}%`, animationDelay: `${(index ?? 0) * 80 + 200}ms` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {(!displayedNodes || displayedNodes.length === 0) && (
                <div className="text-center py-20 text-gray-400">
                    لا توجد بيانات للعرض
                </div>
            )}

        </div>
    );
}
