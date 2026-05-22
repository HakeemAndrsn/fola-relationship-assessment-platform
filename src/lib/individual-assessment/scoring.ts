import type {
  IndividualFormData,
  IndividualReport,
  AttachmentStyle,
  ChangeReadiness,
  LoveLanguage,
  DimensionScore,
  IndividualClinicalFlag,
  IndividualTreatmentPhase,
  SliderAnswers,
} from "./types";

// ── Utility ──
function avg(q: SliderAnswers): number {
  const vals = Object.values(q);
  if (!vals.length) return 5;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

function toPercent(raw: number): number {
  return Math.round((raw / 10) * 100);
}

function riskFromScore(score: number): "strength" | "growth" | "critical" {
  if (score >= 70) return "strength";
  if (score >= 45) return "growth";
  return "critical";
}

function percentile(score: number): number {
  // Rough population distribution estimate
  if (score >= 85) return 92;
  if (score >= 75) return 78;
  if (score >= 65) return 62;
  if (score >= 55) return 48;
  if (score >= 45) return 34;
  if (score >= 35) return 22;
  return 12;
}

// ── Attachment score ──
function attachmentScore(style: AttachmentStyle): number {
  const map: Record<AttachmentStyle, number> = {
    secure: 88,
    anxious: 52,
    avoidant: 48,
    disorganized: 28,
  };
  return map[style];
}

function attachmentInsight(style: AttachmentStyle): string {
  const map: Record<AttachmentStyle, string> = {
    secure: "You carry a strong neurological blueprint for safe intimacy — your early wiring is working for you.",
    anxious: "Your nervous system learned to monitor for disconnection; unlearning hypervigilance is your primary growth edge.",
    avoidant: "Self-reliance became your survival strategy; re-learning that need isn't weakness is your deepest work.",
    disorganized: "Your attachment system holds both the longing for and fear of closeness — trauma-informed support will be transformational.",
  };
  return map[style];
}

// ── Change readiness score ──
function readinessScore(r: ChangeReadiness): number {
  const map: Record<ChangeReadiness, number> = {
    precontemplation: 20,
    contemplation: 48,
    preparation: 72,
    action: 92,
  };
  return map[r];
}

function readinessInsight(r: ChangeReadiness): string {
  const map: Record<ChangeReadiness, string> = {
    precontemplation: "You're not yet ready for change — and that's honest. Self-awareness is step one.",
    contemplation: "You can see the case for growth even if commitment hasn't crystallised. That tension is productive.",
    preparation: "You're in the optimal window — resourced, motivated, and close to action. Move quickly.",
    action: "You're fully primed. Every tool and support you engage now will compound rapidly.",
  };
  return map[r];
}

// ── Love language insight ──
function loveLanguageInsight(l: LoveLanguage): string {
  const map: Record<LoveLanguage, string> = {
    words: "You thrive on verbal affirmation — spoken acknowledgement lights up your reward circuitry most reliably.",
    acts: "Demonstrated effort is your primary evidence of love — what people do matters more than what they say.",
    gifts: "Thoughtful gestures register as attunement — they signal 'I was thinking of you' which is deeply bonding for you.",
    time: "Undivided presence is your love signal — distracted co-presence doesn't land; full attention does.",
    touch: "Physical proximity and contact activate your oxytocin system most powerfully — it's neurological, not just preference.",
  };
  return map[l];
}

// ── Domain-specific clinical insights ──
function traumaInsight(score: number): string {
  if (score >= 70) return "Your trauma history shows relatively low relational interference — your nervous system is largely operating in the present.";
  if (score >= 45) return "Moderate trauma markers suggest past wounds are intermittently shaping your relational responses. Somatic work would create meaningful relief.";
  return "Significant trauma indicators suggest your nervous system is frequently borrowing reactivity from the past. Individual therapeutic support is recommended before intensive couples work.";
}

function emotionInsight(score: number): string {
  if (score >= 70) return "Strong emotional regulation capacity — you can access your prefrontal cortex under relational stress, which is rare and powerful.";
  if (score >= 45) return "Your regulation is functional but inconsistent. Building a deeper nervous system toolkit will compound your relational effectiveness.";
  return "Emotional dysregulation is significantly impacting your relational quality. Regulation work is the foundation everything else must be built on.";
}

function selfWorthInsight(score: number): string {
  if (score >= 70) return "Solid self-worth forms the floor of your relational life — you're unlikely to tolerate what you don't deserve.";
  if (score >= 45) return "Your self-worth is fragile in specific contexts. Identifying the conditional nature of it will be key work.";
  return "Low self-worth is silently shaping your relationship patterns — who you attract, what you tolerate, and how you show up. This is foundational work.";
}

function readinessInsightShort(score: number): string {
  if (score >= 70) return "You're emotionally available and positioned for real relational depth. Don't waste this window.";
  if (score >= 45) return "You have readiness in some dimensions but not others. Clarifying what's blocking full availability is important.";
  return "Significant readiness gaps suggest unfinished inner work that will limit relational depth until addressed.";
}

function communicationInsight(score: number): string {
  if (score >= 70) return "You communicate from a place of relative groundedness — you can express needs and hold conflict without significant dysregulation.";
  if (score >= 45) return "Your communication strengths are present but situationally inconsistent. Stress-proofing your communication is the next level.";
  return "Communication patterns are showing significant strain. The gap between what you mean and what lands is creating relational friction.";
}

function valuesInsight(score: number): string {
  if (score >= 70) return "Remarkable values clarity — you know who you are and what you're building. This is the compass that keeps you from drifting.";
  if (score >= 45) return "Your values are emerging but not yet fully crystallised. Deepening this clarity will make your relationship choices dramatically sharper.";
  return "Values confusion is costing you. Without a clear sense of who you are and what you want, you'll keep attracting the wrong fit.";
}

function neurodivergenceInsight(score: number): string {
  if (score >= 70) return "Neurodivergent traits, if present, appear well-managed and integrated. Your self-awareness here is an asset.";
  if (score >= 45) return "Some neurodivergent markers are intermittently affecting your relational functioning. Understanding these patterns reduces relational friction significantly.";
  return "Significant neurodivergent markers are present that may be creating misattunement in your relationships. An assessment with a specialist would be clarifying and freeing.";
}

// ── Main scoring function ──
export function generateIndividualReport(data: IndividualFormData): IndividualReport {
  const traumaRaw = avg(data.traumaHistory);
  const emotionRaw = avg(data.emotionalRegulation);
  const selfWorthRaw = avg(data.selfWorth);
  const readinessRaw = avg(data.relationshipReadiness);
  const commRaw = avg(data.communicationStyle);
  const valuesRaw = avg(data.valuesClarity);
  const neuroRaw = avg(data.neurodivergenceAwareness);

  // Trauma: high score = high trauma indicators (inverted for "health" percentage)
  const traumaScore = Math.round(100 - toPercent(traumaRaw));
  const emotionScore = toPercent(emotionRaw);
  const selfWorthScore = toPercent(selfWorthRaw);
  const attachScore = attachmentScore(data.attachmentStyle);
  const readinessScore2 = toPercent(readinessRaw);
  const commScore = toPercent(commRaw);
  const valuesScore = toPercent(valuesRaw);
  const neuroScore = toPercent(neuroRaw);
  const changeScore = readinessScore(data.changeReadiness);

  const dimensions: DimensionScore[] = [
    {
      dimension: "attachment",
      label: "Attachment Style",
      score: attachScore,
      percentile: percentile(attachScore),
      riskLevel: riskFromScore(attachScore),
      clinicalWeight: "critical",
      insight: attachmentInsight(data.attachmentStyle),
    },
    {
      dimension: "trauma",
      label: "Trauma History",
      score: traumaScore,
      percentile: percentile(traumaScore),
      riskLevel: riskFromScore(traumaScore),
      clinicalWeight: "critical",
      insight: traumaInsight(traumaScore),
    },
    {
      dimension: "emotional_regulation",
      label: "Emotional Regulation",
      score: emotionScore,
      percentile: percentile(emotionScore),
      riskLevel: riskFromScore(emotionScore),
      clinicalWeight: "high",
      insight: emotionInsight(emotionScore),
    },
    {
      dimension: "self_worth",
      label: "Self-Worth & Identity",
      score: selfWorthScore,
      percentile: percentile(selfWorthScore),
      riskLevel: riskFromScore(selfWorthScore),
      clinicalWeight: "high",
      insight: selfWorthInsight(selfWorthScore),
    },
    {
      dimension: "relationship_readiness",
      label: "Relationship Readiness",
      score: readinessScore2,
      percentile: percentile(readinessScore2),
      riskLevel: riskFromScore(readinessScore2),
      clinicalWeight: "high",
      insight: readinessInsightShort(readinessScore2),
    },
    {
      dimension: "communication",
      label: "Communication Style",
      score: commScore,
      percentile: percentile(commScore),
      riskLevel: riskFromScore(commScore),
      clinicalWeight: "medium",
      insight: communicationInsight(commScore),
    },
    {
      dimension: "values_clarity",
      label: "Values & Life Vision",
      score: valuesScore,
      percentile: percentile(valuesScore),
      riskLevel: riskFromScore(valuesScore),
      clinicalWeight: "critical",
      insight: valuesInsight(valuesScore),
    },
    {
      dimension: "neurodivergence",
      label: "Neurodivergence Awareness",
      score: neuroScore,
      percentile: percentile(neuroScore),
      riskLevel: riskFromScore(neuroScore),
      clinicalWeight: "medium",
      insight: neurodivergenceInsight(neuroScore),
    },
    {
      dimension: "change_readiness",
      label: "Change Readiness",
      score: changeScore,
      percentile: percentile(changeScore),
      riskLevel: riskFromScore(changeScore),
      clinicalWeight: "high",
      insight: readinessInsight(data.changeReadiness),
    },
  ];

  // Weighted overall score
  const weights: Record<string, number> = {
    attachment: 0.18,
    trauma: 0.17,
    emotional_regulation: 0.13,
    self_worth: 0.13,
    relationship_readiness: 0.11,
    communication: 0.09,
    values_clarity: 0.10,
    neurodivergence: 0.05,
    change_readiness: 0.04,
  };
  const overallScore = Math.round(
    dimensions.reduce((sum, d) => sum + d.score * (weights[d.dimension] ?? 0.1), 0)
  );

  const sorted = [...dimensions].sort((a, b) => b.score - a.score);
  const topStrength = sorted[0];
  const primaryGrowthEdge = sorted[sorted.length - 1];

  // Clinical flags
  const flags: IndividualClinicalFlag[] = [];
  if (traumaScore < 45) {
    flags.push({
      type: "trauma",
      severity: "high",
      message: "Trauma indicators are significantly elevated",
      recommendation: "Individual trauma-informed therapy (EMDR, somatic experiencing, or clinical hypnotherapy) is recommended before intensive relational work.",
    });
  }
  if (attachScore < 40) {
    flags.push({
      type: "attachment",
      severity: "high",
      message: "Disorganized attachment patterns detected",
      recommendation: "Attachment-focused individual work with a qualified practitioner will prevent these patterns from sabotaging future relationships.",
    });
  }
  if (selfWorthScore < 45) {
    flags.push({
      type: "self_worth",
      severity: "medium",
      message: "Self-worth deficits may be driving relational patterns",
      recommendation: "NLP timeline work and hypnotherapy targeting core self-worth beliefs will create rapid structural change.",
    });
  }
  if (emotionScore < 45) {
    flags.push({
      type: "emotional_regulation",
      severity: "high",
      message: "Emotional regulation capacity is limiting relational quality",
      recommendation: "Somatic regulation skills and nervous system education should be prioritised immediately.",
    });
  }
  if (neuroScore < 45) {
    flags.push({
      type: "neurodivergence",
      severity: "medium",
      message: "Neurodivergent markers are present and may be creating unseen relational friction",
      recommendation: "A formal assessment and psychoeducation around ADHD/neurodivergence could be profoundly clarifying.",
    });
  }

  // Dynamic pricing
  const flagCount = flags.filter((f) => f.severity === "high").length;
  const basePrice = 600;
  const finalPrice = flagCount >= 3 ? 950 : flagCount >= 1 ? 750 : 600;
  const breakdown =
    flagCount >= 3
      ? "Trauma mapping + Attachment rewiring + Emotion regulation pathway = R950"
      : flagCount >= 1
      ? "Core assessment + Priority clinical pathway = R750"
      : "Standard Individual Growth Assessment = R600";

  // Treatment plan
  const treatmentPlan: IndividualTreatmentPhase[] = [
    {
      phase: 1,
      title: "Foundation & Stabilisation",
      weeks: "Weeks 1–3",
      focus: "Nervous system regulation, trauma processing, and core self-worth installation",
      sessions: [
        ...(traumaScore < 50
          ? [{ description: "Breakthrough Trauma Session", target: "Subconscious trauma processing & nervous system reset", price: 1800 }]
          : []),
        { description: "Individual Peak Performance Session", target: `${primaryGrowthEdge.label} — foundational work`, price: 1500 },
        { description: "Hypnotherapy: Self-Worth Installation", target: "Subconscious self-worth reprogramming via NLP", price: 1800 },
      ],
    },
    {
      phase: 2,
      title: "Relational Architecture",
      weeks: "Weeks 4–7",
      focus: "Communication mastery, values clarification, and relationship readiness",
      sessions: [
        { description: "Communication Pattern Rewiring", target: "Assertion, listening, repair — all three pillars", price: 1500 },
        { description: "Values & Vision Clarity Session", target: "Crystallising non-negotiables and relationship vision", price: 1500 },
        ...(attachScore < 60
          ? [{ description: "Attachment Rewiring Session", target: "Earned secure attachment — NLP timeline work", price: 1800 }]
          : []),
      ],
    },
    {
      phase: 3,
      title: "Maintenance & Expansion",
      weeks: "Ongoing",
      focus: "Sustaining growth, integration check-ins, and future relationship design",
      sessions: [
        { description: "Monthly Integration Check-in", target: "Progress audit, recalibration, and next chapter planning", price: 900 },
        { description: "6-Month Growth Reassessment", target: "Repeat Individual Assessment to measure transformation", price: 600 },
      ],
    },
  ];

  const totalInvestment = treatmentPlan
    .flatMap((p) => p.sessions)
    .reduce((s, sess) => s + sess.price, 0);

  const id = `IGA-${Date.now().toString(36).toUpperCase()}`;
  const date = new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" });

  return {
    id,
    date,
    name: data.onboarding.name,
    overallScore,
    dimensionScores: dimensions,
    topStrength,
    primaryGrowthEdge,
    clinicalFlags: flags,
    treatmentPlan,
    totalInvestment,
    dynamicPrice: finalPrice,
    priceBreakdown: breakdown,
    loveLanguage: data.loveLanguage,
    attachmentStyle: data.attachmentStyle,
    changeReadiness: data.changeReadiness,
  };
}
