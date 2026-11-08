# Portfolio purpose review and contact fixes — 8 November 2026

FIX-20261108 | Resolve prior contact retention/privacy findings | owner: Codex | boundary: components/contact-panel.tsx, app/privacy/page.tsx, DESIGN.md | dependency: owner's fix request | status: VERIFIED locally.

EnquiryForm now stays mounted in a hidden wrapper while the assistant is selected. This preserves uncontrolled field values, consent and edited draft text across mode switches. Receiving a new assistant draft still intentionally creates a new form instance, as before. Privacy text now covers direct Anthropic processing and OpenRouter plus the selected model provider. DESIGN.md mirrors this disclosure and the owner's clarification that the website is a company portfolio and enquiry channel.

Browser verification on local development server: populated name, email, organisation, challenge and consent, toggled assistant/form, asserted all values retained. Intercepted /api/brief with a local mock, received draft, edited it, toggled modes and asserted edit retained. Privacy rendered OpenRouter and downstream-provider wording. No real AI call or enquiry submission. pnpm typecheck passed; production build compiled and generated all pages; final command exit recorded in chat. Static detector on app returned zero findings. git diff --check passed.

PORTFOLIO-20261108 | Assess portfolio purpose | owner: Codex with independent source review and static/media assessment | boundary: Home, Work, Tikvah case, Products, About, Solutions and Contact | status: review delivered; recommendations remain BACKLOG.

Observed strengths: Work appears first in navigation; Home has See our work; real inspectable Tikvah images and live link; clear client/owned distinction; direct email and repeated contact routes. Browser inspected headings and destination links on Home, Work, Tikvah, Products, About and Contact at 390/1440; no horizontal document overflow. Inspected full-page desktop Home and phone Work screenshots under reduced motion. This is a heuristic review, not a visitor study or full motion/reference audit.

Priorities:
1. Evidence gap: Home offers AI/automation, but current published work does not document that kind of delivery. Add genuine, clearly labelled owned demo or permissioned case. Never relabel Tikvah as AI work.
2. Deepen Tikvah: original problem, actual delivery decisions/constraints, distinct approved screens and qualitative confirmed result. Current desktop/mobile evidence repeats the public homepage.
3. Show Vib3Pulse's actual interface; retain artwork as cover. Current project descriptions list capabilities without demonstrating flows. Requires verified captures.
4. Shorten discovery: Work's Vib3Pulse panel goes to /products, then /work/vib3pulse; direct case-study access would improve portfolio exploration.
5. Explain engagement stages and founder contributions with owner-confirmed facts. Current principles and names provide limited decision-making detail.

Recommendation: strengthen the two existing projects before adding more pages or decorative effects. Proof and case-study storytelling are the primary constraint. Content/portfolio recommendations were reviewed, not implemented. No invented testimonials, outcomes, biographies or private screenshots. Prior source-review findings superseded by the fixes above; PWA removal remains in place. Preserve existing prototype moves/deletions. No deployment.

Next ready action: direct Vib3Pulse case-study navigation; subsequent evidence work needs approved project material and factual context.
