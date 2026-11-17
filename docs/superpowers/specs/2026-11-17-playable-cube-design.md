# Playable cube (short design)

Status: awaiting owner approval. Size: small change, prototyped as a standalone page first.

## Intent and why
Visitors should be able to turn the Simplify-panel Rubik's cube with their own hands, layer by layer, not only watch it scramble and solve. Playing with it is the point: it shows "problems being solved" and rewards curiosity.

## Goals
- Drag on a sticker twists that layer. Axis comes from the face touched and the drag direction. The layer follows the pointer, then snaps to the nearest quarter turn on release.
- Drag on empty space orbits the whole cube so every face is reachable.
- Works with mouse and touch. Cube stays a real cube (particle data edited on each landed turn, as `CubeAnimator.commit` does today).
- Perfect the feel in a standalone HTML page first, then port into `components/new/engine/`.

## Non-goals
- No solver help, move counter, timer or scoring.
- No change to the live (current) site. No change to the other four scenes.

## Anti-goals (failure even if it technically works)
- Touch drags on the cube trapping page scroll anywhere outside the cube's area.
- The auto scramble/solve fighting the visitor mid-twist.
- Layer picking that feels wrong (twisting the wrong layer or axis).

## Constraints
- Particles live on the GPU only, so picking uses a CPU ray test against the 27 cubelets.
- `DESIGN.md`: reduced-motion support, Pause motion control, a still fallback and a lighter phone version all remain.
- Owner chose plain A (no scramble/solve button, no hint, no auto-pause extras). Open point, my call: when the visitor touches the cube the auto scramble/solve must stop, otherwise two systems edit the same data. It resumes only on the cube's next appearance. Say if you want different.

## Approaches
- A. Real-cube drag (sticker = layer twist, empty space = orbit). **Chosen by owner.**
- B. Tap a layer, then arrow buttons. Rejected: control-panel feel, not a toy.
- C. A plus scramble/solve control, hint, idle resume. Offered; owner chose plain A.

## Plan shape (builder decides detail)
1. `public/cube-play.html`: standalone WebGL page reusing the cube shapes and shader; pointer handling, ray picking, layer drag, orbit, snap.
2. Tune feel on desktop and a phone-size viewport, including how touch scroll is handled around the cube's area.
3. Port to `components/new/engine/` (extend `CubeAnimator` or add an input module; `stage.ts` pointer wiring), then verify on `/new`.
