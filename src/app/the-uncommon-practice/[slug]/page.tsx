import Link from "next/link";
import { blogPosts, getPostBySlug } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | The Uncommon Practice`,
    description: post.excerpt,
  };
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-2xl font-bold text-white font-serif mt-12 mb-4"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.trim() === "") {
      // skip empty lines
    } else {
      // Paragraph - collect consecutive non-empty, non-heading lines
      const paraLines: string[] = [line];
      while (
        i + 1 < lines.length &&
        lines[i + 1].trim() !== "" &&
        !lines[i + 1].startsWith("## ")
      ) {
        i++;
        paraLines.push(lines[i]);
      }
      const text = paraLines.join("\n");
      elements.push(
        <p
          key={i}
          className="text-[#cbd5e0] font-sans leading-[1.85] mb-6 text-base"
          dangerouslySetInnerHTML={{
            __html: text
              .replace(
                /\*\*(.+?)\*\*/g,
                '<strong class="text-white font-semibold">$1</strong>'
              )
              .replace(/\*(.+?)\*/g, '<em class="text-[#d4af37]/80">$1</em>')
              .replace(/\n/g, "<br />"),
          }}
        />
      );
    }
    i++;
  }

  return elements;
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f3d] to-[#1a365d]">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a1628]/80 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-lg font-bold text-white tracking-tight font-serif">
              The Oasis by FOLA
            </h1>
            <p className="text-[10px] text-[#a0aec0] tracking-wide font-sans">
              Hakeem — Hypnotherapist & Peak Performance Coach
            </p>
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="/the-uncommon-practice"
              className="text-sm text-[#a0aec0] hover:text-white transition-colors font-sans"
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
        <article className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href="/the-uncommon-practice"
            className="inline-flex items-center gap-2 text-sm text-[#a0aec0] hover:text-white transition-colors font-sans mb-8"
          >
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
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
            Back to The Uncommon Practice
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded-full font-sans">
                {post.category}
              </span>
              <span className="text-xs text-[#718096] font-sans">
                {post.date}
              </span>
              <span className="text-xs text-[#718096] font-sans">
                {post.readTime}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif leading-[1.15]">
              {post.title}
            </h2>
            <p className="mt-3 text-lg text-[#d4af37]/70 font-serif italic">
              {post.subtitle}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/30 flex items-center justify-center">
                <span className="text-sm font-bold text-[#d4af37] font-serif">
                  H
                </span>
              </div>
                <div>
                  <p className="text-sm font-semibold text-white font-sans">
                    Hakeem Lesolang
                  </p>
                  <p className="text-xs text-[#718096] font-sans">
                    Hypnotherapist & Peak Performance Coach
                  </p>
                </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-[#d4af37]/30 mb-12" />

          {/* Content */}
          <div className="prose-custom">{renderContent(post.content)}</div>

            {/* Free Discovery Call CTA */}
            <div className="mt-16 rounded-2xl border border-[#d4af37]/30 bg-gradient-to-b from-[#d4af37]/10 to-transparent p-8 text-center">
              <h3 className="text-xl font-bold text-white font-serif">
                Ready to talk about what you just read?
              </h3>
              <p className="mt-2 text-sm text-[#a0aec0] font-sans max-w-md mx-auto">
                Book a free discovery call with Hakeem Lesolang. No pressure. No
                pitch. Just an honest conversation about where you are and where
                you want to be.
              </p>
              <a
                href="https://calendly.com/folasessions/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 bg-[#d4af37] text-[#1a365d] px-6 py-3 rounded-xl text-sm font-bold font-sans hover:bg-[#e4bf47] transition-all hover:shadow-lg hover:shadow-[#d4af37]/20"
              >
                Book Your Free Discovery Call
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10 my-16" />

            {/* Post Navigation */}
          <div className="grid gap-4 sm:grid-cols-2">
            {prevPost && (
              <Link
                href={`/the-uncommon-practice/${prevPost.slug}`}
                className="group rounded-xl border border-white/10 bg-white/5 p-5 hover:border-[#d4af37]/30 transition-all"
              >
                <p className="text-xs text-[#718096] font-sans mb-1">
                  Previous
                </p>
                <p className="text-sm font-bold text-white font-serif group-hover:text-[#d4af37] transition-colors">
                  {prevPost.title}
                </p>
              </Link>
            )}
            {nextPost && (
              <Link
                href={`/the-uncommon-practice/${nextPost.slug}`}
                className="group rounded-xl border border-white/10 bg-white/5 p-5 hover:border-[#d4af37]/30 transition-all sm:text-right"
              >
                <p className="text-xs text-[#718096] font-sans mb-1">Next</p>
                <p className="text-sm font-bold text-white font-serif group-hover:text-[#d4af37] transition-colors">
                  {nextPost.title}
                </p>
              </Link>
            )}
          </div>


        </article>
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
