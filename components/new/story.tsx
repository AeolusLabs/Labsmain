import type { ReactNode } from 'react'
import type { SceneId } from './types'

/** Server-safe building blocks for the scroll story. See the DOM contract in ./types.ts. */
/** `still` is for plain pages that only borrow the story's layout: the particle stage then draws a calm sky and does no scroll work. */
export function Story({ children, className = '', still = false }: { children: ReactNode; className?: string; still?: boolean }) {
  return <div data-np-story={still ? undefined : ''} className={`np-story ${className}`.trim()}>{children}</div>
}

export function Panel({ side = 'left', flow = false, scene = 'sky', labelledBy, className = '', children }: {
  /** Which side the words sit on, on wide screens. The shape takes the other side. */
  side?: 'left' | 'right'
  /** Ordinary scrolling content that the stage does not fade or measure. */
  flow?: boolean
  /** The shape the particles make while this panel is on screen. Give flow panels 'sky'. */
  scene?: SceneId
  labelledBy?: string
  className?: string
  children: ReactNode
}) {
  const classes = `np-panel${side === 'right' ? ' np-panel--right' : ''}${flow ? ' np-panel--flow' : ''} ${className}`.trim()
  return <section data-np-panel={flow ? 'flow' : 'story'} data-np-scene={scene} className={classes} aria-labelledby={labelledBy}>
    <span className="np-snap-anchor" aria-hidden="true" />
    {flow ? <div className="np-flow">{children}</div> : <div data-np-copy="" className="np-copy">{children}</div>}
  </section>
}
