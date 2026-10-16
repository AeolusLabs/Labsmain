import { ArrowUpRight, Plus } from 'lucide-react'
import Link from "next/link"

import { Brand } from './brand'
import { Navigation } from './navigation'
import { projects, services } from '@/lib/content'
export { projects, services }
export function SiteHeader() { return <header className="site-header"><Link href="/" className="brand" aria-label="AeolusLabs home"><Brand /></Link><Navigation /></header> }
export function SiteFooter() { return <footer className="site-footer"><div><Brand/><p>Digitalize. Automate. Elevate.</p></div><div className="footer-links"><Link href="/work">Work</Link><Link href="/products">Products</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link></div><p>(c) {new Date().getFullYear()} AeolusLabs</p></footer> }
export function PageShell({children}: {children: React.ReactNode}) { return <div className="site-frame"><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader/><main id="main-content">{children}</main><SiteFooter/></div> }

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="arrow-link">{children} <ArrowUpRight size={16} aria-hidden="true"/></Link>
}

export function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{children}</span></div>
}

export function ProjectVisual({ color = "cyan" }: { color?: string }) {
  return <div className={`project-visual ${color}`}><span className="visual-grid" /><span className="visual-orb" /><span className="visual-line" /></div>
}

export function ProjectCard({ project }: { project: typeof projects[number] }) {
  return <Link href={`/work/${project.slug}`} className="project-card"><ProjectVisual color={project.color} /><div className="project-card-copy"><span className="eyebrow">{project.type}</span><h3>{project.title}</h3><p>{project.description}</p><span className="arrow-link">View case study <ArrowUpRight size={16} aria-hidden="true"/></span></div></Link>
}

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="page-intro"><h1>{title}</h1><p>{text}</p></section>
}

export function ButtonLink({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link href={href} className={`button-link ${secondary ? "secondary" : ""}`}>{children}<ArrowUpRight size={16} aria-hidden="true"/></Link>
}

export function CtaBand() {
  return <section className="cta-band"><p>Have a problem worth solving?</p><h2>Let&apos;s make something useful.</h2><ButtonLink href="/contact">Tell us your challenge</ButtonLink></section>
}

export function FeatureGrid({ items }: { items: { title: string; text: string }[] }) {
  return <div className="feature-grid">{items.map((item, i) => <article className="feature-item" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
}

export function CheckList({ items }: { items: string[] }) {
  return <ul className="check-list">{items.map(item => <li key={item}><Plus size={16} aria-hidden="true"/>{item}</li>)}</ul>
}

export function ContactPrompt() {
  return <div className="contact-prompt"><span className="eyebrow">Start a conversation</span><h3>Not sure what you need yet?</h3><p>You only need to bring the problem. We&apos;ll help you understand the possible paths forward.</p><ButtonLink href="/contact" secondary>Tell us your challenge</ButtonLink></div>
}

export function MobileNavNote() { return null }

export { PageShell as default }
