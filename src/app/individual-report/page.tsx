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
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import type { IndividualReport } from "@/lib/individual-assessment/types";
import { downloadElementAsPdf } from "@/lib/downloadReportPdf";

function riskColor(level: string) {
  if (level === "strength") return "#38a169";
  if (level === "growth") return "#B8654A";
  return "#e53e3e";
}

function scoreColor(score: number) {
  if (score >= 70) return "#38a169";
  if (score >= 45) return "#B8654A";
  return "#e53e3e";
}

function scoreLabel(score: number) {
  if (score >= 70) return "Strength";
  if (score >= 45) return "Growth";
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
          stroke={scoreColor(score)}
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

export default function IndividualReportPage() {
  const router = useRouter();
  const [report, setReport] = useState<IndividualReport | null>(null);
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"sending" | "sent" | "failed" | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("folaIndividualReport");
    if (!stored) {
      router.push("/individual-assessment");
      return;
    }
    setReport(JSON.parse(stored));

    // Retrieve email and phone from sessionStorage
    const email = sessionStorage.getItem("folaClientEmail") || "";
    const phone = sessionStorage.getItem("folaClientPhone") || "";
    setClientEmail(email);
    setClientPhone(phone);
  }, [router]);

  useEffect(() => {
    const key = "fola_individual_report_email_status";
    const readStatus = () => {
      const status = sessionStorage.getItem(key);
      if (status === "sending" || status === "sent" || status === "failed") {
        setEmailStatus(status);
        return status;
      }
      return null;
    };
    if (!readStatus()) return;
    // Poll briefly for the async email send (fired before this page loaded)
    // to resolve from "sending" to a final status
    const interval = setInterval(() => {
      const status = readStatus();
      if (status !== "sending") clearInterval(interval);
    }, 500);
    const timeout = setTimeout(() => clearInterval(interval), 10000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const statsString = report 
    ? `FOLA Relational Diagnostic - Client: ${report.name} | Overall Score: ${report.overallScore}/100 | Attachment: ${report.attachmentStyle.toUpperCase()} | Top Strength: ${report.topStrength.label} (${report.topStrength.score}/100) | Primary Growth Edge: ${report.primaryGrowthEdge.label} (${report.primaryGrowthEdge.score}/100) | Change Readiness: ${report.changeReadiness.toUpperCase()}`
    : "";

  const getBookingUrl = (baseEventUrl: string) => {
    if (!report) return baseEventUrl;
    const nameParam = encodeURIComponent(report.name || "");
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

  const radarData = report.dimensionScores.map((d) => ({
    domain: d.label.replace(/\(.*\)/, "").trim(),
    score: d.score,
  }));

  const barData = report.dimensionScores.map((d) => ({
    domain: d.label.replace(/\(.*\)/, "").trim(),
    score: d.score,
    fill: scoreColor(d.score),
  }));

  const handleDownloadPdf = async () => {
    if (!report || downloading) return;
    setDownloading(true);
    try {
      const filename = `FOLA-Individual-Assessment-${report.name || "Client"}.pdf`.replace(/\s+/g, "-");
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
            <h1 className="text-lg font-bold text-[#121212] group-hover:text-[#2d4a7c] transition-colors">FOLA Individual Assessment Report</h1>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/individual-assessment")} className="text-[#4a5568]">
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
              Click <strong>Download PDF</strong> to save this document directly to your device.
            </p>
            {emailStatus === "sending" && (
              <p className="text-xs text-[#4E4E4E] font-sans">⏳ Emailing a copy to {clientEmail || "your inbox"}…</p>
            )}
            {emailStatus === "sent" && (
              <p className="text-xs text-green-700 font-sans">✓ A copy has also been emailed to {clientEmail || "you"}.</p>
            )}
            {emailStatus === "failed" && (
              <p className="text-xs text-[#B8654A] font-sans">⚠ We couldn't confirm your report email sent — please download the PDF above to be safe.</p>
            )}
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
            FOLA Individual Assessment
          </h1>
          <p className="mt-2 text-lg text-[#4a5568]">Personal Relationship Diagnostic Report</p>
          <div className="mt-8 space-y-1 text-sm text-[#718096]">
            <p><span className="font-medium text-[#2d3748]">Client:</span> {report.name}</p>
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
              <p className="mt-2 text-xs font-medium text-[#718096] uppercase tracking-wider">Overall Relational Health</p>
            </div>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wider">Top Strength</p>
                  <p className="mt-1 text-lg font-bold text-green-800">{report.topStrength.label}</p>
                  <p className="text-sm text-green-600">{report.topStrength.score}/100</p>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-xs font-semibold text-red-700 uppercase tracking-wider">Primary Growth Edge</p>
                  <p className="mt-1 text-lg font-bold text-red-800">{report.primaryGrowthEdge.label}</p>
                  <p className="text-sm text-red-600">{report.primaryGrowthEdge.score}/100</p>
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

        {/* ── DIMENSION SCORING MATRIX ── */}
        <section className="print:break-before-page">
          <h2 className="text-2xl font-bold text-[#121212] border-b-2 border-[#B8654A] pb-2 mb-6">
            Dimension Scoring Matrix
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[#121212]">
                  <th className="text-left py-3 px-2 text-[#121212] font-semibold">Dimension</th>
                  <th className="text-center py-3 px-2 text-[#121212] font-semibold">Score</th>
                  <th className="text-center py-3 px-2 text-[#121212] font-semibold">Status</th>
                  <th className="text-center py-3 px-2 text-[#121212] font-semibold">Percentile</th>
                  <th className="text-center py-3 px-2 text-[#121212] font-semibold">Clinical Weight</th>
                </tr>
              </thead>
              <tbody>
                {report.dimensionScores.map((d, i) => (
                  <tr key={d.label} className={i % 2 === 0 ? "bg-[#f7f8fc]" : "bg-white"}>
                    <td className="py-3 px-2 font-medium text-[#2d3748]">{d.label}</td>
                    <td className="py-3 px-2 text-center">
                      <span className="font-bold" style={{ color: scoreColor(d.score) }}>{d.score}</span>
                      <span className="text-[#718096]">/100</span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={{ backgroundColor: scoreColor(d.score) + "20", color: scoreColor(d.score) }}
                      >
                        {scoreLabel(d.score)}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center text-[#4a5568]">{d.percentile}th</td>
                    <td className="py-3 px-2 text-center text-xs text-[#718096] capitalize">{d.clinicalWeight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex gap-4 text-xs text-[#718096]">
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-[#38a169]" /> Strength (70-100)</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-[#B8654A]" /> Growth (45-69)</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-[#e53e3e]" /> Critical (&lt;45)</span>
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
                Dimension Profile (Radar)
              </h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="70%">
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="domain" tick={{ fontSize: 11, fill: "#4a5568" }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#a0aec0" }} />
                    <Radar
                      name="Your Score"
                      dataKey="score"
                      stroke="#121212"
                      fill="#121212"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div>
              <h3 className="text-sm font-semibold text-[#2d3748] mb-4 uppercase tracking-wider">
                Scores by Dimension
              </h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#a0aec0" }} />
                    <YAxis dataKey="domain" type="category" tick={{ fontSize: 11, fill: "#4a5568" }} width={120} />
                    <Tooltip
                      formatter={(value: number) => [`${value}/100`, "Score"]}
                      contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]}>
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
              {(["critical", "growth", "strength"] as const).map((level) => {
                const dims = report.dimensionScores.filter((d) => {
                  const lvl = d.score >= 70 ? "strength" : d.score >= 45 ? "growth" : "critical";
                  return lvl === level;
                });
                return (
                  <div
                    key={level}
                    className="rounded-lg border p-4"
                    style={{ borderColor: riskColor(level) + "40", backgroundColor: riskColor(level) + "08" }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: riskColor(level) }}>
                      {level === "critical" ? "Critical" : level === "growth" ? "Growth" : "Strength"}
                    </p>
                    {dims.length === 0 ? (
                      <p className="text-xs text-[#a0aec0]">No dimensions</p>
                    ) : (
                      dims.map((d) => (
                        <p key={d.label} className="text-sm text-[#4a5568]">{d.label}</p>
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── DEEP DIMENSION ANALYSIS ── */}
        <section className="print:break-before-page">
          <h2 className="text-2xl font-bold text-[#121212] border-b-2 border-[#B8654A] pb-2 mb-6">
            Deep Dimension Analysis
          </h2>
          <div className="space-y-6">
            {report.dimensionScores.map((d) => (
              <div key={d.label} className="rounded-lg border border-[#e2e8f0] p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#121212]">{d.label}</h3>
                    <p className="text-xs text-[#718096] capitalize">Clinical weight: {d.clinicalWeight}</p>
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold"
                    style={{ backgroundColor: scoreColor(d.score) + "20", color: scoreColor(d.score) }}
                  >
                    {d.score}/100
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-3 text-sm">
                  <div>
                    <p className="text-xs text-[#a0aec0] uppercase tracking-wider">Score</p>
                    <p className="text-xl font-bold text-[#121212]">{d.score}<span className="text-sm font-normal text-[#718096]">/100</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-[#a0aec0] uppercase tracking-wider">Status</p>
                    <p className="text-xl font-bold" style={{ color: scoreColor(d.score) }}>{scoreLabel(d.score)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#a0aec0] uppercase tracking-wider">Percentile</p>
                    <p className="text-xl font-bold text-[#121212]">{d.percentile}<span className="text-sm font-normal text-[#718096]">th</span></p>
                  </div>
                </div>
                {/* Score bar */}
                <div className="mt-4">
                  <div className="h-2 rounded-full bg-[#e2e8f0] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${d.score}%`, backgroundColor: scoreColor(d.score) }}
                    />
                  </div>
                </div>
                {/* One-liner per dimension */}
                <div className="mt-3 text-sm text-[#4a5568]">
                  {d.score < 45 && (
                    <p><span className="font-semibold text-[#121212]">What this means:</span> This is where the wound lives. A score this low isn't just a number — it's a signal that something here needs attention before it keeps showing up in every relationship you have. This is the place to start.</p>
                  )}
                  {d.score >= 45 && d.score < 70 && (
                    <p><span className="font-semibold text-[#121212]">What this means:</span> You're functional here, but there's a ceiling. This dimension has room to grow — and strengthening it will unlock progress in areas you didn't expect. Think of it as the next lever to pull.</p>
                  )}
                  {d.score >= 70 && (
                    <p><span className="font-semibold text-[#121212]">What this means:</span> This is a genuine strength. You've done work here — or you're naturally aligned. Either way, this is the foundation you'll build on. Don't ignore it while focusing on what's broken.</p>
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

          {/* Cohort — prominent offer for individuals */}
          <div className="rounded-lg border-2 border-[#B8654A] bg-[#fffdf5] p-6 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-[#B8654A] text-[#121212] text-xs font-bold uppercase tracking-wider rounded mb-3">Recommended Starting Point</span>
                <h3 className="text-xl font-bold text-[#121212]">The DoLoveBetter Cohort</h3>
                <p className="text-sm text-[#4a5568] mt-2 leading-relaxed">
                  A structured 6-week group programme that addresses the beliefs, biases, and patterns
                  that shape how you show up in relationships. Whether you're single, dating, or in a
                  partnership, this cohort gives you the foundation to recognise your patterns before
                  moving into individual therapy.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-[#e2e8f0] bg-white p-4">
                    <p className="text-xs font-semibold text-[#121212] uppercase tracking-wider">Individual</p>
                    <p className="text-2xl font-bold text-[#121212] mt-1">R6,000</p>
                    <p className="text-xs text-[#718096] mt-1">Full cohort — group learning with personal application</p>
                  </div>
                  <div className="rounded-lg border border-[#e2e8f0] bg-white p-4">
                    <p className="text-xs font-semibold text-[#121212] uppercase tracking-wider">Couple</p>
                    <p className="text-2xl font-bold text-[#121212] mt-1">R9,000</p>
                    <p className="text-xs text-[#718096] mt-1">Both partners — shared language, shared transformation</p>
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
                      <div>
                        <p className="text-sm font-medium text-[#2d3748]">{sess.description}</p>
                        <p className="text-xs text-[#718096]">Target: {sess.target}</p>
                      </div>
                      <span className="text-sm font-bold text-[#121212]">R{sess.price.toLocaleString()}</span>
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
                  <span>Review this report in a calm, uninterrupted setting</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-[#121212]" readOnly />
                  <span>Reflect on which findings resonate with your experience</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-[#121212]" readOnly />
                  <span>Book a discovery call with LOVEBETTER by FOLA</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-[#121212]" readOnly />
                  <span>Begin journalling about your identified growth areas</span>
                </label>
              </div>
            </div>

            <div className="rounded-lg border border-[#e2e8f0] p-6 space-y-3">
              <h3 className="font-semibold text-[#121212]">Pre-Session Journal Prompts</h3>
              <ol className="space-y-2 text-sm text-[#4a5568] list-decimal list-inside">
                <li>What did I learn about myself from this assessment that surprised me?</li>
                <li>What pattern do I notice repeating in my relationships?</li>
                <li>What is one thing I am willing to change or work on starting today?</li>
                <li>What support do I need to feel safe in this process?</li>
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
                  A high-impact, private workshop with Hakeem. We will dissect your 10-dimension stats, identify your core nervous system triggers, and map out a practical roadmap to shift your attachment style.
                </p>
                <ul className="text-xs text-card-foreground/80 space-y-2 font-sans pt-2">
                  <li className="flex items-center gap-2">
                    <span className="text-[#B8654A] font-bold">✓</span> Direct analysis of your assessment metrics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#B8654A] font-bold">✓</span> Practical nervous-system regulation drills
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#B8654A] font-bold">✓</span> Personalised 3-phase relational recovery plan
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
                Dimension scores are calculated using weighted domain analysis. Slider-based dimensions
                use mean score normalised to a 0-100% scale. Categorical dimensions
                (attachment style, change readiness) use empirically-derived scoring matrices.
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
                By using this tool, you acknowledge that LOVEBETTER by FOLA and its practitioners
                are not liable for decisions made based on these results alone.
              </p>
            </div>
            <div className="pt-4 border-t border-[#e2e8f0] text-xs text-[#a0aec0] text-center">
              <p>Assessment Price: R600 | Individual Assessment</p>
              <p className="mt-1">Report ID: {report.id} | Generated: {report.date}</p>
              <p className="mt-1">LOVEBETTER by FOLA | Clinical Director: Hakeem</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
