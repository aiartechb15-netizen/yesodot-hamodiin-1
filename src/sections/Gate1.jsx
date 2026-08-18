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

        {/* פתיחה — טקסט פתוח, ללא כרטיס */}
        <h3 className="lsys__title">{ls.title}</h3>
        <span className="gold-rule gold-rule--sm" aria-hidden="true" />
        <p className="lsys__lead">{ls.paragraph}</p>

        {/* המפגש — מסגרת אחת שבתוכה שני הצדדים זה מול זה */}
        <p className="lsys__meet">{ls.meetingLead}</p>
        <div className="meet">
          {ls.sides.map((s, i) => (
            <div className={`meet__side meet__side--${s.key}`} key={s.key}>
              <span className="meet__term">
                <span className="meet__dot" aria-hidden="true" />
                {s.term}
              </span>
              <p className="meet__text">{s.text}</p>
              {i === 0 ? <span className="meet__rule" aria-hidden="true" /> : null}
            </div>
          ))}
        </div>

        {/* הרעיון המרכזי — משפט מוביל, לא כרטיס */}
        <blockquote className="keyIdea">
          <span className="gold-rule gold-rule--sm gold-rule--center" aria-hidden="true" />
          <span className="keyIdea__label">{ls.callout.label}</span>
          <p className="keyIdea__text">{ls.callout.text}</p>
        </blockquote>

        {/* שני הרבדים — שתי עמודות פתוחות שמופרדות בקו דק */}
        <div className="rails">
          <article>
            <h3 className="rail__title">{ku.title}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="rail__lead">{ku.lead}</p>

            <div className="steps2">
              {ku.layers.map((l, i) => (
                <div className={`step2 step2--${i === 0 ? 'from' : 'to'}`} key={l.term}>
                  <span className="step2__chip">{l.term}</span>
                  <p className="step2__text">{l.text}</p>
                </div>
              ))}
            </div>

            <p className="rail__closing">{ku.closing}</p>
          </article>

          <article>
            <h3 className="rail__title">{ik.title}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p>{ik.paragraph}</p>

            <div className="inset">
              <span className="inset__label">{ik.example.label}</span>
              <p>{ik.example.text}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
