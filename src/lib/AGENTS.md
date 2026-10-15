# Lib — Business Logic & Utilities

## Purpose

Business logic, assessment scoring algorithms, data models, utility functions, and shared constants.

## Ownership

- `assessment/` — Couples assessment logic (scoring, dimensions, clinical flags)
- `individual-assessment/` — Individual assessment logic
- `patterns/` — The Pattern Assessment (`/patterns`) data/types/scoring — the 12-guard,
  3-family item bank, session shuffle, and top-3 scoring with deterministic tie-breaks.
  Owned separately from the paid assessment logic above; do not merge or share state.
- `hooks/` — Shared custom hooks
- Root `lib/` — Utilities, constants, API helpers

## Key Constraints

- Assessment scoring must match the ART 10-relationship framework
- Clinical flags must be accurate and clinically grounded
- No hardcoded pricing — use constants from config
- Soulfeggio spelling (not Solfeggio) throughout

## Child DOX Index

| Path | Scope | Owner |
|------|-------|-------|
| `patterns/` | Pattern Assessment data, types, scoring | Agent |
