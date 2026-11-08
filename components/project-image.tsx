'use client'

import Image from 'next/image'
import { useRef } from 'react'

export function ProjectImage({ src, alt, width, height, sizes, animate = false, triggerOnly = false }: { src: string; alt: string; width: number; height: number; sizes: string; animate?: boolean; triggerOnly?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null)
  return <>
    <button type="button" className="project-image-open" aria-label={`Enlarge: ${alt}`} onClick={() => dialog.current?.showModal()}>
      {!triggerOnly && <Image src={src} alt={alt} width={width} height={height} sizes={sizes} data-clip-img={animate ? '' : undefined} />}
      <span>View full size ↗</span>
    </button>
    <dialog ref={dialog} className="project-image-dialog" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
      <div className="project-image-toolbar"><span>Actual website · High-resolution capture</span><button type="button" onClick={() => dialog.current?.close()} aria-label="Close image viewer">Close ×</button></div>
      <Image src={src} alt={alt} width={width} height={height} unoptimized />
      <a href={src} target="_blank" rel="noopener noreferrer">Open original image ↗</a>
    </dialog>
  </>
}
