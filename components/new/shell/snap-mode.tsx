'use client'

import { useEffect } from 'react'

/** Turns on scroll snapping for this page only (html.np-snap). Render it on story pages, not on plain pages. */
export function SnapMode() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('np-snap')
    return () => root.classList.remove('np-snap')
  }, [])
  return null
}
