import Image from 'next/image'
import Link from 'next/link'
import { PageShell } from '@/components/site-header'
import { Arrow, ButtonLink, ClosingLine, Eyebrow, TextLink } from '@/components/page-parts'

const expertise = [
  ['Web & mobile', 'Websites, customer portals and applications.'],
  ['Business systems', 'Custom tools, APIs and integrations.'],
  ['AI & automation', 'Less repetitive work, with human oversight.'],
]

export default function Home() {
  return <PageShell>
    <div className="intent-hero">
      <div><Eyebrow>Software development / Nigeria</Eyebrow><h1>Make room<br />for better.</h1></div>
      <div className="hero-support">
        <p>Websites, applications and systems built around the way your business works.</p>
        <p className="support-detail">We’re AeolusLabs. Two developers helping African businesses turn practical needs into useful software.</p>
        <ButtonLink href="/contact">Tell us what you’re building</ButtonLink>
      </div>
    </div>

    <section className="feature-story" aria-labelledby="feature-title">
      <div className="feature-heading"><Eyebrow>Selected client work</Eyebrow><TextLink href="/work">All work</TextLink></div>
      <div className="feature-layout">
        <Link className="feature-image" href="/work/tikvah"><Image src="/projects/tikvah/home-desktop.png" width={2560} height={1800} sizes="(max-width: 700px) 88vw, 780px" alt="Tikvah’s public homepage, introducing its private support service" unoptimized priority /></Link>
        <div className="feature-caption">
          <div><Eyebrow>Tikvah</Eyebrow><h2 id="feature-title">A place for <br />human connection.</h2><p>A complete emotional-support platform, delivered from frontend to backend.</p></div>
          <TextLink href="/work/tikvah">Explore the case study</TextLink>
        </div>
      </div>
    </section>

    <section className="expertise">
      <div><Eyebrow>How we can help</Eyebrow><h2>Start with the need.<br />Then choose the tools.</h2><p>You don’t need a technical brief before we can have a useful conversation.</p></div>
      <div className="expertise-list">{expertise.map(([title, text]) => <Link key={title} href="/solutions"><span><strong>{title}</strong><small>{text}</small></span><Arrow /></Link>)}</div>
    </section>

    <section className="working-note">
      <div><Eyebrow>A considered approach</Eyebrow><h2>Understand. Build. Keep improving.</h2></div>
      <p>We listen to how things work today, agree on a useful scope, and develop the solution with you involved.</p>
    </section>

    <ClosingLine title="What could work better?" action="Let’s talk" />
  </PageShell>
}
