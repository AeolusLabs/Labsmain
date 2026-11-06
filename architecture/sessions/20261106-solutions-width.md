# Solutions map and shared width — 6 November 2026

Owner authorized pushing Solutions, then matching the reference width separately. Solutions map committed and pushed as 6c9bc03. Independent read-only review found no blocker. Typecheck and production build passed before that commit.

Width correction: reference uses content-box max-width 1280px plus 40px padding each side. App retains border-box sizing with size.container 1360px and explicit size.content 1280px (also used by image sizing hints). DESIGN.md records the approved geometry.

Verification: pnpm typecheck and pnpm build exited 0; token audit reports 426 tokens, 195 reference decisions, zero unmapped. Production server on localhost:3001 tested in the T3 collaborative browser. At 1440 and 390 CSS pixels, /, /work, /work/tikvah, /work/vib3pulse, /solutions, /products, /about, /contact, /privacy and /missing-check all have document scrollWidth equal to clientWidth. Desktop shell is 1360px and content 1280px on all ten checks. Browser reserves a 15px scrollbar on long pages; phone available width is 375px, with 20px gutters and 335px content.

Unrelated owner reference moves/deletions remain unstaged. No no-JavaScript image fallback added, as agreed. Push is repository delivery; production deployment health has not been checked. Next action: owner visual review of the wider layout.
