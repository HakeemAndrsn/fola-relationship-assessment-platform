import type {
  AssessmentFormData,
  AssessmentReport,
  AttachmentStyle,
  ChangeReadiness,
  ClinicalFlag,
  DomainScore,
  SliderQuestions,
  TreatmentPhase,
} from "./types";

// ── Attachment compatibility matrix ──
const ATTACHMENT_COMPAT: Record<string, number> = {
  "secure-secure": 95,
  "secure-anxious": 70,
  "secure-avoidant": 65,
  "secure-disorganized": 50,
  "anxious-anxious": 55,
  "anxious-avoidant": 30,
  "anxious-disorganized": 25,
  "avoidant-avoidant": 45,
  "avoidant-disorganized": 30,
  "disorganized-disorganized": 20,
};

function attachmentAlignment(a: AttachmentStyle, b: AttachmentStyle): number {
  const key1 = `${a}-${b}`;
  const key2 = `${b}-${a}`;
  return ATTACHMENT_COMPAT[key1] ?? ATTACHMENT_COMPAT[key2] ?? 50;
}

function attachmentNumeric(style: AttachmentStyle): number {
  const map: Record<AttachmentStyle, number> = {
    secure: 9,
    anxious: 5,
    avoidant: 4,
    disorganized: 2,
  };
  return map[style];
}

// ── Change readiness compatibility ──
const READINESS_MAP: Record<ChangeReadiness, number> = {
  precontemplation: 2,
  contemplation: 5,
  preparation: 7,
  action: 9,
};

function readinessAlignment(a: ChangeReadiness, b: ChangeReadiness): number {
  const aVal = READINESS_MAP[a];
  const bVal = READINESS_MAP[b];
  const gap = Math.abs(aVal - bVal);
  return Math.max(0, 100 - gap * 14);
}

// ── Slider-based domain scoring ──
function averageSliders(q: SliderQuestions): number {
  const values = Object.values(q);
  if (values.length === 0) return 5;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function sliderAlignment(aQuestions: SliderQuestions, bQuestions: SliderQuestions): number {
  const keys = [...new Set([...Object.keys(aQuestions), ...Object.keys(bQuestions)])];
  if (keys.length === 0) return 50;
  let totalAlignment = 0;
  for (const key of keys) {
    const aVal = aQuestions[key] ?? 5;
    const bVal = bQuestions[key] ?? 5;
    const gap = Math.abs(aVal - bVal);
    totalAlignment += Math.max(0, 100 - gap * 10);
  }
  return Math.round(totalAlignment / keys.length);
}

function riskFromAlignment(pct: number): "low" | "medium" | "high" {
  if (pct >= 80) return "low";
  if (pct >= 60) return "medium";
  return "high";
}

// ── Domain weights for overall score ──
const DOMAIN_WEIGHTS: Record<string, number> = {
  attachment: 0.2,
  trauma: 0.2,
  adhd: 0.15,
  values: 0.2,
  changeReadiness: 0.1,
  communication: 0.1,
  futureVision: 0.05,
  prejudices: 0.1,
};

// ── Main scoring function ──
export function calculateScores(data: AssessmentFormData): DomainScore[] {
  const scores: DomainScore[] = [];

  // Attachment
  const attachAlign = attachmentAlignment(data.attachment.partnerA, data.attachment.partnerB);
  scores.push({
    domain: "attachment",
    label: "Attachment Style",
    partnerAScore: attachmentNumeric(data.attachment.partnerA),
    partnerBScore: attachmentNumeric(data.attachment.partnerB),
    alignmentPercent: attachAlign,
    gap: Math.abs(attachmentNumeric(data.attachment.partnerA) - attachmentNumeric(data.attachment.partnerB)),
    riskLevel: riskFromAlignment(attachAlign),
    clinicalWeight: "high",
  });

  // Trauma
  const traumaAvgA = averageSliders(data.trauma.partnerA);
  const traumaAvgB = averageSliders(data.trauma.partnerB);
  const traumaAlign = sliderAlignment(data.trauma.partnerA, data.trauma.partnerB);
  scores.push({
    domain: "trauma",
    label: "Trauma Inventory",
    partnerAScore: Math.round(traumaAvgA * 10) / 10,
    partnerBScore: Math.round(traumaAvgB * 10) / 10,
    alignmentPercent: traumaAlign,
    gap: Math.round(Math.abs(traumaAvgA - traumaAvgB) * 10) / 10,
    riskLevel: riskFromAlignment(traumaAlign),
    clinicalWeight: "critical",
  });

  // ADHD
  const adhdAvgA = averageSliders(data.adhd.partnerA);
  const adhdAvgB = averageSliders(data.adhd.partnerB);
  const adhdAlign = sliderAlignment(data.adhd.partnerA, data.adhd.partnerB);
  scores.push({
    domain: "adhd",
    label: "Neurodivergence (ADHD)",
    partnerAScore: Math.round(adhdAvgA * 10) / 10,
    partnerBScore: Math.round(adhdAvgB * 10) / 10,
    alignmentPercent: adhdAlign,
    gap: Math.round(Math.abs(adhdAvgA - adhdAvgB) * 10) / 10,
    riskLevel: riskFromAlignment(adhdAlign),
    clinicalWeight: "high",
  });

  // Values
  const valuesAlign = sliderAlignment(data.values.partnerA, data.values.partnerB);
  scores.push({
    domain: "values",
    label: "Values Alignment",
    partnerAScore: Math.round(averageSliders(data.values.partnerA) * 10) / 10,
    partnerBScore: Math.round(averageSliders(data.values.partnerB) * 10) / 10,
    alignmentPercent: valuesAlign,
    gap: Math.round(Math.abs(averageSliders(data.values.partnerA) - averageSliders(data.values.partnerB)) * 10) / 10,
    riskLevel: riskFromAlignment(valuesAlign),
    clinicalWeight: "critical",
  });

  // Change Readiness
  const readAlign = readinessAlignment(data.changeReadiness.partnerA, data.changeReadiness.partnerB);
  scores.push({
    domain: "changeReadiness",
    label: "Change Readiness",
    partnerAScore: READINESS_MAP[data.changeReadiness.partnerA],
    partnerBScore: READINESS_MAP[data.changeReadiness.partnerB],
    alignmentPercent: readAlign,
    gap: Math.abs(READINESS_MAP[data.changeReadiness.partnerA] - READINESS_MAP[data.changeReadiness.partnerB]),
    riskLevel: riskFromAlignment(readAlign),
    clinicalWeight: "high",
  });

  // Communication
  const commAlign = sliderAlignment(data.communication.partnerA, data.communication.partnerB);
  scores.push({
    domain: "communication",
    label: "Communication Patterns",
    partnerAScore: Math.round(averageSliders(data.communication.partnerA) * 10) / 10,
    partnerBScore: Math.round(averageSliders(data.communication.partnerB) * 10) / 10,
    alignmentPercent: commAlign,
    gap: Math.round(Math.abs(averageSliders(data.communication.partnerA) - averageSliders(data.communication.partnerB)) * 10) / 10,
    riskLevel: riskFromAlignment(commAlign),
    clinicalWeight: "medium",
  });

  // Future Vision
  const futureAlign = sliderAlignment(data.futureVision.partnerA, data.futureVision.partnerB);
  scores.push({
    domain: "futureVision",
    label: "Future Vision",
    partnerAScore: Math.round(averageSliders(data.futureVision.partnerA) * 10) / 10,
    partnerBScore: Math.round(averageSliders(data.futureVision.partnerB) * 10) / 10,
    alignmentPercent: futureAlign,
    gap: Math.round(Math.abs(averageSliders(data.futureVision.partnerA) - averageSliders(data.futureVision.partnerB)) * 10) / 10,
    riskLevel: riskFromAlignment(futureAlign),
    clinicalWeight: "medium",
  });

  // Prejudices & Biases
  const prejudicesAlign = sliderAlignment(data.prejudices.partnerA, data.prejudices.partnerB);
  scores.push({
    domain: "prejudices",
    label: "Prejudices & Biases",
    partnerAScore: Math.round(averageSliders(data.prejudices.partnerA) * 10) / 10,
    partnerBScore: Math.round(averageSliders(data.prejudices.partnerB) * 10) / 10,
    alignmentPercent: prejudicesAlign,
    gap: Math.round(Math.abs(averageSliders(data.prejudices.partnerA) - averageSliders(data.prejudices.partnerB)) * 10) / 10,
    riskLevel: riskFromAlignment(prejudicesAlign),
    clinicalWeight: "medium",
  });

  return scores;
}

export function calculateOverallScore(scores: DomainScore[]): number {
  let weighted = 0;
  let totalWeight = 0;
  for (const s of scores) {
    const w = DOMAIN_WEIGHTS[s.domain] ?? 0.1;
    weighted += s.alignmentPercent * w;
    totalWeight += w;
  }
  return Math.round(weighted / totalWeight);
}

export function identifyClinicalFlags(data: AssessmentFormData, scores: DomainScore[]): ClinicalFlag[] {
  const flags: ClinicalFlag[] = [];

  // Trauma flags
  const traumaA = averageSliders(data.trauma.partnerA);
  const traumaB = averageSliders(data.trauma.partnerB);
  if (traumaA > 7) {
    flags.push({
      type: "trauma",
      severity: "high",
      message: `${data.onboarding.partnerAName}'s trauma indicators are elevated (${traumaA.toFixed(1)}/10), suggesting unresolved trauma responses.`,
      recommendation: "Individual trauma processing sessions recommended before couples work.",
    });
  }
  if (traumaB > 7) {
    flags.push({
      type: "trauma",
      severity: "high",
      message: `${data.onboarding.partnerBName}'s trauma indicators are elevated (${traumaB.toFixed(1)}/10), suggesting unresolved trauma responses.`,
      recommendation: "Individual trauma processing sessions recommended before couples work.",
    });
  }

  // ADHD mismatch
  const adhdGap = Math.abs(averageSliders(data.adhd.partnerA) - averageSliders(data.adhd.partnerB));
  if (adhdGap > 4) {
    flags.push({
      type: "adhd",
      severity: "high",
      message: `Significant neurodivergence gap detected (${adhdGap.toFixed(1)} points). This mismatch often presents as one partner feeling neglected while the other feels criticized.`,
      recommendation: "ADHD-aware couples coaching recommended to build mutual understanding.",
    });
  }

  // Values alignment
  const valuesScore = scores.find((s) => s.domain === "values");
  if (valuesScore && valuesScore.alignmentPercent < 50) {
    flags.push({
      type: "values",
      severity: "high",
      message: `Core values alignment is critically low (${valuesScore.alignmentPercent}%). This indicates fundamental differences in life priorities.`,
      recommendation: "Deep values exploration work needed before behavioural interventions.",
    });
  }

  // Change readiness mismatch
  const readinessScore = scores.find((s) => s.domain === "changeReadiness");
  if (readinessScore && readinessScore.gap > 3) {
    flags.push({
      type: "readiness",
      severity: "medium",
      message: "Partners are at significantly different stages of readiness for change. This can create frustration and uneven effort in therapy.",
      recommendation: "Motivational interviewing may be needed to align readiness levels.",
    });
  }

  // Prejudices & Biases flag
  const prejudicesScore = scores.find((s) => s.domain === "prejudices");
  if (prejudicesScore && prejudicesScore.alignmentPercent < 50) {
    flags.push({
      type: "prejudices",
      severity: "medium",
      message: `Prejudices & Biases alignment is low (${prejudicesScore.alignmentPercent}%). Unchecked assumptions about each other may be creating invisible conflict patterns.`,
      recommendation: "The DoLoveBetter Cohort (R6,000 individual / R9,000 couple) is recommended as a starting point to surface and address these patterns.",
    });
  }

  return flags;
}

// ── Dynamic Pricing ──
export function calculateDynamicPrice(data: AssessmentFormData, flags: ClinicalFlag[]): { price: number; breakdown: string } {
  const base = 2500;
  let multiplier = 1.0;
  const components: string[] = ["Breakthrough Session (R2700)"];

  if (flags.some((f) => f.type === "trauma" && f.severity === "high")) {
    multiplier += 0.3;
    components.push("Trauma mapping (+R150)");
  }
  if (flags.some((f) => f.type === "adhd")) {
    multiplier += 0.2;
    components.push("ADHD screening (+R100)");
  }
  if (flags.some((f) => f.type === "values" && f.severity === "high")) {
    multiplier += 0.2;
    components.push("Values deep-dive (+R100)");
  }
  if (flags.length > 3) {
    multiplier += 0.2;
    components.push("Complex multi-domain analysis (+R100)");
  }

  const price = Math.min(3800, Math.max(2500, Math.round(base * multiplier)));
  const breakdown = `${components.join(" | ")} | Maintenance & Expansion = R2700 | Age Regression Therapy = R4000 each`;
  return { price, breakdown };
}

// ── Treatment plan generation ──
export function generateTreatmentPlan(
  data: AssessmentFormData,
  scores: DomainScore[],
  flags: ClinicalFlag[]
): TreatmentPhase[] {
  const phases: TreatmentPhase[] = [];
  const hasHighTrauma = flags.some((f) => f.type === "trauma" && f.severity === "high");
  const hasADHD = flags.some((f) => f.type === "adhd");

  // Phase 1: Individual Foundation
  const phase1Sessions: TreatmentPhase["sessions"] = [];
  if (hasHighTrauma) {
    const traumaA = averageSliders(data.trauma.partnerA);
    const traumaB = averageSliders(data.trauma.partnerB);
    if (traumaA > 7) {
      phase1Sessions.push({
        description: "Breakthrough Session: Trauma Processing",
        target: data.onboarding.partnerAName,
        price: 2700,
      });
    }
    if (traumaB > 7) {
      phase1Sessions.push({
        description: "Breakthrough Session: Trauma Processing",
        target: data.onboarding.partnerBName,
        price: 2700,
      });
    }
  }
  if (hasADHD) {
    phase1Sessions.push({
      description: "Neurodivergence Awareness & Coping Strategies",
      target: "Higher-scoring partner",
      price: 2700,
    });
  }
  if (phase1Sessions.length === 0) {
    phase1Sessions.push({
      description: "Individual Foundation Assessment",
      target: "Both Partners",
      price: 2700,
    });
  }
  phases.push({ phase: 1, title: "Individual Foundation", weeks: "Weeks 1-3", sessions: phase1Sessions });

  // Phase 2: Couples Integration
  const phase2Sessions: TreatmentPhase["sessions"] = [];
  const commScore = scores.find((s) => s.domain === "communication");
  if (commScore && commScore.alignmentPercent < 70) {
    phase2Sessions.push({
      description: "Communication Pattern Rewiring",
      target: "Couple",
      price: 2700,
    });
  }
  const attachScore = scores.find((s) => s.domain === "attachment");
  if (attachScore && attachScore.alignmentPercent < 70) {
    phase2Sessions.push({
      description: "Attachment Re-patterning Workshop",
      target: "Couple",
      price: 2700,
    });
  }
  const valuesScore = scores.find((s) => s.domain === "values");
  if (valuesScore && valuesScore.alignmentPercent < 60) {
    phase2Sessions.push({
      description: "Core Values Negotiation & Alignment",
      target: "Couple",
      price: 2700,
    });
  }
  if (phase2Sessions.length === 0) {
    phase2Sessions.push({
      description: "Couples Integration Session",
      target: "Couple",
      price: 2700,
    });
  }
  phases.push({ phase: 2, title: "Couples Integration", weeks: "Weeks 4-6", sessions: phase2Sessions });

  // Phase 3: Maintenance
  phases.push({
    phase: 3,
    title: "Maintenance & Growth",
    weeks: "Monthly ongoing",
    sessions: [
      { description: "Monthly Check-in Session", target: "Couple", price: 2700 },
      { description: "Quarterly Re-assessment", target: "Couple", price: 2700 },
    ],
  });

  return phases;
}

// ── Generate full report ──
export function generateReport(data: AssessmentFormData): AssessmentReport {
  const scores = calculateScores(data);
  const overallScore = calculateOverallScore(scores);
  const flags = identifyClinicalFlags(data, scores);
  const pricing = calculateDynamicPrice(data, flags);
  const plan = generateTreatmentPlan(data, scores, flags);

  const sorted = [...scores].sort((a, b) => b.alignmentPercent - a.alignmentPercent);
  const primaryStrength = sorted[0];
  const criticalFracture = sorted[sorted.length - 1];

  const totalInvestment = plan.reduce(
    (sum, phase) => sum + phase.sessions.reduce((s, sess) => s + sess.price, 0),
    0
  );

  const id = `FOLA-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  return {
    id,
    date: new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" }),
    couple: { partnerA: data.onboarding.partnerAName, partnerB: data.onboarding.partnerBName },
    overallScore,
    domainScores: scores,
    primaryStrength,
    criticalFracture,
    clinicalFlags: flags,
    treatmentPlan: plan,
    totalInvestment,
    dynamicPrice: pricing.price,
    priceBreakdown: pricing.breakdown,
  };
}
