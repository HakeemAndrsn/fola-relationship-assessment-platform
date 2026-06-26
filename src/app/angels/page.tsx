import Link from "next/link";

export default function AngelsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <header className="border-b border-white/[0.06] px-6 py-4">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#d4af37]/15 border border-[#d4af37]/20 flex items-center justify-center">
              <span className="text-[#d4af37] text-xs font-bold font-serif">F</span>
            </div>
            <span className="text-sm font-bold font-serif text-white">LoveBetter</span>
          </Link>
          <Link
            href="/"
            className="text-xs text-[#a0aec0] hover:text-white transition-colors font-sans"
          >
            ← Back
          </Link>
        </div>
      </header>

      <main className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 px-4 py-1.5 mb-8">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#d4af37] font-sans font-semibold">
              FOLA Angels
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-serif font-bold leading-tight mb-6">
            Made Possible By
          </h1>

          {/* Name */}
          <div className="border-l-2 border-[#d4af37] pl-6 mb-10">
            <p className="text-3xl sm:text-4xl font-serif font-bold text-[#d4af37]">
              Melitah Motlhale
            </p>
            <p className="text-sm text-[#718096] font-sans mt-2">
              First FOLA Angel · 2024
            </p>
          </div>

          {/* Story */}
          <div className="space-y-5 text-[#a0aec0] font-sans leading-relaxed text-sm sm:text-base">
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
            <p className="text-white font-semibold pt-4">
              Melitah, this is what your R10K built. Thank you for being the first.
            </p>
          </div>

          {/* Divider */}
          <div className="my-16 border-t border-white/[0.06]" />

          {/* Future Angels */}
          <div>
            <h2 className="text-lg font-serif font-bold text-white mb-4">
              Become a FOLA Angel
            </h2>
            <p className="text-sm text-[#718096] font-sans leading-relaxed">
              FOLA Angels are the people who fund the mission before it proves itself.
              If you&apos;d like to join Melitah in making what comes next possible,
              reach out at{" "}
              <a
                href="mailto:sessionswithfola@gmail.com"
                className="text-[#d4af37] hover:text-[#e4bf47] transition-colors"
              >
                sessionswithfola@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-6 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs text-[#4a5568] font-sans">
            © {new Date().getFullYear()} LoveBetter by FOLA
          </p>
        </div>
      </footer>
    </div>
  );
}
