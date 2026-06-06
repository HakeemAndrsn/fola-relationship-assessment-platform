// ── FOLA Individual Growth Assessment Types ──

export type AttachmentStyle = "secure" | "anxious" | "avoidant" | "disorganized";
export type ChangeReadiness = "precontemplation" | "contemplation" | "preparation" | "action";
export type LoveLanguage = "words" | "acts" | "gifts" | "time" | "touch";

export interface IndividualOnboarding {
  name: string;
  age: string;
  relationshipStatus: "single" | "dating" | "committed" | "in_relationship" | "married" | "separated" | "divorced";
  primaryGoal: string;
  consentGiven: boolean;
}

export interface SliderAnswers {
  [questionId: string]: number; // 0–10
}

export interface IndividualFormData {
  onboarding: IndividualOnboarding;
  attachmentStyle: AttachmentStyle;
  traumaHistory: SliderAnswers;
  emotionalRegulation: SliderAnswers;
  selfWorth: SliderAnswers;
  loveLanguage: LoveLanguage;
  relationshipReadiness: SliderAnswers;
  communicationStyle: SliderAnswers;
  valuesClarity: SliderAnswers;
  neurodivergenceAwareness: SliderAnswers;
  prejudicesBiases: SliderAnswers;
  changeReadiness: ChangeReadiness;
}

// ── Dimension Score ──
export interface DimensionScore {
  dimension: string;
  label: string;
  score: number;          // 0–100
  percentile: number;     // contextual percentile
  riskLevel: "strength" | "growth" | "critical";
  clinicalWeight: "critical" | "high" | "medium";
  insight: string;        // one-sentence clinical insight
}

export interface IndividualClinicalFlag {
  type: string;
  severity: "high" | "medium" | "low";
  message: string;
  recommendation: string;
}

export interface IndividualTreatmentPhase {
  phase: number;
  title: string;
  weeks: string;
  focus: string;
  sessions: {
    description: string;
    target: string;
    price: number;
  }[];
}

export interface IndividualReport {
  id: string;
  date: string;
  name: string;
  overallScore: number;
  dimensionScores: DimensionScore[];
  topStrength: DimensionScore;
  primaryGrowthEdge: DimensionScore;
  clinicalFlags: IndividualClinicalFlag[];
  treatmentPlan: IndividualTreatmentPhase[];
  totalInvestment: number;
  dynamicPrice: number;
  priceBreakdown: string;
  loveLanguage: LoveLanguage;
  attachmentStyle: AttachmentStyle;
  changeReadiness: ChangeReadiness;
}
