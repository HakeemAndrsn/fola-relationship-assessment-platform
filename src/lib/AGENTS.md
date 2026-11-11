# Lib — Business Logic & Utilities

## Purpose

Business logic, assessment scoring algorithms, data models, utility functions, and shared constants.

## Ownership

- `assessment/` — Couples assessment logic (scoring, dimensions, clinical flags)
- `individual-assessment/` — Individual assessment logic
- `hooks/` — Shared custom hooks
- Root `lib/` — Utilities, constants, API helpers

## Key Constraints

- Assessment scoring must match the ART 10-relationship framework
- Clinical flags must be accurate and clinically grounded
- No hardcoded pricing — use constants from config
- Soulfeggio spelling (not Solfeggio) throughout
- Nov 2026: the Money & Provision Patterns domain (couples key `money`, individual key `moneyPatterns` / dimension `money_patterns`) replaced ADHD/neurodivergence. It maps to ART stages 8–10. Do not reintroduce ADHD or any other condition screening
- Age Regression Hypnosis is R3,680.50 per session, matching fola.co.za. Show rand amounts with `formatRand` from `src/lib/utils.ts` so cents render as .50

## Child DOX Index

No child AGENTS.md files yet.
