import { BL, PITCH } from './shapes'

/** One quarter turn of one layer: axis 0-2, layer -1..1, direction +-1, duration in seconds, optional pause afterwards. */
interface Turn { ax: number; layer: number; dir: number; dur: number; after?: number }

const easeIO = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function rot90(d: Float32Array, o: number, ax: number, s: number): void {
  const x = d[o], y = d[o + 1], z = d[o + 2]
  if (ax === 0) { d[o + 1] = -s * z; d[o + 2] = s * y } else if (ax === 1) { d[o] = s * z; d[o + 2] = -s * x } else { d[o] = -s * y; d[o + 1] = s * x }
}

/**
 * The cube's scramble-then-solve sequence. It edits the cube's particle data in place when a turn lands
 * (so the shape stays a real cube) and asks `upload` to send the new data to the GPU.
 */
export class CubeAnimator {
  /** Current turn as the shader sees it: axis index, layer coordinate, angle. */
  mv: [number, number, number] = [0, 0, 0]
  private queue: Turn[] = []
  private cur: Turn | null = null
  private p = 0
  private hold = 0.8
  private hist: Turn[] = []
  private prev: Turn | null = null

  constructor(private readonly count: number, private readonly getData: () => Float32Array | undefined, private readonly upload: (data: Float32Array) => void) {}

  /** Forget all progress. The caller restores the solved particle data. */
  reset(): void {
    this.queue = []; this.cur = null; this.p = 0; this.hold = 0.8; this.hist = []; this.mv = [0, 0, 0]; this.prev = null
  }

  /** Land any turn in progress instantly. */
  stop(): void {
    if (this.cur) { this.commit(this.cur); this.cur = null }
    this.mv = [0, 0, 0]
  }

  /** Advance by dt seconds. Callers pass nothing when motion is off (call `stop` instead). */
  update(dt: number): void {
    if (!this.cur) {
      if (this.hold > 0) { this.hold -= dt; return }
      if (!this.queue.length) this.plan()
      const next = this.queue.shift()
      if (!next) return
      this.cur = next; this.p = 0
    }
    const cur = this.cur
    this.p += dt / cur.dur
    this.mv = [cur.ax, cur.layer * PITCH, cur.dir * easeIO(Math.min(1, this.p)) * Math.PI / 2]
    if (this.p >= 1) { this.commit(cur); this.hold = cur.after || 0; this.cur = null; this.mv = [0, 0, 0] }
  }

  private plan(): void {
    this.queue = []
    if (!this.hist.length) {
      for (let i = 0; i < 7; i++) {
        let m: Turn
        do { m = { ax: Math.floor(Math.random() * 3), layer: Math.floor(Math.random() * 3) - 1, dir: Math.random() < 0.5 ? -1 : 1, dur: 0.42 } }
        while (this.prev && m.ax === this.prev.ax && m.layer === this.prev.layer)
        this.prev = m; this.queue.push(m); this.hist.push(m)
      }
      this.queue[6].after = 1.3
    } else {
      for (let i = this.hist.length - 1; i >= 0; i--) { const h = this.hist[i]; this.queue.push({ ax: h.ax, layer: h.layer, dir: -h.dir, dur: 0.6 }) }
      this.queue[this.queue.length - 1].after = 3.2; this.hist = []; this.prev = null
    }
  }

  private commit(m: Turn): void {
    const d = this.getData()
    if (!d) return
    for (let i = 0; i < this.count; i++) {
      const o = i * BL
      if (d[o + 3] === 0 && d[o + 4] === 0 && d[o + 5] === 0) continue
      if (Math.abs(d[o + 7 + m.ax] - m.layer * PITCH) > 0.2) continue
      rot90(d, o, m.ax, m.dir); rot90(d, o + 3, m.ax, m.dir); rot90(d, o + 7, m.ax, m.dir)
    }
    this.upload(d)
  }
}
