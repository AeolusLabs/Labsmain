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
