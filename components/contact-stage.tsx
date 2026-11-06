'use client'

import { useState, type ReactNode } from 'react'
import { ContactPanel } from './contact-panel'
import { emptyValues, type EnquiryValues } from './enquiry-form'

const RING_RADIUS = 26
const RING_LENGTH = 2 * Math.PI * RING_RADIUS
const validEmail = /^\S+@\S+\.\S+$/

const rows = [
  { key: 'name', label: 'From', empty: 'Your name' },
  { key: 'email', label: 'Reply to', empty: 'Your email' },
  { key: 'need', label: 'Need', empty: 'What you need' },
  { key: 'challenge', label: 'Brief', empty: 'What you want to improve or build' },
] as const

/** A quiet echo of the form: the brief takes shape as the visitor writes. Decorative only, because the form itself carries every value. */
function BriefPreview({ values }: { values: EnquiryValues }) {
  const shown = { name: values.name.trim(), email: values.email.trim(), need: values.need, challenge: values.challenge.trim() }
  // A half-typed email is not shown or counted until it looks like an address.
  const text = { ...shown, email: validEmail.test(shown.email) ? shown.email : '' }
  const filled = rows.filter(row => text[row.key]).length
  const percent = Math.round((filled / rows.length) * 100)

  return <div className="brief-card" aria-hidden="true" data-reveal="" data-delay="80">
    <div className="brief-card-head">
      <div>
        <p className="brief-card-title">Your brief</p>
        <p className="brief-card-note">Builds as you write.</p>
      </div>
      <div className="brief-ring">
        <svg viewBox="0 0 64 64" focusable="false">
          <circle className="brief-ring-track" cx="32" cy="32" r={RING_RADIUS} />
          <circle className="brief-ring-value" cx="32" cy="32" r={RING_RADIUS} strokeDasharray={RING_LENGTH} strokeDashoffset={RING_LENGTH * (1 - filled / rows.length)} />
        </svg>
        <span>{percent}%</span>
      </div>
    </div>
    {rows.map(row => {
      const value = text[row.key]
      return <div className="brief-row" key={row.key}>
        <span className="brief-dot" data-filled={value ? 'true' : 'false'} />
        <div><div className="brief-label">{row.label}</div><div className="brief-value" data-filled={value ? 'true' : 'false'}>{value || row.empty}</div></div>
      </div>
    })}
  </div>
}

/** Form on the left; on the right the live brief followed by the server-rendered email and next-steps blocks. */
export function ContactStage({ assistantEnabled, children }: { assistantEnabled: boolean; children: ReactNode }) {
  const [values, setValues] = useState<EnquiryValues>(emptyValues)
  return <section className="studio-contact wrap" aria-label="Contact">
    <div data-reveal=""><ContactPanel assistantEnabled={assistantEnabled} onValues={setValues} /></div>
    <aside className="studio-contact-aside">
      <BriefPreview values={values} />
      {children}
    </aside>
  </section>
}
