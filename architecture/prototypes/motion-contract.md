# Motion contract — proposed for owner review (T-014)

Status: proposal. Nothing here is accepted or implemented on the site yet. Review it in `homepage-study.html` first.

## Purpose

Movement should show cause and effect: something makes space, something settles into place, a selection lines up with what it controls. It should never be decoration that competes with reading.

## Tokens

| Token | Value | Use |
|---|---|---|
| `--dur-fast` | 280ms | hover, colour and selection state |
| `--dur-base` | 640ms | content making space, view switching, text swaps |
| `--dur-settle` | 960ms | the single homepage entrance |
| `--ease-out` | `cubic-bezier(.2, .7, .2, 1)` | state changes |
| `--ease-settle` | `cubic-bezier(.16, 1, .3, 1)` | arrivals and sliding thumbs |

Only `transform` and `opacity` animate. Nothing animates layout properties except the width change of the phone preview in the study, which is preview chrome only and not for the site.

## Adjustments applied on the real homepage (4 November 2026)

After a motion review: the switch thumb is 320ms and the image crossfade 400ms (the 640ms base is for larger moves only); the entrance animates the headline only, once per page load, and never delays the offer or the contact button; service rows move with transform on hover-capable devices and on keyboard focus; buttons scale to 0.97 when pressed; phone switch buttons are 44px tall; reduced motion keeps a 150ms fade for the view switch.

## Rules

1. **Finite.** Every animation runs once and stops. No loops, no autoplay carousels, no forced intro that delays the offer.
2. **Cause and effect.** A control's indicator moves to the chosen state (the view thumb, the indented service row). Content does not move unless a visitor asked for it.
3. **Continuity.** When a project view changes, the old and new frames crossfade in the same place. The visitor keeps their position on the page.
4. **Readable first.** Headline, offer and contact action are present in the HTML and visible without waiting for animation. Motion only adds emphasis.
5. **Interruptible.** Clicking or keying during a transition goes straight to the new state. No queued sequences.
6. **Light touch on the homepage.** One entrance on the headline and offer, then stop. Other sections use hover and selection only.

## Reduced motion and no-JS

- `prefers-reduced-motion: reduce` sets `--dur-fast`, `--dur-base`, `--dur-settle` to `0ms`. Content is shown in its final state; view switches and selections still change content instantly.
- A visitor-facing "Motion off" control is part of the study only. If it ships, it must be a persisted preference set by the visitor, not a default that hides motion for everyone.
- Without JavaScript: the entrance is CSS-only and still plays once, but the headline and offer have no hidden state that depends on JS. The Tikvah desktop capture stays the default view, and the three reading steps are static text. The service outcome panel shows only the first sentence until JS runs; T-015 must make all three outcomes readable without JS (for example as a plain list).

## Responsive equivalents

- Desktop (≥ 700px): two-column opening; project image beside its caption; service list beside its outcome.
- Phone (< 700px): single column; the view switch sits above the image; the outcome text sits below the service list. The same steps and the same copy, reordered rather than hidden.
- Touch targets are at least 44px tall on phones. The study's current buttons are smaller and must be enlarged before implementation.

## Keyboard

- Tabs (view switch and services) use arrow keys to move and select, with focus following the selection.
- Focus rings use the existing `--accent` outline, which passes contrast in both themes.

## Open items for review

- Confirm the 280 / 640 / 960 durations feel right on a real phone (slowed from 180 / 420 / 620 on owner request, 4 November 2026).
- Confirm that the entrance is wanted at all. The plan allows a static opening if the owner prefers.
- Enlarge phone touch targets and check the focus order once implemented.
- The study's service outcome sentences are placeholders and need owner-approved copy.
