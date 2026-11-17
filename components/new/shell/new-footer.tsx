import Link from 'next/link'
import { brainCredit, footerLinks } from '../content'
import { MotionToggle } from './motion-toggle'

export function NewFooter() {
  return (
    <footer className="np-foot">
      <span>© AeolusLabs. AI products &amp; automation. Built in Nigeria.</span>
      <nav className="np-foot-nav" aria-label="Footer navigation">
        {footerLinks.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
      </nav>
      <MotionToggle />
      <span className="np-credit"><a href={brainCredit.sourceUrl} rel="noopener noreferrer">{brainCredit.title}</a> by {brainCredit.author} on {brainCredit.platform}, via <a href={brainCredit.hostUrl} rel="noopener noreferrer">{brainCredit.host}</a> ({brainCredit.hostAuthor}). {brainCredit.change} Licence: <a href={brainCredit.licenceUrl} rel="noopener noreferrer">{brainCredit.licence}</a>.</span>
    </footer>
  )
}
