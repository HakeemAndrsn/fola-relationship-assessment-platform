# Changelog

## 30 June 2026 — Favicon Upgrade + Independent Parenting Framework

### Added
- High-quality gold monogram "LB" favicon assets generated and scaled using macOS `sips` to all standard formats (ICO, Apple touch icon, and PNG sizes: 16px, 32px, 48px, 64px, 192px, 512px).
- All-encompassing, first-principles Parenting Assessment Framework covering diverse caregiving pathways (single parents, blended, co-parenting, kinship, adoptive, grieving) and everyday stressors (mental health, financial/time poverty).
- Local PDF compiler script `scripts/generate-parenting-framework-pdf.js` and compiled output PDF locally at `/Users/fola/parenting_assessment_framework.pdf` to preserve Netlify build credits.

## 29 June 2026 — WhatsApp Social Share + Substack Integration + Premium Blog Mockups

### Added
- Integrated WhatsApp sharing into the `SocialShare` component and rendered it on all blog articles.
- Substack subscription links (`https://theuncommonpractice.substack.com`) added to the main blog index, the newsletter sign-up CTA card, and individual article footers.
- Premium social media static ad mockups generated and packaged locally as `/Users/fola/lovebetter_ad_mockups.zip`.
- Dynamic SEO and Open Graph metadata mapped to blog articles for rich social media cards using individual post covers.

### Changed
- Replaced outdated "The Oasis by FOLA" references in headers/footers with "LOVEBETTER by FOLA" across the blog index, articles, and individual assessment page.

## 7 June 2026 — FAQ Trust Signals + Warm-Traffic CTA

### Added
- Sticky CTA bar appears after scrolling past hero: "Done the assessment? Ready to do the work?" → discovery call link. Targets warm/returning visitors without distracting cold traffic.

### Changed
- Two trust-critical FAQ questions now expanded by default: "Is this a replacement for therapy?" and "Is my data private?" — addresses top conversion objections at the point of friction.

## 6 June 2026 — Prejudices & Biases + Pricing Floor + Cohort Rename

**New dimension: Prejudices & Biases**
Six new questions surface where beliefs about the opposite gender come from, what habits they create, the cost, and willingness to question them. Scores below 45 flag the cohort as the recommended starting point. Weighted at 10% of the overall score. Added to both individual and couples assessments.

**Pricing floor set at R2,700**
Breakthrough and Maintenance sessions now start at R2,700 — nothing lower. All individual and couples session prices standardised to this floor. Age Regression Therapy stays at R4,000.

**Cohort renamed**
LoveBetter Foundations is now **The DoLoveBetter Cohort** — across scoring, reports, and recommendations.

**Relationship status expanded**
Options now include "in a relationship" and "married" so the couple pricing triggers correctly for partnered users.

**Dimension count references corrected**
Individual assessment now shows 10 dimensions (was 9), couples assessment now shows 9 dimensions (was 8) — across landing page, assessment page, and report page.

## [2026-06-04]

### Added
- Yoco payment gateway — pay before you assess.
- Two new blog posts: "The Version of You That Went Quiet" and "You Can't Expect Others to Show Up When You Don't Show Up for Yourself."
- Social share buttons (Twitter/X, LinkedIn, Facebook, copy link) on blog posts.
- Comments section on blog posts via utterances (GitHub Issues-based).
- Email and phone capture before payment — invoices and receipts can now reach customers.
- Zapier webhook integration — fires on payment and assessment completion for automated follow-ups.

### Changed
- Blog page header now reads "LoveBetter / Relationship Growth Readiness Assessment."
- Blog posts now sorted newest first on The Uncommon Practice page.

### Fixed
- Deploy pipeline now pushes to GitHub automatically — changes actually reach the live site.

## [2026-06-02]

### Changed
- Landing page branding tightened up — cleaner name, softer hero copy.
- Individual assessment path renamed to "Personal Growth Assessment" for consistency.
- Dev server no longer crashes from overlapping processes.

## [2026-06-01]

### Added
- Umami Analytics tracking.

### Changed
- Next.js upgraded to 15.3.6 (security patch).

### Fixed
- Dependency conflict resolved (legacy-peer-deps flag).
