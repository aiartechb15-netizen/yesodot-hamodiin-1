import IntelligenceCycle from '../components/IntelligenceCycle/IntelligenceCycle'
import { intelligenceCycle } from '../data/chapter1'
import './sections.css'

export default function CycleSection() {
  return (
    <section className="section section--cream" id="by-process" aria-labelledby="by-process-title">
      <div className="container">
        <h2 className="section-title" id="by-process-title">
          {intelligenceCycle.title}
        </h2>
        <span className="gold-rule" aria-hidden="true" />
        <p className="lead" style={{ maxWidth: '860px' }}>
          {intelligenceCycle.intro}
        </p>
        <p className="muted small" style={{ marginBottom: '34px' }}>
          {intelligenceCycle.hint}
        </p>

        <IntelligenceCycle />

        <aside className="callout callout--teal" style={{ marginTop: '34px' }}>
          <span className="callout__label">{intelligenceCycle.callout.label}</span>
          <p>{intelligenceCycle.callout.text}</p>
        </aside>
      </div>
    </section>
  )
}
