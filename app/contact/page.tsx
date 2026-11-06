import { ContactStage } from '@/components/contact-stage'
import { Arrow } from '@/components/page-parts'
import { HeroLines, StudioPage } from '@/components/studio-parts'
import { assistantProvider } from '@/lib/brief-provider'
import { email } from '@/lib/content'

export const metadata = { title: 'Start a conversation', description: 'Tell AeolusLabs what you want to build or improve.' }

export default function Contact() {
  return <StudioPage>
    <section className="page-hero page-hero--contact wrap" aria-labelledby="contact-title">
      <p className="eyebrow" data-reveal="">Start a conversation</p>
      <h1 id="contact-title" className="page-hero-title page-hero-title--contact"><HeroLines lines={['Tell us what you', <>want to make <em>possible.</em></>]} /></h1>
    </section>

    {/* The assistant only appears when an Anthropic or OpenRouter key is configured for this deployment. */}
    <ContactStage assistantEnabled={assistantProvider() !== null}>
      <div data-reveal="" data-delay="150">
        <p className="eyebrow">Prefer a direct email?</p>
        <a className="studio-contact-email" href={`mailto:${email}`}>{email} <Arrow /></a>
      </div>
      <div className="studio-contact-next" data-reveal="" data-delay="260">
        <p className="eyebrow">What happens next</p>
        <h2>A useful conversation.</h2>
        <p>We’ll read what you share, ask about the need and discuss what’s feasible before agreeing a scope.</p>
        <p>No finished brief required.</p>
      </div>
    </ContactStage>
  </StudioPage>
}
