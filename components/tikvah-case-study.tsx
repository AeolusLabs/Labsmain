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
  ['The interface', 'Public pages, responsive layouts and account entry points.'],
  ['The application', 'Frontend and backend supporting correspondence with the Tikvah team.'],
  ['The wider journey', 'Navigation to resources, information and professional support.'],
]
const desktopAlt = 'Tikvah’s desktop homepage, with its introduction, plant illustration and account entry point'
const phoneAlt = 'Tikvah’s homepage on a mobile screen'

export function TikvahCaseStudy() {
  return <StudioPage>
    <section className="page-hero page-hero--case wrap" aria-labelledby="case-title">
      <Link className="studio-back" href="/work">← All work</Link>
      <p className="eyebrow" data-reveal="">Client project / Emotional support</p>
      <h1 id="case-title" className="page-hero-title page-hero-title--case"><HeroLines lines={['Tikvah']} /></h1>
      <div className="case-subline" data-reveal="" data-delay="450">
        <p>A human idea, and a complete digital experience.</p>
        <a className="text-link" href={tikvahUrl} target="_blank" rel="noopener noreferrer">Explore the live website ↗</a>
      </div>
    </section>

    <section className="wrap" aria-label="Project facts">
      <dl className="case-fact-grid" data-reveal="">{facts.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
    </section>

    <section className="case-impression wrap" aria-label="The first impression">
      <div data-par={tokens.motion['parallax-feature']}>
        <div className="home-project-stage">
          <div className="home-desktop-capture" data-clip=""><Image data-clip-img="" src="/projects/tikvah/home-desktop.webp" alt={desktopAlt} width={2560} height={1800} sizes={imageSizes.full} unoptimized /></div>
          <div className="case-impression-hitarea"><ProjectImage src="/projects/tikvah/home-desktop.webp" alt={desktopAlt} width={2560} height={1800} sizes={imageSizes.full} triggerOnly /></div>
        </div>
      </div>
      <p className="case-caption"><span>The first impression</span><span>Actual website. Select the image to enlarge it.</span></p>
    </section>

    <section className="case-statement wrap" aria-labelledby="challenge-title">
      <p className="eyebrow" id="challenge-title" data-reveal="">The challenge</p>
      <div data-reveal="" data-delay="120">
        <p className="case-statement-lead">Bring a client’s idea for emotional support into a working platform built around conversations with real people.</p>
        <p>The experience needed a clear introduction, a way to create an account, and a frontend and backend supporting correspondence with the Tikvah team.</p>
        <p>Our role: deliver the complete web application, from the public experience to its supporting systems.</p>
      </div>
    </section>

    <section className="case-experience surface-light" aria-labelledby="experience-title"><div className="wrap case-experience-inner">
      <div className="case-experience-copy">
        <div data-reveal="">
          <p className="eyebrow">The experience</p>
          <h2 id="experience-title">A gentle beginning. On any screen.</h2>
          <p>The public journey introduces the service, explains the next step and gives visitors a place to begin.</p>
        </div>
        <div className="case-phone home-project-stage">
          <div className="case-phone-visual" data-tilt="">
            <div data-depth={tokens.tilt['layer-case']} data-float=""><div className="case-phone-frame" data-clip=""><Image data-clip-img="" src="/projects/tikvah/home-mobile.webp" alt={phoneAlt} width={780} height={1688} sizes={tokens.size['phone-case']} unoptimized /></div></div>
          </div>
          <div className="case-phone-hitarea"><ProjectImage src="/projects/tikvah/home-mobile.webp" alt={phoneAlt} width={780} height={1688} sizes={tokens.size['phone-case']} triggerOnly /></div>
        </div>
      </div>
      <ol className="case-journey">{journey.map(([title, text], index) => <li key={title} data-reveal="" data-delay={index * 100}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
    </div></section>

    <section className="case-delivered wrap" aria-labelledby="delivered-title">
      <div className="case-delivered-heading" data-reveal=""><p className="eyebrow">What we delivered</p><h2 id="delivered-title">One idea. Built all the way through.</h2></div>
      <ol className="case-delivery-grid">{delivered.map(([title, text], index) => <li key={title} data-reveal="" data-delay={index * 110}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
      <p className="case-note" data-reveal="">Delivery scope confirmed by the AeolusLabs founders. Featured with the client’s permission. Public-site captures from October 2026; private account flows were not tested for this case study.</p>
    </section>

    <section className="case-statement wrap" aria-labelledby="result-title">
      <p className="eyebrow" id="result-title" data-reveal="">The result</p>
      <div data-reveal="" data-delay="120">
        <p className="case-statement-lead">A publicly accessible platform with account entry points and a clear introduction to the service.</p>
        <p>Tikvah presents its role as an initial source of care, alongside professional and emergency support.</p>
        <span data-magnet=""><ButtonLink href={tikvahUrl}>See Tikvah for yourself</ButtonLink></span>
      </div>
    </section>

    <StudioClosing title={<>Your idea<br />could be <em>next.</em></>} action="Bring us your idea" />
  </StudioPage>
}
