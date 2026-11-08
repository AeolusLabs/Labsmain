import Link from 'next/link'
import { Arrow } from '@/components/page-parts'
import { HeroLines, StudioClosing, StudioPage } from '@/components/studio-parts'

export const metadata = { title: 'Solutions', description: 'AI-powered products, automation systems and integrations built around your business.' }

const capabilities = [
  { label: 'Turn an idea into a product', title: 'AI-powered products', text: 'Build AI into a product that serves a clear business need, with agreed human oversight.', items: ['Web & mobile products', 'AI integrations', 'Customer & team tools'] },
  { label: 'Move work between steps', title: 'Automation systems', text: 'Connect repeatable tasks into workflows, with clear checkpoints and human oversight where agreed.', items: ['Business workflows', 'Custom agents', 'Internal systems'] },
  { label: 'Connect what you already use', title: 'Integrations', text: 'Bring your tools and data together so the product or workflow fits your operations.', items: ['Backend development & APIs', 'Databases', 'Business tool integrations'] },
  { label: 'Keep your software useful', title: 'Maintenance & support', text: 'Ongoing care, technical support and improvements as your needs evolve.', items: [] as string[] },
]
const engagement = [
  ['Understand the need.', 'Bring your idea or describe the work your team repeats, the tools you use and what gets in the way. We start by understanding the goal and constraints.'],
  ['Agree a scope.', 'Work through what to build, what it needs to connect to and how you will judge the result. For AI and automation, agree where people review or make decisions.'],
  ['Build and review.', 'Stay involved as the product or workflow takes shape. Review the work against the agreed need and discuss changes before they become new scope.'],
  ['Plan the next step.', 'Agree what handover, ongoing support and future improvements should cover. Keep the next phase tied to how the system will be used.'],
]

export default function Solutions() {
  return <StudioPage>
    <section className="page-hero wrap" aria-labelledby="solutions-title">
      <p className="eyebrow" data-reveal="">Capabilities</p>
      <h1 id="solutions-title" className="page-hero-title page-hero-title--solutions"><HeroLines lines={['Build your product.', <>Automate your <em>processes.</em></>]} /></h1>
      <p className="page-hero-lead page-hero-lead--wide" data-reveal="" data-delay="500">AI-powered products and automation systems, shaped around what your business needs to do. We start with your goals, processes and constraints.</p>
    </section>

    <section className="solutions-map wrap" aria-labelledby="map-title">
      <div className="solutions-map-head">
        <div data-reveal=""><p className="eyebrow">Systems &amp; integrations</p><h2 id="map-title">Connect the tools your team already uses.</h2></div>
        <p className="solutions-map-note" data-reveal="" data-delay="150">Automation depends on the connections between your tools, data and people. Explore how the parts fit together.</p>
      </div>
      <div className="solutions-map-stage" data-reveal="" data-delay="100">
        <canvas data-network="" role="img" aria-label="Diagram: websites, mobile apps, customer portals, APIs, databases, AI workflows and business tools all connect through your business." />
      </div>
    </section>

    <section className="solutions-capabilities surface-light" aria-labelledby="begin-title"><div className="wrap solutions-capabilities-inner">
      <div className="solutions-intro" data-reveal="">
        <h2 id="begin-title">What needs to change?</h2>
        <p>Tell us about the product you have in mind or the work your team repeats. We’ll help define a practical starting point.</p>
        <Link className="text-link" href="/contact">Talk it through</Link>
      </div>
      <div className="home-service-list" data-hl="">
        <div className="home-service-highlight" data-hl-bar="" aria-hidden="true" />
        {capabilities.map(({ label, title, text, items }, index) => <Link className="home-service-row solutions-row" data-hl-row="" data-reveal="" data-delay={index * 90} href="/contact" key={title}>
          <div data-hl-inner="">
            <span className="solutions-row-label">{label}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            {items.length > 0 && <p className="solutions-row-scope">{items.join(' · ')}</p>}
          </div>
          <span data-hl-arrow="" aria-hidden="true"><Arrow /></span>
        </Link>)}
      </div>
    </div></section>

    <section className="case-delivered studio-how wrap" aria-labelledby="how-title">
      <div className="case-delivered-heading" data-reveal=""><p className="eyebrow">Working together</p><h2 id="how-title">From the first conversation<br />to what comes next.</h2></div>
      <ol className="case-delivery-grid case-delivery-grid--four">{engagement.map(([title, text], index) => <li key={title} data-reveal="" data-delay={index * 110}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
    </section>

    <StudioClosing title={<>Start with your<br /><em>business need.</em></>} action="Discuss what to build or automate" />
  </StudioPage>
}
