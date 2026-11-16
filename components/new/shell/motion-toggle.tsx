'use client'

import { useNewPrefs } from '../prefs'

export function MotionToggle() {
  const { motion } = useNewPrefs()
  if (motion.reduced) return <button type="button" className="np-foot-btn" disabled>Motion reduced by your settings</button>
  return <button type="button" className="np-foot-btn" aria-pressed={motion.paused} onClick={motion.toggle}>{motion.paused ? 'Resume motion' : 'Pause motion'}</button>
}
