// ── FOLA Relational Assessment Types ──

export type AttachmentStyle = "secure" | "anxious" | "avoidant" | "disorganized";

export type ChangeReadiness =
  | "precontemplation"
  | "contemplation"
  | "preparation"
  | "action";

export interface OnboardingData {
  partnerAName: string;
  partnerBName: string;
  relationshipDuration: string;
  primaryConcern: string;
  consentGiven: boolean;
}

export interface AttachmentData {
  partnerA: AttachmentStyle;
  partnerB: AttachmentStyle;
}

export interface SliderQuestions {
  [questionId: string]: number; // 0-10
}

export interface TraumaData {
  partnerA: SliderQuestions;
  partnerB: SliderQuestions;
}

export interface ADHDData {
  partnerA: SliderQuestions;
  partnerB: SliderQuestions;
}

export interface ValuesData {
  partnerA: SliderQuestions;
  partnerB: SliderQuestions;
}

export interface ChangeReadinessData {
  partnerA: ChangeReadiness;
  partnerB: ChangeReadiness;
}

export interface CommunicationData {
  partnerA: SliderQuestions;
  partnerB: SliderQuestions;
}

export interface FutureVisionData {
  partnerA: SliderQuestions;
  partnerB: SliderQuestions;
}

export interface PrejudicesData {
  partnerA: SliderQuestions;
  partnerB: SliderQuestions;
}

export interface AssessmentFormData {
  onboarding: OnboardingData;
  attachment: AttachmentData;
  trauma: TraumaData;
  adhd: ADHDData;
  values: ValuesData;
  changeReadiness: ChangeReadinessData;
  communication: CommunicationData;
  futureVision: FutureVisionData;
  prejudices: PrejudicesData;
}

export interface DomainScore {
  domain: string;
  label: string;
  partnerAScore: number;
  partnerBScore: number;
  alignmentPercent: number;
  gap: number;
  riskLevel: "low" | "medium" | "high";
  clinicalWeight: "critical" | "high" | "medium";
}

export interface ClinicalFlag {
  type: "trauma" | "adhd" | "values" | "readiness" | "prejudices";
  severity: "high" | "medium" | "low";
  message: string;
  recommendation: string;
}

export interface TreatmentPhase {
  phase: number;
  title: string;
  weeks: string;
  sessions: {
    description: string;
    target: string;
    price: number;
    why?: string;
  }[];
}

export interface AssessmentReport {
  id: string;
  date: string;
  couple: { partnerA: string; partnerB: string };
  overallScore: number;
  domainScores: DomainScore[];
  primaryStrength: DomainScore;
  criticalFracture: DomainScore;
  clinicalFlags: ClinicalFlag[];
  treatmentPlan: TreatmentPhase[];
  totalInvestment: number;
  dynamicPrice: number;
  priceBreakdown: string;
}
