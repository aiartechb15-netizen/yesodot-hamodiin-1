import ResearchApproaches from '../components/ResearchApproaches/ResearchApproaches'
import ExpandCards from '../components/ExpandCards/ExpandCards'
import { approaches, choosingApproach } from '../data/chapter1'
import './sections.css'

export default function ApproachesSection() {
  return (
    <>
      <section className="section section--white" id="approaches" aria-labelledby="approaches-title">
        <div className="container">
          <h2 className="section-title" id="approaches-title">
            {approaches.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead" style={{ maxWidth: '840px' }}>
            {approaches.intro}
          </p>
          <p className="muted small" style={{ marginBottom: '26px' }}>
            {approaches.hint}
          </p>
          <ResearchApproaches />
        </div>
      </section>

      <section className="section section--paper" id="choosing-approach" aria-labelledby="choosing-title">
        <div className="container">
          <h2 className="section-title" id="choosing-title">
            {choosingApproach.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead" style={{ maxWidth: '760px', marginBottom: '30px' }}>
            {choosingApproach.intro}
          </p>

          <ExpandCards items={choosingApproach.factors} columns={2} uniformHeight />

          <aside className="callout" style={{ marginTop: '30px' }}>
            <span className="callout__label">{choosingApproach.callout.label}</span>
            <p>{choosingApproach.callout.text}</p>
          </aside>
        </div>
      </section>
    </>
  )
}
