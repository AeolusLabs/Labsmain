import { chooseTwist, type Hit, type V3 } from './cube-play'

/**
 * Everything is in CSS pixels of the viewport. The owner turns these into model-space rays and projections
 * (cube-play.ts) and shows the result.
 */
export interface CubePlayHooks {
  /** The sticker under a point, or null. */
  pick(px: number, py: number): Hit | null
  /** A model-space point to viewport CSS pixels. */
  project(p: V3): [number, number]
  /** The visitor is dragging empty space: turn the whole cube by these pixel deltas. */
  onOrbit(dx: number, dy: number): void
  onTwistStart(): void
  /** Signed angle (radians, right-handed about +ax) the dragged layer should show. */
  onTwist(ax: 0 | 1 | 2, layer: -1 | 0 | 1, angle: number): void
  /** The drag ended (release, cancel, hide, dispose). `velocity` is rad/s over the last moments. The owner snaps it. */
  onTwistEnd(ax: 0 | 1 | 2, layer: -1 | 0 | 1, angle: number, velocity: number): void
}

export interface CubePad {
  /** Put the pad over a disc (centre and radius in viewport CSS pixels). */
  place(cx: number, cy: number, radius: number): void
  /** Hide the pad. A drag in progress ends first. */
  hide(): void
  isActive(): boolean
  dispose(): void
}

const DRAG_START = 6        // px of movement before a touch on a sticker becomes a twist
const VELOCITY_WINDOW = 80  // ms of recent angle used for the release velocity
const MAX_ANGLE = Math.PI

/**
 * A transparent disc over the cube that takes drags. `touch-action: none` lives only on this disc, so a finger
 * anywhere else on the page still scrolls. Wheel events are never handled, so the mouse wheel scrolls over it too.
 */
export function createCubePad(parent: HTMLElement, hooks: CubePlayHooks, pitch: number): CubePad {
  const el = document.createElement('div')
  el.setAttribute('aria-hidden', 'true')
  el.style.cssText = 'position:fixed;display:none;border-radius:50%;touch-action:none;pointer-events:auto;z-index:5;cursor:grab;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none'
  parent.appendChild(el)

  let id: number | null = null
  let mode: 'idle' | 'pending' | 'orbit' | 'twist' = 'idle'
  let sx = 0, sy = 0, lx = 0, ly = 0
  let hit: Hit | null = null
  let twist: ReturnType<typeof chooseTwist> = null
  let angle = 0
  let samples: Array<[number, number]> = []

  const velocity = (): number => {
    const now = performance.now(), recent = samples.filter(s => now - s[0] <= VELOCITY_WINDOW)
    if (recent.length < 2) return 0
    const a = recent[0], b = recent[recent.length - 1]
    return b[0] > a[0] ? (b[1] - a[1]) / ((b[0] - a[0]) / 1000) : 0
  }

  function end(): void {
    if (id === null) return
    const wasTwist = mode === 'twist' && twist
    const tw = twist, a = angle, v = velocity()
    try { el.releasePointerCapture(id) } catch { /* already released */ }
    id = null; mode = 'idle'; hit = null; twist = null; samples = []; el.style.cursor = 'grab'
    if (wasTwist && tw) hooks.onTwistEnd(tw.ax, tw.layer, a, v)
  }

  const down = (e: PointerEvent) => {
    if (id !== null) return                                  // a second finger is ignored
    if (e.pointerType === 'mouse' && e.button !== 0) return
    id = e.pointerId
    try { el.setPointerCapture(id) } catch { /* the drag still works without capture */ }
    sx = lx = e.clientX; sy = ly = e.clientY
    hit = hooks.pick(e.clientX, e.clientY)
    mode = hit ? 'pending' : 'orbit'
    twist = null; angle = 0; samples = []
    el.style.cursor = 'grabbing'
  }

  const move = (e: PointerEvent) => {
    if (e.pointerId !== id) return
    const x = e.clientX, y = e.clientY
    if (mode === 'pending' && hit && Math.hypot(x - sx, y - sy) > DRAG_START) {
      twist = chooseTwist(hit, [x - sx, y - sy], hooks.project, pitch)
      if (twist) { mode = 'twist'; hooks.onTwistStart() } else mode = 'orbit'   // grazing angle: turn the whole cube instead
    }
    if (mode === 'twist' && twist) {
      const raw = ((x - sx) * twist.screen[0] + (y - sy) * twist.screen[1]) / twist.pxPerRad
      angle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, raw))
      samples.push([performance.now(), angle]); if (samples.length > 24) samples.shift()
      hooks.onTwist(twist.ax, twist.layer, angle)
    } else if (mode === 'orbit') {
      hooks.onOrbit(x - lx, y - ly)
    }
    lx = x; ly = y
  }

  const up = (e: PointerEvent) => { if (e.pointerId === id) end() }
  const hidden = () => { if (document.hidden) end() }

  el.addEventListener('pointerdown', down)
  el.addEventListener('pointermove', move)
  el.addEventListener('pointerup', up)
  el.addEventListener('pointercancel', up)
  el.addEventListener('lostpointercapture', up)
  document.addEventListener('visibilitychange', hidden)

  return {
    place(cx, cy, radius) {
      el.style.left = `${cx - radius}px`; el.style.top = `${cy - radius}px`
      el.style.width = el.style.height = `${radius * 2}px`
      el.style.display = 'block'
    },
    hide() { end(); el.style.display = 'none' },
    isActive: () => mode !== 'idle',
    dispose() {
      end()
      el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up)
      el.removeEventListener('lostpointercapture', up)
      document.removeEventListener('visibilitychange', hidden)
      el.remove()
    },
  }
}
