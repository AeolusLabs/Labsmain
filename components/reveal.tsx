'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

// Content below the first screen rises into place once, as it scrolls into view.
// Content already in view, reduced-motion visitors and visitors without script all see it settled.
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return
    el.dataset.reveal = 'pending'
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.dataset.reveal = 'done'; observer.disconnect() }
    }, { rootMargin: '0px 0px -8% 0px' })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} style={{ transitionDelay: `${delay}ms` } as CSSProperties}>{children}</div>
}
