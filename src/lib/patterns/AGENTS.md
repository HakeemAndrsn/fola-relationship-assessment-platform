# Patterns — Pattern Assessment Data & Scoring

## Purpose

Business logic for the free `/patterns` lead-gen quiz: the 12-guard item bank grouped
into 3 families, session-stable item shuffling, and top-3 scoring with deterministic
tie-breaks.

## Ownership

- `data.ts` — the 36-item bank, guard/family definitions, one-line card descriptions,
  canonical guard order (also the tie-break order)
- `types.ts` — shared types for guards, families, answers, results
- `scoring.ts` — `buildShuffledOrder()` (session shuffle) and `computeResult()` (top-3
  selection + family derivation)
- `useReducedMotion.ts` — small hook for the inventory screen's auto-advance beat

## Key Constraints

- Guard item text, one-line descriptions, and family names are locked content from the
  LOVEBETTER PATTERN ASSESSMENT brief — changes need Hakeem's clinical sign-off, same as
  the paid assessment item banks.
- Tie-break order is precise and sequential (score → single-item max → family diversity
  in the already-selected top 3 → canonical order) — see `scoring.ts` comments before
  changing it. Hand-verify any change against flat (all-zero / all-four) profiles.
- Never call into `src/lib/assessment/` or `src/lib/individual-assessment/` — this is a
  separate, free-tier product with no shared state.

## Child DOX Index

No child AGENTS.md files yet.
