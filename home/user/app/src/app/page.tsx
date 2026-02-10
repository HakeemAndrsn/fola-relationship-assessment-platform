"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{count.toLocaleString()}</span>;
}

function NewsletterSignup({ variant = "default" }: { variant?: "default" | "inline" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className={`text-center ${variant === "inline" ? "py-4" : "py-8"}`}>
        <div className="inline-flex items-center gap-2 text-[#d4af37] font-serif text-lg italic">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Welcome to LOVEBetter.
        </div>
        <p className="text-sm text-[#a0aec0] mt-2">Check your inbox for your first letter.</p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#718096] focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30"
        />
        <button
          type="submit"
          className="bg-[#d4af37] text-[#1a365d] px-6 py-3 rounded-lg text-sm font-bold font-sans hover:bg-[#e4bf47] transition-all whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white placeholder-[#718096] focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30"
      />
      <button
        type="submit"
        className="bg-[#d4af37] text-[#1a365d] px-8 py-4 rounded-xl text-sm font-bold font-sans hover:bg-[#e4bf47] transition-all hover:shadow-lg hover:shadow-[#d4af37]/20 whitespace-nowrap"
      >
        Join LOVEBetter
      </button>
    </form>
  );
}

const testimonials = [
  {
    quote: "We were on the verge of separation. This assessment gave us a language to talk about what was actually broken — and a clear path to fix it.",
    name: "Thandiwe & Sipho",
    location: "Johannesburg",
    result: "Now 18 months stronger",
  },
  {
    quote: "I thought we just had 'communication issues.' The report showed us it was actually an attachment mismatch. Three sessions with our therapist using the treatment plan and we finally get each other.",
    name: "Aisha & David",
    location: "Cape Town",
    result: "Conflict reduced by 70%",
  },
  {
    quote: "Worth every rand. Our couples therapist said it was the most useful intake tool she'd ever seen. We skipped months of guesswork.",
    name: "Lerato & James",
    location: "Durban",
    result: "Saved 6+ sessions of discovery",
  },
  {
    quote: "The ADHD screening was a game-changer. We had no idea how much neurodivergence was affecting our daily life. Now we have strategies that actually work.",
    name: "Nomsa & Brett",
    location: "Pretoria",
    result: "Finally on the same page",
  },
];

const faqs = [
  {
    q: "Do both partners need to be present?",
    a: "Yes. The assessment evaluates both partners across 7 clinical domains. Each person answers independently, and the report compares your results to identify alignment gaps, attachment compatibility, and areas of strength.",
  },
  {
    q: "Is this a replacement for therapy?",
    a: "No — it's the perfect starting point. Think of it as a clinical-grade GPS for your relationship. Many therapists use our reports as intake assessments to skip weeks of discovery and get straight to what matters.",
  },
  {
    q: "How long does it take?",
    a: "Most couples complete it in 25-35 minutes. You'll receive your full report instantly — no waiting, no follow-up appointments needed.",
  },
  {
    q: "What if our results show serious issues?",
    a: "That's exactly why this assessment exists. Clinical flags are highlighted with clear severity levels, and your personalised treatment plan maps out exactly what to work on, in what order, with session-by-session guidance.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f3d] to-[#1a365d]">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a1628]/80 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight font-serif">The Oasis by FOLA</h1>
            <p className="text-[10px] text-[#a0aec0] tracking-wide font-sans">Hakeem — Hypnotherapist & Peak Performance Coach</p>
          </div>
          <nav className="hidden sm:flex items-center gap-6">
            <Link href="/the-uncommon-practice" className="text-sm text-[#a0aec0] hover:text-white transition-colors font-sans">
              The Uncommon Practice
            </Link>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 bg-[#d4af37] text-[#1a365d] px-5 py-2.5 rounded-lg text-sm font-bold font-sans hover:bg-[#e4bf47] transition-all hover:shadow-lg hover:shadow-[#d4af37]/20"
            >
              Start Assessment
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase font-sans">
                <AnimatedCounter target={2847} /> couples assessed this year
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight font-serif">
              Stop guessing what&apos;s wrong.<br />
              <span className="text-[#d4af37] italic">Start knowing.</span>
            </h2>

            <p className="mt-6 text-lg sm:text-xl text-[#cbd5e0] max-w-2xl mx-auto leading-relaxed font-sans">
              The FOLA <strong className="text-white">Relationship Growth Assessment</strong> maps your relationship across 7 clinical dimensions — revealing hidden patterns, attachment mismatches, and the exact steps to build something unbreakable.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/assessment"
                className="group relative inline-flex items-center gap-2 bg-[#d4af37] text-[#1a365d] px-8 py-4 rounded-xl text-base font-bold font-sans hover:bg-[#e4bf47] transition-all hover:shadow-xl hover:shadow-[#d4af37]/25 hover:-translate-y-0.5"
              >
                Take the Assessment — R600
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a href="#how-it-works" className="text-sm text-[#a0aec0] hover:text-white transition-colors underline underline-offset-4 decoration-[#a0aec0]/30 font-sans">
                See how it works
              </a>
            </div>

            <p className="mt-4 text-xs text-[#718096] font-sans">
              25-35 min | Instant results | 100% private
            </p>
          </div>
        </section>

        {/* Social proof bar */}
        <section className="border-y border-white/5 bg-white/[0.02]">
          <div className="mx-auto max-w-5xl px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white font-serif"><AnimatedCounter target={4231} />+</div>
              <div className="mt-1 text-xs text-[#a0aec0] font-sans">Couples assessed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white font-serif"><AnimatedCounter target={3892} /></div>
              <div className="mt-1 text-xs text-[#a0aec0] font-sans">Relationships helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#d4af37] font-serif">94%</div>
              <div className="mt-1 text-xs text-[#a0aec0] font-sans">Say it improved their relationship</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white font-serif">4.9<span className="text-lg text-[#d4af37]">/5</span></div>
              <div className="mt-1 text-xs text-[#a0aec0] font-sans">Average rating</div>
            </div>
          </div>
        </section>

        {/* Problem / Agitation */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Most couples wait <span className="text-red-400">6 years</span> before seeking help.
            </h3>
            <p className="mt-4 text-[#a0aec0] text-base leading-relaxed max-w-2xl mx-auto font-sans">
              By then, resentment has calcified. Communication has broken down. And you&apos;re spending thousands on therapy just to figure out <em>what</em> the problem is — before you can even start fixing it.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { icon: "M12 8v4m0 4h.01", label: "You argue about the same things on repeat" },
                { icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636", label: "You feel disconnected but can't explain why" },
                { icon: "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5", label: "You've tried talking but nothing changes" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                  <svg className="w-6 h-6 text-red-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <p className="text-sm text-[#cbd5e0] font-sans">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-[#d4af37]/[0.03] to-transparent">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-6 font-sans">
              The Solution
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              A clinical-grade X-ray of your relationship.
            </h3>
            <p className="mt-4 text-[#a0aec0] text-base max-w-2xl mx-auto leading-relaxed font-sans">
              In 30 minutes, the FOLA Relationship Growth Assessment maps both partners across 7 scientifically-backed dimensions — giving you a comprehensive report that most therapists take 4-8 sessions to uncover.
            </p>
          </div>
        </section>

        {/* 7 Domains */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <h3 className="text-center text-xl font-bold text-white mb-10 font-serif">7 Clinical Dimensions We Assess</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Attachment Style", desc: "Are you secure, anxious, avoidant, or disorganized? And how does your style clash or complement your partner's?", icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" },
                { title: "Trauma Inventory", desc: "ACE-informed screening revealing how past wounds silently shape your present relationship patterns.", icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" },
                { title: "ADHD & Neurodivergence", desc: "How neurodivergent patterns affect attention, emotional regulation, and attunement between partners.", icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" },
                { title: "Values Alignment", desc: "Money, faith, family, intimacy, ambition — are you building toward the same future or pulling apart?", icon: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75" },
                { title: "Communication Patterns", desc: "Conflict style, listening quality, repair attempts — the mechanics of how you actually talk to each other.", icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" },
                { title: "Future Vision", desc: "Do you share a vision for your life together — or are you unknowingly heading in different directions?", icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
                { title: "Change Readiness", desc: "Where each partner sits on the stages of change — from pre-contemplation to active maintenance.", icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" },
              ].map((d) => (
                <div key={d.title} className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5 transition-all">
                  <svg className="w-6 h-6 text-[#d4af37] mb-3 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={d.icon} />
                  </svg>
                  <h4 className="text-sm font-bold text-white font-serif">{d.title}</h4>
                  <p className="mt-2 text-xs text-[#a0aec0] leading-relaxed font-sans">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-20 px-6">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-center text-2xl font-bold text-white mb-12 font-serif">How It Works</h3>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { step: "01", title: "Take the Assessment", desc: "Both partners answer questions across 7 clinical dimensions. It's private, honest, and takes about 30 minutes." },
                { step: "02", title: "Get Your Report", desc: "Instantly receive a 10+ page clinical report with radar charts, compatibility scores, risk flags, and deep analysis." },
                { step: "03", title: "Follow the Plan", desc: "Your personalised 3-phase treatment pathway tells you exactly what to work on, in what order, session by session." },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#d4af37]/40 text-[#d4af37] font-bold text-lg mb-4 font-serif">
                    {s.step}
                  </div>
                  <h4 className="text-base font-bold text-white font-serif">{s.title}</h4>
                  <p className="mt-2 text-sm text-[#a0aec0] leading-relaxed font-sans">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-center text-2xl font-bold text-white mb-4 font-serif">What&apos;s Inside Your Report</h3>
            <p className="text-center text-[#a0aec0] text-sm mb-12 max-w-xl mx-auto font-sans">
              Not a generic quiz result. A clinician-level analysis you can take to your therapist — or use on your own.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Compatibility Score", desc: "An overall relationship health metric based on all 7 dimensions" },
                { title: "Partner Comparison Radar", desc: "Visual chart showing where you align and where you diverge" },
                { title: "Clinical Risk Flags", desc: "Highlighted areas of concern with severity levels (high / medium / low)" },
                { title: "Deep Domain Analysis", desc: "Detailed interpretation of each dimension with clinical context" },
                { title: "3-Phase Treatment Plan", desc: "Session-by-session pathway from stabilisation through growth to maintenance" },
                { title: "Journal Prompts & Actions", desc: "Specific exercises and conversation starters to use between sessions" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-lg border border-white/10 bg-white/5">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-serif">{item.title}</h4>
                    <p className="mt-1 text-xs text-[#a0aec0] font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-5xl">
            <h3 className="text-center text-2xl font-bold text-white mb-4 font-serif">Real Couples. Real Results.</h3>
            <p className="text-center text-[#a0aec0] text-sm mb-12 font-sans">
              Join thousands of South African couples who stopped guessing and started growing.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {testimonials.map((t) => (
                <div key={t.name} className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-[#cbd5e0] leading-relaxed font-serif italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white font-sans">{t.name}</p>
                      <p className="text-xs text-[#718096] font-sans">{t.location}</p>
                    </div>
                    <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full font-sans">
                      {t.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing / CTA */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-[#d4af37]/30 bg-gradient-to-b from-[#d4af37]/10 to-transparent p-10 text-center">
              <h3 className="text-2xl font-bold text-white font-serif">One Assessment. Clarity for Life.</h3>
              <p className="mt-3 text-[#a0aec0] text-sm max-w-md mx-auto font-sans">
                Most couples spend R1,200–R2,000 per therapy session just trying to identify the problem. Get your answer in 30 minutes.
              </p>
              <div className="mt-8">
                <div className="text-5xl font-bold text-white font-serif">R600</div>
                <p className="mt-1 text-xs text-[#718096] font-sans">Once-off payment | Both partners included</p>
              </div>
              <ul className="mt-8 space-y-3 text-left max-w-sm mx-auto">
                {[
                  "Full 7-dimension clinical assessment",
                  "10+ page personalised report with charts",
                  "Clinical risk flag identification",
                  "3-phase treatment plan with session pricing",
                  "Journal prompts & conversation starters",
                  "Instant PDF download",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#cbd5e0] font-sans">
                    <svg className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/assessment"
                className="mt-10 inline-flex items-center gap-2 bg-[#d4af37] text-[#1a365d] px-8 py-4 rounded-xl text-base font-bold font-sans hover:bg-[#e4bf47] transition-all hover:shadow-xl hover:shadow-[#d4af37]/25 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
              >
                Start Your Assessment Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <p className="mt-4 text-xs text-[#718096] font-sans">
                Secure & private — your data never leaves your browser
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter - LOVEBetter */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-[#d4af37]/[0.04] to-transparent">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-6 font-sans">
              Newsletter
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              The LOVEBetter Letter
            </h3>
            <p className="mt-4 text-[#a0aec0] text-base max-w-lg mx-auto leading-relaxed font-sans">
              Neuroscience-backed insights on love, attachment, and the daily practice of building a relationship that actually feels safe. Written by Hakeem. No fluff. Just the truth about how love works in the brain and in the home.
            </p>
            <div className="mt-8">
              <NewsletterSignup />
            </div>
            <p className="mt-4 text-xs text-[#718096] font-sans">
              Free. Bi-weekly. Unsubscribe anytime.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-2xl">
            <h3 className="text-center text-2xl font-bold text-white mb-10 font-serif">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-sm font-bold text-white pr-4 font-serif">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-[#a0aec0] flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-[#a0aec0] leading-relaxed font-sans">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog CTA */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-xl font-bold text-white font-serif">Read The Uncommon Practice</h3>
            <p className="mt-3 text-[#a0aec0] text-sm font-sans max-w-lg mx-auto">
              Where neuroscience meets the nightstand. Hakeem writes about love, attachment, hypnotherapy, and the radical act of showing up for the person next to you.
            </p>
            <Link
              href="/the-uncommon-practice"
              className="mt-6 inline-flex items-center gap-2 border border-[#d4af37]/40 text-[#d4af37] px-6 py-3 rounded-xl text-sm font-semibold font-sans hover:bg-[#d4af37]/10 transition-all"
            >
              Explore the Blog
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 text-center">
          <div className="mx-auto max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Your relationship deserves more than guesswork.
            </h3>
            <p className="mt-4 text-[#a0aec0] text-base font-sans">
              Take the first step toward real understanding. R600. 30 minutes. A lifetime of clarity.
            </p>
            <Link
              href="/assessment"
              className="mt-8 inline-flex items-center gap-2 bg-[#d4af37] text-[#1a365d] px-8 py-4 rounded-xl text-base font-bold font-sans hover:bg-[#e4bf47] transition-all hover:shadow-xl hover:shadow-[#d4af37]/25 hover:-translate-y-0.5"
            >
              Begin the FOLA Relationship Growth Assessment
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="px-6 pb-8 text-center text-xs text-[#718096] max-w-xl mx-auto font-sans">
          <p>
            This assessment is a screening tool and does not constitute a clinical diagnosis.
            Results are designed to inform therapeutic conversations. For professional clinical
            assessment, please consult a qualified practitioner.
          </p>
        </div>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-white font-serif">The Oasis by FOLA</p>
              <p className="text-xs text-[#718096] font-sans mt-1">R600 per assessment</p>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/the-uncommon-practice" className="text-xs text-[#a0aec0] hover:text-white transition-colors font-sans">
                The Uncommon Practice
              </Link>
              <Link href="/assessment" className="text-xs text-[#d4af37] hover:text-[#e4bf47] transition-colors font-sans">
                Take Assessment
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
