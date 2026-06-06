"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from "recharts";
import type { IndividualReport, DimensionScore } from "@/lib/individual-assessment/types";

const LOVE_LANGUAGE_LABELS: Record<string, string> = {
  words: "Words of Affirmation",
  acts: "Acts of Service",
  gifts: "Receiving Gifts",
  time: "Quality Time",
  touch: "Physical Touch",
};

const ATTACHMENT_LABELS: Record<string, string> = {
  secure: "Secure",
  anxious: "Anxious / Preoccupied",
  avoidant: "Avoidant / Dismissing",
  disorganized: "Disorganized / Fearful",
};

function scoreColor(score: number) {
  if (score >= 70) return "#22c55e";
  if (score >= 45) return "#d4af37";
  return "#ef4444";
}

function riskBadge(level: DimensionScore["riskLevel"]) {
  if (level === "strength") return { label: "Strength", bg: "bg-green-500/15", text: "text-green-400", border: "border-green-500/30" };
  if (level === "growth") return { label: "Growth Edge", bg: "bg-[#d4af37]/15", text: "text-[#d4af37]", border: "border-[#d4af37]/30" };
  return { label: "Priority Focus", bg: "bg-red-500/15", text: "text-red-400", border: "border-red-500/30" };
}

function ScoreGauge({ score }: { score: number }) {
  const r = 80;
  const circumference = Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const color = scoreColor(score);
  return (
    <svg viewBox="0 0 200 120" className="w-56 h-32 mx-auto">
      <path d={`M 20 100 A ${r} ${r} 0 0 1 180 100`} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16" strokeLinecap="round" />
      <path
        d={`M 20 100 A ${r} ${r} 0 0 1 180 100`}
        fill="none"
        stroke={color}
        strokeWidth="16"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
      />
      <text x="100" y="88" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold" fontFamily="serif">{score}</text>
      <text x="100" y="105" textAnchor="middle" fill="#718096" fontSize="10" fontFamily="sans-serif">out of 100</text>
    </svg>
  );
}

export default function IndividualReportPage() {
  const router = useRouter();
  const reportRef = useRef<HTMLDivElement>(null);
  const [report, setReport] = useState<IndividualReport | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("folaIndividualReport");
    if (!raw) { router.push("/individual-assessment"); return; }
    setReport(JSON.parse(raw));
  }, [router]);

  const handlePrint = () => window.print();

  if (!report) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <div className="text-[#d4af37] text-center">
          <svg className="animate-spin w-8 h-8 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm font-sans">Loading your report…</p>
        </div>
      </div>
    );
  }

  const radarData = report.dimensionScores.map((d) => ({
    subject: d.label.split(" ")[0],
    score: d.score,
    fullMark: 100,
  }));

  const barData = [...report.dimensionScores].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f3d] to-[#1a365d] print:bg-white print:from-white print:via-white print:to-white">
      {/* Print nav */}
      <header className="print:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a1628]/90 border-b border-white/5">
        <div className="mx-auto max-w-4xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/icon-32.png" alt="FOLA" className="w-7 h-7" />
            <span className="text-sm text-[#a0aec0] group-hover:text-white transition-colors font-sans">Home</span>
          </Link>
          <p className="text-xs text-[#d4af37] font-semibold tracking-wider uppercase font-sans">Personal Growth Report</p>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#d4af37] text-[#1a365d] px-5 py-2 rounded-lg text-sm font-bold font-sans hover:bg-[#e4bf47] transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download PDF
          </button>
        </div>
      </header>

      <div ref={reportRef} className="pt-24 pb-20 px-6 print:pt-8 print:px-12">
        <div className="mx-auto max-w-4xl space-y-10">

          {/* ── COVER ── */}
          <section className="rounded-3xl border border-[#d4af37]/20 bg-gradient-to-br from-[#1a365d] via-[#0f1f3d] to-[#0a1628] p-8 sm:p-12 text-center print:border-2 print:border-[#1a365d]">
            <div className="flex justify-center mb-4">
              <img src="/icon-192.png" alt="FOLA" className="w-16 h-16" />
            </div>
            <p className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-sans mb-4">The Oasis by FOLA · Hakeem Lesolang</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif leading-tight">Personal Growth Assessment</h1>
            <p className="text-lg text-[#d4af37] italic font-serif mt-2">Personal Clinical Report</p>
            <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
              <div className="rounded-xl bg-white/5 p-4 border border-white/8">
                <p className="text-xs text-[#718096] font-sans uppercase tracking-wider">Prepared for</p>
                <p className="text-white font-bold font-serif mt-1">{report.name}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4 border border-white/8">
                <p className="text-xs text-[#718096] font-sans uppercase tracking-wider">Date</p>
                <p className="text-white font-bold font-serif mt-1">{report.date}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4 border border-white/8">
                <p className="text-xs text-[#718096] font-sans uppercase tracking-wider">Report ID</p>
                <p className="text-white font-bold font-serif mt-1 text-xs">{report.id}</p>
              </div>
            </div>
            <p className="mt-6 text-xs text-[#4a5568] font-sans">
              Clinical screening tool — not a formal diagnosis. For professional use as a starting framework.
            </p>
          </section>

          {/* ── EXECUTIVE SUMMARY ── */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-[#d4af37] rounded-full" />
              <h2 className="text-xl font-bold text-white font-serif">Executive Summary</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <p className="text-xs text-[#718096] font-sans uppercase tracking-wider mb-4">Overall Growth Score</p>
                <ScoreGauge score={report.overallScore} />
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                  style={{ borderColor: `${scoreColor(report.overallScore)}40`, backgroundColor: `${scoreColor(report.overallScore)}10` }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: scoreColor(report.overallScore) }} />
                  <span className="text-xs font-semibold font-sans" style={{ color: scoreColor(report.overallScore) }}>
                    {report.overallScore >= 70 ? "Strong Foundation" : report.overallScore >= 45 ? "Active Growth Phase" : "Critical Work Needed"}
                  </span>
                </div>
              </div>
              <div className="space-y-5">
                <div className="rounded-2xl bg-green-500/8 border border-green-500/20 p-5">
                  <p className="text-xs text-green-400 font-semibold uppercase tracking-wider font-sans mb-1">Top Strength</p>
                  <p className="text-white font-bold font-serif">{report.topStrength.label}</p>
                  <p className="text-xs text-[#a0aec0] mt-1 font-sans leading-relaxed">{report.topStrength.insight}</p>
                </div>
                <div className="rounded-2xl bg-red-500/8 border border-red-500/20 p-5">
                  <p className="text-xs text-red-400 font-semibold uppercase tracking-wider font-sans mb-1">Primary Growth Edge</p>
                  <p className="text-white font-bold font-serif">{report.primaryGrowthEdge.label}</p>
                  <p className="text-xs text-[#a0aec0] mt-1 font-sans leading-relaxed">{report.primaryGrowthEdge.insight}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5 p-4">
                    <p className="text-[10px] text-[#718096] font-sans uppercase tracking-wider">Attachment</p>
                    <p className="text-sm font-bold text-[#d4af37] font-serif mt-1">{ATTACHMENT_LABELS[report.attachmentStyle]}</p>
                  </div>
                  <div className="rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5 p-4">
                    <p className="text-[10px] text-[#718096] font-sans uppercase tracking-wider">Love Language</p>
                    <p className="text-sm font-bold text-[#d4af37] font-serif mt-1">{LOVE_LANGUAGE_LABELS[report.loveLanguage]}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 9-DIMENSION SCORE MATRIX ── */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-[#d4af37] rounded-full" />
              <h2 className="text-xl font-bold text-white font-serif">10-Dimension Score Matrix</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-white/8">
                    <th className="pb-3 text-xs text-[#718096] font-sans uppercase tracking-wider">Dimension</th>
                    <th className="pb-3 text-xs text-[#718096] font-sans uppercase tracking-wider text-center">Score</th>
                    <th className="pb-3 text-xs text-[#718096] font-sans uppercase tracking-wider text-center">Percentile</th>
                    <th className="pb-3 text-xs text-[#718096] font-sans uppercase tracking-wider hidden sm:table-cell">Status</th>
                    <th className="pb-3 text-xs text-[#718096] font-sans uppercase tracking-wider hidden md:table-cell">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {report.dimensionScores.map((d) => {
                    const badge = riskBadge(d.riskLevel);
                    return (
                      <tr key={d.dimension} className="group">
                        <td className="py-3.5 pr-4">
                          <div>
                            <p className="text-white font-medium font-sans text-xs sm:text-sm">{d.label}</p>
                            <div className="mt-1 h-1 w-32 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${d.score}%`, backgroundColor: scoreColor(d.score) }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 text-center">
                          <span className="text-lg font-bold font-serif" style={{ color: scoreColor(d.score) }}>{d.score}</span>
                          <span className="text-xs text-[#4a5568] font-sans">/100</span>
                        </td>
                        <td className="py-3.5 text-center">
                          <span className="text-sm font-bold text-[#a0aec0] font-sans">Top {100 - d.percentile}%</span>
                        </td>
                        <td className="py-3.5 hidden sm:table-cell">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold border font-sans ${badge.bg} ${badge.text} ${badge.border}`}>
                            {badge.label}
                          </span>
                        </td>
                        <td className="py-3.5 hidden md:table-cell">
                          <span className={`text-[10px] font-semibold uppercase tracking-wider font-sans ${
                            d.clinicalWeight === "critical" ? "text-red-400" :
                            d.clinicalWeight === "high" ? "text-[#d4af37]" : "text-[#718096]"
                          }`}>{d.clinicalWeight}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/5">
              {[
                { color: "#22c55e", label: "Strength (70–100)" },
                { color: "#d4af37", label: "Growth Edge (45–69)" },
                { color: "#ef4444", label: "Priority Focus (<45)" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-[#718096] font-sans">{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── VISUAL CHARTS ── */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-[#d4af37] rounded-full" />
              <h2 className="text-xl font-bold text-white font-serif">Visual Profile</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-10">
              {/* Radar */}
              <div>
                <p className="text-xs text-[#718096] uppercase tracking-wider font-sans text-center mb-4">Relational Radar</p>
                <ResponsiveContainer width="100%" height={260}>
                  <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                    <PolarGrid stroke="rgba(255,255,255,0.06)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#a0aec0", fontSize: 10, fontFamily: "var(--font-montserrat, sans-serif)" }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Score" dataKey="score" stroke="#d4af37" fill="#d4af37" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              {/* Bar */}
              <div>
                <p className="text-xs text-[#718096] uppercase tracking-wider font-sans text-center mb-4">Dimension Scores</p>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 10 }}>
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: "#718096", fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="label" width={95} tick={{ fill: "#a0aec0", fontSize: 9, fontFamily: "var(--font-montserrat, sans-serif)" }} axisLine={false} tickLine={false}
                      tickFormatter={(v: string) => v.length > 14 ? v.substring(0, 13) + "…" : v}
                    />
                    <Tooltip
                      contentStyle={{ background: "#0f1f3d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px", color: "#fff" }}
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                      {barData.map((entry, idx) => (
                        <Cell key={idx} fill={scoreColor(entry.score)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* ── DEEP DIMENSION ANALYSIS ── */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-[#d4af37] rounded-full" />
              <h2 className="text-xl font-bold text-white font-serif">Deep Dimension Analysis</h2>
            </div>
            <div className="grid gap-5">
              {report.dimensionScores.map((d) => {
                const badge = riskBadge(d.riskLevel);
                return (
                  <div key={d.dimension} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 hover:border-[#d4af37]/20 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold font-serif"
                          style={{ backgroundColor: `${scoreColor(d.score)}15`, color: scoreColor(d.score) }}>
                          {d.score}
                        </div>
                        <div>
                          <p className="text-white font-bold font-serif text-sm">{d.label}</p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold border font-sans ${badge.bg} ${badge.text} ${badge.border}`}>
                            {badge.label}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-[#718096] font-sans">Percentile</p>
                        <p className="text-sm font-bold text-[#a0aec0] font-sans">Top {100 - d.percentile}%</p>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full mb-3 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${d.score}%`, backgroundColor: scoreColor(d.score) }} />
                    </div>
                    <p className="text-xs text-[#a0aec0] leading-relaxed font-sans">{d.insight}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── CLINICAL FLAGS ── */}
          {report.clinicalFlags.length > 0 && (
            <section className="rounded-3xl border border-red-500/20 bg-red-500/[0.03] p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-red-400 rounded-full" />
                <h2 className="text-xl font-bold text-white font-serif">Clinical Flags</h2>
              </div>
              <div className="space-y-4">
                {report.clinicalFlags.map((flag, i) => (
                  <div key={i} className={`rounded-2xl border p-5 ${
                    flag.severity === "high" ? "border-red-500/30 bg-red-500/8" :
                    flag.severity === "medium" ? "border-[#d4af37]/30 bg-[#d4af37]/8" :
                    "border-white/10 bg-white/5"
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                        flag.severity === "high" ? "bg-red-400" :
                        flag.severity === "medium" ? "bg-[#d4af37]" : "bg-[#718096]"
                      }`} />
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-wider font-sans mb-1 ${
                          flag.severity === "high" ? "text-red-400" :
                          flag.severity === "medium" ? "text-[#d4af37]" : "text-[#718096]"
                        }`}>{flag.severity.toUpperCase()} PRIORITY — {flag.type.replace(/_/g, " ").toUpperCase()}</p>
                        <p className="text-sm text-white font-sans font-medium">{flag.message}</p>
                        <p className="text-xs text-[#a0aec0] mt-2 leading-relaxed font-sans">{flag.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── TREATMENT PLAN ── */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-[#d4af37] rounded-full" />
              <h2 className="text-xl font-bold text-white font-serif">Clinical Pathway & Investment</h2>
            </div>
            <div className="space-y-6">
              {report.treatmentPlan.map((phase) => (
                <div key={phase.phase} className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
                  <div className="flex items-center gap-4 p-5 border-b border-white/5">
                    <div className="w-9 h-9 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-sm font-bold text-[#d4af37] font-serif shrink-0">
                      {phase.phase}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-bold font-serif text-sm">{phase.title}</p>
                      <p className="text-[10px] text-[#d4af37] font-sans">{phase.weeks}</p>
                    </div>
                    <p className="text-xs text-[#718096] hidden sm:block font-sans max-w-[200px] text-right">{phase.focus}</p>
                  </div>
                  <div className="divide-y divide-white/5">
                    {phase.sessions.map((sess, si) => (
                      <div key={si} className="flex items-center justify-between px-5 py-3.5">
                        <div className="flex-1 pr-4">
                          <p className="text-xs font-semibold text-white font-sans">{sess.description}</p>
                          <p className="text-[10px] text-[#718096] mt-0.5 font-sans">{sess.target}</p>
                        </div>
                        <p className="text-sm font-bold text-[#d4af37] font-serif shrink-0">R{sess.price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 p-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#a0aec0] font-sans uppercase tracking-wider">Total Recommended Investment</p>
                <p className="text-xs text-[#718096] font-sans mt-0.5">{report.priceBreakdown}</p>
                <p className="mt-2 text-xs text-[#e2e8f0] font-sans leading-relaxed">
                  The DoLoveBetter Cohort (R6,000 individual / R9,000 couple) is the recommended starting point for most profiles. Age Regression Therapy sessions are R4,000 each for deeper trauma work. Breakthrough & Maintenance sessions are R2,700 each.
                </p>
              </div>
              <p className="text-3xl font-bold text-[#d4af37] font-serif">R{report.totalInvestment.toLocaleString()}</p>
            </div>
          </section>

          {/* ── ACTION ITEMS ── */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-[#d4af37] rounded-full" />
              <h2 className="text-xl font-bold text-white font-serif">Action Items & Next Steps</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                `Review your ${report.primaryGrowthEdge.label} score (${report.primaryGrowthEdge.score}/100) — this is your most urgent growth lever`,
                `Book a discovery call with Hakeem to discuss your personalised pathway`,
                `Read: "${report.topStrength.label}" post on The Uncommon Practice blog`,
                `Share this report with your therapist or coach as an intake framework`,
                "Track your scores in 3 months with a follow-up assessment",
                "Begin the daily regulation practice most relevant to your growth edge",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[10px] font-bold text-[#d4af37] shrink-0 font-sans">{i + 1}</div>
                  <p className="text-xs text-[#a0aec0] leading-relaxed font-sans">{item}</p>
                </div>
              ))}
            </div>
            {/* Journal prompts */}
            <div className="rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/5 p-6">
              <p className="text-sm font-bold text-[#d4af37] font-serif mb-4">Pre-Session Journal Prompts</p>
              <div className="space-y-3">
                {[
                  `What pattern in my relationships am I most ready to change right now?`,
                  `When I think about my ${report.primaryGrowthEdge.label} score, what one memory or belief comes up immediately?`,
                  `What would my relationships look like if my ${report.topStrength.label} was expressed even more fully?`,
                ].map((prompt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#d4af37] text-sm shrink-0 font-serif">▸</span>
                    <p className="text-xs text-[#a0aec0] leading-relaxed font-sans italic">{prompt}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="rounded-3xl border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 to-transparent p-8 sm:p-10 text-center print:hidden">
            <p className="text-xs text-[#d4af37] tracking-wider uppercase font-sans mb-3">Your next step</p>
            <h3 className="text-2xl font-bold text-white font-serif mb-3">Book your Free Discovery Call</h3>
            <p className="text-sm text-[#a0aec0] font-sans max-w-lg mx-auto mb-6 leading-relaxed">
              No pitch. No pressure. Just an honest 30-minute conversation with Hakeem about what your report means and what your pathway forward looks like.
            </p>
            <a
              href="https://calendly.com/folasessions/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#d4af37] text-[#1a365d] px-8 py-4 rounded-xl text-base font-bold font-sans hover:bg-[#e4bf47] transition-all hover:shadow-xl hover:shadow-[#d4af37]/25 hover:-translate-y-0.5"
            >
              Book Your Free Discovery Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </section>

          {/* ── APPENDIX ── */}
          <section className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-white/20 rounded-full" />
              <h2 className="text-lg font-bold text-white font-serif">Appendix — Scoring Methodology</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 text-xs text-[#718096] font-sans leading-relaxed">
              <div>
                <p className="font-semibold text-[#a0aec0] mb-2">Clinical Frameworks Used</p>
                <ul className="space-y-1">
                  <li>• Polyvagal Theory (Porges, 1994) — nervous system states</li>
                  <li>• Attachment Theory (Bowlby, Ainsworth, Schore) — bonding patterns</li>
                  <li>• ACE Study (Felitti & Anda, 1998) — childhood adversity</li>
                  <li>• Transtheoretical Model of Change (Prochaska, 1983)</li>
                  <li>• Executive Function Model (Barkley, 1997) — ADHD & neurodivergence</li>
                  <li>• NLP Submodality & Timeline Work (Bandler & Grinder)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-[#a0aec0] mb-2">Disclaimers</p>
                <ul className="space-y-1">
                  <li>• This tool is a clinical-grade screening instrument</li>
                  <li>• It does not constitute a formal psychological diagnosis</li>
                  <li>• Results are based on self-report and should be interpreted by a qualified practitioner</li>
                  <li>• Data is not stored after report generation unless you opt in</li>
                  <li>• The Oasis by FOLA — Hakeem Lesolang, Clinical Hypnotherapist & Peak Performance Coach</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
