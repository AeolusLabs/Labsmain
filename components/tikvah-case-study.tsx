import { PageShell, PageIntro, ButtonLink, CheckList, CtaBand } from '@/components/site-header'

export function TikvahCaseStudy() {
  return <PageShell>
    <PageIntro eyebrow="" title="Tikvah" text="A client-owned emotional-support web platform. Built in full by AeolusLabs, including the frontend and backend."/>
    <section className="split-section"><div><span className="product-tag">Client project</span><h2>Room for a human conversation.</h2></div><div><p className="large-copy">Tikvah offers a space for people to share what they are experiencing and hear back from a real person on its team.</p><p>The experience centres on personal correspondence rather than public profiles, feeds or comments. Its public pages also guide visitors towards resources and professional support.</p></div></section>
    <section className="split-section"><h2>The challenge</h2><p className="large-copy">Turn the client’s idea for a supportive, personal online space into a complete application, with a clear way to begin and a backend supporting the experience.</p></section>
    <section className="split-section"><h2>What we delivered</h2><div><CheckList items={['Complete web application development','Frontend interfaces and supporting backend','Account registration and sign-in experience','A platform organised around correspondence with the Tikvah team','Public information, resources and support navigation']}/><p className="form-note">Scope confirmed by the AeolusLabs founders. Tikvah is a client project and is featured with the client’s permission.</p></div></section>
    <section className="split-section"><h2>The result</h2><div><p className="large-copy">A publicly accessible web platform with a clear introduction, account entry points and routes to further support.</p><p>Tikvah describes its service as a caring first step, rather than a replacement for professional or emergency care.</p><ButtonLink href="https://www.tikvah.space/">Visit Tikvah</ButtonLink></div></section>
    <CtaBand/>
  </PageShell>
}
