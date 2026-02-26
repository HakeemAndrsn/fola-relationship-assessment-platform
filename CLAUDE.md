# CLAUDE.md — Orchids FOLA Relationship Assessment Platform

This file provides context for AI assistants working on this codebase. Read this before making any changes.

---

## Project Overview

**FOLA** is a professional relationship assessment platform built for couples therapy. It provides a 7-dimension clinical evaluation that produces a detailed, PDF-printable report with scoring, visualizations, and a 3-phase treatment plan. The platform targets South African couples and therapists (pricing in ZAR).

**Current State:** Client-side prototype. Assessment data is processed and displayed entirely in the browser with no backend persistence yet. Backend dependencies (Drizzle ORM, Better Auth, Stripe) are installed but not yet integrated.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.3.5 (App Router, Turbopack) |
| Language | TypeScript 5 (strict mode) |
| UI Components | shadcn/ui (new-york style) + Radix UI primitives |
| Styling | Tailwind CSS v4 with OKLCH color variables |
| Forms | React Hook Form 7 + Zod 4 validation |
| Charts | Recharts 3 (radar + bar charts) |
| Animation | Framer Motion 12 |
| ORM (unused) | Drizzle ORM + @libsql/client (Turso) |
| Auth (unused) | Better Auth 1.3 |
| Payments (unused) | Stripe SDK |
| Visual Editing | Orchids (headless CMS integration) |

**Run commands:**
```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint check
npm run start    # Production server
```

---

## Directory Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Marketing homepage (551 lines)
│   ├── assessment/page.tsx       # Multi-step assessment form (502 lines)
│   ├── report/page.tsx           # Report display & PDF print (537 lines)
│   ├── the-uncommon-practice/    # Blog section
│   │   ├── page.tsx              # Blog index
│   │   └── [slug]/page.tsx       # Dynamic blog post pages
│   ├── layout.tsx                # Root layout (fonts, Orchids scripts)
│   ├── globals.css               # Tailwind v4 theme + print styles
│   └── global-error.tsx          # Error boundary
├── components/
│   ├── ui/                       # 60+ shadcn/ui components (do not modify directly)
│   └── ErrorReporter.tsx         # Orchids error capture for iframe communication
├── lib/
│   ├── assessment/
│   │   ├── types.ts              # All TypeScript interfaces (111 lines)
│   │   ├── questions.ts          # Question definitions per domain (51 lines)
│   │   └── scoring.ts            # Core scoring engine (421 lines)
│   ├── blog-data.ts              # Blog post content
│   ├── hooks/use-mobile.tsx      # Responsive breakpoint hook
│   └── utils.ts                  # cn() className merge utility
└── hooks/
    └── use-mobile.ts             # Duplicate hook (prefer lib/hooks/use-mobile.tsx)
```

---

## Core Assessment Architecture

### Data Flow

```
Assessment Page (multi-step form, 9 steps)
  └─ collects AssessmentFormData from both partners
       └─ stores in sessionStorage
            └─ Report Page reads sessionStorage
                 └─ generateReport(formData) → AssessmentReport
                      └─ renders charts, scores, treatment plan
```

**No API calls are made.** All logic is client-side. If you add backend persistence, you'll need to create `/src/app/api/` routes.

### Assessment Domains & Weights

| Domain | Weight | Type |
|---|---|---|
| Attachment Style | 20% | Categorical (4 options) |
| Trauma Inventory | 20% | 5 slider questions (0–10) |
| ADHD Screening | 15% | 5 slider questions (0–10) |
| Values Alignment | 20% | 5 slider questions (0–10) |
| Change Readiness | 10% | Categorical (4 Prochaska stages) |
| Communication | 10% | 4 slider questions (0–10) |
| Future Vision | 5% | 4 slider questions (0–10) |

### Scoring Logic (`src/lib/assessment/scoring.ts`)

- **Slider domains:** Score = average of partner responses; Alignment = 100 − (|A − B| / 10 × 100)
- **Attachment:** Uses a hardcoded 4×4 compatibility matrix (secure-secure = 95%, disorganized-disorganized = 20%)
- **Change Readiness:** Stage gap scoring (0–3 stage gap mapped to 0–100%)
- **Clinical flags:** Auto-triggered at thresholds (trauma > 7, ADHD gap > 4, values alignment < 50%, readiness gap > 3)
- **Dynamic pricing:** Base R500 + domain complexity modifiers, capped R450–R950

### Key Types (`src/lib/assessment/types.ts`)

```typescript
type AttachmentStyle = "secure" | "anxious" | "avoidant" | "disorganized"
type ChangeReadiness = "precontemplation" | "contemplation" | "preparation" | "action"

interface AssessmentFormData {
  onboarding: OnboardingData      // names, relationship duration, primary concern
  attachment: AttachmentData      // attachment styles for both partners
  trauma: TraumaData              // 5 trauma questions per partner
  adhd: ADHDData                  // 5 ADHD questions per partner
  values: ValuesData              // 5 values questions per partner
  changeReadiness: ChangeReadinessData
  communication: CommunicationData
  futureVision: FutureVisionData
}

interface AssessmentReport {
  overallScore: number            // 0–100
  domainScores: DomainScore[]
  primaryStrength: DomainScore    // highest scoring domain
  criticalFracture: DomainScore   // lowest scoring domain
  clinicalFlags: ClinicalFlag[]
  treatmentPlan: TreatmentPhase[] // 3 phases
  dynamicPrice: number            // ZAR
}
```

---

## Styling Conventions

- **Color scheme:** Navy (`#1a365d`, `#0a1628`) with gold accent (`#d4af37`). Use CSS variables from `globals.css`, not hardcoded hex.
- **Typography:** Libre Baskerville (serif, headings) + Montserrat (sans, body). Applied via CSS variable `--font-libre-baskerville` and `--font-montserrat`.
- **Tailwind v4:** Use `@theme` and `@layer` directives — do NOT use `tailwind.config.js` (v3 pattern).
- **Print styles:** `globals.css` has `@media print` rules for A4 PDF output. Preserve these when editing the report page.
- **Dark background default:** Pages default to dark navy background. Use `text-white` or light colors accordingly.
- **cn() utility:** Always use `cn()` from `@/lib/utils` for conditional class merging.

---

## Component Conventions

- **shadcn/ui components** live in `src/components/ui/`. Do not modify these directly — they are managed by the shadcn CLI. Extend them by wrapping in new components.
- **Client components:** Add `'use client'` at the top of any component using hooks, event handlers, or browser APIs.
- **Server components:** Default for pages and layouts unless interactivity is required.
- **Path alias:** Use `@/` for all imports (maps to `src/`). Never use relative paths like `../../`.

---

## ESLint Rules (important)

From `eslint.config.mjs`:
- `@typescript-eslint/no-unused-vars`: **off** — unused variables won't cause errors
- `@typescript-eslint/no-explicit-any`: **off** — `any` is allowed but avoid it where possible
- `react-hooks/exhaustive-deps`: **off** — but still follow best practices for deps arrays
- `react/no-unescaped-entities`: **off** — no need to escape `'` or `"` in JSX text
- `@next/next/no-img-element`: **off** — `<img>` is allowed, but prefer `next/image` for performance
- TypeScript/ESLint build errors are **ignored** in `next.config.ts` — builds won't fail on type errors, but still fix them

---

## Data Persistence (Current Limitations)

**Currently no database integration.** Assessment data is only kept in `sessionStorage` for the duration of a browser session. After the browser tab is closed, all data is lost.

### Planned Backend Stack (dependencies already installed)

- **Database:** Turso (libSQL) via Drizzle ORM — no schema files exist yet
- **Auth:** Better Auth — no routes or config exist yet
- **Payments:** Stripe — no integration exists yet

When implementing backend features:
1. Create Drizzle schema in `src/lib/db/schema.ts`
2. Add API routes in `src/app/api/`
3. Set up environment variables (see below)

---

## Environment Variables

No `.env` file is required for the current client-side implementation. For future backend integration, you will need:

```bash
# Database (Turso)
DATABASE_URL=libsql://...
DATABASE_AUTH_TOKEN=...

# Authentication (Better Auth)
BETTER_AUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# Payments (Stripe)
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

# Orchids (already hardcoded in layout.tsx — do not change)
# NEXT_PUBLIC_ORCHIDS_PROJECT_ID=d1fd77fb-9945-4966-8e47-96495864b188
```

---

## Orchids Integration

This project uses **Orchids** (orchids.app) as a visual editing layer. Key points:

- `src/components/ErrorReporter.tsx` — captures JS errors and sends them to the Orchids iframe parent via `postMessage`
- `next.config.ts` includes a Turbopack loader for Orchids component tagging
- `layout.tsx` loads two external Orchids scripts (browser logs + route messenger) — do NOT remove these
- `.orchids/orchids.json` contains the project ID — do not modify
- The `src/visual-edits/` directory is managed by Orchids for visual CMS editing

---

## Blog System

Blog content is defined in `src/lib/blog-data.ts` as static TypeScript data (no CMS or markdown files). To add a blog post:

1. Add a new entry to the array in `blog-data.ts` with a unique `slug`
2. The `[slug]/page.tsx` dynamic route will automatically render it
3. All content is inline TypeScript — no external files needed

---

## Assessment Multi-Step Form

The assessment at `src/app/assessment/page.tsx` is a **single client-side page** with 9 wizard steps controlled by a `currentStep` state variable:

| Step | Domain |
|---|---|
| 1 | Onboarding (names, duration, consent) |
| 2 | Attachment Style |
| 3 | Trauma Inventory |
| 4 | ADHD Screening |
| 5 | Values Alignment |
| 6 | Change Readiness |
| 7 | Communication Patterns |
| 8 | Future Vision |
| 9 | Review & Submit |

On submission, form data is JSON-serialized to `sessionStorage` and the user is routed to `/report`.

---

## Report Page

`src/app/report/page.tsx` reads `sessionStorage`, calls `generateReport()` from `scoring.ts`, and renders:

1. Overall score gauge
2. Domain radar chart (Recharts `RadarChart`)
3. Domain alignment bar chart (Recharts `BarChart`)
4. Clinical risk matrix table
5. Deep domain analysis cards
6. Clinical flags with recommendations
7. 3-phase treatment plan with session pricing (ZAR)
8. Journal prompts + action items
9. Methodology appendix

A "Download PDF" button triggers `window.print()`. The print layout is A4-sized and controlled via `@media print` in `globals.css`.

---

## Common Gotchas

1. **Turbopack:** The dev server uses `--turbopack`. Some webpack-specific plugins/loaders won't work.
2. **React 19:** This project uses React 19 (not 18). Avoid packages that explicitly require React 18.
3. **Tailwind v4:** No `tailwind.config.js` — configuration is inside `globals.css` using `@theme`. Don't create a config file.
4. **sessionStorage dependency:** The report page will crash if accessed directly without completing the assessment first (no data in sessionStorage). Add a guard redirect if implementing persistent routes.
5. **Print layout:** The `globals.css` print styles are critical for PDF output. Test print preview after any layout changes to `/report`.
6. **No test suite:** There are no tests. When adding features, consider adding Vitest or Jest tests.
7. **TypeScript errors ignored in build:** `next.config.ts` has `typescript.ignoreBuildErrors: true`. Fix type errors anyway.

---

## Key File Locations Quick Reference

| What | Where |
|---|---|
| Assessment question definitions | `src/lib/assessment/questions.ts` |
| Scoring & report generation | `src/lib/assessment/scoring.ts` |
| TypeScript interfaces | `src/lib/assessment/types.ts` |
| Global styles + theme | `src/app/globals.css` |
| shadcn/ui components | `src/components/ui/` |
| Blog post content | `src/lib/blog-data.ts` |
| Root layout (fonts, scripts) | `src/app/layout.tsx` |
| Homepage | `src/app/page.tsx` |
| Assessment form | `src/app/assessment/page.tsx` |
| Report display | `src/app/report/page.tsx` |
