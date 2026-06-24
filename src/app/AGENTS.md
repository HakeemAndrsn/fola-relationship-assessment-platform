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
| `/report` | Report | Couples assessment report |
| `/individual-report` | Report | Individual assessment report |
| `/the-uncommon-practice` | Blog | Blog index |
| `/the-uncommon-practice/[slug]` | Blog | Individual blog post |
| `/linkedin-callback` | Auth | LinkedIn OAuth callback |

## Key Constraints

- All assessment routes require payment gate before questions
- Report routes use sessionStorage for assessment data
- Blog posts use MDX or data files from `src/lib/`
- No free assessment access — payment verification required

## Child DOX Index

No child AGENTS.md files yet.
