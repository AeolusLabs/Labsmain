# AeolusLabs visual system — minimal direction (proposal)

**Status:** implemented on branch `codex/minimal-redesign` for the owner to compare with the navy "Start with what if" direction on `codex/possibilities-studio`. Not yet chosen. If the navy direction is chosen, discard this branch's design files and keep the shared fixes (see "Shared with the other branch").

## Principles

Quiet confidence through clarity and real work. One neutral system, one typeface, thin dividers, small rectangular controls, generous spacing. Every element has a purpose; there is no decorative artwork. Evidence comes from real projects only. Never invent metrics, endorsements, outcomes, portraits or testimonials.

## Colour

| Role | Light | Dark |
| --- | --- | --- |
| Background | #F8F8F6 | #141A20 |
| Text | #202220 | #F0F0EB |
| Secondary text | #5F635F | #A6AFB5 |
| Dividers | #DEDFDA | #343E45 |
| Raised surface (form fields) | #FFFFFF | #1D262D |
| Accent (links in running text) | #315859 | #ABD1CF |
| Vib3Pulse artwork | #B9F761 with #18320C text, in both themes | |

Light is the default. Dark follows the visitor's system setting until they use the "Dark appearance" button, then their choice is remembered. The saved or system choice is applied before first paint, so there is no flash. Vib3Pulse lime appears only inside that product's artwork.

## Typography and layout

Inter only, loaded through the existing Next font setup (variable weight, 450 for headings). Large light headlines with tight tracking, small uppercase labels, body text at 15px. Pages are built from a 1160px column; each page opens with a headline on the left and one supporting paragraph on the right, then sections separated by thin rules. Buttons are small dark rectangles with a ↗ glyph; secondary actions are underlined text links.

## Page compositions

Each page follows its visitor's task rather than a shared template:

- **Home:** split offer and action, then Tikvah as the featured proof, three expertise links, a short approach note and a closing invitation.
- **Work:** one full-width row per project with its role and scope beside it.
- **Case studies:** facts strip, large inspectable capture, challenge, experience, delivery and result. Image viewer opens in a native dialog and closes with Escape.
- **Solutions:** short orientation column beside four grouped capabilities.
- **About:** founders first, then why the company started and how it works.
- **Contact:** the real enquiry form beside the direct email and what happens next.

## Interaction and accessibility

Motion is limited to a short underline and arrow nudge on links, and a slight scale on project images on hover, all removed under reduced motion. Skip link, visible focus rings, one `h1` per page, native controls, form fields at 16px so phones do not zoom, labels on every field, `aria-pressed` on the appearance button and `aria-current` on navigation. Navigation stays visible on phones (no hidden menu). Text and background pairs were chosen for readable contrast in both themes.

## Content and evidence

- Founders: Allan Ajayi-Adjari and Bernard Nneboh, both software developers. No portraits or biographies yet.
- Tikvah is featured with permission, using real public-site captures from 25 October 2026. No other client is named.
- Vib3Pulse is an owned product. Its page shows brand artwork, says interface imagery is pending, and says feature availability is shown in the product.
- Public email: info@aeoluslabsltd.com. Canonical address: https://www.aeoluslabsltd.com.

## Implementation

Single stylesheet `app/globals.css` (no CSS framework). Shared parts live in `components/site-header.tsx` (header, footer, page shell), `components/page-parts.tsx` (labels, links, buttons, closing line), `components/navigation.tsx` and `components/theme-toggle.tsx`. Pages are plain server components in `app/`. Enquiry delivery is unchanged (`app/api/enquiries/route.ts`).

## Shared with the other branch

The Next.js 16.4.5 security upgrade (first commit on this branch), the `www` canonical address, and the checklist in `architecture/`.
