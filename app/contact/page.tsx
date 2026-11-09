import { ContactStage } from '@/components/contact-stage'
import { Arrow } from '@/components/page-parts'
import { HeroLines, StudioPage } from '@/components/studio-parts'
import { assistantProvider } from '@/lib/brief-provider'
import { email } from '@/lib/content'

export const metadata = { title: 'Start a conversation', description: 'Discuss an AI-powered product or automation system for your business with AeolusLabs.' }

export default function Contact() {
  return <StudioPage>
    <section className="page-hero page-hero--contact wrap" aria-labelledby="contact-title">
      
      <h1 id="contact-title" className="page-hero-title page-hero-title--contact"><HeroLines lines={['What would you', <>build or <em>automate?</em></>]} /></h1>
    </section>

    {/* The assistant only appears when an Anthropic or OpenRouter key is configured for this deployment. */}
    <ContactStage assistantEnabled={assistantProvider() !== null}>
      <div data-delay="150">
        <p className="eyebrow">Prefer a direct email?</p>
        <a className="studio-contact-email" href={`mailto:${email}`}>{email} <Arrow /></a>
      </div>
      <div className="studio-contact-next" data-delay="260">
        <p className="eyebrow">What happens next</p>
        <h2>Start with your business.</h2>
        <p>Tell us about the product you want to build or the process you want to automate. We’ll read what you share, discuss what’s feasible and agree a scope before work begins.</p>
        <p>No finished brief required.</p>
      </div>
    </ContactStage>
  </StudioPage>
}
