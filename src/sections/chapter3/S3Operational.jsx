import { useState } from 'react'
import Icon from '../../components/Icons/Icons'
import { operational as op } from '../../data/chapter3'
import './chapter3.css'

/* המצפן שבמרכז מפת הצרכנים, וארבעת הקווים הדקים שיוצאים ממנו אל
   הצרכנים. הכול קו בלבד — בלי מילוי, בלי מסגרת ובלי צל. */
function Dial() {
  return (
    <svg className="opdial__art" viewBox="0 0 100 100" fill="none" aria-hidden="true" focusable="false">
      {/* הקווים אל ארבעת הצרכנים */}
      <g className="opdial__links" stroke="var(--gold)" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <path d="M50 42V16" />
        <path d="M58 50h26" />
        <path d="M50 58v26" />
        <path d="M42 50H16" />
      </g>
      {/* המצפן */}
      <g stroke="var(--teal)" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <circle cx="50" cy="50" r="21" opacity="0.4" />
        <circle cx="50" cy="50" r="13" opacity="0.28" strokeDasharray="2 5" />
      </g>
      <path
        className="opdial__needle"
        d="M50 33l5.5 17L50 67l-5.5-17z"
        stroke="var(--gold)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="50" cy="50" r="1.8" fill="var(--gold)" />
    </svg>
  )
}

/* חמש התחנות לפי סדר המסלול המבוקש. הניסוחים הם אלה שבקובץ הנתונים;
   כאן נקבע רק הסדר שבו הן מופיעות על הנתיב. */
const PATH_ORDER = ['h1', 'h4', 'h5', 'h2', 'h3']

export default function S3Operational() {
  const stations = PATH_ORDER.map((id) => op.how.find((h) => h.id === id)).filter(Boolean)
  const [open, setOpen] = useState(stations[0]?.id ?? null)

  return (
    <section className="section section--white opsec" id={op.id} aria-labelledby="ch3-op-title">
      <div className="container opsec__wrap">
        {/* ---------- מסך ראשון: מטרת המודיעין והצרכנים ---------- */}
        <div className="opscreen">
          <h2 className="section-title" id="ch3-op-title">
            {op.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />

          {/* המטרה — טקסט פתוח על הרקע, בלי כרטיס ובלי מלבן */}
          <p className="opsec__label">{op.purposeLabel}</p>
          <p className="opsec__purpose">{op.purpose}</p>

          <h3 className="opsec__sub">{op.consumersTitle}</h3>
          <span className="gold-rule gold-rule--sm" aria-hidden="true" />

          <div className="opdial">
            <Dial />
            <span className="opdial__center" aria-hidden="true" />
            {op.consumers.map((c, i) => (
              <span className={`opnode opnode--${i}`} key={c.id}>
                <span className="opnode__icon" aria-hidden="true">
                  <Icon name={c.icon} size={26} />
                </span>
                <span className="opnode__title">{c.title}</span>
              </span>
            ))}
          </div>

          {/* משפט המעבר — נקודה טורקיז וקו דק, כחלק מהנתיב */}
          <p className="opnote">
            <span className="opnote__dot" aria-hidden="true" />
            <span className="opnote__label">בשנים האחרונות</span>
            {op.consumersNote}
          </p>
        </div>

        {/* המשך הנתיב אל המסך השני — בלי קו הפרדה אופקי */}
        <span className="opsec__thread" aria-hidden="true" />

        {/* ---------- מסך שני: כיצד המודיעין ממלא את מטרתו ---------- */}
        <div className="opscreen">
          <h3 className="opsec__sub opsec__sub--lead">{op.howTitle}</h3>
          <span className="gold-rule gold-rule--sm" aria-hidden="true" />
          <p className="opsec__hint">{op.howHint}</p>

          <ol className="oppath">
            {stations.map((item, i) => {
              const isOpen = item.id === open
              return (
                <li className={`opstop${isOpen ? ' is-open' : ''}`} key={item.id}>
                  <button
                    type="button"
                    className="opstop__btn"
                    aria-expanded={isOpen}
                    aria-controls={`opstop-${item.id}`}
                    onClick={() => setOpen(item.id)}
                  >
                    <span className="opstop__num ltr-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="opstop__icon" aria-hidden="true">
                      <Icon name={item.icon} size={22} />
                    </span>
                    <span className="opstop__title">{item.title}</span>
                  </button>

                  <div className="opstop__panel" id={`opstop-${item.id}`}>
                    <span className="opstop__panelRule" aria-hidden="true" />
                    <p className="opstop__text">{item.text}</p>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* סוף הנתיב — התוצר, כטקסט על הרקע */}
          <p className="opnote opnote--end">
            <span className="opnote__dot opnote__dot--gold" aria-hidden="true" />
            <span className="opnote__label">מן הניתוח לבסיס המודיעיני</span>
            {op.outcome}
          </p>

          <h3 className="opsec__sub opsec__sub--sm">{op.questionsTitle}</h3>
          <ul className="opq">
            {op.questions.map((q, i) => (
              <li key={q}>
                <span className="opq__num ltr-num" aria-hidden="true">
                  {i + 1}
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
