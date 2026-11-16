import { TAU, Rng, ease, mixf, type Vec3 } from './math'

/** Index in FORMS is the id the shader sees. */
export const FORMS = ['sky', 'brain', 'agent', 'cube', 'bulb'] as const
export type FormId = (typeof FORMS)[number]

/** Floats per particle in a block: home xyz, normal xyz + foldedness, cube cell xyz, colour. */
export const BL = 11
export const STRIDE = BL * 4

// ---------------------------------------------------------------- brain (baked from a CC BY 4.0 model)
export const BRAIN_SCALE = 1.45
export const BRAIN_MAX = 16000

export interface BrainData { pos: Int16Array; nrm: Int8Array; fold: Uint8Array }

/** Parse /data/brain-points.bin. Returns null if the buffer is too small to hold the layout. */
export function parseBrain(ab: ArrayBuffer): BrainData | null {
  if (ab.byteLength < BRAIN_MAX * 10) return null
  return {
    pos: new Int16Array(ab, 0, BRAIN_MAX * 3),
    nrm: new Int8Array(ab, BRAIN_MAX * 6, BRAIN_MAX * 3),
    fold: new Uint8Array(ab, BRAIN_MAX * 9, BRAIN_MAX),
  }
}

type Point7 = [number, number, number, number, number, number, number]

function brainAt(brain: BrainData, i: number, s: number): Point7 {
  return [brain.pos[i * 3] / 32767 * s, brain.pos[i * 3 + 1] / 32767 * s, brain.pos[i * 3 + 2] / 32767 * s,
    brain.nrm[i * 3] / 127, brain.nrm[i * 3 + 1] / 127, brain.nrm[i * 3 + 2] / 127, brain.fold[i] / 255]
}

interface Item { x: number; y: number; z: number; nx: number; ny: number; nz: number; fd: number; cell: Vec3; col: number; key: number }
const NO_CELL: Vec3 = [0, 0, 0]

// ---------------------------------------------------------------- sky
/** The Milky Way: a tilted band, a bright core, a halo and a few glints. */
function skyPoint(rng: Rng): Item {
  const r = rng.next(), ANG = 0.42
  let x: number, y: number, z: number, col = rng.next()
  if (r < 0.46) {
    const u2 = (rng.next() * 2 - 1) * 4.6, v = rng.gauss() * 0.42 * (1 - 0.25 * Math.abs(u2) / 4.6)
    x = u2 * Math.cos(ANG) - v * Math.sin(ANG); y = u2 * Math.sin(ANG) + v * Math.cos(ANG); z = rng.gauss() * 0.55
  } else if (r < 0.58) {
    x = 0.6 + rng.gauss() * 0.75; y = 0.2 + rng.gauss() * 0.38; z = rng.gauss() * 0.45; col = 0.55 + rng.next() * 0.45
  } else if (r < 0.97) {
    x = (rng.next() * 2 - 1) * 5.2; y = (rng.next() * 2 - 1) * 3.2; z = (rng.next() * 2 - 1) * 2.6 - 0.4
  } else {
    x = (rng.next() * 2 - 1) * 4.6; y = (rng.next() * 2 - 1) * 2.8; z = (rng.next() * 2 - 1) * 1.8; col = 0.9 + rng.next() * 0.1
  }
  return { x, y, z, nx: 0, ny: 0, nz: 0, fd: 0, cell: NO_CELL, col, key: 0 }
}

// ---------------------------------------------------------------- light bulb
function bulbPoint(rng: Rng): Point7 {
  const r = rng.next(), th = rng.next() * TAU, cx = Math.cos(th), sx = Math.sin(th)
  if (r < 0.50) { const ct = 1 - rng.next() * (1 - Math.cos(2.25)), st = Math.sqrt(1 - ct * ct); return [st * cx * 0.95, 0.42 + ct * 0.95, st * sx * 0.95, st * cx, ct, st * sx, 0] }
  if (r < 0.58) { const t = rng.next(), y = mixf(-0.18, -0.72, t), rad = mixf(0.739, 0.42, ease(t)), l = Math.hypot(1, 0.3); return [rad * cx, y, rad * sx, cx / l, 0.3 / l, sx / l, 0.1] }
  if (r < 0.69) { const y = -0.72 - rng.next() * 0.42, ring = 0.5 + 0.5 * Math.sin(y * 48), rad = 0.42 + 0.04 * ring; return [rad * cx, y, rad * sx, cx, 0, sx, 0.75 * (1 - ring)] }
  if (r < 0.71) { const q = Math.sqrt(rng.next()) * 0.2; return [q * cx, -1.17, q * sx, 0, -1, 0, 0] }
  if (r < 0.83) {
    const n = rng.unit()
    if (rng.next() < 0.3) { const sg = rng.next() < 0.5 ? -1 : 1; return [sg * 0.15 + (rng.next() - 0.5) * 0.01, mixf(-0.12, 0.42, rng.next()), (rng.next() - 0.5) * 0.01, n[0], n[1], n[2], 0] }
    const t = rng.next(), w = t * 64; return [mixf(-0.15, 0.15, t), 0.42 + 0.045 * Math.sin(w), 0.045 * Math.cos(w), n[0], n[1], n[2], 0]
  }
  const k = Math.floor(rng.next() * 13), ang = mixf(-0.45, Math.PI + 0.45, k / 12), s = mixf(1.2, 1.75, Math.pow(rng.next(), 0.7)), n = rng.unit()   // spark rays
  return [Math.cos(ang) * s, 0.42 + Math.sin(ang) * s * 0.95, 0, n[0], n[1], n[2], 0]
}

// ---------------------------------------------------------------- Rubik's cube
/** 27 cubelets, outer faces only (54 stickers); each particle carries its cubelet's centre so a layer can turn. */
export const PITCH = 0.56
const HALF = 0.25
interface Sticker { a: number; sg: number; cell: Vec3; cid: number }
const STICKERS: readonly Sticker[] = (() => {
  const list: Sticker[] = []
  for (let a = 0; a < 3; a++) for (const sg of [-1, 1]) for (let ib = -1; ib <= 1; ib++) for (let ic = -1; ic <= 1; ic++) {
    const cell: Vec3 = [0, 0, 0]; cell[a] = sg; cell[(a + 1) % 3] = ib; cell[(a + 2) % 3] = ic
    list.push({ a, sg, cell: [cell[0] * PITCH, cell[1] * PITCH, cell[2] * PITCH], cid: a * 2 + (sg > 0 ? 1 : 0) })
  }
  return list
})()

function rubikPoint(rng: Rng, k: number): { p: Vec3; n: Vec3; cell: Vec3; cid: number } {
  const st = STICKERS[k], { a, sg, cell } = st, b = (a + 1) % 3, c = (a + 2) % 3
  const p: Vec3 = [cell[0], cell[1], cell[2]], n: Vec3 = [0, 0, 0]; n[a] = sg; let cid = st.cid
  if (rng.next() < 0.8) { p[a] += sg * HALF; p[b] += (rng.next() * 2 - 1) * HALF * 0.84; p[c] += (rng.next() * 2 - 1) * HALF * 0.84 }
  else { p[a] += sg * HALF; const along = (rng.next() * 2 - 1) * HALF, side = rng.next() < 0.5 ? -1 : 1, swap = rng.next() < 0.5; p[swap ? b : c] += along; p[swap ? c : b] += side * HALF * 0.97; cid = 6 }
  return { p, n, cell, cid }
}

// ---------------------------------------------------------------- agent diagram
/** A small brain in the middle, wired to a ring of eight tools and four outer hubs, all inside a radius of about 1.7. */
type Vec2 = [number, number]
interface Seg { kind: 'line' | 'ring'; a: Vec2; b: Vec2; len: number; from: number }
const NODES: readonly Vec2[] = [...Array(8)].map((_, k): Vec2 => [Math.sin(k / 8 * TAU) * 1.0, Math.cos(k / 8 * TAU) * 0.95])
const HUBS: readonly Vec2[] = [[0, 1.55], [1.7, 0], [0, -1.55], [-1.7, 0]]
const { SEGS, SEG_TOTAL } = (() => {
  const segs: Seg[] = []
  let total = 0
  const add = (kind: 'line' | 'ring', a: Vec2, b: Vec2, len: number) => { segs.push({ kind, a, b, len, from: total }); total += len }
  for (let k = 0; k < 8; k++) { const a = NODES[k], b = NODES[(k + 1) % 8]; add('line', a, b, Math.hypot(b[0] - a[0], b[1] - a[1])) }                 // ring between the tools
  for (let k = 0; k < 8; k++) { const nd = NODES[k], l = Math.hypot(nd[0], nd[1]); add('line', [nd[0] / l * 0.55, nd[1] / l * 0.55], nd, l - 0.55) }     // spokes into the brain
  for (let h = 0; h < 4; h++) { const nd = NODES[h * 2], hub = HUBS[h]; add('line', nd, hub, Math.hypot(hub[0] - nd[0], hub[1] - nd[1])) }               // each hub wired to a tool
  for (let h = 0; h < 4; h++) add('ring', HUBS[h], HUBS[h], TAU * 0.17)                                                                                    // hubs as small rings
  return { SEGS: segs as readonly Seg[], SEG_TOTAL: total }
})()

function agentPoint(rng: Rng, i: number, surfaceN: number, brain: BrainData | null): Point7 {
  const t = i / surfaceN, n = rng.unit(), z = rng.gauss() * 0.02
  if (t < 0.2) {                                           // the brain at the centre
    if (brain) return brainAt(brain, Math.floor(rng.next() * BRAIN_MAX), 0.5)
    return [n[0] * 0.45, n[1] * 0.45, n[2] * 0.45, n[0], n[1], n[2], 0.2]
  }
  if (t < 0.31) { const nd = NODES[Math.floor(rng.next() * 8)], q = rng.unit(), r = 0.1 * Math.cbrt(rng.next()); return [nd[0] + q[0] * r, nd[1] + q[1] * r, q[2] * r, q[0], q[1], q[2], 0.05] }   // the eight tools
  const r = rng.next() * SEG_TOTAL
  let seg = SEGS[SEGS.length - 1]
  for (const sg of SEGS) if (r <= sg.from + sg.len) { seg = sg; break }
  if (seg.kind === 'ring') { const a = rng.next() * TAU; return [seg.a[0] + Math.cos(a) * 0.17, seg.a[1] + Math.sin(a) * 0.17, z, n[0], n[1], n[2], 0.3] }
  const u2 = rng.next(), j = (rng.next() - 0.5) * 0.02
  return [mixf(seg.a[0], seg.b[0], u2) + j, mixf(seg.a[1], seg.b[1], u2) + j, z, n[0], n[1], n[2], 0.3]
}

// ---------------------------------------------------------------- block builder
const fromPoint = (b: Point7, col: number, scale = 1, dy = 0): Item =>
  ({ x: b[0] * scale, y: b[1] * scale + dy, z: b[2] * scale, nx: b[3], ny: b[4], nz: b[5], fd: b[6], cell: NO_CELL, col, key: 0 })

/**
 * One block of per-particle data per shape (BL floats each). Particles are ordered by height band then angle, so
 * index i sits in a similar place in every shape and the change flows. Deterministic for a given (kind, n, brain).
 */
export function makeBlock(kind: FormId, n: number, brain: BrainData | null): Float32Array {
  const rng = new Rng(1234567 + FORMS.indexOf(kind) * 977)
  const useBrain = kind === 'brain' && brain !== null
  const isProc = kind === 'bulb' || kind === 'cube' || kind === 'agent'
  const surfaceN = useBrain ? Math.min(Math.round(n * 0.88), BRAIN_MAX) : (isProc ? Math.round(n * 0.9) : 0)
  const per = Math.max(1, Math.floor(surfaceN / 54))
  const items: Item[] = new Array(n)
  for (let i = 0; i < n; i++) {
    let it: Item
    if (kind === 'sky' || (kind === 'brain' && !brain)) it = skyPoint(rng)
    else if (i < surfaceN && kind === 'cube') { const q = rubikPoint(rng, Math.min(53, Math.floor(i / per))); it = { x: q.p[0], y: q.p[1], z: q.p[2], nx: q.n[0], ny: q.n[1], nz: q.n[2], fd: 0, cell: q.cell, col: (q.cid + 0.5) / 7, key: 0 } }
    else if (i < surfaceN && kind === 'bulb') { const b = bulbPoint(rng); it = fromPoint(b, rng.next(), 0.78, -0.05) }
    else if (i < surfaceN && kind === 'agent') { const b = agentPoint(rng, i, surfaceN, brain); it = fromPoint(b, rng.next()) }
    else if (i < surfaceN && brain) { const b = brainAt(brain, i, BRAIN_SCALE); it = fromPoint(b, rng.next()) }
    else it = { x: (rng.next() * 2 - 1) * 3.4, y: (rng.next() * 2 - 1) * 2.2, z: (rng.next() * 2 - 1) * 2.4, nx: 0, ny: 0, nz: 0, fd: 0, cell: NO_CELL, col: rng.next(), key: 0 }   // dust round a shape
    items[i] = it
  }
  const sortEnd = kind === 'sky' || surfaceN === 0 ? n : surfaceN
  let minY = 1e9, maxY = -1e9
  for (let i = 0; i < sortEnd; i++) { minY = Math.min(minY, items[i].y); maxY = Math.max(maxY, items[i].y) }
  const span = maxY - minY || 1
  for (let i = 0; i < sortEnd; i++) { const it = items[i]; it.key = Math.floor(Math.min(0.999, (it.y - minY) / span) * 10) + (Math.atan2(it.z, it.x) + Math.PI) / TAU * 0.999 }
  const ordered = items.slice(0, sortEnd).sort((a, b) => a.key - b.key).concat(items.slice(sortEnd))
  const d = new Float32Array(n * BL)
  for (let i = 0; i < n; i++) {
    const it = ordered[i], o = i * BL
    d[o] = it.x; d[o + 1] = it.y; d[o + 2] = it.z; d[o + 3] = it.nx; d[o + 4] = it.ny; d[o + 5] = it.nz; d[o + 6] = it.fd
    d[o + 7] = it.cell[0]; d[o + 8] = it.cell[1]; d[o + 9] = it.cell[2]; d[o + 10] = it.col
  }
  return d
}

/** Per-particle seeds: phase, size, rotation. */
export function makeSeeds(n: number): Float32Array {
  const rng = new Rng(99), s = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) { s[i * 3] = rng.next(); s[i * 3 + 1] = 0.45 + Math.pow(rng.next(), 3) * 1.5; s[i * 3 + 2] = rng.next() }
  return s
}
