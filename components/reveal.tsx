'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import tokens from '@/design-system/tokens.json'

// Content below the first screen rises into place once, as it scrolls into view.
// Content already in view, reduced-motion visitors and visitors without script all see it settled.
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    if (!el || !('IntersectionObserver' in window) || preference.matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * tokens.motion['reveal-viewport']) return
    el.dataset.reveal = 'pending'
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.dataset.reveal = 'done'; observer.disconnect() }
    }, { rootMargin: tokens.motion['reveal-root-margin'] })
    observer.observe(el)
    const settle = () => { el.dataset.reveal = 'done'; observer.disconnect() }
    const onPreferenceChange = () => { if (preference.matches) settle() }
    el.addEventListener('focusin', settle)
    preference.addEventListener('change', onPreferenceChange)
    return () => {
      observer.disconnect()
      el.removeEventListener('focusin', settle)
      preference.removeEventListener('change', onPreferenceChange)
    }
  }, [])

  return <div ref={ref} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>
}
