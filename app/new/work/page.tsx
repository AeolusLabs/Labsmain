import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import '../css/pages.css'
import { ParticleStage } from '@/components/new/particle-stage'
import { Panel, Story } from '@/components/new/story'
import { projects } from '@/components/new/content'

export const metadata: Metadata = { title: 'Work', description: 'Things we built: Tikvah, TLC Beauty Shop and Vib3Pulse.' }

export default function WorkPage() {
  return <>
    <ParticleStage scenes={['sky', 'sky', 'sky', 'sky']} />
    <Story>
      <Panel flow>
        <div className="np-work-head np-work-beat">
          <div className="np-work-words">
            <h1 className="np-h1">Things we built.</h1>
            <p className="np-lead">Three projects. Real work you can open.</p>
          </div>
        </div>
      </Panel>
      {projects.map((p, i) => <Panel flow key={p.slug} labelledBy={`np-work-${p.slug}`}>
        <div className={`np-work-beat${i % 2 === 1 ? ' np-work-beat--flip' : ''}`}>
          <div className="np-work-media">
            <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="(min-width: 900px) 56vw, 100vw" />
          </div>
          <div className="np-work-words">
            <h2 id={`np-work-${p.slug}`} className="np-h2">{p.name}</h2>
            <p className="np-lead">{p.line}</p>
            <p className="np-small">{p.kind}</p>
            <Link className="np-btn" href={`/new/work/${p.slug}`}>See {p.name}</Link>
          </div>
        </div>
      </Panel>)}
    </Story>
  </>
}
