'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Arrow } from './page-parts'

const links = [
  { label: 'Work', href: '/work' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Start a conversation', href: '/contact', arrow: true },
]

export function Navigation() {
  const path = usePathname()
  const isCurrent = (href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`))
  return <nav className="site-nav" aria-label="Main navigation">{links.map(({ label, href, arrow }) => <Link key={href} href={href} className={arrow ? 'button' : undefined} aria-current={isCurrent(href) ? 'page' : undefined}>{label}{arrow && <> <Arrow /></>}</Link>)}</nav>
}
