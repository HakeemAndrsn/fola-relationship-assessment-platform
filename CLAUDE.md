# Love Better App — Claude Code Briefing

## What This App Is
Love Better (formerly FOLA Relationship Growth Assessment) is a clinically grounded couples assessment tool built under The Oasis by FOLA. It is part of the FOLA Polyclinic ecosystem — a complementary health practice specialising in trauma resolution and optimal wellbeing, founded by Hakeem Lesolang.

Couples complete an 8-dimension relationship assessment. The app generates a personalised report with radar charts, ACE-informed trauma screening, ADHD/neurodivergence mapping, and a 3-phase treatment pathway. Priced at R600 per couple. Sessions upsell from R4,500 to R7,500 depending on phase.

**Live URL:** https://lovebetter.co.za
**Repo:** GitHub (connected to Netlify — pushes to main auto-deploy)
**Host:** Netlify ✅ (migration from Vercel complete)
**Email:** hello@lovebetter.co.za via Google Workspace ✅

---

## Current Architecture — Read Before Touching Anything
The app is **100% client-side**. There is no backend, no database, no auth, and no payments wired in yet. Assessment data lives in `sessionStorage` only and is lost when the tab closes.

- No `.env` file required for current build
- No API routes exist
- No server-side code
- Netlify environment variables panel is currently **empty** — clean slate

This means:
- The assessment works ✅
- The report generates ✅
- Nothing persists after the session closes ⚠️
- No payments are processed yet ⚠️
- No emails are sent yet ⚠️

All backend integrations are to be built. See Priority Build List below.

---

## Tech Stack
- **Framework:** Next.js (static export mode)
- **Styling:** Tailwind CSS
- **Report generation:** Client-side only
- **Database:** Turso (libSQL) via Drizzle ORM — installed but no schema exists yet
- **Auth:** better-auth — installed but not configured yet
- **Payment:** YOCO — keys exist in Netlify but not wired into codebase yet
- **Payment (unused):** Stripe SDK present in codebase — no integration exists, do not build Stripe
- **Email:** Brevo via hello@lovebetter.co.za — API key to be added to Netlify when backend is built
- **Analytics:** None yet — Plausible to be added (POPIA-friendly, never Google Analytics)
- **Deployment:** Netlify, static export, publish directory: `out`, Node 22
- **Config files:** `netlify.toml` and `next.config.ts` both correctly configured — do not modify

---

## Netlify Configuration (Confirmed Working — Do Not Change)
`netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "22"
```

`next.config.ts`:
```ts
output: 'export'
images: { unoptimized: true }
```

Do not add `outputFileTracingRoot` — it conflicts with static export and broke a previous deploy.

---

## Environment Variables
Netlify environment variables panel is currently empty. Add variables only when the corresponding backend integration is actually being built. Never add variables speculatively.

Variables to add when building each integration:

| Variable | Used For | When to Add |
|----------|----------|-------------|
| `YOCO_PUBLIC_KEY` | Payment — public key | YOCO integration build |
| `YOCO_SECRET_KEY` | Payment — secret key | YOCO integration build |
| `BREVO_API_KEY` | Email sending | Netlify Function build |
| `TURSO_DATABASE_URL` | Database connection | Database schema build |
| `TURSO_AUTH_TOKEN` | Database auth | Database schema build |
| `BETTER_AUTH_SECRET` | Session signing | Auth build |
| `BETTER_AUTH_URL` | Auth base URL → https://lovebetter.co.za | Auth build |
| `NEXT_PUBLIC_APP_URL` | Public app URL → https://lovebetter.co.za | Auth build |
| `GOOGLE_SHEETS_CREDENTIALS` | Audit log service account | Google Sheet build |
| `GOOGLE_SHEET_ID` | Audit log sheet ID | Google Sheet build |

Never add Stripe variables — Stripe is not being used. YOCO is the payment processor.

---

## DNS & Domain (Complete — Do Not Touch)
All DNS records on Afrihost are correctly configured:

| Record | Value | Status |
|--------|-------|--------|
| A @ | 75.2.60.5 (Netlify) | ✅ |
| A www | 75.2.60.5 (Netlify) | ✅ |
| A * (wildcard) | 75.2.60.5 (Netlify) | ✅ |
| MX records (×5) | Google Workspace | ✅ |
| SPF | Google Workspace | ✅ |
| DMARC | Configured | ✅ |

Do not modify any DNS records. Do not touch the MX, SPF, or DMARC records under any circumstances — hello@lovebetter.co.za email depends on them.

---

## Brand & Voice
- **Brand:** Love Better / The Oasis by FOLA
- **Palette:** Deep Midnight background, Royal Violet accents, clinical typography
- **Tone:** Clinical, peer-level, authoritative. No soft wellness language.
- **Banned words/phrases:** "rooted in", "embark", "delve", "game-changer", "feel free to", "hope/hoping", "try/trying"
- Full brand voice reference: FOLA Brand Voice Profile v1.0 (ask Hakeem for Drive link)

---

## App Rename Status
The app has been renamed from "FOLA Relationship Growth Assessment" to **Love Better**.

Remaining rename tasks:
- [ ] App title and all meta tags (`<title>`, og:title, og:description)
- [ ] All hardcoded strings referencing the old name in components
- [ ] Report PDF header and branding
- [ ] README.md
- [ ] Any email templates referencing the old name

Do NOT rename: LOVEBetter Letter references — these are already correctly named.

---

## Assessment Structure (Do Not Break)
The assessment covers 8 dimensions:
1. Communication & Conflict Resolution
2. Emotional Intimacy & Vulnerability
3. Trust & Security
4. Shared Values & Life Vision
5. Physical & Sensual Connection
6. Individual Growth & Autonomy
7. Adverse Childhood Experiences (ACE) + Neurodivergence Screening
8. Spiritual & Meaning Alignment — shared framework for meaning-making, how the couple navigates grief and crisis, spiritual/religious practice compatibility, and alignment on what they are building together and why

The report generates a radar chart and assigns the couple to one of three phases:
- **Phase 1 — Stabilisation** (high risk flags)
- **Phase 2 — Growth** (moderate flags)
- **Phase 3 — Maintenance** (low risk, solid foundation)

The assessment flow currently works. The report currently generates. Do not refactor these unless explicitly instructed.

---

## Backend Build Sequence
Build in this order — each layer depends on the one before it:

```
1. Database schema (Turso + Drizzle)
2. Auth (better-auth)
3. YOCO payment
4. Netlify Functions (report delivery + Google Sheet audit log)
5. Brevo email sequence
6. Dual-partner flow (requires all of the above)
```

Do not skip steps or build out of order. The dual-partner flow is the most important functional build but it cannot exist without the database, auth, and payment layers beneath it.

---

## Priority Build List

### 🔴 Before Launch (Complete First)

**1. Database Schema — Turso + Drizzle ORM**
- Turso and Drizzle are already installed — no schema files exist yet
- Schema needs the following tables at minimum:
  - `assessments` — id, created_at, status, phase_result, payment_status
  - `partners` — id, assessment_id, email, completed_at, responses (JSON)
  - `reports` — id, assessment_id, generated_at, pdf_url, emailed_to_hakeem
- Add `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` to Netlify env vars when building this

**2. Auth — better-auth**
- better-auth is already installed — not configured yet
- Needed to generate secure session tokens for the dual-partner flow
- Set `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `NEXT_PUBLIC_APP_URL` in Netlify when building
- Do not build a full user login system — auth is only needed for session token generation at this stage

**3. YOCO Payment Integration**
- YOCO keys (`YOCO_PUBLIC_KEY`, `YOCO_SECRET_KEY`) to be added to Netlify when building
- Activate R600 payment at the assessment entry point
- Merchant account is under FOLA Polyclinic (Pty) Ltd — transfer from BecauseBlack Co pending
- On successful payment: unlock assessment flow + trigger Brevo confirmation email
- Generate a receipt/invoice record on every transaction for SARS records
- Do not build Stripe — YOCO only
- USD pricing via PayFast is a 90-day task — do not build now

**4. Netlify Function — Report Delivery to Hakeem**
- When the report generates client-side, serialize to JSON and POST to a Netlify Function
- The function does two things:
  - Emails the full report to hello@lovebetter.co.za via Brevo
  - Appends a row to the Google Sheet audit log (see item 5)
- Add `BREVO_API_KEY` to Netlify when building this
- This runs on every completed report — Hakeem receives every report without manual effort
- Critical for SARS records and conversion tracking

**5. Google Sheet Audit Log**
- Fresh sheet to be created: "Love Better — Report Audit Log"
- Columns: Submission Date, Couple Name, Partner A Email, Partner B Email, Phase Result, Dimension Scores (JSON), Report Generated (Y/N)
- Populated by the Netlify Function in item 4
- Use Google Sheets API with a service account
- Add `GOOGLE_SHEETS_CREDENTIALS` and `GOOGLE_SHEET_ID` to Netlify when building

**6. POPIA Compliance**
- Add a consent checkbox before the assessment begins — required, cannot proceed without it
- Consent copy: "I understand this assessment is a screening tool and does not constitute a clinical diagnosis. I consent to my responses being used to generate my personalised report."
- Add a Privacy Policy page — data handling, POPIA compliance, right to deletion
- Once the Netlify Function is built, update the privacy policy to reflect that report data is emailed to hello@lovebetter.co.za — the "data never leaves your browser" statement must be updated accordingly

**7. ACE Crisis Resource in Report Flow**
- If a respondent scores high on the ACE screening dimension, the report must surface a crisis/referral resource
- Copy: "Your responses indicate significant adverse childhood experiences. We strongly recommend speaking with a qualified practitioner. FOLA offers a Breakthrough Session specifically designed to address these roots. You can also contact SADAG: 0800 456 789."
- Clinical and legal requirement — do not skip

**8. Brevo Email Sequence (4 emails)**
- Email 1: Payment confirmation (immediate, on successful YOCO payment)
- Email 2: Assessment complete (triggers when both partners have submitted)
- Email 3: Report delivery (PDF attachment + in-browser link)
- Email 4: 48-hour follow-up (session packaging offer — see Session Packages section)
- All emails from hello@lovebetter.co.za — never Gmail
- Brevo list: "LOVEBetter Couples" — separate from FOLA clinical leads list

**9. Report PDF Branding Audit**
- Verify Deep Midnight / Royal Violet palette throughout
- Must include: Hakeem Lesolang's name and credentials as clinical author
- Must include: session package recommendations with pricing
- Must be downloadable as a shareable PDF — not just viewable in-browser

---

### 🟡 Within 30 Days

**10. Dual-Partner Flow (Most Important Functional Build)**

Current gap: one person fills in the assessment. This does not fulfil the "both partners included" promise.

Required flow:
```
Partner A pays R600 → completes assessment
→ receives unique shareable link for Partner B
→ Partner B completes assessment independently (no payment required)
→ system holds both response sets in Turso database
→ report generates ONLY when both partners have submitted
→ radar chart plots BOTH partners on the same chart
→ report shows: individual scores + combined compatibility analysis
   + where you align + where you diverge
→ PDF delivers to both partners simultaneously via Brevo
→ Netlify Function emails full report to hello@lovebetter.co.za
→ Google Sheet audit log updated
```

Key details:
- Partner B link expires after 7 days — reminder email at Day 3 and Day 6
- If Partner B does not complete, Partner A receives a single-partner interim report with a note that the full comparative report requires both submissions
- Use UUID to link both submissions — do not use email as primary key

**11. Analytics — Plausible**
- Privacy-first, POPIA-compliant — never Google Analytics
- Track full funnel as named events:
  - `landing_page_view`
  - `assessment_started`
  - `partner_link_sent`
  - `partner_b_completed`
  - `report_generated`
  - `report_emailed_to_hakeem`
  - `session_booked`

**12. Report Personalisation Audit**
- Confirm 3-phase treatment plan is personalised to each couple's actual dimension scores
- If template-based: build score-based conditional logic
- Minimum: dimension-specific callouts based on the two lowest-scoring areas
- Dimension 8 (Spiritual & Meaning Alignment) must be included in radar chart and phase calculation

---

### 🟢 Within 90 Days

**13. USD Payment via PayFast**
- For diaspora couples (UK, US, Canada, UAE, Australia)
- Assessment entry: $40 USD
- Phase 1 & 2 packages: $450 USD / Phase 3: $270 USD

**14. LOVEBetter Letter Newsletter**
- Connect newsletter signup to Brevo list: "LOVEBetter Letter"
- Separate from "LOVEBetter Couples" list
- 3-email welcome sequence (Hakeem to provide copy)
- First 4 editions to be written (Hakeem + Substack agent)

**15. Therapist Referral Programme**
- Therapist-facing landing page: /therapists
- Professional account tier
- Referral source tracking
- B2B distribution play — do not skip

**16. Calendly Integration**
- Deep-link to Hakeem's Calendly in the report CTA
- Pre-fill with couple name and phase result where API allows

---

## Session Packages (For Report & Email Use)

### Phase 1 — Stabilisation Package
- 5 sessions (2 joint, 2 individual, 1 joint review)
- R7,500 full package (saving R1,500 vs per session rate)
- $450 USD diaspora
- Upsell: individual ART packages for both partners (R36,508 each)

### Phase 2 — Growth Package
- 5 joint sessions
- R7,500 full package
- $450 USD diaspora
- Upsell: individual Breakthrough Sessions (R1,800 each)

### Phase 3 — Maintenance Package
- 3 joint sessions
- R4,500 full package (saving R900)
- $270 USD diaspora
- Upsell: FOLA Farms Couple's Recalibration Retreat (R22,000–R40,000, available 2026+)

---

## What NOT To Do
- Never route email sends through Gmail — always Brevo via hello@lovebetter.co.za
- Never hardcode API keys — always Netlify environment variables
- Never refactor the working assessment flow or report generation without explicit instruction
- Never use localStorage for sensitive assessment data
- Never add Google Analytics — Plausible only
- Never build Stripe integration — YOCO is the payment processor
- Never modify `netlify.toml` or `next.config.ts` without understanding the static export dependency
- Never add `outputFileTracingRoot` to next.config.ts — it breaks the build
- Never position Love Better as a clinical diagnosis tool in any copy
- Never touch MX, SPF, or DMARC records — email depends on them

---

## Connected FOLA Ecosystem
- **FOLA Polyclinic:** Parent brand — complementary health practice
- **Mirath:** Islamic estate planning platform — https://3000-iop024h3zx4wkow54kibv-6532622b.e2b.dev/
- **The Uncommon Practice:** Hakeem's Substack — intellectual voice
- **FOLA Farms:** Provincial wellness retreat infrastructure — in development
- **FOLA Organisational Playbook v1.0:** Google Drive (ask Hakeem for link)
- **FOLA Brand Voice Profile v1.0:** Google Drive (ask Hakeem for link)

---

## Outstanding Items (Not Yet Resolved)
- YOCO merchant account transfer from BecauseBlack Co to FOLA Polyclinic — pending
- Form handler in current codebase — not yet identified, check before touching any forms
- Vercel project — confirm it has been deleted now that Netlify is live
