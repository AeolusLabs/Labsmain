import Image from 'next/image'
import Link from 'next/link'
import { HeroLines, StudioClosing, StudioPage } from '@/components/studio-parts'
import { ButtonLink } from '@/components/page-parts'
import { imageSizes } from '@/design-system/media'
import tokens from '@/design-system/tokens.json'

export const metadata = { title: 'Our work', description: 'Explore client work and products built by AeolusLabs, including Tikvah and Vib3Pulse.' }

export default function Work() {
  return <StudioPage>
    <section className="page-hero wrap" aria-labelledby="work-title">
      <p className="eyebrow" data-reveal="">Our work</p>
      <h1 id="work-title" className="page-hero-title page-hero-title--work"><HeroLines lines={['See what', <>we’ve <em>built.</em></>]} /></h1>
      <p className="page-hero-lead" data-reveal="" data-delay="500">A closer look at our client work and products: what each does, what we delivered and what you can explore.</p>
    </section>

    <section className="studio-work wrap" aria-labelledby="tikvah-title">
      <div data-par={tokens.motion['parallax-feature']}>
        <div className="studio-stage">
          <div className="studio-stage-visual" data-tilt="">
            <div data-depth={tokens.tilt['layer-back']}><div className="home-desktop-capture" data-clip=""><Image data-clip-img="" src="/projects/tikvah/home-desktop.webp" alt="Tikvah’s public website" width={2560} height={1800} sizes={imageSizes.full} /></div></div>
            <div className="studio-stage-phone" data-depth={tokens.tilt['layer-front']} data-float=""><div className="home-phone-capture-frame" data-clip=""><Image data-clip-img="" src="/projects/tikvah/home-mobile.webp" alt="Tikvah’s homepage on a mobile screen" width={780} height={1688} sizes={tokens.size['phone-overlay-work']} /></div></div>
          </div>
          <Link className="studio-stage-link" href="/work/tikvah" aria-label="Read the Tikvah case study" />
        </div>
      </div>
      <div className="studio-brief">
        <div data-reveal="">
          <p className="eyebrow">Client project</p>
          <h2 id="tikvah-title">Tikvah</h2>
          <p>A private emotional-support platform organised around correspondence with a human team.</p>
        </div>
        <div data-reveal="" data-delay="120">
          <dl><dt>Our role</dt><dd>Frontend &amp; backend</dd><dt>Delivered</dt><dd>Complete web application</dd></dl>
          <span data-magnet=""><ButtonLink href="/work/tikvah">View the case study</ButtonLink></span>
        </div>
      </div>
    </section>

    <section className="studio-product-section wrap" aria-label="Vib3Pulse">
      <Link className="studio-product" href="/products" data-reveal="">
        <canvas data-pulse="" aria-hidden="true" />
        <div className="studio-product-inner">
          <div>
            <span className="studio-product-label">Vib3Pulse</span>
            <strong>Find<br />Your Vib3.</strong>
            <span className="studio-product-tagline">Events. Tickets. Community.</span>
          </div>
          <div>
            <p className="studio-product-kicker">Our own product</p>
            <p className="studio-product-copy">Bringing event discovery, ticketing and social planning into one platform.</p>
            <dl><dt>Type</dt><dd>Owned web product</dd><dt>Focus</dt><dd>Events &amp; community</dd></dl>
            <p className="studio-product-note">Brand artwork shown; interface imagery is still pending.</p>
          </div>
        </div>
      </Link>
    </section>

    <StudioClosing title={<>Your next product.<br />Your next <em>workflow.</em></>} action="Discuss what to build or automate" />
  </StudioPage>
}
