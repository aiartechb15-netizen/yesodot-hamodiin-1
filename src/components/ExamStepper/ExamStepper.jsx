import { useRef, useState } from 'react'
import Icon from '../Icons/Icons'
import './ExamStepper.css'

/**
 * מבחן מדורג: שאלה אחת בכל פעם, מד התקדמות, ומשוב לאחר כל בדיקה.
 * תומך בסוגים: single | truefalse | fill | match | multi
 */
export default function ExamStepper({ exam }) {
  const L = exam.labels
  const questions = exam.questions

  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState(null)
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const feedbackRef = useRef(null)

  const q = questions[index]

  const emptyFor = (question) => (question.type === 'match' || question.type === 'multi' ? {} : null)

  const isAnswered = () => {
    if (q.type === 'match') return q.statements.every((s) => answer?.[s.id] !== undefined)
    if (q.type === 'multi') return Object.values(answer || {}).some(Boolean)
    return answer !== null && answer !== undefined
  }

  const grade = () => {
    if (q.type === 'single') return answer === q.correct
    if (q.type === 'truefalse') return answer === q.correct
    if (q.type === 'fill') return answer === q.correct
    if (q.type === 'match') return q.statements.every((s) => answer?.[s.id] === s.correct)
    if (q.type === 'multi')
      return q.options.every((o) => Boolean(answer?.[o.id]) === Boolean(o.correct))
    return false
  }

  const isCorrect = checked && grade()

  const onCheck = () => {
    setChecked(true)
    if (grade()) setScore((s) => s + 1)
    window.requestAnimationFrame(() => feedbackRef.current?.focus())
  }

  const onNext = () => {
    if (index === questions.length - 1) {
      setDone(true)
      return
    }
    const next = questions[index + 1]
    setIndex(index + 1)
    setAnswer(emptyFor(next))
    setChecked(false)
  }

  const restart = () => {
    setIndex(0)
    setAnswer(emptyFor(questions[0]))
    setChecked(false)
    setScore(0)
    setDone(false)
  }

  if (done) {
    return (
      <div className="exam card exam--done">
        <div className="exam__body">
          <span className="exam__doneIcon" aria-hidden="true">
            <Icon name="flag" size={28} />
          </span>
          <h3 className="exam__doneTitle">{exam.done.title}</h3>
          <span className="gold-rule gold-rule--sm" aria-hidden="true" />
          <p className="exam__score">{exam.done.scoreText(score, questions.length)}</p>
          <p>{exam.done.text}</p>
          <div className="exam__doneActions">
            <button className="btn btn--ghost btn--sm" type="button" onClick={restart}>
              {exam.done.restart}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="exam card">
      <div className="exam__head">
        <div className="exam__headTop">
          <span className="exam__part">{exam.parts[q.part]}</span>
          <span className="exam__count">{L.progress(index + 1, questions.length)}</span>
        </div>
        <div className="exam__bar" aria-hidden="true">
          <span
            className="exam__barFill"
            style={{ width: `${((index + (checked ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="exam__body">
        <h3 className="exam__heading">{q.heading}</h3>
        <span className="gold-rule gold-rule--sm" aria-hidden="true" />

        {/* בחירה יחידה */}
        {q.type === 'single' ? (
          <>
            <p className="exam__question">{q.question}</p>
            <fieldset className="exam__options">
              <legend className="sr-only">{q.question}</legend>
              {q.options.map((opt, i) => {
                const state = checked
                  ? i === q.correct
                    ? ' is-correct'
                    : i === answer
                      ? ' is-wrong'
                      : ''
                  : ''
                return (
                  <label className={`exam__opt${answer === i ? ' is-picked' : ''}${state}`} key={opt}>
                    <input
                      type="radio"
                      name={q.id}
                      checked={answer === i}
                      disabled={checked}
                      onChange={() => setAnswer(i)}
                    />
                    <span>{opt}</span>
                  </label>
                )
              })}
            </fieldset>
          </>
        ) : null}

        {/* נכון / לא נכון */}
        {q.type === 'truefalse' ? (
          <>
            <p className="exam__question">{q.question}</p>
            <fieldset className="exam__options exam__options--row">
              <legend className="sr-only">{q.question}</legend>
              {[
                { v: true, label: L.trueLabel },
                { v: false, label: L.falseLabel },
              ].map((o) => {
                const state = checked
                  ? o.v === q.correct
                    ? ' is-correct'
                    : o.v === answer
                      ? ' is-wrong'
                      : ''
                  : ''
                return (
                  <label
                    className={`exam__opt exam__opt--chip${answer === o.v ? ' is-picked' : ''}${state}`}
                    key={String(o.v)}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      checked={answer === o.v}
                      disabled={checked}
                      onChange={() => setAnswer(o.v)}
                    />
                    <span>{o.label}</span>
                  </label>
                )
              })}
            </fieldset>
          </>
        ) : null}

        {/* השלמת משפט */}
        {q.type === 'fill' ? (
          <>
            <p className="exam__fillSentence">
              {q.before}
              <span className="exam__blank">________</span>
              {q.after}
            </p>
            <fieldset className="exam__options exam__options--row">
              <legend className="sr-only">{L.chooseOne}</legend>
              {q.options.map((opt) => {
                const state = checked
                  ? opt === q.correct
                    ? ' is-correct'
                    : opt === answer
                      ? ' is-wrong'
                      : ''
                  : ''
                return (
                  <label
                    className={`exam__opt exam__opt--chip${answer === opt ? ' is-picked' : ''}${state}`}
                    key={opt}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      checked={answer === opt}
                      disabled={checked}
                      onChange={() => setAnswer(opt)}
                    />
                    <span>{opt}</span>
                  </label>
                )
              })}
            </fieldset>
          </>
        ) : null}

        {/* התאמה */}
        {q.type === 'match' ? (
          <>
            <p className="exam__question">{q.question}</p>
            <div className="exam__match">
              {q.statements.map((s) => {
                const picked = answer?.[s.id]
                const ok = checked && picked === s.correct
                return (
                  <div
                    className={`exam__matchRow${checked ? (ok ? ' is-correct' : ' is-wrong') : ''}`}
                    key={s.id}
                  >
                    <p className="exam__matchText" id={`${q.id}-${s.id}`}>
                      {s.text}
                    </p>
                    <div className="exam__matchChoices" role="radiogroup" aria-labelledby={`${q.id}-${s.id}`}>
                      {q.choices.map((c, ci) => (
                        <label
                          className={`exam__opt exam__opt--chip${picked === ci ? ' is-picked' : ''}${
                            checked && ci === s.correct ? ' is-correct' : ''
                          }${checked && picked === ci && ci !== s.correct ? ' is-wrong' : ''}`}
                          key={c}
                        >
                          <input
                            type="radio"
                            name={`${q.id}-${s.id}`}
                            checked={picked === ci}
                            disabled={checked}
                            onChange={() => setAnswer((a) => ({ ...(a || {}), [s.id]: ci }))}
                          />
                          <span>{c}</span>
                        </label>
                      ))}
                    </div>
                    {checked && !ok ? <p className="exam__matchWhy">{s.explanation}</p> : null}
                  </div>
                )
              })}
            </div>
          </>
        ) : null}

        {/* סימון מרובה */}
        {q.type === 'multi' ? (
          <>
            <p className="exam__question">{q.question}</p>
            <p className="small muted">{L.selectAll}</p>
            <fieldset className="exam__options">
              <legend className="sr-only">{q.question}</legend>
              {q.options.map((o) => {
                const picked = Boolean(answer?.[o.id])
                const state = checked
                  ? o.correct
                    ? ' is-correct'
                    : picked
                      ? ' is-wrong'
                      : ''
                  : ''
                return (
                  <label className={`exam__opt${picked ? ' is-picked' : ''}${state}`} key={o.id}>
                    <input
                      type="checkbox"
                      checked={picked}
                      disabled={checked}
                      onChange={() => setAnswer((a) => ({ ...(a || {}), [o.id]: !picked }))}
                    />
                    <span>{o.text}</span>
                  </label>
                )
              })}
            </fieldset>
          </>
        ) : null}

        <div className="exam__feedbackWrap" tabIndex={-1} ref={feedbackRef} aria-live="polite">
          {checked ? (
            <div className={`exam__feedback${isCorrect ? ' is-correct' : ' is-wrong'}`}>
              <span className="exam__feedbackTitle">
                <Icon name={isCorrect ? 'check' : 'close'} size={18} />
                {isCorrect ? L.correct : L.incorrect}
              </span>
              {q.explanation ? <p>{q.explanation}</p> : null}
            </div>
          ) : null}
        </div>
      </div>

      <div className="exam__actions">
        {!checked ? (
          <button className="btn btn--sm" type="button" disabled={!isAnswered()} onClick={onCheck}>
            {L.check}
          </button>
        ) : (
          <button className="btn btn--sm" type="button" onClick={onNext}>
            {index === questions.length - 1 ? L.finish : L.next}
          </button>
        )}
        <span className="exam__scoreNow small muted">
          {L.scoreLabel}: <span className="ltr-num">{score}</span>
        </span>
      </div>
    </div>
  )
}
