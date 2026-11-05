# Interaction research — proposal, not implementation

Owner requested web-experiences and Impeccable research/deliberation before changes. Confirmed desired impression: a balance of engineering credibility and creative flair. No production UI or approved standards changed in this exploration.

## Context and decision

Current live homepage inspected in T3 browser on 4 November 2026; source app/page.tsx and app/globals.css inspected. Minimal neutral identity is the baseline, as confirmed by the main-promotion session, despite stale proposal language in DESIGN.md and older brand instructions in PRODUCT.md. Those files were not rewritten.

The earlier run-example proposal is withdrawn: design-explorations.md lines 55–61 records owner rejection of replay controls, numbered pipelines and a machine-like treatment. Later minimal revision removed decorative example UI. Do not revive these without a new explicit decision.

Recommended priority:
1. Real Tikvah desktop/mobile work showcase. User-controlled view change, stable stage, 300–420ms transition, visible delivery scope and case-study link. No simulated processing or invented results.
2. Supporting capability exploration within existing expertise rows, if useful after the project showcase is reviewed. Outcome-oriented explanations; no large illustrative gallery competing with real work. Preserve direct access to Solutions.
3. Consistent hover/focus/selection feedback. At most one short opening composition. Omit repeated scroll reveals, decorative loops, custom cursors and scroll interception.

## Experience brief

- Concept: make real software work inspectable, then help visitors connect it with their own business needs.
- Style and palette: retain current minimal typography, neutral light/dark tokens and restrained accent; the inline study is not a new standard.
- Motion level: expressive within the project view change, subtle elsewhere.
- Essential content: company offer, real project evidence and scope, navigation, contact CTA and enquiry/chat remain available.
- Devices: desktop and phone, touch/pointer/keyboard; implementation checks at 390/768/1440.
- Performance: provisional zero new dependencies, no initial 3D/video, <=20KB compressed motion-specific JS/CSS. Measure whole-page transfer against a provisional <=1.5MB goal before claiming pass.
- Accessibility: native buttons, visible focus, instant reduced-motion state changes, readable semantic content without animation/JS; normal scrolling.
- Stack: current Next.js 16.4.5 / React 19; React state and CSS first, native Web Animations only if sequencing needs it.
- Assets: approved existing Tikvah desktop/mobile captures; no additional client permissions assumed.
- Boundaries: no backend/chat/enquiry changes, deployment, standards rewrite or unapproved factual claims.

## Research and deliberation

An independent web-experiences specialist reviewed history and researched references; root performed Impeccable context/shape and visual-direction review. Both favored actual work over synthetic demonstrations. Root inspected the live AeolusLabs and Linear pages in the collaborative browser; Linear DOM reported active animations and embedded interface controls. This was not a comprehensive motion/accessibility audit of any reference.

References inspected 2026-11-04:
- https://linear.app/ — live text plus browser render/DOM. Transfer the close connection between a claim and a visible product interface; do not copy its dashboard identity or animation density.
- https://www.work.co/ — live text inspection. Transfer identifiable project-first evidence; reference motion was not verified.
- https://www.instrument.com/ — live text inspection. Transfer confident creative positioning plus work; do not add a showreel without appropriate original material. Reference motion was not verified.
- https://developer.mozilla.org/en-US/docs/Web/API/Element/animate — native animation option; not needed for initial CSS implementation.
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API — possible progressive enhancement, deferred to avoid broader route-transition scope.
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion — motion preference guidance.

## Evidence and remaining verification

An inline HTML concept was previewed at 728px and 390px. Both existing project images loaded. Mobile scripted checks passed selected view, exactly one selected control, and no horizontal overflow. Desktop/mobile screenshots visually inspected. This demonstrates a concept, not production completion. Production keyboard, no-JS, dark-theme, reduced-motion, rapid switching and performance tests remain unverified until implementation.

Asset opportunity measured from local files: current home-desktop.png 1,580,785 bytes; existing home-desktop.webp 620,066 bytes; home-mobile.webp 197,510 bytes. Use correctly sized WebP assets and defer the alternate image in production. Total page transfer and runtime smoothness were not measured.

Next: owner reviews the revised interaction direction; implement the chosen scope only after direction agreement. Existing unrelated next-env.d.ts and live-hosting session changes were preserved. Development server started for inspection was stopped.
