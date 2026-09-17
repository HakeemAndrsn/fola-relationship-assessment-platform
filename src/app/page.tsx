"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// ── Brand tokens — shared with /store, so Home stops feeling like a
// separate, generic SaaS landing page bolted onto the rest of the site.
const C = {
  charcoal: "#1B1917",
  ivory: "#F3EFE6",
  sand: "#EAE2D2",
  terra: "#C1795A",
  terraDeep: "#B4531F",
  gold: "#C6A15B",
  mute: "#8A8378",
};
const fontDisplay = { fontFamily: "var(--font-gloock), Georgia, serif" };
const fontAccent = { fontFamily: "var(--font-iserif), Georgia, serif", fontStyle: "italic" as const };
const fontUI = { fontFamily: "var(--font-isans), system-ui, sans-serif" };

const HEART_PATH = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

// A simplified static radar-chart preview, evoking the real report's
// visual language without embedding the actual (heavier, interactive) chart.
const RADAR_SCORES = [78, 68, 74, 88, 76, 70, 62, 71];
function radarPoints(scores: number[], cx: number, cy: number, maxR: number) {
  return scores
    .map((score, i) => {
      const angle = (-90 + i * (360 / scores.length)) * (Math.PI / 180);
      const r = (score / 100) * maxR;
      return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
    })
    .join(" ");
}
function ReportPreview() {
  const cx = 150, cy = 150, maxR = 110;
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[320px] mx-auto">
      {[0.33, 0.66, 1].map((f) => (
        <circle key={f} cx={cx} cy={cy} r={maxR * f} fill="none" stroke={C.sand} strokeWidth={1} />
      ))}
      {RADAR_SCORES.map((_, i) => {
        const angle = (-90 + i * (360 / RADAR_SCORES.length)) * (Math.PI / 180);
        return (
          <line key={i} x1={cx} y1={cy} x2={cx + maxR * Math.cos(angle)} y2={cy + maxR * Math.sin(angle)} stroke={C.sand} strokeWidth={1} />
        );
      })}
      <polygon points={radarPoints(RADAR_SCORES, cx, cy, maxR)} fill={`${C.terra}33`} stroke={C.terraDeep} strokeWidth={2} />
      {RADAR_SCORES.map((score, i) => {
        const angle = (-90 + i * (360 / RADAR_SCORES.length)) * (Math.PI / 180);
        const r = (score / 100) * maxR;
        return <circle key={i} cx={cx + r * Math.cos(angle)} cy={cy + r * Math.sin(angle)} r={3.5} fill={C.terraDeep} />;
      })}
    </svg>
  );
}

// ── Scroll-reveal wrapper: fade + slide up once a section enters view ──
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Newsletter ──
function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (email) setSubmitted(true); };
  if (submitted) return (
    <div className="text-center py-4">
      <p style={{ ...fontAccent, color: C.terraDeep }}>Welcome to LOVEBetter.</p>
      <p className="text-xs text-[#1B1917]/60 mt-1" style={fontUI}>Check your inbox for your first letter.</p>
    </div>
  );
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address"
        style={fontUI}
        className="flex-1 border border-[#DDD5C4] bg-white px-5 py-4 text-sm text-[#1B1917] placeholder-[#8A8378] focus:outline-none focus:border-[#C1795A]" />
      <button type="submit" style={{ ...fontUI, backgroundColor: C.charcoal, color: C.ivory }} className="px-8 py-4 text-sm font-bold tracking-wide uppercase text-[0.7rem] hover:opacity-90 transition-opacity whitespace-nowrap">
        Join LOVEBetter
      </button>
    </form>
  );
}

// ── FAQ ──
const faqs = [
  { q: "Who are these assessments for?", a: "The Couples Assessment is for partners who want a clinical-grade map of their relational dynamics. The Individual Assessment is for anyone — single, dating, separated, or in a relationship — who wants deep self-knowledge before or during love." },
  { q: "Is this a replacement for therapy?", a: "No — it's the ideal starting point. Our reports give you (and your therapist) a clinical-grade GPS. Most therapists say it saves 4–8 sessions of discovery work.", defaultOpen: true },
  { q: "How long does each assessment take?", a: "The Individual Assessment takes 20–30 minutes. The Couples Assessment takes 30–40 minutes (both partners complete it together). Reports are instant." },
  { q: "What if my results show serious issues?", a: "That's precisely why these tools exist. Clinical flags are surfaced with severity levels, clear context, and a specific treatment pathway designed around your unique profile." },
  { q: "Is my data private?", a: "Yes. Your responses are never stored server-side. The report is generated in your browser and only persists for your session. We take privacy seriously.", defaultOpen: true },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(() => {
    const idx = faqs.findIndex(f => f.defaultOpen);
    return idx >= 0 ? idx : null;
  });
  const [showSticky, setShowSticky] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heartY = useTransform(heroScroll, [0, 1], [0, shouldReduceMotion ? 0 : 110]);
  const heartRotate = useTransform(heroScroll, [0, 1], [-6, shouldReduceMotion ? -6 : -1]);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-500 ${showSticky ? "pb-20" : "pb-0"}`} style={{ backgroundColor: C.ivory }}>

      {/* ── STICKY CTA (warm traffic) ── */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${showSticky ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div style={{ backgroundColor: C.charcoal }} className="px-5 py-3 flex items-center justify-between gap-4 shadow-xl">
            <p className="text-sm hidden sm:block" style={{ ...fontUI, color: C.ivory }}>
              <span className="font-bold" style={{ color: C.gold }}>Done the assessment?</span> Ready to do the work?
            </p>
            <a href="https://calendly.com/folasessions/discovery-call" target="_blank" rel="noopener noreferrer" style={{ ...fontUI, backgroundColor: C.terra, color: "white" }} className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest whitespace-nowrap hover:opacity-90 transition-opacity">
              Book a Discovery Call
            </a>
          </div>
        </div>
      </div>

      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: `${C.ivory}F2`, backdropFilter: "blur(12px)" }}>
        {/* ── BANNER STRIP ── */}
        <div style={{ backgroundColor: C.charcoal }} className="text-center py-2 px-4">
          <Link href="/store" style={{ ...fontUI, color: C.ivory }} className="text-[11px] sm:text-xs tracking-[0.12em] uppercase hover:underline">
            <span className="sm:hidden">New — The Parenting Deck</span>
            <span className="hidden sm:inline">New — The Parenting Deck + The Second Child ebook</span>
          </Link>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between gap-4 border-b" style={{ borderColor: "#DDD5C4" }}>
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-transparent.png" alt="FOLA" className="w-8 h-8 sm:w-10 sm:h-10" />
            <div>
              <p style={{ ...fontDisplay, color: C.charcoal }} className="text-sm sm:text-base leading-none">LoveBetter</p>
              <p style={fontUI} className="text-[8px] sm:text-[9px] text-[#8A8378] tracking-wide mt-0.5 hidden sm:block">Relationship Growth Readiness Assessment</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/the-uncommon-practice" style={{ ...fontUI, color: C.charcoal }} className="text-xs opacity-80 hover:opacity-100 transition-opacity tracking-wide">The Uncommon Practice</Link>
            <Link href="/store" style={{ ...fontUI, color: C.charcoal }} className="text-xs opacity-80 hover:opacity-100 transition-opacity tracking-wide">The Store</Link>
            <Link href="/individual-assessment" style={{ ...fontUI, color: C.charcoal }} className="text-xs opacity-80 hover:opacity-100 transition-opacity tracking-wide">Individual Assessment</Link>
            <Link href="/assessment" style={{ ...fontUI, backgroundColor: C.charcoal, color: C.ivory }} className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest">
              Couples Assessment
            </Link>
          </nav>
          {/* Mobile */}
          <Link href="/assessment" style={{ ...fontUI, backgroundColor: C.charcoal, color: C.ivory }} className="md:hidden text-xs font-bold px-4 py-2 uppercase tracking-wide">
            Start →
          </Link>
        </div>
      </header>

      <main className="pt-[88px] sm:pt-32">

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative px-6 pt-16 pb-8 overflow-hidden">
          <motion.svg
            style={{ y: heartY, rotate: heartRotate }}
            className="absolute -top-10 right-[-120px] w-[560px] h-[560px] pointer-events-none opacity-[0.07] hidden sm:block"
            viewBox="0 0 24 24" fill="none" stroke={C.terraDeep} strokeWidth={0.6}
          >
            <path d={HEART_PATH} />
          </motion.svg>

          <div className="relative mx-auto max-w-5xl text-center">
            <span style={{ ...fontUI, color: C.terraDeep }} className="text-xs uppercase tracking-[0.25em] font-bold">
              Clinical-Grade Relational Diagnostics
            </span>

            <h1 style={fontDisplay} className="mt-5 text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-[#1B1917]">
              Your relationship starts<br />
              <span style={fontAccent}>with who you are.</span>
            </h1>

            <p style={fontUI} className="mt-7 text-lg sm:text-xl text-[#1B1917]/75 max-w-2xl mx-auto leading-relaxed">
              Two clinical-grade assessments. One for the individual who wants to understand their relational wiring. One for the couple who&apos;s done guessing.
            </p>

            {/* Dual CTA */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/individual-assessment"
                className="group w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 border border-[#1B1917]/15 bg-white hover:border-[#1B1917] px-6 py-5 transition-all"
              >
                <div className="text-left">
                  <p style={fontUI} className="text-[10px] text-[#1B1917]/60 uppercase tracking-wider font-bold">Individual</p>
                  <p style={fontDisplay} className="text-lg text-[#1B1917]">Personal Growth Assessment</p>
                  <p style={fontUI} className="text-xs text-[#1B1917]/60 mt-0.5">10 dimensions · R600 · 20–30 min</p>
                </div>
                <svg className="w-5 h-5 text-[#1B1917] group-hover:translate-x-1 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/assessment"
                className="group w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 px-6 py-5 transition-all hover:opacity-90"
                style={{ backgroundColor: C.terraDeep }}
              >
                <div className="text-left">
                  <p style={fontUI} className="text-[10px] text-white/75 uppercase tracking-wider font-bold">Couples</p>
                  <p style={fontDisplay} className="text-lg text-white">Relationship Growth Assessment</p>
                  <p style={fontUI} className="text-xs text-white/80 mt-0.5">8 dimensions · R600 · 30–40 min</p>
                </div>
                <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <p style={fontUI} className="mt-5 text-xs text-[#1B1917]/60">Instant results · 100% private · Clinical-grade accuracy</p>

            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 border border-green-700/20 bg-green-700/5">
              <svg className="w-4 h-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span style={fontUI} className="text-xs text-green-800">7-day money-back guarantee. If your report doesn&apos;t change how you see your relationship, we refund you in full.</span>
            </div>
          </div>
        </section>

        {/* ── ASSESSMENT SHOWCASE + PRICING + BUNDLE ── */}
        <section className="px-6 py-16">
          <Reveal className="mx-auto max-w-7xl">
            <div className="text-center mb-14">
              <span style={{ ...fontUI, color: C.terraDeep }} className="text-xs uppercase tracking-[0.25em] font-bold">Two Paths. One Practice.</span>
              <h2 style={fontDisplay} className="mt-3 text-3xl sm:text-4xl text-[#1B1917]">Which assessment is for you?</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Individual Card */}
              <div className="border border-[#1B1917]/12 bg-white p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span style={{ ...fontUI, color: C.mute }} className="text-[10px] font-bold uppercase tracking-wider">Individual</span>
                    <h3 style={fontDisplay} className="text-2xl text-[#1B1917] mt-1">Personal Growth<br />Assessment</h3>
                  </div>
                  <div className="text-right">
                    <p style={fontDisplay} className="text-2xl text-[#1B1917]">R600</p>
                    <p style={fontUI} className="text-xs text-[#1B1917]/60">One-time</p>
                  </div>
                </div>
                <p style={fontUI} className="text-sm text-[#1B1917]/75 leading-relaxed mb-6">
                  For the person who knows something isn&apos;t working in their love life but can&apos;t quite name it. 10 dimensions of your relational self — clinically mapped, personally interpreted.
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    "Attachment Style — your neurological blueprint",
                    "Trauma History — ACE-informed screening",
                    "Emotional Regulation — your nervous system capacity",
                    "Self-Worth & Identity — the foundation of everything",
                    "Relationship Readiness — are you actually available?",
                    "Communication Style — what's really happening",
                    "Values & Life Vision — your relational compass",
                    "Prejudices & Biases — beliefs you project onto partners",
                    "Neurodivergence Awareness — unseen friction",
                    "Change Readiness — where you actually are",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: C.terraDeep }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <p style={fontUI} className="text-xs text-[#1B1917]/75 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#1B1917]/10">
                  <p style={fontUI} className="text-xs text-[#1B1917]/60">20–30 min · Instant report · PDF download</p>
                  <Link href="/individual-assessment" style={{ ...fontUI, backgroundColor: C.charcoal, color: C.ivory }} className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                    Start →
                  </Link>
                </div>
              </div>

              {/* Couples Card */}
              <div className="border p-8" style={{ borderColor: C.terra, backgroundColor: "#FBF3EF" }}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span style={{ ...fontUI, color: C.terraDeep }} className="text-[10px] font-bold uppercase tracking-wider">Couples</span>
                    <h3 style={fontDisplay} className="text-2xl text-[#1B1917] mt-1">Relationship Growth<br />Assessment</h3>
                  </div>
                  <div className="text-right">
                    <p style={{ ...fontDisplay, color: C.terraDeep }} className="text-2xl">R600</p>
                    <p style={fontUI} className="text-xs text-[#1B1917]/60">Per couple</p>
                  </div>
                </div>
                <p style={fontUI} className="text-sm text-[#1B1917]/75 leading-relaxed mb-6">
                  For couples who are done guessing what&apos;s wrong. A clinical-grade X-ray of both partners across 8 clinical domains — revealing hidden mismatches and a precise 3-phase healing pathway.
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    "Attachment Compatibility — your bonding blueprints side by side",
                    "Trauma Inventory — ACE scores and what they mean for you",
                    "ADHD & Neurodivergence — the friction nobody talks about",
                    "Values Alignment — what matches, what doesn't, what matters",
                    "Change Readiness — are both partners actually ready?",
                    "Communication Patterns — the cycle beneath the argument",
                    "Future Vision Alignment — building toward the same life?",
                    "Prejudices & Biases — beliefs you project onto each other",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: C.terraDeep }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <p style={fontUI} className="text-xs text-[#1B1917]/75 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${C.terra}30` }}>
                  <p style={fontUI} className="text-xs text-[#1B1917]/60">30–40 min · Instant report · PDF download</p>
                  <Link href="/assessment" style={{ ...fontUI, backgroundColor: C.terraDeep, color: "white" }} className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                    Start →
                  </Link>
                </div>
              </div>
            </div>

            {/* Bundle upsell strip */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#1B1917]/12 bg-white px-8 py-6">
              <div>
                <span style={{ ...fontUI, color: C.gold }} className="text-[10px] font-bold uppercase tracking-wider">Best Value</span>
                <p style={fontDisplay} className="text-xl text-[#1B1917] mt-1">Get both for R1,000 <span style={{ color: C.mute, textDecoration: "line-through", fontSize: "0.85em" }}>R1,200</span></p>
              </div>
              <Link href="/bundle-payment" style={{ ...fontUI, backgroundColor: C.charcoal, color: C.ivory }} className="px-6 py-3 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity whitespace-nowrap">
                Get The Complete Bundle →
              </Link>
            </div>
          </Reveal>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="px-6 py-16">
          <Reveal className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <span style={{ ...fontUI, color: C.terraDeep }} className="text-xs uppercase tracking-[0.25em] font-bold">Simple. Rigorous. Instant.</span>
              <h2 style={fontDisplay} className="mt-3 text-3xl text-[#1B1917]">How it works</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Choose your assessment", body: "Individual or couples. Complete the multi-step clinical form at your own pace — designed to be honest, not comfortable." },
                { step: "02", title: "Answer the clinical questionnaire", body: "8 to 10 clinical dimensions—from attachment wiring to trauma history to values alignment, grounded in peer-reviewed research." },
                { step: "03", title: "Receive your clinical report", body: "Instantly. A full Brown University-style PDF with scores, insights, clinical flags, and a personalised treatment pathway." },
              ].map((item) => (
                <div key={item.step} className="border border-[#1B1917]/10 bg-white p-7">
                  <p style={{ ...fontDisplay, color: `${C.terra}50` }} className="text-4xl mb-4">{item.step}</p>
                  <h3 style={fontDisplay} className="text-lg text-[#1B1917] mb-2">{item.title}</h3>
                  <p style={fontUI} className="text-xs text-[#1B1917]/75 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── THE PROBLEM / WHY NOW ── */}
        <section className="px-6 py-20 text-white" style={{ backgroundColor: C.charcoal }}>
          <Reveal className="mx-auto max-w-4xl text-center">
            <span style={{ ...fontUI, color: C.gold }} className="text-xs uppercase tracking-[0.25em] font-bold">The cost of waiting</span>
            <h2 style={fontDisplay} className="mt-4 text-3xl sm:text-5xl leading-tight mb-6">
              Most couples wait <span style={fontAccent}>6 years</span> before getting help.
            </h2>
            <p style={fontUI} className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed mb-10">
              By then, resentment has calcified. Patterns have cemented. And you&apos;re spending R1,500–R2,000 per therapy session just figuring out <em>what</em> the problem is.
              Our assessments do that work in 30 minutes — so you can walk into any session already knowing.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="p-8 text-left" style={{ backgroundColor: C.terraDeep }}>
                <p style={fontDisplay} className="text-5xl text-white leading-none">6 yrs</p>
                <p style={fontUI} className="text-xs text-white/85 mt-2 uppercase tracking-wider font-bold">Average wait before couples seek help</p>
              </div>
              <div className="p-8 text-left bg-white">
                <p style={{ ...fontDisplay, color: C.charcoal }} className="text-5xl leading-none">R1.5–2k</p>
                <p style={fontUI} className="text-xs text-[#1B1917]/70 mt-2 uppercase tracking-wider font-bold">Per session, just to figure out what&apos;s wrong</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="border border-white/15 bg-white/[0.04] p-5">
                <svg className="w-6 h-6 mx-auto mb-3" style={{ color: C.gold }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9a8 8 0 0114-4.5M19.5 15a8 8 0 01-14 4.5" />
                </svg>
                <p style={fontUI} className="text-xs text-white/80 leading-relaxed">Same argument, different day. You&apos;re stuck in the loop.</p>
              </div>
              <div className="border border-white/15 bg-white/[0.04] p-5">
                <svg className="w-6 h-6 mx-auto mb-3" style={{ color: C.gold }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
                  <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
                  <path strokeLinecap="round" d="M8.5 14.5 Q12 17 15.5 14.5" />
                </svg>
                <p style={fontUI} className="text-xs text-white/80 leading-relaxed">Disconnected but can&apos;t explain why.</p>
              </div>
              <div className="border border-white/15 bg-white/[0.04] p-5">
                <svg className="w-6 h-6 mx-auto mb-3" style={{ color: C.gold }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L4 10l5-5M4 10h11a4 4 0 010 8h-1" />
                </svg>
                <p style={fontUI} className="text-xs text-white/80 leading-relaxed">You keep choosing the wrong person.</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── YOUR REPORT (real preview + frameworks) ── */}
        <section className="px-6 py-16">
          <Reveal className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <span style={{ ...fontUI, color: C.terraDeep }} className="text-xs uppercase tracking-[0.25em] font-bold">Not Guesswork</span>
              <h2 style={fontDisplay} className="mt-3 text-3xl sm:text-4xl text-[#1B1917]">A real report, not a personality quiz</h2>
              <p style={fontUI} className="mt-3 text-[#1B1917]/75 text-sm max-w-2xl mx-auto leading-relaxed">
                Every dimension we score maps to a named, peer-reviewed clinical framework — the same ones used in couples and individual therapy rooms.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center border border-[#1B1917]/10 bg-white p-8 sm:p-10">
              <div>
                <p style={{ ...fontUI, color: C.mute }} className="text-[10px] uppercase tracking-wider font-bold mb-2 text-center md:text-left">Sample · Overall Growth Score</p>
                <ReportPreview />
                <p style={{ ...fontDisplay, color: C.terraDeep }} className="text-4xl text-center md:text-left mt-2">72<span className="text-lg" style={{ color: C.mute }}>/100</span></p>
              </div>
              <div className="space-y-5">
                {[
                  { name: "Attachment Theory", body: "Bowlby and Ainsworth's research on how early bonds shape adult relational patterns." },
                  { name: "The Gottman Method", body: "Four decades of research on what predicts relationship success and failure — our clinical risk flags." },
                  { name: "Emotionally Focused Therapy (EFT)", body: "Sue Johnson's framework for de-escalating conflict cycles — the lens behind our fracture point analysis." },
                ].map((item) => (
                  <div key={item.name} className="border-l-2 pl-4" style={{ borderColor: C.terra }}>
                    <p style={fontDisplay} className="text-base text-[#1B1917]">{item.name}</p>
                    <p style={fontUI} className="text-xs text-[#1B1917]/70 mt-1 leading-relaxed">{item.body}</p>
                  </div>
                ))}
                <p style={fontUI} className="text-[11px] text-[#1B1917]/60 pt-2">
                  We also draw on ACE research for trauma scoring and current neurodivergence literature for our ADHD screening domain. Full citations are included in every report.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── THE STORE / SWAP CARDS TEASER ── */}
        <section className="px-6 py-16">
          <Reveal className="mx-auto max-w-4xl">
            <div className="grid md:grid-cols-12 gap-8 items-center border border-[#1B1917]/10 bg-white p-10">
              <div className="md:col-span-8 space-y-4 text-left">
                <span style={{ ...fontUI, color: C.terraDeep }} className="text-xs uppercase tracking-[0.25em] font-bold">Now Available in our Store</span>
                <h2 style={fontDisplay} className="text-3xl text-[#1B1917]">The Romantic Couples Deck</h2>
                <p style={fontUI} className="text-sm text-[#1B1917]/75 leading-relaxed">
                  52 deep-question swap cards across four tiers — warm-up, mechanics, inner rooms, and future mapping. Built by Hakeem to help couples bypass small talk and map their relational dynamics honestly.
                </p>
                <div className="pt-2">
                  <Link href="/store" style={{ ...fontUI, backgroundColor: C.terraDeep, color: "white" }} className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                    Explore the Store →
                  </Link>
                </div>
              </div>
              <div className="md:col-span-4 flex justify-center">
                <div className="w-48 bg-[#1B1917] p-5 aspect-[70/110] flex flex-col justify-between shadow-lg relative border border-[#DDD5C4]/10">
                  <div className="flex justify-end">
                    <span className="text-[7px] uppercase tracking-wider text-[#C1795A] border border-[#C1795A]/30 px-2 py-0.5 font-sans">
                      04 — Going
                    </span>
                  </div>
                  <div>
                    <div className="w-8 border-t border-[#C1795A] mb-3" />
                    <p className="font-serif italic text-xl text-[#F3EFE6] leading-tight">
                      Why do you <span className="text-[#C1795A]">stay?</span>
                    </p>
                  </div>
                  <div className="border-t border-[#8A8378]/30 pt-2 flex justify-between text-[6px] tracking-wider text-[#8A8378] font-sans">
                    <span>Romantic Deck</span>
                    <span>52 / 52</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── FAQ ── */}
        <section className="px-6 py-16">
          <Reveal className="mx-auto max-w-2xl">
            <div className="text-center mb-10">
              <h2 style={fontDisplay} className="text-3xl text-[#1B1917]">Questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border transition-all" style={{ borderColor: openFaq === i ? C.terra : "#1B191720", backgroundColor: openFaq === i ? "#FBF3EF" : "white" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
                    <span style={fontUI} className="text-sm font-bold text-[#1B1917]">{faq.q}</span>
                    <svg className={`w-4 h-4 text-[#1B1917]/60 shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[300px] opacity-100 pb-5 px-6" : "max-h-0 opacity-0 px-6"}`}>
                    <p style={fontUI} className="text-sm text-[#1B1917]/75 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── KNOWLEDGE: BLOG + NEWSLETTER ── */}
        <section className="px-6 py-16">
          <Reveal className="mx-auto max-w-2xl text-center border border-[#1B1917]/10 bg-white p-10">
            <span style={{ ...fontUI, color: C.terraDeep }} className="text-xs uppercase tracking-[0.25em] font-bold">Knowledge first</span>
            <h2 style={fontDisplay} className="mt-3 text-2xl sm:text-3xl text-[#1B1917] mb-3">The Uncommon Practice</h2>
            <p style={fontUI} className="text-sm text-[#1B1917]/75 max-w-lg mx-auto leading-relaxed mb-6">
              10 essays on love, neuroscience, and what actually makes relationships work — written by Hakeem. Plus a bi-weekly letter with the same rigour, delivered straight to your inbox.
            </p>
            <Link href="/the-uncommon-practice" style={{ ...fontUI, color: C.charcoal, borderColor: "#1B1917" }} className="inline-flex items-center gap-2 border px-7 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#1B1917] hover:text-white transition-all mb-8">
              Read the essays →
            </Link>
            <NewsletterSignup />
          </Reveal>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="px-6 py-24 text-white overflow-hidden relative" style={{ backgroundColor: C.charcoal }}>
          <svg className="absolute -bottom-24 -right-24 w-[500px] h-[500px] pointer-events-none opacity-[0.08]" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth={0.5}>
            <path d={HEART_PATH} />
          </svg>
          <Reveal className="relative mx-auto max-w-3xl text-center">
            <h2 style={fontDisplay} className="text-4xl sm:text-6xl leading-tight mb-4">
              The most important relationship<br />
              <span style={{ ...fontAccent, color: C.terra }}>is the one with yourself.</span>
            </h2>
            <p style={fontUI} className="text-sm text-white/70 max-w-lg mx-auto mb-10 leading-relaxed">
              Start there. Then build the relationship you actually deserve.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/individual-assessment" style={fontUI} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/25 bg-white/5 px-7 py-4 text-sm font-bold text-white hover:bg-white/10 transition-all">
                Individual Assessment — R600
              </Link>
              <Link href="/assessment" style={{ ...fontUI, backgroundColor: C.terraDeep }} className="w-full sm:w-auto flex items-center justify-center gap-2 text-white px-7 py-4 text-sm font-bold hover:opacity-90 transition-all">
                Couples Assessment — R600 →
              </Link>
            </div>
          </Reveal>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t px-6 py-10" style={{ borderColor: "#1B191715" }}>
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#1B1917]/70">
          <div className="flex items-center gap-3" style={fontUI}>
            <img src="/logo-transparent.png" alt="FOLA" className="w-6 h-6" />
            <span>© {new Date().getFullYear()} LoveBetter · Relationship Growth Readiness Assessment · All assessments R600</span>
          </div>
          <nav className="flex items-center gap-6" style={fontUI}>
            <Link href="/individual-assessment" className="hover:text-[#1B1917] transition-colors">Individual Assessment</Link>
            <Link href="/assessment" className="hover:text-[#1B1917] transition-colors">Couples Assessment</Link>
            <Link href="/store" className="hover:opacity-80 transition-colors font-bold" style={{ color: C.terraDeep }}>The Store</Link>
            <Link href="/the-uncommon-practice" className="hover:text-[#1B1917] transition-colors">The Uncommon Practice</Link>
            <a href="https://calendly.com/folasessions/discovery-call" target="_blank" rel="noopener noreferrer" className="hover:text-[#1B1917] transition-colors">Book a Call</a>
            <Link href="/partners" className="hover:text-[#1B1917] transition-colors">For Professionals</Link>
            <Link href="/privacy" className="hover:text-[#1B1917] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#1B1917] transition-colors">Terms of Service</Link>
          </nav>
        </div>
        <div className="mx-auto max-w-7xl mt-6 pt-6 border-t text-center" style={{ borderColor: "#1B191710" }}>
          <p style={fontUI} className="text-[10px] text-[#1B1917]/60 tracking-[0.05em]">
            Made Possible By{" "}
            <Link href="/angels" className="font-bold hover:opacity-80 transition-colors" style={{ color: C.terraDeep }}>
              FOLA Angels
            </Link>
            : Melitah Motlhale
          </p>
        </div>
      </footer>

    </div>
  );
}
