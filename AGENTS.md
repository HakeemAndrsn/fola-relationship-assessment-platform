# DOX Framework — LoveBETTER by FOLA

This project uses the DOX self-documenting AGENTS.md hierarchy.
Before any edit, walk the tree from root to target. After any meaningful change, update the owning AGENTS.md.

## Core Contract

- AGENTS.md files are binding work contracts for their subtrees
- Work products, source materials, instructions, records, assets, and durable docs must stay understandable from the nearest applicable AGENTS.md plus every parent AGENTS.md above it

## Read Before Editing

1. Read this root AGENTS.md
2. Identify every file or folder you expect to touch
3. Walk from the repository root to each target path
4. Read every AGENTS.md found along each route
5. If a parent AGENTS.md lists a child AGENTS.md whose scope contains the path, read that child and continue from there
6. Use the nearest AGENTS.md as the local contract and parent docs for repo-wide rules
7. If docs conflict, the closer doc controls local work details, but no child doc may weaken DOX

Do not rely on memory. Re-read the applicable DOX chain in the current session before editing.

## Update After Editing

Every meaningful change requires a DOX pass before the task is done.

Update the closest owning AGENTS.md when a change affects:
- purpose, scope, ownership, or responsibilities
- durable structure, contracts, workflows, or operating rules
- required inputs, outputs, permissions, constraints, side effects, or artifacts
- user preferences about behavior, communication, process, organization, or quality
- AGENTS.md creation, deletion, move, rename, or index contents

Update parent docs when parent-level structure, ownership, workflow, or child index changes. Update child docs when parent changes alter local rules. Remove stale or contradictory text immediately.

## Project Overview

**LoveBETTER by FOLA** — Clinical relationship assessment platform.
- **Domain**: lovebetter.co.za
- **Stack**: Next.js (App Router), Tailwind CSS, shadcn/ui, Netlify Functions, Yoco SDK
- **Purpose**: R600 clinical relationship assessments (individual & couples) → Discovery Call → high-ticket close
- **Status**: Live. Ship as-is, focus on selling, not building.

## Key Constraints

- **No free assessments** — R600 only
- **All URLs use lovebetter.co.za** — never lovebetter.netlify.app
- **Brand**: "LoveBetter" or "LOVEBETTER by FOLA" — never "The Oasis by FOLA"
- **Payment**: Yoco (primary, live keys), PayFast (fallback)
- **Calendly**: Specific links per offer, post-booking redirect to fola.co.za/book/confirmed
- **Lead capture**: Qualifying form before Calendly redirect. No Calendly link or WhatsApp auto-open on form submit.
- **Soulfeggio** (not "Solfeggio") spelling throughout
- **Version**: Display VERSION from config.py in Mini App hero and bot /start. Current: 1.2.0.

## User Preferences

- Direct, strategic, systems-focused communication
- Bullet points and structured plans
- Prefers documents as PDF/DOCX files in chat (not file-viewer links)
- "Make it plain" — no throat-clearing transitions
- Prefers voice note responses over text when appropriate
- Prefers no GitHub sign-in for blog comments; replaced with likes and social shares
- Prefers one compliance task per day approach
- Prefers direct, honest communication about site issues
- Prefers working within limits — not a site overhaul
- **Freeze LoveBetter development**: Ship as-is, focus on selling, not building

## Child DOX Index

| Path | Scope | Owner |
|------|-------|-------|
| `src/app/` | Next.js App Router pages and layouts | Agent |
| `src/components/` | React components (UI + feature) | Agent |
| `src/lib/` | Business logic, assessment scoring, utilities | Agent |
| `src/hooks/` | Custom React hooks | Agent |
| `netlify/` | Netlify Functions (serverless) | Agent |
| `scripts/` | Build and utility scripts | Agent |
| `.agents/skills/` | Agent skill definitions for design taste | Agent |
| `public/` | Static assets (images, fonts, etc.) | Agent |
