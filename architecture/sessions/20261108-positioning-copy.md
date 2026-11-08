# Approved positioning copy — 8 November 2026

COPY-20261108 | Apply owner-approved AI/automation and collective positioning | owner: Codex | boundary: public marketing copy, shared metadata, contact need options and assistant context, DESIGN.md | dependencies: owner approval in chat | status: DONE (local; not published).

Decision: AeolusLabs builds AI-powered products and automation systems for businesses. Describe the company as a collective spanning technology and business development; retain named co-founders without defining the company as two developers. Existing project facts and privacy/delivery disclosures remain intact. DESIGN.md records this owner decision and replaces the old prescribed copy.

Changed: six marketing routes, layout/manifest metadata, studio footer, assistant starter prompts and company context, enquiry placeholder and shared need options. Shared options feed the form and assistant tool enum; enquiry handling accepts the need as text. No provider calls or emails were sent during verification.

Integration: the longer Home headline wrapped to four lines at 1440 with the former 168px role. Added type.home-positioning (60px minimum, 8.6vw, 128px maximum), consumed by Home and generated CSS, to preserve two desktop lines. Source-board type.home remains for reference auditing.

Verification: pnpm typecheck and pnpm build exited 0 after final runtime edits. Token checks: 427 tokens, 195 reference decisions across 14 boards, zero unmapped. git diff --check passed. Playwright on local dev port 3002 checked Home, Solutions, About, Work, Products and Contact at 390/768/1440: no horizontal document overflow and no two-developer framing. Rechecked Home/About/Solutions after type adjustment: scrollWidth equals clientWidth at all three widths. Inspected Home screenshots at 390 and 1440; desktop has two headline lines and phone wraps naturally. Verified rendered Home title/description and Contact select options. Live assistant output, provider delivery and production deployment were not tested.

Preserved: pre-existing architecture reference moves/deletions and untracked html prototype directory. No commit, push or deployment performed. Next action: owner review of local copy; publish only when authorized.
