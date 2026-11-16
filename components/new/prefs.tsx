'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { PALETTES, type Palette, type PaletteId } from './types'

interface Prefs {
  palette: Palette
  palettes: readonly Palette[]
  setPalette: (id: PaletteId) => void
  /** `reduced` is the visitor's system setting; `paused` is their choice in the footer. Either one stops particle motion. */
  motion: { paused: boolean; reduced: boolean; toggle: () => void }
}

const Context = createContext<Prefs | null>(null)
const PALETTE_KEY = 'aeolus-new-palette'

/** Wraps every page in the new site with the `.np` scope, the colour variables and the shared preferences. */
export function NewPrefsProvider({ children }: { children: ReactNode }) {
  const [paletteId, setPaletteId] = useState<PaletteId>('forest')
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    try { const saved = localStorage.getItem(PALETTE_KEY); if (saved === 'forest' || saved === 'ink') setPaletteId(saved) } catch {}
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  const setPalette = useCallback((id: PaletteId) => {
    setPaletteId(id)
    try { localStorage.setItem(PALETTE_KEY, id) } catch {}
  }, [])
  const toggle = useCallback(() => setPaused(value => !value), [])

  const palette = PALETTES.find(p => p.id === paletteId) ?? PALETTES[0]
  const value = useMemo<Prefs>(() => ({ palette, palettes: PALETTES, setPalette, motion: { paused, reduced, toggle } }), [palette, setPalette, paused, reduced, toggle])
  const style = { '--np-bg': palette.bg, '--np-star': palette.star, '--np-accent': palette.accent, '--np-deep': `color-mix(in srgb, ${palette.star} 50%, ${palette.bg})` } as CSSProperties

  return <Context.Provider value={value}><div className="np" data-np-root="" style={style}>{children}</div></Context.Provider>
}

export function useNewPrefs(): Prefs {
  const value = useContext(Context)
  if (!value) throw new Error('useNewPrefs must be used inside NewPrefsProvider')
  return value
}
