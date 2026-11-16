/** Small numeric helpers shared by the engine. Pure, no module-level state. */

export const TAU = Math.PI * 2
export const mixf = (a: number, b: number, t: number): number => a + (b - a) * t
export const ease = (t: number): number => t * t * (3 - 2 * t)
export const clamp01 = (v: number): number => Math.max(0, Math.min(1, v))

export type Vec3 = [number, number, number]

/** The prototype's tiny linear congruential generator. Every use makes its own instance, so nothing is shared between mounts. */
export class Rng {
  state: number
  constructor(seed: number) { this.state = seed >>> 0 }
  next(): number { this.state = (this.state * 1664525 + 1013904223) >>> 0; return this.state / 4294967296 }
  gauss(): number { return (this.next() + this.next() + this.next() + this.next() - 2) * 1.2 }
  /** A random point on the unit sphere. */
  unit(): Vec3 { const a = this.next() * TAU, c = this.next() * 2 - 1, s = Math.sqrt(1 - c * c); return [s * Math.cos(a), c, s * Math.sin(a)] }
}
