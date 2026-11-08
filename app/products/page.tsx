import Link from 'next/link'
import { PageShell } from '@/components/site-header'
import { ClosingLine, Eyebrow, TextLink } from '@/components/page-parts'
import { productUrl } from '@/lib/content'
import { PortfolioCapture } from '@/components/portfolio-capture'

export const metadata = { title: 'Our products', description: 'Explore products developed and owned by AeolusLabs, starting with Vib3Pulse.' }

export default function Products() {
  return <PageShell>
    <div className="page-opening">
      <Eyebrow>Our products</Eyebrow>
      <h1>Our ideas,<br />built into products.</h1>
      <p>We build products of our own alongside our work for businesses. Each starts with a need we want to explore.</p>
    </div>

    <article className="work-entry">
      <Link className="work-image work-vib3" href="/work/vib3pulse" aria-label="Vib3Pulse: brand artwork"><span>Vib3Pulse</span><strong>Find<br />Your Vib3.</strong><small>Events. Tickets. Community.</small></Link>
      <div className="work-brief">
        <Eyebrow>AeolusLabs-owned / Web application</Eyebrow>
        <h2>Vib3Pulse</h2>
        <p>A platform bringing together event listings, ticketing and social planning.</p>
        <p><TextLink href={productUrl} external>Visit Vib3Pulse</TextLink></p>
        <p><TextLink href="/work/vib3pulse">About the project</TextLink></p>
      </div>
    </article>

    <section aria-label="Vib3Pulse public interface">
      <PortfolioCapture src="/projects/vib3pulse/home-desktop.jpg" alt="Vib3Pulse’s public landing page with event categories and its sample ticket demonstration" caption="Actual public interface, captured 8 November 2026. The event and ticket shown are sample content within the product. The lime panel above is brand artwork." />
    </section>

    <ClosingLine title="Ready to build your product?" action="Discuss your idea" />
  </PageShell>
}
