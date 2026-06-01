# Changelog

All notable changes to this project will be documented in this file.

## [2026-06-01]

### Added
- **Umami Analytics** — Added Umami tracking script via Netlify Snippet Injection (inserted before </head>). Website ID: bc6370ff-d66c-4260-8704-12d5960a5f03. Managed through Netlify post-processing settings, no code changes required.

### Changed
- **Next.js upgraded to 15.3.6** — Bumped from 15.3.5 to 15.3.6 to resolve Netlify's deploy block caused by CVE-2025-55182, a critical React Server Components vulnerability affecting Next.js versions up to and including 15.3.5.

### Fixed
- **Dependency conflict** — Added NPM_FLAGS=--legacy-peer-deps as a Netlify environment variable to resolve a peer dependency conflict between autumn-js@0.1.85 (requires better-auth@^1.3.17) and the installed better-auth@1.3.10.
