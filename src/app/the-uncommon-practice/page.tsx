import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Uncommon Practice | LOVEBETTER by FOLA",
  description:
    "Where neuroscience meets the nightstand. Hakeem writes about love, attachment, hypnotherapy, and the radical act of showing up for the person next to you.",
  openGraph: {
    title: "The Uncommon Practice | LOVEBETTER by FOLA",
    description:
      "Where neuroscience meets the nightstand. Hakeem writes about love, attachment, hypnotherapy, and the radical act of showing up for the person next to you.",
    type: "website",
    siteName: "LOVEBETTER by FOLA",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Uncommon Practice | LOVEBETTER by FOLA",
    description:
      "Where neuroscience meets the nightstand. Hakeem writes about love, attachment, hypnotherapy, and the radical act of showing up for the person next to you.",
  },
};

// Sort posts newest-first by date (format: "Month DD, YYYY")
function parseDate(dateStr: string): Date {
  const months: Record<string, number> = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
  };
  const [month, day, year] = dateStr.split(" ");
  return new Date(parseInt(year), months[month], parseInt(day.replace(",", "")));
}

const sortedPosts = [...blogPosts].sort((a, b) => {
  return parseDate(b.date).getTime() - parseDate(a.date).getTime();
});

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f3d] to-[#1a365d]">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a1628]/80 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo-transparent.png" alt="FOLA" className="w-7 h-7" />
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight font-serif leading-none">
                LoveBetter
              </h1>
              <p className="text-[10px] text-[#a0aec0] tracking-wide font-sans">
                Relationship Growth Readiness Assessment
              </p>
            </div>
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="/the-uncommon-practice"
              className="text-sm text-white font-sans"
            >
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
              hypnotherapy, NLP, and the radical act of showing up for the person
              next to you.
            </p>
            <p className="mt-2 text-sm text-[#718096] font-sans italic">
              Written by Hakeem Lesolang
            </p>
          </div>

          {/* Featured Post */}
          <Link
            href={`/the-uncommon-practice/${sortedPosts[0].slug}`}
            className="block group mb-12"
          >
            <article className="rounded-2xl border border-[#d4af37]/30 bg-gradient-to-b from-[#d4af37]/10 to-transparent p-8 sm:p-10 hover:border-[#d4af37]/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded-full font-sans">
                  {sortedPosts[0].category}
                </span>
                <span className="text-xs text-[#718096] font-sans">
                  {sortedPosts[0].date}
                </span>
                <span className="text-xs text-[#718096] font-sans">
                  {sortedPosts[0].readTime}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif group-hover:text-[#d4af37] transition-colors">
                {sortedPosts[0].title}
              </h3>
              <p className="mt-1 text-base text-[#d4af37]/70 font-serif italic">
                {sortedPosts[0].subtitle}
              </p>
              <p className="mt-4 text-[#cbd5e0] font-sans leading-relaxed">
                {sortedPosts[0].excerpt}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-[#d4af37] text-sm font-semibold font-sans group-hover:gap-3 transition-all">
                Read Article
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </article>
          </Link>

          {/* Post Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {sortedPosts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/the-uncommon-practice/${post.slug}`}
                className="group"
              >
                <article className="h-full rounded-xl border border-white/10 bg-white/5 p-6 hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-semibold text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded-full font-sans uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-[#718096] font-sans">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-serif group-hover:text-[#d4af37] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#d4af37]/60 font-serif italic">
                    {post.subtitle}
                  </p>
                  <p className="mt-3 text-sm text-[#a0aec0] font-sans leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 text-xs text-[#718096] font-sans">
                    {post.date}
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Assessment CTA */}
          <div className="mt-16 rounded-2xl border border-[#d4af37]/30 bg-gradient-to-b from-[#d4af37]/10 to-transparent p-8 sm:p-10 text-center">
            <h3 className="text-2xl font-bold text-white font-serif">
              What's your relationship pattern?
            </h3>
            <p className="mt-3 text-[#a0aec0] text-sm font-sans max-w-lg mx-auto">
              Every article on this page starts with a real clinical question. The
              assessment gives you the data — attachment style, trauma load,
              communication wiring, and a personalised treatment pathway.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/individual-assessment"
                className="inline-flex items-center gap-2 bg-[#d4af37] text-[#1a365d] px-6 py-3 rounded-xl text-sm font-bold font-sans hover:bg-[#e4bf47] transition-all hover:shadow-lg hover:shadow-[#d4af37]/20"
              >
                Take the Individual Assessment — R600
              </Link>
              <Link
                href="/assessment"
                className="inline-flex items-center gap-2 border border-[#d4af37]/40 text-[#d4af37] px-6 py-3 rounded-xl text-sm font-bold font-sans hover:bg-[#d4af37]/10 transition-all"
              >
                Take the Couples Assessment
              </Link>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-10 text-center">
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
                LOVEBETTER by FOLA
              </p>
              <p className="text-xs text-[#718096] font-sans mt-1">
                R600 per assessment
              </p>
            </div>
            <nav className="flex items-center gap-6">
              <Link
                href="/the-uncommon-practice"
                className="text-xs text-[#a0aec0] hover:text-white transition-colors font-sans"
              >
                The Uncommon Practice
              </Link>
              <Link
                href="/assessment"
                className="text-xs text-[#d4af37] hover:text-[#e4bf47] transition-colors font-sans"
              >
                Take Assessment
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
