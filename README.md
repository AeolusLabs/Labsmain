# AeolusLabs website

Local Next.js company website. No deployment has been performed.

## Run

Use Node.js 24 and pnpm 11.25.0.

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. Run `pnpm typecheck` and `pnpm build` for validation.

## Enquiries

Without email credentials, validated submissions return a prepared mailto link. The interface explicitly states that nothing was sent or saved. A working email application is needed to send that draft.

For direct delivery, copy `.env.example` to `.env.local`, provide `RESEND_API_KEY` and a verified `ENQUIRY_FROM_EMAIL`, and restart the server. Recipient is info@aeoluslabsltd.com. Email-only handling; no enquiry database. Provider acceptance does not guarantee inbox delivery. Before public deployment, configure durable abuse protection/rate limiting and verify delivery with the business mailbox.

## Content

Shared service/product data is in lib/content.ts. Founder names intentionally use Founder 1 and Founder 2. WhatsApp/socials are omitted.

Tikvah has approved publication and is featured as a complete client application, including frontend and backend. Other client publication approvals are pending; their names, internal discovery notes and screenshots are excluded. Add individual case studies only after approval and confirmation of contribution and outcomes.

Vib3Pulse is company-owned. Account-only capabilities are described as product-presented features, not independently tested functionality. The product panel is a typographic treatment, not an application screenshot.

The angular logo SVG recreates the selected top-left reference; it is not an extracted original vector. Replace it with final brand artwork if supplied.

Before launch: confirm remaining client permissions, configure email and abuse protection, review privacy operations, add final social preview artwork, and run production/device checks. No Products/Insights placeholders or fabricated testimonials.
