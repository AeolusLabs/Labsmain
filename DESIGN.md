# AeolusLabs — single project and design authority

Updated: 9 November 2026. Status: owner-selected remodelling direction; shared token foundation implemented locally, full reference compositions and expressive effects pending.

## Overview

**Match the owner-supplied `AeolusLabs Website.html` across the whole website.** This replaces the former light neutral / Inter / small rectangular controls direction and its restrictions on expressive motion. Do not blend the systems. Current code is implementation to remodel, not competing design authority.

This remains the only governing document for product, visual design, behaviour and operations. Do not recreate PRODUCT.md, another design brief, a motion contract or archive copies. AGENTS.md retains mandatory agent/API instructions. Tasks, prototypes and sessions are evidence only. Later owner decisions take precedence and must be reflected here.

### Reference provenance

The attachment has fourteen boards: Home, Work, Tikvah case study, Solutions, Products, About and Contact at 1440px, then the same seven at 390px. Phone boards import their corresponding page: one responsive system. Outer viewer background, loading/unpacking UI, editor controls and fixed iframe heights are not website design.

- Attachment: `file_f7f82278-456e-498e-b1bc-accceac84a52`, named `AeolusLabs Website.html`.
- Repository reference: [architecture/AeolusLabs Website.html](<architecture/AeolusLabs Website.html>). This is the owner-supplied visual reference; DESIGN.md remains the single written authority.
- SHA-256: `1fef6d6835121acb974feb5bd20f07560c9f4002ca85025cba50223c0c6e8b99`.
- Inspection: unpacked all fourteen templates; inspected shared motion engine and embedded assets. Static Home composition rendered, but local font loading failed there, so fallback-font rendering is not typography approval. Interactive inspection was unavailable. Behaviour below is extracted from source, not claimed runtime-tested.

Port the visual/interaction intent into the existing Next.js app with real routes and semantic controls. Do not ship the export bundler, DCLogic/custom tags, duplicated React runtime, board frames or placeholder form behaviour. The attachment supplies appearance; existing working application logic supplies real enquiry/chat behaviour.

### Creative direction

An expressive software studio shaped by air, space and responsive movement: deep ink surfaces, pale green-white text, fresh mint, monumental characterful type, layered real work and generous composition. Wind responds to the pointer, typography moves, images have depth, and purposeful pale sections interrupt the dark canvas. The offer and contact route remain clear.

Seven identifying features must survive: dark/mint shell; Bricolage Grotesque with Instrument Sans; enormous two-line headlines; pill CTAs; layered desktop/phone Tikvah captures; pale expertise/experience sections; wind, the animated hero headline and responsive artwork. A dark recolour of the old minimal site is insufficient.

### Product truth

The website is AeolusLabs’ company portfolio and enquiry channel (owner clarification, 8 November 2026). Its primary job is to introduce the collective, showcase real client work and owned products, explain our contribution, and help prospective clients judge whether to work with us. Assess the site against that purpose as well as reference fidelity.

AeolusLabs is a collective bringing together expertise across technology and business development. We build AI-powered products and automation systems for businesses. Based in Nigeria, we serve businesses, entrepreneurs and startups across Africa and internationally. Owner approved this positioning and the collective description on 8 November 2026, replacing the two-developer company framing. Do not invent team size, members, specialist credentials or AI capabilities for existing projects. Help visitors understand the offer, inspect real work and start a relevant enquiry. Approved copy takes precedence over reference-board wording; visual composition remains governed by the reference.

- Founders: Allan Ajayi-Adjari and Bernard Nneboh. Introduce them as co-founders; do not define the collective as two software developers. Type-led introductions as in the reference; no invented portraits/biographies.
- Mission: help African businesses access practical AI and automation that fit how they work. Vision: an Africa where businesses of every size can access technology that helps them operate efficiently, innovate and grow.
- Principles: Understand first. Build deliberately. Communicate openly. Keep improving.
- Brand tagline: Digitalize. Automate. Elevate. Homepage headline: AI-powered products. Business automation. Different roles.
- Services, in order: AI-powered products (applications and custom agents), automation systems and workflows with agreed human oversight, integrations, ongoing support. Websites, web/mobile applications, backends and APIs remain supporting capabilities rather than the company definition.
- Canonical: https://www.aeoluslabsltd.com. Public email/recipient: info@aeoluslabsltd.com. No unconfirmed WhatsApp/social links.
- Tikvah: approved client project, complete frontend/backend delivery; https://www.tikvah.space/. Real public captures, accurate capture dates, private flows explicitly untested. Screenshots do not prove backend operation.
- Vib3Pulse: company-owned; https://vib3pulse-production.up.railway.app/. Lime artwork is not a product screenshot. Actual public landing and sign-in captures from 8 November 2026 now accompany the artwork. Sample tickets/events shown in the landing are demonstrations, not transactions. Account-only features remain product-presented claims until verified.
- TLC Beauty Shop / TheLashCode: owner requested inclusion and confirmed end-to-end delivery on 8 November 2026; https://www.tlcbeautyshop.com/. The public brand is TheLashCode. Showcase the salon website, service pricing, gallery and appointment journey. Public booking describes a 50% Paystack deposit and WhatsApp follow-up; completed payments, bookings and business outcomes were not tested or claimed. Capture provenance belongs with the assets.
- This website’s own brief assistant is a first-party example of AI-assisted intake with visitor review before submission. Explain its actual workflow and availability-dependent assistant; retain the ordinary form and prepared-email fallback. Do not imply that Tikvah or TLC uses AI.
- Other client names, private notes/screenshots remain unpublished pending permission. Omit poetry app. Never invent metrics, testimonials, results, guarantees or approvals.
- Preserve the angular A mark. Current vector recreates supplied artwork; it is not extracted original artwork. Approved final artwork may replace it.

## Colors

**One dark-first palette on every route.** Pale sections are intentional sections, not a separate theme. The reference has no appearance toggle: remove the former system-following theme from the remodel's default shell. Do not invert pale sections/product artwork with OS appearance.

These semantic aliases are implemented from design-system/tokens.json. Each alias resolves to its --color-* token; pale sections rebind context aliases rather than defining another palette.

| Token | Reference value | Role |
| --- | --- | --- |
| --bg | #0A1116 | Site/hero |
| --ink | #EAF0EC | Main text |
| --muted | #A9B8B3 | Supporting body |
| --text-secondary | #C5D1CD | Nav/stronger support |
| --text-quiet | #8FA19B | Tertiary captions |
| --accent | #7BE8CB | Mint emphasis/CTA/wind |
| --accent-ink | #06231C | Mint button text |
| --surface | #101A21 | Fields/image-stage backing |
| --line | rgba(234,240,236,.16) | Dark rules/borders |
| --section-light | #EDF1ED | Expertise/experience |
| --light-ink | #0A1116 | Text on pale |
| --light-muted | #33423E | Body on pale |
| --light-accent | #0F5A4A | Pale-section emphasis |
| --light-line | rgba(10,17,22,.2) | Pale rules |
| --row-highlight | rgba(15,90,74,.11) | Service highlight |
| --product-lime | #B9F761 | Vib3Pulse only |
| --product-ink | #18320C | Product type/art/button |
| --product-button-text | #EAF6D6 | Product button text |

Reference pale opacity variants: marquee rule .12, phone image border .22, fields .28, ghost CTA .35, ghost hover fill .06. Derive from #EAF0EC as component variants. Hover white #FFFFFF. Spotlight rgba(123,232,203,.16), fading to transparent at 62%.

Export editor accent choices #9DB8FF/#FFC36B/#FF8E72 are not extra website palettes. Mint is selected throughout. Genuine screenshot colours belong to those projects. Error/success colours are not fully specified: preserve distinct accessible text/icon feedback and contrast-check semantic states during implementation, without adding brand accents.

## Typography

**Display/brand: Bricolage Grotesque. Body/UI: Instrument Sans.** Replace the Inter-only rule. Use Next font loading where supported, swap/fallbacks and retained licences. Reference declares Bricolage variable 200–800 and Instrument Sans 400/500/600. Verify actual font weight/axis support; declarations alone are insufficient.

| Role | Extracted size | Weight / leading / tracking |
| --- | --- | --- |
| Brand | 22px | Bricolage 600 / normal / -.02em |
| Home h1 | clamp(60px,8.6vw,128px) | Bricolage 500 / .92 / -.045em |
| Work h1 | clamp(56px,9.5vw,140px) | Bricolage 500 / .94 / -.045em |
| Solutions/Products/Contact h1 | clamp(52px,8.6vw,128px) | Bricolage 500 / .94 / -.045em |
| About h1 | clamp(52px,9vw,136px) | Bricolage 500 / .94 / -.045em |
| Tikvah title | clamp(80px,17vw,250px) | Bricolage 500 / .90 / -.055em |
| Major h2 | clamp(40px,5.6vw,80px) | Bricolage 500 / 1 / -.035em |
| Pale-section h2 | clamp(40px,5vw,72px) | Bricolage 500 / 1 / -.035em |
| Standard closing | clamp(48px,8vw,120px) | Bricolage 500 / tight |
| Home closing | clamp(56px,10vw,152px) | Bricolage 500 / .95 / -.045em |
| Home lead | clamp(20px,2.2vw,28px) | Instrument / 1.35 / -.01em |
| Inner lead | clamp(19px,2vw,24px) | Instrument / readable |
| Body | 17px | Instrument 400 / 1.55 |
| CTA | 16px | Instrument 600; header 15px |
| Navigation | 15px | Instrument |
| Eyebrow | 14px | Uppercase / .14em tracking |
| Footer | 14px | Instrument |
| Hero hint | 13px | Uppercase / .08em tracking |
| Inputs | 16px minimum | Instrument |

Use named shared roles and intentional page-title variants. Headline line masks use .14em bottom padding and matching negative margin to protect descenders. Allow natural wrapping inside line groups on phones, not scaled desktop artboards.

The longer approved Home positioning uses `type.home-positioning` (60px minimum, 8.6vw, 128px maximum) to retain two desktop lines; `type.home` retains the source-board size for reference auditing. Phone line groups wrap naturally.

Headline groups; bold means mint:

- Home: “AI-powered products.” / “**Business automation.**”
- Work: “See what” / “we’ve **built.**”
- Solutions: “Build your product.” / “**Automate your processes.**”
- Products: “Our ideas,” / “built into **products.**”
- About: “Different perspectives.” / “A shared **purpose.**”
- Contact: “What would you” / “build or **automate?**”
- Tikvah: monumental “Tikvah”.

## Layout

### Geometry and responsive rules

Desktop 1440px: centred max-width 1360px border-box shell with 40px inner horizontal padding; 1280px content, 80px visible outer gutters. This matches the reference's content-box max-width 1280px plus padding. Owner approved matching this width across the site on 6 November 2026. Full-width marquees/pale sections sit outside shell with aligned inner content. Replace old 1160px/88% wrapper.

Header: padding 28px 40px, wrapping flex/space-between, gap 16px 32px. Logo 30×30px, wordmark 22px, gap 12px. Nav order Work/Solutions/Products/About then mint “Start a conversation”; gaps 8px 28px. Normal-flow header, not an invented sticky/floating menu.

Home hero: 88px 40px 120px padding, reference min-height 620px, 48px main gaps. Huge heading, supporting two-column grid and pointer hint (no eyebrow). Supporting grid: auto-fit/minmax 360px preferred columns, gaps 32px 64px. Do not revert to a small headline beside a paragraph.

Inner hero: usually 72px 40px 104px; Tikvah 56px 40px 88px; Contact 72px 40px 88px. Dark section separation generally 140px. Pale interiors 112px 40px. Two-column gaps typically 56px 80px. Standard closing 160px 40px 120px, Home 180px 40px 120px. Footer top rule, padding 32px 40px 40px, wrapping credit/nav with 16px 32px gaps. Encode shared spacing roles instead of repeating inline styles.

Phone breakpoint in export: max-width 640px. Gutters 20px; visible wrapped nav gaps 4px 20px. Hero 36px top/64px bottom, no fixed minimum height. Subsequent sections generally 84px top; pale interiors roughly 72px vertical. Reproduce outcomes with scoped CSS instead of broad !important overrides.

Auto-fit grids use preferred minima 300–380px capped at 100%; stack when needed. Footer wraps. Ensure long names, emails and headline words fit. Keep at least 44px targets and 16px fields. Preserve large type, image overlap and dark/pale rhythm at 390px. Interpolate naturally at 768px; no separate tablet identity.

Fixed export board heights (phone 2300–6000px) are not route heights. Content determines height. Clip decoration/image masks locally, not meaningful page content. Native scrolling throughout.

### Page compositions

| Route | Required composition in order |
| --- | --- |
| / | Wind/spotlight hero; static four-point services summary; large Tikvah desktop capture plus overlapping phone; TLC website preview and case link; pale expertise/three service rows; lime Vib3Pulse teaser; own AI-assisted enquiry workflow; “What would you automate?” closing; footer. |
| /work | Wind hero “See what we’ve built”; layered Tikvah stage/role/delivery/case link; TLC website preview/scope/case link; lime Vib3Pulse panel with direct project link; “Your next product. Your next workflow.” closing. |
| /work/tikvah | Back link/category/huge title/subtitle/live link; four wrapping facts; desktop image/caption; dark challenge; pale experience with phone/three public-journey points; dark delivery rows/provenance; supported result; “Your idea could be next” closing. |
| /solutions | Wind problem-led hero; pale orientation/CTA beside four large linked capability rows; dark four-principle process; “A clear scope comes first” closing. |
| /products | Wind hero; large lime Vib3Pulse artwork/description/live link/disclaimer; “Ready to build your product?” closing. |
| /about | Wind hero; type-led co-founders; “What defines us” narrative; four numbered principles; “What could you build or automate?” closing. |
| /contact | Wind invitation hero; form beside direct email/next steps; generous bottom breathing room; footer. Preserve consent/chat/validation/fallback omitted from the board. |

Services band (owner decision, 9 November 2026: the decorative marquees are removed): a static, semantic service summary is shown at every width, in the place the marquees held: Build your product; Simplify daily work; Connect your tools; Keep things running, each with a short explanation. Phone text wraps naturally in one column; no hover, swipe, cursor or animation is needed to read every item. This supersedes the reference's ticker treatment. The later pale expertise section remains the detailed service navigation.

Solutions rows: AI-powered products; Automation systems; Integrations; Maintenance & support, each outcome-led eyebrow/scope/arrow. Home's shorter rows: AI-powered products, Automation systems, Integrations & support. Two levels of one taxonomy.

The motion control is a plain text control in the footer (owner decision, 9 November 2026); it no longer floats over content on any device. It appears only on routes that run the motion engine.

No dedicated reference boards for /work/vib3pulse, /work/tlc-beauty-shop, Privacy or not-found: extend the same vocabulary and retain factual content/disclosures. Case studies should show the business need, confirmed contribution, distinct real public screens and honest verification boundaries. Products pairs the lime cover with actual Vib3Pulse public imagery. Solutions explains the engagement sequence: understand the need, agree scope, build and review, agree handover/support. These portfolio improvements were requested on 8 November 2026. Map export .dc.html links to actual routes. Do not invent unrelated page identities.

## Elevation & Depth

Depth belongs to actual work and atmospheric layers, not decorative card grids.

- Wind canvas behind content: aria-hidden, pointer-events:none, lower mask opaque through 72% then transparent. Spotlight is soft mint atmosphere.
- Tikvah desktop: full natural ratio, 16px radius, pale border, #101A21 backing. Phone overlaps lower right, 20px radius, .22 pale border, `0 30px 60px rgba(0,0,0,.55)` shadow. Reserve approximately 72px below desktop for overlap; no caption/action obstruction.
- Phone width clamp(110px,17vw,230px), right offset clamp(16px,4vw,56px). Real phone capture, not invented device chrome. Keep images inspectable and undistorted.
- Perspective/depth layers belong to image stage; text stays outside moving planes. Static/reduced-motion state retains composed overlap.
- Vib3Pulse lime panel has dark rings/equaliser as artwork, not a live interface or data claim.

## Shapes

CTA pills: radius 999px, min-height 48px, padding-inline 24px, icon gap 10px. Header CTA 44px/20px/15px text. Primary mint/#06231C; secondary transparent/pale border. Primary hover brightness(1.1); ghost hover stronger border and .06 pale fill.

Capture corners: desktop 16px, phone overlay 20px, standalone phone up to 22px. Product panels 20px. Fields 10px. Dots/rings circular. The former 3–4px rectangle mandate is superseded.

## Components

### Executable architecture and ownership

DESIGN.md governs decisions. **design-system/tokens.json is the sole editable runtime token source.** The JSON implements this authority; it is not a second brief. Update both together when an owner decision changes a normative value.

| Location | Owns |
| --- | --- |
| design-system/tokens.json | Colour, space scale, type roles, leading, tracking, weights, radius, sizes, borders, shadows, opacity, motion, breakpoints, stacking, grid proportions and semantic aliases. |
| scripts/design-system.mjs | Validates token references/cycles and CSS consumers; expands named breakpoints and emits deterministic CSS. No added styling dependency. |
| scripts/reference-audit.mjs | Unpacks all reference boards and checks extracted typography, colours, spacing, sizes, grid, border and shadow decisions against the same tokens; reports missing mappings. |
| styles/base.css | Reset, global text, links, selection and focus. |
| styles/layout.css | Shared shell, header/footer, opening/closing layout and gutters. |
| styles/components.css | Buttons, fields, form/chat controls, image viewer and showcase controls. |
| styles/pages.css | Route compositions and the contextual pale surface. |
| styles/responsive.css | Responsive layout adaptations using named breakpoints. |
| styles/motion.css | Motion primitives and final reduced-motion policy. |
| styles/system.css | Generated artifact, never edited manually. Ordered CSS layers: tokens → base → layout → components → pages → responsive → motion. |
| app/globals.css | Single global entry importing the generated stylesheet. Imported once by root layout. |
| design-system/resolve.ts | Typed alias resolution for non-CSS consumers. Pixel sizing follows semantic aliases rather than hardcoded primitive keys. |
| design-system/media.ts | Image sizing hints derived from the same shell, breakpoints and grid tokens. Intrinsic asset dimensions remain with assets. |
| app/layout.tsx | Next font loading and browser metadata; browser colours read tokens.json, not copied hex values. |
| components / app / lib | Shared UI and behaviour / route composition / domain and server logic. Do not move backend validation or provider clients into design code. |

The reference audit now maps 195 extracted visual/dimensional decisions across all fourteen boards to this same source. The inventory includes founder/service/principle/product type roles, all reference leading/tracking variants, paragraph measures, section/header/footer/hero rhythm, column minima, phone-overlay placement, component padding, border opacity variants, shadows, masks and gradients. Wind, spring, tilt, magnet, marquee, pulse and variable-letter tuning have named groups for future consumers. They are reserved implementation values, not claims that those effects have shipped.

Use semantic layout roles such as --layout-section-gap, --layout-hero-top and --layout-column-gap for repeated composition; use the primitive space scale within a component. The audit intentionally excludes board-viewer dimensions/runtime, intrinsic asset sizes, structural zero/auto/percentages, algorithm constants and one-off artwork coordinates. Those do not become hundreds of arbitrary tokens. Its mapping coverage proves value availability, not full property-by-property use or visual fidelity in the current app.

Run pnpm tokens:audit to inspect reference coverage independently. pnpm tokens:check runs both generation validation and reference coverage; generation alone never hides a missing reference mapping. Font variables are registered on html so root-level font aliases resolve before descendant styles.

Token groups have specific jobs: primitives describe reusable values, semantic aliases describe intent, component rules consume them. Use var(--space-6), var(--type-body), var(--radius-field), var(--size-control) and var(--motion-feedback) instead of local replacements. Use the .surface-light scope for pale content: it rebinds --bg/--ink/--muted/--accent/--line locally. It does not mutate global theme state.

Use existing PageShell, Eyebrow, TextLink, ButtonLink and ClosingLine across routes. ButtonLink supports primary/ghost variants. Reuse real repeated patterns; do not create a universal component with dozens of layout flags. Grid proportions remain named layout tokens, not arbitrary widths on every route. Dynamic content/state, intrinsic image ratios and accessibility hiding geometry are not design-scale tokens.

Breakpoints are phone=640 and stack=960 in JSON. Author @media (--phone) and @media (--stack); the generator expands them to standard CSS media queries. CSS custom properties cannot directly define media-query conditions. Do not hand-copy breakpoint numbers into styles or image sizes.

Workflow: edit tokens or its owning style file → pnpm tokens:generate → pnpm tokens:check → pnpm typecheck / pnpm build. Dev generates on startup. Typecheck/build reject stale generated CSS, unknown token references, reference cycles, raw colours, typography/radius literals in author styles, raw width breakpoints and undefined CSS variables. Runtime font variables and a per-instance reveal-delay variable are explicit external inputs. Generated output stays committed so ordinary builds are reproducible.

Shared colours, fonts, type/space roles, controls, shell, metadata and existing motion now consume this foundation. No-JS content remains server rendered. This architecture pass does not claim the attachment's wind, layered media, pulse artwork or every page composition has been implemented. Those follow the reference contract below; do not mistake the transitional layouts for a new direction.

### Shared implementation

One token/component/style system. Refactor app/globals.css into owning sections and remove obsolete cascade layers instead of appending another pass. Existing component names can be reused/replaced by responsibility; old styling is not binding.

- Adapt site-header/navigation: consistent Products link, aria-current, skip link; remove theme-toggle from default reference shell.
- Adapt page-parts: pills/ghost/text links, labels/display roles and large closings.
- Adapt TikvahCanvas/project-image/tikvah-case-study: layered imagery replaces homepage tab-switch as primary visual; preserve useful native enlargement, Escape and focus return.
- Restyle ContactPanel/EnquiryForm/BriefAssistant without replacing real backend behaviour with export forms.
- Replace old HeroEntrance/Reveal assumptions with the motion contract. Content is visible before enhancement.

### Motion contract

Motion is integral but scoped. Owner decision, 9 November 2026: motion is limited to (1) the hero: wind, spotlight and the animated headline; (2) image reveals and the Tikvah tilt stage; (3) hover and press feedback: magnet buttons, the service-row highlight, link and button states; plus two content graphics, the Solutions system map and the Vib3Pulse panel artwork. Removed and not to be re-added without a new owner decision: marquees, text and section rise-in reveals, scroll parallax, the scroll-progress line, the idle phone float and the per-letter closing headline. The accent words in headlines stay. Eyebrow labels stay except where they only restate the heading beneath them; removed: Home hero and “What we do”, Work “Our work”, Contact “Start a conversation”, Solutions “Systems & integrations” and “Working together”.

| Effect | Extracted reference | Production equivalent/fallback |
| --- | --- | --- |
| Wind | Canvas 2D coherent-noise mint trails; area-scaled 450–2600 particles, DPR capped at 2; pointer swirl radius ~210px, idle drift. Page heroes. | Capability-scaled density, suspend offscreen/hidden. Touch autonomous/static, no scroll interception. Reduced motion static texture; canvas failure leaves dark hero. |
| Spotlight | 700px mint wash with damped pointer tracking. | Fine pointer only, behind content, fade on leave; off for touch/reduced motion. |
| Headline | Masked rise from 118% Y/8deg; spring 105 stiffness/12.5 damping; .2s start, .12s line stagger. | One entrance per mount; offer/CTA usable immediately. Reduced motion/no JS final text. |
| Reveal | Removed for text and sections on 9 November 2026 (owner decision); content is visible immediately. Image reveal below is the only scroll reveal. | Fail open on observer/init failure. |
| Image reveal | Bottom-to-top clip, scale 1.28 to 1; spring 38/13. | Reserve image geometry; reduced motion unclipped final image. |
| Parallax/progress | Removed 9 November 2026 (owner decision): no parallax, no scroll-progress line. | Native scroll. |
| Tilt | perspective(1500px), rotateX up to 5deg/rotateY 7deg; depth layers 10/46; the idle phone float was removed 9 November 2026. | Fine-pointer enhancement; stable legibility/clicks. Touch/reduced motion composed static layers. |
| Magnet | Spring 220/15, radius 120px, displacement multiplier .38. | Restrained movement, stable hit area; never evade input. Off for touch/keyboard/reduced motion. |
| Marquee | Removed 9 November 2026 (owner decision). The static services summary takes its place at every width. | None needed. |
| Service highlight | Gliding bar spring 240/26; row shift 16px, arrow enters. | Focus matches hover, clear when leaving list; reduced motion instant highlight without translation. |
| Product pulse | Lower-right rings every 1.15s lasting 4.2s, pointer rings, 44 equaliser bars. | Artwork, no audio permission/live-data claim. Pause offscreen/hidden; static rings/bars in reduced motion. |
| Closing lettering | Removed 9 November 2026 (owner decision): the closing headline is static text; the accent word “automate?” stays. | Plain heading, no per-letter markup. |

Spring numbers belong to the export physics model, not portable durations. Calibrate another engine against the reference rather than assuming equal settings match. Simple feedback can use 150–250ms; do not retain old 280/640/960ms as a competing motion system.

Centralize scheduling, clean listeners/observers/timers on route change, suspend hidden/offscreen work and settled springs, cap DPR, avoid per-particle DOM. React to preference changes live. Separate transform wrappers so reveal/parallax/tilt cannot overwrite each other. Do not port export polling/reinitialization scaffolding.

Required adaptations beyond export: pause sustained motion, static reduced-motion output, keyboard service feedback, stable button targets, fail-open semantic content. A visible “Pause motion” control, placed in the footer, governs ambient effects (it satisfies WCAG 2.2.2) and is not a theme chooser. Keep one h1, semantic HTML, visible focus, native scrolling and decorative layers out of hit testing/accessibility.

### Contact and UI states

Fields: width 100%, min-height 52px, padding 12px 16px, radius 10px, #101A21 fill, .28 pale border, #EAF0EC text, >=16px Instrument. Native controls, persistent labels/autocomplete, mint focus and vertical textarea resize.

Reference fields: name/email/need/challenge. Needs: uncertainty, AI-powered product, automation system/workflow, backend/integrations, website/application, maintenance/support. Reuse actual validated choices rather than forking the server taxonomy. Retain explicit consent/privacy even though the board omits them. Direct email and “A useful conversation” aside stacks below on phone.

System map (Solutions reference): between the hero and the pale capabilities band, a 620px (clamp 440–620) deep-surface stage holds a canvas of eight labelled nodes joined by links with travelling packets. Nodes drift about home positions and step away from the pointer; the nearest node within 44px lights itself, its neighbours and their links, and dims the rest. All physics constants live in tokens `network.*`; the canvas has a text description (`role="img"`), pauses with the motion toggle, and draws one static frame under reduced motion. On a stage narrower than `network.compact-width` the right-hand labels drop beneath their nodes, because beside them they collide with the hub’s label (the board has the same collision at phone width). Capability-row and “how we work” headings inherit the body line-height (1.55) as on the board, not the tighter heading leading.

Live brief card (from the Contact reference): a decorative, aria-hidden echo of the form beside it, with a 64px progress ring and From / Reply to / Need / Brief rows on the deep surface (#0D161C, 20px radius, 28px padding). Empty rows use #8A9C96 placeholders. A row counts as filled when name and brief are non-empty, the email looks like an address, and Need has been chosen or drafted (the default "not sure yet" does not count). The card reports nothing the form does not already hold, and resets with "Start another enquiry". The primary button keeps the honest label “Continue with enquiry” rather than the board’s “Send your enquiry”, because delivery can fall back to a prepared email.

Display type loads Bricolage Grotesque with its optical-size axis (opsz 12..96) to match the reference’s Google Fonts request; without it large headlines render too wide and wrap.

Verify idle/hover/focus/selected/disabled/pending, field/provider error, mailto fallback and success. Preserve entered data/drafts on recoverable errors, identify fields in text with aria-describedby, announce status. Chat shares dark surfaces/mint controls, with a clear return to form. Nothing moves while typing.

### Enquiries and assistant

Keep Resend delivery: RESEND_API_KEY enables sending; ENQUIRY_FROM_EMAIL optionally overrides `AeolusLabs Enquiries <enquiries@aeoluslabsltd.com>` and must use a verified domain. Recipient info@aeoluslabsltd.com; visitor is reply-to. No enquiry database. Missing/rejected delivery returns an honest prepared-mailto fallback: nothing sent or saved by the site. Provider acceptance does not prove inbox arrival.

Keep honeypot, same-origin/payload validation and best-effort per-visitor/per-instance limits: 5 enquiries and 40 chat requests per 15 minutes. In-memory limits are not shared across serverless instances; durable hosting protection remains a launch check.

ANTHROPIC_API_KEY or OPENROUTER_API_KEY must exist before the prerendered Contact build and at runtime for /api/brief (Anthropic wins if both are set; BRIEF_ASSISTANT_PROVIDER overrides; OPENROUTER_MODEL sets the OpenRouter slug, default anthropic/claude-sonnet-4.5, tool calling required). Without a key retain the form. BRIEF_ASSISTANT_MODEL overrides the source default (currently claude-opus-5-5); confirm account availability. Never expose credentials through NEXT_PUBLIC_. Mock provider configuration is local verification only.

Assistant output is a reviewable/editable draft, never automatic enquiry submission. Preserve focus handoff and explicit visitor send. Messages are processed directly by Anthropic or through OpenRouter and the selected model provider, depending on deployment configuration; the privacy notice must cover both paths. The site does not persist conversations. No sensitive-data requests, invented facts, pricing or delivery promises.

### Setup and hosting

The site is a regular website, not an installable PWA (owner decision, 8 November 2026). Do not add a web app manifest, standalone-mode metadata, install prompts or a service worker. Retain ordinary browser favicons and touch icons.

Node.js 24, pnpm 11.25.0. Commands: pnpm install --frozen-lockfile, pnpm dev, pnpm typecheck, pnpm build. Stack: Next.js 16.4.5, React 19, TypeScript, plain CSS, existing Anthropic SDK. No active Tailwind/shadcn system. Read relevant installed node_modules/next/dist/docs/ before runtime changes; retain generated AGENTS.md rules. Choose the lightest implementation that faithfully reproduces the reference, not a framework for its own sake.

Vercel hosts the site. Configure intended Production/Preview variables, rebuild after build-time changes, keep secrets out of source/output/commits/docs. This documentation request does not publish a remodel.

Last hosting observation (4 November): a860a74 deployed successfully, bare domain redirected 308 to www, eight pages returned 200, Contact had assistantEnabled:false, /api/brief returned 503, CLI logged out. These do not establish today's settings/deployment. Live Anthropic and real inbox delivery remain unverified. Backup branch backup/main-before-minimal-2026-11-04 preserves prior main; restore through normal new commits, never force-push.

## Do's and Don'ts

### Remodelling sequence and acceptance

This revision specifies the remodel, not its implementation. Existing code is expected to diverge until changed. No effect is production-verified merely because documented.

1. Establish palette, two-font loading, type roles, shell and pills. Replace old theme startup/metadata colours and stale selectors together; no old-theme flash.
2. Implement motion with pause/preferences/lifecycle handling and complete Home: wind, layered real work, pale expertise, lime product, closing type. Compare with attachment at 1440 and 390.
3. Remodel Work, Tikvah, Solutions, Products, About and Contact with shared vocabulary and specified compositions. Extend uncovered routes consistently.
4. Verify enquiry/chat, consent, image enlargement, focus/navigation and errors without removing working functionality to match an incomplete mockup.
5. Typecheck/build, then batch visual/function review at 390/768/1440. Check actual loaded fonts, line breaks, gutters, vertical rhythm, tokens, media depth, motion, links, overflow, keyboard, pause/reduced motion, no-JS usefulness and provider failure states. Fix observed defects and confirm once. Release only with authorization and verify live output.

Acceptance requires reference fidelity and functional correctness across routes. A fallback-font screenshot, static recolour or Home-only implementation with old inner pages does not pass.

Measure performance: appropriate WebP, reserved geometry, deferred below-fold media/effects, no duplicated export runtime/assets. The 8.4MB attachment is an export artifact, not a production budget. Earlier <=20KB compressed motion and <=1.5MB route-transfer goals remain provisional review targets, not measured passes or permission to silently remove the chosen experience. Record actual costs and agreed tradeoffs. No invented frame-rate/accessibility/provider success.

- Match full-site dark/mint direction, expressive type, responsive composition and named effects.
- Keep real evidence, owner-confirmed content, editable drafts and honest enquiry outcomes.
- Maintain one token/component/style system and this single authority.
- Do not revive light/Inter/rectangle styling, mix old navy/blue/lime experiments or rotate accents by route.
- Do not treat board heights, editor options, export forms or .dc.html links as production behaviour.
- Do not fabricate private screenshots, permissions, testimonials, outcomes, pricing or guarantees.
- Do not let motion hide essentials, steal focus, obstruct scroll or evade input; provide pause/static equivalents.
- Do not create another governing document/archive. Historical records remain subordinate evidence.

Documentation checks for this revision: extracted values, seven page pairs, retained operational safeguards and superseded old mandates. Build/browser/provider verification belongs to subsequent implementation.
