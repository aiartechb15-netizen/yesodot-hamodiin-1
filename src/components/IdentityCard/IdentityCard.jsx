import { useId, useState } from 'react'
import Icon from '../Icons/Icons'
import './IdentityCard.css'

/**
 * "כרטיס זהות" — שפה גרפית אחידה לרמות המודיעין (תחנות 3 ו-6).
 * השורות מוצגות תמיד; השאלות לדוגמה נפתחות בלחיצה בלבד.
 */
export default function IdentityCard({ data, tone = 'navy' }) {
  const uid = useId()
  const [open, setOpen] = useState([])

  const toggle = (i) => setOpen((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]))

  return (
    <div className={`idcard idcard--${tone}`}>
      <div className="idcard__head">
        <h3 className="idcard__title">{data.cardTitle}</h3>
        <span className="gold-rule gold-rule--sm" aria-hidden="true" />
      </div>

      <dl className="idcard__rows">
        {data.rows.map((row) => (
          <div className="idcard__row" key={row.id}>
            <dt className="idcard__label">
              <span className="idcard__icon">
                <Icon name={row.icon} size={20} />
              </span>
              {row.label}
            </dt>
            <dd className="idcard__text">{row.text}</dd>
          </div>
        ))}
      </dl>

      <div className="idcard__questions">
        <h4 className="idcard__qTitle">{data.questionsTitle}</h4>
        <p className="idcard__qHint">{data.questionsHint}</p>
        <ul className="idcard__qList">
          {data.questions.map((q, i) => {
            const isOpen = open.includes(i)
            return (
              <li key={q}>
                <button
                  type="button"
                  className={`idcard__q${isOpen ? ' is-open' : ''}`}
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-q${i}`}
                  onClick={() => toggle(i)}
                >
                  <span className="idcard__qNum ltr-num">{i + 1}</span>
                  <span className="idcard__qLabel">
                    {isOpen ? 'שאלה לדוגמה' : 'לחשיפת השאלה'}
                  </span>
                  <Icon name="chevron" size={18} className="idcard__qChev" />
                </button>
                <p className="idcard__qText" id={`${uid}-q${i}`} hidden={!isOpen}>
                  {q}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
