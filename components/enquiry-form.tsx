'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Arrow } from './page-parts'
import { needOptions } from '@/lib/need-options'

type Status = 'idle' | 'loading' | 'prepared' | 'sent' | 'error'

/** What the visitor has entered so far, reported upward so the page can show a live brief. `need` stays empty until it has been chosen or drafted. */
export type EnquiryValues = { name: string; email: string; need: string; challenge: string }
export const emptyValues: EnquiryValues = { name: '', email: '', need: '', challenge: '' }

// `initialChallenge` and `initialNeed` pre-fill the form from a draft brief the visitor can still edit.
export function EnquiryForm({ initialChallenge = '', initialNeed, fromAssistant = false, onValues }: { initialChallenge?: string; initialNeed?: string; fromAssistant?: boolean; onValues?: (values: EnquiryValues) => void }) {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [draft, setDraft] = useState('')
  const [fallback, setFallback] = useState<'failed' | 'unconfigured'>('unconfigured')
  const needChosen = useRef(Boolean(initialNeed))

  // A draft from the assistant arrives pre-filled, so tell the page about it straight away.
  useEffect(() => {
    if (initialChallenge || initialNeed) onValues?.({ ...emptyValues, need: initialNeed ?? '', challenge: initialChallenge })
    // Runs once per mount; the parent remounts this form with a new key for each draft.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function report(form: HTMLFormElement, field?: string) {
    if (field === 'need') needChosen.current = true
    const data = new FormData(form)
    const text = (name: string) => String(data.get(name) ?? '')
    onValues?.({ name: text('name'), email: text('email'), need: needChosen.current ? text('need') : '', challenge: text('challenge') })
  }

  function restart() {
    needChosen.current = false
    onValues?.(emptyValues)
    setStatus('idle')
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setStatus('loading')
    try {
      const response = await fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Your enquiry could not be sent. Please try again or email us directly.')
      setDraft(result.mailto || '')
      setFallback(result.reason === 'delivery_failed' ? 'failed' : 'unconfigured')
      setStatus(result.mode === 'prepared' ? 'prepared' : 'sent')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Please try again.')
      setStatus('error')
    }
  }

  if (status === 'prepared' || status === 'sent') {
    const sent = status === 'sent'
    return <div className="form-success" role="status">
      <h2>{sent ? 'Your enquiry has been sent.' : 'Your enquiry is ready to email.'}</h2>
      <p>{sent
        ? 'Thank you. We’ll reply using the email address you supplied.'
        : fallback === 'failed'
          ? 'We couldn’t send this directly just now. Nothing has been sent or saved. Open the prepared email below, then send it from your email app.'
          : 'Email delivery is not connected here yet. Nothing has been sent or saved. Open the prepared email below, then send it from your email app.'}</p>
      {!sent && <a className="button" href={draft}>Open prepared email <Arrow /></a>}
      <button type="button" className="text-link" onClick={restart}>Start another enquiry</button>
    </div>
  }

  return <form className="form" onSubmit={submit} onChange={event => report(event.currentTarget, (event.target as HTMLElement).getAttribute('name') ?? undefined)}>
    <div className="field-pair">
      <label>Your name<input required name="name" autoComplete="name" maxLength={100} placeholder="Your name" /></label>
      <label>Your email<input required type="email" name="email" autoComplete="email" maxLength={254} placeholder="you@yourbusiness.com" /></label>
    </div>
    <label>Business or organisation <span className="optional">Optional</span><input name="organization" autoComplete="organization" maxLength={150} placeholder="Who are you building for?" /></label>
    <label>What do you need?
      <select name="need" defaultValue={initialNeed ?? needOptions[0]}>
        {needOptions.map(option => <option key={option}>{option}</option>)}
      </select>
    </label>
    <label>What would you like to work on?<textarea required name="challenge" minLength={20} maxLength={5000} rows={fromAssistant ? 12 : 6} defaultValue={initialChallenge} placeholder="The idea, the recurring problem, or what you wish worked better." /></label>
    {fromAssistant && <input type="hidden" name="source" value="assistant" />}
    <div className="honeypot" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="consent"><input required type="checkbox" name="consent" value="yes" /><span>I agree that AeolusLabs may use these details to respond to my enquiry. <Link href="/privacy">Read the privacy notice.</Link></span></label>
    {status === 'error' && <p className="form-error" role="alert">{message}</p>}
    <div className="form-actions">
      <span data-magnet=""><button className="button" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Preparing enquiry…' : <>Continue with enquiry <Arrow /></>}</button></span>
      <span className="form-hint">No finished brief required.</span>
    </div>
    <p className="small">If email delivery is unavailable, you can send a prepared email from your own email app.</p>
  </form>
}
