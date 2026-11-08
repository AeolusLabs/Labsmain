# Live assistant and enquiry check — 8 November 2026

LIVE-CHECK-20261108 | Check live AI availability and verify enquiry | owner: Codex | boundary: https://www.aeoluslabsltd.com/contact and its public API | dependencies: owner explicitly requested live check/enquiry verification | status: assistant availability VERIFIED (unavailable); enquiry submission VERIFIED; inbox receipt UNVERIFIED awaiting owner confirmation.

Observed live:
- Contact page returns normally with ordinary form, no assistant/mode-switch button.
- One same-origin POST /api/brief with a simple availability-check message returned 503 and “The assistant is unavailable right now. You can use the form instead.” No assistant response was generated.
- POST /api/enquiries without consent returned 400 with the expected validation message.
- Submitted exactly one clearly labelled test through the real form, with known business email info@aeoluslabsltd.com as reply-to, consent checked and no customer data. API returned HTTP 200, mode sent. Browser displayed “Your enquiry has been sent.” No mailto fallback.
- Test subject: “New project enquiry from Website delivery test - 8 November 2026”. Body marker: AEOLUS-CHECK-20261108-01. No reply requested. Recipient is the configured business inbox.

The sent result establishes application/provider acceptance, not inbox delivery. Connected Gmail profile is a different mailbox; a narrow in:anywhere search for the unique marker found no forwarded copy. Asked owner to check business inbox and spam; receipt remains unconfirmed at handoff.

Diagnosis boundary: local source hides assistant when no configured provider exists; its route returns the same unavailable message for missing configuration and some provider failures. Missing build/runtime key is consistent with live behaviour but not independently proven. Vercel CLI is authenticated under an accessible account/team; inspecting www.aeoluslabsltd.com could not find its deployment in that context. The similarly named aeoluslabs project has no Production variables, but it was NOT established as the production domain's project and cannot support a definitive diagnosis. No keys read, env values printed, hosting changes, deployment or messages beyond the owner-authorized test enquiry.

Next action: owner confirms inbox receipt. To activate the assistant, identify the correct live hosting project, verify provider-key presence at build/runtime and model configuration, then perform an authorized rebuild/deployment and live conversation test. Current local portfolio/PWA changes were not published by this check.
