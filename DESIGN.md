# AeolusLabs — single project authority

Updated: 5 November 2026. Applies to all production routes, shared components, styles, content and deployment work.

## Overview

This is the sole governing project document. The owner requested consolidation after conflicting briefs and design systems accumulated. Read and update this file before making project decisions. Superseded briefs, forwarding documents and archived copies have been deleted at the owner request. Session notes, evidence, prototypes and architecture/project.json record history or execution results; they cannot override this file. Explicit later owner instructions take precedence and must be incorporated here. Installed Next.js documentation governs API correctness.

The baseline is the minimal neutral site promoted to main on 4 November, with the existing Tikvah showcase and optional brief assistant. The earlier navy/cyan/blue/lime site is superseded. Minimal is selected, not an unchosen proposal. Current inspected checkout: main at b293cad, following a860a74. Code shows implementation, not automatic design approval or proof of correctness. Preserve useful behaviour while resolving discrepancies below; do not introduce another visual direction.

AeolusLabs is a company of two software developers in Nigeria, serving small and growing businesses, entrepreneurs and startups in Nigeria, across Africa and internationally. The site helps visitors understand the offer, inspect real work and start a relevant enquiry. Balance engineering credibility with creative flair through clear composition and inspectable work.

- Mission: Build practical software that bridges the gap between African businesses and the technology they need.
- Vision: An Africa where businesses of every size can access technology that helps them operate efficiently, innovate, and grow.
- Principles: Understand first, build deliberately, communicate openly, keep improving.
- Brand tagline: Digitalize. Automate. Elevate. Current homepage headline: Make room for better. These have different roles; do not replace one with the other by accident.
- Services: websites, web applications and business systems, mobile applications, backends and integrations, practical AI, custom AI agents and autonomous workflows with agreed human oversight, maintenance and support.
- Founders: Allan Ajayi-Adjari and Bernard Nneboh, both software developers. Placeholder founder names are superseded. Portraits and individual biographies require supplied or approved material.
- Canonical URL: https://www.aeoluslabsltd.com. Public email and enquiry recipient: info@aeoluslabsltd.com. WhatsApp and social links remain omitted.
- Tikvah: approved client project, complete frontend and backend delivery. Use approved real public-site captures, identify scope accurately and link to https://www.tikvah.space/. Do not imply screenshots demonstrate private workflows or backend operations.
- Vib3Pulse: company-owned product at https://vib3pulse-production.up.railway.app/. Its lime typographic artwork is artwork, not an application screenshot. Account-only capabilities are product-presented claims, not independently verified functions. Approved interface captures remain needed.
- Other client names, private notes and screenshots remain unpublished pending permission. Omit the poetry app. Never invent metrics, testimonials, outcomes, portraits, guarantees or publication approvals.
- Angular A logo: recreation of the selected supplied reference, not an original extracted vector. Replace only with approved final artwork. Keep existing favicon, app icons and manifest consistent.

## Colors

Use the existing semantic custom properties in app/globals.css throughout the site. That stylesheet is the runtime implementation of these values; do not introduce a parallel theme, framework palette or page-specific brand. Change the governing values here and their implementation together.

| CSS property | Light | Dark | Role |
| --- | --- | --- | --- |
| --bg | #f8f8f6 | #141a20 | Page background |
| --ink | #202220 | #f0f0eb | Primary text and filled controls |
| --muted | #5f635f | #a6afb5 | Supporting text |
| --line | #dedfda | #343e45 | Field borders and functional separators |
| --surface | #ffffff | #1d262d | Fields and raised content |
| --soft | #f0f1ed | #1a232a | Quiet section background |
| --accent | #315859 | #abd1cf | Focus and running-text links |
| --danger | #a8231b | #ff9a92 | Errors |

Vib3Pulse artwork may use #b9f761 with #18320c text within its own panel. Colours inside genuine project screenshots belong to those projects; they are not site tokens. Do not reintroduce electric-blue, lavender or lime page sections from older case-study experiments.

Appearance follows the system until the visitor saves a light/dark choice. Apply it before first paint; retain the existing theme button and persistence. Verify both themes rather than assuming inverse colours pass contrast checks.

## Typography

One typeface: Inter through next/font/google in app/layout.tsx, using --font-body with Arial/sans-serif fallbacks. Do not add a display font, icon font or a second type system.

- Display: clamp(40px, 5.5vw, 78px), weight 450, line-height 1.07, tracking -.06em. Existing phone page-specific heading sizes are responsive adjustments, not separate identities.
- Homepage section headings: 30px desktop / 28px phone, line-height 1.2. Other page headings currently use clamp(25px, 3vw, 39px), weight 450, tracking -.045em; reconcile shared roles rather than adding overrides.
- Third-level headings: 22px, weight 500, line-height 1.3, tracking -.03em.
- Body: 16px / 1.6 is the consolidation target, matching the latest homepage copy. Global body still uses 15px / 1.7: this is recorded implementation drift, not another approved scale.
- Lead copy: 20px. Buttons and text links: 15px. Supporting labels, navigation and footer: 13px. Form inputs: at least 16px to avoid phone zoom.
- Sentence-case section labels follow the latest homepage direction. Legacy tracked uppercase .eyebrow labels remain to reconcile; do not copy them into new sections.

Use size, weight, spacing and clear copy to establish hierarchy. Preserve factual copy while consolidating presentation.

## Layout

Use .wrap at min(1160px, 88%) with centred margins. Existing breakpoints are 960px for showcase stacking and 700px for phone layout. Validate 390, 768 and 1440px plus narrow-width overflow. Keep normal document scrolling.

The latest homepage establishes generous whitespace and quiet tonal sections. Its desktop section spacing is 96–120px; phone spacing is 64–72px, with existing smaller opening/footer adjustments. Inner pages can be denser when their task warrants it, but must use the same tokens, type roles, controls and shell. Functional borders remain appropriate for fields, facts and lists; do not mechanically alternate decorative rules around every section.

Production compositions:

- Home: offer and contact action; real Tikvah desktop/mobile showcase; concise services; closing enquiry invitation.
- Work: project image/artwork and delivery scope, with clear case-study links.
- Case studies: facts, large inspectable capture, challenge, experience, delivery and supported result. Keep native image enlargement, Escape close, captions and source links.
- Solutions: orientation and grouped capabilities, with direct contact navigation.
- About: real founder names, company purpose and working principles; no fabricated portraits or biographies.
- Contact: editable enquiry form and optional assistant beside direct email and next steps.
- Products: existing Vib3Pulse content is implemented at /products; do not treat this as a missing placeholder or invent additional products.
- Privacy and not-found: same shell and visual vocabulary. Privacy statements must match actual processing.

No Labs experiment, capability simulator, new route or major hero redesign is authorized merely because an old plan proposed it. Existing study HTML and its theme/spacing/replay controls are prototype tools, not production requirements.

## Elevation & Depth

Flat neutral surfaces, quiet tone changes and functional borders. Real project captures supply visual evidence. Do not introduce glass panels, decorative gradients, heavy shadows, invented device mockups or a competing card system. The native image dialog may use a backdrop for separation.

## Shapes

Small rectangular controls, generally 4px corners; fields and selection interiors may retain the existing 3px radius. No new pill-based navigation or decorative rounded container system. Maintain usable touch areas, targeting at least 44px for interactive controls; verify rather than inferring target size from text size.

## Components

Reuse the existing components instead of creating per-page substitutes:

- components/site-header.tsx: header, footer and PageShell; the bare shell supports the current homepage tonal sections.
- components/navigation.tsx and components/theme-toggle.tsx: route indication and appearance choice.
- components/page-parts.tsx: shared labels, arrows, button links, text links and closing invitation.
- components/tikvah-canvas.tsx: real desktop/mobile selection; one selected view, stable stage, keyboard controls and rapid-switch behaviour.
- components/project-image.tsx and components/tikvah-case-study.tsx: inspectable project evidence.
- components/contact-panel.tsx, components/enquiry-form.tsx and components/brief-assistant.tsx: mode choice, reviewable draft and explicit visitor submission.
- components/hero-entrance.tsx and components/reveal.tsx: existing motion implementation, subject to the constraints and gaps below.

### Interaction and accessibility

Keep semantic HTML, one h1 per page, skip link, visible focus, labels on every field, meaningful current/selected states, keyboard access and navigation visible on phones. Native dialogs close with Escape and return focus. Content and contact links remain available without animation. No-JS inspection must verify useful output, not just the presence of text in server HTML.

Motion tokens currently implemented: --dur-fast 280ms, --dur-base 640ms, --dur-settle 960ms, --ease-out cubic-bezier(.2,.7,.2,1), --ease-settle cubic-bezier(.16,1,.3,1). Existing component timings include a 320ms selection thumb, 400ms image fade, 160ms press feedback and 180ms link feedback. These are controlled component exceptions, not additional motion systems.

Motion communicates selection or feedback, uses transform/opacity, is interruptible and stops. Retain at most one brief opening emphasis; offer and contact action must be immediately usable. No autoplay loops, custom cursors, scroll interception, forced introductions, replay pipelines or simulated processing. Reduced motion must remove positional movement and entrances; the existing 150ms image fade is the sole documented reduced-motion transition exception. Do not add further scroll reveals while the current behaviour is unresolved.

### Enquiries and assistant

Enquiry delivery uses Resend. RESEND_API_KEY enables direct delivery. ENQUIRY_FROM_EMAIL optionally overrides AeolusLabs Enquiries <enquiries@aeoluslabsltd.com> and must use a verified sending domain. Recipient is info@aeoluslabsltd.com; visitor email is reply-to. There is no enquiry database. Missing credentials or rejected delivery produce an honest prepared-mailto fallback: nothing was sent or saved by the site. Do not claim inbox delivery from provider acceptance.

Preserve honeypot, same-origin and payload validation, plus the best-effort 5 enquiries per 15 minutes per visitor per server instance. Chat has a 40-request equivalent. These in-memory limits are not shared across serverless instances; durable hosting protection remains a launch check.

ANTHROPIC_API_KEY must exist before building because Contact is prerendered, and at runtime for /api/brief. Without it, retain the ordinary form. BRIEF_ASSISTANT_MODEL overrides the source default, currently claude-opus-5-5; confirm account availability rather than assuming it. Never expose secrets through NEXT_PUBLIC_ variables. Mock-provider configuration is for controlled local checks only.

The assistant asks short project-intake questions and returns an editable draft. It never sends an enquiry automatically. The visitor reviews, changes and explicitly submits it. Preserve draft handoff, focus management and honest error states. Conversations are processed by Anthropic and are not persisted by the site. Do not request sensitive personal information or promise pricing, delivery dates or capabilities.

### Local setup and deployment

Use Node.js 24 and pnpm 11.25.0. Run pnpm install --frozen-lockfile, pnpm dev, pnpm typecheck and pnpm build as appropriate. Stack: Next.js 16.4.5, React 19, TypeScript, plain CSS and the existing Anthropic SDK. There is no active Tailwind/shadcn design system. Read relevant node_modules/next/dist/docs/ guides before runtime changes; retain the generated Next instructions in AGENTS.md.

Vercel hosts the site. Set required variables in the intended Production/Preview environment and rebuild after build-time configuration changes. Keep credentials out of files, output, commits and documentation. Production deployment requires authorization; this consolidation does not publish changes.

Last verified hosting observation, 4 November: a860a74 deployed successfully; bare domain redirected 308 to www; eight checked public pages returned 200; Contact had assistantEnabled:false and /api/brief returned 503. Vercel CLI was logged out. These observations do not establish today's deployment state or the deployment of b293cad. Real provider operation and email inbox delivery remain unverified. Backup branch backup/main-before-minimal-2026-11-04 preserves the prior main; restore through a normal new commit, never by force-pushing main.

## Do's and Don'ts

### Known conflicts and next work

This document consolidates authority; it does not claim the existing website errors are repaired.

1. app/globals.css contains base minimal rules, appended motion rules and a homepage second pass. Fold repeated selectors into their owning sections and shared roles. Reconcile body sizes, label casing, section spacing and controls across all routes against this file. Do not add another override block or theme.
2. The earlier interaction research prohibited repeated scroll entrances, while b293cad introduces Reveal across the homepage. Treat their extent as unresolved; preserve readable static content, do not expand the pattern, and review whether each existing reveal is justified.
3. Reduced-motion CSS currently appears before later data-reveal transitions, and the broad transition reset does not by itself remove transform-based hover/press states. Verify preference changes, keyboard and hover states; ensure the final implementation honours the reduced-motion rule above.
4. Tikvah desktop/mobile switching, tab semantics, focus, no-JS behaviour and image load/weight require an integrated recheck. A prototype pass or server HTML check alone does not prove the production interaction works.
5. Older project.json tasks, discovery notes and prototype evidence contain pre-promotion proposal language and partial checks. They remain historical execution records; reconcile individual task evidence before marking completion. Do not reopen the selected identity on that basis.
6. Live Anthropic operation, actual email receipt, durable abuse limits, real-device icon installation, final social artwork and missing approved imagery remain open. Recheck hosting access and current deployments before changing settings.

Work in that order: unify runtime styles and interaction behaviour, verify all routes, then address deployment configuration with authenticated access. Fix actual errors found during verification and record exact reproduction/results; do not infer that all reported errors share a cause.

### Verification gates

For runtime consolidation, run typecheck and production build, then one batched desktop/phone, light/dark review with confirmation after fixes. Cover all production routes, no horizontal overflow, keyboard/focus, contrast, reduced motion, no-JS usefulness, theme persistence, rapid project switching, image dialog and form/chat state. Use controlled chat/enquiry tests without sending mail unless authorized. An enabled-chat build needs a configured key before build; simulated credentials prove no live access.

Measure performance before claiming it: no new motion dependencies or initial 3D/video; provisional motion-code budget <=20KB compressed and route transfer goal <=1.5MB remain targets, not measured passes. Use existing suitably sized WebP captures and avoid loading unused alternate imagery unnecessarily.

For documentation-only consolidation, verify local links, token accuracy against CSS, preservation of the Next instruction block, valid JSON and removal of superseded governing documents. A documentation pass does not require or imply fresh runtime, accessibility or live-provider verification.

Superseded documents and their archived copies are removed. Tracked originals remain recoverable through Git history. Session/evidence files record what happened at their stated date. Update this authority when a decision changes, and record evidence separately without creating another governing brief or design system.
