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
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-card-foreground/75">{description}</p>
      </div>
      {questions.map((q) => (
        <Card key={q.id} className="border-border">
          <CardHeader>
            <CardTitle className="text-base text-foreground">{q.label}</CardTitle>
            {q.description && <CardDescription>{q.description}</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-foreground">
                {partnerAName || "Partner A"}: <span className="font-bold text-[#B8654A]">{partnerAValues[q.id]}/10</span>
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
              <Label className="text-sm font-medium text-foreground">
                {partnerBName || "Partner B"}: <span className="font-bold text-[#B8654A]">{partnerBValues[q.id]}/10</span>
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
  const [verifying, setVerifying] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkoutId = params.get("id");

    const verifyPayment = async (cid: string) => {
      setVerifying(true);
      try {
        const res = await fetch("/.netlify/functions/validate-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checkoutId: cid }),
        });
        const valData = await res.json();
        if (res.ok && valData.verified && (valData.productId === "lovebetter_couples" || valData.productId === "lovebetter_bundle")) {
          sessionStorage.setItem("lb_couples_checkout_id", cid);
          if (valData.productId === "lovebetter_bundle") {
            sessionStorage.setItem("lb_bundle_checkout_id", cid);
          }
          setIsPaid(true);
          if (valData.email) setCustomerEmail(valData.email);
          if (valData.phone) setCustomerPhone(valData.phone);
        }
      } catch (err) {
        console.error("Payment verification failed", err);
      } finally {
        setVerifying(false);
        // Clean URL query parameters
        window.history.replaceState({}, "", window.location.pathname);
      }
    };

    if (checkoutId) {
      verifyPayment(checkoutId);
    } else {
      const activeCid = sessionStorage.getItem("lb_couples_checkout_id");
      const bundleCid = sessionStorage.getItem("lb_bundle_checkout_id");
      
      if (activeCid) {
        verifyPayment(activeCid);
      } else if (bundleCid) {
        verifyPayment(bundleCid);
      }
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
    sessionStorage.setItem("folaClientEmail", customerEmail);
    sessionStorage.setItem("folaClientPhone", customerPhone);
    sessionStorage.removeItem("lb_payment_verified");

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

  if (verifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <svg className="animate-spin h-8 w-8 text-[#B8654A] mx-auto" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-card-foreground/80 font-sans">Verifying payment status with Yoco...</p>
        </div>
      </div>
    );
  }

  // ── Payment Gate ──
  if (!isPaid) {
    return (
      <div className="min-h-screen bg-background text-card-foreground texture-paper flex items-center justify-center px-6" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(184, 101, 74, 0.12) 0%, rgba(124, 134, 115, 0.06) 50%, transparent 70%)" }}>
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B8654A]/30 bg-[#121212]/10">
            <span className="text-[#B8654A] text-sm">🔒</span>
            <span className="text-[#B8654A] text-xs font-semibold tracking-wider uppercase font-sans">Secure Payment Required</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-foreground font-serif">Unlock Your Couples Assessment</h1>
          <p className="text-card-foreground/75 font-sans text-sm leading-relaxed">
            Enter your details below to begin. Your assessment report and invoice will be sent to your email.
          </p>

          {/* What you're getting */}
          <div className="bg-[#E9E1D6]/30 border border-border rounded-xl p-4 text-left space-y-2">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider font-sans">What's included</p>
            <div className="flex items-start gap-2">
              <span className="text-foreground mt-0.5 font-bold">✓</span>
              <p className="text-xs text-card-foreground/75 font-sans">9-dimension clinical assessment — attachment, trauma, ADHD screening, values alignment, and more</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-foreground mt-0.5 font-bold">✓</span>
              <p className="text-xs text-card-foreground/75 font-sans">Joint report with individual scores, clinical flags, and a couples treatment pathway</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-foreground mt-0.5 font-bold">✓</span>
              <p className="text-xs text-card-foreground/75 font-sans">Brown University-style clinical report delivered instantly as PDF</p>
            </div>
          </div>

          {/* Customer details form */}
          <div className="space-y-3 text-left">
            <div>
              <label className="block text-xs text-card-foreground/75 font-sans mb-1">Email address *</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="you@example.com"
                maxLength={100}
                className="w-full px-4 py-3 rounded-lg bg-white border border-border text-foreground text-sm font-sans placeholder:text-card-foreground/80 focus:outline-none focus:border-[#B8654A]/50 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-card-foreground/75 font-sans mb-1">Phone number (optional)</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+27 12 345 6789"
                maxLength={30}
                className="w-full px-4 py-3 rounded-lg bg-white border border-border text-foreground text-sm font-sans placeholder:text-card-foreground/80 focus:outline-none focus:border-[#B8654A]/50 transition-colors"
              />
            </div>
          </div>

          <YocoButton
            customerEmail={customerEmail}
            customerPhone={customerPhone}
            customerName={`${data.onboarding.partnerAName || "Partner A"} & ${data.onboarding.partnerBName || "Partner B"}`}
            productDescription="LoveBETTER Couples Assessment"
            productId="lovebetter_couples"
            amountInCents={60000}
            onSuccess={() => setIsPaid(true)}
          />
          <div className="space-y-2">
            <p className="text-xs text-card-foreground/60 font-sans">You will be redirected back here after payment confirmation.</p>
            <p className="text-xs text-card-foreground/60 font-sans">🔒 Your data is encrypted. Responses are never stored server-side.</p>
            <p className="text-xs text-card-foreground/60 font-sans">🛡️ 256-bit SSL encryption — same security standard as online banking</p>
            <p className="text-xs text-card-foreground/60 font-sans">💳 Pay with card or instant EFT — no account needed</p>
            <p className="text-xs text-foreground/60 font-serif italic">You're in the right place. — The FOLA Team</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f8fc] to-white">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo-transparent.png" alt="FOLA" className="w-7 h-7" />
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight leading-none group-hover:text-[#2d4a7c] transition-colors">Couples Relationship Growth Assessment</h1>
              <p className="text-xs text-card-foreground/60">LOVEBETTER by FOLA</p>
            </div>
          </Link>
          <div className="text-right">
            <p className="text-xs font-medium text-card-foreground/75">Step {step + 1} of {STEPS.length}</p>
            <p className="text-xs text-card-foreground/60">{STEPS[step]}</p>
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
              <h2 className="text-2xl font-semibold text-foreground">Welcome</h2>
              <p className="mt-2 text-sm text-card-foreground/75 leading-relaxed">
                This assessment evaluates multiple dimensions of your relationship to provide personalised,
                clinically-informed recommendations. Both partners should complete their sections honestly
                and independently for the most accurate results.
              </p>
            </div>

            <Card className="border-[#B8654A]/30 bg-secondary/40">
              <CardContent className="text-sm text-card-foreground/75 pt-4">
                <strong className="text-foreground">Important:</strong> This is a screening tool, not a clinical diagnosis.
                Results should be discussed with a qualified therapist. All responses are confidential and processed
                locally on your device.
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="partnerA" className="text-foreground">Partner A&apos;s Name</Label>
                <Input
                  id="partnerA"
                  placeholder="First name"
                  value={data.onboarding.partnerAName}
                  onChange={(e) => updateOnboarding("partnerAName", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="partnerB" className="text-foreground">Partner B&apos;s Name</Label>
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
              <Label htmlFor="duration" className="text-foreground">Relationship Duration</Label>
              <Input
                id="duration"
                placeholder="e.g. 3 years, 6 months"
                value={data.onboarding.relationshipDuration}
                onChange={(e) => updateOnboarding("relationshipDuration", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="concern" className="text-foreground">Primary Concern</Label>
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
              <Label htmlFor="consent" className="text-sm text-card-foreground/75 leading-relaxed cursor-pointer">
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
              <h2 className="text-2xl font-semibold text-foreground">Attachment Style</h2>
              <p className="mt-1 text-sm text-card-foreground/75">
                Your attachment style strongly predicts how you connect, communicate, and handle conflict.
                Select the description that resonates most.
              </p>
            </div>
            {(["partnerA", "partnerB"] as const).map((partner) => (
              <Card key={partner} className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">
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
                      <div key={opt.value} className="flex items-start gap-3 rounded-lg border border-border p-4 hover:bg-[#f7f8fc] transition-colors">
                        <RadioGroupItem value={opt.value} id={`${partner}-${opt.value}`} className="mt-0.5" />
                        <Label htmlFor={`${partner}-${opt.value}`} className="cursor-pointer flex-1">
                          <span className="font-semibold text-foreground">{opt.label}</span>
                          <span className="block mt-1 text-sm text-card-foreground/60 font-normal">{opt.description}</span>
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
              <h2 className="text-2xl font-semibold text-foreground">Change Readiness</h2>
              <p className="mt-1 text-sm text-card-foreground/75">
                Based on the Transtheoretical Model, understanding where each partner is in their readiness for change
                helps predict therapy engagement and success.
              </p>
            </div>
            {(["partnerA", "partnerB"] as const).map((partner) => (
              <Card key={partner} className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">
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
                      <div key={opt.value} className="flex items-start gap-3 rounded-lg border border-border p-4 hover:bg-[#f7f8fc] transition-colors">
                        <RadioGroupItem value={opt.value} id={`${partner}-${opt.value}`} className="mt-0.5" />
                        <Label htmlFor={`${partner}-${opt.value}`} className="cursor-pointer flex-1">
                          <span className="font-semibold text-foreground">{opt.label}</span>
                          <span className="block mt-1 text-sm text-card-foreground/60 font-normal">{opt.description}</span>
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
              <h2 className="text-2xl font-semibold text-foreground">Review & Generate Report</h2>
              <p className="mt-1 text-sm text-card-foreground/75">
                Please confirm the details below. Once submitted, your comprehensive assessment report
                will be generated immediately.
              </p>
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Couple Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><span className="font-medium text-foreground">Partners:</span> {pA} & {pB}</p>
                <p><span className="font-medium text-foreground">Duration:</span> {data.onboarding.relationshipDuration || "Not specified"}</p>
                <p><span className="font-medium text-foreground">Primary Concern:</span> {data.onboarding.primaryConcern || "Not specified"}</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Domains Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 text-sm">
                  {STEPS.slice(1, -1).map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-card-foreground/75">{s}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#B8654A]/30 bg-secondary/40">
              <CardContent className="pt-4 text-sm text-card-foreground/75">
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
            className="border-border text-card-foreground/75"
          >
            Back
          </Button>

          {step < STEPS.length - 1 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="bg-[#121212] text-[#F5F2EC] hover:bg-[#232323] border border-border"
            >
              Continue
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isGenerating}
              className="bg-[#121212] text-[#F5F2EC] hover:bg-[#232323] hover:bg-[#232323] font-semibold"
            >
              {isGenerating ? "Generating Report..." : "Generate Report"}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
