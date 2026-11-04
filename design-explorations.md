# Homepage concept — Start with what if

Working preview: `public/homepage-concept.html`. Production homepage and approved visual standards are unchanged.

Audience: businesses in Nigeria and across Africa looking for websites, products, business systems and practical automation. Goal: help visitors recognise a possible solution and start an enquiry.

Direction: retain midnight navy and cyan, Space Grotesk and Inter. Use large editorial typography, an interactive challenge explorer, a contrasting pale project section, concise capability rows and a grounded delivery process. Excitement comes from exploring concrete possibilities rather than unlimited promises or constant motion.

Evidence: existing repository content confirms Tikvah frontend/backend delivery and the owned Vib3Pulse product. No invented metrics, customer quotes or founder identities. Project artwork is explicitly labelled; approved screenshots are still needed.

Interaction: four accessible toggle buttons update an illustrative workflow and contact invitation. Mobile navigation supports Escape, focus return and closing on selection. Reduced motion is respected. All project/contact links use existing routes.

Pending: owner feedback on the concept before integrating into the production homepage; approved screenshots for both projects; real founder names and biographies before expanding the team section.

## Direction 02 — brighter accents

Owner feedback: initial palette felt dull and needed more excitement. Preserved direction 01 in `public/homepage-concept-v1.html`. Updated the working preview with electric blue explorer and closing sections, acid lime calls to action and selected challenge, brighter cyan, a lavender project backdrop and lilac Tikvah concept artwork. Navy remains the anchor. This is a preview experiment, not an approved global palette. The comparison link now opens the previous concept.

## Integration

Owner approved direction 02 and requested homepage integration and design documentation. Implemented the actual homepage in app/page.tsx, scoped its presentation in app/homepage.css and isolated the interactive explorer in components/possibility-explorer.tsx. DESIGN.md now records the approved palette and its roles. Approved screenshots remain pending.

## Verified project material and founders

Owner supplied founder names: Allan Ajayi-Adjari and Bernard Nneboh, and confirmed info@aeoluslabsltd.com. About now uses these names; the contact email already matched. Captured Tikvah public homepage at desktop and mobile widths on 25 October 2026. Actual screenshots replace the homepage concept artwork and appear on Work and the Tikvah case study. Inspected public About, Resources and registration pages; did not register, submit personal data or inspect private correspondence. Resources currently presents an empty state, so it is not showcased. Vib3Pulse imagery and founder portraits/biographies remain outstanding.

## Screenshot clarity refinement

Owner flagged blurry images and supplied ifeoluwase.dev and oyin.design as portfolio references. Replaced compressed 1x WebP captures with lossless 2x PNG captures (desktop 2560×1800, mobile 780×1688). Screenshot components serve original assets without another compression pass. Desktop case-study image now occupies the full gallery width; mobile has its own presentation. Added a native modal viewer with Escape support and an original-image link. Homepage uses a closer crop. Verified widths 390/768/1440, image resolution, modal open/close and TypeScript.

Reference detail: Ifeoluwase presents projects in staged laptop mockups; Oyin uses small contextual project imagery and hover exploration. Adopted a device-style frame for the homepage thumbnail using our actual Tikvah capture, while keeping a large inspectable view in the case study.

Owner refinement: remove the surrounding box and laptop mockup from the homepage Tikvah tile. Use the real capture edge to edge with a top-aligned cover crop.

## Tikvah case-study revamp

Owner requested a brighter complete revamp of /work/tikvah. Replaced repeated dark split sections with an oversized editorial title, project facts, edge-to-edge desktop capture, lavender challenge section, electric-blue mobile narrative, lime delivery rows and blue contact invitation. Retained real source material, scope attribution, source website links, responsive images and native image viewer. Scoped CSS lives in components/tikvah-case-study.css. TypeScript and browser checks passed at 390/768/1440; image viewer/Escape and contact navigation work without JS errors. Desktop/mobile screenshots reviewed.

## Explorer interaction — 26 October 2026

Experience brief: Start with what if; preserve approved navy/blue/lime palette and current content. Motion level: expressive within the explorer only, subtle elsewhere. Essential content: challenge choices, scenario explanation, complete workflow and enquiry link remain immediately visible. Target phone/tablet/desktop, keyboard/touch and reduced motion. Stack: existing React/Next; no new dependencies or media. Boundaries: routes, project content, enquiry handling and design tokens unchanged.

Blueprint: selecting a challenge replaces the scenario immediately and restarts a 720ms sequence. Three numbered steps connect in order, ending in a lime outcome. A replay control offers explicit exploration. Normal scrolling stays native; quick input replaces the previous animation without timers or stale transitions. No text is hidden. Reduced motion uses instant states through CSS media queries; animations require no JavaScript animation engine. Unsupported CSS animation preserves the static final presentation.

Budget: zero added motion-library JS or media; added CSS is under 10KB uncompressed. Whole-page transfer/field performance was not measured; existing uncompressed portfolio screenshots remain outside this motion task. No frame-rate claim.

Verification: TypeScript and production build passed. Chromium checks passed all choices, rapid switching, replay, Enter activation and reduced motion. No horizontal overflow at 390/768/1440; no JS errors. Phone/desktop final-state screenshots inspected. Build still reports the existing Next security advisory.

## Preview hydration recovery

The user’s in-app browser retained the earlier explorer module while the server rendered the new workflow, causing a hydration mismatch. Fresh Chromium had no errors. Rebuilt the dev cache and moved the new client implementation to components/workflow-explorer.tsx, updating the homepage import to give it a fresh module entry. Verified in the affected tab: reload, selection changes, current three-step DOM, and no new error logs after the fix. Old errors remain in preserved console history. TypeScript passed. Avoid overlapping development and production builds during interactive preview checks.

## Concept rethink — A place for your ambition

Owner rejected the replay control, rigid numbered pipeline and machine-like treatment; requested a full conceptual rethink with web-design and web-experiences. Removed replay from the actual explorer. New separate preview: public/possibilities-studio.html. Current homepage and approved DESIGN.md otherwise remain unchanged pending direction feedback.

Concept: let visitors picture what they could have, rather than watch our process. Four outcome-led choices reveal different illustrative product interfaces: organised enquiries, an example booking product, connected business view and a clear business website. Anchor illustration in actual delivered work through a Tikvah proof section. All mock interfaces are labelled illustrative; no invented client metrics or results.

Experience brief: approved navy/blue/lime identity in a lighter experimental composition; expressive within a short user-controlled scene transition, restrained elsewhere. Essential copy, choices, evidence and contact remain visible. Targets touch/keyboard/phone/tablet/desktop, instant reduced-motion changes, normal scroll and no animation-dependent content. Existing framework remains unchanged; preview is standalone HTML/CSS/JS. Budget: no motion-library dependencies, no new media; uses existing Tikvah asset lazily. Font transfer not measured.

Blueprint: pressing an ambition pill updates accompanying text immediately, switches the interface scene, and settles the illustrative product surface over 420ms with a small positional shift. No autoplay, replay, progress animation or numbered technical diagram. Reduced motion removes the transition entirely. Buttons remain available during transitions; quick selection replaces the scene. Plain initial scene remains without JS. No claims of connected backend operations.

Preview verification: all four scene switches, single selected state, Enter activation and instant reduced-motion behavior passed in Chromium. No horizontal overflow at 390/768/1440; no JavaScript errors. Desktop/mobile full-page screenshots inspected. Review pending before homepage integration; no approved design-standard changes.

## Across-site preview

Owner asked to see how the approved softer studio direction would affect other pages before implementation. Created public/site-direction.html, a separate four-view prototype with hash-based navigation for Work, Solutions, About and Contact. Actual routes and approved design standards are unchanged. Shared light canvas, dark ink, blue emphasis, pill actions and generous spacing; layouts vary by page purpose. Work uses actual Tikvah capture and labelled Vib3Pulse artwork. Solutions groups services into outcomes with illustrative interfaces. About uses confirmed founder names and honest initials. Contact includes a clearly labelled non-submitting design form and links to the real enquiry route; no data is sent or saved. No fabricated testimonials or results.

Motion: short 350ms page settle, understated hover feedback; reduced motion disables animations. No added dependencies. Tested all four views at 390/768/1440 without horizontal overflow; page navigation, keyboard activation and project-interest selection passed with no JS errors. Desktop views and mobile Solutions/Contact screenshots visually inspected.

## Product explorer in the original homepage

Owner requested an HTML preview following the review and rejected the drastic wider light redesign. Created public/homepage-in-context.html using the navy homepage concept as surrounding context. Retains bold hero, navy/cyan/lime identity, project showcase, services/process and electric-blue closing section. Replaces only the technical explorer composition with outcome pills and an illustrative product stage; light surface is confined to the scene. Real Tikvah capture is included. Actual routes and DESIGN.md unchanged.

Experience Brief: concept = picture software possibilities within familiar AeolusLabs context; style = original dark editorial identity with softer scene surfaces; palette = original approved navy/cyan/blue/lime; motion_level = expressive in the user-controlled scene, subtle elsewhere; essential_content = choices, explanation, example label, actual project proof, contact links; constraints.devices = 390/768/1440, keyboard/touch; constraints.performance = no new libraries/media, whole-page budget unspecified; constraints.accessibility = immediate text, static fallback, instant reduced-motion scene; constraints.stack = separate HTML/CSS/JS prototype alongside existing Next app; constraints.assets = real Tikvah capture, illustrative UI labelled; constraints.boundaries = no live homepage, other-route, backend or standards changes.

Interaction Blueprint: choose an ambition → immediate copy and example switch → small 420ms product-surface settle → static final state. No replay, autoplay or numbered pipeline. Native buttons, keyboard, normal scroll and reduced-motion equivalents retained. Four scene states, single selection, keyboard Enter, reduced motion and no overflow at 390/768/1440 passed. No JS errors. Desktop/mobile screenshots visually inspected.

## Approved in-context integration on a separate branch

Owner approved the navy in-context preview and requested implementation on a separate branch. Branch: codex/possibilities-studio. Actual homepage now uses components/possibility-studio.tsx and scoped possibility-studio.css. Preserves existing hero, project section, services, process and closing invitation. All four illustrative scenes are React markup; no HTML injection or new dependencies. Screen readers receive the explanatory text once, while decorative scene markup is excluded from announcements. Reduced motion is instant; content remains visible. Replay and the old numbered pipeline are removed.

Browser verification: four choices, single selected state, Enter activation, contact navigation and reduced-motion behavior passed. No horizontal overflow at 390/768/1440, no console or page errors. Desktop/mobile screenshots inspected. main remains at its existing commit; this branch is not yet pushed.

Final branch verification: TypeScript passed after integration. Production build compiled successfully, completed TypeScript and generated all 14 routes, but did not terminate after its route report; stopped the stalled command and restarted the development preview. Therefore a clean production-build exit is unverified.

## Whole-site minimalist reset — 26 October 2026

Latest owner direction: return to the drawing board for a simple whole-site style combining minimalism, cleanliness and sophistication. This supersedes earlier resistance to considering a broad redesign as a proposal, but is not approval to replace production or modify approved standards.

Separate prototype: public/minimal-direction.html. Five views (Home, Work, Solutions, About, Contact), one neutral system, restrained Inter typography, thin dividers, small rectangular controls and actual project evidence. Light and dark are the same composition with theme variables, presented for comparison rather than two competing designs. Vib3Pulse retains product branding only within its artwork. No new claims, portraits or testimonials. Contact is explicitly a non-submitting prototype linking to the real enquiry page.

Concept: quiet confidence through clarity and real work. Journey: understand the offer, inspect Tikvah, explore capabilities, meet founders and start a conversation. Motion level subtle: ordinary hover/focus feedback only; no signature animation or new dependency. Performance budget unspecified; existing project assets reused. Production, main and DESIGN.md are untouched; proposal is on codex/possibilities-studio.

Verification: all five views and both appearances at 390/768/1440 passed overflow checks. Navigation and Enter activation passed; no JS errors. Desktop light/dark and mobile light homepage screenshots visually inspected. Owner feedback pending before implementation or publishing.

## Intentional composition revision

Owner liked the clean style but requested deliberate placement instead of recycling earlier layouts. New comparison prototype: public/minimal-composition.html. The original minimal-direction.html remains available for comparison.

Recomposed all five views from their visitor tasks. Home: split offer/context/action, contextual featured project image with adjacent brief, expertise introduction opposite a concise service list, short approach note, final invitation. Work: full project rows with adjacent roles/scope instead of staggered cards. Solutions: small orientation column and readable grouped capabilities; decorative example UI removed. About: founders introduced before company history; no monogram placeholders. Contact: shorter opening, primary form column, secondary direct-email/expectation column. Retains neutral light/dark study, one typography voice, real evidence and understated motion; actual routes and standards unchanged.

Verified five views at 390/768/1440 without overflow or JS errors. Keyboard page navigation and theme switch passed. Desktop Home/About/Contact and mobile Home screenshots visually inspected. Contact remains explicitly a non-submitting prototype. Main and production unchanged.

## Full minimal redesign on its own branch — 4 November 2026

Owner chose to build the whole site in the minimal ("grown-up") style on a separate branch, then decide between it and the navy direction. Branch: codex/minimal-redesign (from codex/possibilities-studio). Navy branch left untouched. Canonical address decided: www.aeoluslabsltd.com.

Built from public/minimal-composition.html: every route (Home, Work, Tikvah and Vib3Pulse case studies, Solutions, Products, About, Contact, Privacy, 404) recomposed in one neutral system, with light and dark appearances. Body text raised from the prototype's 14px to 15px and the smallest labels from 10px to 11–12px for legibility; form fields are 16px. Navigation stays visible on phones. Products moved to the footer (still routed). Titles, theme colour, sitemap and robots now use the www address. Removed the old homepage explorer, Tikvah feature/gallery components and the Tailwind/shadcn toolchain, none of which the new design uses; audit findings fell from 85 to 5 (all inside Next's own build tooling).

Verification (production build, Chromium): typecheck and build exit 0; all 10 routes at 390/768/1440 with no horizontal overflow, one h1 each and no console errors; appearance toggle persists across navigation and reload and follows the system setting when nothing is saved; image viewer opens and closes with Escape; enquiry form blocks empty submit and, without email credentials, returns the prepared-email result; skip link is first in tab order. Desktop pages, dark Solutions and phone Home/Contact screenshots inspected. Not measured: Lighthouse, real devices, screen reader. Tikvah captures are still served unoptimised (about 1.5 MB on phones); consider optimised delivery for thumbnails.

## App icons for iOS and Android — 4 November 2026

Owner asked for icons that work on Android and iOS. Before: the site pointed Apple's touch icon at an SVG (iOS ignores SVG), the only PNG was an unused template placeholder with transparency, and there was no web manifest. Now (codex/minimal-redesign): app/apple-icon.png (180×180, opaque, as iOS requires), app/icon.png, app/icon.svg (adapts to light/dark tabs), app/favicon.ico (32 and 48), app/manifest.ts with 192, 512 and maskable 512 PNGs in public/icons, plus the iOS home-screen title. Artwork is the angular A recreated from the supplied reference, light on the dark neutral #141A20. Maskable icon keeps the mark inside the Android safe zone. Template placeholder images removed.

Verification: typecheck and production build exit 0; head tags, manifest and all eight icon files respond 200 with the right types; PNGs are RGB with no alpha (RGBA only inside favicon.ico, which requires it). Visual sheet inspected with circle and rounded-square crops. Not done: installing on a real iPhone or Android phone.
