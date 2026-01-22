"use client";

import { useParams, useRouter } from "next/navigation";
import { findComplaintById } from "../../data/mock_complaints";
import {
    ArrowRight, User, Phone, Mail, MapPin, Calendar, Clock,
    AlertTriangle, CheckCircle2, XCircle, MessageSquare, FileText,
    BrainCircuit, Lightbulb, Target, Users, Shield, Building2
} from "lucide-react";

export default function ComplaintDetailPage() {
    const params = useParams();
    const router = useRouter();
    const complaint = findComplaintById(params.id as string);

    if (!complaint) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-600">الشكوى غير موجودة</h2>
                    <button
                        onClick={() => router.push('/complaints')}
                        className="mt-4 px-4 py-2 bg-saudi-green text-white rounded-lg"
                    >
                        العودة للشكاوى
                    </button>
                </div>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
            case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'escalated': return 'bg-purple-100 text-purple-700 border-purple-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'resolved': return 'تم الحل';
            case 'in-progress': return 'جاري العمل';
            case 'escalated': return 'تم التصعيد';
            default: return 'قيد الانتظار';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'bg-red-100 text-red-700';
            case 'high': return 'bg-orange-100 text-orange-700';
            case 'medium': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-blue-100 text-blue-700';
        }
    };

    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case 'critical': return 'حرج';
            case 'high': return 'عالي';
            case 'medium': return 'متوسط';
            default: return 'منخفض';
        }
    };

    const getDecisionColor = (decision: string | null) => {
        switch (decision) {
            case 'accepted': return 'text-green-600';
            case 'rejected': return 'text-red-600';
            case 'escalated': return 'text-purple-600';
            default: return 'text-gray-600';
        }
    };

    const getDecisionLabel = (decision: string | null) => {
        switch (decision) {
            case 'accepted': return 'تم القبول';
            case 'rejected': return 'مرفوض';
            case 'escalated': return 'تم التصعيد';
            default: return 'قيد المراجعة';
        }
    };

    return (
        <div className="space-y-6 pb-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => router.push('/complaints')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowRight className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-mono text-gray-400">{complaint.id}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getStatusColor(complaint.status)}`}>
                            {getStatusLabel(complaint.status)}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${getPriorityColor(complaint.priority)}`}>
                            {getPriorityLabel(complaint.priority)}
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">{complaint.title}</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content - 2 columns */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Original Message */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-saudi-green" />
                            نص الشكوى الأصلي
                        </h3>
                        <div className="bg-gray-50 rounded-xl p-4 text-gray-700 leading-relaxed">
                            {complaint.originalMessage}
                        </div>
                        {complaint.attachments.length > 0 && (
                            <div className="mt-4 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-500">المرفقات: {complaint.attachments.join(', ')}</span>
                            </div>
                        )}
                    </div>

                    {/* Entity Response */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-saudi-green" />
                            رد الجهة
                        </h3>
                        {complaint.entityResponse.respondedAt ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-saudi-green/10 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-saudi-green" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-800">{complaint.entityResponse.responderName}</div>
                                            <div className="text-xs text-gray-400">{complaint.entityResponse.responderPosition}</div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {new Date(complaint.entityResponse.respondedAt).toLocaleDateString('ar-SA')}
                                    </div>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 text-gray-700">
                                    {complaint.entityResponse.responseText}
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500">القرار:</span>
                                        <span className={`font-bold ${getDecisionColor(complaint.entityResponse.decision)}`}>
                                            {getDecisionLabel(complaint.entityResponse.decision)}
                                        </span>
                                    </div>
                                    {complaint.entityResponse.decisionReason && (
                                        <div className="text-sm text-gray-400">
                                            السبب: {complaint.entityResponse.decisionReason}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p>لم يتم الرد بعد</p>
                            </div>
                        )}
                    </div>

                    {/* AI Analysis */}
                    <div className="bg-gradient-to-br from-saudi-green/5 to-transparent rounded-2xl border border-saudi-green/20 p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <BrainCircuit className="w-5 h-5 text-saudi-green" />
                            تحليل الذكاء الاصطناعي
                        </h3>

                        <div className="bg-white rounded-xl p-4 mb-4">
                            <p className="text-gray-700 leading-relaxed">{complaint.aiAnalysis.summary}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white rounded-lg p-3 text-center">
                                <div className="text-2xl font-bold text-saudi-green">{complaint.aiAnalysis.urgencyScore}%</div>
                                <div className="text-xs text-gray-400">درجة الإلحاح</div>
                            </div>
                            <div className="bg-white rounded-lg p-3 text-center">
                                <div className="text-2xl font-bold text-orange-500">{complaint.aiAnalysis.similarCasesCount}</div>
                                <div className="text-xs text-gray-400">حالات مشابهة</div>
                            </div>
                            <div className="bg-white rounded-lg p-3 text-center">
                                <div className="text-2xl font-bold text-blue-500">{complaint.aiAnalysis.estimatedResolutionDays}</div>
                                <div className="text-xs text-gray-400">أيام للحل (تقدير)</div>
                            </div>
                            <div className="bg-white rounded-lg p-3 text-center">
                                <div className="text-lg font-bold text-gray-700">{complaint.aiAnalysis.categoryPrediction}</div>
                                <div className="text-xs text-gray-400">التصنيف المتوقع</div>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="mb-4">
                            <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                                <Lightbulb className="w-4 h-4 text-saudi-gold" />
                                التوصيات
                            </h4>
                            <div className="space-y-2">
                                {complaint.aiAnalysis.recommendations.map((rec, idx) => (
                                    <div key={idx} className="flex items-start gap-2 bg-white rounded-lg p-3">
                                        <CheckCircle2 className="w-4 h-4 text-saudi-green mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{rec}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Risk Factors */}
                        {complaint.aiAnalysis.riskFactors.length > 0 && (
                            <div className="mb-4">
                                <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-red-500" />
                                    عوامل الخطر
                                </h4>
                                <div className="space-y-2">
                                    {complaint.aiAnalysis.riskFactors.map((risk, idx) => (
                                        <div key={idx} className="flex items-start gap-2 bg-red-50 rounded-lg p-3">
                                            <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-red-700">{risk}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Root Cause Analysis */}
                        {complaint.aiAnalysis.rootCauseAnalysis && (
                            <div className="mb-4 bg-orange-50 border border-orange-200 rounded-xl p-4">
                                <h4 className="font-bold text-orange-700 mb-2">تحليل السبب الجذري</h4>
                                <p className="text-sm text-orange-800">{complaint.aiAnalysis.rootCauseAnalysis}</p>
                            </div>
                        )}

                        {/* Suggested Meeting */}
                        {complaint.aiAnalysis.suggestedMeeting && (
                            <div className="mb-4 bg-purple-50 border border-purple-200 rounded-xl p-4">
                                <h4 className="font-bold text-purple-700 mb-2 flex items-center gap-2">
                                    📅 اجتماع مقترح
                                </h4>
                                <p className="text-sm text-purple-800">{complaint.aiAnalysis.suggestedMeeting}</p>
                            </div>
                        )}

                        {/* Emirate Recommendations - Detailed */}
                        {complaint.aiAnalysis.emirateRecommendations && complaint.aiAnalysis.emirateRecommendations.length > 0 && (
                            <div className="border-t-2 border-saudi-green/30 pt-4">
                                <h4 className="font-bold text-saudi-green text-lg mb-4 flex items-center gap-2">
                                    🏛️ توصيات للإمارة
                                    <span className="text-xs bg-saudi-green text-white px-2 py-0.5 rounded-full">
                                        {complaint.aiAnalysis.emirateRecommendations.length} إجراءات
                                    </span>
                                </h4>
                                <div className="space-y-4">
                                    {complaint.aiAnalysis.emirateRecommendations.map((rec, idx) => (
                                        <div key={idx} className="bg-white border-2 border-saudi-green/20 rounded-xl p-4 hover:border-saudi-green/40 transition-colors">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-7 h-7 bg-saudi-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                        {idx + 1}
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${rec.priority === 'فوري' ? 'bg-red-100 text-red-700' :
                                                            rec.priority === 'عاجل' ? 'bg-orange-100 text-orange-700' :
                                                                'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {rec.priority}
                                                    </span>
                                                </div>
                                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                    ⏰ {rec.deadline}
                                                </span>
                                            </div>

                                            <p className="font-bold text-gray-800 mb-3">{rec.action}</p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                                <div className="bg-gray-50 rounded-lg p-2">
                                                    <span className="text-gray-500">الجهة المستهدفة:</span>
                                                    <p className="font-bold text-gray-700 mt-0.5">{rec.targetEntity}</p>
                                                </div>
                                                <div className="bg-green-50 rounded-lg p-2">
                                                    <span className="text-gray-500">النتيجة المتوقعة:</span>
                                                    <p className="font-bold text-green-700 mt-0.5">{rec.expectedOutcome}</p>
                                                </div>
                                            </div>

                                            <div className="mt-3 bg-red-50 rounded-lg p-2 text-xs">
                                                <span className="text-red-600 font-bold">مسار التصعيد:</span>
                                                <span className="text-red-700 mr-1">{rec.escalationPath}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar - 1 column */}
                <div className="space-y-6">

                    {/* Complainant Info */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-saudi-green" />
                            بيانات الشاكي
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-800">{complaint.complainant.name}</div>
                                    <div className="text-xs text-gray-400">رقم الهوية: {complaint.complainant.nationalId}</div>
                                </div>
                            </div>
                            <div className="border-t border-gray-100 pt-3 space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">{complaint.complainant.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">{complaint.complainant.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">{complaint.complainant.city} - {complaint.complainant.district}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Complaint Details */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-saudi-green" />
                            تفاصيل الشكوى
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">القطاع</span>
                                <span className="font-bold text-gray-800">{complaint.sector}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">الجهة</span>
                                <span className="font-bold text-gray-800">{complaint.entity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">نوع الخدمة</span>
                                <span className="font-bold text-gray-800">{complaint.serviceType}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">الحي</span>
                                <span className="font-bold text-gray-800">{complaint.district}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">المصدر</span>
                                <span className="font-bold text-gray-800">{complaint.source}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">تاريخ الإرسال</span>
                                <span className="font-bold text-gray-800">{new Date(complaint.timestamp).toLocaleDateString('ar-SA')}</span>
                            </div>
                            {complaint.targetPerson && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">الشكوى ضد</span>
                                    <span className="font-bold text-gray-800">{complaint.targetPerson}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Risk Score */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-saudi-green" />
                            تقييم المخاطر
                        </h3>
                        <div className="text-center">
                            <div className={`text-5xl font-bold mb-2 ${complaint.riskScore > 80 ? 'text-red-500' :
                                complaint.riskScore > 50 ? 'text-orange-500' : 'text-green-500'
                                }`}>
                                {complaint.riskScore}%
                            </div>
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${complaint.riskScore > 80 ? 'bg-red-500' :
                                        complaint.riskScore > 50 ? 'bg-orange-500' : 'bg-green-500'
                                        }`}
                                    style={{ width: `${complaint.riskScore}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
