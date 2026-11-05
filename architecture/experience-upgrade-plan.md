# AeolusLabs experience upgrade

## Primary goal

Make AeolusLabs feel like a capable, creative software studio: visitors encounter a distinctive opening, explore credible project evidence, try one useful experiment and easily start a relevant enquiry. Preserve the clean identity and balance engineering credibility with creative flair.

Planning requested 4 November 2026. This document defines execution order and scope; `architecture/project.json` owns task status and evidence. Existing tasks remain intact. No production implementation is complete under this plan. Visual treatments remain proposals until reviewed in context.

## How we work through the list

Work on one numbered group at a time, with its tasks in the order shown. Each group ends with a reviewable local result, relevant checks and a session handoff. Record actual results against the matching task ID in project.json; do not maintain a second progress percentage here. Normal sequence is 0 → 1 → 2 → 3 → 4 → 5 → 6. Asset gathering for group 5 can happen earlier. Only true technical dependencies block tasks; the sequence otherwise reflects priority.

Use `proposed → ready → in_progress → ready_for_verification → verified_complete`. Failed or unavailable checks stay explicit. A completed build is not visual approval. Major direction decisions are reviewed in an editable prototype before disruptive implementation. Once a direction is accepted, complete ordinary fixes within that scope without repeated permission requests.

## Phase 0 — Baseline and documentation discovery · T-013

**How this serves the primary goal:** establishes what already works and makes future improvement measurable.

- [ ] Record current branch/commit and existing edits; preserve unrelated work.
- [ ] Capture current Home, Work, Tikvah, Solutions, Contact and About at desktop/phone sizes, including light/dark.
- [ ] Inventory approved project captures, portraits and other usable material. Request missing founder assets early; do not invent them.
- [ ] Read installed Next docs for client boundaries, images and contact query handling; inspect existing image-dialog and form patterns.
- [ ] Measure baseline page transfer, image weight and a repeatable local performance run; distinguish laboratory evidence from real-user metrics.

References: `app/page.tsx`, `app/globals.css`, `components/project-image.tsx`, `components/contact-panel.tsx`, `architecture/sessions/20261104-main-minimal-promotion.md`, `architecture/sessions/20261104-interaction-research.md`; installed docs under `node_modules/next/dist/docs/`.

Done when: baseline evidence, asset inventory and documented API choices exist. Guard: stale PRODUCT.md/DESIGN.md proposal text must not override the owner's later minimal-site promotion or current brief.

## Phase 1 — Visual and motion foundation · T-014

**How this serves the primary goal:** creates one recognisable visual language for every later section.

- [ ] Compose an editable homepage study showing opening, project canvas, supporting services and closing invitation together.
- [ ] Establish stronger differences in type scale, section size and spacing within the existing identity.
- [ ] Define movement rules: elements make space, selections align, project views retain continuity; fast feedback and finite sequences.
- [ ] Specify responsive and reduced-motion equivalents before implementation.
- [ ] Review the complete direction, then record accepted decisions and implement shared motion/spacing primitives.

References: `app/globals.css`, `components/page-parts.tsx`, `components/navigation.tsx`, `components/theme-toggle.tsx`, loaded web-design/web-experiences and Impeccable guidance.

Done when: owner-reviewed composition, phone/desktop examples and a documented motion contract are available; shared controls pass keyboard/reduced-motion checks. Guard: no wholesale palette/font replacement or approved-standards rewrite without explicit direction agreement.

## Phase 2 — Signature homepage opening · T-015

**How this serves the primary goal:** makes the first impression express the promise “Make room for better.”

- [ ] Prototype approved interface fragments making space around the headline, then settling into a clear composition.
- [ ] Check whether that concept works with available public captures; use a simpler typography/layout composition if it does not.
- [ ] Implement one short entrance with the offer and contact action available immediately.
- [ ] Adapt the composition for phones and a static reduced-motion/no-JS state.

References: `app/page.tsx`, existing client component patterns, installed `use-client.md`; native CSS/WAAPI documentation refreshed before implementation.

Done when: the opening has been reviewed in the actual homepage, produces no layout jump or obstructed action, and remains usable during interruption/navigation. Guard: no repeating loops, forced intro, arbitrary 3D scene or unapproved private interface captures.

## Phase 3 — Real-work showcase and case-study story · T-016

**How this serves the primary goal:** backs the creative presentation with actual delivered software.

- [ ] Upgrade homepage Tikvah into a project canvas with desktop/mobile controls and clear delivery scope.
- [ ] Reuse the useful preview behaviour on Work without duplicating heavy assets unnecessarily.
- [ ] Shape the Tikvah case study into whole interface → explained detail → mobile experience, with normal scrolling.
- [ ] Preserve image enlargement, accessible close behaviour, captions and links to the real site.
- [ ] Replace oversized PNG delivery with appropriately sized existing WebP assets; defer alternate views where practical.

References: `components/tikvah-case-study.tsx`, `components/project-image.tsx`, `app/work/page.tsx`, `public/projects/tikvah/README.md` and installed Image docs.

Done when: views switch reliably under rapid input; keyboard/focus work; real images load correctly at 390/768/1440; the narrative uses only supported claims and approved imagery. Guard: two static captures do not justify pretending to demonstrate private account workflows or backend behaviour.

## Phase 4 — One useful Labs experiment · T-017

**How this serves the primary goal:** lets visitors experience original engineering craft directly.

- [ ] Choose one experiment in an editable prototype: a compact/comfortable interface control is the initial candidate.
- [ ] Use a real local interaction with clear visible cause and effect; label it as a studio experiment.
- [ ] Give it a purposeful home after the real work, or a dedicated route if homepage weight/length warrants it.
- [ ] Build touch, keyboard, reset and reduced-motion behaviour; keep state local and collect no visitor data.

References: React state patterns in existing client components; native range/button semantics; web-experiences interaction blueprint.

Done when: the experiment is useful and understandable without explanation from the developer, its input works across devices, and its measured payload meets the agreed budget. Guard: no replay pipeline, simulated processing, pretend AI, arbitrary counters or gallery of unrelated demos. Pick one experiment before building.

## Phase 5 — Services, enquiry and studio presence · T-018

**How this serves the primary goal:** turns interest into a relevant conversation and shows the people behind the work.

- [ ] Make homepage service choices reveal concise outcomes; preserve direct access to Solutions.
- [ ] Add clear section navigation and contextual enquiry actions on Solutions.
- [ ] Carry only an allowlisted service identifier to Contact; preselect an editable field without overwriting visitor input or an assistant draft.
- [ ] Polish form/assistant switching, validation and success feedback; preserve delivery/fallback semantics.
- [ ] Improve About with real founder portraits and approved individual perspectives when supplied. If assets are unavailable, explicitly defer this subtask rather than invent content or block unrelated work.
- [ ] Apply shared control polish to Products/Vib3Pulse. Interactive product imagery requires real approved captures first.

References: `app/solutions/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, `components/contact-panel.tsx`, `components/enquiry-form.tsx`, `lib/need-options.ts`; installed searchParams documentation.

Done when: service-to-contact navigation passes direct-load, unknown-value and back-navigation cases; form/chat drafts remain intact; About content has owner provenance or a recorded deferral. Guard: no query-string personal data, silent submission or decorative motion while users type.

## Phase 6 — Integrated verification and release readiness · T-019

**How this serves the primary goal:** ensures the expressive site remains fast, accessible and dependable.

- [ ] Review the integrated site in one batched desktop/mobile/light/dark pass; fix observed defects together and confirm once.
- [ ] Test all routes, keyboard, focus, native scrolling, rapid switching, reduced motion and meaningful no-JS fallbacks at 390/768/1440.
- [ ] Run typecheck and production build; verify chat availability under the correct build-time configuration without exposing keys.
- [ ] Check service prefill, form validation, assistant handoff and enquiry fallback using controlled tests; real outbound submissions require authorization.
- [ ] Compare page transfer and local performance with Phase 0. Provisional limits: zero new motion dependencies, no initial 3D/video, <=20KB compressed motion-specific code; assess total route weight against a provisional 1.5MB target and record exceptions honestly.
- [ ] Record screenshots, test results, known gaps and exact changed scope. Prepare a reviewable release; deploy only when authorized, then verify live behaviour.

References: package.json scripts, prior chat/enquiry verification sessions, installed Next production/build guidance, task acceptance evidence.

Done when: all mandatory checks have evidence, meaningful defects are fixed or disclosed, and the owner has reviewed the final result. Guard: no performance claims from screenshots, no successful-delivery claim based only on a mock, no automatic publish inferred from planning approval.

## First working session

Start T-013 (baseline), then T-014 (one complete visual/motion study). Review that direction before building the signature opening. Keep the pipeline in this order rather than starting several unrelated effects at once.
