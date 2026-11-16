'use client'

import { useRef, useState } from 'react'
import { ContactAssistant, type Draft } from './brief-assistant'
import { ContactEnquiryForm } from './enquiry-form'

/** With the assistant switched on, visitors choose how to start. Without it (no provider key), only the ordinary form shows. The form is always available. */
export function ContactPanel({ assistantEnabled }: { assistantEnabled: boolean }) {
  const [mode, setMode] = useState<'assistant' | 'form'>('form')
  const [draft, setDraft] = useState<Draft | null>(null)
  const [round, setRound] = useState(0)
  const note = useRef<HTMLParagraphElement>(null)

  if (!assistantEnabled) return <ContactEnquiryForm />

  function acceptDraft(next: Draft) {
    setDraft(next)
    setRound(value => value + 1)
    setMode('form')
    // Move the visitor to the review step and tell screen readers what happened.
    requestAnimationFrame(() => note.current?.focus())
  }

  return <div className="np-contact-panel">
    <div className="np-contact-switch" role="group" aria-label="How would you like to start?">
      <button type="button" aria-pressed={mode === 'form'} onClick={() => setMode('form')}>Write it yourself</button>
      <button type="button" aria-pressed={mode === 'assistant'} onClick={() => setMode('assistant')}>Talk it through with our assistant</button>
    </div>

    <div hidden={mode !== 'assistant'}><ContactAssistant onDraft={acceptDraft} /></div>

    <div hidden={mode !== 'form'}>
      {draft && <p className="np-contact-draft" ref={note} tabIndex={-1} role="status">We drafted this from your conversation. Please read it, change anything that isn’t right, add your details and send it when you’re happy. Nothing has been sent yet.</p>}
      <ContactEnquiryForm key={round} initialChallenge={draft?.brief} initialNeed={draft?.need} fromAssistant={Boolean(draft)} />
    </div>
  </div>
}
