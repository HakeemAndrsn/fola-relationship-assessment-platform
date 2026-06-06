"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import YocoButton from "@/components/YocoButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { generateReport } from "@/lib/assessment/scoring";
import {
  TRAUMA_QUESTIONS,
  ADHD_QUESTIONS,
  VALUES_QUESTIONS,
  COMMUNICATION_QUESTIONS,
  FUTURE_VISION_QUESTIONS,
  PREJUDICES_QUESTIONS,
  ATTACHMENT_OPTIONS,
  CHANGE_READINESS_OPTIONS,
} from "@/lib/assessment/questions";
import type {
  AssessmentFormData,
  AttachmentStyle,
  ChangeReadiness,
  SliderQuestions,
} from "@/lib/assessment/types";
import { useRouter } from "next/navigation";

const STEPS = [
  "Onboarding",
  "Attachment Style",
  "Trauma Inventory",
  "ADHD Screening",
  "Values Alignment",
  "Change Readiness",
  "Communication",
  "Future Vision",
  "Prejudices & Biases",
  "Review & Submit",
];

function initSliders(questions: { id: string }[]): SliderQuestions {
  const obj: SliderQuestions = {};
  for (const q of questions) obj[q.id] = 5;
  return obj;
}

const DEFAULT_DATA: AssessmentFormData = {
  onboarding: { partnerAName: "", partnerBName: "", relationshipDuration: "", primaryConcern: "", consentGiven: false },
  attachment: { partnerA: "secure", partnerB: "secure" },
  trauma: { partnerA: initSliders(TRAUMA_QUESTIONS), partnerB: initSliders(TRAUMA_QUESTIONS) },
  adhd: { partnerA: initSliders(ADHD_QUESTIONS), partnerB: initSliders(ADHD_QUESTIONS) },
  values: { partnerA: initSliders(VALUES_QUESTIONS), partnerB: initSliders(VALUES_QUESTIONS) },
  changeReadiness: { partnerA: "contemplation", partnerB: "contemplation" },
  communication: { partnerA: initSliders(COMMUNICATION_QUESTIONS), partnerB: initSliders(COMMUNICATION_QUESTIONS) },
  futureVision: { partnerA: initSliders(FUTURE_VISION_QUESTIONS), partnerB: initSliders(FUTURE_VISION_QUESTIONS) },
  prejudices: { partnerA: initSliders(PREJUDICES_QUESTIONS), partnerB: initSliders(PREJUDICES_QUESTIONS) },
};

// ── Slider Domain Section ──
function SliderDomainSection({
  title,
  description,
  questions,
  partnerAName,
  partnerBName,
  partnerAValues,
  partnerBValues,
  onChangeA,
  onChangeB,
}: {
  title: string;
  description: string;
  questions: { id: string; label: string; description?: string }[];
  partnerAName: string;
  partnerBName: string;
  partnerAValues: SliderQuestions;
  partnerBValues: SliderQuestions;
  onChangeA: (id: string, val: number) => void;
  onChangeB: (id: string, val: number) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#1a365d]">{title}</h2>
        <p className="mt-1 text-sm text-[#4a5568]">{description}</p>
      </div>
      {questions.map((q) => (
        <Card key={q.id} className="border-[#e2e8f0]">
          <CardHeader>
            <CardTitle className="text-base text-[#2d3748]">{q.label}</CardTitle>
            {q.description && <CardDescription>{q.description}</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-[#1a365d]">
                {partnerAName || "Partner A"}: <span className="font-bold text-[#d4af37]">{partnerAValues[q.id]}/10</span>
              </Label>
              <Slider
                min={0}
                max={10}
                step={1}
                value={[partnerAValues[q.id]]}
                onValueChange={([v]) => onChangeA(q.id, v)}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#1a365d]">
                {partnerBName || "Partner B"}: <span className="font-bold text-[#d4af37]">{partnerBValues[q.id]}/10</span>
              </Label>
              <Slider
                min={0}
                max={10}
                step={1}
                value={[partnerBValues[q.id]]}
                onValueChange={([v]) => onChangeB(q.id, v)}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AssessmentFormData>(DEFAULT_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const justPaid = params.get("lb_paid") === "1";
    const alreadyPaid = sessionStorage.getItem("lb_payment_verified");
    if (justPaid || alreadyPaid) {
      sessionStorage.setItem("lb_payment_verified", "true");
      setIsPaid(true);
    }
  }, []);

  const pA = data.onboarding.partnerAName || "Partner A";
  const pB = data.onboarding.partnerBName || "Partner B";

  const updateOnboarding = useCallback(
    (field: string, value: string | boolean) =>
      setData((d) => ({ ...d, onboarding: { ...d.onboarding, [field]: value } })),
    []
  );

  const updateSlider = useCallback(
    (domain: "trauma" | "adhd" | "values" | "communication" | "futureVision" | "prejudices", partner: "partnerA" | "partnerB", id: string, val: number) =>
      setData((d) => ({
        ...d,
        [domain]: { ...d[domain], [partner]: { ...d[domain][partner], [id]: val } },
      })),
    []
  );

  const canProceed = () => {
    if (step === 0) {
      return data.onboarding.partnerAName.trim() && data.onboarding.partnerBName.trim() && data.onboarding.consentGiven;
    }
    return true;
  };

  const handleSubmit = () => {
    setIsGenerating(true);
    const report = generateReport(data);
    // Store in sessionStorage for the report page
    sessionStorage.setItem("fola-report", JSON.stringify(report));
    sessionStorage.setItem("fola-form-data", JSON.stringify(data));

    // Fire MailerLite directly (no Zapier)
    fetch("/.netlify/functions/mailerlite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: customerEmail,
        phone: customerPhone,
        name: `${data.onboarding.partnerAName} & ${data.onboarding.partnerBName}`,
        overallScore: report.overallScore,
        primaryGrowthEdge: report.primaryGrowthEdge?.dimension,
      }),
    }).catch((e) => console.warn("MailerLite function failed:", e));

    router.push("/report");
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  // ── Payment Gate ──
  if (!isPaid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f7f8fc] to-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10">
            <span className="text-[#d4af37] text-sm">🔒</span>
            <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase font-sans">Secure Payment Required</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-[#1a365d] font-serif">Unlock Your Couples Assessment</h1>
          <p className="text-[#4a5568] font-sans text-sm leading-relaxed">
            Enter your details below to begin. Your assessment report and invoice will be sent to your email.
          </p>

          {/* Customer details form */}
          <div className="space-y-3 text-left">
            <div>
              <label className="block text-xs text-[#4a5568] font-sans mb-1">Email address *</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white border border-[#e2e8f0] text-[#1a365d] text-sm font-sans placeholder:text-[#a0aec0] focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-[#4a5568] font-sans mb-1">Phone number (optional)</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+27 12 345 6789"
                className="w-full px-4 py-3 rounded-lg bg-white border border-[#e2e8f0] text-[#1a365d] text-sm font-sans placeholder:text-[#a0aec0] focus:outline-none focus:border-[#d4af37]/50 transition-colors"
              />
            </div>
          </div>

          <YocoButton
            customerEmail={customerEmail}
            customerPhone={customerPhone}
            customerName={`${data.onboarding.partnerAName || "Partner A"} & ${data.onboarding.partnerBName || "Partner B"}`}
            productDescription="LoveBETTER Couples Assessment"
            amountInCents={60000}
          />
          <p className="text-xs text-[#718096] font-sans">You will be redirected back here after payment confirmation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f8fc] to-white">
      {/* Header */}
      <header className="border-b border-[#e2e8f0] bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/icon-32.png" alt="FOLA" className="w-7 h-7" />
            <div>
              <h1 className="text-lg font-bold text-[#1a365d] tracking-tight leading-none group-hover:text-[#2d4a7c] transition-colors">FOLA Relational Assessment</h1>
              <p className="text-xs text-[#718096]">The Oasis by FOLA</p>
            </div>
          </Link>
          <div className="text-right">
            <p className="text-xs font-medium text-[#4a5568]">Step {step + 1} of {STEPS.length}</p>
            <p className="text-xs text-[#718096]">{STEPS[step]}</p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 pb-2">
          <Progress value={progress} className="h-1.5" />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {/* Step 0: Onboarding */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#1a365d]">Welcome</h2>
              <p className="mt-2 text-sm text-[#4a5568] leading-relaxed">
                This assessment evaluates multiple dimensions of your relationship to provide personalised,
                clinically-informed recommendations. Both partners should complete their sections honestly
                and independently for the most accurate results.
              </p>
            </div>

            <Card className="border-[#d4af37]/30 bg-[#fffdf5]">
              <CardContent className="text-sm text-[#4a5568] pt-4">
                <strong className="text-[#1a365d]">Important:</strong> This is a screening tool, not a clinical diagnosis.
                Results should be discussed with a qualified therapist. All responses are confidential and processed
                locally on your device.
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="partnerA" className="text-[#1a365d]">Partner A&apos;s Name</Label>
                <Input
                  id="partnerA"
                  placeholder="First name"
                  value={data.onboarding.partnerAName}
                  onChange={(e) => updateOnboarding("partnerAName", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="partnerB" className="text-[#1a365d]">Partner B&apos;s Name</Label>
                <Input
                  id="partnerB"
                  placeholder="First name"
                  value={data.onboarding.partnerBName}
                  onChange={(e) => updateOnboarding("partnerBName", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="duration" className="text-[#1a365d]">Relationship Duration</Label>
              <Input
                id="duration"
                placeholder="e.g. 3 years, 6 months"
                value={data.onboarding.relationshipDuration}
                onChange={(e) => updateOnboarding("relationshipDuration", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="concern" className="text-[#1a365d]">Primary Concern</Label>
              <Input
                id="concern"
                placeholder="What brings you to this assessment?"
                value={data.onboarding.primaryConcern}
                onChange={(e) => updateOnboarding("primaryConcern", e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="consent"
                checked={data.onboarding.consentGiven}
                onCheckedChange={(v) => updateOnboarding("consentGiven", !!v)}
              />
              <Label htmlFor="consent" className="text-sm text-[#4a5568] leading-relaxed cursor-pointer">
                I understand this is a screening tool and not a substitute for professional clinical assessment.
                I consent to completing this assessment and acknowledge the results are for informational purposes.
              </Label>
            </div>
          </div>
        )}

        {/* Step 1: Attachment */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#1a365d]">Attachment Style</h2>
              <p className="mt-1 text-sm text-[#4a5568]">
                Your attachment style strongly predicts how you connect, communicate, and handle conflict.
                Select the description that resonates most.
              </p>
            </div>
            {(["partnerA", "partnerB"] as const).map((partner) => (
              <Card key={partner} className="border-[#e2e8f0]">
                <CardHeader>
                  <CardTitle className="text-[#1a365d]">
                    {partner === "partnerA" ? pA : pB}&apos;s Attachment Style
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={data.attachment[partner]}
                    onValueChange={(v) =>
                      setData((d) => ({ ...d, attachment: { ...d.attachment, [partner]: v as AttachmentStyle } }))
                    }
                  >
                    {ATTACHMENT_OPTIONS.map((opt) => (
                      <div key={opt.value} className="flex items-start gap-3 rounded-lg border border-[#e2e8f0] p-4 hover:bg-[#f7f8fc] transition-colors">
                        <RadioGroupItem value={opt.value} id={`${partner}-${opt.value}`} className="mt-0.5" />
                        <Label htmlFor={`${partner}-${opt.value}`} className="cursor-pointer flex-1">
                          <span className="font-semibold text-[#2d3748]">{opt.label}</span>
                          <span className="block mt-1 text-sm text-[#718096] font-normal">{opt.description}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Step 2: Trauma */}
        {step === 2 && (
          <SliderDomainSection
            title="Trauma Inventory"
            description="These questions assess how past experiences may be affecting your current relationship dynamics. Higher scores indicate greater impact. Answer honestly — there are no right or wrong responses."
            questions={TRAUMA_QUESTIONS}
            partnerAName={pA}
            partnerBName={pB}
            partnerAValues={data.trauma.partnerA}
            partnerBValues={data.trauma.partnerB}
            onChangeA={(id, val) => updateSlider("trauma", "partnerA", id, val)}
            onChangeB={(id, val) => updateSlider("trauma", "partnerB", id, val)}
          />
        )}

        {/* Step 3: ADHD */}
        {step === 3 && (
          <SliderDomainSection
            title="Neurodivergence Screening (ADHD Focus)"
            description="These questions screen for patterns often associated with ADHD that can affect relationship dynamics. Higher scores indicate greater presence of these patterns."
            questions={ADHD_QUESTIONS}
            partnerAName={pA}
            partnerBName={pB}
            partnerAValues={data.adhd.partnerA}
            partnerBValues={data.adhd.partnerB}
            onChangeA={(id, val) => updateSlider("adhd", "partnerA", id, val)}
            onChangeB={(id, val) => updateSlider("adhd", "partnerB", id, val)}
          />
        )}

        {/* Step 4: Values */}
        {step === 4 && (
          <SliderDomainSection
            title="Values Alignment"
            description="Understanding where your core values align — and where they differ — is essential. These are not about who is right, but about identifying areas that need thoughtful negotiation."
            questions={VALUES_QUESTIONS}
            partnerAName={pA}
            partnerBName={pB}
            partnerAValues={data.values.partnerA}
            partnerBValues={data.values.partnerB}
            onChangeA={(id, val) => updateSlider("values", "partnerA", id, val)}
            onChangeB={(id, val) => updateSlider("values", "partnerB", id, val)}
          />
        )}

        {/* Step 5: Change Readiness */}
        {step === 5 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#1a365d]">Change Readiness</h2>
              <p className="mt-1 text-sm text-[#4a5568]">
                Based on the Transtheoretical Model, understanding where each partner is in their readiness for change
                helps predict therapy engagement and success.
              </p>
            </div>
            {(["partnerA", "partnerB"] as const).map((partner) => (
              <Card key={partner} className="border-[#e2e8f0]">
                <CardHeader>
                  <CardTitle className="text-[#1a365d]">
                    {partner === "partnerA" ? pA : pB}&apos;s Readiness Stage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={data.changeReadiness[partner]}
                    onValueChange={(v) =>
                      setData((d) => ({ ...d, changeReadiness: { ...d.changeReadiness, [partner]: v as ChangeReadiness } }))
                    }
                  >
                    {CHANGE_READINESS_OPTIONS.map((opt) => (
                      <div key={opt.value} className="flex items-start gap-3 rounded-lg border border-[#e2e8f0] p-4 hover:bg-[#f7f8fc] transition-colors">
                        <RadioGroupItem value={opt.value} id={`${partner}-${opt.value}`} className="mt-0.5" />
                        <Label htmlFor={`${partner}-${opt.value}`} className="cursor-pointer flex-1">
                          <span className="font-semibold text-[#2d3748]">{opt.label}</span>
                          <span className="block mt-1 text-sm text-[#718096] font-normal">{opt.description}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Step 6: Communication */}
        {step === 6 && (
          <SliderDomainSection
            title="Communication Patterns"
            description="How you and your partner communicate — especially during conflict — is central to relationship health. Higher scores indicate more difficulty in that area."
            questions={COMMUNICATION_QUESTIONS}
            partnerAName={pA}
            partnerBName={pB}
            partnerAValues={data.communication.partnerA}
            partnerBValues={data.communication.partnerB}
            onChangeA={(id, val) => updateSlider("communication", "partnerA", id, val)}
            onChangeB={(id, val) => updateSlider("communication", "partnerB", id, val)}
          />
        )}

        {/* Step 7: Future Vision */}
        {step === 7 && (
          <SliderDomainSection
            title="Future Vision Alignment"
            description="Shared vision for the future is a key predictor of long-term satisfaction. These questions explore how aligned your goals and lifestyle preferences are."
            questions={FUTURE_VISION_QUESTIONS}
            partnerAName={pA}
            partnerBName={pB}
            partnerAValues={data.futureVision.partnerA}
            partnerBValues={data.futureVision.partnerB}
            onChangeA={(id, val) => updateSlider("futureVision", "partnerA", id, val)}
            onChangeB={(id, val) => updateSlider("futureVision", "partnerB", id, val)}
          />
        )}

        {/* Step 8: Prejudices & Biases */}
        {step === 8 && (
          <SliderDomainSection
            title="Prejudices & Biases"
            description="The beliefs you carry about the opposite gender — where they come from, how they show up, and what they cost your relationship. This dimension surfaces assumptions you may not even know you're projecting onto your partner."
            questions={PREJUDICES_QUESTIONS}
            partnerAName={pA}
            partnerBName={pB}
            partnerAValues={data.prejudices.partnerA}
            partnerBValues={data.prejudices.partnerB}
            onChangeA={(id, val) => updateSlider("prejudices", "partnerA", id, val)}
            onChangeB={(id, val) => updateSlider("prejudices", "partnerB", id, val)}
          />
        )}

        {/* Step 9: Review */}
        {step === 9 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#1a365d]">Review & Generate Report</h2>
              <p className="mt-1 text-sm text-[#4a5568]">
                Please confirm the details below. Once submitted, your comprehensive assessment report
                will be generated immediately.
              </p>
            </div>

            <Card className="border-[#e2e8f0]">
              <CardHeader>
                <CardTitle className="text-[#1a365d]">Couple Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><span className="font-medium text-[#2d3748]">Partners:</span> {pA} & {pB}</p>
                <p><span className="font-medium text-[#2d3748]">Duration:</span> {data.onboarding.relationshipDuration || "Not specified"}</p>
                <p><span className="font-medium text-[#2d3748]">Primary Concern:</span> {data.onboarding.primaryConcern || "Not specified"}</p>
              </CardContent>
            </Card>

            <Card className="border-[#e2e8f0]">
              <CardHeader>
                <CardTitle className="text-[#1a365d]">Domains Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 text-sm">
                  {STEPS.slice(1, -1).map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-[#4a5568]">{s}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#d4af37]/30 bg-[#fffdf5]">
              <CardContent className="pt-4 text-sm text-[#4a5568]">
                Your report will include an overall relationship health score, domain-by-domain analysis,
                clinical flags, personalised treatment recommendations, and an estimated investment breakdown.
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="border-[#e2e8f0] text-[#4a5568]"
          >
            Back
          </Button>

          {step < STEPS.length - 1 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="bg-[#1a365d] text-white hover:bg-[#2d4a7c]"
            >
              Continue
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isGenerating}
              className="bg-[#d4af37] text-[#1a365d] hover:bg-[#c4a030] font-semibold"
            >
              {isGenerating ? "Generating Report..." : "Generate Report"}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
