import Image from 'next/image'
import Link from 'next/link'
import { HeroLines, StudioClosing, StudioPage } from '@/components/studio-parts'
import { ProjectImage } from '@/components/project-image'
import { ButtonLink } from '@/components/page-parts'
import { imageSizes } from '@/design-system/media'
import tokens from '@/design-system/tokens.json'
import { tikvahUrl } from '@/lib/content'

const facts = [
  ['The client', 'Tikvah'],
  ['What we built', 'Complete web application'],
  ['Our scope', 'Frontend & backend'],
  ['The focus', 'Private, human correspondence'],
]
const journey = [
  ['Understand the service', 'A clear introduction to personal correspondence with the Tikvah team.'],
  ['Find the way in', 'Visible entry points for account creation and sign-in.'],
  ['Explore further support', 'Public routes to resources and professional support.'],
]
const delivered = [
  ['Introduce the service', 'A responsive public website that explains the service, who visitors will hear from and how to begin.'],
  ['Build the application', 'Frontend and backend delivery for the platform supporting correspondence with the Tikvah team, including account entry points.'],
  ['Connect the wider journey', 'Public navigation to resources, service information and professional support alongside the route into correspondence.'],
]
const desktopAlt = 'Tikvah’s desktop homepage, with its introduction, plant illustration and account entry point'
const phoneAlt = 'Tikvah’s homepage on a mobile screen'

export function TikvahCaseStudy() {
  return <StudioPage>
    <section className="page-hero page-hero--case wrap" aria-labelledby="case-title">
      <Link className="studio-back" href="/work">← All work</Link>
      <p className="eyebrow">Client project / Emotional support</p>
      <h1 id="case-title" className="page-hero-title page-hero-title--case"><HeroLines lines={['Tikvah']} /></h1>
      <div className="case-subline" data-delay="450">
        <p>From an emotional-support idea to a complete web application.</p>
        <a className="text-link" href={tikvahUrl} target="_blank" rel="noopener noreferrer">Explore the live website ↗</a>
      </div>
    </section>

    <section className="wrap" aria-label="Project facts">
      <dl className="case-fact-grid">{facts.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
    </section>

    <section className="case-impression wrap" aria-label="The first impression">
      <div>
        <div className="home-project-stage">
          <div className="home-desktop-capture" data-clip=""><Image data-clip-img="" src="/projects/tikvah/home-desktop.webp" alt={desktopAlt} width={2560} height={1800} sizes={imageSizes.full} /></div>
          <div className="case-impression-hitarea"><ProjectImage src="/projects/tikvah/home-desktop.webp" alt={desktopAlt} width={2560} height={1800} sizes={imageSizes.full} triggerOnly /></div>
        </div>
      </div>
      <p className="case-caption"><span>The first impression</span><span>Actual website. Select the image to enlarge it.</span></p>
    </section>

    <section className="case-statement wrap" aria-labelledby="challenge-title">
      <p className="eyebrow" id="challenge-title">The challenge</p>
      <div data-delay="120">
        <p className="case-statement-lead">Give people a clear way to understand the service and begin a conversation with the Tikvah team.</p>
        <p>Tikvah’s idea centres on personal correspondence with real people. The digital experience needed to introduce that service, explain the next step and provide a route into an account.</p>
        <p>AeolusLabs delivered the complete web application: the visitor-facing frontend and the backend supporting the platform. The public pages shown here demonstrate the introduction and entry points; the delivery scope extends beyond those screens.</p>
      </div>
    </section>

    <section className="case-experience surface-light" aria-labelledby="experience-title"><div className="wrap case-experience-inner">
      <div className="case-experience-copy">
        <div>
          <p className="eyebrow">The experience</p>
          <h2 id="experience-title">A gentle beginning. On any screen.</h2>
          <p>Visitors can learn what Tikvah offers before choosing to create an account. The same introduction and entry points remain available on a phone, alongside routes to further resources and professional support.</p>
        </div>
        <div className="case-phone home-project-stage">
          <div className="case-phone-visual" data-tilt="">
            <div data-depth={tokens.tilt['layer-case']}><div className="case-phone-frame" data-clip=""><Image data-clip-img="" src="/projects/tikvah/home-mobile.webp" alt={phoneAlt} width={780} height={1688} sizes={tokens.size['phone-case']} /></div></div>
          </div>
          <div className="case-phone-hitarea"><ProjectImage src="/projects/tikvah/home-mobile.webp" alt={phoneAlt} width={780} height={1688} sizes={tokens.size['phone-case']} triggerOnly /></div>
        </div>
      </div>
      <ol className="case-journey">{journey.map(([title, text], index) => <li key={title} data-delay={index * 100}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
    </div></section>

    <section className="case-impression wrap" aria-labelledby="service-title">
      <div className="case-delivered-heading">
        <p className="eyebrow">Beyond the homepage</p>
        <h2 id="service-title">Explain what a conversation means.</h2>
        <p>Tikvah’s About page describes personal correspondence with a human team rather than a public forum. It gives visitors more context about the service before they choose to begin.</p>
      </div>
      <div className="home-project-stage">
        <div className="home-desktop-capture"><Image src="/projects/tikvah/about-desktop.jpg" alt="Tikvah’s About page explaining personal correspondence with its human team" width={1440} height={1000} sizes={imageSizes.full} /></div>
        <div className="case-impression-hitarea"><ProjectImage src="/projects/tikvah/about-desktop.jpg" alt="Tikvah’s public About page" width={1440} height={1000} sizes={imageSizes.full} triggerOnly /></div>
      </div>
      <p className="case-caption"><span><a href={`${tikvahUrl}about`} target="_blank" rel="noopener noreferrer">Public About page ↗</a></span><span>Captured 8 November 2026. Select the image to enlarge it.</span></p>
    </section>

    <section className="case-delivered wrap" aria-labelledby="delivered-title">
      <div className="case-delivered-heading"><p className="eyebrow">What we delivered</p><h2 id="delivered-title">One idea. Built all the way through.</h2></div>
      <ol className="case-delivery-grid">{delivered.map(([title, text], index) => <li key={title} data-delay={index * 110}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
      <p className="case-note">Delivery scope confirmed by the AeolusLabs founders. Featured with the client’s permission. Homepage captures from October 2026; About page captured 8 November 2026. Private account flows were not tested for this case study.</p>
    </section>

    <section className="case-statement wrap" aria-labelledby="result-title">
      <p className="eyebrow" id="result-title">The result</p>
      <div data-delay="120">
        <p className="case-statement-lead">A client idea brought into a public web application, with frontend and backend delivered by AeolusLabs.</p>
        <p>The public experience gives visitors an introduction to the service, a route into an account and access to further resources. Tikvah presents its role as an initial source of care, alongside professional and emergency support.</p>
        <span data-magnet=""><ButtonLink href={tikvahUrl}>See Tikvah for yourself</ButtonLink></span>
      </div>
    </section>

    <StudioClosing title={<>Your idea<br />could be <em>next.</em></>} action="Bring us your idea" />
  </StudioPage>
}
