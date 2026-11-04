# AeolusLabs website

Local Next.js company website. No deployment has been performed.

This branch (`codex/minimal-redesign`) holds the minimal "grown-up" redesign for comparison with the navy direction on `codex/possibilities-studio`. See DESIGN.md.

## Run

Use Node.js 24 and pnpm 11.25.0.

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. Run `pnpm typecheck` and `pnpm build` for validation.

## Enquiries

Direct delivery uses Resend. Set `RESEND_API_KEY` in Vercel (Production, and Preview if wanted) or in `.env.local` for local testing, then redeploy or restart. `ENQUIRY_FROM_EMAIL` is optional and must be an address on a domain verified in Resend; it defaults to `AeolusLabs Enquiries <enquiries@aeoluslabsltd.com>`. Recipient is info@aeoluslabsltd.com, and the visitor's address is set as the reply-to. Email-only handling; no enquiry database. Provider acceptance does not guarantee inbox delivery.

If the key is missing, or Resend rejects the send, validated submissions return a prepared mailto link instead, so an enquiry is never lost. The interface says plainly that nothing was sent or saved, and failures are written to the Vercel function logs (without enquiry content or secrets).

Abuse protection: honeypot field, same-origin check, size limits, and a best-effort limit of 5 enquiries per 15 minutes per visitor per server instance. Serverless instances do not share memory, so for a durable limit add a Vercel Firewall rate-limit rule for `POST /api/enquiries`. Before launch, send a real test enquiry and confirm it arrives in the business mailbox.

## Content

Site constants (canonical address, email and external links) are in lib/content.ts. Founders are Allan Ajayi-Adjari and Bernard Nneboh (confirmed by the owner). WhatsApp/socials are omitted.

Tikvah has approved publication and is featured as a complete client application, including frontend and backend. Other client publication approvals are pending; their names, internal discovery notes and screenshots are excluded. Add individual case studies only after approval and confirmation of contribution and outcomes.

Vib3Pulse is company-owned. Account-only capabilities are described as product-presented features, not independently tested functionality. The product panel is a typographic treatment, not an application screenshot.

The angular logo SVG recreates the selected top-left reference; it is not an extracted original vector. Replace it with final brand artwork if supplied.

Before launch: confirm remaining client permissions, configure email and abuse protection, review privacy operations, add final social preview artwork, and run production/device checks. No Products/Insights placeholders or fabricated testimonials.
