import Link from "next/link";

export default function AngelsPage() {
  return (
    <div className="min-h-screen bg-background text-card-foreground texture-paper" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(184, 101, 74, 0.12) 0%, rgba(124, 134, 115, 0.06) 50%, transparent 70%)" }}>
      {/* Nav */}
      <header className="border-b border-border px-6 py-4 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#B8654A]/10 border border-[#B8654A]/20 flex items-center justify-center">
              <span className="text-[#B8654A] text-xs font-bold font-serif">F</span>
            </div>
            <span className="text-sm font-bold font-serif text-foreground">LoveBetter</span>
          </Link>
          <Link
            href="/"
            className="text-xs text-card-foreground/80 hover:text-foreground transition-colors font-sans"
          >
            ← Back
          </Link>
        </div>
      </header>

      <main className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B8654A]/20 bg-[#B8654A]/5 px-4 py-1.5 mb-8">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#B8654A] font-sans font-semibold">
              FOLA Angels
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground leading-tight mb-6">
            Made Possible By
          </h1>

          {/* Name */}
          <div className="border-l-2 border-[#B8654A] pl-6 mb-10">
            <p className="text-3xl sm:text-4xl font-serif font-bold text-[#B8654A]">
              Melitah Motlhale
            </p>
            <p className="text-sm text-card-foreground/60 font-sans mt-2">
              First FOLA Angel · 2024
            </p>
          </div>

          {/* Story */}
          <div className="space-y-5 text-card-foreground/90 font-sans leading-relaxed text-sm sm:text-base">
            <p>
              In 2024, before LoveBetter had a name, before a single line of code was written,
              Melitah Motlhale believed in what this could become.
            </p>
            <p>
              She invested R10,000 — no strings, no equity, no timeline. Just trust in the vision
              and a belief that South Africans deserved a better way to understand their relationships.
            </p>
            <p>
              That investment built this platform. Every assessment taken, every relationship
              transformed, every person who walks away with clarity — it all traces back to
              someone who said yes before there was anything to show.
            </p>
            <p className="text-foreground font-semibold pt-4">
              Melitah, this is what your R10K built. Thank you for being the first.
            </p>
          </div>

          {/* CTA — Join Melitah */}
          <div className="my-16 rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
              Join Melitah.
            </h2>
            <p className="text-sm sm:text-base text-card-foreground/80 font-sans leading-relaxed mb-6">
              FOLA is building the largest trauma resolution practice in Africa — a flagship
              clinic in Hazelwood, a university to train and retain practitioners, and a
              relationship assessment platform that&apos;s already live.
            </p>
            <p className="text-sm sm:text-base text-card-foreground/80 font-sans leading-relaxed mb-8">
              We&apos;re looking for angels who see what&apos;s possible before it&apos;s obvious.
            </p>
            <a
              href="https://calendly.com/folasessions/fola-polyclinic-investor-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl bg-[#121212] text-[#F5F2EC] px-8 py-3.5 text-sm font-bold font-sans hover:bg-[#232323] transition-colors"
            >
              Book an Investor Call →
            </a>
            <p className="text-xs text-card-foreground/60 font-sans mt-4">
              R50,000 minimum. No equity. No timeline. Just belief.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto max-w-4xl text-center space-y-2">
          <p className="text-xs text-card-foreground/50 font-sans">
            © {new Date().getFullYear()} LOVEBETTER by FOLA
          </p>
          <div className="flex justify-center gap-4 text-xs text-card-foreground/60 font-sans">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <span className="text-border">|</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
