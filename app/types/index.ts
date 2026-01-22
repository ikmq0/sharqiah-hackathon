export interface ServiceNode {
    id: string;
    name: string;
    type: 'root' | 'agency' | 'branch';
    keywords: string[];
    children?: ServiceNode[];
    mainAuthority?: string;
    coverage?: string;
    performance?: number;
}

export interface Complainant {
    id: string;
    name: string;
    nationalId: string;
    phone: string;
    email: string;
    city: string;
    district: string;
}

export interface EntityResponse {
    respondedAt: string | null;
    responderName: string | null;
    responderPosition: string | null;
    responseText: string | null;
    decision: 'accepted' | 'rejected' | 'pending' | 'escalated' | null;
    decisionReason: string | null;
}

export interface EmirateRecommendation {
    action: string;
    targetEntity: string;
    deadline: string;
    priority: 'فوري' | 'عاجل' | 'عادي';
    expectedOutcome: string;
    escalationPath: string;
}

export interface AIAnalysis {
    summary: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    urgencyScore: number;
    categoryPrediction: string;
    similarCasesCount: number;
    estimatedResolutionDays: number;
    recommendations: string[];
    riskFactors: string[];
    emirateRecommendations: EmirateRecommendation[];
    rootCauseAnalysis: string;
    suggestedMeeting: string | null;
}

export interface Complaint {
    id: string;
    title: string;
    description: string;
    source: string;
    serviceType: string;
    entity: string;
    sector: string;
    status: 'pending' | 'in-progress' | 'resolved' | 'escalated';
    priority: 'low' | 'medium' | 'high' | 'critical';
    timestamp: string;
    riskScore: number;
    sentiment: 'positive' | 'neutral' | 'negative';
    location: string;
    district: string;

    // Extended fields
    complainant: Complainant;
    targetEntity: string;
    targetPerson: string | null;
    originalMessage: string;
    attachments: string[];
    entityResponse: EntityResponse;
    aiAnalysis: AIAnalysis;
}
