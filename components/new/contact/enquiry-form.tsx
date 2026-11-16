'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { needOptions } from '@/lib/need-options'

type Status = 'idle' | 'loading' | 'prepared' | 'sent' | 'error'
type Field = 'name' | 'email' | 'challenge' | 'consent'
type Errors = Partial<Record<Field, string>>

// Same rules as POST /api/enquiries, so the visitor hears about a problem before sending.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_CHALLENGE = 20
const ORDER: readonly Field[] = ['name', 'email', 'challenge', 'consent']

function check(data: FormData): Errors {
  const text = (key: string) => String(data.get(key) ?? '').trim()
  const errors: Errors = {}
  if (!text('name')) errors.name = 'Please enter your name.'
  if (!emailPattern.test(text('email'))) errors.email = 'Please enter a valid email address.'
  if (text('challenge').length < MIN_CHALLENGE) errors.challenge = `Please write at least ${MIN_CHALLENGE} characters.`
  if (data.get('consent') !== 'yes') errors.consent = 'Please agree so we can reply to you.'
  return errors
}

/** The ordinary enquiry form. `initialChallenge` and `initialNeed` pre-fill it from an assistant draft that the visitor can still edit. */
export function ContactEnquiryForm({ initialChallenge = '', initialNeed, fromAssistant = false }: { initialChallenge?: string; initialNeed?: string; fromAssistant?: boolean }) {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [draft, setDraft] = useState('')
  const [fallback, setFallback] = useState<'failed' | 'unconfigured'>('unconfigured')
  const [errors, setErrors] = useState<Errors>({})
  const form = useRef<HTMLFormElement>(null)
  // Until the page is ready the button stays off, so an early press can never send the enquiry as a plain GET into the address bar.
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])

  function clear(field: Field) {
    setErrors(current => (current[field] ? { ...current, [field]: undefined } : current))
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const found = check(formData)
    setErrors(found)
    const first = ORDER.find(key => found[key])
    if (first) {
      const target = form.current?.elements.namedItem(first)
      if (target instanceof HTMLElement) target.focus()
      return
    }
    setStatus('loading')
    try {
      const response = await fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(formData)) })
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
    return <div className="np-contact-done" role="status">
      <p className="np-contact-done-title">{sent ? 'Your enquiry has been sent.' : 'Your enquiry is ready to email.'}</p>
      <p className="np-contact-note">{sent
        ? 'Thank you. We’ll reply using the email address you supplied.'
        : fallback === 'failed'
          ? 'We couldn’t send this directly just now. Nothing has been sent or saved. Open the prepared email below, then send it from your email app.'
          : 'Email delivery is not connected here yet. Nothing has been sent or saved. Open the prepared email below, then send it from your email app.'}</p>
      <div className="np-contact-actions">
        {!sent && <a className="np-btn np-contact-btn" href={draft}>Open prepared email</a>}
        <button type="button" className="np-contact-textbtn" onClick={() => { setErrors({}); setStatus('idle') }}>Start another enquiry</button>
      </div>
    </div>
  }

  const describe = (field: Field, extra?: string) => [errors[field] ? `np-contact-${field}-error` : '', extra].filter(Boolean).join(' ') || undefined

  return <form ref={form} className="np-contact-form" onSubmit={submit} method="post" noValidate aria-label="Enquiry form">
    <div className="np-contact-pair">
      <div className="np-contact-field">
        <label htmlFor="np-contact-name">Your name</label>
        <input id="np-contact-name" name="name" autoComplete="name" maxLength={100} required aria-required="true" aria-invalid={errors.name ? true : undefined} aria-describedby={describe('name')} onChange={() => clear('name')} />
        {errors.name && <p className="np-contact-error" id="np-contact-name-error">{errors.name}</p>}
      </div>
      <div className="np-contact-field">
        <label htmlFor="np-contact-email">Your email</label>
        <input id="np-contact-email" type="email" name="email" autoComplete="email" maxLength={254} placeholder="you@yourbusiness.com" required aria-required="true" aria-invalid={errors.email ? true : undefined} aria-describedby={describe('email')} onChange={() => clear('email')} />
        {errors.email && <p className="np-contact-error" id="np-contact-email-error">{errors.email}</p>}
      </div>
    </div>
    <div className="np-contact-field">
      <label htmlFor="np-contact-org">Business or organisation <span className="np-contact-optional">Optional</span></label>
      <input id="np-contact-org" name="organization" autoComplete="organization" maxLength={150} />
    </div>
    <div className="np-contact-field">
      <label htmlFor="np-contact-need">What do you need?</label>
      <select id="np-contact-need" name="need" defaultValue={initialNeed ?? needOptions[0]}>
        {needOptions.map(option => <option key={option}>{option}</option>)}
      </select>
    </div>
    <div className="np-contact-field">
      <label htmlFor="np-contact-challenge">What would you like to work on?</label>
      <textarea id="np-contact-challenge" name="challenge" maxLength={5000} rows={fromAssistant ? 12 : 6} defaultValue={initialChallenge} required aria-required="true" aria-invalid={errors.challenge ? true : undefined} aria-describedby={describe('challenge', 'np-contact-challenge-hint')} onChange={() => clear('challenge')} />
      <p className="np-contact-hint" id="np-contact-challenge-hint">Your idea, or the process you want to automate. Include the tools and manual steps involved.</p>
      {errors.challenge && <p className="np-contact-error" id="np-contact-challenge-error">{errors.challenge}</p>}
    </div>
    {fromAssistant && <input type="hidden" name="source" value="assistant" />}
    <div className="np-contact-trap" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="np-contact-field">
      <div className="np-contact-consent">
        <input id="np-contact-consent" type="checkbox" name="consent" value="yes" required aria-required="true" aria-invalid={errors.consent ? true : undefined} aria-describedby={describe('consent')} onChange={() => clear('consent')} />
        <label htmlFor="np-contact-consent">I agree that AeolusLabs may use these details to respond to my enquiry. <Link className="np-link" href="/new/privacy">Read the privacy notice.</Link></label>
      </div>
      {errors.consent && <p className="np-contact-error" id="np-contact-consent-error">{errors.consent}</p>}
    </div>
    {status === 'error' && <p className="np-contact-error np-contact-error--form" role="alert">{message}</p>}
    <div className="np-contact-actions">
      <button className="np-btn np-contact-btn" type="submit" disabled={!ready || status === 'loading'}>{status === 'loading' ? 'Preparing enquiry…' : 'Continue with enquiry'}</button>
    </div>
    <p className="np-contact-note">If email delivery is unavailable, you can send a prepared email from your own email app.</p>
  </form>
}
