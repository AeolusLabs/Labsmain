import Link from 'next/link'
import type { ReactNode } from 'react'

export function Arrow() {
  return <span className="motion-arrow" aria-hidden="true">↗</span>
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>
}

export function TextLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return <Link className="text-link" href={href} {...props}>{children} <Arrow /></Link>
}

export function ButtonLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="button" href={href}>{children} <Arrow /></Link>
}

export function ClosingLine({ title, action, href = '/contact' }: { title: string; action: string; href?: string }) {
  return <div className="closing-line"><h2>{title}</h2><ButtonLink href={href}>{action}</ButtonLink></div>
}
