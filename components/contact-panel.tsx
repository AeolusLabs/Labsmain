'use client'

import { useRef, useState } from 'react'
import { BriefAssistant, type Draft } from './brief-assistant'
import { EnquiryForm, type EnquiryValues } from './enquiry-form'

// With the assistant switched on, visitors choose how to start. Without it (no API key), only the form shows.
export function ContactPanel({ assistantEnabled, onValues }: { assistantEnabled: boolean; onValues?: (values: EnquiryValues) => void }) {
  const [mode, setMode] = useState<'assistant' | 'form'>('form')
  const [draft, setDraft] = useState<Draft | null>(null)
  const [round, setRound] = useState(0)
  const note = useRef<HTMLParagraphElement>(null)

  if (!assistantEnabled) return <EnquiryForm onValues={onValues} />

  function acceptDraft(next: Draft) {
    setDraft(next)
    setRound(value => value + 1)
    setMode('form')
    // Move the visitor to the review step and tell screen readers what happened.
    requestAnimationFrame(() => note.current?.focus())
  }

  return <div className="contact-panel">
    <div className="mode-switch" role="group" aria-label="How would you like to start?">
      <button type="button" aria-pressed={mode === 'form'} onClick={() => setMode('form')}>Write it yourself</button>
      <button type="button" aria-pressed={mode === 'assistant'} onClick={() => setMode('assistant')}>Talk it through with our assistant</button>
    </div>

    <div hidden={mode !== 'assistant'}><BriefAssistant onDraft={acceptDraft} /></div>

    {mode === 'form' && <>
      {draft && <p className="draft-note" ref={note} tabIndex={-1} role="status">We drafted this from your conversation. Please read it, change anything that isn’t right, add your details and send it when you’re happy. Nothing has been sent yet.</p>}
      <EnquiryForm key={round} initialChallenge={draft?.brief} initialNeed={draft?.need} fromAssistant={Boolean(draft)} onValues={onValues} />
    </>}
  </div>
}
