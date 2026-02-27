"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import type { AssessmentReport } from "@/lib/assessment/types";

function riskColor(level: string) {
  if (level === "low") return "#38a169";
  if (level === "medium") return "#d4af37";
  return "#e53e3e";
}

function alignColor(pct: number) {
  if (pct >= 80) return "#38a169";
  if (pct >= 60) return "#d4af37";
  return "#e53e3e";
}

function alignEmoji(pct: number) {
  if (pct >= 80) return "Strong";
  if (pct >= 60) return "Moderate";
  return "Critical";
}

function ScoreGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r="70" fill="none" stroke="#e2e8f0" strokeWidth="12" />
        <circle
          cx="90"
          cy="90"
          r="70"
          fill="none"
          stroke={alignColor(score)}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-4xl font-bold text-[#1a365d]">{score}</span>
        <span className="block text-xs text-[#718096]">out of 100</span>
      </div>
    </div>
  );
}

export default function ReportPage() {
  const router = useRouter();
  const [report, setReport] = useState<AssessmentReport | null>(null);
  const auditFired = useRef(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("fola-report");
    if (!stored) {
      router.push("/assessment");
      return;
    }
    setReport(JSON.parse(stored));
  }, [router]);

  // Fire audit log once when the report is first rendered
  useEffect(() => {
    if (!report || auditFired.current) return;
    auditFired.current = true;

    const formDataRaw = sessionStorage.getItem("fola-form-data");
    const formData = formDataRaw ? JSON.parse(formDataRaw) : null;

    const dimensionScores = report.domainScores.reduce(
      (acc, d) => ({
        ...acc,
        [d.domain]: {
          a: d.partnerAScore,
          b: d.partnerBScore,
          alignment: d.alignmentPercent,
          risk: d.riskLevel,
        },
      }),
      {} as Record<string, unknown>
    );

    const phaseResult =
      `Overall: ${report.overallScore}/100 | ` +
      `Phases: ${report.treatmentPlan.length} | ` +
      `Investment: R${report.totalInvestment.toLocaleString("en-ZA")}`;

    fetch("/.netlify/functions/log-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reportId: report.id,
        submissionDate: new Date().toISOString(),
        coupleName: `${report.couple.partnerA} & ${report.couple.partnerB}`,
        partnerAEmail: formData?.onboarding?.partnerAEmail ?? "",
        partnerBEmail: formData?.onboarding?.partnerBEmail ?? "",
        phaseResult,
        dimensionScores: JSON.stringify(dimensionScores),
        reportGenerated: "Y",
      }),
    }).catch((err) => {
      // Silently swallow — audit logging must never break the report view
      console.warn("FOLA audit log: request failed →", err);
    });
  }, [report]);

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f8fc]">
        <p className="text-[#718096]">Loading report...</p>
      </div>
    );
  }

  const radarData = report.domainScores.map((s) => ({
    domain: s.label.replace(/\(.*\)/, "").trim(),
    [report.couple.partnerA]: s.partnerAScore,
    [report.couple.partnerB]: s.partnerBScore,
  }));

  const barData = report.domainScores.map((s) => ({
    domain: s.label.replace(/\(.*\)/, "").trim(),
    alignment: s.alignmentPercent,
    fill: alignColor(s.alignmentPercent),
  }));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white print:bg-white">
      {/* Print-hidden controls */}
      <div className="print:hidden sticky top-0 z-10 bg-white border-b border-[#e2e8f0] px-4 py-3">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <h1 className="text-lg font-bold text-[#1a365d]">FOLA Assessment Report</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/assessment")} className="text-[#4a5568]">
              New Assessment
            </Button>
            <Button onClick={handlePrint} className="bg-[#1a365d] text-white hover:bg-[#2d4a7c]">
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      <div id="report-content" className="mx-auto max-w-4xl px-6 py-8 space-y-12 print:space-y-8 print:px-12">
        {/* ── COVER PAGE ── */}
        <section className="text-center py-16 print:py-12 border-b-2 border-[#1a365d]">
          <div className="inline-block px-6 py-2 bg-[#1a365d] text-white text-xs font-semibold tracking-widest uppercase rounded mb-6">
            Confidential Clinical Document
          </div>
          <h1 className="text-4xl font-bold text-[#1a365d] tracking-tight">
            FOLA Relational Assessment
          </h1>
          <p className="mt-2 text-lg text-[#4a5568]">Comprehensive Relationship Diagnostic Report</p>
          <div className="mt-8 space-y-1 text-sm text-[#718096]">
            <p><span className="font-medium text-[#2d3748]">Partners:</span> {report.couple.partnerA} & {report.couple.partnerB}</p>
            <p><span className="font-medium text-[#2d3748]">Assessment Date:</span> {report.date}</p>
            <p><span className="font-medium text-[#2d3748]">Report ID:</span> {report.id}</p>
          </div>
          <div className="mt-8 pt-6 border-t border-[#e2e8f0]">
            <p className="text-xs text-[#a0aec0]">
              Prepared for: The Oasis by FOLA | Clinical Director: Hakeem
            </p>
          </div>
        </section>

        {/* ── EXECUTIVE SUMMARY ── */}
        <section className="print:break-before-page">
          <h2 className="text-2xl font-bold text-[#1a365d] border-b-2 border-[#d4af37] pb-2 mb-6">
            Executive Summary
          </h2>
          <div className="grid gap-8 md:grid-cols-[180px_1fr]">
            <div className="flex flex-col items-center">
              <ScoreGauge score={report.overallScore} />
              <p className="mt-2 text-xs font-medium text-[#718096] uppercase tracking-wider">Overall Health</p>
            </div>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wider">Primary Strength</p>
                  <p className="mt-1 text-lg font-bold text-green-800">{report.primaryStrength.label}</p>
                  <p className="text-sm text-green-600">{report.primaryStrength.alignmentPercent}% alignment</p>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-xs font-semibold text-red-700 uppercase tracking-wider">Critical Fracture Point</p>
                  <p className="mt-1 text-lg font-bold text-red-800">{report.criticalFracture.label}</p>
                  <p className="text-sm text-red-600">{report.criticalFracture.alignmentPercent}% alignment</p>
                </div>
              </div>

              {report.clinicalFlags.length > 0 && (
                <div className="rounded-lg border border-[#d4af37]/40 bg-[#fffdf5] p-4">
                  <p className="text-xs font-semibold text-[#1a365d] uppercase tracking-wider mb-2">Clinical Recommendations</p>
                  {report.clinicalFlags.map((flag, i) => (
                    <div key={i} className="mt-2 flex items-start gap-2 text-sm">
                      <span className={`mt-0.5 inline-block h-2 w-2 rounded-full shrink-0 ${flag.severity === "high" ? "bg-red-500" : "bg-yellow-500"}`} />
                      <span className="text-[#4a5568]">{flag.recommendation}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── DOMAIN SCORING MATRIX ── */}
        <section className="print:break-before-page">
          <h2 className="text-2xl font-bold text-[#1a365d] border-b-2 border-[#d4af37] pb-2 mb-6">
            Domain Scoring Matrix
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[#1a365d]">
                  <th className="text-left py-3 px-2 text-[#1a365d] font-semibold">Domain</th>
                  <th className="text-center py-3 px-2 text-[#1a365d] font-semibold">{report.couple.partnerA}</th>
                  <th className="text-center py-3 px-2 text-[#1a365d] font-semibold">{report.couple.partnerB}</th>
                  <th className="text-center py-3 px-2 text-[#1a365d] font-semibold">Alignment</th>
                  <th className="text-center py-3 px-2 text-[#1a365d] font-semibold">Risk</th>
                  <th className="text-center py-3 px-2 text-[#1a365d] font-semibold">Weight</th>
                </tr>
              </thead>
              <tbody>
                {report.domainScores.map((s, i) => (
                  <tr key={s.domain} className={i % 2 === 0 ? "bg-[#f7f8fc]" : "bg-white"}>
                    <td className="py-3 px-2 font-medium text-[#2d3748]">{s.label}</td>
                    <td className="py-3 px-2 text-center text-[#4a5568]">{s.partnerAScore}/10</td>
                    <td className="py-3 px-2 text-center text-[#4a5568]">{s.partnerBScore}/10</td>
                    <td className="py-3 px-2 text-center">
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={{ backgroundColor: alignColor(s.alignmentPercent) + "20", color: alignColor(s.alignmentPercent) }}
                      >
                        {s.alignmentPercent}% {alignEmoji(s.alignmentPercent)}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: riskColor(s.riskLevel) }}
                      />
                    </td>
                    <td className="py-3 px-2 text-center text-xs text-[#718096] capitalize">{s.clinicalWeight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex gap-4 text-xs text-[#718096]">
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-[#38a169]" /> Low Risk (80-100%)</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-[#d4af37]" /> Medium Risk (60-79%)</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-[#e53e3e]" /> High Risk (&lt;60%)</span>
          </div>
        </section>

        {/* ── VISUAL DASHBOARD ── */}
        <section className="print:break-before-page">
          <h2 className="text-2xl font-bold text-[#1a365d] border-b-2 border-[#d4af37] pb-2 mb-6">
            Visual Dashboard
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Radar Chart */}
            <div>
              <h3 className="text-sm font-semibold text-[#2d3748] mb-4 uppercase tracking-wider">
                Partner Comparison (Radar)
              </h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="70%">
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="domain" tick={{ fontSize: 11, fill: "#4a5568" }} />
                    <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 10, fill: "#a0aec0" }} />
                    <Radar
                      name={report.couple.partnerA}
                      dataKey={report.couple.partnerA}
                      stroke="#1a365d"
                      fill="#1a365d"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Radar
                      name={report.couple.partnerB}
                      dataKey={report.couple.partnerB}
                      stroke="#d4af37"
                      fill="#d4af37"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div>
              <h3 className="text-sm font-semibold text-[#2d3748] mb-4 uppercase tracking-wider">
                Alignment by Domain
              </h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#a0aec0" }} />
                    <YAxis dataKey="domain" type="category" tick={{ fontSize: 11, fill: "#4a5568" }} width={120} />
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, "Alignment"]}
                      contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    />
                    <Bar dataKey="alignment" radius={[0, 4, 4, 0]}>
                      {barData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Clinical Risk Matrix */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-[#2d3748] mb-4 uppercase tracking-wider">
              Clinical Risk Matrix
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {(["high", "medium", "low"] as const).map((level) => {
                const domains = report.domainScores.filter((s) => s.riskLevel === level);
                return (
                  <div
                    key={level}
                    className="rounded-lg border p-4"
                    style={{ borderColor: riskColor(level) + "40", backgroundColor: riskColor(level) + "08" }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: riskColor(level) }}>
                      {level} Risk
                    </p>
                    {domains.length === 0 ? (
                      <p className="text-xs text-[#a0aec0]">No domains</p>
                    ) : (
                      domains.map((d) => (
                        <p key={d.domain} className="text-sm text-[#4a5568]">{d.label}</p>
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── DEEP DOMAIN ANALYSIS ── */}
        <section className="print:break-before-page">
          <h2 className="text-2xl font-bold text-[#1a365d] border-b-2 border-[#d4af37] pb-2 mb-6">
            Deep Domain Analysis
          </h2>
          <div className="space-y-6">
            {report.domainScores.map((s) => (
              <div key={s.domain} className="rounded-lg border border-[#e2e8f0] p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1a365d]">{s.label}</h3>
                    <p className="text-xs text-[#718096] capitalize">Clinical weight: {s.clinicalWeight}</p>
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold"
                    style={{ backgroundColor: alignColor(s.alignmentPercent) + "20", color: alignColor(s.alignmentPercent) }}
                  >
                    {s.alignmentPercent}%
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-3 text-sm">
                  <div>
                    <p className="text-xs text-[#a0aec0] uppercase tracking-wider">{report.couple.partnerA}</p>
                    <p className="text-xl font-bold text-[#1a365d]">{s.partnerAScore}<span className="text-sm font-normal text-[#718096]">/10</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-[#a0aec0] uppercase tracking-wider">{report.couple.partnerB}</p>
                    <p className="text-xl font-bold text-[#1a365d]">{s.partnerBScore}<span className="text-sm font-normal text-[#718096]">/10</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-[#a0aec0] uppercase tracking-wider">Gap</p>
                    <p className="text-xl font-bold" style={{ color: riskColor(s.riskLevel) }}>{s.gap}<span className="text-sm font-normal text-[#718096]"> pts</span></p>
                  </div>
                </div>
                {/* Alignment bar */}
                <div className="mt-4">
                  <div className="h-2 rounded-full bg-[#e2e8f0] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${s.alignmentPercent}%`, backgroundColor: alignColor(s.alignmentPercent) }}
                    />
                  </div>
                </div>
                {/* Clinical interpretation */}
                <div className="mt-3 text-sm text-[#4a5568]">
                  {s.riskLevel === "high" && (
                    <p>This domain represents a significant area of concern. The gap between partners suggests misalignment that could be a recurring source of conflict without targeted intervention.</p>
                  )}
                  {s.riskLevel === "medium" && (
                    <p>This domain shows moderate alignment. While not an immediate concern, continued attention and open dialogue can prevent this area from becoming a source of tension.</p>
                  )}
                  {s.riskLevel === "low" && (
                    <p>This domain represents a strength in your relationship. Continue nurturing this area of alignment as it provides a foundation for working through challenges in other domains.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CLINICAL FLAGS ── */}
        {report.clinicalFlags.length > 0 && (
          <section className="print:break-before-page">
            <h2 className="text-2xl font-bold text-[#1a365d] border-b-2 border-[#d4af37] pb-2 mb-6">
              Clinical Flags & Considerations
            </h2>
            <div className="space-y-4">
              {report.clinicalFlags.map((flag, i) => (
                <div key={i} className="rounded-lg border-l-4 p-4 bg-[#f7f8fc]" style={{ borderLeftColor: flag.severity === "high" ? "#e53e3e" : "#d4af37" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: flag.severity === "high" ? "#e53e3e" : "#d4af37" }}>
                    {flag.type} — {flag.severity} severity
                  </p>
                  <p className="text-sm text-[#2d3748]">{flag.message}</p>
                  <p className="mt-2 text-sm text-[#4a5568] italic">{flag.recommendation}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── CLINICAL PATHWAY ── */}
        <section className="print:break-before-page">
          <h2 className="text-2xl font-bold text-[#1a365d] border-b-2 border-[#d4af37] pb-2 mb-6">
            Clinical Pathway Recommendation
          </h2>
          <div className="space-y-8">
            {report.treatmentPlan.map((phase) => (
              <div key={phase.phase} className="rounded-lg border border-[#e2e8f0] overflow-hidden">
                <div className="bg-[#1a365d] text-white px-6 py-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">Phase {phase.phase}</span>
                    <h3 className="text-lg font-semibold">{phase.title}</h3>
                  </div>
                  <span className="text-sm text-[#a0aec0]">{phase.weeks}</span>
                </div>
                <div className="divide-y divide-[#e2e8f0]">
                  {phase.sessions.map((sess, i) => (
                    <div key={i} className="px-6 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#2d3748]">{sess.description}</p>
                        <p className="text-xs text-[#718096]">Target: {sess.target}</p>
                      </div>
                      <span className="text-sm font-bold text-[#1a365d]">R{sess.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-lg bg-[#1a365d] text-white p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">Estimated Total Investment</p>
                <p className="text-sm text-[#a0aec0] mt-1">Across all recommended phases</p>
              </div>
              <span className="text-3xl font-bold">R{report.totalInvestment.toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* ── ACTION ITEMS ── */}
        <section className="print:break-before-page">
          <h2 className="text-2xl font-bold text-[#1a365d] border-b-2 border-[#d4af37] pb-2 mb-6">
            Action Items & Next Steps
          </h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-[#e2e8f0] p-6 space-y-3">
              <h3 className="font-semibold text-[#1a365d]">Immediate Actions</h3>
              <div className="space-y-2 text-sm text-[#4a5568]">
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-[#1a365d]" readOnly />
                  <span>Review this report together in a calm, uninterrupted setting</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-[#1a365d]" readOnly />
                  <span>Discuss which findings resonate with your experience</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-[#1a365d]" readOnly />
                  <span>Book an initial consultation with The Oasis by FOLA</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-[#1a365d]" readOnly />
                  <span>Begin individual journalling about your identified growth areas</span>
                </label>
              </div>
            </div>

            <div className="rounded-lg border border-[#e2e8f0] p-6 space-y-3">
              <h3 className="font-semibold text-[#1a365d]">Pre-Session Journal Prompts</h3>
              <ol className="space-y-2 text-sm text-[#4a5568] list-decimal list-inside">
                <li>What did I learn about myself from this assessment that surprised me?</li>
                <li>What did I learn about my partner that I want to understand better?</li>
                <li>What is one thing I am willing to change or work on starting today?</li>
                <li>What do I need from my partner to feel safe in this process?</li>
              </ol>
            </div>
          </div>
        </section>

        {/* ── APPENDIX ── */}
        <section className="print:break-before-page">
          <h2 className="text-2xl font-bold text-[#1a365d] border-b-2 border-[#d4af37] pb-2 mb-6">
            Appendix
          </h2>
          <div className="space-y-6 text-sm text-[#4a5568]">
            <div>
              <h3 className="font-semibold text-[#2d3748] mb-2">Scoring Methodology</h3>
              <p>
                Alignment scores are calculated using weighted domain analysis. Slider-based domains
                use mean absolute difference normalised to a 0-100% scale. Categorical domains
                (attachment, change readiness) use empirically-derived compatibility matrices.
                The overall score applies weighted averages with clinical significance as the weight factor.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#2d3748] mb-2">References</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Bowlby, J. (1969). Attachment and Loss. Basic Books.</li>
                <li>Prochaska, J.O. & DiClemente, C.C. (1983). Stages of Change in the Modification of Problem Behaviors.</li>
                <li>Felitti, V.J. et al. (1998). Adverse Childhood Experiences Study.</li>
                <li>Barkley, R.A. (2015). ADHD and the Nature of Self-Control. Guilford Press.</li>
                <li>Gottman, J.M. (1999). The Seven Principles for Making Marriage Work.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#2d3748] mb-2">Disclaimers</h3>
              <p>
                This report is a screening instrument and does not constitute a clinical diagnosis.
                Results are intended to inform and guide therapeutic conversations, not replace
                professional assessment. All data is processed locally and is not stored on any server.
                By using this tool, you acknowledge that The Oasis by FOLA and its practitioners
                are not liable for decisions made based on these results alone.
              </p>
            </div>
            <div className="pt-4 border-t border-[#e2e8f0] text-xs text-[#a0aec0] text-center">
              <p>Assessment Price: R{report.dynamicPrice} | {report.priceBreakdown}</p>
              <p className="mt-1">Report ID: {report.id} | Generated: {report.date}</p>
              <p className="mt-1">The Oasis by FOLA | Clinical Director: Hakeem</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
