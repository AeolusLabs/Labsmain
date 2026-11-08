# Project review and PWA removal — 8 November 2026

PWA-20261108 | Remove installable PWA setup | owner: Codex | boundary: app metadata, manifest and install icons, DESIGN.md | dependency: owner request | status: DONE (local; not deployed).

Removed app/manifest.ts, appleWebApp/applicationName metadata and the three manifest-only public/icons PNGs. Kept favicon, ordinary browser icons, touch icon and browser theme colour. Source search found no service worker registration or offline cache implementation. DESIGN.md records the owner's regular-website decision.

Verification: pnpm typecheck and pnpm build exited 0. Token validation: 427 tokens; reference audit: 14 boards, 195 decisions, zero unmapped. git diff --check passed. Production server on localhost:3017: Home returned 200 without manifest/application/standalone metadata; /manifest.webmanifest and all three removed icon URLs returned 404; /favicon.ico returned 200. Temporary verification server stopped afterward.

REVIEW-20261108 | Review current project source | owner: Codex with independent read-only reviewer | boundary: contact flow, API/provider logic, metadata and design records | status: source review complete; findings open.

Confirmed by source inspection:
- P2: components/contact-panel.tsx:32 conditionally unmounts EnquiryForm when switching to the assistant. Uncontrolled name/email/organisation/challenge/consent and edits to an assistant draft are lost on return. Keep the form mounted while hidden or preserve its values in parent state.
- P2: app/privacy/page.tsx:20 says messages go to Anthropic, but lib/brief-provider.ts supports OpenRouter and configurable downstream models. Disclosure must cover the selected provider and intermediaries.

Neither finding was changed under this review request. No browser reproduction, full visual/reference review, real provider call, email delivery test or deployment was performed. Next ready action: address contact data retention and provider disclosure, then verify the affected flows. Prior project.json icon observation is historical and superseded by this removal.

Preserved pre-existing reference/prototype deletions and the untracked architecture/html prototype directory. No commit, push or deployment.
