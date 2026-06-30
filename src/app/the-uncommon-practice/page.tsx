import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Uncommon Practice Blog | LOVEBETTER by FOLA",
  description:
    "Where neuroscience meets the nightstand. Hakeem writes about love, attachment, hypnotherapy, and the radical act of showing up for the person next to you.",
  openGraph: {
    title: "The Uncommon Practice Blog | LOVEBETTER by FOLA",
    description: "Where neuroscience meets the nightstand. Hakeem writes about love, attachment, hypnotherapy, and the radical act of showing up for the person next to you.",
    type: "website",
    url: "https://lovebetter.co.za/the-uncommon-practice",
    siteName: "LOVEBETTER by FOLA",
    images: [
      {
        url: "https://lovebetter.co.za/logo-transparent.png",
        width: 800,
        height: 800,
        alt: "The Uncommon Practice",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Uncommon Practice Blog | LOVEBETTER by FOLA",
    description: "Where neuroscience meets the nightstand. Hakeem writes about love, attachment, hypnotherapy, and the radical act of showing up for the person next to you.",
    images: ["https://lovebetter.co.za/logo-transparent.png"],
  },
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-background text-card-foreground texture-paper">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-lg font-bold text-foreground tracking-tight font-serif">
              LoveBetter
            </h1>
            <p className="text-[10px] text-card-foreground/75 tracking-wide font-sans">
              Relationship Growth Readiness Assessment
            </p>
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="/the-uncommon-practice"
              className="text-sm text-foreground font-sans font-medium"
            >
              The Uncommon Practice
            </Link>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 bg-[#121212] text-[#F5F2EC] px-5 py-2.5 rounded-lg text-sm font-bold font-sans hover:bg-[#232323] transition-all border border-border"
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
            <div className="inline-block px-3 py-1 rounded-full bg-[#B8654A]/10 border border-[#B8654A]/20 text-[#B8654A] text-xs font-semibold tracking-wider uppercase mb-6 font-sans">
              The Blog
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground font-serif leading-tight">
              The Uncommon Practice
            </h2>
            <p className="mt-4 text-lg text-card-foreground/80 max-w-2xl mx-auto font-sans leading-relaxed">
              Where neuroscience meets the nightstand. On love, attachment,
              hypnotherapy, NLP, and the radical act of showing up for the person
              next to you.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <p className="text-sm text-card-foreground/60 font-sans italic">
                Written by Hakeem Lesolang
              </p>
              <span className="hidden sm:inline text-border">|</span>
              <a
                href="https://theuncommonpractice.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#B8654A] hover:text-[#B8654A]/80 font-sans font-semibold border border-[#B8654A]/20 hover:border-[#B8654A]/50 rounded-full px-4 py-1.5 bg-[#B8654A]/5 hover:bg-[#B8654A]/10 transition-all"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.078v2.836zM1.46 10.881h21.078v11.713L12 16.681l-10.54 5.913V10.881zm0-8.045h21.078V0H1.46v2.836z"/>
                </svg>
                Read on Substack
              </a>
            </div>
          </div>

          {/* Featured Post */}
          <Link
            href={`/the-uncommon-practice/${blogPosts[0].slug}`}
            className="block group mb-12"
          >
            <article className="rounded-2xl border border-border bg-card overflow-hidden hover:border-border/80 hover:shadow-md transition-all shadow-sm">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                {/* Image container */}
                <div className="relative aspect-[16/10] md:aspect-video lg:aspect-square w-full h-full min-h-[250px] overflow-hidden border-b md:border-b-0 md:border-r border-border">
                  <img
                    src={blogPosts[0].image || "/logo-transparent.png"}
                    alt={blogPosts[0].title}
                    className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                {/* Text container */}
                <div className="p-6 sm:p-8 pl-6 md:pl-0">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold text-[#B8654A] bg-[#B8654A]/10 px-2.5 py-1 rounded-full font-sans">
                      {blogPosts[0].category}
                    </span>
                    <span className="text-xs text-card-foreground/60 font-sans">
                      {blogPosts[0].date}
                    </span>
                    <span className="text-xs text-card-foreground/60 font-sans">
                      {blogPosts[0].readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground font-serif group-hover:text-[#B8654A] transition-colors leading-tight">
                    {blogPosts[0].title}
                  </h3>
                  <p className="mt-1 text-base text-[#B8654A]/80 font-serif italic">
                    {blogPosts[0].subtitle}
                  </p>
                  <p className="mt-4 text-sm text-card-foreground/80 font-sans leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-[#B8654A] text-sm font-semibold font-sans group-hover:gap-3 transition-all">
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
                </div>
              </div>
            </article>
          </Link>

          {/* Post Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {blogPosts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/the-uncommon-practice/${post.slug}`}
                className="group"
              >
                <article className="h-full overflow-hidden rounded-xl border border-border bg-card hover:border-border/80 hover:shadow-md transition-all flex flex-col shadow-sm">
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border">
                    <img
                      src={post.image || "/logo-transparent.png"}
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#B8654A] bg-[#B8654A]/10 px-2 py-0.5 rounded-full font-sans uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-[10px] text-card-foreground/60 font-sans">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground font-serif group-hover:text-[#B8654A] transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-sm text-[#B8654A]/80 font-serif italic">
                        {post.subtitle}
                      </p>
                      <p className="mt-3 text-sm text-card-foreground/80 font-sans leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 text-xs text-card-foreground/60 font-sans">
                      {post.date}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20 rounded-2xl border border-border bg-card p-8 sm:p-10 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-foreground font-serif">
              The LOVEBetter Letter
            </h3>
            <p className="mt-3 text-card-foreground/80 text-sm font-sans max-w-lg mx-auto">
              Neuroscience-backed insights on love, attachment, and the daily
              practice of building a relationship that actually feels safe.
              Written by Hakeem Lesolang. No fluff.
            </p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 font-sans"
              />
              <button
                type="submit"
                className="bg-[#121212] text-[#F5F2EC] px-6 py-3 rounded-lg text-sm font-bold font-sans hover:bg-[#232323] transition-all whitespace-nowrap"
              >
                Join LOVEBetter
              </button>
            </form>
            <div className="mt-4 flex items-center justify-center gap-3 text-xs font-sans">
              <span className="text-card-foreground/60">or</span>
              <a
                href="https://theuncommonpractice.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B8654A] hover:text-[#B8654A]/80 hover:underline flex items-center gap-1.5 font-medium transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.078v2.836zM1.46 10.881h21.078v11.713L12 16.681l-10.54 5.913V10.881zm0-8.045h21.078V0H1.46v2.836z"/>
                </svg>
                Subscribe on Substack
              </a>
            </div>
            <p className="mt-4 text-xs text-card-foreground/60 font-sans">
              Free. Bi-weekly. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-foreground font-serif">
                LOVEBETTER by FOLA
              </p>
              <p className="text-xs text-card-foreground/60 font-sans mt-1">
                R600 per assessment
              </p>
            </div>
            <nav className="flex items-center gap-6">
              <Link
                href="/the-uncommon-practice"
                className="text-xs text-card-foreground/80 hover:text-foreground transition-colors font-sans"
              >
                The Uncommon Practice
              </Link>
              <Link
                href="/assessment"
                className="text-xs text-[#B8654A] hover:text-[#B8654A]/80 transition-colors font-sans"
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
