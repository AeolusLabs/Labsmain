import { ProjectImage } from './project-image'

export function TikvahScreens() {
  return <section className="tikvah-gallery" aria-labelledby="tikvah-gallery-title">
    <div className="tikvah-gallery-heading"><div><span className="product-tag">The actual experience</span><h2 id="tikvah-gallery-title">From first visit to a place to begin.</h2></div><p>Public pages captured from Tikvah in October 2026. Desktop and mobile views of the delivered website.</p></div>
    <div className="tikvah-screen-grid">
      <figure><ProjectImage src="/projects/tikvah/home-desktop.png" alt="Tikvah desktop homepage with its introduction, plant illustration and account entry point" width={2560} height={1800} sizes="(max-width: 700px) 90vw, (max-width: 1240px) 90vw, 1100px" /><figcaption>The public homepage introduces the service and offers a clear next step.</figcaption></figure>
      <figure className="tikvah-phone"><ProjectImage src="/projects/tikvah/home-mobile.png" alt="Tikvah homepage adapted to a mobile screen" width={780} height={1688} sizes="(max-width: 700px) 65vw, 25vw" /><figcaption>The same experience on mobile.</figcaption></figure>
    </div>
    <p className="tikvah-source">Source: <a href="https://www.tikvah.space/" target="_blank" rel="noopener noreferrer">Tikvah’s public website ↗</a>. Screenshots show public pages; account creation and private correspondence were not tested.</p>
  </section>
}
