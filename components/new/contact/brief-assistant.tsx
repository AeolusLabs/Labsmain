'use client'

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { MAX_USER_CHARS } from '@/lib/brief-assistant-limits'

type Message = { role: 'user' | 'assistant'; content: string }
export type Draft = { brief: string; need: string }

const greeting = 'Hello. I’m an AI assistant, not a person. Tell me roughly what you’re trying to sort out, in your own words, and I’ll ask a few questions to turn it into a clear brief for the AeolusLabs team. Nothing is sent until you choose to send it.'
const starters = ['I have an idea for an AI product', 'I want to automate repetitive work', 'Our business tools need to connect', 'I need help choosing where AI fits']

/** Talks to POST /api/brief. It only ever produces a draft; the visitor reviews and sends it through the ordinary form. */
export function ContactAssistant({ onDraft }: { onDraft: (draft: Draft) => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const field = useRef<HTMLTextAreaElement>(null)
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => { end.current?.scrollIntoView({ block: 'nearest' }) }, [messages, busy])

  // The box is switched off while waiting for a reply, so focus returns once it is available again.
  useEffect(() => {
    if (!busy && (messages.length > 0 || error) && field.current?.getClientRects().length) field.current.focus({ preventScroll: true })
  }, [busy, messages.length, error])

  async function send(text: string, finish = false) {
    const content = text.trim()
    if (busy || !content) return
    const next = [...messages, { role: 'user' as const, content }]
    setMessages(next)
    setInput('')
    setError('')
    setBusy(true)
    try {
      const response = await fetch('/api/brief', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next, finish }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Something went wrong. You can use the form instead.')
      if (result.type === 'brief') {
        setMessages([...next, { role: 'assistant', content: result.message }])
        onDraft({ brief: result.brief, need: result.need })
      } else {
        setMessages([...next, { role: 'assistant', content: result.reply }])
      }
    } catch (caught) {
      // Put things back as they were so the visitor can simply press Send again.
      setMessages(messages)
      setInput(content)
      setError(caught instanceof Error ? caught.message : 'Something went wrong. You can use the form instead.')
    } finally {
      setBusy(false)
    }
  }

  function wrapUp() {
    void send(input.trim() || 'That’s enough, please write my brief.', true)
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    void send(input)
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      void send(input)
    }
  }

  const started = messages.some(m => m.role === 'user')

  return <div className="np-contact-assistant">
    <div className="np-contact-log" tabIndex={0} role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversation with the AeolusLabs assistant">
      <div className="np-contact-turn"><span className="np-contact-who">Assistant</span><p>{greeting}</p></div>
      {messages.map((message, index) => <div className={`np-contact-turn${message.role === 'user' ? ' np-contact-turn--you' : ''}`} key={index}><span className="np-contact-who">{message.role === 'user' ? 'You' : 'Assistant'}</span><p>{message.content}</p></div>)}
      {busy && <div className="np-contact-turn" role="status"><span className="np-contact-who">Assistant</span><p>Thinking…</p></div>}
      <div ref={end} />
    </div>

    {!started && <div className="np-contact-starters" role="group" aria-label="Ways to start">{starters.map(text => <button type="button" key={text} onClick={() => void send(text)} disabled={busy}>{text}</button>)}</div>}

    {error && <p className="np-contact-error np-contact-error--form" role="alert">{error}</p>}

    <form className="np-contact-chat" onSubmit={submit}>
      <label className="np-visually-hidden" htmlFor="np-contact-chat-input">Your message</label>
      <textarea id="np-contact-chat-input" ref={field} value={input} onChange={event => setInput(event.target.value)} onKeyDown={onKeyDown} maxLength={MAX_USER_CHARS} rows={3} placeholder="Type your answer. Press Enter to send." disabled={busy} />
      <div className="np-contact-actions">
        <button className="np-btn np-contact-btn" type="submit" disabled={busy || !input.trim()}>Send</button>
        {started && <button className="np-contact-textbtn" type="button" onClick={wrapUp} disabled={busy}>That’s enough, write my brief</button>}
      </div>
      <p className="np-contact-note">Please don’t share passwords, payment details or ID numbers. Your messages are processed by our AI provider to write replies, and are not saved by us.</p>
    </form>
  </div>
}
