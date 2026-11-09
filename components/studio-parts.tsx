import type { ReactNode } from 'react'
import { SiteFooter, SiteHeader } from './site-header'
import { StudioExperience } from './home-experience'
import { ButtonLink } from './page-parts'

/** Shell shared by every remodelled route: wind atmosphere behind the header and hero, then content, then footer. */
export function StudioPage({ children }: { children: ReactNode }) {
  return <StudioExperience>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="home-atmosphere" aria-hidden="true"><canvas data-wind="" /><div data-spot="" /></div>
    <SiteHeader />
    <main id="main-content">{children}</main>
    <SiteFooter />
  </StudioExperience>
}

/** Words of a headline, each rising from its own masked line. `accent` words take the accent colour. */
export function HeroLines({ lines }: { lines: ReactNode[] }) {
  return <>{lines.map((line, index) => <span className="home-line-mask" key={index}><span data-hw="">{line}</span></span>)}</>
}

/** Large closing statement with a single action. */
export function StudioClosing({ title, action, href = '/contact' }: { title: ReactNode; action: string; href?: string }) {
  return <section className="studio-closing wrap" aria-labelledby="closing-title">
    <h2 id="closing-title" data-reveal="">{title}</h2>
    <span data-magnet=""><ButtonLink href={href}>{action}</ButtonLink></span>
  </section>
}
