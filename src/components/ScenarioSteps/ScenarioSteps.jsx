import { useRef, useState } from 'react'
import Icon from '../Icons/Icons'
import './ScenarioSteps.css'

/**
 * רצועת התרחיש והתרגול שנפתח ממנה.
 *
 * אותן חמש השאלות ואותם ההסברים שהיו כאן קודם כרשימת סימון פתוחה,
 * אלא שכאן הן נקראות אחת בכל פעם: לכל שאלה נשאלת אותה הכרעה — האם
 * היא מסייעת לבחון מחדש את ההקשר — ומיד אחריה נחשף ההסבר שלה.
 * כך הידע נפרש בהדרגה במקום להופיע כולו בבת אחת.
 *
 * התשובות נשמרות ב-state, ולכן חזרה אחורה מציגה מה שכבר נבחר.
 */
export default function ScenarioSteps({ strip, exercise }) {
  const { options } = exercise
  const [started, setStarted] = useState(false)
  const [i, setI] = useState(0)
  const [answers, setAnswers] = useState({})
  const stageRef = useRef(null)

  const current = options[i]
  const picked = answers[current?.id]
  const answeredAll = options.every((o) => answers[o.id] !== undefined)
  const correctCount = options.filter((o) => answers[o.id] === o.correct).length
  const done = i === options.length - 1 && picked !== undefined

  const start = () => {
    setStarted(true)
    /* המיקוד עובר אל השאלה הראשונה מיד עם פתיחתה, אחרת הוא נשאר על
       כפתור שכבר אינו במסך */
    window.requestAnimationFrame(() => stageRef.current?.focus())
  }

  const answer = (value) => setAnswers((a) => ({ ...a, [current.id]: value }))

  return (
    <div className="sstrip">
      {/* ---------- הרצועה ---------- */}
      <div className="sstrip__bar">
        <div className="sstrip__intro">
          <h3 className="sstrip__title">{strip.title}</h3>
          <p className="sstrip__text">{strip.text}</p>
        </div>

        {!started ? (
          <div className="sstrip__action">
            <button className="btn btn--sm" type="button" onClick={start}>
              {strip.cta}
            </button>
          </div>
        ) : null}
      </div>

      {/* ---------- התרגול, שאלה אחת בכל פעם ---------- */}
      {started ? (
        <div className="sstep" ref={stageRef} tabIndex={-1} aria-live="polite">
          <p className="sstep__count">
            שאלה <span className="ltr-num">{i + 1}</span> מתוך{' '}
            <span className="ltr-num">{options.length}</span>
          </p>

          <p className="sstep__question">{current.text}</p>
          <p className="sstep__prompt">{exercise.stepPrompt}</p>

          <div className="sstep__choices">
            <button
              className={`sstep__choice${picked === true ? ' is-picked' : ''}`}
              type="button"
              aria-pressed={picked === true}
              onClick={() => answer(true)}
            >
              {exercise.yesLabel}
            </button>
            <button
              className={`sstep__choice${picked === false ? ' is-picked' : ''}`}
              type="button"
              aria-pressed={picked === false}
              onClick={() => answer(false)}
            >
              {exercise.noLabel}
            </button>
          </div>

          {picked !== undefined ? (
            <div className={`sstep__why${picked === current.correct ? ' is-right' : ' is-wrong'}`}>
              <span className="sstep__whyHead">
                <Icon name={picked === current.correct ? 'check' : 'close'} size={17} />
                {picked === current.correct ? 'נכון' : 'לא מדויק'}
              </span>
              <p className="sstep__whyText">{current.why}</p>
            </div>
          ) : null}

          <div className="sstep__nav">
            {i > 0 ? (
              <button className="sstep__navBtn" type="button" onClick={() => setI(i - 1)}>
                <span aria-hidden="true">→</span> הקודמת
              </button>
            ) : (
              <span />
            )}

            {i < options.length - 1 ? (
              <button
                className="sstep__navBtn"
                type="button"
                disabled={picked === undefined}
                onClick={() => setI(i + 1)}
              >
                הבאה <span aria-hidden="true">←</span>
              </button>
            ) : (
              <span />
            )}
          </div>

          {/* הסיכום נפתח רק אחרי שכל חמש השאלות נענו */}
          {done && answeredAll ? (
            <p className="sstep__score">
              סיימתם את התרחיש. סימנתם נכון <span className="ltr-num">{correctCount}</span> מתוך{' '}
              <span className="ltr-num">{options.length}</span> שאלות.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
