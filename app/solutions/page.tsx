import { PageShell } from '@/components/site-header'
import { ClosingLine, Eyebrow, TextLink } from '@/components/page-parts'

export const metadata = { title: 'Solutions', description: 'Practical websites, applications, systems and AI for real business problems.' }

const capabilities = [
  { label: 'Build your digital presence', title: 'Websites & applications', text: 'Help people understand your business, use your services or engage with your product.', items: ['Business websites', 'Web applications & customer portals', 'Mobile applications'] },
  { label: 'Bring your operations together', title: 'Systems & integrations', text: 'Shape software around your processes and connect the tools your team already uses.', items: ['Custom business systems', 'Backend development & APIs', 'Databases & integrations'] },
  { label: 'Create space for better work', title: 'AI & automation', text: 'Organise information, prepare responses and support repeatable tasks, with agreed human oversight.', items: ['Practical AI integrations', 'Custom agents & workflows', 'Connections between business tools'] },
  { label: 'Keep your software useful', title: 'Maintenance & support', text: 'Ongoing care, technical support and improvements as your needs evolve.', items: [] as string[] },
]

export default function Solutions() {
  return <PageShell>
    <div className="page-opening">
      <Eyebrow>Capabilities</Eyebrow>
      <h1>The right software<br />starts with your problem.</h1>
      <p>Whether you’re building something new or improving what’s already there, we start by understanding what needs to change.</p>
    </div>

    <div className="capability-layout">
      <aside><h2>Where do you<br />want to begin?</h2><p>Explore the scope below, or tell us what isn’t working. We’ll help you find a sensible starting point.</p><TextLink href="/contact">Talk it through</TextLink></aside>
      <div className="capabilities">{capabilities.map(({ label, title, text, items }) => <article key={title}>
        <Eyebrow>{label}</Eyebrow><h2>{title}</h2><p>{text}</p>
        {items.length > 0 && <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>}
      </article>)}</div>
    </div>

    <ClosingLine title="A clear scope comes first." action="Discuss your project" />
  </PageShell>
}
