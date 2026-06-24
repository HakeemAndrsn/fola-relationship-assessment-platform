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

## Child DOX Index

No child AGENTS.md files yet.
