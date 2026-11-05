import { imageSizes } from '@/design-system/media'
import Image from 'next/image'
import Link from 'next/link'
import { PageShell } from '@/components/site-header'
import { ClosingLine, Eyebrow, TextLink } from '@/components/page-parts'

export const metadata = { title: 'Our work', description: 'Explore software built by AeolusLabs.' }

export default function Work() {
  return <PageShell>
    <div className="page-opening">
      <Eyebrow>Our work</Eyebrow>
      <h1>Built around<br />real needs.</h1>
      <p>Client platforms and products of our own. The idea, our contribution, and the experience it became.</p>
    </div>

    <article className="work-entry">
      <Link className="work-image" href="/work/tikvah"><Image src="/projects/tikvah/home-desktop.png" width={2560} height={1800} sizes={imageSizes.work} alt="Tikvah’s public website" unoptimized /></Link>
      <div className="work-brief">
        <Eyebrow>Client project</Eyebrow>
        <h2>Tikvah</h2>
        <p>A private emotional-support platform organised around correspondence with a human team.</p>
        <dl><div><dt>Our role</dt><dd>Frontend &amp; backend</dd></div><div><dt>Delivered</dt><dd>Complete web application</dd></div></dl>
        <TextLink href="/work/tikvah">View the case study</TextLink>
      </div>
    </article>

    <article className="work-entry">
      <Link className="work-image work-vib3" href="/work/vib3pulse" aria-label="Vib3Pulse: brand artwork"><span>Vib3Pulse</span><strong>Find<br />Your Vib3.</strong><small>Events. Tickets. Community.</small></Link>
      <div className="work-brief">
        <Eyebrow>Our own product</Eyebrow>
        <h2>Vib3Pulse</h2>
        <p>Bringing event discovery, ticketing and social planning into one platform.</p>
        <dl><div><dt>Type</dt><dd>Owned web product</dd></div><div><dt>Focus</dt><dd>Events &amp; community</dd></div></dl>
        <TextLink href="/work/vib3pulse">Explore the project</TextLink>
        <p className="sample-note">Brand artwork shown; interface imagery is still pending.</p>
      </div>
    </article>

    <ClosingLine title="Have something in mind?" action="Bring us your idea" />
  </PageShell>
}
