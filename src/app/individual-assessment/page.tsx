"use client";

import { useState, useCallback, useEffect } from "react";
import YocoButton from "@/components/YocoButton";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { generateIndividualReport } from "@/lib/individual-assessment/scoring";
import {
  ATTACHMENT_OPTIONS,
  LOVE_LANGUAGE_OPTIONS,
  CHANGE_READINESS_OPTIONS,
  TRAUMA_QUESTIONS,
  EMOTIONAL_REGULATION_QUESTIONS,
  SELF_WORTH_QUESTIONS,
  RELATIONSHIP_READINESS_QUESTIONS,
  COMMUNICATION_QUESTIONS,
  VALUES_CLARITY_QUESTIONS,
  NEURODIVERGENCE_QUESTIONS,
} from "@/lib/individual-assessment/questions";
import type {
  IndividualFormData,
  AttachmentStyle,
  ChangeReadiness,
  LoveLanguage,
  SliderAnswers,
} from "@/lib/individual-assessment/types";

const STEPS = [
  "About You",
  "Attachment Style",
  "Trauma History",
  "Emotional Regulation",
  "Self-Worth & Identity",
  "Love Language",
  "Relationship Readiness",
  "Communication Style",
  "Values & Vision",
  "Neurodivergence",
  "Change Readiness",
  "Review",
];

const STEP_ICONS = ["✦", "♡", "◈", "◎", "◇", "♦", "◉", "◐", "▲", "◫", "◆", "✓"];

function initSliders(qs: { id: string }[]): SliderAnswers {
  const o: SliderAnswers = {};
  for (const q of qs) o[q.id] = 5;
  return o;
}

const DEFAULT: IndividualFormData = {
  onboarding: { name: "", age: "", relationshipStatus: "single", primaryGoal: "", consentGiven: false },
  attachmentStyle: "secure",
  traumaHistory: initSliders(TRAUMA_QUESTIONS),
  emotionalRegulation: initSliders(EMOTIONAL_REGULATION_QUESTIONS),
  selfWorth: initSliders(SELF_WORTH_QUESTIONS),
  loveLanguage: "words",
  relationshipReadiness: initSliders(RELATIONSHIP_READINESS_QUESTIONS),
  communicationStyle: initSliders(COMMUNICATION_QUESTIONS),
  valuesClarity: initSliders(VALUES_CLARITY_QUESTIONS),
  neurodivergenceAwareness: initSliders(NEURODIVERGENCE_QUESTIONS),
  changeReadiness: "contemplation",
};

// ── Reusable slider section ──
function SliderSection({
  title, description, questions, values, onChange, accentColor = "#B8654A",
}: {
  title: string;
  description: string;
  questions: { id: string; label: string; description?: string }[];
  values: SliderAnswers;
  onChange: (id: string, val: number) => void;
  accentColor?: string;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-serif leading-tight">{title}</h2>
        <p className="mt-3 text-card-foreground/80 text-sm max-w-xl mx-auto font-sans leading-relaxed">{description}</p>
      </div>
      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="rounded-2xl border border-border bg-card p-5 hover:border-[#B8654A]/20 transition-all">
            <div className="flex items-start justify-between mb-1">
              <div className="flex-1 pr-4">
                <p className="text-sm font-semibold text-foreground font-sans">{q.label}</p>
                {q.description && <p className="text-xs text-card-foreground/60 mt-1 leading-relaxed font-sans">{q.description}</p>}
              </div>
              <div className="shrink-0 text-right">
                <span className="text-2xl font-bold font-serif" style={{ color: accentColor }}>{values[q.id]}</span>
                <span className="text-xs text-card-foreground/60 font-sans">/10</span>
              </div>
            </div>
            <div className="mt-4 px-1">
              <Slider
                min={0} max={10} step={1}
                value={[values[q.id]]}
                onValueChange={([v]) => onChange(q.id, v)}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-card-foreground/75 font-sans">Not at all</span>
                <span className="text-[10px] text-card-foreground/75 font-sans">Completely</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Card selector ──
function CardSelector<T extends string>({
  title, description, options, value, onChange,
}: {
  title: string;
  description: string;
  options: { value: T; label: string; description: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-serif leading-tight">{title}</h2>
        <p className="mt-3 text-card-foreground/80 text-sm max-w-xl mx-auto font-sans leading-relaxed">{description}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`text-left p-5 rounded-2xl border transition-all duration-200 ${
              value === opt.value
                ? "border-[#B8654A] bg-[#121212]/10 shadow-lg shadow-sm"
                : "border-border bg-card hover:border-white/20"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 transition-all ${
                value === opt.value ? "border-[#B8654A] bg-[#121212]" : "border-white/30"
              }`} />
              <div>
                <p className={`text-sm font-semibold font-sans ${value === opt.value ? "text-[#B8654A]" : "text-foreground"}`}>{opt.label}</p>
                <p className="text-xs text-card-foreground/60 mt-1 leading-relaxed font-sans">{opt.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function IndividualAssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<IndividualFormData>(DEFAULT);
  const [generating, setGenerating] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const purchaseSuccess = params.get("purchase_success") === "1";

    if (purchaseSuccess) {
      sessionStorage.setItem("lb_payment_verified", "true");
      setIsPaid(true);
      const paramEmail = params.get("email");
      const paramPhone = params.get("phone");
      if (paramEmail) setCustomerEmail(decodeURIComponent(paramEmail));
      if (paramPhone) setCustomerPhone(decodeURIComponent(paramPhone));
      window.history.replaceState({}, "", window.location.pathname);
    } else {
      const alreadyPaid = sessionStorage.getItem("lb_payment_verified");
      if (alreadyPaid === "true") {
        setIsPaid(true);
      }
    }
  }, []);

  const updateSliders = useCallback(
    (field: keyof IndividualFormData, id: string, val: number) => {
      setData((prev) => ({
        ...prev,
        [field]: { ...(prev[field] as SliderAnswers), [id]: val },
      }));
    },
    []
  );

  const next = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };
  const prev = () => { if (step > 0) setStep((s) => s - 1); };

  const canProceed = (): boolean => {
    if (step === 0) return !!data.onboarding.name && !!data.onboarding.age && data.onboarding.consentGiven;
    return true;
  };

  const handleSubmit = async () => {
    setGenerating(true);
    const report = generateIndividualReport(data);
    sessionStorage.setItem("folaIndividualReport", JSON.stringify(report));
    sessionStorage.setItem("folaIndividualFormData", JSON.stringify(data));
    sessionStorage.setItem("folaClientEmail", customerEmail);
    sessionStorage.setItem("folaClientPhone", customerPhone);

    // Fire MailerLite directly
    fetch("/.netlify/functions/mailerlite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: customerEmail,
        phone: customerPhone,
        name: data.onboarding.name || "Individual Client",
        overallScore: report.overallScore,
        primaryGrowthEdge: report.primaryGrowthEdge?.dimension,
      }),
    }).catch((e) => console.warn("MailerLite function failed:", e));

    await new Promise((r) => setTimeout(r, 1800));
    router.push("/individual-report");
  };

  const progress = Math.round((step / (STEPS.length - 1)) * 100);

  const riskColor = (score: number) =>
    score >= 70 ? "#22c55e" : score >= 45 ? "#d4af37" : "#ef4444";

  const domainPreview = [
    { label: "Attachment", score: Math.round((data.attachmentStyle === "secure" ? 88 : data.attachmentStyle === "anxious" ? 52 : data.attachmentStyle === "avoidant" ? 48 : 28)) },
    { label: "Trauma", score: Math.round(100 - (Object.values(data.traumaHistory).reduce((a, b) => a + b, 0) / TRAUMA_QUESTIONS.length) * 10) },
    { label: "Emotion Reg.", score: Math.round((Object.values(data.emotionalRegulation).reduce((a, b) => a + b, 0) / EMOTIONAL_REGULATION_QUESTIONS.length) * 10) },
    { label: "Self-Worth", score: Math.round((Object.values(data.selfWorth).reduce((a, b) => a + b, 0) / SELF_WORTH_QUESTIONS.length) * 10) },
    { label: "Readiness", score: Math.round((Object.values(data.relationshipReadiness).reduce((a, b) => a + b, 0) / RELATIONSHIP_READINESS_QUESTIONS.length) * 10) },
  ];

  // ── Payment Gate ──
  if (!isPaid) {
    return (
      <div className="min-h-screen bg-background text-card-foreground texture-paper flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full text-center space-y-6 bg-card border border-border rounded-3xl p-8 backdrop-blur-md">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B8654A]/30 bg-[#121212]/10">
            <span className="text-[#B8654A] text-sm">🔒</span>
            <span className="text-[#B8654A] text-xs font-semibold tracking-wider uppercase font-sans">Secure Payment Required</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-foreground font-serif">Unlock Your Individual Growth Assessment</h1>
          <p className="text-card-foreground/80 font-sans text-sm leading-relaxed">
            Please enter your contact details below, complete the payment, and continue to your personalized assessment.
          </p>

          {/* Customer details form */}
          <div className="space-y-4 text-left">
            <div>
              <label className="block text-xs text-card-foreground/80 font-sans mb-1.5 font-medium uppercase tracking-wider">Email address *</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm font-sans placeholder:text-card-foreground/75 focus:outline-none focus:border-[#B8654A]/50 focus:bg-card transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-card-foreground/80 font-sans mb-1.5 font-medium uppercase tracking-wider">Phone number (optional)</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+27 12 345 6789"
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm font-sans placeholder:text-card-foreground/75 focus:outline-none focus:border-[#B8654A]/50 focus:bg-card transition-all"
              />
            </div>
          </div>

          <YocoButton
            customerEmail={customerEmail}
            customerPhone={customerPhone}
            customerName={data.onboarding.name || "Individual Client"}
            productDescription="LoveBETTER Individual Assessment"
            amountInCents={60000}
            onSuccess={() => setIsPaid(true)}
          />
          <div className="space-y-2 pt-2 border-t border-border">
            <p className="text-[11px] text-card-foreground/60 font-sans">🔒 Your data is fully encrypted. Responses are never saved server-side.</p>
            <p className="text-[11px] text-card-foreground/60 font-sans">💳 Secure payments processed via Yoco (Visa, Mastercard, Instant EFT)</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-card-foreground texture-paper">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/90 border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#B8654A] font-semibold tracking-wider uppercase font-sans">Individual Growth Assessment</p>
            <p className="text-[10px] text-card-foreground/60 font-sans">LOVEBETTER by FOLA</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-card-foreground/80 font-sans">{STEPS[step]}</p>
            <p className="text-[10px] text-card-foreground/75 font-sans">Step {step + 1} of {STEPS.length}</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-card">
          <div
            className="h-full bg-gradient-to-r from-[#7C8673] to-[#9CA693] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="pt-28 pb-32 px-6">
        <div className="mx-auto max-w-2xl">

          {/* Step indicator pills */}
          <div className="flex items-center justify-center gap-1 mb-10 flex-wrap">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className={`flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold font-sans transition-all ${
                  i === step
                    ? "bg-[#121212] text-[#F5F2EC] hover:bg-[#232323] scale-110"
                    : i < step
                    ? "bg-[#121212]/30 text-[#B8654A]"
                    : "bg-card text-card-foreground/75"
                }`}
                title={s}
              >
                {i < step ? "✓" : STEP_ICONS[i]}
              </div>
            ))}
          </div>

          {/* ── STEP 0: Onboarding ── */}
          {step === 0 && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B8654A]/30 bg-[#121212]/10 mb-6">
                  <span className="text-[#B8654A] text-xs font-semibold tracking-wider uppercase font-sans">Individual Growth Assessment</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground font-serif leading-tight">
                  Know yourself completely.<br />
                  <span className="text-[#B8654A] italic">Before you love again.</span>
                </h1>
                <p className="mt-4 text-card-foreground/80 text-sm max-w-lg mx-auto leading-relaxed font-sans">
                  This is a 9-dimension clinical profile of your relational world — your attachment wiring, emotional capacity, self-worth, and readiness. Not a quiz. A map.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-card-foreground/80 mb-2 tracking-wider uppercase font-sans">Your Name</label>
                  <input
                    type="text"
                    value={data.onboarding.name}
                    onChange={(e) => setData((p) => ({ ...p, onboarding: { ...p.onboarding, name: e.target.value } }))}
                    placeholder="First name is fine"
                    className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-sm text-foreground placeholder-[#4a5568] focus:outline-none focus:border-[#B8654A]/50 focus:ring-1 focus:ring-[#B8654A]/30 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-card-foreground/80 mb-2 tracking-wider uppercase font-sans">Age</label>
                  <input
                    type="number"
                    value={data.onboarding.age}
                    onChange={(e) => setData((p) => ({ ...p, onboarding: { ...p.onboarding, age: e.target.value } }))}
                    placeholder="Your age"
                    className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-sm text-foreground placeholder-[#4a5568] focus:outline-none focus:border-[#B8654A]/50 focus:ring-1 focus:ring-[#B8654A]/30 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-card-foreground/80 mb-2 tracking-wider uppercase font-sans">Relationship Status</label>
                  <select
                    value={data.onboarding.relationshipStatus}
                    onChange={(e) => setData((p) => ({ ...p, onboarding: { ...p.onboarding, relationshipStatus: e.target.value as IndividualFormData["onboarding"]["relationshipStatus"] } }))}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-sm text-foreground focus:outline-none focus:border-[#B8654A]/50 font-sans"
                  >
                    <option value="single">Single</option>
                    <option value="dating">Dating / Exploring</option>
                    <option value="committed">In a committed relationship</option>
                    <option value="separated">Separated</option>
                    <option value="divorced">Divorced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-card-foreground/80 mb-2 tracking-wider uppercase font-sans">What brings you here? (Primary goal)</label>
                  <textarea
                    value={data.onboarding.primaryGoal}
                    onChange={(e) => setData((p) => ({ ...p, onboarding: { ...p.onboarding, primaryGoal: e.target.value } }))}
                    placeholder="e.g. 'I keep attracting the same kind of partner and want to understand why...'"
                    rows={3}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-sm text-foreground placeholder-[#4a5568] focus:outline-none focus:border-[#B8654A]/50 focus:ring-1 focus:ring-[#B8654A]/30 font-sans resize-none"
                  />
                </div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div
                    onClick={() => setData((p) => ({ ...p, onboarding: { ...p.onboarding, consentGiven: !p.onboarding.consentGiven } }))}
                    className={`mt-0.5 w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
                      data.onboarding.consentGiven ? "bg-[#121212] border-[#B8654A]" : "border-border"
                    }`}
                  >
                    {data.onboarding.consentGiven && (
                      <svg className="w-3 h-3 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-card-foreground/60 leading-relaxed font-sans">
                    I understand this is a clinical-grade screening tool, not a formal diagnosis. My data is private and used solely to generate my personal report. I consent to proceed.
                  </p>
                </label>
              </div>
            </div>
          )}

          {/* ── STEP 1: Attachment ── */}
          {step === 1 && (
            <CardSelector
              title="What's your attachment style?"
              description="Your attachment style is the neurological blueprint for how you connect. It was wired in before you could speak — and it runs every relationship you've ever had."
              options={ATTACHMENT_OPTIONS as { value: AttachmentStyle; label: string; description: string }[]}
              value={data.attachmentStyle}
              onChange={(v) => setData((p) => ({ ...p, attachmentStyle: v }))}
            />
          )}

          {/* ── STEP 2: Trauma ── */}
          {step === 2 && (
            <SliderSection
              title="Trauma History"
              description="Rate how much each statement reflects your current relational experience. Higher scores = more intensity. There are no wrong answers."
              questions={TRAUMA_QUESTIONS}
              values={data.traumaHistory}
              onChange={(id, val) => updateSliders("traumaHistory", id, val)}
            />
          )}

          {/* ── STEP 3: Emotional Regulation ── */}
          {step === 3 && (
            <SliderSection
              title="Emotional Regulation"
              description="Rate your honest current capacity. Not what you aspire to — where you actually are."
              questions={EMOTIONAL_REGULATION_QUESTIONS}
              values={data.emotionalRegulation}
              onChange={(id, val) => updateSliders("emotionalRegulation", id, val)}
            />
          )}

          {/* ── STEP 4: Self-Worth ── */}
          {step === 4 && (
            <SliderSection
              title="Self-Worth & Identity"
              description="This dimension maps the foundation of your relational life. Honest answers here are the most powerful gift you can give yourself."
              questions={SELF_WORTH_QUESTIONS}
              values={data.selfWorth}
              onChange={(id, val) => updateSliders("selfWorth", id, val)}
            />
          )}

          {/* ── STEP 5: Love Language ── */}
          {step === 5 && (
            <CardSelector
              title="What's your primary love language?"
              description="Dr. Gary Chapman's research, backed by decades of clinical observation: we each have a primary way we receive love. When it's not spoken, love doesn't land."
              options={LOVE_LANGUAGE_OPTIONS as { value: LoveLanguage; label: string; description: string }[]}
              value={data.loveLanguage}
              onChange={(v) => setData((p) => ({ ...p, loveLanguage: v }))}
            />
          )}

          {/* ── STEP 6: Relationship Readiness ── */}
          {step === 6 && (
            <SliderSection
              title="Relationship Readiness"
              description="Not 'am I perfect?' — that's not the standard. But are you genuinely available? Honest assessment of your current capacity."
              questions={RELATIONSHIP_READINESS_QUESTIONS}
              values={data.relationshipReadiness}
              onChange={(id, val) => updateSliders("relationshipReadiness", id, val)}
            />
          )}

          {/* ── STEP 7: Communication ── */}
          {step === 7 && (
            <SliderSection
              title="Communication Style"
              description="Communication is not a skill you have or don't have. It's a capacity that fluctuates with your regulation state. Rate your current baseline."
              questions={COMMUNICATION_QUESTIONS}
              values={data.communicationStyle}
              onChange={(id, val) => updateSliders("communicationStyle", id, val)}
            />
          )}

          {/* ── STEP 8: Values ── */}
          {step === 8 && (
            <SliderSection
              title="Values & Life Vision"
              description="Without a clear sense of what you stand for, your relationship choices will always be reactive rather than intentional."
              questions={VALUES_CLARITY_QUESTIONS}
              values={data.valuesClarity}
              onChange={(id, val) => updateSliders("valuesClarity", id, val)}
            />
          )}

          {/* ── STEP 9: Neurodivergence ── */}
          {step === 9 && (
            <SliderSection
              title="Neurodivergence Awareness"
              description="This isn't about diagnosis — it's about self-awareness. Understanding your neurological wiring is one of the most liberating things you can do for your relationships."
              questions={NEURODIVERGENCE_QUESTIONS}
              values={data.neurodivergenceAwareness}
              onChange={(id, val) => updateSliders("neurodivergenceAwareness", id, val)}
            />
          )}

          {/* ── STEP 10: Change Readiness ── */}
          {step === 10 && (
            <CardSelector
              title="Where are you in your readiness for change?"
              description="The Transtheoretical Model of Change identifies the stage you're actually in — not the stage you wish you were in. Honesty here is everything."
              options={CHANGE_READINESS_OPTIONS as { value: ChangeReadiness; label: string; description: string }[]}
              value={data.changeReadiness}
              onChange={(v) => setData((p) => ({ ...p, changeReadiness: v }))}
            />
          )}

          {/* ── STEP 11: Review ── */}
          {step === 11 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-serif">Your assessment is complete.</h2>
                <p className="mt-3 text-card-foreground/80 text-sm font-sans max-w-md mx-auto">
                  Here&apos;s a preview of your live scores. Generate your full clinical report below.
                </p>
              </div>

              {/* Score preview */}
              <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <p className="text-xs font-semibold text-card-foreground/80 tracking-wider uppercase font-sans mb-4">Live Score Preview</p>
                {domainPreview.map((d) => (
                  <div key={d.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs text-card-foreground/80 font-sans">{d.label}</span>
                      <span className="text-xs font-bold font-sans" style={{ color: riskColor(d.score) }}>{d.score}%</span>
                    </div>
                    <div className="h-1.5 bg-card rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${d.score}%`, backgroundColor: riskColor(d.score) }}
                      />
                    </div>
                  </div>
                ))}
                <p className="text-[10px] text-card-foreground/75 font-sans pt-2">+ 4 more dimensions in your full report</p>
              </div>

              {/* Summary cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Attachment", value: data.attachmentStyle.charAt(0).toUpperCase() + data.attachmentStyle.slice(1) },
                  { label: "Love Language", value: { words: "Affirmation", acts: "Acts of Service", gifts: "Gifts", time: "Quality Time", touch: "Touch" }[data.loveLanguage] },
                  { label: "Readiness", value: { precontemplation: "Not Ready", contemplation: "Thinking", preparation: "Getting Ready", action: "Action" }[data.changeReadiness] },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-[#B8654A]/20 bg-[#121212]/5 p-4 text-center">
                    <p className="text-[10px] text-card-foreground/80 font-sans uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-bold text-[#B8654A] font-serif mt-1">{item.value}</p>
                  </div>
                ))}
              </div>

              {generating ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center gap-3 text-[#B8654A]">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="text-sm font-sans">Generating your clinical report…</span>
                  </div>
                  <p className="text-xs text-card-foreground/60 mt-3 font-sans">Calculating 9 dimensions across clinical frameworks…</p>
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 bg-[#121212] text-[#F5F2EC] hover:bg-[#232323] py-4 rounded-xl text-base font-bold font-sans hover:bg-[#232323] transition-all hover:shadow-xl "
                >
                  Generate My Clinical Report — R600
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              )}
              <p className="text-center text-xs text-card-foreground/75 font-sans">Instant PDF report. 100% private. Clinical-grade accuracy.</p>
            </div>
          )}
        </div>
      </main>

      {/* Fixed bottom navigation */}
      {step < STEPS.length - 1 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md bg-background/90 border-t border-border px-6 py-4">
          <div className="mx-auto max-w-2xl flex items-center justify-between gap-4">
            <button
              onClick={prev}
              disabled={step === 0}
              className="flex items-center gap-2 text-sm text-card-foreground/60 hover:text-foreground transition-colors disabled:opacity-30 font-sans"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Back
            </button>
            <div className="flex-1 text-center">
              <span className="text-xs text-card-foreground/75 font-sans">{step + 1} / {STEPS.length}</span>
            </div>
            <button
              onClick={next}
              disabled={!canProceed()}
              className="flex items-center gap-2 bg-[#121212] text-[#F5F2EC] hover:bg-[#232323] px-6 py-2.5 rounded-lg text-sm font-bold font-sans hover:bg-[#232323] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
