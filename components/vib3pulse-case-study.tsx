import Link from 'next/link'
import { HeroLines, StudioClosing, StudioPage } from './studio-parts'
import { PortfolioCapture } from './portfolio-capture'
import { productUrl } from '@/lib/content'

export function Vib3PulseCaseStudy() {
  return <StudioPage>
    <section className="page-hero page-hero--case wrap" aria-labelledby="vib3-title">
      <Link className="studio-back" href="/work">← All work</Link>
      <p className="eyebrow">Our own product / Events &amp; community</p>
      <h1 id="vib3-title" className="page-hero-title"><HeroLines lines={['Vib3Pulse.']} /></h1>
      <div className="case-subline"><p>Find an event. Plan with your people.</p><a className="text-link" href={productUrl} target="_blank" rel="noopener noreferrer">Visit Vib3Pulse ↗</a></div>
    </section>
    <section className="wrap" aria-label="Project facts"><dl className="case-fact-grid">
      {[['Ownership', 'Built & owned by AeolusLabs'], ['Type', 'Web product'], ['The idea', 'Events, tickets & social planning'], ['Evidence shown', 'Public landing & sign-in screens']].map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
    </dl></section>
    <section className="case-impression wrap" aria-label="Vib3Pulse public experience">
      <PortfolioCapture src="/projects/vib3pulse/home-desktop.jpg" alt="Vib3Pulse’s public landing page, showing event categories and a clearly labelled sample ticket" caption="Actual public landing page, captured 8 November 2026. The ticket and event shown are the product’s sample demonstration, not a customer purchase." />
    </section>
    <section className="case-statement wrap" aria-labelledby="vib3-idea"><p className="eyebrow" id="vib3-idea">The idea</p><div>
      <p className="case-statement-lead">Bring finding a night out and planning it with friends into one product.</p>
      <p>Vib3Pulse brings event discovery, ticketing and social planning together. Its public introduction explains the experience through event categories, sample tickets and different starting points for attendees and organisers.</p>
      <p>As an owned product, it shows AeolusLabs working on both the product proposition and the experience people use to understand it.</p>
    </div></section>
    <section className="case-delivered wrap" aria-labelledby="vib3-journey"><div className="case-delivered-heading"><p className="eyebrow">The public journey</p><h2 id="vib3-journey">See the idea.<br />Find your way in.</h2></div>
      <ol className="case-delivery-grid">
        <li><span>01</span><h3>Discover the proposition</h3><p>Categories and an illustrative ticket introduce the event experience before a visitor creates an account.</p></li>
        <li><span>02</span><h3>Choose a starting point</h3><p>Public entry points distinguish joining as an attendee from listing an event as an organiser.</p></li>
        <li><span>03</span><h3>Return to the product</h3><p>The sign-in page provides username or email access, Google sign-in and account recovery entry points.</p></li>
      </ol>
    </section>
    <section className="case-impression wrap" aria-label="Vib3Pulse sign-in screen">
      <PortfolioCapture src="/projects/vib3pulse/signin-desktop.jpg" alt="Vib3Pulse’s sign-in page with username or email and password fields, Google sign-in and account recovery links" caption="Actual public sign-in page, captured 8 November 2026. No account was used for this capture." />
      <p className="case-note">The product also presents chats, polls, stories, safety tools and live Rooms. These are product-described capabilities; account-only behaviour, payments and safety functions were not independently tested for this case study. The lime panels elsewhere on this site remain brand artwork; the images here are actual public screens.</p>
    </section>
    <StudioClosing title={<>An idea worth<br /><em>building?</em></>} action="Talk to us about your product" />
  </StudioPage>
}
