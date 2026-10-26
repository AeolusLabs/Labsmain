'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import './possibility-studio.css'

const possibilities = [
  { key: 'workday', choice: 'A smoother workday', tag: 'Less admin. More room to grow.', title: 'Your workday, with the busywork taken out.', copy: 'Imagine incoming enquiries organised in one place, with the details ready when your team needs them.', product: 'Your workspace', heading: 'A little more headspace.', sub: 'Your enquiries, brought together.', toast: 'A clear next step.', detail: 'Your team stays in control.' },
  { key: 'product', choice: 'My own product', tag: 'That idea deserves a first version.', title: 'From “what if” to something people can use.', copy: 'A booking tool, a customer portal, your next app. Start with the part that matters, then build from real feedback.', product: 'Your next product', heading: 'Something worth coming back to.', sub: 'An example booking experience.', toast: 'Your idea, made tangible.', detail: 'A starting point for real feedback.' },
  { key: 'connect', choice: 'A connected business', tag: 'A clearer picture of your business.', title: 'All the moving parts. Finally, on the same page.', copy: 'Imagine the tools you already use sharing useful information, so your team spends less time chasing the latest update.', product: 'Your business, together', heading: 'See what needs your attention.', sub: 'An illustrative connected overview.', toast: 'Less chasing. More clarity.', detail: 'Connections shaped around your tools.' },
  { key: 'website', choice: 'A better first impression', tag: 'Make the first hello count.', title: 'A digital front door that feels like you.', copy: 'Give your business a clear, considered presence. Help people understand what you offer and feel confident taking the next step.', product: 'Your business online', heading: 'A first impression with purpose.', sub: 'An illustrative business website.', toast: 'A clearer next step.', detail: 'From curious visitor to conversation.' },
] as const

function MiniCard({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return <div className="mini-card"><small>{label}</small><strong>{title}</strong><small>{children}</small></div>
}

function ProductScene({ index }: { index: number }) {
  if (index === 0) return <>{[
    ['A', 'New project enquiry', 'Website · Details collected', 'Ready for review'],
    ['B', 'Booking request', 'Tuesday · Team calendar', 'Organised'],
    ['C', 'Customer follow-up', 'Response prepared', 'Your approval'],
  ].map(([initial, title, sub, status], row) => <div className="list-row" key={title}><div className="person"><span className="avatar">{initial}</span><div><strong>{title}</strong><small>{sub}</small></div></div><span className={`status${row === 1 ? ' blue' : ''}`}>{status}</span></div>)}</>
  if (index === 1) return <div className="mini-grid"><MiniCard label="EXPLORE" title="Find your fit.">Discover what works for you.</MiniCard><MiniCard label="YOUR SPACE" title="Make it yours.">A place to pick up where you left off.</MiniCard><div className="mini-card wide"><div><small>NEXT UP</small><strong>Your first booking</strong></div><span className="pill">Choose a time ↗</span></div></div>
  if (index === 2) return <><div className="mini-grid"><MiniCard label="CUSTOMER ENQUIRIES" title="Ready to follow up">Details from your website</MiniCard><MiniCard label="TEAM CALENDAR" title="Everything in view">Your upcoming bookings</MiniCard></div><div className="bars" aria-hidden="true">{[35, 60, 48, 80, 65, 95, 85].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}</div></>
  return <div className="site-preview"><small>GOOD WORK. CLEARLY PRESENTED.</small><h4>Something great starts here.</h4><span className="sample-action">Let’s make it happen ↗</span></div>
}

export function PossibilityStudio() {
  const [selected, setSelected] = useState(0)
  const [interacted, setInteracted] = useState(false)
  const item = possibilities[selected]

  return <section className="product-explorer" id="possibilities" aria-labelledby="possibilities-title"><div className="wrap">
    <div className="intro"><span className="kicker">YOUR AMBITION. A PLACE TO START.</span><h2 id="possibilities-title">What would you like<br />to <span>make possible?</span></h2><p>A little less friction. A completely new idea. Explore what the right software could open up for you.</p></div>
    <div className="selector" role="group" aria-label="Choose what you want to achieve">{possibilities.map((possibility, index) => <button type="button" key={possibility.key} aria-pressed={selected === index} aria-controls="possibility-stage" onClick={() => { setSelected(index); setInteracted(true) }}>{possibility.choice}</button>)}</div>
    <div className="studio stage" id="possibility-stage" data-scene={item.key}>
      <div className="story"><div aria-live="polite" aria-atomic="true"><span className="tag">{item.tag}</span><h3>{item.title}</h3><p>{item.copy}</p></div><Link className="cta" href="/contact">Let’s explore your idea <span aria-hidden="true">↗</span></Link></div>
      <div className="scene" key={item.key} data-animate={interacted} aria-hidden="true"><div className="app"><div className="app-top"><span className="app-brand"><i />{item.product}</span><span className="avatar">You</span></div><div className="app-body"><h4>{item.heading}</h4><p className="sub">{item.sub}</p><ProductScene index={selected} /></div></div><div className="toast"><span className="check">✓</span><div>{item.toast}<small>{item.detail}</small></div></div></div>
    </div>
    <div className="example"><span><i aria-hidden="true" />Illustrative interface · Built to show a possibility.</span><span>Your scope starts with a conversation.</span></div>
  </div></section>
}
