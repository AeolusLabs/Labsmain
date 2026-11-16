import type { ReactNode } from 'react'

/** Server-safe building blocks for the scroll story. See the DOM contract in ./types.ts. */
export function Story({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div data-np-story="" className={`np-story ${className}`.trim()}>{children}</div>
}

export function Panel({ side = 'left', flow = false, labelledBy, className = '', children }: {
  /** Which side the words sit on, on wide screens. The shape takes the other side. */
  side?: 'left' | 'right'
  /** Ordinary scrolling content that the stage does not fade or measure. */
  flow?: boolean
  labelledBy?: string
  className?: string
  children: ReactNode
}) {
  const classes = `np-panel${side === 'right' ? ' np-panel--right' : ''}${flow ? ' np-panel--flow' : ''} ${className}`.trim()
  return <section data-np-panel={flow ? 'flow' : 'story'} className={classes} aria-labelledby={labelledBy}>
    {flow ? <div className="np-flow">{children}</div> : <div data-np-copy="" className="np-copy">{children}</div>}
  </section>
}
