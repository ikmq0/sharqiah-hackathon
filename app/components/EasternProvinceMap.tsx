"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import map to avoid SSR issues with Leaflet
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);
const GeoJSON = dynamic(
    () => import("react-leaflet").then((mod) => mod.GeoJSON),
    { ssr: false }
);

// Mock complaint data for featured Eastern Province districts
const initialDistrictComplaints: Record<string, { count: number; intensity: string }> = {
    "حي الفيصلية": { count: 2450, intensity: "critical" },
    "حي النخيل": { count: 1200, intensity: "high" },
    "حي الشاطئ": { count: 890, intensity: "medium" },
    "حي العزيزية": { count: 2100, intensity: "critical" },
    "حي الدمام": { count: 1800, intensity: "high" },
    "حي الخبر الشمالية": { count: 650, intensity: "low" },
    "حي الظهران": { count: 420, intensity: "low" },
    "حي الراكة": { count: 980, intensity: "medium" },
    "حي العليا": { count: 1500, intensity: "high" },
    "حي السلام": { count: 380, intensity: "low" },
};

type GeoJSONFeature = {
    type: string;
    properties: Record<string, unknown>;
    geometry: unknown;
};

type GeoJSONData = {
    type: string;
    features: GeoJSONFeature[];
};

export function EasternProvinceMap() {
    const router = useRouter();
    const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
    const [processedData, setProcessedData] = useState<Record<string, { count: number; intensity: string }>>(initialDistrictComplaints);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [leafletModule, setLeafletModule] = useState<any>(null);

    useEffect(() => {
        setIsClient(true);
        // Dynamically import Leaflet for client-side use
        import("leaflet").then((L) => setLeafletModule(L));
        // Load GeoJSON data
        fetch("/eastern_districts.json")
            .then((res) => res.json())
            .then((data) => {
                setGeoData(data);

                // Keep existing featured data and generate random for others
                const newData = { ...initialDistrictComplaints };

                if (data && data.features) {
                    data.features.forEach((feature: GeoJSONFeature) => {
                        // Try various name properties
                        const name = (feature.properties?.name_ar || feature.properties?.NAME_AR || feature.properties?.Name_AR) as string;

                        if (name && !newData[name]) {
                            // Generate mock data: 80% low, 15% medium, 5% high/critical
                            const rand = Math.random();
                            let intensity = "low";
                            let count = Math.floor(Math.random() * 50); // 0-50

                            if (rand > 0.95) {
                                intensity = "high";
                                count = 1000 + Math.floor(Math.random() * 500);
                            } else if (rand > 0.8) {
                                intensity = "medium";
                                count = 500 + Math.floor(Math.random() * 500);
                            }

                            newData[name] = { count, intensity };
                        }
                    });
                    setProcessedData(newData);
                }
            })
            .catch((err) => console.error("Failed to load GeoJSON:", err));
    }, []);

    const getColor = (intensity: string) => {
        switch (intensity) {
            case "critical": return "#ef4444";
            case "high": return "#f97316";
            case "medium": return "#eab308";
            case "low": return "#004d35";
            default: return "#94a3b8";
        }
    };

    const styleFeature = (feature: GeoJSONFeature | undefined) => {
        if (!feature) {
            return {
                fillColor: "#94a3b8",
                weight: 1,
                opacity: 1,
                color: "#fff",
                fillOpacity: 0.7,
            };
        }
        const districtName = (feature.properties?.name_ar || feature.properties?.NAME_AR || feature.properties?.Name_AR) as string;
        const complaint = processedData[districtName];

        return {
            fillColor: complaint ? getColor(complaint.intensity) : "#94a3b8",
            weight: selectedDistrict === districtName ? 3 : 1,
            opacity: 1,
            color: selectedDistrict === districtName ? "#004d35" : "#fff",
            fillOpacity: selectedDistrict === districtName ? 0.9 : 0.7,
        };
    };

    const onEachFeature = (feature: GeoJSONFeature, layer: L.Layer) => {
        const districtName = (feature.properties?.name_ar || feature.properties?.NAME_AR || feature.properties?.Name_AR) as string;
        const complaint = processedData[districtName];

        layer.on({
            mouseover: () => setSelectedDistrict(districtName || "حي غير معروف"),
            mouseout: () => setSelectedDistrict(null),
            click: () => {
                // Navigate to complaints page with district filter
                if (districtName) {
                    router.push(`/complaints?district=${encodeURIComponent(districtName)}`);
                }
            },
        });

        layer.bindTooltip(
            `<div class="text-right font-bold">${districtName || 'حي غير معروف'}</div>
             <div class="text-right text-sm">${complaint ? complaint.count.toLocaleString() + ' شكوى' : 'لا توجد بيانات'}</div>`,
            { direction: "top", className: "custom-tooltip" }
        );
    };

    if (!isClient) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
                <div className="text-gray-500">جاري تحميل الخريطة...</div>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative rounded-2xl overflow-hidden">
            {/* Legend */}
            <div className="absolute top-4 right-4 z-[30] bg-white/95 p-3 md:p-4 rounded-xl shadow-lg border border-gray-100 backdrop-blur-sm">
                <h4 className="text-xs md:text-sm font-bold text-gray-800 mb-2 md:mb-3">مؤشر الشكاوى</h4>
                <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 md:w-4 md:h-4 rounded bg-red-500 shrink-0"></span>
                        <span className="hidden sm:inline">حرج ({'>'}2000)</span>
                        <span className="sm:hidden">{'>'}2k</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 md:w-4 md:h-4 rounded bg-orange-600 shrink-0"></span>
                        <span className="hidden sm:inline">مرتفع (1000-2000)</span>
                        <span className="sm:hidden">1k-2k</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 md:w-4 md:h-4 rounded bg-amber-500 shrink-0"></span>
                        <span className="hidden sm:inline">متوسط (500-1000)</span>
                        <span className="sm:hidden">500-1k</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 md:w-4 md:h-4 rounded bg-saudi-green shrink-0"></span>
                        <span className="hidden sm:inline">طبيعي ({'<'}500)</span>
                        <span className="sm:hidden">{'<'}500</span>
                    </div>
                </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute top-4 left-4 z-[30] bg-white/95 p-3 md:p-4 rounded-xl shadow-lg border border-gray-100 backdrop-blur-sm">
                <div className="text-[10px] md:text-xs text-gray-500">إجمالي الشكاوى النشطة</div>
                <div className="text-2xl font-bold text-saudi-green">
                    {/* Sum of all visible complaints could go here, for now static or derived */}
                    {Object.values(processedData).reduce((a, b) => a + b.count, 0).toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 mt-1">المنطقة الشرقية (محدث)</div>
            </div>

            {/* Selected District Info */}
            {selectedDistrict && processedData[selectedDistrict] && (
                <div className="absolute bottom-4 right-4 z-[30] bg-white p-3 md:p-4 rounded-xl shadow-lg border border-saudi-green/20">
                    <div className="font-bold text-saudi-green">{selectedDistrict}</div>
                    <div className="text-sm text-gray-600">
                        {processedData[selectedDistrict].count.toLocaleString()} شكوى
                    </div>
                </div>
            )}

            {geoData ? (
                <MapContainer
                    center={[26.4207, 50.0888]} // Eastern Province center (Dammam area)
                    zoom={9} // Zoomed out slightly to see more
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON
                        data={geoData as GeoJSON.GeoJsonObject}
                        style={styleFeature}
                        onEachFeature={onEachFeature}
                        pointToLayer={leafletModule ? (feature, latlng) => {
                            // Custom marker for rural points
                            const isRural = feature.properties?.type === "Rural";
                            return leafletModule.circleMarker(latlng, {
                                radius: isRural ? 4 : 6,
                                fillColor: isRural ? "#d4af37" : "#004d35", // Gold for rural, Green for cities
                                color: "#fff",
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 0.8
                            });
                        } : undefined}
                    />
                </MapContainer>
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-gray-500 animate-pulse">جاري تحميل بيانات الخريطة...</div>
                </div>
            )}
        </div>
    );
}
