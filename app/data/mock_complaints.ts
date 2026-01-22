import { Complaint, Complainant, EntityResponse, AIAnalysis } from "../types";

// Helper function to generate random date within range
const randomDate = (start: Date, end: Date): string => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString();
};

// Districts in Eastern Province
const districts = [
    "حي الشاطئ", "حي الفيصلية", "حي الروضة", "حي الخزامى", "حي النخيل",
    "حي العزيزية", "حي المريكبات", "حي الدواسر", "حي البديع", "حي الجلوية",
    "حي السلام", "حي الخالدية", "حي الواحة", "حي الزهور", "حي المنار",
    "حي النهضة", "حي الأندلس", "حي الضاحية", "حي الإسكان", "حي الربيعية",
    "حي الثقبة", "حي الحزام الأخضر", "حي العليا", "حي الجسر", "حي بدر",
    "حي الهفوف", "حي المبرز", "حي العيون", "حي المحمدية", "حي الجفر"
];

// Names for mock data
const arabicNames = [
    "محمد أحمد العلي", "فاطمة سعيد الدوسري", "عبدالله خالد الغامدي", "نورة محمد القحطاني",
    "سلطان عبدالرحمن الشمري", "سارة إبراهيم المالكي", "أحمد يوسف العتيبي", "منى فهد الحربي",
    "خالد سعود الزهراني", "هند عبدالله السبيعي", "فيصل ناصر المطيري", "ريم سالم العنزي"
];

// Complete sectors with all entities
const sectorData = [
    {
        sector: "الخدمات الصحية",
        entities: [
            "التجمع الصحي الأول بالمنطقة الشرقية",
            "تجمع الأحساء الصحي",
            "تجمع حفر الباطن الصحي",
            "هيئة الهلال الأحمر السعودي",
            "مستشفيات القطاعات العسكرية"
        ],
        types: ["تأخر في المواعيد", "نقص الأدوية", "سوء الخدمة الطبية", "طوارئ", "انتظار طويل", "إلغاء موعد", "خطأ طبي"]
    },
    {
        sector: "الخدمات التعليمية",
        entities: [
            "الإدارة العامة للتعليم بالمنطقة الشرقية",
            "إدارة التعليم بمحافظة الأحساء",
            "إدارة التعليم بمحافظة حفر الباطن",
            "جامعة الإمام عبد الرحمن بن فيصل",
            "جامعة الملك فهد للبترول والمعادن",
            "المؤسسة العامة للتدريب التقني والمهني"
        ],
        types: ["صيانة المدارس", "نقص المعلمين", "مشاكل النقل المدرسي", "التسجيل", "ازدحام الفصول", "تأخر النتائج", "مشاكل البوابة الإلكترونية"]
    },
    {
        sector: "الخدمات البلدية",
        entities: [
            "وكالة الخدمات",
            "وكالة التعمير والمشاريع",
            "الإدارة العامة للحدائق وعمارة البيئة",
            "أمانة محافظة الأحساء",
            "بلدية محافظة حفر الباطن"
        ],
        types: ["نظافة الشوارع", "إنارة الطرق", "صيانة الأرصفة", "القمامة", "الحدائق", "رخص البناء", "مخالفات البناء", "روائح كريهة"]
    },
    {
        sector: "خدمات الدفاع المدني",
        entities: [
            "إدارة الدفاع المدني بالدمام",
            "إدارة الدفاع المدني بالخبر",
            "إدارة الدفاع المدني بالأحساء",
            "إدارة السلامة الوقائية",
            "إدارة الحماية المدنية"
        ],
        types: ["حريق", "إنقاذ", "تسرب غاز", "انهيار مبنى", "تأخر الاستجابة", "ترخيص سلامة معطل"]
    },
    {
        sector: "الخدمات الأمنية",
        entities: [
            "شرطة المنطقة الشرقية",
            "القوات الخاصة لأمن الطرق",
            "إدارة الدوريات الأمنية",
            "مكافحة المخدرات بالمنطقة الشرقية",
            "المباحث العامة"
        ],
        types: ["سرقة", "مشاجرة", "إزعاج", "حوادث", "بلاغات أمنية", "تأخر في الحضور", "عدم متابعة البلاغ"]
    },
    {
        sector: "الخدمات المرورية",
        entities: [
            "مرور المنطقة الشرقية",
            "شعبة الرخص",
            "شعبة الحوادث",
            "شعبة السير",
            "الهيئة المرورية"
        ],
        types: ["ازدحام مروري", "إشارات معطلة", "حوادث", "مخالفات خاطئة", "رخص قيادة", "تأخر إصدار الرخص", "اعتراض على مخالفة"]
    },
    {
        sector: "خدمات المنافذ الحدودية",
        entities: [
            "جمارك جسر الملك فهد",
            "جمارك منفذ الخفجي",
            "جمارك منفذ البطحاء",
            "جمارك منفذ سلوى",
            "جمارك مطار الملك فهد الدولي",
            "جمارك ميناء الملك عبد العزيز"
        ],
        types: ["تأخير في الإجراءات", "ازدحام", "سوء معاملة", "فقدان شحنة", "رسوم زائدة", "انتظار طويل"]
    },
    {
        sector: "خدمات الطرق",
        entities: [
            "إدارة الصيانة والتشغيل",
            "إدارة المشاريع",
            "إدارة السلامة على الطرق",
            "المؤسسة العامة للجسور"
        ],
        types: ["حفر في الطرق", "إنارة معطلة", "سفلتة", "لوحات إرشادية", "حاجز مكسور", "تصدع الطريق", "فيضان نفق"]
    },
    {
        sector: "خدمات المياه",
        entities: [
            "إدارة خدمات العملاء",
            "إدارة التشغيل والصيانة",
            "إدارة الصرف الصحي",
            "المؤسسة العامة لتحلية المياه المالحة",
            "إدارة مشاريع المياه"
        ],
        types: ["انقطاع مياه", "تسريب", "ضعف الضغط", "فاتورة خاطئة", "صرف صحي", "رائحة كريهة", "تأخر التوصيل"]
    }
];

const sources = ["تويتر", "تطبيق راصد", "مركز الاتصال 940", "واتساب", "البريد الإلكتروني", "الزيارة الميدانية", "تطبيق كلنا أمن", "تطبيق بلدي", "أبشر"];

const priorities: Complaint['priority'][] = ['low', 'medium', 'high', 'critical'];
const statuses: Complaint['status'][] = ['pending', 'in-progress', 'resolved', 'escalated'];
const sentiments: Complaint['sentiment'][] = ['positive', 'neutral', 'negative'];

const aiRecommendations = [
    "تصعيد للإدارة العليا نظراً لتكرار الشكوى",
    "إرسال فريق ميداني للتحقق من الموقع",
    "التنسيق مع الجهة ذات العلاقة لتسريع الحل",
    "إغلاق الشكوى بعد التأكد من رضا المواطن",
    "طلب معلومات إضافية من الشاكي للتوضيح",
    "تحويل للجهة المختصة حسب الاختصاص",
    "متابعة دورية لمدة أسبوع للتأكد من الحل",
    "إجراء فوري مطلوب - حالة طوارئ"
];

const riskFactors = [
    "تكرار الشكوى أكثر من 3 مرات من نفس المواطن",
    "مدة الانتظار تجاوزت الحد المسموح (72 ساعة)",
    "شكوى من منطقة ذات كثافة سكانية عالية",
    "إشارة لمشكلة جماعية تؤثر على عدة مواطنين",
    "ذكر كلمات تدل على الإحباط الشديد أو التهديد",
    "تهديد بالتصعيد الإعلامي عبر وسائل التواصل",
    "مرتبطة بـ 10+ حالات مشابهة في نفس الفترة"
];

// Generate mock complainant
const generateComplainant = (district: string): Complainant => ({
    id: `CIT-${Math.floor(Math.random() * 100000)}`,
    name: arabicNames[Math.floor(Math.random() * arabicNames.length)],
    nationalId: `10${Math.floor(Math.random() * 100000000)}`,
    phone: `05${Math.floor(Math.random() * 100000000)}`,
    email: `citizen${Math.floor(Math.random() * 1000)}@email.com`,
    city: ["الدمام", "الخبر", "الظهران", "الأحساء", "حفر الباطن", "القطيف"][Math.floor(Math.random() * 6)],
    district
});

// Generate mock entity response
const generateEntityResponse = (status: Complaint['status']): EntityResponse => {
    if (status === 'pending') {
        return {
            respondedAt: null,
            responderName: null,
            responderPosition: null,
            responseText: null,
            decision: null,
            decisionReason: null
        };
    }

    const decisions: EntityResponse['decision'][] = ['accepted', 'rejected', 'pending', 'escalated'];
    const decision = decisions[Math.floor(Math.random() * decisions.length)];

    return {
        respondedAt: randomDate(new Date('2026-01-15'), new Date('2026-01-22')),
        responderName: arabicNames[Math.floor(Math.random() * arabicNames.length)],
        responderPosition: ["مدير القسم", "موظف خدمة العملاء", "مشرف العمليات", "مدير الفرع", "موظف الاستقبال"][Math.floor(Math.random() * 5)],
        responseText: decision === 'accepted'
            ? "تم استلام الشكوى وجاري العمل على حلها. نعتذر عن أي إزعاج تسببنا به ونؤكد متابعة الموضوع."
            : decision === 'rejected'
                ? "بعد المراجعة، تبين أن الشكوى خارج نطاق اختصاصنا. تم تحويلها للجهة المختصة."
                : "جاري دراسة الشكوى وسيتم الرد خلال 48 ساعة عمل.",
        decision,
        decisionReason: decision === 'rejected' ? "خارج الاختصاص" : decision === 'escalated' ? "يتطلب تدخل الإدارة العليا" : null
    };
};

// Generate AI Analysis with detailed Emirate recommendations
const generateAIAnalysis = (priority: Complaint['priority'], serviceType: string, entity: string, sector: string): AIAnalysis => {
    const urgencyMap = { 'critical': 95, 'high': 75, 'medium': 50, 'low': 25 };

    const emirateRecommendations: AIAnalysis['emirateRecommendations'] = [];

    if (priority === 'critical' || priority === 'high') {
        emirateRecommendations.push({
            action: `استدعاء مدير ${entity} لاجتماع عاجل مع سعادة وكيل الإمارة للشؤون التنموية`,
            targetEntity: entity,
            deadline: priority === 'critical' ? 'خلال 24 ساعة' : 'خلال 48 ساعة',
            priority: priority === 'critical' ? 'فوري' : 'عاجل',
            expectedOutcome: 'الحصول على التزام مكتوب بحل المشكلة وجدول زمني محدد',
            escalationPath: 'في حال عدم الاستجابة: رفع الأمر لسمو أمير المنطقة الشرقية'
        });

        emirateRecommendations.push({
            action: `تشكيل لجنة تحقيق مشتركة بين الإمارة و${entity} للوقوف على أسباب التقصير`,
            targetEntity: `الإمارة + ${entity}`,
            deadline: 'خلال 72 ساعة',
            priority: 'عاجل',
            expectedOutcome: 'تقرير مفصل عن أسباب المشكلة والمتسببين فيها',
            escalationPath: 'إحالة للجهات الرقابية (ديوان المظالم / نزاهة) في حال ثبوت الإهمال'
        });
    }

    if (priority === 'medium') {
        emirateRecommendations.push({
            action: `مخاطبة رسمية لـ ${entity} مع تحديد مهلة أسبوع للرد والحل`,
            targetEntity: entity,
            deadline: 'خلال أسبوع',
            priority: 'عادي',
            expectedOutcome: 'رد رسمي مع خطة عمل لمعالجة الشكوى',
            escalationPath: 'تصعيد لوكيل الإمارة في حال عدم الرد خلال المهلة'
        });
    }

    emirateRecommendations.push({
        action: `متابعة دورية مع المواطن للتأكد من رضاه عن الحل المقدم`,
        targetEntity: 'مكتب خدمة المواطنين بالإمارة',
        deadline: 'بعد إغلاق الشكوى بـ 7 أيام',
        priority: 'عادي',
        expectedOutcome: 'استبيان رضا المواطن ورصد أي ملاحظات إضافية',
        escalationPath: 'إعادة فتح الشكوى في حال عدم الرضا'
    });

    const rootCauseOptions = [
        `ضعف في الكوادر البشرية لدى ${entity}`,
        `قصور في آليات التواصل مع المواطنين في ${entity}`,
        `تأخر في اعتماد الميزانيات اللازمة للصيانة والتشغيل`,
        `عدم وجود نظام رقابة داخلي فعال لمتابعة الشكاوى`,
        `ازدياد الطلب على الخدمة بشكل يفوق الطاقة الاستيعابية`,
        `تقادم البنية التحتية وحاجتها للتحديث`
    ];

    return {
        summary: `تحليل آلي للشكوى المتعلقة بـ "${serviceType}" لدى ${entity}. تم رصد أنماط مشابهة في المنطقة تستدعي تدخل الإمارة.`,
        sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
        urgencyScore: urgencyMap[priority] + Math.floor(Math.random() * 10),
        categoryPrediction: serviceType,
        similarCasesCount: Math.floor(Math.random() * 50) + 1,
        estimatedResolutionDays: priority === 'critical' ? 1 : priority === 'high' ? 3 : priority === 'medium' ? 7 : 14,
        recommendations: aiRecommendations.slice(0, Math.floor(Math.random() * 3) + 2),
        riskFactors: priority === 'low' ? [] : riskFactors.slice(0, Math.floor(Math.random() * 3) + 1),
        emirateRecommendations,
        rootCauseAnalysis: rootCauseOptions[Math.floor(Math.random() * rootCauseOptions.length)],
        suggestedMeeting: priority === 'critical' ? `اجتماع طارئ مع مدير ${entity} - الأحد القادم الساعة 10 صباحاً بمقر الإمارة` : null
    };
};

// Generate 300+ diverse complaints covering all sectors
const generateComplaints = (): Complaint[] => {
    const complaints: Complaint[] = [];
    const startDate = new Date('2026-01-01');
    const endDate = new Date('2026-01-22');

    // Specific high-profile complaints
    const specificComplaints: Complaint[] = [
        {
            id: "C-1001",
            title: "انقطاع المياه المستمر منذ 5 أيام",
            description: "نعاني من انقطاع المياه المتكرر دون رد من خدمة العملاء أو تقديم حلول بديلة",
            source: "تويتر",
            serviceType: "انقطاع مياه",
            entity: "إدارة التشغيل والصيانة",
            sector: "خدمات المياه",
            status: "escalated",
            priority: "critical",
            timestamp: "2026-01-20T10:30:00Z",
            riskScore: 95,
            sentiment: "negative",
            location: "حي الشاطئ",
            district: "حي الشاطئ",
            complainant: {
                id: "CIT-12345",
                name: "محمد أحمد العلي",
                nationalId: "1098765432",
                phone: "0551234567",
                email: "mohammed@email.com",
                city: "الدمام",
                district: "حي الشاطئ"
            },
            targetEntity: "شركة المياه الوطنية - إدارة التشغيل والصيانة",
            targetPerson: null,
            originalMessage: "السلام عليكم، نعاني من انقطاع المياه في حي الشاطئ منذ 5 أيام متواصلة. اتصلت على الرقم الموحد أكثر من 10 مرات ولا يوجد أي رد. الوضع لا يحتمل خاصة مع وجود أطفال وكبار سن. نرجو التدخل العاجل.",
            attachments: ["صورة العداد", "صورة الحي"],
            entityResponse: {
                respondedAt: "2026-01-21T14:00:00Z",
                responderName: "سعيد القحطاني",
                responderPosition: "مدير خدمة العملاء",
                responseText: "نعتذر عن الإزعاج. تم إرسال فريق فني للموقع وجاري العمل على إصلاح العطل.",
                decision: "accepted",
                decisionReason: null
            },
            aiAnalysis: {
                summary: "شكوى عاجلة متعلقة بانقطاع المياه. تم رصد 23 شكوى مشابهة من نفس الحي خلال الأسبوع الماضي مما يشير لمشكلة في الشبكة الرئيسية.",
                sentiment: "negative",
                urgencyScore: 95,
                categoryPrediction: "انقطاع مياه - شبكة رئيسية",
                similarCasesCount: 23,
                estimatedResolutionDays: 1,
                recommendations: [
                    "إرسال فريق طوارئ فوري للموقع",
                    "توفير صهاريج مياه للمتضررين",
                    "التواصل مع جميع المتضررين في الحي",
                    "فتح تحقيق في سبب التأخير"
                ],
                riskFactors: [
                    "تكرار الشكوى أكثر من 3 مرات من نفس المواطن",
                    "مرتبطة بـ 10+ حالات مشابهة في نفس الفترة",
                    "تهديد بالتصعيد الإعلامي عبر وسائل التواصل"
                ],
                emirateRecommendations: [
                    {
                        action: "استدعاء مدير شركة المياه الوطنية - إدارة التشغيل والصيانة لاجتماع طارئ مع سعادة وكيل الإمارة للشؤون التنموية",
                        targetEntity: "شركة المياه الوطنية - إدارة التشغيل والصيانة",
                        deadline: "خلال 12 ساعة",
                        priority: "فوري",
                        expectedOutcome: "التزام مكتوب بإعادة المياه خلال 24 ساعة مع خطة طوارئ",
                        escalationPath: "رفع تقرير عاجل لسمو أمير المنطقة الشرقية"
                    },
                    {
                        action: "تكليف مكتب خدمة المواطنين بالتواصل المباشر مع جميع المتضررين في حي الشاطئ (23 أسرة)",
                        targetEntity: "مكتب خدمة المواطنين بالإمارة",
                        deadline: "فوراً",
                        priority: "فوري",
                        expectedOutcome: "حصر دقيق للمتضررين وتوثيق أضرارهم",
                        escalationPath: "تقديم تعويضات في حال ثبوت أضرار مادية"
                    },
                    {
                        action: "تشكيل لجنة تحقيق برئاسة ممثل الإمارة للتحقيق في أسباب تأخر الاستجابة 5 أيام",
                        targetEntity: "الإمارة + شركة المياه + الأمانة",
                        deadline: "خلال 48 ساعة",
                        priority: "عاجل",
                        expectedOutcome: "تقرير مفصل عن أسباب الخلل والمسؤولين عنه",
                        escalationPath: "إحالة للجهات الرقابية (ديوان المظالم / نزاهة)"
                    },
                    {
                        action: "توجيه بتوفير صهاريج مياه مجانية للحي المتضرر على حساب الجهة المقصرة",
                        targetEntity: "شركة المياه الوطنية",
                        deadline: "خلال 6 ساعات",
                        priority: "فوري",
                        expectedOutcome: "وصول صهاريج المياه لكل الأسر المتضررة",
                        escalationPath: "تحميل التكاليف للجهة في حال التأخير"
                    }
                ],
                rootCauseAnalysis: "قصور في منظومة الطوارئ لدى شركة المياه الوطنية، وغياب آلية تصعيد فعالة للحالات الحرجة",
                suggestedMeeting: "اجتماع طارئ مع مدير عام شركة المياه الوطنية - اليوم الساعة 4 مساءً بمقر الإمارة"
            }
        }
    ];

    complaints.push(...specificComplaints);

    // Generate complaints for ALL sectors and entities
    let complaintId = 2000;

    for (const sectorInfo of sectorData) {
        // Generate 30-40 complaints per sector
        const complaintsPerSector = 30 + Math.floor(Math.random() * 10);

        for (let i = 0; i < complaintsPerSector; i++) {
            const district = districts[Math.floor(Math.random() * districts.length)];
            const serviceType = sectorInfo.types[Math.floor(Math.random() * sectorInfo.types.length)];
            const entity = sectorInfo.entities[Math.floor(Math.random() * sectorInfo.entities.length)];
            const priority = priorities[Math.floor(Math.random() * priorities.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];

            let baseRisk = priority === 'critical' ? 80 : priority === 'high' ? 60 : priority === 'medium' ? 40 : 20;
            const riskScore = Math.min(100, baseRisk + Math.floor(Math.random() * 20));

            complaints.push({
                id: `C-${complaintId++}`,
                title: `${serviceType} في ${district}`,
                description: `بلاغ متعلق بـ ${serviceType} تم رصده في ${district}. يحتاج إلى متابعة من ${entity}.`,
                source: sources[Math.floor(Math.random() * sources.length)],
                serviceType,
                entity,
                sector: sectorInfo.sector,
                status,
                priority,
                timestamp: randomDate(startDate, endDate),
                riskScore,
                sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
                location: district,
                district,
                complainant: generateComplainant(district),
                targetEntity: entity,
                targetPerson: Math.random() > 0.8 ? arabicNames[Math.floor(Math.random() * arabicNames.length)] : null,
                originalMessage: `أود التقدم بشكوى بخصوص ${serviceType} في منطقة ${district}. المشكلة مستمرة منذ فترة وتحتاج لمتابعة عاجلة من ${entity}.`,
                attachments: Math.random() > 0.6 ? ["مرفق 1", "مرفق 2"] : [],
                entityResponse: generateEntityResponse(status),
                aiAnalysis: generateAIAnalysis(priority, serviceType, entity, sectorInfo.sector)
            });
        }
    }

    return complaints.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const mockComplaints = generateComplaints();

// Helper function to find complaint by ID
export const findComplaintById = (id: string): Complaint | undefined => {
    return mockComplaints.find(c => c.id === id);
};

// Helper function to get complaints by sector
export const getComplaintsBySector = (sector: string): Complaint[] => {
    return mockComplaints.filter(c => c.sector === sector);
};

// Helper function to get complaints by entity
export const getComplaintsByEntity = (entity: string): Complaint[] => {
    return mockComplaints.filter(c => c.entity === entity);
};
