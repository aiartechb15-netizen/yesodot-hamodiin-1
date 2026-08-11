import { useRef, useState } from 'react'
import Icon from '../Icons/Icons'
import { quickCheck } from '../../data/chapter2'
import './MiniCheck.css'

const L = quickCheck.labels

/** בדיקת הבנה קצרה — שאלה אחת בכל פעם, משוב מיידי, ללא תחושת מבחן. */
export default function MiniCheck() {
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState(null)
  const [checked, setChecked] = useState(false)
  const [done, setDone] = useState(false)
  const feedbackRef = useRef(null)

  const questions = quickCheck.questions
  const q = questions[index]
  const isCorrect = checked && choice === q.correct

  const onCheck = () => {
    setChecked(true)
    window.requestAnimationFrame(() => feedbackRef.current?.focus())
  }

  const onNext = () => {
    if (index === questions.length - 1) {
      setDone(true)
      return
    }
    setIndex(index + 1)
    setChoice(null)
    setChecked(false)
  }

  const restart = () => {
    setIndex(0)
    setChoice(null)
    setChecked(false)
    setDone(false)
  }

  if (done) {
    return (
      <div className="mcheck card card--pad">
        <span className="mcheck__doneIcon" aria-hidden="true">
          <Icon name="check" size={26} />
        </span>
        <p className="mcheck__doneText">{L.done}</p>
        <button className="btn btn--ghost btn--sm" type="button" onClick={restart}>
          {L.again}
        </button>
      </div>
    )
  }

  return (
    <div className="mcheck card">
      <div className="mcheck__head">
        <span className="mcheck__count">{L.progress(index + 1, questions.length)}</span>
        <div className="mcheck__dots" aria-hidden="true">
          {questions.map((_, i) => (
            <span key={i} className={`mcheck__dot${i <= index ? ' is-on' : ''}`} />
          ))}
        </div>
      </div>

      <div className="mcheck__body">
        <p className="mcheck__question">{q.question}</p>

        <fieldset className="mcheck__options">
          <legend className="sr-only">{q.question}</legend>
          {q.options.map((opt, i) => {
            const state = checked
              ? i === q.correct
                ? ' is-correct'
                : i === choice
                  ? ' is-wrong'
                  : ''
              : ''
            return (
              <label className={`mcheck__opt${choice === i ? ' is-selected' : ''}${state}`} key={opt}>
                <input
                  type="radio"
                  name={q.id}
                  checked={choice === i}
                  disabled={checked}
                  onChange={() => setChoice(i)}
                />
                <span>{opt}</span>
              </label>
            )
          })}
        </fieldset>

        <div className="mcheck__feedbackWrap" tabIndex={-1} ref={feedbackRef} aria-live="polite">
          {checked ? (
            <div className={`mcheck__feedback${isCorrect ? ' is-correct' : ' is-wrong'}`}>
              <span className="mcheck__feedbackTitle">
                <Icon name={isCorrect ? 'check' : 'close'} size={18} />
                {isCorrect ? L.correct : L.incorrect}
              </span>
              <p>{q.explanation}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mcheck__actions">
        {!checked ? (
          <button className="btn btn--sm" type="button" disabled={choice === null} onClick={onCheck}>
            {L.check}
          </button>
        ) : (
          <button className="btn btn--sm" type="button" onClick={onNext}>
            {index === questions.length - 1 ? L.finish : L.next}
          </button>
        )}
      </div>
    </div>
  )
}
