# Components — UI & Feature

## Purpose

React components used across LoveBETTER pages. Includes both generic UI components (shadcn/ui) and feature-specific components.

## Ownership

- `ui/` — shadcn/ui primitives (button, card, dialog, etc.)
- Root `components/` — feature components (assessment forms, report views, payment buttons, CTAs)

## Key Constraints

- Components should be composable and reusable
- Payment components must accept optional props for product description and amount
- CTA components must link to correct Calendly URLs per offer type
- Trust signals (security reassurance, human sign-off) required on payment pages

## Child DOX Index

No child AGENTS.md files yet.
