import { gate1 } from '../data/chapter1'
import './sections.css'

export default function Gate1() {
  const { learningSystem: ls, knowingVsUnderstanding: ku, infoVsKnowledge: ik } = gate1

  return (
    <section className="section section--paper" id="gate-1" aria-labelledby="gate-1-title">
      <div className="container">
        <header className="gateHead">
          <span className="gateHead__num">{gate1.number}</span>
          <h2 className="section-title" id="gate-1-title">
            {gate1.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        <div className="blocks">
          <article>
            <h3 className="block__title">{ls.title}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p>{ls.paragraph}</p>
            <p>{ls.meetingLead}</p>
            <div className="sides">
              {ls.sides.map((s) => (
                <div className={`side${s.key === 'red' ? ' side--red' : ''}`} key={s.key}>
                  <span className="side__term">{s.term}</span>
                  <span>{s.text}</span>
                </div>
              ))}
            </div>
          </article>

          <aside className="callout">
            <span className="callout__label">{ls.callout.label}</span>
            <p>{ls.callout.text}</p>
          </aside>

          <div className="grid-2">
            <article className="card card--pad kuCard">
              <h3 className="card-title">{ku.title}</h3>
              <span className="gold-rule gold-rule--sm" aria-hidden="true" />
              <p>{ku.lead}</p>
              <div className="layers">
                {ku.layers.map((l) => (
                  <div className="layer" key={l.term}>
                    <span className="layer__term">{l.term}</span>
                    <span>{l.text}</span>
                  </div>
                ))}
              </div>
              <p>{ku.closing}</p>
            </article>

            <article className="card card--pad">
              <h3 className="card-title">{ik.title}</h3>
              <span className="gold-rule gold-rule--sm" aria-hidden="true" />
              <p>{ik.paragraph}</p>
              <aside className="callout callout--example" style={{ marginTop: '18px' }}>
                <span className="callout__label">{ik.example.label}</span>
                <p>{ik.example.text}</p>
              </aside>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
