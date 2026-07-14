import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans py-16 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-border pb-6">
          <Link href="/" className="text-xs text-[#B8654A] uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">
            &larr; Back to LoveBetter
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif mt-4 text-[#080e1d]">Privacy Policy</h1>
          <p className="text-xs text-card-foreground/60 mt-2">Last Updated: June 30, 2026 | POPIA Compliance</p>
        </header>

        <article className="space-y-6 text-sm text-card-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold font-serif text-[#080e1d] mb-3">1. Commitment to Privacy</h2>
            <p>
              At LOVEBETTER by FOLA, we process highly sensitive information, including what South African law defines as "Special Personal Information" under the Protection of Personal Information Act (POPIA). This includes mental health patterns, childhood trauma indicators, relationship friction points, and neurodivergence screening results. We are dedicated to ensuring the absolute security and privacy of this data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold font-serif text-[#080e1d] mb-3">2. Information We Collect</h2>
            <p>To deliver our relationship readiness diagnostic services, we collect:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 pl-4">
              <li><strong>Contact Information:</strong> Your name, email address, and phone number.</li>
              <li><strong>Payment Data:</strong> Payment details processed securely through our payment provider, Yoco. We do not store or see your raw credit card numbers.</li>
              <li><strong>Assessment Responses:</strong> Your answers to the questions across our clinical-grade relationship dimensions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold font-serif text-[#080e1d] mb-3">3. How We Process and Store Your Data</h2>
            <p>
              We run a secure server-side architecture to generate your personalized PDF report. To maintain strict compliance and protect your privacy:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 pl-4">
              <li><strong>Raw Responses:</strong> Your individual question answers are encrypted in transit and are **never** stored permanently on public web servers. Once your PDF report is compiled, generated, and delivered to your inbox, the raw questionnaire responses are wiped from our active web servers.</li>
              <li><strong>Report Records:</strong> We retain only the final generated Report ID, your contact details (for delivery and billing verification), and your high-level scores in our secure CRM system (MailerLite/Airtable).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold font-serif text-[#080e1d] mb-3">4. Purpose of Processing</h2>
            <p>We process your data strictly to:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 pl-4">
              <li>Generate and email your custom relationship diagnostic report and invoice.</li>
              <li>Verify payment completion via Yoco.</li>
              <li>Coordinate bookings for follow-up Breakthrough or Integration Sessions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold font-serif text-[#080e1d] mb-3">5. Lawful Basis and Data Retention</h2>
            <p>
              <strong>Lawful Basis:</strong> We process your personal information based on (a) your explicit, voluntary consent when you start the assessment and enter your details, and (b) the performance of a contract to compile and deliver the assessment report you purchased.
            </p>
            <p className="mt-2">
              <strong>Retention Periods:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mt-1 pl-4">
              <li><strong>Raw Assessment Answers:</strong> Wiped immediately after the PDF report is compiled and generated. These are never stored.</li>
              <li><strong>Contact Info & High-Level Scores:</strong> Retained for a period of three (3) years to support your clinical journey and potential regression integration sessions, unless you request earlier deletion.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold font-serif text-[#080e1d] mb-3">6. Information Officer & Contact</h2>
            <p>
              Our designated Information Officer under POPIA is:
            </p>
            <p className="mt-2 font-semibold">Hakeem Lesolang</p>
            <p>Email: <a href="mailto:admin@fola.co.za" className="text-[#B8654A] underline">admin@fola.co.za</a></p>
            <p className="mt-2">
              Under POPIA, you have the right to access, rectify, or request the deletion of your personal information from our records at any time.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
