# Playable Cube Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a visitor twist the Rubik's cube's layers by dragging stickers and orbit it by dragging empty space, perfected on a standalone page first, then ported to the `/new` home story.

**Architecture:** A dependency-free math module (`cube-play.ts`: ray picking, drag-to-twist choice, snapping) is unit-tested with Node's built-in runner. A DOM controller (`cube-play-input.ts`) owns a transparent "pad" over the cube that captures pointer drags (so only the cube area traps touch; the rest of the page scrolls). The existing shader turn (`uMove`) and `CubeAnimator.commit` do the visuals and keep particle data a real cube. A build script transpiles the real engine modules for `public/cube-play.html`, so the prototype and the site share one source.

**Tech Stack:** TypeScript 5.7 (erasable syntax only in the new modules), WebGL2, Next.js 16 app under `app/new`, `node --test` (Node 24 strips types natively). No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-17-playable-cube-design.md`

## Global Constraints

- Drag a sticker = twist that layer; drag empty space = orbit the whole cube. Mouse and touch. Release snaps to a quarter turn. (spec: Goals)
- No move counter, timer, scoring, solver, scramble/solve button or hint. (spec: Non-goals, owner chose plain A)
- The live (current) site and the other four scenes stay unchanged. (spec: Non-goals; `DESIGN.md`)
- Touch must never trap page scroll outside the cube's area. (spec: Anti-goals)
- When the visitor touches the cube, the automatic scramble/solve stops; it restarts only when the cube next arrives (existing `resetCube` on arrival). (spec: Constraints)
- Reduced-motion support, the footer Pause control, a still fallback and the lighter phone layout all keep working. (`DESIGN.md`)
- New modules `cube-play.ts` and `cube-play-input.ts` import nothing from other engine files, so Node can test them without a build. Constants such as pitch are passed in.
- No new dependencies. Commits end with `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
- Conventions: rotation sign `dir`/`sign` means a right-handed rotation about +axis by `sign * angle`, matching `rot90` in `cube.ts` and `rotAxis` in `shaders.ts`.

## Review Focus

1. Pointer cancelled mid-twist (pointercancel, lost capture, tab hidden): the layer must snap to a quarter turn and commit, never stay half-turned.
2. A second finger during a drag: ignored, the first drag continues.
3. Cube scrolls out of view (or palette/motion toggles, context loss) while a drag is live: pad hidden, turn committed, listeners removed.
4. A tap or tiny drag: no turn, nothing committed, data unchanged.
5. Pointer lands on the cube at a grazing angle or on a gap between stickers: falls back to orbit instead of twisting the wrong layer.

---

## File Structure

- Create `components/new/engine/cube-play.ts`: pure math, no imports.
- Create `components/new/engine/cube-play.test.ts`: `node --test` tests for it.
- Create `components/new/engine/cube-play-input.ts`: pad overlay and pointer state machine, no imports from other engine files.
- Modify `components/new/engine/cube.ts`: manual-play API on `CubeAnimator`.
- Create `scripts/build-cube-play.mjs`: transpile engine modules to `public/cube-play/*.js` (gitignored output).
- Create `public/cube-play.html`: standalone test page (`noindex`, like the other prototypes).
- Modify `components/new/engine/stage.ts`: wire the controller into the real stage.
- Modify `.gitignore`: ignore `public/cube-play/`.

---

### Task 1: Pure picking, twist and snap math

**Files:**
- Create: `components/new/engine/cube-play.ts`
- Test: `components/new/engine/cube-play.test.ts`

**Interfaces:**
- Produces (all exported from `cube-play.ts`):
  - `type V3 = [number, number, number]`
  - `interface Hit { axis: 0 | 1 | 2; sign: 1 | -1; point: V3; cell: V3 }` where `cell` holds integers -1..1 (the cubelet's grid position; `cell[axis] === sign`).
  - `projectPoint(p: V3, mv: ArrayLike<number>, aspect: number, fovY: number, w: number, h: number): [number, number]` returns pixels, origin top-left, y down. `mv` is column-major like `math.ts`; the projection is the one `persp(fovY, aspect, …)` builds.
  - `modelRay(px: number, py: number, mv: ArrayLike<number>, aspect: number, fovY: number, w: number, h: number): { o: V3; d: V3 } | null` (null if `mv` is singular). `d` is unit length, in model space.
  - `pickCube(ray: { o: V3; d: V3 }, pitch: number, half: number): Hit | null`: nearest hit among the 27 axis-aligned cubelet boxes (half-size `half`, centres at `pitch * cell`).
  - `interface Twist { ax: 0 | 1 | 2; layer: -1 | 0 | 1; sign: 1 | -1; pxPerRad: number }`
  - `chooseTwist(hit: Hit, drag: [number, number], project: (p: V3) => [number, number], pitch: number): Twist | null`
  - `snapQuarters(angle: number, velocity: number): number`: integer quarter turns, never `-0`.

- [ ] **Step 1: Write the failing tests** in `cube-play.test.ts` using `node:test` and `node:assert/strict`, importing from `./cube-play.ts`. Tests (names exact):
  - `projectPoint and modelRay agree`: with `mv = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,-4.4,1]`, aspect 1.5, fov 0.8, 900×600: for p = [0.3,-0.2,0.5], `modelRay(...projectPoint(p...))` passes within 1e-6 of p (distance from p to the ray's line).
  - `pickCube hits the front face centre`: ray from [0,0,5] direction [0,0,-1], pitch 0.56, half 0.25 → `{axis: 2, sign: 1, cell: [0,0,1]}` and `point[2]` ≈ 0.81.
  - `pickCube misses outside and in the gap`: ray [2,0,5]→[0,0,-1] is null; ray [0.28,0,5] (the gap between cubelets at x=0 and x=0.56) is null **only if** it also misses the cubelets behind it. Pick the exact x where all layers are gaps and assert null.
  - `pickCube returns the side face from the side`: ray from [5,0,0] direction [-1,0,0] → axis 0, sign 1, cell [1,0,0].
  - `chooseTwist drag right on the front face turns about y positively`: hit `{axis:2, sign:1, point:[0,0,0.81], cell:[0,0,1]}`, `project = p => [p[0] * 100, -p[1] * 100]`, drag `[40, 0]` → `ax 1, layer 0, sign 1`.
  - `chooseTwist drag up turns about x negatively`: same hit, drag `[0, -40]` → `ax 0, layer 0, sign -1`.
  - `chooseTwist uses the hit cubelet's layer`: hit cell `[1,0,1]` at point `[0.56, 0, 0.81]`, drag right → `ax 1, layer 0`; drag up → `ax 0, layer 0`; hit cell `[0,1,1]` drag right → `ax 1, layer 1`.
  - `chooseTwist returns null for a zero drag`.
  - `snapQuarters`: `(0.2, 0) → 0`, `(0.9, 0) → 1`, `(-1.6, 0) → -1`, `(0.5, 3) → 1`, `(0.2, -3) → 0`; assert `Object.is(snapQuarters(-0.1, 0), 0)`.

- [ ] **Step 2: Run to verify failure**

Run: `node --test components/new/engine/cube-play.test.ts`
Expected: FAIL (module has no such exports / cannot be found).

- [ ] **Step 3: Implement `cube-play.ts`.** Approach per function:
  - `projectPoint`: `view = mv * [p,1]`; `ndc.x = view.x / (aspect * tan(fovY/2) * -view.z)`, `ndc.y = view.y / (tan(fovY/2) * -view.z)`; pixels `((ndc.x+1)/2*w, (1-ndc.y)/2*h)`.
  - `modelRay`: invert `mv` with a local 4×4 inverse; ray origin is the camera origin `[0,0,0]` and direction `[ndcx*aspect*tan, ndcy*tan, -1]` in view space, both transformed to model space; normalise `d`. (`mv` includes scale, so model-space `d` must be renormalised and `o` taken from the inverse.)
  - `pickCube`: slab test against each of the 27 boxes; keep the smallest entry distance; the hit axis is the slab that set the entry; `cell` = the box's integer indices.
  - `chooseTwist`: candidate axes are the two axes other than `hit.axis`. For each, `r = e_ax × hit.point` (cross product); if `|r|` is tiny skip; `u = r/|r|`; `s = project(point + 0.05*u) - project(point)` (screen vector). Pick the candidate with the largest `|s·drag|/|s|`; `sign = sign(s·drag)`; `layer = hit.cell[ax]`; `pxPerRad = |s| / 0.05 * |r|`. Return null if `|drag|` is 0, or no candidate has `|s|` above a small epsilon (grazing).
  - `snapQuarters`: `Math.round((angle + velocity * 0.15) / (Math.PI / 2)) + 0` (the `+ 0` removes `-0`).

- [ ] **Step 4: Run to verify pass**

Run: `node --test components/new/engine/cube-play.test.ts`
Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add components/new/engine/cube-play.ts components/new/engine/cube-play.test.ts
git commit -m "Playable cube: picking, twist choice and snap math with tests"
```

---

### Task 2: Manual-play API on `CubeAnimator`

**Files:**
- Modify: `components/new/engine/cube.ts`

**Interfaces:**
- Consumes: existing `CubeAnimator` (`commit`, `stop`, `reset`, `mv`).
- Produces on `CubeAnimator`:
  - `takeOver(): void`: lands any auto turn (`stop`) and sets `manual = true`; `update(dt)` then does nothing.
  - `setManualTurn(ax: number, layer: number, angle: number): void`: sets `mv = [ax, layer * PITCH, angle]` (layer is -1..1; angle in radians).
  - `clearManualTurn(): void`: sets `mv = [0, 0, 0]`.
  - `commitQuarters(ax: number, layer: number, quarters: number): void`: applies `|quarters|` calls of the private `commit` with `dir = sign(quarters)` (no-op for 0), then `clearManualTurn()`.
  - `reset()` also clears `manual`. `isManual` getter returns `manual`.

- [ ] **Step 1: Add the members above**, keeping `commit` private and unchanged. `update(dt)` returns immediately when `manual`.

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add components/new/engine/cube.ts
git commit -m "Playable cube: manual turn API on CubeAnimator"
```

(Behaviour is exercised in Task 4's page, where Step 5 checks that four quarter turns of one layer restore the solved cube.)

---

### Task 3: Pad overlay and pointer state machine

**Files:**
- Create: `components/new/engine/cube-play-input.ts`

**Interfaces:**
- Consumes: nothing from other engine files; takes the math as callbacks.
- Produces:
  - `interface CubePlayHooks { pick(px: number, py: number): Hit | null; project(p: V3): [number, number]; onOrbit(dx: number, dy: number): void; onTwistStart(): void; onTwist(ax: 0|1|2, layer: -1|0|1, angle: number): void; onTwistEnd(ax: 0|1|2, layer: -1|0|1, angle: number, velocity: number): void }` (`Hit`, `V3` imported as types from `./cube-play`; `onTwistEnd`'s `angle` is the angle at release, the owner of the animation snaps it with `snapQuarters`).
  - `createCubePad(parent: HTMLElement, hooks: CubePlayHooks, pitch: number): { place(cx: number, cy: number, radius: number): void; hide(): void; isActive(): boolean; dispose(): void }`. `place` positions the pad as a disc (CSS px relative to the viewport; the pad is `position: fixed`).

- [ ] **Step 1: Implement the pad**: a `div` with `position: fixed`, `border-radius: 50%`, `touch-action: none`, `pointer-events: auto`, `z-index` above page content, `aria-hidden="true"`, `display: none` until `place` is called. Cursor is `grab` on hover and `grabbing` while a drag is live.

- [ ] **Step 2: State machine** on the pad's pointer events: `pointerdown` accepts only the first pointer (ignore others until it ends); calls `setPointerCapture`; calls `hooks.pick(px, py)` for the start point. A miss means mode `orbit` straight away. A hit means mode `pending` until the pointer moves more than 6 px; then `chooseTwist(hit, drag, hooks.project, pitch)` (imported from `./cube-play`): if it returns null, switch to `orbit`; otherwise mode `twist`, call `onTwistStart()` once, and from then on report `onTwist(twist.ax, twist.layer, angle)` with `angle = twist.sign * (drag·ŝ_unit) / twist.pxPerRad` where the drag is projected on the chosen direction (equivalently, `twist.sign` times the signed drag along that axis' screen direction divided by `pxPerRad`; keep the dragging pointer's total movement from the start point). `orbit` calls `onOrbit(dx, dy)` with per-event deltas in px. Track velocity (rad/s) from the last ~80 ms of `onTwist` angles.
- [ ] **Step 3: End paths.** `pointerup`, `pointercancel` and `lostpointercapture` all end the drag: in `twist` mode call `onTwistEnd(ax, layer, angle, velocity)` exactly once; in `pending` (a tap) call nothing. After ending, mode returns to idle. `hide()` and `dispose()` also end a live twist the same way, then remove or hide the element; `dispose` removes all listeners and the element.

- [ ] **Step 4: Typecheck**

Run: `pnpm typecheck`
Expected: exits 0.

- [ ] **Step 5: Commit**

```bash
git add components/new/engine/cube-play-input.ts
git commit -m "Playable cube: pad overlay and pointer state machine"
```

---

### Task 4: Standalone prototype page

**Files:**
- Create: `scripts/build-cube-play.mjs`
- Create: `public/cube-play.html`
- Modify: `.gitignore` (add `public/cube-play/`)

**Interfaces:**
- Consumes: `makeBlock`, `STRIDE`, `BL`, `PITCH`, `FORMS` (`shapes.ts`); `VERTEX_SHADER`, `FRAGMENT_SHADER` (`shaders.ts`); `persp`, `mul`, `trans`, `scaleM`, `rotX`, `rotY`, `FOV` (`math.ts`, `camera.ts`); `CubeAnimator` (Task 2); `createCubePad` (Task 3); `pickCube`, `modelRay`, `projectPoint`, `snapQuarters` (Task 1).
- Produces: a page at `/cube-play.html` and `node scripts/build-cube-play.mjs`, which writes `public/cube-play/<module>.js` for `math`, `shapes`, `shaders`, `camera`, `cube`, `cube-play`, `cube-play-input`.

- [ ] **Step 1: Build script.** Read each listed `.ts` from `components/new/engine/`, run `ts.transpileModule` (from the installed `typescript`, `module: ESNext`, `target: ES2020`), rewrite relative specifiers `from './x'` to `from './x.js'`, and write the result. `camera.ts` imports only a type from `./shapes`; it is erased by transpile. Run it once.

- [ ] **Step 2: Page.** `public/cube-play.html` with `<meta name="robots" content="noindex">`, a full-screen canvas, and one module script that: creates the WebGL2 program from `VERTEX_SHADER` / `FRAGMENT_SHADER`; builds one block with `makeBlock('cube', 12000, null)` and binds it as **both** the A and B shape (same buffer, same attribute layout as `bindPair` in `stage.ts`); sets the same uniforms `stage.ts` sets, with `uFormA = uFormB = 3`, `uMorph = 0`, Forest palette values from `DESIGN.md`; keeps its own `ry`, `rx` (user orbit, radians) plus a slow default sway that fades out after the first touch; each frame computes `MV = trans(0,0,-4.4) · scaleM(1) · rotX(rx) · rotY(ry)` and draws.
- [ ] **Step 3: Wire interaction.** `hooks.pick` = `pickCube(modelRay(px, py, MV, aspect, FOV, w, h), PITCH, 0.25)`; `project` = `projectPoint(..., MV, ...)`; `onOrbit` adds `dx * 0.008` to `ry`, `dy * 0.008` to `rx` (clamp `rx` to ±1.4); `onTwistStart` calls `cube.takeOver()`; `onTwist` calls `cube.setManualTurn`; `onTwistEnd` computes `q = snapQuarters(angle, velocity)`, animates the angle from its release value to `q * π/2` over 180 ms with ease-out via `setManualTurn`, then calls `cube.commitQuarters(ax, layer, q)` (and `clearManualTurn` is done inside). While a snap animation runs, new twists are ignored. Pad disc = projected cube centre, radius = projected 1.4 world units × 1.15. Add a tiny on-page readout in the corner (dev only): mode, ax, layer, angle.
- [ ] **Step 4: Typecheck and serve.** Run `pnpm typecheck` (exit 0), then start the dev server (preview_start) and open `/cube-play.html`; the console must have no errors and the cube must render as a solved Rubik's cube.
- [ ] **Step 5: Verify behaviour** in the browser:
  - Drag a front-face sticker right: that row follows the pointer, snaps on release; the cube stays a valid cube (colours stay on whole cubelets).
  - Four quarter turns of the same layer in the same direction returns the cube to its starting colours (compare a screenshot before and after).
  - Drag outside the cube but inside the pad: the whole cube orbits. Drag outside the pad: nothing happens.
  - A tap changes nothing.
- [ ] **Step 6: Commit**

```bash
git add scripts/build-cube-play.mjs public/cube-play.html .gitignore
git commit -m "Playable cube: standalone prototype page"
```

---

### Task 5: Tune the feel on the page (owner review)

**Files:**
- Modify: `components/new/engine/cube-play.ts`, `components/new/engine/cube-play-input.ts`, `public/cube-play.html` (constants only)
- Test: `components/new/engine/cube-play.test.ts` (extend if a constant a test pins changes)

- [ ] **Step 1:** In a desktop viewport, tune these and nothing else: orbit speed (`0.008`), drag threshold (`6` px), flick weight (`0.15` in `snapQuarters`), snap duration (`180` ms), pad radius factor (`1.15`), whether orbit needs slight inertia. Record final values in a comment next to each constant.
- [ ] **Step 2:** Emulate a 375×812 phone (`resize_window` preset `mobile`, then reload). Confirm: a finger drag on the pad twists/orbits and the page does not scroll; wrapping the pad in a tall scrolling page (add temporary `<div style="height:300vh">` content beside the pad) and dragging outside it scrolls normally. Remove the temporary content afterwards.
- [ ] **Step 3:** Run `node --test components/new/engine/cube-play.test.ts` (PASS) and `pnpm typecheck` (exit 0). Share screenshots/recording of the page and **stop for owner approval of the feel** before Task 6.
- [ ] **Step 4: Commit**

```bash
git add components/new/engine public/cube-play.html
git commit -m "Playable cube: tune feel on the prototype page"
```

---

### Task 6: Port into the real stage

**Files:**
- Modify: `components/new/engine/stage.ts`
- Modify: `components/new/engine/cube.ts` only if the port needs something not in Task 2

**Interfaces:**
- Consumes: Tasks 1–3 exports, the stage's existing `cube`, `ry`/`rx` smoothing, `needDraw`, `undo`, `cubeShown`, `resetCube`, `frameFor`, `ptr`.
- Produces: stage behaviour only (no new exports).

- [ ] **Step 1:** In `stage.ts`, create the pad once the stage has GL (`createCubePad(canvas.parentElement!, hooks, PITCH)`); push `pad.dispose` onto `undo`. Hooks use the same `MV`, `aspect`, `w`, `h` the frame loop computes (store the latest in closure variables each frame).
- [ ] **Step 2:** User orbit adds two offsets `userRy`, `userRx` that are added to the eased `ry`/`rx` targets while the cube is shown and **decay to 0** when the cube leaves (so other shapes keep their own spin). Include them in `sig` so `needDraw` triggers.
- [ ] **Step 3:** Each frame, when `cubeShown` and the stage is not in still mode: `pad.place(projected cube centre, radius)`; otherwise `pad.hide()` (this also commits a live twist). The twist hooks call `cube.takeOver()` / `setManualTurn`; the snap animation is advanced in `step` with `dt` **regardless of `motion`** (manual play works with Pause motion on and with reduced motion; the auto scramble/solve stays off, as now). `resetCube()` on arrival also resets manual state (`cube.reset()` already does).
- [ ] **Step 4 (verify):** `pnpm typecheck` and `pnpm build` (both succeed). Start the dev server, open `/new`, scroll to the Simplify panel: confirm the auto scramble still plays untouched; touching the cube stops it; layer twists and orbit match the prototype; scrolling away and back resets to a solved auto-playing cube; on a 375 px viewport the page scrolls everywhere except on the cube pad; Pause motion on still allows playing; other scenes look unchanged; no console errors.
- [ ] **Step 5: Commit**

```bash
git add components/new/engine
git commit -m "Playable cube: wire layer twist and orbit into the home story"
```

---

## Self-Review

- **Spec coverage:** sticker twist + snap (T1, T3, T4); orbit (T3, T4); mouse and touch, scroll not trapped (T3 pad, T4/T5 phone checks); standalone first, then port (T4–T6); auto-solve stops on touch and restarts on arrival (T2, T6); reduced motion / Pause / still / phone layout (T6); non-goals respected (nothing added for counters, buttons, hints); live site untouched (only `components/new` and `public`).
- **Types:** `Hit`, `Twist`, `V3`, `snapQuarters`, `commitQuarters`, `setManualTurn`, `takeOver` are named identically across tasks.
- **Proportion:** code bodies are specified by signature, test assertions and constants, not written out.
- **Review Focus:** pointercancel/lost capture and tap (T3 Step 3 end paths; T4 Step 5 tap check), second finger (T3 Step 2), cube leaving view (T6 Step 3, `hide` commits), grazing/gap (T1 test + T3 fallback to orbit), Pause/reduced motion (T6).
- **Known gap:** `cube.ts` imports `./shapes` without an extension, so it cannot be unit-tested under Node; its behaviour is checked in the browser (T4 Step 5).
