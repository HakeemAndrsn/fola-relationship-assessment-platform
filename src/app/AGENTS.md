# App Router — Pages & Layouts

## Purpose

All Next.js App Router pages, layouts, and route handlers for LoveBETTER.

## Ownership

- `page.tsx` files — route pages
- `layout.tsx` files — route layouts
- `loading.tsx`, `error.tsx` — loading/error states
- Route groups and dynamic segments

## Routes

| Path | Type | Description |
|------|------|-------------|
| `/` | Landing | Homepage with hero, pricing, CTA |
| `/assessment` | Assessment | Couples assessment flow (paywalled) |
| `/individual-assessment` | Assessment | Individual assessment flow (paywalled) |
| `/patterns` | Lead-gen | The Pattern Assessment — free 36-item quiz, self-contained (own palette/fonts scope in `src/components/patterns/`), MailerLite capture, no links to/from the paid assessments |
| `/report` | Report | Couples assessment report |
| `/individual-report` | Report | Individual assessment report |
| `/the-uncommon-practice` | Blog | Blog index |
| `/the-uncommon-practice/[slug]` | Blog | Individual blog post |
| `/linkedin-callback` | Auth | LinkedIn OAuth callback |

## Key Constraints

- `/assessment` and `/individual-assessment` require payment gate before questions
- Report routes use sessionStorage for assessment data
- Blog posts use MDX or data files from `src/lib/`
- No free access to the paid clinical assessments — payment verification required
- `/patterns` is the one deliberate exception: a free lead-gen quiz, isolated from the
  paid flows (own components, own scoring lib, no shared nav/cross-links)

## Child DOX Index

No child AGENTS.md files yet.
