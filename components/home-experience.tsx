'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Small client boundary for the wind, reveals and motion toggle; page content remains server rendered and usable without it. Used by Home and every remodelled page. */
export function HomeExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(preference.matches)
    sync()
    setReady(true)
    preference.addEventListener('change', sync)
    return () => preference.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const atmosphere = el.querySelector<HTMLElement>('.home-atmosphere')
    const hero = el.querySelector<HTMLElement>('.home-hero, .page-hero')
    const header = el.querySelector<HTMLElement>('header')
    const size = () => {
      if (atmosphere && hero) atmosphere.style.height = `${hero.getBoundingClientRect().bottom - el.getBoundingClientRect().top}px`
    }
    size()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', size)
      return () => window.removeEventListener('resize', size)
    }
    const observer = new ResizeObserver(size)
    if (hero) observer.observe(hero)
    if (header) observer.observe(header)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!ready || !root.current) return
    const el = root.current
    let cancelled = false
    let motion: { destroy: () => void } | undefined
    import('@/lib/motion/home-engine').then(({ createHomeMotion }) => {
      if (!cancelled) motion = createHomeMotion(el, paused || reduced)
    }).catch(() => { el.dataset.motion = 'paused' })
    return () => { cancelled = true; motion?.destroy() }
  }, [paused, reduced, ready])

  return <div ref={root} className="home-experience" data-aeolus-root="" data-motion={paused || reduced ? 'paused' : 'running'}>
    <div className="home-progress" aria-hidden="true"><div data-progress="" /></div>
    {children}
    {ready && <button className="home-motion-toggle" type="button" aria-pressed={paused || reduced} disabled={reduced} onClick={() => setPaused(value => !value)}>{reduced ? 'Reduced motion' : paused ? 'Resume motion' : 'Pause motion'}</button>}
  </div>
}

export { HomeExperience as StudioExperience }
