import type { Metadata } from 'next'
import '../css/pages.css'
import { ParticleStage } from '@/components/new/particle-stage'
import { email } from '@/components/new/content'

export const metadata: Metadata = { title: 'Privacy', description: 'How AeolusLabs handles project enquiry information.' }

const sections: readonly (readonly [string, string])[] = [
  ['What you share', 'The enquiry form asks for your name, email address, optional organisation, type of work and a description of your challenge. Please avoid including passwords, financial details or sensitive personal information.'],
  ['How we use it', 'We use your details to understand your request, respond to you and discuss potential work. We do not sell enquiry information.'],
  ['Sending an enquiry', 'If direct email delivery is configured, the form sends your enquiry to our business inbox using an email delivery provider. Otherwise, it prepares an email for you to send through your own email app. Preparing an email does not send or save an enquiry on this website.'],
  ['Access and retention', 'Enquiries received by email are accessible to the team handling your request and the providers operating our email services. We keep correspondence for follow-up and any resulting business relationship. You can contact us to request access, correction or deletion, subject to any records we need to retain.'],
  ['The AI assistant', 'Where it is available, the contact page offers an AI assistant that helps you turn an idea into a written brief. It is an AI, not a person. Depending on this website’s configuration, your messages are sent directly to Anthropic or through OpenRouter to the provider running the selected AI model. Those services process your messages under their own terms and privacy policies. We do not save the conversation. Nothing reaches our team unless you review the draft brief and choose to send it through the enquiry form. Please do not share passwords, payment details or ID numbers.'],
  ['Analytics', 'The local development version does not load production analytics. The production configuration includes Vercel Analytics for aggregate website usage measurement.'],
]

export default function Privacy() {
  return <div className="np-page">
    <ParticleStage scenes={['sky']} />
    <article className="np-privacy">
      <h1 className="np-h1">Your information, handled with care.</h1>
      <p className="np-lead">This notice explains how we use the details you share when contacting AeolusLabs.</p>
      {sections.map(([h, t]) => <section key={h}>
        <h2 className="np-h3">{h}</h2>
        <p className="np-privacy-text">{t}</p>
      </section>)}
      <section>
        <h2 className="np-h3">Contact</h2>
        <p className="np-privacy-text">For privacy questions or requests, email <a className="np-link" href={`mailto:${email}`}>{email}</a>.</p>
      </section>
    </article>
  </div>
}
