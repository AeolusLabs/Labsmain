'use client'

import { useState } from 'react'
import Link from 'next/link'

const scenarios = [
  {
    "label": "Less repetition. More progress.",
    "title": "From an enquiry to the next step. Without all the copying and pasting.",
    "copy": "A workflow that captures incoming requests, organises the details and prepares a response for your team to review.",
    "flow": [
      "Request received",
      "Details organised",
      "Human review"
    ],
    "link": "Let’s explore your workflow",
    "choice": "Get the busywork off our plate"
  },
  {
    "label": "An idea with somewhere to go.",
    "title": "What if that idea became something people could actually use?",
    "copy": "Start with a focused web or mobile product. Shape the essential experience, build its supporting systems and learn from real use.",
    "flow": [
      "Your idea",
      "Working product",
      "Real feedback"
    ],
    "link": "Let’s explore your product",
    "choice": "Turn our idea into a product"
  },
  {
    "label": "Connected tools. A clearer picture.",
    "title": "One process. Even when your business uses five different tools.",
    "copy": "Connect the systems your team relies on so information can move between them, with clear rules and fewer manual handoffs.",
    "flow": [
      "Existing tools",
      "Connected data",
      "Clearer operations"
    ],
    "link": "Let’s explore your systems",
    "choice": "Make our systems talk"
  },
  {
    "label": "A first impression that leads somewhere.",
    "title": "A website that helps people understand you. And take the next step.",
    "copy": "Turn your offering into a clear, responsive experience, with useful journeys for enquiries, bookings or discovering what you do.",
    "flow": [
      "Discover you",
      "Understand the offer",
      "Take action"
    ],
    "link": "Let’s explore your website",
    "choice": "Build a better digital front door"
  }
]

export function PossibilityExplorer() {
 const [selected, setSelected] = useState(0)
 const item = scenarios[selected]
 return <div className="explorer"><div className="choices" role="group" aria-label="Explore a business challenge">{scenarios.map((scenario,index)=><button type="button" className="choice" key={scenario.choice} aria-pressed={selected===index} aria-controls="possibility-result" onClick={()=>setSelected(index)}><span><small>{String(index+1).padStart(2,'0')}</small>{scenario.choice}</span><span className="arrow" aria-hidden="true">↗</span></button>)}</div><div id="possibility-result" className="scenario" aria-live="polite" aria-atomic="true"><div className="eyebrow">Imagine / {item.label}</div><h3>{item.title}</h3><p>{item.copy}</p><div className="flow" aria-label="Example workflow">{item.flow.map((step,index)=><span className="flow-step" key={step}>{index>0&&<i aria-hidden="true">→</i>}<span>{step}</span></span>)}</div><Link href="/contact">{item.link} ↗</Link><p className="note">Illustrative possibility · Scope and feasibility start with a conversation.</p></div></div>
}
