# Live hosting check — 2026-11-04

Continued from clean main at a860a749e0603b55b5523ba1f3bcc54afa9234e9; origin/main matches. Remote backup/main-before-minimal-2026-11-04 remains at 5592fa6509f540d607a3e6fa4e7abafe87c1582c.

## Verified

- GitHub production deployment 7546976942 is for a860a74. Vercel reported success at 2026-11-04T13:16:06Z. Deployment URL: https://labsmain-6a8qs4ble-aeoluslabs-5139.vercel.app
- Public site is served by Vercel. Bare domain returns 308 to https://www.aeoluslabsltd.com/.
- Home, contact, about, solutions, work, privacy, /work/tikvah and /work/vib3pulse return HTTP 200.
- Contact HTML contains assistantEnabled:false; chat is absent from the prerendered output.
- Same-origin POST /api/brief with empty JSON returns 503 and the assistant-unavailable message. Source checks ANTHROPIC_API_KEY before payload validation, consistent with an absent/empty runtime key.
- Same-origin POST /api/enquiries with empty JSON returns 400 with the expected validation message. No enquiry or email was sent.

## Access and limits

Vercel CLI 64.7.0 reports Logged out. No hosting environment variables, project settings, logs or model access were inspected. No deployment or environment settings changed. A production deployment success does not prove live provider operation or mailbox delivery.

T3 preview navigation opened the live site, but snapshot failed twice with: Preview automation snapshot timed out after 15000ms. Verification above used direct HTTP requests, not interactive browser checks.

## Next action

Authenticate the Vercel CLI or use the authenticated Vercel dashboard for project labsmain under aeoluslabs-5139. Configure ANTHROPIC_API_KEY for Production before a fresh build; confirm BRIEF_ASSISTANT_MODEL is available to the account (source default: claude-opus-5-5). Redeploy main, then verify chat reply and draft handoff with a real provider. Inspect Resend configuration separately; real email delivery remains unverified. Never put credentials in chat or session records.

The existing project.json contains older proposed tasks and a stale last_session predating the integration; this session does not promote those tasks to verified status.
