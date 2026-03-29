import BlogList from "./BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Uncommon Practice | The Oasis by FOLA",
  description:
    "Where neuroscience meets the nightstand. Hakeem writes about love, attachment, hypnotherapy, and the radical act of showing up for the person next to you.",
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f3d] to-[#1a365d]">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a1628]/80 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <a href="/">
            <h1 className="text-lg font-bold text-white tracking-tight font-serif">
              The Oasis by FOLA
            </h1>
            <p className="text-[10px] text-[#a0aec0] tracking-wide font-sans">
              Hakeem — Hypnotherapist & Peak Performance Coach
            </p>
          </a>
          <nav className="hidden sm:flex items-center gap-6">
            <a href="/the-uncommon-practice" className="text-sm text-white font-sans">
              The Uncommon Practice
            </a>
            <a
              href="/assessment"
              className="inline-flex items-center gap-2 bg-[#d4af37] text-[#1a365d] px-5 py-2.5 rounded-lg text-sm font-bold font-sans hover:bg-[#e4bf47] transition-all hover:shadow-lg hover:shadow-[#d4af37]/20"
            >
              Start Assessment
            </a>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-6 font-sans">
              The Blog
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white font-serif leading-tight">
              The Uncommon Practice
            </h2>
            <p className="mt-4 text-lg text-[#a0aec0] max-w-2xl mx-auto font-sans leading-relaxed">
              Where neuroscience meets the nightstand. On love, attachment,
              hypnotherapy, NLP, and the radical act of showing up for the
              person next to you.
            </p>
            <p className="mt-2 text-sm text-[#718096] font-sans italic">
              Written by Hakeem Lesolang
            </p>
          </div>

          {/* Blog list with sort toggle */}
          <BlogList />

          {/* Newsletter CTA */}
          <div className="mt-20 rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-10 text-center">
            <h3 className="text-2xl font-bold text-white font-serif">
              The LOVEBetter Letter
            </h3>
            <p className="mt-3 text-[#a0aec0] text-sm font-sans max-w-lg mx-auto">
              Neuroscience-backed insights on love, attachment, and the daily
              practice of building a relationship that actually feels safe.
              Written by Hakeem Lesolang. No fluff.
            </p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#718096] focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30"
              />
              <button
                type="submit"
                className="bg-[#d4af37] text-[#1a365d] px-6 py-3 rounded-lg text-sm font-bold font-sans hover:bg-[#e4bf47] transition-all whitespace-nowrap"
              >
                Join LOVEBetter
              </button>
            </form>
            <p className="mt-3 text-xs text-[#718096] font-sans">
              Free. Bi-weekly. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-white font-serif">
                The Oasis by FOLA
              </p>
              <p className="text-xs text-[#718096] font-sans mt-1">
                R600 per assessment
              </p>
            </div>
            <nav className="flex items-center gap-6">
              <a
                href="/the-uncommon-practice"
                className="text-xs text-[#a0aec0] hover:text-white transition-colors font-sans"
              >
                The Uncommon Practice
              </a>
              <a
                href="/assessment"
                className="text-xs text-[#d4af37] hover:text-[#e4bf47] transition-colors font-sans"
              >
                Take Assessment
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
