import { useRef, useState } from 'react'
import Icon from '../Icons/Icons'
import { binders } from '../../data/chapter2'
import './BinderExercise.css'

/** תרגול הקלסרים — בחירת קלסר אחד; המשוב נפתח רק אחרי הבחירה. */
export default function BinderExercise() {
  const [picked, setPicked] = useState(null)
  const feedbackRef = useRef(null)

  const isCorrect = picked === binders.correctId

  const choose = (id) => {
    if (picked) return
    setPicked(id)
    window.requestAnimationFrame(() => feedbackRef.current?.focus())
  }

  return (
    <div className="binders">
      <aside className="binders__situation callout">
        <span className="callout__label">{binders.situationLabel}</span>
        <p>{binders.situation}</p>
      </aside>

      <p className="binders__hint small muted">{binders.hint}</p>

      <ul className="binders__grid">
        {binders.options.map((o) => {
          const state = picked
            ? o.id === binders.correctId
              ? ' is-correct'
              : o.id === picked
                ? ' is-wrong'
                : ' is-dim'
            : ''
          return (
            <li key={o.id}>
              <button
                type="button"
                className={`binder${state}`}
                aria-pressed={picked === o.id}
                disabled={Boolean(picked)}
                onClick={() => choose(o.id)}
              >
                <span className="binder__spine" aria-hidden="true">
                  <span className="binder__letter">{o.letter}</span>
                </span>
                <span className="binder__text">{o.text}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="binders__feedbackWrap" tabIndex={-1} ref={feedbackRef} aria-live="polite">
        {picked ? (
          <div className={`binders__feedback${isCorrect ? ' is-correct' : ' is-wrong'}`}>
            <span className="binders__feedbackTitle">
              <Icon name={isCorrect ? 'check' : 'close'} size={18} />
              {isCorrect ? binders.correctLabel : binders.incorrectLabel}
            </span>
            <p>{binders.explanation}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
