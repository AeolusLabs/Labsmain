import Image from 'next/image'
import Link from 'next/link'
import { Panel, Story } from '@/components/new/story'
import { ParticleStage } from '@/components/new/particle-stage'
import { email, founders, projects, promises } from '@/components/new/content'
import { Spark } from '@/components/new/shell/spark'

export const metadata = { title: { absolute: 'AeolusLabs: AI products and business automation' } }

const tools = ['Social media', 'Messaging', 'Payments', 'CRM', 'Accounting', 'Email', 'Your database', 'Any other tool']
const steps = ['Listen.', 'Agree the plan.', 'Build together.', 'Plan what’s next.']

export default function NewHome() {
  return (
    <>
      <Story>
        <Panel labelledBy="np-t1">
          <h1 id="np-t1" className="np-h1">AI-powered products.<br />Business <em>automation.</em></h1>
          <p className="np-lead">We build AI-powered products and automation systems for businesses across Africa and beyond.</p>
        </Panel>
        <Panel side="right" scene="brain" labelledBy="np-t2">
          <p className="np-kicker">Intelligence</p>
          <h2 id="np-t2" className="np-h2">Smart businesses use intelligent systems that help improve efficiency.</h2>
        </Panel>
        <Panel scene="agent" labelledBy="np-t3">
          <p className="np-kicker">Agentic systems</p>
          <h2 id="np-t3" className="np-h2">We build agentic AI systems.</h2>
          <p className="np-lead">They connect to the systems we build, or plug into the ones your business already runs on.</p>
          <ul className="np-dots-list">{tools.map(t => <li key={t}>{t}</li>)}</ul>
        </Panel>
        <Panel side="right" scene="cube" labelledBy="np-t4">
          <p className="np-kicker">Simplify</p>
          <h2 id="np-t4" className="np-h2">We help businesses simplify complex processes and problems.</h2>
        </Panel>
        <Panel scene="bulb" labelledBy="np-t5">
          <p className="np-kicker">Build with us</p>
          <h2 id="np-t5" className="np-h2">Build your own product.</h2>
          <p className="np-lead">Bring your bright ideas to us and we build it.</p>
        </Panel>

        <Panel flow labelledBy="np-t6">
          <div className="np-flow-head">
            <h2 id="np-t6" className="np-h2">Things we built.</h2>
          </div>
          <ul className="np-cards">
            {projects.map(p => (
              <li key={p.slug} className="np-card">
                <Link href={`/new/work/${p.slug}`}>
                  <Image className="np-card-img" src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="(max-width: 760px) 100vw, 30vw" />
                  <h3 className="np-h3">{p.name}</h3>
                  <p className="np-lead">{p.line}</p>
                  <p className="np-small">{p.kind}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel flow labelledBy="np-t7">
          <div className="np-flow-head">
            <h2 id="np-t7" className="np-h2">How we work.</h2>
          </div>
          <ol className="np-steps">{steps.map(s => <li key={s}>{s}</li>)}</ol>
          <ul className="np-promises">
            {promises.map(([title, line]) => <li key={title}><b>{title}</b>{line}</li>)}
          </ul>
        </Panel>

        <Panel flow labelledBy="np-t8">
          <h2 id="np-t8" className="np-h2">Two founders. One goal.</h2>
          <p className="np-lead">Help African businesses use AI that fits how they work.</p>
          <ul className="np-founders">{founders.map(f => <li key={f}>{f}</li>)}</ul>
        </Panel>

        <Panel className="np-panel--last" labelledBy="np-t9">
          <h2 id="np-t9" className="np-h2">What would you <em>automate?</em></h2>
          <Link className="np-btn" href="/new/contact"><Spark />Discuss your next step</Link>
          <br />
          <a className="np-mail np-link" href={`mailto:${email}`}>{email}</a>
        </Panel>
      </Story>
      <ParticleStage />
    </>
  )
}
