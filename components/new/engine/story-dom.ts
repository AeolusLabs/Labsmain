import { clamp01, ease } from './math'

/**
 * Everything the stage does to the page's DOM, in one place so cleanup is symmetrical:
 * measuring panels, writing the words' opacity, snap anchors and the `np-snap` class, and the data attributes.
 * DOM contract: see components/new/types.ts.
 */

const SNAP_CLASS = 'np-snap'
const SNAP_SLACK = 2

export interface StoryDom {
  /** Number of panels found. */
  readonly count: number
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
  let snapEnd = -1                                          // scroll offset up to which snapping stays on; -1 = never
  let snapOn = false
  let disposed = false

  const anchors: HTMLElement[] = []
  panels.forEach((p, k) => {
    if (!isStory[k]) return
    const a = document.createElement('span')
    a.className = 'np-snap-anchor'
    a.setAttribute('aria-hidden', 'true')
    p.prepend(a)
    anchors.push(a)
  })

  const measure = () => {
    if (disposed) return
    const sy = window.scrollY
    panels.forEach((p, k) => {
      const top = p.getBoundingClientRect().top + sy
      tops[k] = k > 0 ? Math.max(top, tops[k - 1] + 1) : top       // strictly increasing, so the interpolation never divides by zero
      const c = copies[k]
      copyHeights[k] = c ? c.offsetHeight : 0
    })
    let lastStory = -1
    for (let k = 0; k < panels.length && isStory[k]; k++) lastStory = k
    snapEnd = lastStory >= 0 ? tops[lastStory] + SNAP_SLACK : -1
    syncSnap(window.scrollY)
  }

  function syncSnap(scrollY: number) {
    const want = snapEnd >= 0 && scrollY <= snapEnd
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
      anchors.forEach(a => a.remove())
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
