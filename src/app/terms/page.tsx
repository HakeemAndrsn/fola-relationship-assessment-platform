import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans py-16 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-border pb-6">
          <Link href="/" className="text-xs text-[#B8654A] uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">
            &larr; Back to LoveBetter
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif mt-4 text-[#080e1d]">Terms of Service</h1>
          <p className="text-xs text-card-foreground/60 mt-2">Last Updated: June 30, 2026</p>
        </header>

        <article className="space-y-6 text-sm text-card-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold font-serif text-[#080e1d] mb-3">1. Services Provided</h2>
            <p>
              LOVEBETTER by FOLA provides relationship and personal growth readiness diagnostic tools, blog content (The Uncommon Practice), and integration session scheduling. All assessments are priced at a flat rate of R600 (one-time fee).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold font-serif text-[#080e1d] mb-3">2. Clinical Disclaimer</h2>
            <p>
              Our assessments are screening instruments designed to identify relational dynamics, attachment patterns, and stress points. They are **not** clinical diagnoses, psychiatric assessments, or a replacement for professional medical advice, psychotherapy, or couples therapy. If you are experiencing severe psychological distress, please contact a qualified healthcare practitioner.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold font-serif text-[#080e1d] mb-3">3. Payments & Refund Policy</h2>
            <p>
              We stand behind the quality of our diagnostics. All assessment purchases are covered by our <strong>7-day money-back guarantee</strong>:
            </p>
            <p className="mt-2">
              If the generated report does not change how you see your relationship or provide actionable self-awareness, you can request a full refund by emailing us at <a href="mailto:fola@fola.co.za" className="text-[#B8654A] underline">fola@fola.co.za</a> within 7 days of your purchase. Once verified, we will refund your paid amount of R600 to your bank account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold font-serif text-[#080e1d] mb-3">4. Intellectual Property</h2>
            <p>
              The diagnostics, assessment questions, algorithms, report layouts, and articles are the sole intellectual property of LOVEBETTER by FOLA. Unauthorized reproduction, modification, or distribution of these materials is strictly prohibited.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
