# Patterns — Pattern Assessment Screens

## Purpose

The five screens of the free `/patterns` quiz (Door, Primer, Inventory, Gate, Mirror)
and the small styled atoms they share.

## Ownership

- `ui.tsx` — `PALETTE`, `Eyebrow`, `Headline`, `Turn`, `BodyText`, `PrimaryButton`,
  `QuietLink`, `ScreenShell` — the only place the locked hex values should live
- `Door.tsx`, `Primer.tsx`, `Inventory.tsx`, `Gate.tsx`, `Mirror.tsx` — one file per
  screen, orchestrated by `src/app/patterns/page.tsx`

## Key Constraints

- Locked "Deep Teal & Copper" palette only (`#0D2B2A`, `#17403C`, `#092020`, `#C67B4F`,
  `#8FB5A6`, `#E9F2EE`, `#B9CFC6`). No gradients, no shadows heavier than a whisper,
  4px radius on cards/screens, 2px on buttons/option rows.
- No pill eyebrows — plain uppercase small text, no borders/backgrounds.
- Fonts: Gloock for headlines/question text (400 weight only), Instrument Serif italic
  for "turn" lines, Instrument Sans for everything else — set via inline
  `fontFamily: "var(--font-*)"`, not Tailwind's `font-sans` (that resolves to the
  site-wide Montserrat theme).
- Do not import from `src/components/ui/` (shadcn) — see parent AGENTS.md.
- Copy in `Door.tsx`/`Primer.tsx`/`Gate.tsx`/`Mirror.tsx` is locked brief copy; changes
  need Hakeem's sign-off.
- Never add a link to `/assessment` or `/individual-assessment` from any screen here —
  the only CTA is the discovery call.

## Child DOX Index

No child AGENTS.md files yet.
