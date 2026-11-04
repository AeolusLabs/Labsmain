import { notFound } from 'next/navigation'
import { PageShell } from '@/components/site-header'
import { TikvahCaseStudy } from '@/components/tikvah-case-study'
import { ButtonLink, ClosingLine, Eyebrow } from '@/components/page-parts'
import { productUrl } from '@/lib/content'

type Params = { params: Promise<{ slug: string }> }

const meta: Record<string, { title: string; description: string }> = {
  tikvah: { title: 'Tikvah', description: 'A complete client web application, including frontend and backend, built by AeolusLabs.' },
  vib3pulse: { title: 'Vib3Pulse', description: 'Event discovery, ticketing and social planning, built and owned by AeolusLabs.' },
}

const vib3Features = [
  'Event discovery across music, food, tech, arts, sports and wellness',
  'Ticketing with QR codes and a digital wallet',
  'Social planning through chats, polls and stories',
  'Safety Buddy, check-ins and SOS tools',
]

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
  if (slug !== 'vib3pulse') notFound()

  return <PageShell>
    <div className="page-opening">
      <Eyebrow>Our own product</Eyebrow>
      <h1>Vib3Pulse</h1>
      <p>An AeolusLabs-owned web platform bringing events, tickets and social planning together.</p>
    </div>

    <div className="work-vib3 vib3-case"><span>Every city has a pulse.</span><strong>Find Your Vib3.</strong><small>Events. Tickets. Community.</small></div>

    <section className="case-split">
      <div><Eyebrow>The idea</Eyebrow><h2>A more connected way to go out.</h2></div>
      <div>
        <p className="lead">Vib3Pulse brings event discovery and planning into a shared experience for people looking for their next outing.</p>
        <p>The public experience includes upcoming event listings, categories and entry points for attendees and organisers.</p>
      </div>
    </section>

    <section className="case-split">
      <div><Eyebrow>What it offers</Eyebrow><h2>One platform.<br />Several possibilities.</h2></div>
      <div>
        <p>The product presents these capabilities:</p>
        <ul className="feature-list">{vib3Features.map(item => <li key={item}>{item}</li>)}</ul>
        <p className="evidence-note">Availability of individual features is shown within the product. Brand artwork is shown here; interface imagery is still pending.</p>
        <ButtonLink href={productUrl}>Visit Vib3Pulse</ButtonLink>
      </div>
    </section>

    <ClosingLine title="Have an idea of your own?" action="Tell us about it" />
  </PageShell>
}
