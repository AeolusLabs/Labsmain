import { PageShell } from '@/components/site-header'
import { ClosingLine, Eyebrow } from '@/components/page-parts'

export const metadata = { title: 'About', description: 'The founders, mission and principles behind AeolusLabs.' }

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
      <div><Eyebrow>About AeolusLabs</Eyebrow><h1>Two developers.<br />A shared purpose.</h1></div>
      <p>We build useful software for African businesses. Our starting point is the people, processes and problems behind the idea.</p>
    </div>

    <div className="people-line">{founders.map(([first, last]) => <article key={last}><Eyebrow>Co-founder / Software developer</Eyebrow><h2>{first}<br />{last}</h2></article>)}</div>

    <div className="about-story">
      <Eyebrow>Why we started</Eyebrow>
      <div>
        <h2>We noticed gaps.<br />Then started building.</h2>
        <p>We began by solving problems we encountered ourselves. That experience became a company built around helping other businesses find useful ways forward.</p>
        <p>Our mission is to build practical software that bridges the gap between African businesses and the technology they need. We’re working towards an Africa where businesses of every size can access technology that helps them operate efficiently, innovate and grow.</p>
      </div>
    </div>

    <div className="about-principles">
      <Eyebrow>How we work</Eyebrow>
      <div>{principles.map(([lead, rest]) => <p key={lead}><strong>{lead}</strong> {rest}</p>)}</div>
    </div>

    <ClosingLine title="Let’s understand your next step." action="Start a conversation" />
  </PageShell>
}
