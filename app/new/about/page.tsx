import type { Metadata } from 'next'
import Link from 'next/link'
import '../css/pages.css'
import { ParticleStage } from '@/components/new/particle-stage'
import { Panel, Story } from '@/components/new/story'
import { founders, promises } from '@/components/new/content'

export const metadata: Metadata = { title: 'About', description: 'Two founders. One goal: help African businesses use AI that fits how they work.' }

export default function About() {
  return <>
    <ParticleStage scenes={['sky', 'sky', 'sky']} />
    <Story>
      <Panel flow>
        <div className="np-about-block">
          <h1 className="np-h1">Two founders. One goal.</h1>
          <p className="np-lead">Help African businesses use AI that fits how they work.</p>
          <ul className="np-about-names" aria-label="Founders">{founders.map(f => <li key={f}>{f}</li>)}</ul>
        </div>
      </Panel>
      <Panel flow labelledBy="np-about-promises">
        <div className="np-about-block">
          <h2 id="np-about-promises" className="np-visually-hidden">Our promises</h2>
          <ul className="np-about-list">{promises.map(([t, s]) => <li key={t}><h3 className="np-h3">{t}</h3><p className="np-lead">{s}</p></li>)}</ul>
        </div>
      </Panel>
      <Panel flow labelledBy="np-about-close">
        <div className="np-about-block">
          <h2 id="np-about-close" className="np-h2">What could you build or automate?</h2>
          <Link className="np-btn" href="/new/contact">Start a conversation</Link>
        </div>
      </Panel>
    </Story>
  </>
}
