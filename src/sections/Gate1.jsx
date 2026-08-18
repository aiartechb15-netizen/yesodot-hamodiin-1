import { gate1 } from '../data/chapter1'
import './sections.css'

/* חץ זעיר בכיוון הקריאה בעברית (ימין ← שמאל) */
function FlowArrow() {
  return (
    <svg className="flowMini__arrow" viewBox="0 0 34 10" width="30" height="10" aria-hidden="true" focusable="false">
      <path
        d="M32 5H3M8.5 1 3 5l5.5 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* סימן המפגש בין שני הצדדים — חץ דו־כיווני זעיר על הקו המפריד */
function MeetMark() {
  return (
    <span className="meet__mark" aria-hidden="true">
      <svg viewBox="0 0 30 12" width="22" height="10" focusable="false">
        <path
          d="M2 6h26M6.5 2 2 6l4.5 4M23.5 2 28 6l-4.5 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

/* תרשים זעיר: מקצה גולמי לקצה מעובד */
function FlowMini({ from, to }) {
  return (
    <p className="flowMini" aria-hidden="true">
      <span className="flowMini__node flowMini__node--from">{from}</span>
      <FlowArrow />
      <span className="flowMini__node flowMini__node--to">{to}</span>
    </p>
  )
}

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
              {i === 0 ? (
                <>
                  <span className="meet__rule" aria-hidden="true" />
                  <MeetMark />
                </>
              ) : null}
            </div>
          ))}
        </div>

        {/* הרעיון המרכזי — ה-takeaway של החלק */}
        <blockquote className="keyIdea">
          <span className="keyIdea__label">{ls.callout.label}</span>
          <p className="keyIdea__text">{ls.callout.text}</p>
        </blockquote>

        {/* שני הרבדים — שתי עמודות פתוחות שמופרדות בקו דק */}
        <div className="rails">
          <article>
            <h3 className="rail__title">{ku.title}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <FlowMini from={ku.layers[0].term} to={ku.layers[1].term} />
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
            <FlowMini from={ik.flow[0]} to={ik.flow[1]} />
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
