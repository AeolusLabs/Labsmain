import Link from 'next/link'
import { Arrow } from '@/components/page-parts'
import { HeroLines, StudioClosing, StudioPage } from '@/components/studio-parts'

export const metadata = { title: 'Solutions', description: 'Practical websites, applications, systems and AI for real business problems.' }

const capabilities = [
  { label: 'Build your digital presence', title: 'Websites & applications', text: 'Help people understand your business, use your services or engage with your product.', items: ['Business websites', 'Web applications & customer portals', 'Mobile applications'] },
  { label: 'Bring your operations together', title: 'Systems & integrations', text: 'Shape software around your processes and connect the tools your team already uses.', items: ['Custom business systems', 'Backend development & APIs', 'Databases & integrations'] },
  { label: 'Create space for better work', title: 'AI & automation', text: 'Organise information, prepare responses and support repeatable tasks, with agreed human oversight.', items: ['Practical AI integrations', 'Custom agents & workflows', 'Connections between business tools'] },
  { label: 'Keep your software useful', title: 'Maintenance & support', text: 'Ongoing care, technical support and improvements as your needs evolve.', items: [] as string[] },
]
const principles = [
  ['Understand first.', 'Listen before choosing a solution.'],
  ['Build deliberately.', 'Keep the work focused on a clear need.'],
  ['Communicate openly.', 'Keep you involved as the work takes shape.'],
  ['Keep improving.', 'Learn from use and plan the next useful change.'],
]

export default function Solutions() {
  return <StudioPage>
    <section className="page-hero wrap" aria-labelledby="solutions-title">
      <p className="eyebrow" data-reveal="">Capabilities</p>
      <h1 id="solutions-title" className="page-hero-title page-hero-title--solutions"><HeroLines lines={['The right software', <>starts with <em>your problem.</em></>]} /></h1>
      <p className="page-hero-lead page-hero-lead--wide" data-reveal="" data-delay="500">Whether you’re building something new or improving what’s already there, we start by understanding what needs to change.</p>
    </section>

    <section className="solutions-map wrap" aria-labelledby="map-title">
      <div className="solutions-map-head">
        <div data-reveal=""><p className="eyebrow">Systems &amp; integrations</p><h2 id="map-title">Connect the tools your team already uses.</h2></div>
        <p className="solutions-map-note" data-reveal="" data-delay="150">Shape software around your processes. Move your cursor through the system to see what connects to what.</p>
      </div>
      <div className="solutions-map-stage" data-reveal="" data-delay="100">
        <canvas data-network="" role="img" aria-label="Diagram: websites, mobile apps, customer portals, APIs, databases, AI workflows and business tools all connect through your business." />
      </div>
    </section>

    <section className="solutions-capabilities surface-light" aria-labelledby="begin-title"><div className="wrap solutions-capabilities-inner">
      <div className="solutions-intro" data-reveal="">
        <h2 id="begin-title">Where do you want to begin?</h2>
        <p>Explore the scope below, or tell us what isn’t working. We’ll help you find a sensible starting point.</p>
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
      <div className="case-delivered-heading" data-reveal=""><p className="eyebrow">How we work</p><h2 id="how-title">Understand. Build. Keep improving.</h2></div>
      <ol className="case-delivery-grid case-delivery-grid--four">{principles.map(([title, text], index) => <li key={title} data-reveal="" data-delay={index * 110}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
    </section>

    <StudioClosing title={<>A clear scope<br />comes <em>first.</em></>} action="Discuss your project" />
  </StudioPage>
}
