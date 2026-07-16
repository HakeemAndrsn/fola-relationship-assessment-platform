"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
import { downloadElementAsPdf } from "@/lib/downloadReportPdf";

function riskColor(level: string) {
  if (level === "low") return "#38a169";
  if (level === "medium") return "#B8654A";
  return "#e53e3e";
}

function alignColor(pct: number) {
  if (pct >= 80) return "#38a169";
  if (pct >= 60) return "#B8654A";
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
        <span className="text-4xl font-bold text-[#121212]">{score}</span>
        <span className="block text-xs text-[#718096]">out of 100</span>
      </div>
    </div>
  );
}

export default function ReportPage() {
  const router = useRouter();
  const [report, setReport] = useState<AssessmentReport | null>(null);
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("fola-report");
    if (!stored) {
      router.push("/assessment");
      return;
    }
    setReport(JSON.parse(stored));

    // Retrieve email and phone from sessionStorage
    const email = sessionStorage.getItem("folaClientEmail") || "";
    const phone = sessionStorage.getItem("folaClientPhone") || "";
    setClientEmail(email);
    setClientPhone(phone);
  }, [router]);

  const statsString = report
    ? `FOLA Couples Relational Diagnostic - Partners: ${report.couple.partnerA} & ${report.couple.partnerB} | Overall Alignment: ${report.overallScore}/100 | Top Strength: ${report.primaryStrength.label} (${report.primaryStrength.alignmentPercent}% alignment) | Primary Growth Edge: ${report.criticalFracture.label} (${report.criticalFracture.alignmentPercent}% alignment)`
    : "";

  const getBookingUrl = (baseEventUrl: string) => {
    if (!report) return baseEventUrl;
    const nameParam = encodeURIComponent(`${report.couple.partnerA} & ${report.couple.partnerB}`);
    const emailParam = encodeURIComponent(clientEmail);
    const statsParam = encodeURIComponent(statsString);
    return `${baseEventUrl}?name=${nameParam}&email=${emailParam}&a1=${statsParam}`;
  };

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

  const handleDownloadPdf = async () => {
    if (!report || downloading) return;
    setDownloading(true);
    try {
      const filename = `FOLA-Couples-Assessment-${report.couple.partnerA}-${report.couple.partnerB}.pdf`.replace(/\s+/g, "-");
      await downloadElementAsPdf("report-content", filename);
    } catch (err) {
      console.error("PDF download failed", err);
      alert("Could not generate the PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white print:bg-white">
      {/* Print-hidden controls */}
      <div className="print:hidden sticky top-0 z-10 bg-white border-b border-[#e2e8f0] px-4 py-3">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo-transparent.png" alt="FOLA" className="w-7 h-7" />
            <h1 className="text-lg font-bold text-[#121212] group-hover:text-[#2d4a7c] transition-colors">FOLA Assessment Report</h1>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/assessment")} className="text-[#4a5568]">
              New Assessment
            </Button>
            <Button onClick={handleDownloadPdf} disabled={downloading} className="bg-[#121212] text-white hover:bg-[#2d4a7c]">
              {downloading ? "Generating…" : "Download PDF"}
            </Button>
          </div>
        </div>
      </div>

      <div id="report-content" className="mx-auto max-w-4xl px-6 py-8 space-y-12 print:space-y-8 print:px-12">
        {/* Print-hidden Banner helper */}
        <div className="print:hidden bg-[#E9E1D6]/40 border border-[#B8654A]/20 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <h3 className="text-sm font-bold text-[#121212] uppercase tracking-wider font-sans">🔒 Secure Offline Document</h3>
            <p className="text-xs text-[#4E4E4E] leading-relaxed max-w-xl font-sans">
              To guarantee your clinical privacy, FOLA does not store your test results on our servers.
              Click <strong>Download PDF</strong> to save this document directly to your device. A copy has also been emailed to you.
            </p>
          </div>
          <Button onClick={handleDownloadPdf} disabled={downloading} className="shrink-0 bg-[#121212] text-white hover:bg-[#232323] px-6 py-2.5 rounded-lg text-sm font-bold border border-border">
            {downloading ? "Generating…" : "Download PDF"}
          </Button>
        </div>

        {/* ── COVER PAGE ── */}
        <section className="text-center py-16 print:py-12 border-b-2 border-[#121212]">
          <div className="inline-block px-6 py-2 bg-[#121212] text-white text-xs font-semibold tracking-widest uppercase rounded mb-6">
            Confidential Clinical Document
          </div>
          <div className="flex justify-center mb-6">
            <img src="/logo-transparent.png" alt="FOLA" className="w-20 h-20" />
          </div>
          <h1 className="text-4xl font-bold text-[#121212] tracking-tight">
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
              Prepared for: LOVEBETTER by FOLA | Clinical Director: Hakeem
            </p>
          </div>
        </section>

        {/* ── EXECUTIVE SUMMARY ── */}
        <section className="print:break-before-page">
          <h2 className="text-2xl font-bold text-[#121212] border-b-2 border-[#B8654A] pb-2 mb-6">
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
                <div className="rounded-lg border border-[#B8654A]/40 bg-[#fffdf5] p-4">
                  <p className="text-xs font-semibold text-[#121212] uppercase tracking-wider mb-2">Clinical Recommendations</p>
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
          <h2 className="text-2xl font-bold text-[#121212] border-b-2 border-[#B8654A] pb-2 mb-6">
            Domain Scoring Matrix
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[#121212]">
                  <th className="text-left py-3 px-2 text-[#121212] font-semibold">Domain</th>
                  <th className="text-center py-3 px-2 text-[#121212] font-semibold">{report.couple.partnerA}</th>
                  <th className="text-center py-3 px-2 text-[#121212] font-semibold">{report.couple.partnerB}</th>
                  <th className="text-center py-3 px-2 text-[#121212] font-semibold">Alignment</th>
                  <th className="text-center py-3 px-2 text-[#121212] font-semibold">Risk</th>
                  <th className="text-center py-3 px-2 text-[#121212] font-semibold">Weight</th>
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
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-[#B8654A]" /> Medium Risk (60-79%)</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-[#e53e3e]" /> High Risk (&lt;60%)</span>
          </div>
        </section>

        {/* ── VISUAL DASHBOARD ── */}
        <section className="print:break-before-page">
          <h2 className="text-2xl font-bold text-[#121212] border-b-2 border-[#B8654A] pb-2 mb-6">
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
                      stroke="#121212"
                      fill="#121212"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Radar
                      name={report.couple.partnerB}
                      dataKey={report.couple.partnerB}
                      stroke="#B8654A"
                      fill="#B8654A"
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
          <h2 className="text-2xl font-bold text-[#121212] border-b-2 border-[#B8654A] pb-2 mb-6">
            Deep Domain Analysis
          </h2>
          <div className="space-y-6">
            {report.domainScores.map((s) => (
              <div key={s.domain} className="rounded-lg border border-[#e2e8f0] p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#121212]">{s.label}</h3>
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
                    <p className="text-xl font-bold text-[#121212]">{s.partnerAScore}<span className="text-sm font-normal text-[#718096]">/10</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-[#a0aec0] uppercase tracking-wider">{report.couple.partnerB}</p>
                    <p className="text-xl font-bold text-[#121212]">{s.partnerBScore}<span className="text-sm font-normal text-[#718096]">/10</span></p>
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
                {/* One-liner per dimension */}
                <div className="mt-3 text-sm text-[#4a5568]">
                  {s.riskLevel === "high" && (
                    <p><span className="font-semibold text-[#121212]">What this means:</span> This is where the friction lives. The gap between you here isn't just a difference — it's a pattern that keeps you stuck in the same argument. Addressing this domain first will unlock progress everywhere else.</p>
                  )}
                  {s.riskLevel === "medium" && (
                    <p><span className="font-semibold text-[#121212]">What this means:</span> You're not in crisis here, but this domain is where small disconnects compound over time. A few intentional conversations now can prevent this from becoming a fracture point later.</p>
                  )}
                  {s.riskLevel === "low" && (
                    <p><span className="font-semibold text-[#121212]">What this means:</span> This is a foundation strength. You're aligned here — and that alignment is what will carry you through the harder work in other domains. Don't take it for granted.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CLINICAL FLAGS ── */}
        {report.clinicalFlags.length > 0 && (
          <section className="print:break-before-page">
            <h2 className="text-2xl font-bold text-[#121212] border-b-2 border-[#B8654A] pb-2 mb-6">
              Clinical Flags & Considerations
            </h2>
            <div className="space-y-4">
              {report.clinicalFlags.map((flag, i) => (
                <div key={i} className="rounded-lg border-l-4 p-4 bg-[#f7f8fc]" style={{ borderLeftColor: flag.severity === "high" ? "#e53e3e" : "#B8654A" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: flag.severity === "high" ? "#e53e3e" : "#B8654A" }}>
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
          <h2 className="text-2xl font-bold text-[#121212] border-b-2 border-[#B8654A] pb-2 mb-6">
            Clinical Pathway Recommendation
          </h2>

          {/* Cohort — prominent offer, placed first */}
          <div className="rounded-lg border-2 border-[#B8654A] bg-[#fffdf5] p-6 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-[#B8654A] text-[#121212] text-xs font-bold uppercase tracking-wider rounded mb-3">Recommended Starting Point</span>
                <h3 className="text-xl font-bold text-[#121212]">The DoLoveBetter Cohort</h3>
                <p className="text-sm text-[#4a5568] mt-2 leading-relaxed">
                  A structured 6-week group programme that addresses the beliefs, biases, and patterns
                  that shape how you show up in relationships. Most couples see significant shifts before
                  moving into individual or couples therapy.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-[#e2e8f0] bg-white p-4">
                    <p className="text-xs font-semibold text-[#121212] uppercase tracking-wider">Individual</p>
                    <p className="text-2xl font-bold text-[#121212] mt-1">R6,000</p>
                    <p className="text-xs text-[#718096] mt-1">Per person — ideal when one partner is more ready than the other</p>
                  </div>
                  <div className="rounded-lg border border-[#e2e8f0] bg-white p-4">
                    <p className="text-xs font-semibold text-[#121212] uppercase tracking-wider">Couple</p>
                    <p className="text-2xl font-bold text-[#121212] mt-1">R9,000</p>
                    <p className="text-xs text-[#718096] mt-1">Both partners — shared growth, shared language, shared transformation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {report.treatmentPlan.map((phase) => (
              <div key={phase.phase} className="rounded-lg border border-[#e2e8f0] overflow-hidden">
                <div className="bg-[#121212] text-white px-6 py-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#B8654A]">Phase {phase.phase}</span>
                    <h3 className="text-lg font-semibold">{phase.title}</h3>
                  </div>
                  <span className="text-sm text-[#a0aec0]">{phase.weeks}</span>
                </div>
                <div className="divide-y divide-[#e2e8f0]">
                  {phase.sessions.map((sess, i) => (
                    <div key={i} className="px-6 py-4 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#2d3748]">{sess.description}</p>
                        <p className="text-xs text-[#718096]">
                          <span className="font-medium">Who:</span> {sess.target}
                          {sess.why && (
                            <span className="ml-2 text-[#B8654A]">— Why: {sess.why}</span>
                          )}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-[#121212] ml-4">R{sess.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-lg bg-[#121212] text-white p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#B8654A]">Estimated Total Investment</p>
                <p className="text-sm text-[#a0aec0] mt-1">Across all recommended phases (excluding cohort)</p>
                <p className="mt-2 text-xs text-[#e2e8f0] leading-relaxed">
                  Age Regression Therapy sessions are R4,000 each for deeper trauma work. Breakthrough & Maintenance sessions are R2,700 each. The DoLoveBetter Cohort is billed separately.
                </p>
              </div>
              <span className="text-3xl font-bold">R{report.totalInvestment.toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* ── ACTION ITEMS ── */}
        <section className="print:break-before-page">
          <h2 className="text-2xl font-bold text-[#121212] border-b-2 border-[#B8654A] pb-2 mb-6">
            Action Items & Next Steps
          </h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-[#e2e8f0] p-6 space-y-3">
              <h3 className="font-semibold text-[#121212]">Immediate Actions</h3>
              <div className="space-y-2 text-sm text-[#4a5568]">
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-[#121212]" readOnly />
                  <span>Review this report together in a calm, uninterrupted setting</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-[#121212]" readOnly />
                  <span>Discuss which findings resonate with your experience</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-[#121212]" readOnly />
                  <span>Book an initial consultation with LOVEBETTER by FOLA</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-[#121212]" readOnly />
                  <span>Begin individual journalling about your identified growth areas</span>
                </label>
              </div>
            </div>

            <div className="rounded-lg border border-[#e2e8f0] p-6 space-y-3">
              <h3 className="font-semibold text-[#121212]">Pre-Session Journal Prompts</h3>
              <ol className="space-y-2 text-sm text-[#4a5568] list-decimal list-inside">
                <li>What did I learn about myself from this assessment that surprised me?</li>
                <li>What did I learn about my partner that I want to understand better?</li>
                <li>What is one thing I am willing to change or work on starting today?</li>
                <li>What do I need from my partner to feel safe in this process?</li>
              </ol>
            </div>

            {/* Copy Stats Block */}
            <div className="print:hidden rounded-2xl border border-border bg-card p-6 mb-8 text-left space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[#121212] uppercase tracking-wider font-sans">📋 Copy Stats for Hakeem</h3>
                  <p className="text-xs text-card-foreground/80 leading-relaxed font-sans">
                    FOLA does not save your records. Before booking, copy your report summary so you can share it with Hakeem during your session.
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(statsString);
                    alert("Report stats copied to clipboard!");
                  }}
                  className="shrink-0 text-xs bg-[#121212] text-white hover:bg-[#232323] px-4 py-2 rounded-lg font-bold border border-border font-sans transition-all"
                >
                  Copy Stats
                </button>
              </div>
              <div className="p-3 bg-secondary/30 rounded-lg text-xs font-mono text-card-foreground/90 border border-border select-all break-words">
                {statsString}
              </div>
            </div>
          </div>
        </section>

        {/* ── CALL TO ACTION: TRANSFORMATION PATHWAYS ── */}
        <section className="print:hidden space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground font-serif">Your Next Relational Pathway</h2>
            <p className="text-card-foreground/80 text-sm max-w-lg mx-auto font-sans">
              Choose the depth that aligns with your readiness. Both paths include full analysis of your relational stats.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Pathway A: Relational Breakthrough Session */}
            <div className="rounded-2xl border border-[#B8654A]/30 bg-card p-8 flex flex-col justify-between hover:border-[#B8654A]/60 transition-all shadow-sm">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8654A]/10 border border-[#B8654A]/20 text-[#B8654A] text-xs font-semibold uppercase tracking-wider font-sans">
                  Highly Recommended
                </div>
                <h3 className="text-xl font-bold text-foreground font-serif">Relational Breakthrough Session</h3>
                <p className="text-xs font-semibold text-[#B8654A] font-sans">90 Minutes · R2,800 Intensive</p>
                <p className="text-sm text-card-foreground/80 leading-relaxed font-sans">
                  A high-impact, private workshop with Hakeem. We will dissect your assessment metrics, identify your core nervous system triggers, and map out a practical roadmap to shift your relational response patterns.
                </p>
                <ul className="text-xs text-card-foreground/80 space-y-2 font-sans pt-2">
                  <li className="flex items-center gap-2">
                    <span className="text-[#B8654A] font-bold">✓</span> Direct analysis of your alignment metrics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#B8654A] font-bold">✓</span> Joint trigger-mapping & resolution tools
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#B8654A] font-bold">✓</span> Personalised 3-phase relationship recovery plan
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <a
                  href={getBookingUrl("https://calendly.com/folasessions/breakthrough-session")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full bg-[#121212] text-white font-bold py-3.5 rounded-xl hover:bg-[#232323] transition-colors border border-border text-sm font-sans"
                >
                  Book Breakthrough Session — R2,800
                </a>
              </div>
            </div>

            {/* Pathway B: Discovery Call */}
            <div className="rounded-2xl border border-border bg-card p-8 flex flex-col justify-between hover:border-border/80 transition-all shadow-sm">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-card-foreground/75 text-xs font-semibold uppercase tracking-wider font-sans">
                  Explore First
                </div>
                <h3 className="text-xl font-bold text-foreground font-serif">Free Discovery Call</h3>
                <p className="text-xs text-card-foreground/60 font-sans">30 Minutes · Complimentary</p>
                <p className="text-sm text-card-foreground/80 leading-relaxed font-sans">
                  Not ready for a full intensive yet? Book a brief discovery call to discuss what the Breakthrough Session entails and find out if FOLA's methodology is the right fit for your relationship patterns.
                </p>
                <ul className="text-xs text-card-foreground/80 space-y-2 font-sans pt-2">
                  <li className="flex items-center gap-2">
                    <span className="text-border font-bold">✓</span> Review your top strength and growth edge
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-border font-bold">✓</span> Learn about the Age Regression protocol
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-border font-bold">✓</span> Zero pressure, zero obligation conversation
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <a
                  href={getBookingUrl("https://calendly.com/folasessions/discovery-call")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full bg-secondary hover:bg-secondary/80 text-foreground font-bold py-3.5 rounded-xl transition-colors text-sm border border-border font-sans"
                >
                  Book Discovery Call — Free
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── APPENDIX ── */}
        <section className="print:break-before-page">
          <h2 className="text-2xl font-bold text-[#121212] border-b-2 border-[#B8654A] pb-2 mb-6">
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
                professional assessment. All data is processed securely in compliance with POPIA. Personal
                details and assessment responses are encrypted in transit and are not stored permanently
                on public web servers once your report is delivered. By using this tool, you acknowledge
                that LOVEBETTER by FOLA and its practitioners are not liable for decisions made based on these
                results alone.
              </p>
            </div>
            <div className="pt-4 border-t border-[#e2e8f0] text-xs text-[#a0aec0] text-center">
              <p className="mt-1">Report ID: {report.id} | Generated: {report.date}</p>
              <p className="mt-1">LOVEBETTER by FOLA | Clinical Director: Hakeem</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
