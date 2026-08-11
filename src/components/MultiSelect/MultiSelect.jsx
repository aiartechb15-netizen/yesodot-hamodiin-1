import { useId, useRef, useState } from 'react'
import Icon from '../Icons/Icons'
import './MultiSelect.css'

/**
 * תרגול "סמנו את כל התשובות הנכונות".
 * הפתרון אינו נחשף לפני לחיצה על "בדיקה".
 */
export default function MultiSelect({
  options,
  question,
  scenarioLabel,
  scenario,
  checkLabel = 'בדיקה',
  retryLabel = 'ניסיון נוסף',
  correctLabel = 'תשובה נכונה',
  partialLabel = 'תשובה חלקית',
  incorrectLabel = 'לא מדויק',
  onResult,
}) {
  const uid = useId()
  const [picked, setPicked] = useState([])
  const [checked, setChecked] = useState(false)
  const feedbackRef = useRef(null)

  const toggle = (id) => {
    if (checked) return
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  }

  const correctIds = options.filter((o) => o.correct).map((o) => o.id)
  const hits = picked.filter((id) => correctIds.includes(id)).length
  const misses = picked.filter((id) => !correctIds.includes(id)).length
  const allCorrect = hits === correctIds.length && misses === 0
  const status = allCorrect ? 'correct' : hits > 0 ? 'partial' : 'incorrect'

  const check = () => {
    setChecked(true)
    if (onResult) onResult(allCorrect)
    window.requestAnimationFrame(() => feedbackRef.current?.focus())
  }

  const reset = () => {
    setChecked(false)
    setPicked([])
  }

  return (
    <div className="msel">
      {scenario ? (
        <aside className="callout msel__scenario">
          <span className="callout__label">{scenarioLabel}</span>
          <p>{scenario}</p>
        </aside>
      ) : null}

      <fieldset className="msel__set">
        <legend className="msel__question">{question}</legend>
        {options.map((o) => {
          const isPicked = picked.includes(o.id)
          const state = checked
            ? o.correct
              ? ' is-correct'
              : isPicked
                ? ' is-wrong'
                : ''
            : ''
          return (
            <label className={`msel__opt${isPicked ? ' is-picked' : ''}${state}`} key={o.id}>
              <input
                type="checkbox"
                name={`${uid}-opt`}
                checked={isPicked}
                disabled={checked}
                onChange={() => toggle(o.id)}
              />
              <span className="msel__text">{o.text}</span>
              {checked && o.why ? <span className="msel__why">{o.why}</span> : null}
            </label>
          )
        })}
      </fieldset>

      <div className="msel__feedbackWrap" tabIndex={-1} ref={feedbackRef} aria-live="polite">
        {checked ? (
          <div className={`msel__feedback is-${status}`}>
            <span className="msel__feedbackTitle">
              <Icon name={allCorrect ? 'check' : 'close'} size={18} />
              {allCorrect ? correctLabel : status === 'partial' ? partialLabel : incorrectLabel}
            </span>
            <p className="small">
              סימנתם <span className="ltr-num">{hits}</span> מתוך{' '}
              <span className="ltr-num">{correctIds.length}</span> התשובות הנכונות
              {misses ? (
                <>
                  , ובנוסף <span className="ltr-num">{misses}</span> שאינן נכונות
                </>
              ) : null}
              .
            </p>
          </div>
        ) : null}
      </div>

      <div className="msel__actions">
        {!checked ? (
          <button className="btn btn--sm" type="button" disabled={!picked.length} onClick={check}>
            {checkLabel}
          </button>
        ) : (
          <button className="btn btn--ghost btn--sm" type="button" onClick={reset}>
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  )
}
