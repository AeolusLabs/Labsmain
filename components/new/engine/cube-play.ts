/**
 * Pure maths for playing with the cube: ray picking, which layer a drag twists, and snapping to quarter turns.
 * Imports nothing, so Node can test it directly. Matrices are column-major, as in math.ts.
 */

export type V3 = [number, number, number]
export interface Hit { axis: 0 | 1 | 2; sign: 1 | -1; point: V3; cell: V3 }
export interface Twist { ax: 0 | 1 | 2; layer: -1 | 0 | 1; sign: 1 | -1; pxPerRad: number }

/** Column-major 4x4 inverse; null when singular. */
function invert4(m: ArrayLike<number>): number[] | null {
  const a = Array.from(m as ArrayLike<number>), o = new Array<number>(16)
  o[0] = a[5] * a[10] * a[15] - a[5] * a[11] * a[14] - a[9] * a[6] * a[15] + a[9] * a[7] * a[14] + a[13] * a[6] * a[11] - a[13] * a[7] * a[10]
  o[4] = -a[4] * a[10] * a[15] + a[4] * a[11] * a[14] + a[8] * a[6] * a[15] - a[8] * a[7] * a[14] - a[12] * a[6] * a[11] + a[12] * a[7] * a[10]
  o[8] = a[4] * a[9] * a[15] - a[4] * a[11] * a[13] - a[8] * a[5] * a[15] + a[8] * a[7] * a[13] + a[12] * a[5] * a[11] - a[12] * a[7] * a[9]
  o[12] = -a[4] * a[9] * a[14] + a[4] * a[10] * a[13] + a[8] * a[5] * a[14] - a[8] * a[6] * a[13] - a[12] * a[5] * a[10] + a[12] * a[6] * a[9]
  o[1] = -a[1] * a[10] * a[15] + a[1] * a[11] * a[14] + a[9] * a[2] * a[15] - a[9] * a[3] * a[14] - a[13] * a[2] * a[11] + a[13] * a[3] * a[10]
  o[5] = a[0] * a[10] * a[15] - a[0] * a[11] * a[14] - a[8] * a[2] * a[15] + a[8] * a[3] * a[14] + a[12] * a[2] * a[11] - a[12] * a[3] * a[10]
  o[9] = -a[0] * a[9] * a[15] + a[0] * a[11] * a[13] + a[8] * a[1] * a[15] - a[8] * a[3] * a[13] - a[12] * a[1] * a[11] + a[12] * a[3] * a[9]
  o[13] = a[0] * a[9] * a[14] - a[0] * a[10] * a[13] - a[8] * a[1] * a[14] + a[8] * a[2] * a[13] + a[12] * a[1] * a[10] - a[12] * a[2] * a[9]
  o[2] = a[1] * a[6] * a[15] - a[1] * a[7] * a[14] - a[5] * a[2] * a[15] + a[5] * a[3] * a[14] + a[13] * a[2] * a[7] - a[13] * a[3] * a[6]
  o[6] = -a[0] * a[6] * a[15] + a[0] * a[7] * a[14] + a[4] * a[2] * a[15] - a[4] * a[3] * a[14] - a[12] * a[2] * a[7] + a[12] * a[3] * a[6]
  o[10] = a[0] * a[5] * a[15] - a[0] * a[7] * a[13] - a[4] * a[1] * a[15] + a[4] * a[3] * a[13] + a[12] * a[1] * a[7] - a[12] * a[3] * a[5]
  o[14] = -a[0] * a[5] * a[14] + a[0] * a[6] * a[13] + a[4] * a[1] * a[14] - a[4] * a[2] * a[13] - a[12] * a[1] * a[6] + a[12] * a[2] * a[5]
  o[3] = -a[1] * a[6] * a[11] + a[1] * a[7] * a[10] + a[5] * a[2] * a[11] - a[5] * a[3] * a[10] - a[9] * a[2] * a[7] + a[9] * a[3] * a[6]
  o[7] = a[0] * a[6] * a[11] - a[0] * a[7] * a[10] - a[4] * a[2] * a[11] + a[4] * a[3] * a[10] + a[8] * a[2] * a[7] - a[8] * a[3] * a[6]
  o[11] = -a[0] * a[5] * a[11] + a[0] * a[7] * a[9] + a[4] * a[1] * a[11] - a[4] * a[3] * a[9] - a[8] * a[1] * a[7] + a[8] * a[3] * a[5]
  o[15] = a[0] * a[5] * a[10] - a[0] * a[6] * a[9] - a[4] * a[1] * a[10] + a[4] * a[2] * a[9] + a[8] * a[1] * a[6] - a[8] * a[2] * a[5]
  const det = a[0] * o[0] + a[1] * o[4] + a[2] * o[8] + a[3] * o[12]
  if (Math.abs(det) < 1e-12) return null
  return o.map(v => v / det)
}

const xform = (m: ArrayLike<number>, x: number, y: number, z: number, w: number): [number, number, number, number] => [
  m[0] * x + m[4] * y + m[8] * z + m[12] * w, m[1] * x + m[5] * y + m[9] * z + m[13] * w,
  m[2] * x + m[6] * y + m[10] * z + m[14] * w, m[3] * x + m[7] * y + m[11] * z + m[15] * w,
]

/** A model-space point to canvas pixels (origin top-left, y down), for the perspective persp(fovY, aspect) builds. */
export function projectPoint(p: V3, mv: ArrayLike<number>, aspect: number, fovY: number, w: number, h: number): [number, number] {
  const v = xform(mv, p[0], p[1], p[2], 1), t = Math.tan(fovY / 2), k = -v[2]
  const nx = v[0] / (aspect * t * k), ny = v[1] / (t * k)
  return [(nx + 1) / 2 * w, (1 - ny) / 2 * h]
}

/** The model-space ray through a canvas pixel. */
export function modelRay(px: number, py: number, mv: ArrayLike<number>, aspect: number, fovY: number, w: number, h: number): { o: V3; d: V3 } | null {
  const inv = invert4(mv)
  if (!inv) return null
  const t = Math.tan(fovY / 2), nx = px / w * 2 - 1, ny = 1 - py / h * 2
  const o = xform(inv, 0, 0, 0, 1), d = xform(inv, nx * aspect * t, ny * t, -1, 0)
  const len = Math.hypot(d[0], d[1], d[2])
  return { o: [o[0], o[1], o[2]], d: [d[0] / len, d[1] / len, d[2] / len] }
}

/** The nearest outer sticker face under a ray, among 27 cubelet boxes (half-size `half`, centres at pitch * cell). */
export function pickCube(ray: { o: V3; d: V3 }, pitch: number, half: number): Hit | null {
  let best: Hit | null = null, bestT = Infinity
  for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (let k = -1; k <= 1; k++) {
    const cell: V3 = [i, j, k]
    let tNear = -Infinity, tFar = Infinity, axis = 0, miss = false
    for (let a = 0; a < 3 && !miss; a++) {
      const c = cell[a] * pitch, o = ray.o[a], d = ray.d[a]
      if (Math.abs(d) < 1e-12) { if (o < c - half || o > c + half) miss = true; continue }
      let t1 = (c - half - o) / d, t2 = (c + half - o) / d
      if (t1 > t2) [t1, t2] = [t2, t1]
      if (t1 > tNear) { tNear = t1; axis = a }
      if (t2 < tFar) tFar = t2
    }
    if (miss || tNear > tFar || tNear < 0 || tNear >= bestT) continue
    const sign: 1 | -1 = ray.d[axis] > 0 ? -1 : 1
    if (cell[axis] !== sign) continue                      // an inner face is never a sticker
    bestT = tNear
    best = { axis: axis as 0 | 1 | 2, sign, cell, point: [ray.o[0] + ray.d[0] * tNear, ray.o[1] + ray.d[1] * tNear, ray.o[2] + ray.d[2] * tNear] }
  }
  return best
}

/**
 * Which layer a drag from a sticker turns, and which way. Of the two axes in the face, pick the one whose turn would
 * move the touched point most nearly along the drag on screen; the layer is the touched cubelet's slice on that axis.
 */
export function chooseTwist(hit: Hit, drag: [number, number], project: (p: V3) => [number, number], pitch: number): Twist | null {
  void pitch
  if (!(Math.hypot(drag[0], drag[1]) > 0)) return null
  const p = hit.point, p0 = project(p)
  let best: Twist | null = null, bestScore = 0
  for (let ax = 0; ax < 3; ax++) {
    if (ax === hit.axis) continue
    const e: V3 = [0, 0, 0]; e[ax] = 1
    const r: V3 = [e[1] * p[2] - e[2] * p[1], e[2] * p[0] - e[0] * p[2], e[0] * p[1] - e[1] * p[0]]
    const rl = Math.hypot(r[0], r[1], r[2])
    if (rl < 1e-6) continue
    const q = project([p[0] + 0.05 * r[0] / rl, p[1] + 0.05 * r[1] / rl, p[2] + 0.05 * r[2] / rl])
    const s: [number, number] = [q[0] - p0[0], q[1] - p0[1]], sl = Math.hypot(s[0], s[1])
    if (sl < 1e-6) continue
    const dot = s[0] * drag[0] + s[1] * drag[1], score = Math.abs(dot) / sl
    if (score > bestScore) { bestScore = score; best = { ax: ax as 0 | 1 | 2, layer: hit.cell[ax] as -1 | 0 | 1, sign: dot >= 0 ? 1 : -1, pxPerRad: sl / 0.05 * rl } }
  }
  return best
}

/** Whole quarter turns to land on, given the angle at release and how fast it was moving (rad/s). Never -0. */
export function snapQuarters(angle: number, velocity: number): number {
  return Math.round((angle + velocity * 0.15) / (Math.PI / 2)) + 0
}
