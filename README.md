# LOVEBETTER by FOLA

An elevated, clinical-grade relational diagnostics and self-assessment platform built for **FOLA** by Hakeem Lesolang.

## Architecture & Core Tech

- **Framework:** Next.js 15 (App Router, Tailwind CSS, TypeScript).
- **Deployment:** Netlify with `@netlify/plugin-nextjs` and edge caching bypass headers.
- **Integrations:** 
  - **Yoco Checkout:** Secure payment gate for individual (R600), couples (R600), and bundle (R1,000) transactions.
  - **MailerLite:** Direct serverless integration for onboarding, invoice delivery, and clinical follow-ups.

---

## Key System Flows

### 1. Server-Side Payment Validation
Instead of client-side local flags, all transaction entitlements are validated server-side via the Netlify Edge Function `/api/validate-checkout`:
1. Upon Yoco checkout completion, Yoco redirects to the assessment route appending a checkout `id` query parameter.
2. The frontend calls `/api/validate-checkout`, which makes a backend request to Yoco's Checkouts API (`GET https://payments.yoco.com/api/checkouts/{checkoutId}`) using the secure `YOCO_SECRET_KEY` environment variable.
3. If confirmed `successful`, it sets the verified checkout ID and customer email to unlock the questionnaire.
4. **Replay Protection:** The assessment's final report is locked to the Yoco metadata email, ensuring a shared checkout ID cannot be replayed under an arbitrary address.

### 2. POPIA & Special Personal Information
The platform measures highly sensitive indices (Attachment style, trauma/ACE screening, emotional regulation, neurodivergence). 
- **Raw Questionnaire Data:** Encrypted in transit and processed purely in the browser. Answers are **never** stored permanently on public web servers or database files.
- **Record Retention:** Raw response structures are wiped immediately following PDF compilation and delivery. The platform retains only billing contact records and high-level composite scores for a period of up to 3 years to support clinical integration and regression therapy packages.

---

## Local Development & Setup

### Requirements
- Node.js 18+ or Bun
- Netlify CLI (`npm install -g netlify-cli`)

### Running Locally
```bash
# Install dependencies
npm install

# Start the Next.js development server
npm run dev

# Run and test Netlify functions locally
netlify dev
```

### Compiling Mock PDFs
To regenerate the static mock PDF reports located in the project root:
```bash
node scripts/generate-mock-report.mjs
```
This builds the site, starts a temporary Puppeteer instance on port 3999, and prints fresh, rebranded mock files for both individual and couples assessments.

---

## Deployment
Production builds and CDN cache purging are handled automatically on pushes to `main` via Netlify. To deploy directly from the local workspace:
```bash
# Perform a clean production build & deploy
rm -rf .next && npx netlify build && npx netlify deploy --prod
```
The homepage `/` is configured with edge-bypass cache headers (`Cache-Control`, `CDN-Cache-Control`, `Netlify-CDN-Cache-Control`) to prevent stale CDNs from serving legacy page iterations.
