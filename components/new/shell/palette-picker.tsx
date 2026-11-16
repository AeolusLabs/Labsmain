'use client'

import { useNewPrefs } from '../prefs'

export function PalettePicker() {
  const { palette, palettes, setPalette } = useNewPrefs()
  return (
    <div className="np-picker" role="group" aria-label="Colour combination">
      {palettes.map(p => (
        <button key={p.id} type="button" className="np-picker-btn" aria-label={`Colours: ${p.name}`} title={p.name}
          aria-pressed={p.id === palette.id} onClick={() => setPalette(p.id)}>
          <span style={{ background: p.bg }} /><span style={{ background: p.star }} /><span style={{ background: p.accent }} />
        </button>
      ))}
    </div>
  )
}
