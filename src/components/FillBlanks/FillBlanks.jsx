import { useId, useRef, useState } from 'react'
import Icon from '../Icons/Icons'
import './FillBlanks.css'

/**
 * השלמת משפטים מתוך אוצר מילים. הבחירה נעשית מרשימה נפתחת,
 * והפתרון נחשף רק אחרי לחיצה על "בדיקה".
 */
export default function FillBlanks({ bank, bankLabel, sentences, hint, onResult }) {
  const uid = useId()
  const [values, setValues] = useState({})
  const [checked, setChecked] = useState(false)
  const feedbackRef = useRef(null)

  const answeredAll = sentences.every((s) => values[s.id])
  const correctCount = sentences.filter((s) => values[s.id] === s.answer).length
  const allCorrect = correctCount === sentences.length

  const check = () => {
    setChecked(true)
    if (onResult) onResult(allCorrect)
    window.requestAnimationFrame(() => feedbackRef.current?.focus())
  }

  return (
    <div className="fill">
      <div className="fill__bank">
        <span className="fill__bankLabel">{bankLabel}</span>
        <ul className="fill__bankList">
          {bank.map((w) => (
            <li key={w} className="fill__chip">
              {w}
            </li>
          ))}
        </ul>
      </div>

      {hint ? <p className="fill__hint small muted">{hint}</p> : null}

      <ol className="fill__list">
        {sentences.map((s, i) => {
          const val = values[s.id] || ''
          const ok = checked && val === s.answer
          const bad = checked && val !== s.answer
          return (
            <li className={`fill__item${ok ? ' is-correct' : ''}${bad ? ' is-wrong' : ''}`} key={s.id}>
              <span className="fill__num ltr-num">{i + 1}</span>
              <p className="fill__sentence">
                {s.before}
                <span className="fill__slot">
                  <label className="sr-only" htmlFor={`${uid}-${s.id}`}>
                    השלמה למשפט מספר {i + 1}
                  </label>
                  <select
                    id={`${uid}-${s.id}`}
                    className="fill__select"
                    value={val}
                    disabled={checked}
                    onChange={(e) => setValues((v) => ({ ...v, [s.id]: e.target.value }))}
                  >
                    <option value="">— בחרו —</option>
                    {bank.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </span>
                {s.after}
              </p>
              {bad ? (
                <p className="fill__answer">
                  <span className="term">התשובה הנכונה: </span>
                  {s.answer}
                </p>
              ) : null}
            </li>
          )
        })}
      </ol>

      <div className="fill__feedbackWrap" tabIndex={-1} ref={feedbackRef} aria-live="polite">
        {checked ? (
          <div className={`fill__feedback${allCorrect ? ' is-correct' : ' is-wrong'}`}>
            <span className="fill__feedbackTitle">
              <Icon name={allCorrect ? 'check' : 'close'} size={18} />
              {allCorrect ? 'כל המשפטים הושלמו נכון' : 'חלק מהמשפטים אינם מדויקים'}
            </span>
            <p className="small">
              השלמתם נכון <span className="ltr-num">{correctCount}</span> מתוך{' '}
              <span className="ltr-num">{sentences.length}</span> משפטים.
            </p>
          </div>
        ) : null}
      </div>

      <div className="fill__actions">
        {!checked ? (
          <button className="btn btn--sm" type="button" disabled={!answeredAll} onClick={check}>
            בדיקה
          </button>
        ) : null}
      </div>
    </div>
  )
}
