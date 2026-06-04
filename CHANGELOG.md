# Changelog

All notable changes to this project will be documented in this file.

## [2026-06-01]

### Added
- **Umami Analytics** — Added Umami tracking script via Netlify Snippet Injection (inserted before </head>). Website ID: bc6370ff-d66c-4260-8704-12d5960a5f03. Managed through Netlify post-processing settings, no code changes required.

### Changed
- **Next.js upgraded to 15.3.6** — Bumped from 15.3.5 to 15.3.6 to resolve Netlify's deploy block caused by CVE-2025-55182, a critical React Server Components vulnerability affecting Next.js versions up to and including 15.3.5.

### Fixed
- **Dependency conflict** — Added NPM_FLAGS=--legacy-peer-deps as a Netlify environment variable to resolve a peer dependency conflict between autumn-js@0.1.85 (requires better-auth@^1.3.17) and the installed better-auth@1.3.10.

## [2026-06-04]

### Added
- **Yoco payment gateway** — Added YocoButton component and verify-payment Netlify function. Payment gate placed before questions on individual assessment page with `isPaid` state checking `lb_paid=1` URL param or sessionStorage flag.
- **Two new blog posts** — "The Version of You That Went Quiet" and "You Can't Expect Others to Show Up When You Don't Show Up for Yourself" added to The Uncommon Practice blog.

### Changed
- **Blog page header** — Updated from "The Oasis by FOLA / Hakeem — Hypnotherapist & Peak Performance Coach" to "LoveBetter / Relationship Growth Readiness Assessment" on both index and post pages.

### Fixed
- **Deploy pipeline** — Changes were not reaching the live site because they were never pushed to GitHub. Added git push step to coding-swarm workflow.

## [2026-06-02]

### Changed
- Refined the landing page branding into a leaner, more consistent name and descriptor.
- Updated the hero stat and copy to use more credible, softer messaging.
- Renamed the individual assessment path to "Personal Growth Assessment" for consistency.
- Aligned the personal-growth assessment and report wording with the same naming and report journey as the relationship-growth flow.
- Improved the assessment/report consistency while preserving the existing clinical report quality.
- Resolved the runtime dev-server issue caused by overlapping Next.js processes, restoring stable local previews.

### Notes
- All sessions start at R2500 per hour.
- Maintenance and expansion sessions are priced at R2000.
- Proprietary Age Regression Therapy sessions are R3800 each, with a 10-session package available for clients seeking deeper, faster progress and stronger trauma-free relationship mastery.
