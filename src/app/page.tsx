"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

// ── Animated counter ──
function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// ── Newsletter ──
function NewsletterSignup({ variant = "default" }: { variant?: "default" | "inline" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (email) setSubmitted(true); };
  if (submitted) return (
    <div className="text-center py-4">
      <p className="text-[#d4af37] font-serif italic">Welcome to LOVEBetter.</p>
      <p className="text-xs text-[#718096] mt-1 font-sans">Check your inbox for your first letter.</p>
    </div>
  );
  if (variant === "inline") return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:border-[#d4af37]/50 font-sans" />
      <button type="submit" className="bg-[#d4af37] text-[#1a365d] px-6 py-3 rounded-lg text-sm font-bold font-sans hover:bg-[#e4bf47] transition-all whitespace-nowrap">
        Subscribe
      </button>
    </form>
  );
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address"
        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:border-[#d4af37]/50 font-sans" />
      <button type="submit" className="bg-[#d4af37] text-[#1a365d] px-8 py-4 rounded-xl text-sm font-bold font-sans hover:bg-[#e4bf47] transition-all whitespace-nowrap">
        Join LOVEBetter
      </button>
    </form>
  );
}

// ── FAQ ──
const faqs = [
  { q: "Who are these assessments for?", a: "The Couples Assessment is for partners who want a clinical-grade map of their relational dynamics. The Individual Assessment is for anyone — single, dating, separated, or in a relationship — who wants deep self-knowledge before or during love." },
  { q: "Is this a replacement for therapy?", a: "No — it's the ideal starting point. Our reports give you (and your therapist) a clinical-grade GPS. Most therapists say it saves 4–8 sessions of discovery work." },
  { q: "How long does each assessment take?", a: "The Individual Assessment takes 20–30 minutes. The Couples Assessment takes 30–40 minutes (both partners complete it together). Reports are instant." },
  { q: "What if my results show serious issues?", a: "That's precisely why these tools exist. Clinical flags are surfaced with severity levels, clear context, and a specific treatment pathway designed around your unique profile." },
  { q: "Is my data private?", a: "Yes. Your responses are never stored server-side. The report is generated in your browser and only persists for your session. We take privacy seriously." },
];

const couplesTestimonials = [
  { quote: "We were on the verge of separation. The report gave us a language to talk about what was actually broken — and a clear path to fix it.", name: "Thandiwe & Sipho", location: "Johannesburg", result: "Now 18 months stronger" },
  { quote: "Worth every rand. Our couples therapist said it was the most useful intake tool she'd ever seen. We skipped months of guesswork.", name: "Lerato & James", location: "Durban", result: "Saved 6+ therapy sessions" },
];

const individualTestimonials = [
  { quote: "I thought I was ready for a relationship. This assessment showed me I had one dimension completely unaddressed. I'm grateful I did this before I hurt someone else.", name: "Kamo M.", location: "Pretoria", result: "Finally doing the actual work" },
  { quote: "The self-worth section hit me in a way three years of therapy hadn't. Not because therapy failed — because this made it concrete and measurable.", name: "Yewande A.", location: "Sandton", result: "Booked 4 sessions with Hakeem" },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#080e1d]" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(26,54,93,0.6) 0%, transparent 70%)" }}>

      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#080e1d]/80 border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <img src="/icon-32.png" alt="FOLA" className="w-8 h-8" />
              <div>
                <p className="text-sm font-bold text-white tracking-tight font-serif leading-none">LoveBetter</p>
                <p className="text-[9px] text-[#718096] tracking-wide font-sans mt-0.5">Relationship Growth Readiness Assessment</p>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/the-uncommon-practice" className="text-xs text-[#718096] hover:text-white transition-colors font-sans tracking-wide">The Uncommon Practice</Link>
            <Link href="/individual-assessment" className="text-xs text-[#a0aec0] hover:text-white transition-colors font-sans tracking-wide">Individual Assessment</Link>
            <Link href="/assessment" className="inline-flex items-center gap-2 bg-[#d4af37] text-[#1a365d] px-5 py-2.5 rounded-lg text-xs font-bold font-sans hover:bg-[#e4bf47] transition-all tracking-wide">
              Couples Assessment
            </Link>
          </nav>
          {/* Mobile */}
          <Link href="/assessment" className="md:hidden inline-flex items-center gap-1.5 bg-[#d4af37] text-[#1a365d] px-4 py-2 rounded-lg text-xs font-bold font-sans">
            Start →
          </Link>
        </div>
      </header>

      <main className="pt-24">

        {/* ── HERO ── */}
        <section className="relative px-6 pt-16 pb-8 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)" }} />
            <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(26,54,93,0.4) 0%, transparent 70%)" }} />
            <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(26,54,93,0.4) 0%, transparent 70%)" }} />
          </div>

          <div className="relative mx-auto max-w-5xl text-center">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/8 mb-10 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase font-sans">
                <AnimatedCounter target={247} /> people chose how to love better this year...
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight font-serif">
              Your relationship starts<br />
              <span className="italic" style={{ color: "#d4af37" }}>with who you are.</span>
            </h1>

            <p className="mt-7 text-lg sm:text-xl text-[#8892a4] max-w-2xl mx-auto leading-relaxed font-sans">
              Two clinical-grade assessments. One for the individual who wants to understand their relational wiring. One for the couple who&apos;s done guessing.
            </p>

            {/* Dual CTA */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/individual-assessment"
                className="group w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] px-6 py-5 transition-all hover:border-white/20 backdrop-blur-sm"
              >
                <div className="text-left">
                  <p className="text-[10px] text-[#718096] uppercase tracking-wider font-sans">Individual</p>
                  <p className="text-base font-bold text-white font-serif">Personal Growth Assessment</p>
                  <p className="text-xs text-[#d4af37] font-sans mt-0.5">10 dimensions · R600 · 20–30 min</p>
                </div>
                <svg className="w-5 h-5 text-[#718096] group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/assessment"
                className="group w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10 hover:bg-[#d4af37]/15 px-6 py-5 transition-all hover:border-[#d4af37]/50 backdrop-blur-sm"
              >
                <div className="text-left">
                  <p className="text-[10px] text-[#d4af37]/70 uppercase tracking-wider font-sans">Couples</p>
                  <p className="text-base font-bold text-white font-serif">Relationship Growth Assessment</p>
                  <p className="text-xs text-[#d4af37] font-sans mt-0.5">9 dimensions · R600 · 30–40 min</p>
                </div>
                <svg className="w-5 h-5 text-[#d4af37] group-hover:translate-x-1 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <p className="mt-5 text-xs text-[#4a5568] font-sans">Instant results · 100% private · Clinical-grade accuracy</p>
          </div>
        </section>

        {/* ── SOCIAL PROOF BAR ── */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
              {[
                { value: 4231, suffix: "+", label: "People assessed", color: "text-white" },
                { value: 3892, suffix: "", label: "Relationships transformed", color: "text-white" },
                { value: 94, suffix: "%", label: "Report satisfaction", color: "text-[#d4af37]" },
                { value: null, label: "Average rating", display: "4.9★", color: "text-white" },
              ].map((item, i) => (
                <div key={i} className="text-center py-7 px-4">
                  <p className={`text-3xl font-bold font-serif ${item.color}`}>
                    {item.display ? item.display : <><AnimatedCounter target={item.value!} />{item.suffix}</>}
                  </p>
                  <p className="mt-1.5 text-xs text-[#718096] font-sans">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DUAL ASSESSMENT SHOWCASE ── */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-14">
              <p className="text-[10px] text-[#d4af37] uppercase tracking-[0.25em] font-sans mb-3">Two Paths. One Practice.</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">Which assessment is for you?</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">

              {/* Individual Card */}
              <div className="group relative rounded-3xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-transparent p-8 hover:border-white/15 transition-all overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)" }} />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span className="text-[10px] text-indigo-300 font-semibold uppercase tracking-wider font-sans">Individual</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white font-serif">Personal Growth<br />Assessment</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white font-serif">R600</p>
                      <p className="text-xs text-[#718096] font-sans">One-time</p>
                    </div>
                  </div>

                  <p className="text-sm text-[#8892a4] leading-relaxed font-sans mb-6">
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
                        <svg className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-xs text-[#8892a4] font-sans leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <p className="text-xs text-[#4a5568] font-sans">20–30 min · Instant report · PDF download</p>
                    <Link href="/individual-assessment" className="flex items-center gap-2 bg-white text-[#080e1d] px-5 py-2.5 rounded-xl text-xs font-bold font-sans hover:bg-white/90 transition-all">
                      Begin →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Couples Card */}
              <div className="group relative rounded-3xl border border-[#d4af37]/20 bg-gradient-to-br from-[#d4af37]/[0.06] to-transparent p-8 hover:border-[#d4af37]/35 transition-all overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)" }} />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                        <span className="text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider font-sans">Couples</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white font-serif">Relationship Growth<br />Assessment</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#d4af37] font-serif">R600</p>
                      <p className="text-xs text-[#718096] font-sans">Per couple</p>
                    </div>
                  </div>

                  <p className="text-sm text-[#8892a4] leading-relaxed font-sans mb-6">
                    For couples who are done guessing what&apos;s wrong. A clinical-grade X-ray of both partners across 8 domains — revealing hidden mismatches and a precise 3-phase healing pathway.
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
                        <svg className="w-3.5 h-3.5 text-[#d4af37] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-xs text-[#8892a4] font-sans leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#d4af37]/[0.15]">
                    <p className="text-xs text-[#4a5568] font-sans">30–40 min · Instant report · PDF download</p>
                    <Link href="/assessment" className="flex items-center gap-2 bg-[#d4af37] text-[#1a365d] px-5 py-2.5 rounded-xl text-xs font-bold font-sans hover:bg-[#e4bf47] transition-all">
                      Begin →
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-[10px] text-[#d4af37] uppercase tracking-[0.25em] font-sans mb-3">Simple. Rigorous. Instant.</p>
              <h2 className="text-3xl font-bold text-white font-serif">How it works</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Choose your assessment", body: "Individual or couples. Complete the multi-step clinical form at your own pace — designed to be honest, not comfortable." },
                { step: "02", title: "Answer 10 clinical dimensions", body: "From attachment wiring to trauma history to values alignment — each question is grounded in peer-reviewed research." },
                { step: "03", title: "Receive your clinical report", body: "Instantly. A full Brown University-style PDF with scores, insights, clinical flags, and a personalised treatment pathway." },
              ].map((item) => (
                <div key={item.step} className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 hover:border-white/10 transition-all">
                  <p className="text-4xl font-bold text-[#d4af37]/15 font-serif mb-4">{item.step}</p>
                  <h3 className="text-base font-bold text-white font-serif mb-2">{item.title}</h3>
                  <p className="text-xs text-[#718096] leading-relaxed font-sans">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-[10px] text-[#d4af37] uppercase tracking-[0.25em] font-sans mb-3">Real results</p>
              <h2 className="text-3xl font-bold text-white font-serif">What people are saying</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[...couplesTestimonials.map(t => ({...t, type: "Couples"})), ...individualTestimonials.map(t => ({...t, type: "Individual"}))].map((t, i) => (
                <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/10 transition-all flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, si) => <span key={si} className="text-[#d4af37] text-xs">★</span>)}
                    <span className={`ml-auto text-[9px] font-semibold uppercase tracking-wider font-sans px-2 py-0.5 rounded-full ${
                      t.type === "Couples" ? "bg-[#d4af37]/15 text-[#d4af37]" : "bg-indigo-500/15 text-indigo-300"
                    }`}>{t.type}</span>
                  </div>
                  <p className="text-sm text-[#a0aec0] italic leading-relaxed font-serif flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-5 pt-4 border-t border-white/[0.06]">
                    <p className="text-xs font-bold text-white font-sans">{t.name}</p>
                    <p className="text-[10px] text-[#4a5568] font-sans">{t.location}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-[9px] text-green-400 font-semibold font-sans">{t.result}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROBLEM / WHY NOW ── */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-red-500/15 bg-red-500/[0.03] p-10 text-center">
              <p className="text-[10px] text-red-400 uppercase tracking-[0.25em] font-sans mb-4">The cost of waiting</p>
              <h2 className="text-3xl font-bold text-white font-serif mb-4">
                Most couples wait <span className="text-red-400">6 years</span> before getting help.
              </h2>
              <p className="text-[#8892a4] text-sm max-w-2xl mx-auto leading-relaxed font-sans mb-8">
                By then, resentment has calcified. Patterns have cemented. And you&apos;re spending R1,500–R2,000 per therapy session just figuring out <em>what</em> the problem is.
                Our assessments do that work in 30 minutes — so you can walk into any session already knowing.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: "M12 8v4m0 4h.01", text: "Same argument, different day. You're stuck in the loop." },
                  { icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636", text: "Disconnected but can't explain why." },
                  { icon: "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5", text: "You keep choosing the wrong person." },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-red-500/15 bg-red-500/5 p-5">
                    <svg className="w-5 h-5 text-red-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    <p className="text-xs text-[#8892a4] font-sans leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT'S IN THE REPORT ── */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-[10px] text-[#d4af37] uppercase tracking-[0.25em] font-sans mb-3">Clinical depth. Real answers.</p>
              <h2 className="text-3xl font-bold text-white font-serif">What&apos;s inside your report</h2>
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
                <div key={item.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-[#d4af37]/20 transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mb-4 group-hover:bg-[#d4af37]/15 transition-all">
                    <svg className="w-4.5 h-4.5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white font-serif mb-2">{item.title}</h3>
                  <p className="text-xs text-[#718096] leading-relaxed font-sans">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <p className="text-[10px] text-[#d4af37] uppercase tracking-[0.25em] font-sans mb-3">Transparent pricing</p>
              <h2 className="text-3xl font-bold text-white font-serif">Simple. Worth it.</h2>
              <p className="mt-3 text-sm text-[#718096] font-sans">Compare that to R1,500–R2,000 per therapy session, just to figure out what to work on.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  tag: "Individual", price: "R600", href: "/individual-assessment",
                  features: ["10 clinical dimensions", "Personal growth score", "Clinical flags & insights", "3-phase treatment pathway", "Full PDF report", "Love language + Attachment profile"],
                  color: "border-white/10", bg: "bg-white/[0.03]", btn: "bg-white text-[#080e1d]", tagColor: "text-indigo-300 bg-indigo-500/15 border-indigo-500/25",
                },
                {
                  tag: "Couples", price: "R600", href: "/assessment",
                  features: ["9 clinical domains", "Partner comparison charts", "Alignment percentage per domain", "ACE + ADHD screening", "Clinical risk matrix", "3-phase couples pathway"],
                  color: "border-[#d4af37]/25", bg: "bg-[#d4af37]/[0.05]", btn: "bg-[#d4af37] text-[#1a365d]", tagColor: "text-[#d4af37] bg-[#d4af37]/15 border-[#d4af37]/30",
                },
              ].map((item) => (
                <div key={item.tag} className={`rounded-2xl border ${item.color} ${item.bg} p-7`}>
                  <div className="flex items-center justify-between mb-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border font-sans ${item.tagColor}`}>{item.tag}</span>
                    <p className="text-2xl font-bold text-white font-serif">{item.price}</p>
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-xs text-[#8892a4] font-sans">
                        <svg className="w-3.5 h-3.5 text-[#d4af37] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={item.href} className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold font-sans transition-all hover:opacity-90 ${item.btn}`}>
                    Take the Assessment →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOG TEASER ── */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-10 text-center">
              <p className="text-[10px] text-[#d4af37] uppercase tracking-[0.25em] font-sans mb-3">Knowledge first</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-3">The Uncommon Practice</h2>
              <p className="text-sm text-[#718096] max-w-lg mx-auto leading-relaxed font-sans mb-7">
                10 extensive essays on love, neuroscience, and what actually makes relationships work — written by Hakeem with the rigour of a researcher and the voice of someone who&apos;s seen it all.
              </p>
              <Link href="/the-uncommon-practice" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm text-white font-sans font-semibold hover:bg-white/[0.07] transition-all">
                Read the essays
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white font-serif">Questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className={`rounded-2xl border transition-all ${openFaq === i ? "border-[#d4af37]/25 bg-[#d4af37]/[0.04]" : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"}`}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
                    <span className="text-sm font-semibold text-white font-sans">{faq.q}</span>
                    <svg className={`w-4 h-4 text-[#718096] shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <p className="text-sm text-[#718096] leading-relaxed font-sans">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-xl text-center">
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-10">
              <p className="text-[10px] text-[#d4af37] uppercase tracking-[0.25em] font-sans mb-3">Free · Valuable · Honest</p>
              <h2 className="text-2xl font-bold text-white font-serif mb-2">The LOVEBetter Newsletter</h2>
              <p className="text-sm text-[#718096] mb-7 font-sans leading-relaxed">
                Neuroscience, attachment theory, and hard-won insights on love — delivered bi-weekly by Hakeem. No fluff. No algorithm. Just the real work.
              </p>
              <NewsletterSignup />
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="px-6 pb-20 pt-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-4">
              The most important relationship<br />
              <span className="text-[#d4af37] italic">is the one with yourself.</span>
            </h2>
            <p className="text-sm text-[#718096] font-sans max-w-lg mx-auto mb-8 leading-relaxed">
              Start there. Then build the relationship you actually deserve.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/individual-assessment" className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-7 py-4 text-sm font-bold text-white font-sans hover:bg-white/[0.08] transition-all">
                Individual Assessment — R600
              </Link>
              <Link href="/assessment" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#d4af37] text-[#1a365d] px-7 py-4 rounded-xl text-sm font-bold font-sans hover:bg-[#e4bf47] transition-all hover:shadow-xl hover:shadow-[#d4af37]/20">
                Couples Assessment — R600
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] px-6 py-10">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#4a5568] font-sans">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#d4af37]/15 border border-[#d4af37]/20 flex items-center justify-center">
              <span className="text-[#d4af37] text-[10px] font-bold font-serif">F</span>
            </div>
            <span>© {new Date().getFullYear()} LoveBetter · Relationship Growth Readiness Assessment · All assessments R600</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/individual-assessment" className="hover:text-white transition-colors">Individual Assessment</Link>
            <Link href="/assessment" className="hover:text-white transition-colors">Couples Assessment</Link>
            <Link href="/the-uncommon-practice" className="hover:text-white transition-colors">The Uncommon Practice</Link>
            <a href="https://calendly.com/folasessions/discovery-call" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Book a Call</a>
          </nav>
        </div>
      </footer>

    </div>
  );
}
