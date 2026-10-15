# Components — UI & Feature

## Purpose

React components used across LoveBETTER pages. Includes both generic UI components (shadcn/ui) and feature-specific components.

## Ownership

- `ui/` — shadcn/ui primitives (button, card, dialog, etc.)
- `patterns/` — The Pattern Assessment (`/patterns`) screens and atoms. Intentionally
  does NOT use `ui/` shadcn primitives — they carry the site's Bone/Terracotta theme
  tokens, and this quiz is locked to its own "Deep Teal & Copper" palette (literal hex
  utility classes, see `src/components/patterns/ui.tsx`). Keep it that way.
- Root `components/` — feature components (assessment forms, report views, payment buttons, CTAs)

## Key Constraints

- Components should be composable and reusable
- Payment components must accept optional props for product description and amount
- CTA components must link to correct Calendly URLs per offer type
- Trust signals (security reassurance, human sign-off) required on payment pages

## Child DOX Index

| Path | Scope | Owner |
|------|-------|-------|
| `patterns/` | Pattern Assessment screens (Door/Primer/Inventory/Gate/Mirror) | Agent |
