import { ButtonLink } from '@/components/site-header'
import Image from 'next/image'

export function TikvahFeature() {
  return <section className="split-section">
    <div><span className="product-tag">Client project · Complete web application</span><h2>Tikvah</h2><p className="large-copy">A quieter place to be heard.</p><Image className="tikvah-feature-screen" src="/projects/tikvah/home-desktop.png" alt="Tikvah’s actual public homepage" width={2560} height={1800} sizes="(max-width: 700px) 90vw, 45vw" unoptimized /></div>
    <div><p className="large-copy">An emotional-support platform built for private conversations with a human team.</p><p>AeolusLabs delivered the complete application, including the frontend and backend, bringing the client’s idea into a working web experience.</p><ButtonLink href="/work/tikvah">Explore the case study</ButtonLink></div>
  </section>
}
