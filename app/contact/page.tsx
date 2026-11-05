import { PageShell } from '@/components/site-header'
import { ContactPanel } from '@/components/contact-panel'
import { Arrow, Eyebrow } from '@/components/page-parts'
import { assistantProvider } from '@/lib/brief-provider'
import { email } from '@/lib/content'

export const metadata = { title: 'Start a conversation', description: 'Tell AeolusLabs what you want to build or improve.' }

export default function Contact() {
  return <PageShell>
    <div className="contact-opening"><Eyebrow>Start a conversation</Eyebrow><h1>Tell us what you<br />want to make possible.</h1></div>
    <div className="intent-contact">
      {/* The assistant only appears when an Anthropic or OpenRouter key is configured for this deployment. */}
      <ContactPanel assistantEnabled={assistantProvider() !== null} />
      <aside className="contact-context">
        <div><Eyebrow>Prefer a direct email?</Eyebrow><a href={`mailto:${email}`}>{email} <Arrow /></a></div>
        <div><Eyebrow>What happens next</Eyebrow><h2>A useful conversation.</h2><p>We’ll read what you share, ask about the need and discuss what’s feasible before agreeing a scope.</p><p>No finished brief required.</p></div>
      </aside>
    </div>
  </PageShell>
}
