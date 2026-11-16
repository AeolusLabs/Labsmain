import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import '../../css/pages.css'
import { ParticleStage } from '@/components/new/particle-stage'
import { projects } from '@/components/new/content'
import { caseNotes } from '@/components/new/pages/case-data'

type Params = { slug: string }

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const p = projects.find(x => x.slug === slug)
  if (!p) return {}
  return { title: p.name, description: `${p.name}. ${p.line}` }
}

export default async function CasePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const p = projects.find(x => x.slug === slug)
  if (!p) notFound()
  return <div className="np-page">
    <ParticleStage scenes={['sky']} />
    <article className="np-case">
      <div className="np-case-words">
        <h1 className="np-h1">{p.name}</h1>
        <p className="np-lead">{p.line}</p>
      </div>
      <div className="np-case-media">
        <div className="np-case-main">
          <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="(min-width: 900px) 70vw, 100vw" priority />
        </div>
        {p.phone && <div className="np-case-phone">
          <Image src={p.phone.src} alt={p.phone.alt} width={p.phone.width} height={p.phone.height} sizes="(min-width: 900px) 22vw, 55vw" />
        </div>}
      </div>
      <div className="np-case-did">
        <p className="np-small">What we did</p>
        <p className="np-lead">{p.role}</p>
      </div>
      <div className="np-case-links">
        <a className="np-link" href={p.liveUrl} target="_blank" rel="noopener noreferrer">Visit {p.name}</a>
        <Link className="np-link" href="/new/work">Back to all work</Link>
      </div>
      <ul className="np-case-notes" aria-label="Honest notes">
        {caseNotes[p.slug].map(n => <li key={n} className="np-small">{n}</li>)}
      </ul>
    </article>
  </div>
}
