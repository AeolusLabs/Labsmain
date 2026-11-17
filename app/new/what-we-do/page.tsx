import type { Metadata } from 'next'
import Link from 'next/link'
import '../css/pages.css'
import { ParticleStage } from '@/components/new/particle-stage'
import { Panel, Story } from '@/components/new/story'

export const metadata: Metadata = { title: 'What we do', description: 'Build your product. Automate your work. Connect your tools. Keep it running.' }

const lines = [
  ['Build your product.', 'Web and mobile products, with AI built in where it helps.'],
  ['Automate your work.', 'Link repeat tasks into workflows. People check the steps we agree.'],
  ['Connect your tools.', 'Bring your tools and data together, with APIs and databases.'],
  ['Keep it running.', 'Ongoing care, support and improvements as your needs change.'],
] as const
const steps = [
  ['Listen.', 'Tell us your idea, your tools and what gets in the way.'],
  ['Agree the plan.', 'Decide what to build and how you will judge it.'],
  ['Build together.', 'Stay involved and review the work as it takes shape.'],
  ['Plan what’s next.', 'Agree handover, support and future improvements.'],
] as const

export default function WhatWeDo() {
  return <>
    <ParticleStage />
    <Story still>
      <Panel flow>
        <div className="np-wwd-block">
          <h1 className="np-h1">What we do.</h1>
          <p className="np-lead">AI products and automation, built around your business.</p>
        </div>
      </Panel>
      <Panel flow labelledBy="np-wwd-offer">
        <div className="np-wwd-block">
          <h2 id="np-wwd-offer" className="np-visually-hidden">What we offer</h2>
          <ul className="np-wwd-list">{lines.map(([t, s]) => <li key={t}><h3 className="np-h3">{t}</h3><p className="np-lead">{s}</p></li>)}</ul>
        </div>
      </Panel>
      <Panel flow labelledBy="np-wwd-steps">
        <div className="np-wwd-block">
          <h2 id="np-wwd-steps" className="np-visually-hidden">How we work</h2>
          <ol className="np-wwd-list">{steps.map(([t, s]) => <li key={t}><h3 className="np-h3">{t}</h3><p className="np-lead">{s}</p></li>)}</ol>
        </div>
      </Panel>
      <Panel flow labelledBy="np-wwd-close">
        <div className="np-wwd-block">
          <h2 id="np-wwd-close" className="np-h2">Start with your business need.</h2>
          <Link className="np-btn" href="/new/contact">Start a conversation</Link>
        </div>
      </Panel>
    </Story>
  </>
}
