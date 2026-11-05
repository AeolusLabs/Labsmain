# T-014 evidence — homepage study and motion contract (2026-11-04)

Scope: a standalone study prototype and a proposed motion contract. Nothing is wired into the live site, and no production file changed.

## Files

- `architecture/prototypes/homepage-study.html` — editable study: opening, Tikvah project canvas (whole site / mobile), service selector with aligned outcome, closing line. Controls: theme, phone width, motion on/off, replay entrance, type-scale and spacing sliders.
- `architecture/prototypes/motion-contract.md` — tokens, six rules, reduced-motion and no-JS notes, responsive equivalents, keyboard rules, open items.
- `architecture/prototypes/homepage-study-desktop.png` — full-page capture at 1440 (sticky bar appears mid-page because of the capture method).
- `architecture/prototypes/homepage-study-phone-reduced-motion.png` — 390-wide viewport with `prefers-reduced-motion: reduce`.

## Checks run (local, file:// Playwright)

- Both study images load (Tikvah desktop and mobile WebP). No page or console errors.
- Tab click switches to the mobile view; `data-show` updates correctly.
- Keyboard: ArrowRight on the view tabs moves focus and selects the mobile view. ArrowDown on the service list selects the next service.
- Reduced motion: `--dur-settle` computes to `0ms` and the headline stays fully visible at 390 wide.

## Acceptance status

- **AC-01 (owner review): unverified.** The study needs the owner's review at 390 and 1440 before this can pass. Automated checks are not a substitute.
- **AC-02 (motion contract documented): pass as a proposal.** The document covers reduced-motion and responsive equivalents. It is not accepted direction.
- **AC-03 (shared controls keyboard and reduced-motion): partially checked.** Tab and arrow behaviour and reduced-motion duration were checked in the study only. Real site controls are not implemented yet, and the study's buttons are below the 44px touch target the contract requires.

## Known gaps

- Service outcome sentences are placeholder copy (flagged in the study).
- Touch targets in the study are too small for phones; they must be enlarged before implementation.
- The no-JS fallback for the service outcomes is not built yet (T-015 scope).
- The study was not compared with the live Home page in a side-by-side review. That is part of AC-01.

## Implemented on the real homepage (4 November 2026)

Files: `app/page.tsx`, `app/globals.css`, `components/tikvah-canvas.tsx`, `components/hero-entrance.tsx`, `components/reveal.tsx`, `components/site-header.tsx` (optional `bare` shell). Screenshots: `architecture/evidence/home-v2-*.png`.

Checks run on the production build: type check and build pass; no sideways scroll on the homepage or on /work, /solutions, /about, /contact, /work/tikvah, /products at 390 and 1440; Tikvah switch works; the offer and contact button are visible at load; the entrance plays once per page load; scroll reveals leave nothing hidden after scrolling; server HTML contains all content without script.

Design-taste inspector: 10 failures reduced to 2. Remaining: (1) a contrast false positive on the selected "Whole site" label, whose highlight is a separate element behind the button; (2) only two real pictures on the page, both Tikvah captures. Resolving (2) needs approved Vib3Pulse captures or founder portraits from the owner; none were invented. Also open: no video, and the yellow-cream warning, which is Tikvah's own capture background.

Changes that reach other pages: header and footer rules removed, button/link/label sizes raised (buttons and text links 15px, labels and footer 13px), brand 20px.
