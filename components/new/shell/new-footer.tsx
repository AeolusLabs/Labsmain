import Link from 'next/link'
import { brainCredit } from '../content'
import { MotionToggle } from './motion-toggle'

const links = [
  { label: 'Work', href: '/new/work' },
  { label: 'What we do', href: '/new/what-we-do' },
  { label: 'About', href: '/new/about' },
  { label: 'Contact', href: '/new/contact' },
  { label: 'Privacy', href: '/new/privacy' },
]

export function NewFooter() {
  return (
    <footer className="np-foot">
      <span>© AeolusLabs. AI products &amp; automation. Built in Nigeria.</span>
      <nav className="np-foot-nav" aria-label="Footer navigation">
        {links.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
      </nav>
      <MotionToggle />
      <span className="np-credit">{brainCredit.text} Licence: <a href={brainCredit.licenceUrl} rel="noopener noreferrer">{brainCredit.licence}</a>.</span>
    </footer>
  )
}
