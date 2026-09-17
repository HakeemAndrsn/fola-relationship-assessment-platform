"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// ── Brand tokens ──
// A bold, saturated coral pulled from the actual logo mark, and true black —
// replacing the muted terracotta/soft-charcoal palette and soft blurred
// gradients with flat, confident color blocks.
const CORAL = "#FF4436";
const CORAL_DARK = "#E62D1F";
const INK = "#0A0A0A";

const HEART_PATH = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

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
function NewsletterSignup({ variant = "default" }: { variant?: "default" | "inline" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (email) setSubmitted(true); };
  if (submitted) return (
    <div className="text-center py-4">
      <p className="font-sans font-black" style={{ color: CORAL }}>Welcome to LOVEBetter.</p>
      <p className="text-xs text-card-foreground/80 mt-1 font-sans">Check your inbox for your first letter.</p>
    </div>
  );
  if (variant === "inline") return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
        className="flex-1 rounded-lg border-2 border-[#0A0A0A]/15 bg-white px-4 py-3 text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-[#0A0A0A]/40 font-sans" />
      <button type="submit" className="bg-[#0A0A0A] text-white px-6 py-3 rounded-lg text-sm font-black font-sans hover:bg-black transition-all whitespace-nowrap">
        Subscribe
      </button>
    </form>
  );
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address"
        className="flex-1 rounded-xl border-2 border-[#0A0A0A]/15 bg-white px-5 py-4 text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-[#0A0A0A]/40 font-sans" />
      <button type="submit" className="bg-[#0A0A0A] text-white px-8 py-4 rounded-xl text-sm font-black font-sans hover:bg-black transition-all whitespace-nowrap">
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
  const heartY = useTransform(heroScroll, [0, 1], [0, shouldReduceMotion ? 0 : 120]);
  const heartRotate = useTransform(heroScroll, [0, 1], [-8, shouldReduceMotion ? -8 : -2]);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`min-h-screen bg-[#FAF7F2] text-card-foreground transition-all duration-500 ${showSticky ? "pb-20" : "pb-0"}`}>

      {/* ── STICKY CTA (warm traffic) ── */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${showSticky ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="bg-[#0A0A0A] rounded-2xl px-5 py-3 flex items-center justify-between gap-4 shadow-xl">
            <p className="text-sm text-white font-sans hidden sm:block">
              <span className="font-black" style={{ color: CORAL }}>Done the assessment?</span> Ready to do the work?
            </p>
            <a href="https://calendly.com/folasessions/discovery-call" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-xs font-black font-sans transition-all whitespace-nowrap" style={{ backgroundColor: CORAL }}>
              Book a Discovery Call
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#FAF7F2]/90 border-b-2 border-[#0A0A0A]/10">
        {/* ── BANNER STRIP ── */}
        <div className="text-center py-2.5 px-4" style={{ backgroundColor: INK }}>
          <Link href="/store" className="text-xs font-black font-sans tracking-[0.1em] uppercase hover:underline flex items-center justify-center gap-1.5 text-white">
            New — The Parenting Deck + The Second Child ebook
            <svg className="w-3.5 h-3.5 shrink-0" style={{ color: CORAL }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo-transparent.png" alt="FOLA" className="w-10 h-10 rounded-lg" />
              <div>
                <p className="text-sm font-black text-[#0A0A0A] tracking-tight font-sans leading-none">LoveBetter</p>
                <p className="text-[9px] text-card-foreground/70 tracking-wide font-sans mt-0.5">Relationship Growth Readiness Assessment</p>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/the-uncommon-practice" className="text-xs text-card-foreground hover:text-[#0A0A0A] transition-colors font-sans font-bold tracking-wide">The Uncommon Practice</Link>
            <Link href="/store" className="text-xs text-card-foreground/80 hover:text-[#0A0A0A] transition-colors font-sans font-bold tracking-wide">The Store</Link>
            <Link href="/individual-assessment" className="text-xs text-card-foreground/80 hover:text-[#0A0A0A] transition-colors font-sans font-bold tracking-wide">Individual Assessment</Link>
            <Link href="/assessment" className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-5 py-2.5 rounded-lg text-xs font-black font-sans hover:bg-black transition-all tracking-wide">
              Couples Assessment
            </Link>
          </nav>
          {/* Mobile */}
          <Link href="/assessment" className="md:hidden inline-flex items-center gap-1.5 bg-[#0A0A0A] text-white px-4 py-2 rounded-lg text-xs font-black font-sans">
            Start →
          </Link>
        </div>
      </header>

      <main className="pt-32">

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative px-6 pt-16 pb-8 overflow-hidden">
          {/* Bold heart-outline watermark — drifts at a different rate than scroll */}
          <motion.svg
            style={{ y: heartY, rotate: heartRotate }}
            className="absolute -top-10 right-[-120px] w-[560px] h-[560px] pointer-events-none opacity-[0.06] hidden sm:block"
            viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth={0.6}
          >
            <path d={HEART_PATH} />
          </motion.svg>

          <div className="relative mx-auto max-w-5xl text-center">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-10" style={{ backgroundColor: INK }}>
              <span className="text-xs font-black tracking-[0.15em] uppercase font-sans" style={{ color: CORAL }}>
                Clinical-Grade Relational Diagnostics
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#0A0A0A] leading-[0.98] tracking-tight font-sans uppercase">
              Your relationship starts<br />
              <span style={{ color: CORAL }}>with who you are.</span>
            </h1>

            <p className="mt-7 text-lg sm:text-xl text-card-foreground/80 max-w-2xl mx-auto leading-relaxed font-sans">
              Two clinical-grade assessments. One for the individual who wants to understand their relational wiring. One for the couple who&apos;s done guessing.
            </p>

            {/* Dual CTA */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/individual-assessment"
                className="group w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 rounded-2xl border-2 border-[#0A0A0A] bg-white hover:bg-[#0A0A0A] px-6 py-5 transition-all"
              >
                <div className="text-left">
                  <p className="text-[10px] text-card-foreground/60 group-hover:text-white/60 uppercase tracking-wider font-sans font-bold transition-colors">Individual</p>
                  <p className="text-base font-black text-[#0A0A0A] group-hover:text-white font-sans transition-colors">Personal Growth Assessment</p>
                  <p className="text-xs text-card-foreground/70 group-hover:text-white/70 font-sans mt-0.5 transition-colors">10 dimensions · R600 · 20–30 min</p>
                </div>
                <svg className="w-5 h-5 text-[#0A0A0A] group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/assessment"
                className="group w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 rounded-2xl px-6 py-5 transition-all hover:brightness-90"
                style={{ backgroundColor: CORAL }}
              >
                <div className="text-left">
                  <p className="text-[10px] text-white/80 uppercase tracking-wider font-sans font-bold">Couples</p>
                  <p className="text-base font-black text-white font-sans">Relationship Growth Assessment</p>
                  <p className="text-xs text-white/85 font-sans mt-0.5">8 dimensions · R600 · 30–40 min</p>
                </div>
                <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <p className="mt-5 text-xs text-card-foreground/60 font-sans">Instant results · 100% private · Clinical-grade accuracy</p>

            {/* Refund Guarantee Badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-green-700/20 bg-green-700/5">
              <svg className="w-4 h-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-green-800 font-sans font-semibold">7-day money-back guarantee. If your report doesn't change how you see your relationship, we refund you in full.</span>
            </div>
          </div>
        </section>

        {/* ── DUAL ASSESSMENT SHOWCASE ── */}
        <section className="px-6 py-16">
          <Reveal className="mx-auto max-w-7xl">
            <div className="text-center mb-14">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] font-sans mb-3" style={{ color: CORAL }}>Two Paths. One Practice.</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] font-sans uppercase">Which assessment is for you?</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">

              {/* Individual Card */}
              <div className="group relative rounded-2xl border-2 border-[#0A0A0A]/10 bg-white p-8 hover:border-[#0A0A0A] transition-all overflow-hidden">
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3" style={{ backgroundColor: INK }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        <span className="text-[10px] text-white font-black uppercase tracking-wider font-sans">Individual</span>
                      </div>
                      <h3 className="text-2xl font-black text-[#0A0A0A] font-sans">Personal Growth<br />Assessment</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-[#0A0A0A] font-sans">R600</p>
                      <p className="text-xs text-card-foreground/60 font-sans">One-time</p>
                    </div>
                  </div>

                  <p className="text-sm text-card-foreground/80 leading-relaxed font-sans mb-6">
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
                        <svg className="w-3.5 h-3.5 text-[#0A0A0A] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-xs text-card-foreground/80 font-sans leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t-2 border-[#0A0A0A]/10">
                    <p className="text-xs text-card-foreground/60 font-sans">20–30 min · Instant report · PDF download</p>
                    <Link href="/individual-assessment" className="flex items-center gap-2 bg-[#0A0A0A] text-white px-5 py-2.5 rounded-xl text-xs font-black font-sans hover:bg-black transition-all">
                      Start Your Assessment →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Couples Card */}
              <div className="group relative rounded-2xl border-2 transition-all overflow-hidden" style={{ borderColor: CORAL, backgroundColor: "#FFF1EF" }}>
                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3" style={{ backgroundColor: CORAL }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        <span className="text-[10px] text-white font-black uppercase tracking-wider font-sans">Couples</span>
                      </div>
                      <h3 className="text-2xl font-black text-[#0A0A0A] font-sans">Relationship Growth<br />Assessment</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black font-sans" style={{ color: CORAL }}>R600</p>
                      <p className="text-xs text-card-foreground/60 font-sans">Per couple</p>
                    </div>
                  </div>

                  <p className="text-sm text-card-foreground/80 leading-relaxed font-sans mb-6">
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
                        <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: CORAL }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-xs text-card-foreground/80 font-sans leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t-2" style={{ borderColor: `${CORAL}30` }}>
                    <p className="text-xs text-card-foreground/60 font-sans">30–40 min · Instant report · PDF download</p>
                    <Link href="/assessment" className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-xs font-black font-sans transition-all hover:brightness-90" style={{ backgroundColor: CORAL }}>
                      Start Your Assessment →
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </Reveal>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="px-6 py-16">
          <Reveal className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] font-sans mb-3" style={{ color: CORAL }}>Simple. Rigorous. Instant.</p>
              <h2 className="text-3xl font-black text-[#0A0A0A] font-sans uppercase">How it works</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Choose your assessment", body: "Individual or couples. Complete the multi-step clinical form at your own pace — designed to be honest, not comfortable." },
                { step: "02", title: "Answer the clinical questionnaire", body: "8 to 10 clinical dimensions—from attachment wiring to trauma history to values alignment, grounded in peer-reviewed research." },
                { step: "03", title: "Receive your clinical report", body: "Instantly. A full Brown University-style PDF with scores, insights, clinical flags, and a personalised treatment pathway." },
              ].map((item) => (
                <div key={item.step} className="relative rounded-2xl border-2 border-[#0A0A0A]/10 bg-white p-7 hover:border-[#0A0A0A]/30 transition-all">
                  <p className="text-4xl font-black font-sans mb-4" style={{ color: `${CORAL}30` }}>{item.step}</p>
                  <h3 className="text-base font-black text-[#0A0A0A] font-sans mb-2">{item.title}</h3>
                  <p className="text-xs text-card-foreground/80 leading-relaxed font-sans">{item.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── CLINICAL FRAMEWORKS ── */}
        <section className="px-6 py-16" style={{ backgroundColor: "#F2EBE3" }}>
          <Reveal className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] font-sans mb-3" style={{ color: CORAL }}>Not Guesswork</p>
              <h2 className="text-3xl font-black text-[#0A0A0A] font-sans uppercase">Grounded in the frameworks clinicians already trust</h2>
              <p className="mt-3 text-card-foreground/80 text-sm max-w-2xl mx-auto font-sans leading-relaxed">
                FOLA isn&apos;t a personality quiz wearing a lab coat. Every dimension we score maps to a named, peer-reviewed clinical framework — the same ones used in couples and individual therapy rooms.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  name: "Attachment Theory",
                  body: "Bowlby and Ainsworth's research on how early bonds shape adult relational patterns. We score attachment style directly, and weight its influence across every other domain.",
                },
                {
                  name: "The Gottman Method",
                  body: "Four decades of Dr. John Gottman's research on what predicts relationship success and failure — including the physiological and communication markers we flag as clinical risk indicators.",
                },
                {
                  name: "Emotionally Focused Therapy (EFT)",
                  body: "Sue Johnson's framework for de-escalating conflict cycles by identifying the attachment fears underneath them — the lens behind our critical fracture point analysis.",
                },
              ].map((item) => (
                <div key={item.name} className="rounded-2xl border-2 border-[#0A0A0A]/10 bg-white p-7">
                  <h3 className="text-base font-black text-[#0A0A0A] font-sans mb-2">{item.name}</h3>
                  <p className="text-xs text-card-foreground/80 leading-relaxed font-sans">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-card-foreground/60 font-sans max-w-2xl mx-auto">
              We also draw on ACE (Adverse Childhood Experiences) research for trauma scoring and current neurodivergence literature for our ADHD screening domain. Full citations are included in every clinical report.
            </p>
          </Reveal>
        </section>


        {/* ── PROBLEM / WHY NOW ── */}
        <section className="px-6 py-20 text-white" style={{ backgroundColor: INK }}>
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] font-sans mb-4" style={{ color: CORAL }}>The cost of waiting</p>
            <h2 className="text-3xl sm:text-5xl font-black font-sans uppercase mb-6 leading-[0.95]">
              Most couples wait <span style={{ color: CORAL }}>6 years</span> before getting help.
            </h2>
            <p className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed font-sans mb-10">
              By then, resentment has calcified. Patterns have cemented. And you&apos;re spending R1,500–R2,000 per therapy session just figuring out <em>what</em> the problem is.
              Our assessments do that work in 30 minutes — so you can walk into any session already knowing.
            </p>

            {/* Bold stat blocks */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="rounded-2xl p-8 text-left" style={{ backgroundColor: CORAL }}>
                <p className="text-5xl font-black font-sans text-white leading-none">6 YRS</p>
                <p className="text-xs text-white/85 font-sans mt-2 uppercase tracking-wider font-bold">Average wait before couples seek help</p>
              </div>
              <div className="rounded-2xl p-8 text-left bg-white">
                <p className="text-5xl font-black font-sans text-[#0A0A0A] leading-none">R1.5–2K</p>
                <p className="text-xs text-[#0A0A0A]/70 font-sans mt-2 uppercase tracking-wider font-bold">Per session, just to figure out what&apos;s wrong</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "M12 8v4m0 4h.01", text: "Same argument, different day. You're stuck in the loop." },
                { icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636", text: "Disconnected but can't explain why." },
                { icon: "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5", text: "You keep choosing the wrong person." },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border-2 border-white/15 bg-white/[0.04] p-5">
                  <svg className="w-5 h-5 mx-auto mb-3" style={{ color: CORAL }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <p className="text-xs text-white/80 font-sans leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── WHAT'S IN THE REPORT ── */}
        <section className="px-6 py-16">
          <Reveal className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] font-sans mb-3" style={{ color: CORAL }}>Clinical depth. Real answers.</p>
              <h2 className="text-3xl font-black text-[#0A0A0A] font-sans uppercase">What&apos;s inside your report</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Overall Growth Score", desc: "A weighted composite score with a visual gauge and contextual interpretation." },
                { icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z", title: "Radar & Bar Charts", desc: "Research-grade visual charts of all dimensions for immediate pattern recognition." },
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "Clinical Flags", desc: "High/medium/low severity flags with specific recommendations for each issue found." },
                { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", title: "3-Phase Treatment Plan", desc: "Session-by-session recommendations with pricing for a full clinical pathway." },
                { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", title: "Deep Domain Analysis", desc: "Neuroscience-informed interpretation of every dimension in plain language." },
                { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", title: "Journal Prompts & Action Items", desc: "Pre-session prompts and a concrete checklist for your next 30 days." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border-2 border-[#0A0A0A]/10 bg-white p-6 hover:border-[#0A0A0A]/30 transition-all group">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: INK }}>
                    <svg className="w-4.5 h-4.5" style={{ color: CORAL }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-sm font-black text-[#0A0A0A] font-sans mb-2">{item.title}</h3>
                  <p className="text-xs text-card-foreground/80 leading-relaxed font-sans">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── PRICING ── */}
        <section className="px-6 py-16">
          <Reveal className="mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] font-sans mb-3" style={{ color: CORAL }}>Transparent pricing</p>
              <h2 className="text-3xl font-black text-[#0A0A0A] font-sans uppercase">Simple. Worth it.</h2>
              <p className="mt-3 text-sm text-card-foreground/80 font-sans">Compare that to R1,500–R2,000 per therapy session, just to figure out what to work on.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  tag: "Individual", price: "R600", href: "/individual-assessment",
                  features: ["10 clinical dimensions", "Personal growth score", "Clinical flags & insights", "3-phase treatment pathway", "Full PDF report", "Love language + Attachment profile"],
                  tagBg: INK,
                },
                {
                  tag: "Couples", price: "R600", href: "/assessment",
                  features: ["8 clinical domains", "Partner comparison charts", "Alignment percentage per domain", "ACE + ADHD screening", "Clinical risk matrix", "3-phase couples pathway"],
                  tagBg: CORAL,
                },
              ].map((item) => (
                <div key={item.tag} className="rounded-2xl border-2 border-[#0A0A0A]/10 bg-white p-7">
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider font-sans text-white" style={{ backgroundColor: item.tagBg }}>{item.tag}</span>
                    <p className="text-2xl font-black text-[#0A0A0A] font-sans">{item.price}</p>
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-xs text-card-foreground/80 font-sans">
                        <svg className="w-3.5 h-3.5 shrink-0" style={{ color: CORAL }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={item.href} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-black font-sans transition-all hover:brightness-90 bg-[#0A0A0A] text-white">
                    Start Your Assessment →
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── BUNDLE OFFER ── */}
        <section className="px-6 py-8">
          <Reveal className="mx-auto max-w-3xl">
            <div className="rounded-2xl p-8 text-center relative overflow-hidden text-white" style={{ backgroundColor: CORAL }}>
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[10px] font-black uppercase tracking-wider font-sans mb-4" style={{ color: CORAL_DARK }}>
                  Best Value
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-sans uppercase mb-2">The Complete Growth Bundle</h2>
                <p className="text-sm text-white/85 max-w-lg mx-auto leading-relaxed font-sans mb-4">
                  Both assessments. One price. Start with the Individual to understand your wiring, then bring your partner into the Couples assessment with a shared language.
                </p>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <p className="text-3xl font-black font-sans">R1,000</p>
                  <p className="text-sm text-white/60 font-sans line-through">R1,200</p>
                  <span className="text-[10px] text-white font-black font-sans px-2 py-0.5 rounded-full bg-white/20 border-2 border-white/30">Save R200</span>
                </div>
                <Link href="/bundle-payment" className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-8 py-3.5 rounded-xl text-sm font-black font-sans hover:bg-black transition-all">
                  Get The Complete Bundle — R1,000
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <p className="mt-3 text-[10px] text-white/70 font-sans">Pay R1,000 once, get access to both Individual and Couples assessments</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── THE STORE / SWAP CARDS TEASER ── */}
        <section className="px-6 py-16">
          <Reveal className="mx-auto max-w-4xl">
            <div className="grid md:grid-cols-12 gap-8 items-center rounded-2xl border-2 border-[#0A0A0A]/10 bg-white p-10">
              <div className="md:col-span-8 space-y-4 text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] font-sans" style={{ color: CORAL }}>Now Available in our Store</p>
                <h2 className="text-3xl font-black text-[#0A0A0A] font-sans uppercase">The Romantic Couples Deck</h2>
                <p className="text-sm text-card-foreground/80 leading-relaxed font-sans">
                  52 deep-question swap cards across four tiers — warm-up, mechanics, inner rooms, and future mapping. Built by Hakeem to help couples bypass small talk and map their relational dynamics honestly.
                </p>
                <div className="pt-2">
                  <Link href="/store" className="inline-flex items-center gap-2 rounded-xl text-white px-7 py-3.5 text-sm font-black font-sans transition-all hover:brightness-90" style={{ backgroundColor: CORAL }}>
                    Explore the Store
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="md:col-span-4 flex justify-center">
                {/* Visual miniature of card 52 */}
                <div className="w-48 bg-[#1B1917] p-5 aspect-[70/110] flex flex-col justify-between shadow-lg relative border border-[#DDD5C4]/10 rounded-sm">
                  <div className="flex justify-end">
                    <span className="text-[7px] uppercase tracking-wider text-[#C1795A] border border-[#C1795A]/30 px-2 py-0.5 rounded-full font-sans">
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

        {/* ── BLOG TEASER ── */}
        <section className="px-6 py-16">
          <Reveal className="mx-auto max-w-4xl">
            <div className="rounded-2xl border-2 border-[#0A0A0A]/10 bg-white p-10 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] font-sans mb-3" style={{ color: CORAL }}>Knowledge first</p>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] font-sans uppercase mb-3">The Uncommon Practice</h2>
              <p className="text-sm text-card-foreground/80 max-w-lg mx-auto leading-relaxed font-sans mb-7">
                10 extensive essays on love, neuroscience, and what actually makes relationships work — written by Hakeem with the rigour of a researcher and the voice of someone who&apos;s seen it all.
              </p>
              <Link href="/the-uncommon-practice" className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0A0A0A] bg-white px-7 py-3.5 text-sm text-[#0A0A0A] font-sans font-black hover:bg-[#0A0A0A] hover:text-white transition-all">
                Read the essays
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </section>

        {/* ── FAQ ── */}
        <section className="px-6 py-16">
          <Reveal className="mx-auto max-w-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-[#0A0A0A] font-sans uppercase">Questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl border-2 transition-all" style={{ borderColor: openFaq === i ? CORAL : "rgba(10,10,10,0.1)", backgroundColor: openFaq === i ? "#FFF1EF" : "white" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
                    <span className="text-sm font-black text-[#0A0A0A] font-sans">{faq.q}</span>
                    <svg className={`w-4 h-4 text-card-foreground/60 shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[300px] opacity-100 pb-5 px-6" : "max-h-0 opacity-0 px-6"}`}>
                    <p className="text-sm text-card-foreground/80 leading-relaxed font-sans">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="px-6 py-16">
          <Reveal className="mx-auto max-w-xl text-center">
            <div className="rounded-2xl border-2 border-[#0A0A0A]/10 bg-white p-10">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] font-sans mb-3" style={{ color: CORAL }}>Free · Valuable · Honest</p>
              <h2 className="text-2xl font-black text-[#0A0A0A] font-sans uppercase mb-2">The LOVEBetter Newsletter</h2>
              <p className="text-sm text-card-foreground/80 mb-7 font-sans leading-relaxed">
                Neuroscience, attachment theory, and hard-won insights on love — delivered bi-weekly by Hakeem. No fluff. No algorithm. Just the real work.
              </p>
              <NewsletterSignup />
            </div>
          </Reveal>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="px-6 py-24 text-white overflow-hidden relative" style={{ backgroundColor: INK }}>
          <svg className="absolute -bottom-24 -right-24 w-[500px] h-[500px] pointer-events-none opacity-[0.08]" viewBox="0 0 24 24" fill="none" stroke={CORAL} strokeWidth={0.5}>
            <path d={HEART_PATH} />
          </svg>
          <Reveal className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-4xl sm:text-6xl font-black font-sans uppercase mb-4 leading-[0.95]">
              The most important relationship<br />
              <span style={{ color: CORAL }}>is the one with yourself.</span>
            </h2>
            <p className="text-sm text-white/70 font-sans max-w-lg mx-auto mb-10 leading-relaxed">
              Start there. Then build the relationship you actually deserve.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/individual-assessment" className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border-2 border-white/25 bg-white/5 px-7 py-4 text-sm font-black text-white font-sans hover:bg-white/10 transition-all">
                Individual Assessment — R600
              </Link>
              <Link href="/assessment" className="w-full sm:w-auto flex items-center justify-center gap-2 text-white px-7 py-4 rounded-xl text-sm font-black font-sans transition-all hover:brightness-110" style={{ backgroundColor: CORAL }}>
                Couples Assessment — R600
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t-2 border-[#0A0A0A]/10 px-6 py-10">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-card-foreground/75 font-sans">
          <div className="flex items-center gap-3">
            <img src="/logo-transparent.png" alt="FOLA" className="w-6 h-6 rounded" />
            <span className="font-medium">© {new Date().getFullYear()} LoveBetter · Relationship Growth Readiness Assessment · All assessments R600</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/individual-assessment" className="hover:text-[#0A0A0A] transition-colors font-bold">Individual Assessment</Link>
            <Link href="/assessment" className="hover:text-[#0A0A0A] transition-colors font-bold">Couples Assessment</Link>
            <Link href="/store" className="hover:opacity-80 transition-colors font-black" style={{ color: CORAL }}>The Store</Link>
            <Link href="/the-uncommon-practice" className="hover:text-[#0A0A0A] transition-colors font-bold">The Uncommon Practice</Link>
            <a href="https://calendly.com/folasessions/discovery-call" target="_blank" rel="noopener noreferrer" className="hover:text-[#0A0A0A] transition-colors font-bold">Book a Call</a>
            <Link href="/partners" className="hover:text-[#0A0A0A] transition-colors font-bold">For Professionals</Link>
            <Link href="/privacy" className="hover:text-[#0A0A0A] transition-colors font-bold">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#0A0A0A] transition-colors font-bold">Terms of Service</Link>
          </nav>
        </div>
        <div className="mx-auto max-w-7xl mt-6 pt-6 border-t-2 border-[#0A0A0A]/5 text-center">
          <p className="text-[10px] text-card-foreground/60 font-sans tracking-[0.05em]">
            Made Possible By{" "}
            <Link href="/angels" className="font-black hover:opacity-80 transition-colors" style={{ color: CORAL }}>
              FOLA Angels
            </Link>
            : Melitah Motlhale
          </p>
        </div>
      </footer>

    </div>
  );
}
