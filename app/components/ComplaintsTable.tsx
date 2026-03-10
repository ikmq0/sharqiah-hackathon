"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, AlertTriangle, CheckCircle2, Clock, MoreHorizontal, Calendar, SlidersHorizontal, X, ArrowUpDown, MapPin } from "lucide-react";
import { mockComplaints } from "../data/mock_complaints";
import { Complaint } from "../types";

type SortKey = 'timestamp' | 'riskScore' | 'priority';
type SortDirection = 'asc' | 'desc';

export function ComplaintsTable() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Filter States
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSector, setSelectedSector] = useState("all");
    const [selectedEntity, setSelectedEntity] = useState("all");
    const [selectedDistrict, setSelectedDistrict] = useState("all");
    const [selectedPriority, setSelectedPriority] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [showFilters, setShowFilters] = useState(true);

    // Sorting
    const [sortKey, setSortKey] = useState<SortKey>('timestamp');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

    // Initial load from URL Params
    useEffect(() => {
        const sector = searchParams.get('sector');
        const entity = searchParams.get('entity');
        const district = searchParams.get('district');
        const search = searchParams.get('search');

        if (sector) setSelectedSector(sector);
        if (entity) setSelectedEntity(entity);
        if (district) setSelectedDistrict(district);
        if (search) setSearchTerm(search);
    }, [searchParams]);

    // Derived Lists for Dropdowns
    const sectors = useMemo(() => Array.from(new Set(mockComplaints.map(c => c.sector))), []);
    const districts = useMemo(() => Array.from(new Set(mockComplaints.map(c => c.district))).sort(), []);
    const entities = useMemo(() => {
        let filtered = mockComplaints;
        if (selectedSector !== 'all') {
            filtered = filtered.filter(c => c.sector === selectedSector);
        }
        return Array.from(new Set(filtered.map(c => c.entity)));
    }, [selectedSector]);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('desc');
        }
    };

    // Data Filtering & Sorting Logic
    const filteredComplaints = useMemo(() => {
        let result = mockComplaints.filter(complaint => {
            const matchesSearch = complaint.title.includes(searchTerm) ||
                complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                complaint.description.includes(searchTerm);

            const matchesSector = selectedSector === 'all' || complaint.sector === selectedSector;
            const matchesEntity = selectedEntity === 'all' || complaint.entity === selectedEntity;
            const matchesDistrict = selectedDistrict === 'all' || complaint.district === selectedDistrict;
            const matchesPriority = selectedPriority === 'all' || complaint.priority === selectedPriority;
            const matchesStatus = selectedStatus === 'all' || complaint.status === selectedStatus;

            // Date filtering
            let matchesDate = true;
            if (dateFrom) {
                matchesDate = matchesDate && new Date(complaint.timestamp) >= new Date(dateFrom);
            }
            if (dateTo) {
                matchesDate = matchesDate && new Date(complaint.timestamp) <= new Date(dateTo + "T23:59:59Z");
            }

            return matchesSearch && matchesSector && matchesEntity && matchesDistrict && matchesPriority && matchesStatus && matchesDate;
        });

        // Sorting
        result.sort((a, b) => {
            let comparison = 0;
            if (sortKey === 'timestamp') {
                comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
            } else if (sortKey === 'riskScore') {
                comparison = a.riskScore - b.riskScore;
            } else if (sortKey === 'priority') {
                const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
                comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return sortDirection === 'asc' ? comparison : -comparison;
        });

        return result;
    }, [searchTerm, selectedSector, selectedEntity, selectedDistrict, selectedPriority, selectedStatus, dateFrom, dateTo, sortKey, sortDirection]);

    const getPriorityLabel = (p: string) => {
        switch (p) {
            case 'critical': return 'حرج';
            case 'high': return 'عالي';
            case 'medium': return 'متوسط';
            default: return 'منخفض';
        }
    };

    const getPriorityColor = (p: string) => {
        switch (p) {
            case 'critical': return 'bg-red-50 text-red-700 border border-red-200';
            case 'high': return 'bg-amber-50 text-amber-700 border border-amber-200';
            case 'medium': return 'bg-blue-50 text-blue-700 border border-blue-200';
            default: return 'bg-slate-50 text-slate-600 border border-slate-200';
        }
    };

    const getStatusColor = (s: string) => {
        switch (s) {
            case 'resolved': return 'bg-saudi-green/10 text-saudi-green border border-saudi-green/20';
            case 'in-progress': return 'bg-blue-50 text-blue-700 border border-blue-200';
            case 'escalated': return 'bg-rose-50 text-rose-700 border border-rose-200';
            default: return 'bg-slate-50 text-slate-600 border border-slate-200';
        }
    };

    const clearFilters = () => {
        setSelectedSector('all');
        setSelectedEntity('all');
        setSelectedDistrict('all');
        setSelectedPriority('all');
        setSelectedStatus('all');
        setDateFrom('');
        setDateTo('');
        setSearchTerm('');
    };

    const activeFiltersCount = [
        selectedSector !== 'all',
        selectedEntity !== 'all',
        selectedDistrict !== 'all',
        selectedPriority !== 'all',
        selectedStatus !== 'all',
        dateFrom !== '',
        dateTo !== ''
    ].filter(Boolean).length;

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col">

            {/* Top Toolbar */}
            <div className="p-4 border-b border-gray-100 bg-white/80 backdrop-blur-md flex flex-col md:flex-row gap-4 justify-between items-start md:items-center sticky top-0 z-20">
                <div className="relative w-full md:w-96">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="بحث برقم الشكوى أو العنوان..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-10 pr-10 pl-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-saudi-green focus:border-saudi-green outline-none text-sm transition-all"
                    />
                </div>

                <div className="flex flex-wrap gap-2 w-full md:w-auto items-center justify-between md:justify-end">
                    <span className="text-sm text-gray-500 order-last md:order-first">
                        {filteredComplaints.length} شكوى
                    </span>

                    <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                        {activeFiltersCount > 0 && (
                            <button
                                onClick={clearFilters}
                                className="flex-1 md:flex-none h-10 px-3 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                            >
                                <X className="w-4 h-4" />
                                مسح ({activeFiltersCount})
                            </button>
                        )}

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex-1 md:flex-none h-10 px-4 rounded-lg border flex items-center justify-center gap-2 text-sm font-medium transition-colors
                            ${showFilters ? 'border-saudi-green bg-saudi-green/10 text-saudi-green' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            <span>تصفية</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="p-4 bg-gray-50 border-b border-gray-100 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-in slide-in-from-top-2">
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-1.5 block">القطاع</label>
                        <select
                            value={selectedSector}
                            onChange={(e) => { setSelectedSector(e.target.value); setSelectedEntity('all'); }}
                            className="w-full h-9 px-2 rounded border border-gray-200 text-sm outline-none focus:border-saudi-green bg-white"
                        >
                            <option value="all">الكل</option>
                            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-1.5 block">الجهة</label>
                        <select
                            value={selectedEntity}
                            onChange={(e) => setSelectedEntity(e.target.value)}
                            className="w-full h-9 px-2 rounded border border-gray-200 text-sm outline-none focus:border-saudi-green bg-white"
                        >
                            <option value="all">الكل</option>
                            {entities.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-1.5 block flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            الحي
                        </label>
                        <select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className="w-full h-9 px-2 rounded border border-gray-200 text-sm outline-none focus:border-saudi-green bg-white"
                        >
                            <option value="all">الكل</option>
                            {districts.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-1.5 block">الأولوية</label>
                        <select
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            className="w-full h-9 px-2 rounded border border-gray-200 text-sm outline-none focus:border-saudi-green bg-white"
                        >
                            <option value="all">الكل</option>
                            <option value="critical">حرج</option>
                            <option value="high">عالي</option>
                            <option value="medium">متوسط</option>
                            <option value="low">منخفض</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-1.5 block">الحالة</label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full h-9 px-2 rounded border border-gray-200 text-sm outline-none focus:border-saudi-green bg-white"
                        >
                            <option value="all">الكل</option>
                            <option value="pending">قيد الانتظار</option>
                            <option value="in-progress">جاري العمل</option>
                            <option value="resolved">تم الحل</option>
                            <option value="escalated">تم التصعيد</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-1.5 block">التاريخ من</label>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="w-full h-9 px-2 rounded border border-gray-200 text-sm outline-none focus:border-saudi-green bg-white"
                        />
                    </div>
                </div>
            )}

            {/* Table Content */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 sticky top-0 z-10 border-b border-gray-200 text-gray-500 font-medium">
                        <tr>
                            <th className="px-4 py-3 w-28">رقم الشكوى</th>
                            <th className="px-4 py-3">تفاصيل الشكوى</th>
                            <th className="px-4 py-3 w-36">الحي</th>
                            <th className="px-4 py-3 w-40">الجهة المسؤولة</th>
                            <th className="px-4 py-3 w-28">الحالة</th>
                            <th className="px-4 py-3 w-24 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('priority')}>
                                <div className="flex items-center gap-1">
                                    الأولوية
                                    <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="px-4 py-3 w-28 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('riskScore')}>
                                <div className="flex items-center gap-1">
                                    المخاطر
                                    <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="px-4 py-3 w-28 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('timestamp')}>
                                <div className="flex items-center gap-1">
                                    التاريخ
                                    <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="px-4 py-3 w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredComplaints.length > 0 ? filteredComplaints.map((complaint) => (
                            <tr
                                key={complaint.id}
                                className={`group transition-colors cursor-pointer row-accent
                                    ${complaint.priority === 'critical' ? 'row-accent-critical' :
                                        complaint.priority === 'high' ? 'row-accent-high' :
                                            complaint.priority === 'medium' ? 'row-accent-medium' :
                                                'row-accent-low'}`}
                                onClick={() => router.push(`/complaints/${complaint.id}`)}
                            >
                                <td className="px-4 py-3 font-mono text-gray-500 text-xs">
                                    {complaint.id}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="font-bold text-gray-800 mb-0.5 text-sm">{complaint.title}</div>
                                    <div className="text-xs text-gray-400 flex items-center gap-2">
                                        <span>{complaint.source}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span>{complaint.serviceType}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        {complaint.district}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="text-gray-700 font-medium text-xs">{complaint.entity}</div>
                                    <div className="text-[10px] text-gray-400">{complaint.sector}</div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold flex w-fit items-center gap-1 ${getStatusColor(complaint.status)}`}>
                                        {complaint.status === 'resolved' && <CheckCircle2 className="w-3 h-3" />}
                                        {complaint.status === 'in-progress' && <Clock className="w-3 h-3" />}
                                        {complaint.status === 'pending' && <Calendar className="w-3 h-3" />}
                                        {complaint.status === 'escalated' && <AlertTriangle className="w-3 h-3" />}

                                        {complaint.status === 'resolved' ? 'تم الحل' :
                                            complaint.status === 'in-progress' ? 'جاري العمل' :
                                                complaint.status === 'escalated' ? 'مصعدة' : 'جديد'}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${getPriorityColor(complaint.priority)}`}>
                                        {getPriorityLabel(complaint.priority)}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1.5">
                                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden w-12">
                                            <div
                                                className={`h-full rounded-full ${complaint.riskScore > 80 ? 'bg-red-500' : complaint.riskScore > 50 ? 'bg-amber-500' : 'bg-saudi-green'}`}
                                                style={{ width: `${complaint.riskScore}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-mono font-bold text-gray-400">{complaint.riskScore}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-[10px] text-gray-400">
                                    {new Date(complaint.timestamp).toLocaleDateString('ar-SA')}
                                </td>
                                <td className="px-4 py-3">
                                    <button className="p-1.5 text-gray-400 hover:text-saudi-green hover:bg-saudi-green/10 rounded-lg transition-colors">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={9} className="py-20 text-center">
                                    <div className="flex flex-col items-center gap-3 text-gray-400">
                                        <svg className="w-12 h-12 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                        <span className="text-sm font-medium">لا توجد شكاوى مطابقة لمعايير البحث</span>
                                        <span className="text-xs">جرّب تعديل معايير التصفية</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
