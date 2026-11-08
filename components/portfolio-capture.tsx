import type { ReactNode } from 'react'
import { ProjectImage } from './project-image'
import { imageSizes } from '@/design-system/media'

export function PortfolioCapture({ src, alt, caption }: { src: string; alt: string; caption: ReactNode }) {
  return <figure className="portfolio-capture">
    <ProjectImage src={src} alt={alt} width={1440} height={1000} sizes={imageSizes.full} />
    <figcaption>{caption}</figcaption>
  </figure>
}
