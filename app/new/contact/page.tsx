import { ParticleStage } from '@/components/new/particle-stage'
import { ContactPanel } from '@/components/new/contact/contact-panel'
import { email } from '@/components/new/content'
import { assistantProvider } from '@/lib/brief-provider'
import '../css/contact.css'

export const metadata = { title: 'Start a conversation', description: 'Discuss an AI-powered product or automation system for your business with AeolusLabs.' }

export default function NewContact() {
  return <>
    <ParticleStage />
    <div className="np-page np-contact">
      <h1 className="np-h1">What would you build or automate?</h1>
      <p className="np-lead">Tell us your idea. No finished brief needed.</p>

      {/* The assistant only appears when an Anthropic or OpenRouter key is configured for this deployment. */}
      <section className="np-contact-card" aria-label="Enquiry">
        <ContactPanel assistantEnabled={assistantProvider() !== null} />
      </section>

      <p className="np-contact-email">Or email us: <a className="np-link" href={`mailto:${email}`}>{email}</a></p>

      <section className="np-contact-next" aria-labelledby="np-contact-next-title">
        <h2 id="np-contact-next-title">What happens next</h2>
        <ol>
          <li>We read what you share.</li>
          <li>We discuss what is possible.</li>
          <li>We agree the scope before work begins.</li>
        </ol>
      </section>
    </div>
  </>
}
