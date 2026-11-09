import Link from 'next/link'
import Image from 'next/image'
import { SiteHeader, SiteFooter } from '@/components/site-header'
import { Arrow, ButtonLink, TextLink } from '@/components/page-parts'
import { HomeExperience } from '@/components/home-experience'
import { ProjectImage } from '@/components/project-image'
import { imageSizes } from '@/design-system/media'
import tokens from '@/design-system/tokens.json'
import { email } from '@/lib/content'

const expertise = [
  ['AI-powered products', 'Web and mobile products with AI built around a business need.'],
  ['Automation systems', 'Connected workflows that reduce repetitive manual steps.'],
  ['Integrations & support', 'Connect your tools and keep the system working.'],
]
const serviceSummary = [
  ['Build your product', 'Web and mobile applications, with AI where it helps.'],
  ['Simplify daily work', 'Automate repetitive tasks and manual handoffs.'],
  ['Connect your tools', 'Bring your existing systems and data together.'],
  ['Keep things running', 'Maintenance and support as your business grows.'],
]

export default function Home() {
  return <HomeExperience>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="home-atmosphere" aria-hidden="true"><canvas data-wind="" /><div data-spot="" /></div>
    <SiteHeader />
    <main id="main-content">
      <section className="home-hero wrap" aria-labelledby="home-title">
        <div className="home-hero-content">
          <h1 id="home-title"><span className="home-line-mask"><span data-hw="">AI-powered products.</span></span><span className="home-line-mask"><span data-hw="">Business <em>automation.</em></span></span></h1>
          <div className="home-hero-support">
            <p className="home-lead">We build AI-powered products and automation systems for businesses.</p>
            <div className="home-hero-detail">
              <p>We’re AeolusLabs, a collective bringing technology and business development together. Based in Nigeria, we work with businesses across Africa and beyond.</p>
              <div className="home-actions"><span data-magnet=""><ButtonLink href="/contact">Build or automate with us</ButtonLink></span><span data-magnet=""><ButtonLink href="/work" variant="ghost">See our work</ButtonLink></span></div>
            </div>
          </div>
          <p className="home-wind-hint">The wind responds. Move your cursor through it.</p>
        </div>
      </section>


      <section className="home-services-summary" aria-labelledby="services-summary-title">
        <div className="wrap">
          <h2 id="services-summary-title">What we help you do.</h2>
          <ul>{serviceSummary.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ul>
        </div>
      </section>

      <section className="home-work wrap" aria-labelledby="feature-title">
        <div className="home-work-heading"><div><p className="eyebrow">Selected client work</p><h2 id="feature-title">Tikvah, a place for human connection.</h2></div><p>A complete emotional-support platform, delivered from frontend to backend.</p></div>
        <div><div className="home-project-stage">
          <div className="home-project-visual" data-tilt="">
            <div data-depth={tokens.tilt['layer-back']}><div className="home-desktop-capture" data-clip=""><Image data-clip-img="" src="/projects/tikvah/home-desktop.webp" alt="Tikvah’s desktop homepage, with its introduction, plant illustration and account entry point" width={2560} height={1800} sizes={imageSizes.full} /></div></div>
            <div className="home-phone-capture" data-depth={tokens.tilt['layer-front']}><div data-clip=""><Image data-clip-img="" src="/projects/tikvah/home-mobile.webp" alt="Tikvah’s homepage on a mobile screen" width={780} height={1688} sizes={tokens.size['phone-overlay']} /></div></div>
          </div>
          <div className="home-desktop-hitarea"><ProjectImage src="/projects/tikvah/home-desktop.webp" alt="Tikvah’s desktop homepage, with its introduction, plant illustration and account entry point" width={2560} height={1800} sizes={imageSizes.full} triggerOnly /></div>
          <div className="home-phone-hitarea"><ProjectImage src="/projects/tikvah/home-mobile.webp" alt="Tikvah’s homepage on a mobile screen" width={780} height={1688} sizes={tokens.size['phone-overlay']} triggerOnly /></div>
        </div></div>
        <div className="home-work-caption"><p>Actual website captures. Scope: frontend and backend.</p><div className="home-actions"><TextLink href="/work/tikvah">Explore the case study</TextLink><TextLink href="/work">All work</TextLink></div></div>
      </section>

      <section className="portfolio-preview wrap" aria-labelledby="home-tlc-title">
        <Link className="home-desktop-capture" href="/work/tlc-beauty-shop" aria-label="Explore TLC Beauty Shop"><Image src="/projects/tlc-beauty-shop/home-desktop.jpg" alt="TheLashCode website for TLC Beauty Shop, with salon photography and a booking entry point" width={1440} height={1000} sizes={imageSizes.full} /></Link>
        <div className="studio-brief">
          <div><p className="eyebrow">Client work / Business website</p><h2 id="home-tlc-title">Beauty. With a clearer path to booking.</h2><p>For TLC Beauty Shop’s TheLashCode, we delivered the website and booking experience, connecting the salon’s work, service pricing and appointment journey.</p></div>
          <div><p>A real business journey, from exploring the services to choosing a slot.</p><ButtonLink href="/work/tlc-beauty-shop">Explore TLC Beauty Shop</ButtonLink></div>
        </div>
      </section>

      <section className="home-services surface-light" aria-labelledby="help-title"><div className="wrap home-services-inner">
        <div className="home-services-copy"><h2 id="help-title">Build the product. Connect the work.</h2><p>Bring us the product you want to create or the process you want to improve. We’ll work through the need, agree a scope and build with you involved. AI and automation come with agreed human oversight.</p><p className="home-principle">Understand the business. Build what helps.</p></div>
        <div className="home-service-list" data-hl=""><div className="home-service-highlight" data-hl-bar="" aria-hidden="true" />{expertise.map(([title, text]) => <Link className="home-service-row" data-hl-row="" href="/solutions" key={title}><div data-hl-inner=""><h3>{title}</h3><p>{text}</p></div><span data-hl-arrow="" aria-hidden="true"><Arrow /></span></Link>)}</div>
      </div></section>

      <section className="home-product wrap" aria-label="Our own product"><Link className="home-product-panel" href="/products"><canvas data-pulse="" aria-hidden="true" /><div className="home-product-inner"><div><p className="eyebrow">Our own product</p><h2>Vib3Pulse.</h2><p className="home-product-tagline">Events. Tickets. Community.</p></div><span className="home-product-cta">See our products <Arrow /></span></div></Link></section>

      <section className="portfolio-proof wrap" aria-labelledby="brief-proof-title">
        <div className="case-delivered-heading"><p className="eyebrow">An AI workflow of our own</p><h2 id="brief-proof-title">From a rough idea<br />to a brief you control.</h2><p>Our enquiry flow is one example of how we combine AI with a human decision. When the assistant is available, it helps shape your idea into an editable draft. The ordinary form is always available.</p></div>
        <ol className="case-delivery-grid">
          <li><span>01</span><h3>Talk through the need</h3><p>The assistant asks about your business, current process and what you want to change.</p></li>
          <li><span>02</span><h3>Review the draft</h3><p>You read the proposed brief and edit anything that needs changing.</p></li>
          <li><span>03</span><h3>Choose what to send</h3><p>Nothing is submitted automatically. You choose to continue with the enquiry, with a prepared-email fallback if direct delivery is unavailable.</p></li>
        </ol>
        <div className="home-actions"><ButtonLink href="/contact">Explore our enquiry flow</ButtonLink></div>
      </section>

      <section className="home-closing wrap" aria-labelledby="close-title">
        <h2 id="close-title"><span className="home-closing-line">What would</span><span className="home-closing-line">you <span className="home-emphasis">automate?</span></span></h2>
        <div className="home-actions"><span data-magnet=""><ButtonLink href="/contact">Discuss your next step</ButtonLink></span><a className="text-link" href={`mailto:${email}`}>{email}</a></div>
      </section>
    </main>
    <SiteFooter />
  </HomeExperience>
}
