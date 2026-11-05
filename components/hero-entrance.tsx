'use client'

import { useEffect, useState, type ReactNode } from 'react'

// The entrance plays on a fresh page load only. Coming back to Home through the site navigation shows it settled.
let played = false

export function HeroEntrance({ children }: { children: ReactNode }) {
  const [animate] = useState(() => !played)
  useEffect(() => { played = true }, [])
  return <div className={animate ? 'rise' : undefined}>{children}</div>
}
