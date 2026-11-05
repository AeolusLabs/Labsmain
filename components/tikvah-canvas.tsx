'use client'

import { imageSizes } from '@/design-system/media'
import Image from 'next/image'
import Link from 'next/link'
import { useId, useState, type KeyboardEvent } from 'react'

type View = 'desktop' | 'mobile'

export function TikvahCanvas() {
  const [view, setView] = useState<View>('desktop')
  const id = useId()

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const next: View = view === 'desktop' ? 'mobile' : 'desktop'
    setView(next)
    document.getElementById(`${id}-${next}`)?.focus()
  }

  return <div className="showcase">
    <div className="switch" role="tablist" aria-label="Tikvah view" data-value={view}>
      <span className="thumb" aria-hidden="true" />
      <button type="button" role="tab" id={`${id}-desktop`} aria-selected={view === 'desktop'} aria-controls={`${id}-panel`} tabIndex={view === 'desktop' ? 0 : -1} onClick={() => setView('desktop')} onKeyDown={onKeyDown}>Whole site</button>
      <button type="button" role="tab" id={`${id}-mobile`} aria-selected={view === 'mobile'} aria-controls={`${id}-panel`} tabIndex={view === 'mobile' ? 0 : -1} onClick={() => setView('mobile')} onKeyDown={onKeyDown}>Mobile</button>
    </div>
    <div className="shot" data-view={view} id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${view}`}>
      <Link className="shot-link" href="/work/tikvah" aria-hidden="true" tabIndex={-1} />
      <Image className="shot-img" src="/projects/tikvah/home-desktop.webp" width={2560} height={1800} sizes={imageSizes.feature} alt="Tikvah’s public homepage, introducing its private support service" data-show={view === 'desktop'} aria-hidden={view !== 'desktop'} unoptimized priority />
      <Image className="shot-img is-mobile" src="/projects/tikvah/home-mobile.webp" width={780} height={1688} sizes={imageSizes.feature} alt="Tikvah’s public homepage on a phone, introducing its private support service" data-show={view === 'mobile'} aria-hidden={view !== 'mobile'} unoptimized />
    </div>
  </div>
}
