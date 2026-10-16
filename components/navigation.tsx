'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
const links = [['Work','/work'],['Solutions','/solutions'],['Products','/products'],['About','/about'],["Let's talk",'/contact']]
export function Navigation() {
  const [open,setOpen] = useState(false)
  const path = usePathname()
  return <><button className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav id="main-navigation" className={`desktop-nav ${open?'is-open':''}`} aria-label="Main navigation" onKeyDown={e=>{if(e.key==='Escape')setOpen(false)}}>{links.map(([label,href])=><Link key={href} href={href} aria-current={path===href?'page':undefined} className={href==='/contact'?'nav-cta':''} onClick={()=>setOpen(false)}>{label}</Link>)}</nav></>
}
