# Sales Video Plan: LOVEBETTER Couples Relationship Growth Assessment

## Why this replaces the earlier cut
The previous brag video was built against a different, unrelated AI-Studio prototype repo (gold/parchment "FOLA Love Readiness Assessment" — an *individual* quiz, wrong branding entirely). This is the real, live, production platform at **lovebetter.co.za** (`fola-relationship-assessment-platform`), and the target is specifically the **Couples Relationship Growth Assessment** (`/assessment`), not the individual one (`/individual-assessment`). All source material below is pulled verbatim from this repo's actual source — `src/app/page.tsx`, `src/app/assessment/page.tsx`, `src/app/report/page.tsx`, `src/lib/assessment/scoring.ts`, `src/lib/assessment/questions.ts`, `src/lib/assessment/types.ts`.

Per this repo's own `AGENTS.md`: **"Freeze LoveBetter development: Ship as-is, focus on selling, not building."** This video is exactly that mandate — a selling asset, not a product change. No app code should be touched.

## What is this product?
The Couples Relationship Growth Assessment: R600, 30–40 minutes, both partners complete it together. It scores 8 clinical domains (Attachment, Trauma, ADHD/neurodivergence, Values, Change Readiness, Communication, Future Vision, Prejudices & Biases — each independently for both partners), then generates an instant clinical-grade PDF report with a domain-by-domain Partner A vs Partner B comparison, a named **Primary Strength** and a named **Critical Fracture Point**, clinically-flagged risk areas, and a personalised 3-phase treatment pathway with a priced investment plan. It exists to replace "guessing what's wrong" with a diagnostic, and to route couples toward FOLA's paid clinical services (Breakthrough Session R2,800+, Discovery Call free).

## The angle — high-stakes, sell-sell-sell, at-risk couples
This is not a cute launch clip. It is a direct-response sales film for couples who already sense something is wrong and are deciding whether to act. The copywriting arc is classic problem-agitate-solve, using the product's own real stats and real UI as proof, closing hard on urgency and price-anchored value.

**Arc:**
1. **Hook — the fracture** — plant the idea that every relationship has one hidden crack that decides the outcome.
2. **Agitate — the cost of silence** — the product's own stats: couples wait 6 years before getting help; by then it's R1,500–R2,000 a session just to *find* the problem, and resentment has calcified.
3. **Reframe — not a personality quiz** — this is a clinical-grade diagnostic, peer-reviewed frameworks, both partners, side by side.
4. **Proof — the process is real** — show the actual product: both partners' names, sliders moving for both of them, 8 real clinical domains.
5. **The reveal — the payoff moment** — the real report: radar chart of Partner A vs Partner B, then the gut-punch contrast of Primary Strength (green) against Critical Fracture Point (red) — named, specific, undeniable.
6. **Reframe the price as cheap insurance** — the treatment investment framed against the cost of *not* knowing: R600 for clarity vs. years of R1,500–R2,000 sessions spent guessing.
7. **Urgent, specific close** — the real CTA: Couples Assessment — R600, plus the real dual path (Book Breakthrough Session or Free Discovery Call).

## Duration — explicit override
User instruction: **longer than the previous ~20.5s cut, and this needs room to sell.** Target **38–42 seconds** (final: whatever the storyboard below naturally sums to, expect ~40s). This intentionally exceeds the generic `/brag` 15–25s guideline — that guideline is for a lighthearted launch clip; this is a direct-response sales spot and needs the full problem→proof→close arc to land. Do not compress the arc to hit a shorter runtime.

## Tone
Cinematic authority meets warm clinical trust — not startup-parody, not saccharine romance, not cold SaaS-blue. Confident, serious, a little urgent, but never manipulative-feeling cheap; the brand is "quiet luxury" clinical (see globals.css `.frequency-glow` treatments and the "Confidential Clinical Document" report framing). Think: a prestige-therapy-brand trailer, not a Instagram-ad jump-cut reel. Hard, declarative type on held black/charcoal beats for the agitation stats; warm ivory/terracotta for the brand and solution beats; the reveal is the visual and emotional peak.

## Brand system (verbatim from the live app — use exactly, do not invent new colors/fonts)

### Colors
- `#1B1917` — Charcoal (headlines, primary text, dark backgrounds for the "cost of waiting" agitation beat)
- `#F3EFE6` — Ivory (primary light background)
- `#C1795A` — Terra (mid warm accent)
- `#B4531F` — Terra Deep (primary CTA / brand-deep accent, landing page)
- `#B8654A` — Accent Terracotta (the report/design-system's primary accent token — use for the "Critical Fracture" callouts' warm framing and CTA buttons; close cousin of Terra Deep, same family)
- `#C6A15B` — Gold (sparing premium accent — kicker labels, small dividers)
- `#8A8378` — Mute (secondary/tertiary text, strikethrough pricing)
- Semantic risk colors from the real report UI — use these exactly for any risk/score indicator: `#38a169` (low risk / strength, green), `#B8654A` (medium risk, terracotta), `#e53e3e` (high risk / fracture, red)
- `#121212` / `#F5F2EC` — the darkest charcoal / bone pairing used for the report's confidential-document cover and primary buttons

**Color psychology to lean into explicitly:** terracotta+charcoal+ivory reads as grounded, warm, earned trust — clinical seriousness without cold sterility, premium without cliché luxury-gold, romantic warmth without saccharine pink/red cliché. The red-vs-green contrast at the Critical Fracture / Primary Strength reveal is the one moment allowed real chromatic tension — everywhere else stays in the warm neutral family so that contrast hits hard.

### Fonts (Google Fonts — match exactly)
- **Display / headline:** Gloock (`family=Gloock`) — distinctive high-contrast serif, used for every dramatic headline and the report title
- **Accent / italic emphasis:** Instrument Serif italic (`family=Instrument+Serif:ital@1`) — used for single emphasis phrases like the product does ("...with who you are.")
- **UI / body:** Instrument Sans (`family=Instrument+Sans`) — labels, stats, body copy, buttons

### Logo
`public/logo-transparent.png` in the source repo (already copied to `couples-brag/assets/images/logo-transparent.png` — see below) — the real mark shown on the report's cover page.

## Verbatim copy to use (pulled directly from the live product — do not paraphrase into generic SaaS language)

**Brand line (landing hero):**
> Your relationship starts *with who you are.*

**Couples product identity:**
> Relationship Growth Assessment — Couples · 8 dimensions · R600 · 30–40 min

**Positioning line:**
> For couples who are done guessing what's wrong. A clinical-grade X-ray of both partners across 8 clinical domains — revealing hidden mismatches and a precise 3-phase healing pathway.

**The cost-of-waiting agitation block (verbatim stats):**
> Most couples wait 6 years before getting help.
> By then, resentment has calcified. Patterns have cemented. And you're spending R1,500–R2,000 per therapy session just figuring out *what* the problem is.
- Stat card 1: **"6 yrs"** — Average wait before couples seek help
- Stat card 2: **"R1.5–2k"** — [cost per session just to find the problem]

**Reframe line:**
> A real report, not a personality quiz.
> Every dimension we score maps to a named, peer-reviewed clinical framework — the same ones used in couples and individual therapy rooms.

**The 8 real clinical domains (use these exact names, not invented ones):**
Attachment Style · Trauma Inventory · ADHD Screening · Values Alignment · Change Readiness · Communication · Future Vision · Prejudices & Biases

**Report cover (verbatim):**
> Confidential Clinical Document
> FOLA Relational Assessment Report — Comprehensive Relationship Diagnostic Report

**The reveal cards (verbatim labels):**
> Primary Strength — [Domain label] — [X]% alignment (green)
> Critical Fracture Point — [Domain label] — [X]% alignment (red)

Use realistic placeholder values consistent with the product's real domain names and the 60–95% alignment ranges the scoring engine actually produces (e.g., Primary Strength: "Attachment Style — 91% alignment"; Critical Fracture Point: "Values Alignment — 42% alignment" — these are illustrative and must stay inside the engine's real bands: high risk <60%, medium 60–79%, low ≥80%).

**Treatment/investment framing (from the real report):**
> Estimated Total Investment: R[amount] — a personalised 3-phase pathway (Individual Foundation → Couples Integration → Ongoing)

**Closing CTA (verbatim, use exactly):**
> Couples Assessment — R600 →
> Book Breakthrough Session — R2,800 · or · Book Discovery Call — Free

**FAQ trust line (may use as a late reassurance beat if room allows):**
> Clinical flags are surfaced with severity levels, clear context, and a specific treatment pathway designed around your unique profile.

## What must be shown from the real product (non-negotiable — this sells because it's real, not invented)
1. The real "Relationship Growth Assessment" card/CTA from the landing page (terracotta card, "Couples" kicker, 8 dimensions · R600 · 30–40 min)
2. The real dual-slider question UI — Partner A and Partner B both answering the same clinical question, sliders at different positions (this *is* the product's core mechanic and its most persuasive visual: two people, one honest instrument)
3. The real report reveal: radar chart shape (even simplified) comparing two partners, PLUS the Primary Strength (green) vs Critical Fracture Point (red) side-by-side card contrast — this is the single most important frame in the video
4. The real domain risk-matrix coloring (red/terracotta/green dots) — at least a glimpse
5. The real treatment plan / investment framing
6. The real CTA button copy and price, verbatim

## Storyboard (target ~40s — do not compress below the arc; hold times may flex ±10-15% to protect readability)

### Scene 1 — The Fracture (Hook) — 4s
Full charcoal (#1B1917) background. A single hairline crack/fissure motif (thin, elegant, not literal glass-shatter cheese) traces in behind the type. Gloock headline, ivory text, slams in then holds:
"Every relationship has one fracture point."
Sequential/interaction: the crack-line draws in first (0.6s), then text.
Audio intent: low tense string/piano note, restrained, cinematic — this is a held breath, not a jump-scare.
Transition: hard cut → Scene 2

### Scene 2 — The Agitation (Cost of Silence) — 7s
Cut to charcoal still. Headline continues the thought: "Left alone, it becomes the reason it ends." Then two stat cards land side by side (terracotta-deep #B4531F card backgrounds, white/ivory numerals in Gloock): "6 yrs" / "Average wait before couples seek help" and "R1.5–2k" / "per session just to find the problem" — verbatim from the real stat block. Cards arrive one after another, not simultaneously.
Sequential/interaction: stat card 1 lands, holds ~1.5s, stat card 2 lands, both hold together ~2s.
Audio intent: a single low weighted thud/impact SFX on each card landing — restrained, not chaotic. Tension continues to build under the music.
Transition: hard cut to bright → Scene 3 (this light/dark swap is the emotional pivot of the whole video — problem to solution)

### Scene 3 — The Reframe (Not a Personality Quiz) — 5s
Cut to ivory (#F3EFE6) background — the light relief after the dark agitation. Gold kicker label "CLINICAL-GRADE, NOT GUESSWORK." Gloock headline: "A real report, not a personality quiz." Instrument Sans subhead: "Every dimension maps to a named, peer-reviewed clinical framework." The real "Relationship Growth Assessment" card/badge (terracotta, "Couples · 8 dimensions · R600 · 30–40 min") settles into frame, anchoring what we're about to see.
Sequential/interaction: none beyond the badge settling.
Audio intent: music lifts out of tension into warmth — a small hopeful chord change here.
Transition: soft crossfade → Scene 4

### Scene 4 — The Process (Proof — Both Partners, Real UI) — 6s
Recreate the real dual-slider question card from `/assessment`: one clinical question ("I find it hard to truly listen without planning my response" — a real Communication-domain item), two labeled sliders — "Partner A" and "Partner B" — at visibly different positions (e.g., 3/10 and 8/10), each with the terracotta value badge exactly as the product renders it. A cursor/finger drags one slider a few notches to show it's live and real. Section stepper chip in the corner reads one of the 8 real domain names (e.g., "Communication — Step 6 of 9").
Sequential/interaction: yes — the Partner B slider is dragged live, value updates in real time (e.g., 6 → 8), a soft tick per notch.
Audio intent: light, precise UI ticks under the slider drag — the product feels alive and real, not decorative.
Transition: soft slide → Scene 5

### Scene 5 — The Reveal (Payoff — Primary Strength vs Critical Fracture) — 8s
This is the peak of the video. Cut to the real report surface: "Confidential Clinical Document" kicker, "FOLA Relational Assessment Report" in Gloock. A simplified radar/spider chart draws in comparing Partner A (terracotta line) vs Partner B (charcoal line) across the 8 domains — clean, not busy. Immediately after, the two real report cards land side by side: green-bordered "Primary Strength — Attachment Style — 91% alignment" and red-bordered "Critical Fracture Point — Values Alignment — 42% alignment." The red card's arrival is the loudest visual and audio moment in the video.
Sequential/interaction: yes — radar chart draws its lines in (~1.2s), holds, then the two cards land: green first, red a beat after (not simultaneous — the fracture card should feel like it's naming something).
Audio intent: the radar draw gets a rising synth/string swell; the Critical Fracture card's arrival gets one hard, low impact hit (the single biggest sound in the piece) — the emotional gut-punch.
Transition: hard cut → Scene 6

### Scene 6 — Reframe the Investment — 5s
Cut to charcoal or deep terracotta background. Gloock headline: "R600 for clarity. Or years of R1,500 sessions spent guessing." (direct value-reframe line, built from the product's own real stats — not invented pricing logic). Beneath it, small Instrument Sans line: "A personalised 3-phase pathway. Priced. Planned. Yours." gesturing at the real treatment plan / investment framing without needing every dollar figure on screen.
Sequential/interaction: none — a single confident hold.
Audio intent: music settles into resolve, confident and steady, urgency without panic.
Transition: soft crossfade → Scene 7

### Scene 7 — The Close (CTA) — 6s
Cut to ivory background, brand mark (`logo-transparent.png`) small and centered above the real CTA button exactly as it appears live: terracotta-deep pill button "Couples Assessment — R600 →". Beneath it, the real dual path in smaller type: "Book Breakthrough Session — R2,800  ·  or  ·  Book Discovery Call — Free." Final line, smallest, in Instrument Sans, Gold: "lovebetter.co.za" Everything holds fully still for the last ~2.5s — nothing competes with the CTA.
Sequential/interaction: none — one clean arrival, then a still hold.
Audio intent: music resolves to near-silence under the hold so the CTA reads in near-quiet, the way a held breath resolves.
Transition: hard hold (final frame — this is also the poster-frame candidate)

**Total: 4 + 7 + 5 + 6 + 8 + 5 + 6 = 41s**

## Audio direction
- Role: cinematic-restrained — a tension-building score that pivots to warmth at Scene 3 and resolves to near-silence at the close. Not upbeat corporate "happy beats" — this needs real dramatic weight.
- Arc: low tense sustained tone (Scenes 1–2) → warm major-key lift (Scene 3) → light precise UI texture (Scene 4) → rising swell + one hard impact hit at the Critical Fracture reveal (Scene 5, the loudest moment in the piece) → confident steady resolve (Scene 6) → fade to near-silence under the held CTA (Scene 7)
- Source the music via the `media-use` skill/workflow (resolve a cinematic-tension-to-warm-resolve cue, or generate one if the catalog doesn't have a good fit) rather than reusing the `/brag` skill's upbeat "Happy Beats / Business Moves" library from the other repo — that pack is tonally wrong for this piece.
- SFX: sparse, weighted, cinematic — a low card-impact on each stat card (Scene 2), soft UI ticks on the live slider drag (Scene 4), a rising swell + one hard low impact hit on the Critical Fracture card (Scene 5, the single loudest sound), nothing else. Never more than one SFX per beat; no chaotic or comedic sounds anywhere.
- Audio-reactive treatment: subtle only — the Scene 1 crack-line and the Scene 5 radar chart may breathe slightly with RMS/bass. No waveform/EQ visuals.

## Format
Landscape, 1920×1080 (this is a website/social sales asset, not a vertical short).

## Deliverables
- `couples-brag/` — the Hyperframes project (scaffold via `npx hyperframes init couples-brag --tailwind` is unnecessary here since this is a standalone video project, not wired into the Next.js app — treat it as its own composition directory, same pattern as the sibling `lovebetter-brag/` project already in this repo)
- `couples-brag/renders/couples-brag.mp4` — the rendered video (~40s, 1920×1080)
- `couples-brag/renders/couples-brag.jpg` — poster frame (recommend the Scene 7 CTA hold, fully settled)
- `couples-brag/share-copy.txt` — a direct-response caption, not a cute launch caption

## Explicit non-goals
- Do not touch any file under `src/`, `netlify/`, or any live app code — "ship as-is, focus on selling."
- Do not invent statistics, prices, or domain names not present in the real source files cited above.
- Do not default back to the gold/parchment palette from the unrelated AI-Studio individual-assessment repo — that branding is wrong for this product.
