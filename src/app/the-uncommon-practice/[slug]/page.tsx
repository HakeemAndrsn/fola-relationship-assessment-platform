import Link from "next/link";
import { blogPosts, getPostBySlug } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SocialShare from "@/components/SocialShare";

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

  const title = `${post.title} | The Uncommon Practice | LoveBetter`;
  const description = post.excerpt;
  const url = `https://lovebetter.co.za/the-uncommon-practice/${post.slug}`;
  const imageUrl = post.image ? `https://lovebetter.co.za${post.image}` : "https://lovebetter.co.za/logo-transparent.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: "LOVEBETTER by FOLA",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      publishedTime: post.date,
      authors: ["Hakeem Lesolang"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
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
          className="text-2xl font-bold text-foreground font-serif mt-12 mb-4"
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
          className="text-card-foreground/90 font-sans leading-[1.85] mb-6 text-base"
          dangerouslySetInnerHTML={{
            __html: text
              .replace(
                /\*\*(.+?)\*\*/g,
                '<strong class="text-foreground font-semibold">$1</strong>'
              )
              .replace(/\*(.+?)\*/g, '<em class="text-[#B8654A]">$1</em>')
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
              className="text-sm text-card-foreground hover:text-foreground transition-colors font-sans"
            >
              The Uncommon Practice
            </Link>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 bg-[#121212] text-[#F5F2EC] px-5 py-2.5 rounded-lg text-sm font-bold font-sans hover:bg-[#232323] transition-all hover:shadow-lg border border-border"
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
            className="inline-flex items-center gap-2 text-sm text-card-foreground/80 hover:text-foreground transition-colors font-sans mb-8"
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
              <span className="text-xs font-semibold text-[#B8654A] bg-[#B8654A]/10 px-2.5 py-1 rounded-full font-sans">
                {post.category}
              </span>
              <span className="text-xs text-card-foreground/60 font-sans">
                {post.date}
              </span>
              <span className="text-xs text-card-foreground/60 font-sans">
                {post.readTime}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-serif leading-[1.15]">
              {post.title}
            </h2>
            <p className="mt-3 text-lg text-[#B8654A]/80 font-serif italic">
              {post.subtitle}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B8654A]/10 border border-[#B8654A]/20 flex items-center justify-center">
                <span className="text-sm font-bold text-[#B8654A] font-serif">
                  H
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground font-sans">
                    Hakeem Lesolang
                  </p>
                  <a
                    href="https://theuncommonpractice.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-[#B8654A] hover:text-[#B8654A]/80 hover:underline font-sans font-medium"
                  >
                    (Subscribe on Substack)
                  </a>
                </div>
                <p className="text-xs text-card-foreground/60 font-sans">
                  Hypnotherapist & Peak Performance Coach
                </p>
              </div>
            </div>
          </div>

          {/* Header Image */}
          {post.image && (
            <div className="mb-12 rounded-2xl overflow-hidden border border-border relative aspect-[16/9] w-full shadow-sm">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose-custom">{renderContent(post.content)}</div>

          {/* Social Share */}
          <SocialShare title={post.title} slug={post.slug} />

          {/* Free Discovery Call CTA */}
          <div className="mt-16 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <h3 className="text-xl font-bold text-foreground font-serif">
              Ready to talk about what you just read?
            </h3>
            <p className="mt-2 text-sm text-card-foreground/80 font-sans max-w-md mx-auto">
              Book a free discovery call with Hakeem Lesolang. No pressure. No
              pitch. Just an honest conversation about where you are and where
              you want to be.
            </p>
            <a
              href="https://calendly.com/folasessions/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-[#121212] text-[#F5F2EC] px-6 py-3 rounded-xl text-sm font-bold font-sans hover:bg-[#232323] transition-all hover:shadow-md"
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
          <div className="w-full h-px bg-border my-16" />

          {/* Post Navigation */}
          <div className="grid gap-4 sm:grid-cols-2">
            {prevPost && (
              <Link
                href={`/the-uncommon-practice/${prevPost.slug}`}
                className="group rounded-xl border border-border bg-card p-5 hover:border-border/80 transition-all shadow-sm"
              >
                <p className="text-xs text-card-foreground/60 font-sans mb-1">
                  Previous
                </p>
                <p className="text-sm font-bold text-foreground font-serif group-hover:text-[#B8654A] transition-colors">
                  {prevPost.title}
                </p>
              </Link>
            )}
            {nextPost && (
              <Link
                href={`/the-uncommon-practice/${nextPost.slug}`}
                className="group rounded-xl border border-border bg-card p-5 hover:border-border/80 transition-all sm:text-right shadow-sm"
              >
                <p className="text-xs text-card-foreground/60 font-sans mb-1">Next</p>
                <p className="text-sm font-bold text-foreground font-serif group-hover:text-[#B8654A] transition-colors">
                  {nextPost.title}
                </p>
              </Link>
            )}
          </div>

        </article>
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
              <Link
                href="/privacy"
                className="text-xs text-card-foreground/80 hover:text-foreground transition-colors font-sans"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-card-foreground/80 hover:text-foreground transition-colors font-sans"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
