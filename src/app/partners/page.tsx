import Link from "next/link";

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background text-card-foreground texture-paper" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(184, 101, 74, 0.12) 0%, rgba(124, 134, 115, 0.06) 50%, transparent 70%)" }}>
      {/* Nav */}
      <header className="border-b border-border px-6 py-4 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-transparent.png" alt="FOLA" className="w-7 h-7 rounded" />
            <span className="text-sm font-bold font-serif text-foreground">LoveBetter</span>
          </Link>
          <Link href="/" className="text-xs text-card-foreground/80 hover:text-foreground transition-colors font-sans">
            ← Back
          </Link>
        </div>
      </header>

      <main className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B8654A]/20 bg-[#B8654A]/5 px-4 py-1.5 mb-8">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#B8654A] font-sans font-semibold">
              For Mental Health Professionals
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground leading-tight mb-6">
            A screening tool that gives you session one back.
          </h1>
          <p className="text-base sm:text-lg text-card-foreground/80 font-sans leading-relaxed mb-14 max-w-2xl">
            FOLA isn&apos;t a replacement for the work you do. It&apos;s the intake layer underneath it —
            a clinical screening instrument your clients complete before they ever sit across from you,
            so the first session starts with data instead of discovery.
          </p>

          {/* How it fits into practice */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">How practices use FOLA</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  title: "Pre-intake triage",
                  body: "Send a client the assessment before their first session. They arrive with a scored profile across 8–10 clinical dimensions instead of a blank intake form.",
                },
                {
                  title: "Referral pathway",
                  body: "For couples who reach out but aren't ready to commit to therapy — FOLA gives them a low-stakes first step, and gives you a warmer, better-informed referral when they are ready.",
                },
                {
                  title: "Between-session re-measurement",
                  body: "Have a client retake the assessment at a natural checkpoint to get an objective read on movement, alongside your own clinical judgment.",
                },
                {
                  title: "A second data point, not a diagnosis",
                  body: "The report is explicitly framed as a screening instrument, not a clinical diagnosis — it's built to sit alongside your assessment, never to replace it.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-foreground font-serif mb-2">{item.title}</h3>
                  <p className="text-xs text-card-foreground/80 leading-relaxed font-sans">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Frameworks */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Built on the frameworks you already use</h2>
            <p className="text-sm text-card-foreground/80 font-sans leading-relaxed mb-6 max-w-2xl">
              Every dimension FOLA scores maps to a named, peer-reviewed clinical framework — nothing proprietary or unexplainable hiding underneath the report.
            </p>
            <div className="space-y-4">
              {[
                { name: "Attachment Theory (Bowlby & Ainsworth)", body: "Attachment style is scored directly and weighted across every other domain." },
                { name: "The Gottman Method", body: "Gottman's research on relationship success/failure predictors informs our clinical risk flags." },
                { name: "Emotionally Focused Therapy (EFT — Sue Johnson)", body: "The lens behind our critical fracture point and conflict-cycle analysis." },
                { name: "ACE (Adverse Childhood Experiences) research", body: "Underpins the trauma inventory domain." },
              ].map((item) => (
                <div key={item.name} className="border-l-2 border-[#B8654A]/30 pl-5">
                  <p className="text-sm font-bold text-foreground font-sans">{item.name}</p>
                  <p className="text-xs text-card-foreground/70 font-sans mt-1">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-card-foreground/60 font-sans mt-6">
              Full citations are included in every clinical report generated on the platform.
            </p>
          </section>

          {/* Data & compliance */}
          <section className="mb-16 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">On data protection</h2>
            <p className="text-sm text-card-foreground/80 font-sans leading-relaxed mb-3">
              We know you can&apos;t ethically refer a client to a platform without visible, verifiable data
              protection policies. FOLA does not store assessment answers or reports on our servers —
              results exist only in the client&apos;s own browser session and, if they choose, their inbox.
            </p>
            <p className="text-sm text-card-foreground/80 font-sans leading-relaxed">
              Read our full{" "}
              <Link href="/privacy" className="text-[#B8654A] underline hover:opacity-80">Privacy Policy</Link>
              {" "}and{" "}
              <Link href="/terms" className="text-[#B8654A] underline hover:opacity-80">Terms of Service</Link>
              {" "}— POPIA-aligned, and written to be read, not skimmed past.
            </p>
          </section>

          {/* Boundaries */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">What FOLA is not</h2>
            <p className="text-sm text-card-foreground/80 font-sans leading-relaxed max-w-2xl">
              FOLA is not a replacement for therapy, and we say that explicitly to every client who uses it.
              We&apos;re not trying to compete with the room you sit in with your clients — we&apos;re trying to
              make what happens before they get there more useful to both of you.
            </p>
          </section>

          {/* CTA */}
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-sm text-center">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
              Let&apos;s talk about your practice.
            </h2>
            <p className="text-sm sm:text-base text-card-foreground/80 font-sans leading-relaxed mb-8 max-w-xl mx-auto">
              Whether you want to send clients an assessment before intake, explore a referral pathway,
              or just have questions about the clinical methodology — we&apos;d like to hear from you.
            </p>
            <a
              href="mailto:admin@fola.co.za?subject=Partnering%20with%20FOLA"
              className="inline-block rounded-xl bg-[#121212] text-[#F5F2EC] px-8 py-3.5 text-sm font-bold font-sans hover:bg-[#232323] transition-colors"
            >
              Email admin@fola.co.za →
            </a>
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
