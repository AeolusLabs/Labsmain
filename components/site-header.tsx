import Link from 'next/link'
import type { ReactNode } from 'react'
import { Brand } from './brand'
import { Navigation } from './navigation'

export function SiteHeader() {
  return <header className="site-header wrap">
    <Link href="/" className="brand" aria-label="AeolusLabs home"><Brand /></Link>
    <div className="header-tools"><Navigation /></div>
  </header>
}

/** One footer for every route, so every page links to every section. */
export function SiteFooter() {
  return <footer className="site-footer"><div className="wrap">
    <span>{`© ${new Date().getFullYear()} AeolusLabs. AI products & automation. Built in Nigeria.`}</span>
    <div className="footer-end"><nav aria-label="Footer navigation"><Link href="/work">Work</Link><Link href="/solutions">Solutions</Link><Link href="/products">Products</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link></nav><span data-motion-slot="" /></div>
  </div></footer>
}

export function PageShell({ children, bare = false }: { children: ReactNode; bare?: boolean }) {
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader />
    <main id="main-content" className={bare ? 'page page-bare' : 'wrap page'}>{children}</main>
    <SiteFooter />
  </>
}
