'use client'

import { useEffect, useState } from 'react'

// The saved or system choice is applied before first paint by a small script in the root layout.
export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark')
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch {}
  }

  return <button type="button" className="theme-toggle" aria-pressed={dark} onClick={toggle}>Dark appearance</button>
}
