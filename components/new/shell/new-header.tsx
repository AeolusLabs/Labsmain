import Link from 'next/link'
import { cta, nav } from '../content'
import { PalettePicker } from './palette-picker'
import { Spark } from './spark'

export function NewHeader() {
  return (
    <header className="np-bar">
      <Link className="np-logo" href="/new" aria-label="AeolusLabs home">Aeolus<b>Labs</b></Link>
      <nav className="np-nav" aria-label="Main navigation">
        {nav.map(item => <Link key={item.href} className="np-nav-link" href={item.href}>{item.label}</Link>)}
        <Link className="np-nav-cta" href={cta.href}><Spark />{cta.label}</Link>
      </nav>
      <PalettePicker />
    </header>
  )
}
