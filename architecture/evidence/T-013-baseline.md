# T-013 baseline — 2026-11-04

Scope: current `main` at a860a74 as a local production build (`next build`, `next start -p 3100`). Laboratory measurements on this Windows machine only. These are not real-user metrics and not production CDN measurements.

## Captures (AC-01)

Full-page PNGs in `architecture/evidence/baseline/`, named `<route>-<width>-<theme>.png`.

- Routes: home, work, work-tikvah, solutions, contact, about
- Widths: 390, 768, 1440
- Themes: light and dark (via `prefers-color-scheme` emulation, since no theme is stored)
- 36 captures in total. Horizontal overflow (`scrollWidth - clientWidth`) was 0 on every route, width and theme.
- Console: only `/_vercel/insights/script.js` 404s, because the Vercel analytics script is not served locally. Not a site defect; it does not appear on Vercel.

## Asset inventory (AC-02)

Approved project captures in `public/`:

- Tikvah only (`public/projects/tikvah/`): `home-desktop.png` 1.58 MB (2560×1800 lossless), `home-mobile.png` 0.75 MB (780×1688 lossless), plus `home-desktop.webp` 0.62 MB and `home-mobile.webp` 0.20 MB. The README records the source as the public site, captured 25 Oct 2026, with no private data.
- Vib3Pulse: no approved captures in the repo. Interactive product imagery stays blocked (plan Phase 5).
- Founder portraits: none found in the repo. About content cannot use real portraits until the owner supplies them.
- Brand: `app/icon.png` 1.6 KB, `app/apple-icon.png` 3.0 KB, `app/icon.svg`, `public/icons/*` (≤9 KB each). These are placeholders recreated from the supplied reference logo (see discovery notes in `project.json`); final artwork is still pending (T-004).

Delivery note: the Tikvah PNGs are the oversized delivery the plan's Phase 3 targets. The existing WebP versions are the replacement candidates.

## Transfer and weight (AC-03)

Measured with Playwright `performance` resource entries, 1440 wide, light theme, after `networkidle`:

| Route | Requests | JS transfer | CSS transfer |
|---|---|---|---|
| / | 28 | 152 KB | 5 KB |
| /work | 30 | 152 KB | 5 KB |
| /work/tikvah | 27 | 152 KB | 5 KB |
| /solutions | 24 | 152 KB | 5 KB |
| /contact | 26 | 152 KB | 5 KB |
| /about | 24 | 152 KB | 5 KB |

Image transfer reported by resource entries (about 3 KB per route) is not trustworthy: Next image responses and cached entries report zero or partial encoded sizes. Use the file sizes above for image weight instead.

Caveats: the browser cache was warm across routes in one session, so the JS figure is per-route as seen after the first navigation, not a cold-cache first visit. No cold-cache or throttled run was done.

## Not done in this pass

- Reading the installed Next docs for client boundaries, images and `searchParams`. The docs exist at `node_modules/next/dist/docs/`; this step still needs doing before Phase 2.
- Reviewing the 36 captures by eye. The files are recorded, but the visual review is still open.
