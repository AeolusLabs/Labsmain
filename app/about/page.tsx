import { PageShell } from '@/components/site-header'
import { ClosingLine, Eyebrow } from '@/components/page-parts'

export const metadata = { title: 'About', description: 'Meet the collective behind AeolusLabs: AI-powered products and automation systems for businesses.' }

const founders = [['Allan', 'Ajayi-Adjari'], ['Bernard', 'Nneboh']]
const principles = [
  ['Understand first.', 'Listen before choosing a solution.'],
  ['Build deliberately.', 'Keep the work focused on a clear need.'],
  ['Communicate openly.', 'Keep you involved as the work takes shape.'],
  ['Keep improving.', 'Learn from use and plan the next useful change.'],
]

export default function About() {
  return <PageShell>
    <div className="about-opening">
      <div><Eyebrow>About AeolusLabs</Eyebrow><h1>Different perspectives.<br />A shared purpose.</h1></div>
      <p>We’re a collective combining technology and business development to build AI-powered products and automation systems for businesses in Nigeria, across Africa and beyond.</p>
    </div>

    <div className="people-line">{founders.map(([first, last]) => <article key={last}><Eyebrow>Co-founder</Eyebrow><h2>{first}<br />{last}</h2></article>)}</div>

    <div className="about-story">
      <Eyebrow>What defines us</Eyebrow>
      <div>
        <h2>Technology meets<br />business thinking.</h2>
        <p>A useful product needs a clear business purpose. An automation system needs to fit the people and processes using it. We bring these perspectives together, from understanding the need to shaping what gets built.</p>
        <p>Our mission is to help African businesses put practical AI and automation to work. We’re working towards an Africa where businesses of every size can access technology that helps them operate efficiently, innovate and grow.</p>
      </div>
    </div>

    <div className="about-principles">
      <Eyebrow>How we work</Eyebrow>
      <div>{principles.map(([lead, rest]) => <p key={lead}><strong>{lead}</strong> {rest}</p>)}</div>
    </div>

    <ClosingLine title="What could you build or automate?" action="Start a conversation" />
  </PageShell>
}
