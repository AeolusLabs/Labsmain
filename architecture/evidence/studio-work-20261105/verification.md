# /work and /work/tikvah remodel, 5 November 2026

Built from the Work and Tikvah reference boards using the Home motion engine and shared tokens (new `styles/studio.css` owner, `StudioPage` shell).

Browser checks against a local production build (Chrome, 1440 / 768 / 390):
- Stage image on /work links to the case study; click is not intercepted by the tilt layers.
- Case study desktop and phone images enlarge, Escape closes, focus returns to the trigger.
- Pause and resume motion work; reduced motion leaves every reveal settled; with JavaScript off the headline, images and closing action are visible.
- One h1 per page; no horizontal overflow at 1440, 768 or 390; no page errors.
- Only failed request: `/_vercel/insights/script.js` (404), which exists only on Vercel and is expected locally.

Known gaps: /work/vib3pulse still uses the earlier layout (no reference board). Screenshots are full-page captures with motion paused; the wind canvas is faint in them by design. Not yet compared pixel-for-pixel with the reference at 1440/390.
