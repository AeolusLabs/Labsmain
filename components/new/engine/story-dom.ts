import type { SceneId } from '../types'
import { clamp01, ease } from './math'

/**
 * Everything the stage does to the page's DOM, in one place so cleanup is symmetrical:
 * measuring panels, writing the words' opacity, snap anchors and the `np-snap` class, and the data attributes.
 * DOM contract: see components/new/types.ts.
 */

const SNAP_CLASS = 'np-snap'
const SNAP_SLACK = 2
const SCENES: readonly SceneId[] = ['sky', 'brain', 'agent', 'cube', 'bulb']
const sceneOf = (v: string | null): SceneId => SCENES.find(s => s === v) ?? 'sky'

export interface StoryDom {
  /** Number of panels found. */
  readonly count: number
  /** The scene each panel asks for (its data-np-scene), in order. */
  readonly scenes: readonly SceneId[]
  /** For each panel, the side the shape takes on wide screens: -1 left (words are on the right), 1 right. */
  readonly sides: readonly number[]
  /** Height in px of each story panel's copy (0 for flow panels). */
  readonly copyHeights: readonly number[]
  /** Piecewise-linear section position for a scroll offset, built from the real panel tops. */
  position(scrollY: number): number
  /** Fade and lift the words of story panels around their own section. */
  applyCopy(f: number, reduced: boolean): void
  /** Turn scroll snapping on only while inside the leading run of story panels. */
  syncSnap(scrollY: number): void
  dispose(): void
}

/** Finds `[data-np-story]` and starts watching it. Returns null if the page has no story (ambient mode). */
export function attachStory(): StoryDom | null {
  const root = document.querySelector<HTMLElement>('[data-np-story]')
  if (!root) return null
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-np-panel]'))
  if (panels.length === 0) return null

  const isStory = panels.map(p => p.getAttribute('data-np-panel') !== 'flow')
  const copies = panels.map((p, k) => (isStory[k] ? p.querySelector<HTMLElement>('[data-np-copy]') : null))
  const sides = panels.map(p => (p.classList.contains('np-panel--right') ? -1 : 1))
  const tops: number[] = new Array(panels.length).fill(0)
  const copyHeights: number[] = new Array(panels.length).fill(0)
  let snapEnd = -1                                          // scroll offset at which snapping switches off (the last anchor); -1 = never
  let snapBack = -1                                         // scroll offset at or below which it switches back on
  let snapOn = false
  let disposed = false

  // The leading run of story panels snaps. The first flow panel after it snaps too, so the visitor can scroll INTO the free
  // content: with mandatory snapping and no further anchor, the page would pull them back for ever. The anchors are rendered
  // by React (see Panel); the stage only switches them on, so it never adds or removes nodes that React owns.
  let lastStory = -1
  for (let k = 0; k < panels.length && isStory[k]; k++) lastStory = k
  const firstFlow = lastStory >= 0 && lastStory + 1 < panels.length ? lastStory + 1 : -1
  const anchors: HTMLElement[] = []
  panels.forEach((p, k) => {
    if (!isStory[k] && k !== firstFlow) return
    const a = p.querySelector<HTMLElement>(':scope > .np-snap-anchor')
    if (!a) return
    a.setAttribute('data-snap', '')
    anchors.push(a)
  })
  const scenes = panels.map(p => sceneOf(p.getAttribute('data-np-scene')))

  const measure = () => {
    if (disposed) return
    const sy = window.scrollY
    panels.forEach((p, k) => {
      const top = p.getBoundingClientRect().top + sy
      tops[k] = k > 0 ? Math.max(top, tops[k - 1] + 1) : top       // strictly increasing, so the interpolation never divides by zero
      const c = copies[k]
      copyHeights[k] = c ? c.offsetHeight : 0
    })
    // Snapping switches off at the last anchor, so the page never holds the visitor back from what follows. It switches back on
    // only once they are half way to the anchor before it: scrolling up out of the free content must not turn it on while the
    // page is still nearer the anchor below, which would pull them back down.
    const edge = lastStory < 0 ? -1 : (firstFlow >= 0 ? firstFlow : lastStory)
    snapEnd = edge < 0 ? -1 : tops[edge] - SNAP_SLACK
    snapBack = edge < 0 ? -1 : (edge > 0 ? (tops[edge - 1] + tops[edge]) / 2 : tops[edge] - 200)
    syncSnap(window.scrollY)
  }

  function syncSnap(scrollY: number) {
    let want = snapOn
    if (snapEnd < 0) want = false
    else if (snapOn && scrollY >= snapEnd) want = false
    else if (!snapOn && scrollY <= snapBack) want = true
    if (want !== snapOn) { snapOn = want; document.documentElement.classList.toggle(SNAP_CLASS, want) }
  }

  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
  ro?.observe(root)
  copies.forEach(c => { if (c) ro?.observe(c) })
  window.addEventListener('resize', measure)
  window.addEventListener('load', measure)
  void document.fonts?.ready.then(measure)
  measure()
  root.setAttribute('data-np-ready', '')

  const last: { o: string; t: string; pe: string }[] = panels.map(() => ({ o: '', t: '', pe: '' }))

  return {
    count: panels.length,
    scenes,
    sides,
    copyHeights,
    position(y) {
      const n = tops.length
      if (n < 2 || y <= tops[0]) return 0
      if (y >= tops[n - 1]) return n - 1
      let i = 0
      while (i < n - 2 && y >= tops[i + 1]) i++
      return i + (y - tops[i]) / (tops[i + 1] - tops[i])
    },
    applyCopy(f, reduced) {
      for (let k = 0; k < copies.length; k++) {
        const c = copies[k]
        if (!c) continue
        const o = ease(1 - clamp01((Math.abs(f - k) - 0.12) / 0.3))
        const os = o.toFixed(3), ts = reduced ? 'none' : `translateY(${((1 - o) * 18).toFixed(1)}px)`, pe = o > 0.3 ? 'auto' : 'none'
        const l = last[k]
        if (l.o !== os) { c.style.opacity = os; l.o = os }
        if (l.t !== ts) { c.style.transform = ts; l.t = ts }
        if (l.pe !== pe) { c.style.pointerEvents = pe; l.pe = pe }
      }
    },
    syncSnap,
    dispose() {
      disposed = true
      ro?.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
      anchors.forEach(a => a.removeAttribute('data-snap'))
      document.documentElement.classList.remove(SNAP_CLASS)
      copies.forEach(c => { if (c) { c.style.opacity = ''; c.style.transform = ''; c.style.pointerEvents = '' } })
      root.removeAttribute('data-np-ready')
    },
  }
}

/** Marks the story as having no WebGL so its words stay visible. Returns an undo for cleanup. */
export function markNoGl(): () => void {
  const root = document.querySelector<HTMLElement>('[data-np-story]')
  root?.setAttribute('data-np-nogl', '')
  return () => root?.removeAttribute('data-np-nogl')
}
