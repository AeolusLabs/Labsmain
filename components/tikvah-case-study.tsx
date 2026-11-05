import { imageSizes } from '@/design-system/media'
import { PageShell } from '@/components/site-header'
import { ProjectImage } from '@/components/project-image'
import { ButtonLink, ClosingLine, Eyebrow, TextLink } from '@/components/page-parts'
import { tikvahUrl } from '@/lib/content'

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

export function TikvahCaseStudy() {
  return <PageShell>
    <div className="page-opening">
      <Eyebrow>Client project / Emotional support</Eyebrow>
      <h1>Tikvah</h1>
      <div><p>A human idea, and a complete digital experience.</p><TextLink href={tikvahUrl} external>Explore the live website</TextLink></div>
    </div>

    <dl className="case-facts">
      <div><dt>The client</dt><dd>Tikvah</dd></div>
      <div><dt>What we built</dt><dd>Complete web application</dd></div>
      <div><dt>Our scope</dt><dd>Frontend &amp; backend</dd></div>
      <div><dt>The focus</dt><dd>Private, human correspondence</dd></div>
    </dl>

    <figure className="case-figure">
      <ProjectImage src="/projects/tikvah/home-desktop.png" alt="Tikvah’s desktop homepage, with its introduction, plant illustration and account entry point" width={2560} height={1800} sizes={imageSizes.full} />
      <figcaption><span>The first impression</span><span>Actual website. Select the image to enlarge it.</span></figcaption>
    </figure>

    <section className="case-split">
      <Eyebrow>The challenge</Eyebrow>
      <div>
        <p className="lead">Bring a client’s idea for emotional support into a working platform built around conversations with real people.</p>
        <p>The experience needed a clear introduction, a way to create an account, and a frontend and backend supporting correspondence with the Tikvah team.</p>
        <p>Our role: deliver the complete web application, from the public experience to its supporting systems.</p>
      </div>
    </section>

    <section className="case-split">
      <div><Eyebrow>The experience</Eyebrow><h2>A gentle beginning.<br />On any screen.</h2></div>
      <div>
        <p>The public journey introduces the service, explains the next step and gives visitors a place to begin.</p>
        <ol className="journey">{journey.map(([title, text], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        <figure className="case-figure case-mobile">
          <ProjectImage src="/projects/tikvah/home-mobile.png" alt="Tikvah’s homepage on a mobile screen" width={780} height={1688} sizes={imageSizes.phone} />
          <figcaption><span>The mobile experience</span></figcaption>
        </figure>
      </div>
    </section>

    <section className="case-split">
      <div><Eyebrow>What we delivered</Eyebrow><h2>One idea.<br />Built all the way through.</h2></div>
      <div>
        {delivered.map(([title, text], i) => <div className="delivery-row" key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}
        <p className="evidence-note">Delivery scope confirmed by the AeolusLabs founders. Featured with the client’s permission. Public-site captures from October 2026; private account flows were not tested for this case study.</p>
      </div>
    </section>

    <section className="case-split">
      <Eyebrow>The result</Eyebrow>
      <div>
        <p className="lead">A publicly accessible platform with account entry points and a clear introduction to the service.</p>
        <p>Tikvah presents its role as an initial source of care, alongside professional and emergency support.</p>
        <ButtonLink href={tikvahUrl}>See Tikvah for yourself</ButtonLink>
      </div>
    </section>

    <ClosingLine title="Your idea could be next." action="Bring us your idea" />
  </PageShell>
}
