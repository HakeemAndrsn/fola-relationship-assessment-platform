import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans py-16 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-border pb-6">
          <img src="/logo-transparent.png" alt="FOLA" className="w-8 h-8 rounded mb-3" />
          <Link href="/" className="text-xs text-[#B8654A] uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">
            &larr; Back to LoveBetter
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif mt-4 text-[#080e1d]">Privacy Policy</h1>
          <p className="text-xs text-card-foreground/60 mt-2">Last Updated: September 19, 2026 | POPIA Transparency</p>
        </header>

        <article className="space-y-6 text-sm text-card-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold font-serif text-[#080e1d] mb-3">1. Commitment to Privacy</h2>
            <p>
              At LOVEBETTER by FOLA, we process highly sensitive information, including what South African law defines as "Special Personal Information" under the Protection of Personal Information Act (POPIA). This includes mental health patterns, childhood trauma indicators, relationship friction points, and neurodivergence screening results. We protect this information through data minimisation, secure transport, access controls, and clear disclosure of where your information goes.
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
              Your personalised on-screen report and downloadable PDF are generated locally in your browser. To deliver the service safely and keep a recoverable practice record:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 pl-4">
              <li><strong>Raw Responses:</strong> Your individual question answers remain in your browser session while you complete the assessment. We do not keep the raw questionnaire as a database record. The browser uses those answers to calculate your report.</li>
              <li><strong>Report Delivery:</strong> When you generate your report, its results, including scores and any clinical flags or recommended pathway, are securely transmitted to our transactional email provider, Brevo, so a copy can be sent to the email address linked to your paid assessment.</li>
              <li><strong>Practice Record:</strong> The same report email is copied to <strong>admin@fola.co.za</strong> and retained in our access-controlled practice inbox as the durable record of the service provided to you. It is not published or shared for advertising.</li>
              <li><strong>CRM Record:</strong> Your contact details and high-level scores are retained in MailerLite to support delivery and follow-up. MailerLite does not receive your raw questionnaire answers or full report through this assessment flow.</li>
              <li><strong>Delivery Security:</strong> Report email requests require short-lived authorisation tied to the verified Yoco purchase and purchaser email. This prevents an unrelated person from using our service to send a report.</li>
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
              <li><strong>Raw Assessment Answers:</strong> Kept only in the active browser session and not retained in a FOLA assessment database. Closing the session removes that browser-session copy.</li>
              <li><strong>Emailed Report & Practice Record:</strong> Retained in the client&apos;s chosen mailbox and our access-controlled practice inbox for up to three (3) years, unless a longer period is required by law or you request earlier deletion where the law permits.</li>
              <li><strong>Contact Info & High-Level Scores:</strong> Retained in our CRM for up to three (3) years to support delivery and any follow-up you request, unless you request earlier deletion.</li>
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
