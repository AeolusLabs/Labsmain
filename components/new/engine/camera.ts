import type { FormId } from './shapes'

/** Column-major 4x4 matrices as plain arrays, as in the prototype. */
export type Mat4 = number[]

export const persp = (fovy: number, a: number, n: number, f: number): Mat4 => {
  const t = 1 / Math.tan(fovy / 2), nf = 1 / (n - f)
  return [t / a, 0, 0, 0, 0, t, 0, 0, 0, 0, (f + n) * nf, -1, 0, 0, 2 * f * n * nf, 0]
}
export const mul = (a: Mat4, b: Mat4): Mat4 => {
  const o: Mat4 = new Array(16).fill(0)
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) o[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k]
  return o
}
export const rotY = (a: number): Mat4 => { const c = Math.cos(a), s = Math.sin(a); return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1] }
export const rotX = (a: number): Mat4 => { const c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1] }
export const rotZ = (a: number): Mat4 => { const c = Math.cos(a), s = Math.sin(a); return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] }
export const trans = (x: number, y: number, z: number): Mat4 => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]
export const scaleM = (s: number): Mat4 => [s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, 1]

/** Screens narrower than this are phones: words at the bottom, shapes above them. */
export const WIDE_MIN = 760
export const FOV = 0.8

/** Camera numbers that depend only on the screen shape. */
export function frameFor(aspect: number) {
  const dist = 4.4 * Math.max(1, 1.25 / aspect)
  const halfH = dist * Math.tan(FOV / 2)
  const halfW = halfH * aspect
  return { dist, halfH, halfW, fit: Math.min(1, 0.42 * halfW / 1.5) }
}

/** Phones: where a shape sits (vertical offset in world units) and how big, so it fits the free space above its words. */
export function placePhone(scene: FormId, copyHeight: number, viewW: number, viewH: number, halfH: number): { y: number; s: number } {
  if (scene === 'sky') return { y: 0, s: 1 }
  const ppu = viewH / (2 * halfH)
  const top = 118, bottom = viewH - 32 - (copyHeight || 200) - 18, avail = Math.max(140, bottom - top)
  const diam = Math.min(viewW * 0.84, avail), cy = top + avail / 2
  return { y: (1 - 2 * cy / viewH) * halfH, s: Math.max(0.4, Math.min(1.1, diam / (2 * 1.55 * ppu))) }
}
