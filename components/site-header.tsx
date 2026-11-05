import Link from 'next/link'
import type { ReactNode } from 'react'
import { Brand } from './brand'
import { Navigation } from './navigation'
import { ThemeToggle } from './theme-toggle'

export function SiteHeader() {
  return <header className="site-header wrap">
    <Link href="/" className="brand" aria-label="AeolusLabs home"><Brand /></Link>
    <div className="header-tools"><Navigation /><ThemeToggle /></div>
  </header>
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="wrap">
    <span>AeolusLabs · Digitalize. Automate. Elevate.</span>
    <nav aria-label="Footer navigation"><Link href="/work">Work</Link><Link href="/products">Products</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link></nav>
    <span>© {new Date().getFullYear()} AeolusLabs</span>
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
