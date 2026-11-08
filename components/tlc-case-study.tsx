import Link from 'next/link'
import { HeroLines, StudioClosing, StudioPage } from './studio-parts'
import { PortfolioCapture } from './portfolio-capture'
import { tlcUrl } from '@/lib/content'

const journey = [
  ['Choose a service', 'Brows, lashes and hair services have visible pricing and direct booking links. The selected service carries into the appointment form.'],
  ['Plan the appointment', 'The booking page brings service selection, available times, customer details and the booking policy together.'],
  ['Connect the next steps', 'The public flow explains the 50% deposit through Paystack and the follow-up on WhatsApp, so visitors know what comes next.'],
]

export function TlcCaseStudy() {
  return <StudioPage>
    <section className="page-hero page-hero--case wrap" aria-labelledby="tlc-title">
      <Link className="studio-back" href="/work">← All work</Link>
      <p className="eyebrow">Client project / Beauty &amp; appointments</p>
      <h1 id="tlc-title" className="page-hero-title"><HeroLines lines={['TLC Beauty', <em>Shop.</em>]} /></h1>
      <div className="case-subline"><p>TheLashCode: from discovering a service to planning a visit.</p><a className="text-link" href={tlcUrl} target="_blank" rel="noopener noreferrer">Explore the live website ↗</a></div>
    </section>
    <section className="wrap" aria-label="Project facts"><dl className="case-fact-grid">
      {[['The client', 'TLC Beauty Shop / TheLashCode'], ['Our role', 'End-to-end website & booking experience'], ['The business', 'Beauty salon, Shomolu, Lagos'], ['The focus', 'Services, portfolio & appointments']].map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
    </dl></section>
    <section className="case-impression wrap" aria-label="TheLashCode website">
      <PortfolioCapture src="/projects/tlc-beauty-shop/home-desktop.jpg" alt="TheLashCode homepage with salon photography, beauty services introduction and an appointment link" caption="The live homepage, captured 8 November 2026. Select the image to inspect it." />
    </section>
    <section className="case-statement wrap" aria-labelledby="tlc-need">
      <p className="eyebrow" id="tlc-need">The business journey</p><div>
        <p className="case-statement-lead">Make the salon’s work visible. Give interested visitors a clear way to book.</p>
        <p>For a beauty business, choosing a service starts with seeing the work and understanding the options. The site connects a visual introduction, a brows/lashes/hair gallery and service pricing with an appointment flow.</p>
        <p>AeolusLabs delivered the complete site and booking experience. The public brand is TheLashCode, at tlcbeautyshop.com.</p>
      </div>
    </section>
    <section className="case-delivered wrap" aria-labelledby="tlc-delivery">
      <div className="case-delivered-heading"><p className="eyebrow">What we delivered</p><h2 id="tlc-delivery">A connected path<br />to the appointment.</h2></div>
      <ol className="case-delivery-grid">{journey.map(([title, text], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
    </section>
    <section className="case-impression wrap" aria-label="Booking experience">
      <PortfolioCapture src="/projects/tlc-beauty-shop/booking-desktop.jpg" alt="TheLashCode appointment page showing a service selector, deposit amount, date and time field and booking steps" caption={<>The public booking form, captured 8 November 2026. <a href={`${tlcUrl}booking`} target="_blank" rel="noopener noreferrer">Explore the booking page ↗</a></>} />
      <p className="case-note">End-to-end delivery confirmed by the AeolusLabs founders. Public services, gallery and booking pages were inspected, including the service-to-booking handoff. No booking, payment or WhatsApp confirmation was submitted during this review; payment completion and business results are not claimed here.</p>
    </section>
    <StudioClosing title={<>Your work.<br />A clearer <em>way in.</em></>} action="Discuss your business website" />
  </StudioPage>
}
