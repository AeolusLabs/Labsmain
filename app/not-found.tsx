import { PageShell } from '@/components/site-header'
import { ButtonLink, Eyebrow } from '@/components/page-parts'

export default function NotFound() {
  return <PageShell><section className="not-found"><Eyebrow>Page not found</Eyebrow><h1>That page isn’t here.</h1><p>It may have moved, or the address may be incorrect.</p><ButtonLink href="/">Back to home</ButtonLink></section></PageShell>
}
