import { notFound } from 'next/navigation'
import { TikvahCaseStudy } from '@/components/tikvah-case-study'
import { TlcCaseStudy } from '@/components/tlc-case-study'
import { Vib3PulseCaseStudy } from '@/components/vib3pulse-case-study'

type Params = { params: Promise<{ slug: string }> }

const meta: Record<string, { title: string; description: string }> = {
  tikvah: { title: 'Tikvah', description: 'A complete client web application, including frontend and backend, built by AeolusLabs.' },
  vib3pulse: { title: 'Vib3Pulse', description: 'Event discovery, ticketing and social planning, built and owned by AeolusLabs.' },
  'tlc-beauty-shop': { title: 'TLC Beauty Shop / TheLashCode', description: 'An end-to-end salon website and appointment booking experience delivered by AeolusLabs.' },
}

export function generateStaticParams() {
  return Object.keys(meta).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params
  return meta[slug] ?? { title: 'Project' }
}

export default async function Project({ params }: Params) {
  const { slug } = await params
  if (slug === 'tikvah') return <TikvahCaseStudy />
  if (slug === 'tlc-beauty-shop') return <TlcCaseStudy />
  if (slug === 'vib3pulse') return <Vib3PulseCaseStudy />
  notFound()
}
