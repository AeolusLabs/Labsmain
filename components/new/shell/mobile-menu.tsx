'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { nav } from '../content'

/** The three main links, behind a "Menu" button, for screens narrower than 920px (the CSS hides this above that width). */
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const id = useId()
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const onPointer = (e: PointerEvent) => { if (root.current && !root.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer) }
  }, [open])

  return (
    <div className="np-menu" ref={root}>
      <button type="button" className="np-menu-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen(v => !v)}>Menu</button>
      <div id={id} className="np-menu-list" hidden={!open}>
        {nav.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
      </div>
    </div>
  )
}
