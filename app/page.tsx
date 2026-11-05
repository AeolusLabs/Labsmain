import Link from 'next/link'
import { PageShell } from '@/components/site-header'
import { Arrow, ButtonLink, TextLink } from '@/components/page-parts'
import { TikvahCanvas } from '@/components/tikvah-canvas'
import { HeroEntrance } from '@/components/hero-entrance'
import { Reveal } from '@/components/reveal'

const expertise = [
  ['Web & mobile', 'Websites, customer portals and applications.'],
  ['Business systems', 'Custom tools, APIs and integrations.'],
  ['AI & automation', 'Less repetitive work, with human oversight.'],
]

export default function Home() {
  return <PageShell bare>
    <div className="home">
      <div className="wrap intent-hero">
        <HeroEntrance><h1>Make room<br />for better.</h1></HeroEntrance>
        <div className="hero-support">
          <p>Websites, applications and systems built around the way your business works.</p>
          <p className="support-detail">We’re AeolusLabs, two software developers in Nigeria helping African businesses turn practical needs into useful software.</p>
          <ButtonLink href="/contact">Tell us what you’re building</ButtonLink>
        </div>
      </div>

      <section className="wrap feature-story" aria-labelledby="feature-title">
        <div className="feature-heading"><span className="plain-label">Selected client work</span></div>
        <div className="feature-layout">
          <TikvahCanvas />
          <Reveal delay={120}>
            <div className="feature-caption">
              <div><h2 id="feature-title">Tikvah, a place for human connection.</h2><p>A complete emotional-support platform, delivered from frontend to backend.</p></div>
              <div className="caption-links"><TextLink href="/work/tikvah">Explore the case study</TextLink><TextLink href="/work">All work</TextLink></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="expertise" aria-labelledby="help-title"><div className="wrap expertise-inner">
        <div>
          <Reveal><h2 id="help-title">Start with the need. Then choose the tools.</h2></Reveal>
          <Reveal delay={90}><p>You don’t need a technical brief before we can have a useful conversation. We listen to how things work today, agree on a useful scope, and develop the solution with you involved.</p></Reveal>
          <Reveal delay={160}><p className="lead-line">Understand. Build. Keep improving.</p></Reveal>
        </div>
        <div className="expertise-list">{expertise.map(([title, text], i) => <Reveal key={title} delay={i * 80}>
          <Link href="/solutions"><span><strong>{title}</strong><small>{text}</small></span><Arrow /></Link>
        </Reveal>)}</div>
      </div></section>

      <section className="wrap closing-line" aria-labelledby="close-title">
        <Reveal><h2 id="close-title">What could work better?</h2></Reveal>
        <Reveal delay={120}><ButtonLink href="/contact">Let’s talk</ButtonLink></Reveal>
      </section>
    </div>
  </PageShell>
}
