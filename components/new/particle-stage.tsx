'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createStage, type Stage } from './engine/stage'
import { useNewPrefs } from './prefs'
import type { SceneId } from './types'

const CANVAS_STYLE: CSSProperties = { position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', display: 'block' }

/**
 * The fixed full-screen particle canvas. One scene per `[data-np-story]` panel, in order; with no story on the page
 * (scenes={['sky']}) it is a calm ambient sky. See the DOM contract in ./types.ts and the engine in ./engine.
 */
export function ParticleStage({ scenes }: { scenes: readonly SceneId[] }) {
  const { palette, motion } = useNewPrefs()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stageRef = useRef<Stage | null>(null)
  // A canvas whose GL context was lost (strict-mode remount, or the browser took it) cannot be reused: a new key makes a new canvas.
  const [generation, setGeneration] = useState(0)

  // The latest preferences, read when a stage is (re)built without making the stage depend on them.
  const prefs = useRef({ palette, off: motion.paused || motion.reduced, reduced: motion.reduced })
  prefs.current = { palette, off: motion.paused || motion.reduced, reduced: motion.reduced }

  const scenesKey = scenes.join('|')
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const list = scenesKey ? (scenesKey.split('|') as SceneId[]) : []
    const result = createStage(canvas, {
      scenes: list,
      palette: prefs.current.palette,
      motionOff: prefs.current.off,
      reduced: prefs.current.reduced,
      onContextLost: () => setGeneration(g => g + 1),
    })
    if (result.status === 'stale') { setGeneration(g => g + 1); return }
    if (result.status === 'nogl') return result.cleanup
    stageRef.current = result.stage
    return () => { result.stage.dispose(); stageRef.current = null }
  }, [scenesKey, generation])

  // Palette and motion changes update uniforms only; GPU data is not rebuilt.
  useEffect(() => { stageRef.current?.setPalette(palette) }, [palette])
  useEffect(() => { stageRef.current?.setMotion(motion.paused || motion.reduced, motion.reduced) }, [motion.paused, motion.reduced])

  return <canvas key={generation} ref={canvasRef} className="np-canvas" aria-hidden="true" style={CANVAS_STYLE} />
}
