import { useMemo, useRef, useState } from 'react'
import Icon from '../Icons/Icons'
import { quiz as chapter1Quiz } from '../../data/chapter1'
import './Quiz.css'

const MAX_ATTEMPTS = 2

function emptyAnswer(q) {
  if (q.type === 'single') return null
  return {}
}

function evaluate(q, answer) {
  if (q.type === 'single') {
    const ok = answer === q.correct
    return { score: ok ? 1 : 0, perStatement: null, allCorrect: ok, answered: answer !== null }
  }
  const per = {}
  let ok = 0
  q.statements.forEach((s) => {
    per[s.id] = answer[s.id] !== undefined && answer[s.id] === s.correct
    if (per[s.id]) ok += 1
  })
  const answered = q.statements.every((s) => answer[s.id] !== undefined)
  return {
    score: ok / q.statements.length,
    perStatement: per,
    allCorrect: ok === q.statements.length,
    answered,
  }
}

export default function Quiz({ data = chapter1Quiz }) {
  const quiz = data
  const L = quiz.labels
  const questions = quiz.questions
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState(() => emptyAnswer(questions[0]))
  const [attempts, setAttempts] = useState(0)
  const [checked, setChecked] = useState(false)
  const [results, setResults] = useState({})
  const [done, setDone] = useState(false)
  const feedbackRef = useRef(null)

  const q = questions[index]
  const evaluation = useMemo(() => evaluate(q, answer), [q, answer])
  const revealed = checked && !evaluation.allCorrect && attempts >= MAX_ATTEMPTS
  const resolved = checked && (evaluation.allCorrect || revealed)

  const goNext = () => {
    setResults((prev) => ({
      ...prev,
      [q.id]: { topic: q.topic, score: evaluation.score, revealed },
    }))
    if (index === questions.length - 1) {
      setDone(true)
      return
    }
    const next = questions[index + 1]
    setIndex(index + 1)
    setAnswer(emptyAnswer(next))
    setAttempts(0)
    setChecked(false)
  }

  const onCheck = () => {
    setAttempts((a) => a + 1)
    setChecked(true)
    window.requestAnimationFrame(() => feedbackRef.current?.focus())
  }

  const onRetry = () => {
    setChecked(false)
  }

  const restart = () => {
    setIndex(0)
    setAnswer(emptyAnswer(questions[0]))
    setAttempts(0)
    setChecked(false)
    setResults({})
    setDone(false)
  }

  if (done) return <Summary quiz={quiz} results={results} onRestart={restart} />

  const canCheck = evaluation.answered && !checked

  return (
    <div className="quiz card">
      <div className="quiz__head">
        <span className="quiz__count">{L.progress(index + 1, questions.length)}</span>
        <div className="quiz__bar" aria-hidden="true">
          <span className="quiz__barFill" style={{ width: `${((index + (resolved ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="quiz__body">
        <h3 className="quiz__heading">{q.heading}</h3>
        <span className="gold-rule gold-rule--sm" aria-hidden="true" />

        {q.scenario ? (
          <div className="quiz__scenario">
            <span className="quiz__scenarioLabel">{L.scenario}</span>
            <p>{q.scenario}</p>
          </div>
        ) : null}

        <p className="quiz__question">{q.question}</p>

        {q.type === 'single' ? (
          <fieldset className="quiz__fieldset">
            <legend className="sr-only">{q.question}</legend>
            {q.options.map((opt, i) => {
              const state = checked
                ? i === q.correct && (evaluation.allCorrect || revealed)
                  ? ' is-correct'
                  : i === answer && !evaluation.allCorrect
                    ? ' is-wrong'
                    : ''
                : ''
              return (
                <label className={`quiz__opt${answer === i ? ' is-selected' : ''}${state}`} key={i}>
                  <input
                    type="radio"
                    name={q.id}
                    checked={answer === i}
                    disabled={resolved}
                    onChange={() => setAnswer(i)}
                  />
                  <span>{opt}</span>
                </label>
              )
            })}
          </fieldset>
        ) : (
          <div className="quiz__statements">
            <p className="quiz__hint">{L.chooseAll}</p>
            {q.statements.map((s) => {
              const choices =
                q.type === 'truefalse'
                  ? [
                      { value: true, label: L.true },
                      { value: false, label: L.false },
                    ]
                  : q.choices.map((c, i) => ({ value: i, label: c }))
              const perOk = checked ? evaluation.perStatement[s.id] : null
              return (
                <div className="quiz__stmt" key={s.id}>
                  <p className="quiz__stmtText" id={`${q.id}-${s.id}-label`}>
                    {s.text}
                  </p>
                  <div className="quiz__stmtChoices" role="radiogroup" aria-labelledby={`${q.id}-${s.id}-label`}>
                    {choices.map((c) => {
                      const selected = answer[s.id] === c.value
                      const isRight = c.value === s.correct
                      const state = checked
                        ? isRight && (perOk || revealed)
                          ? ' is-correct'
                          : selected && !perOk
                            ? ' is-wrong'
                            : ''
                        : ''
                      return (
                        <label className={`quiz__chip${selected ? ' is-selected' : ''}${state}`} key={String(c.value)}>
                          <input
                            type="radio"
                            name={`${q.id}-${s.id}`}
                            checked={selected}
                            disabled={resolved}
                            onChange={() => setAnswer((prev) => ({ ...prev, [s.id]: c.value }))}
                          />
                          <span>{c.label}</span>
                        </label>
                      )
                    })}
                  </div>
                  {checked && (perOk === false || revealed) ? (
                    <p className={`quiz__stmtFeedback${perOk ? ' is-ok' : ''}`}>
                      <span className="term">{s.answerTitle}. </span>
                      {s.explanation}
                    </p>
                  ) : null}
                </div>
              )
            })}
          </div>
        )}

        <div
          className="quiz__feedbackWrap"
          tabIndex={-1}
          ref={feedbackRef}
          aria-live="polite"
        >
          {checked ? (
            <div className={`quiz__feedback${evaluation.allCorrect ? ' is-correct' : ' is-wrong'}`}>
              <span className="quiz__feedbackTitle">
                <Icon name={evaluation.allCorrect ? 'check' : 'close'} size={20} />
                {evaluation.allCorrect ? L.correct : L.incorrect}
              </span>
              {q.type === 'single' ? (
                evaluation.allCorrect || revealed ? (
                  <p>
                    <span className="term">
                      {evaluation.allCorrect ? '' : `${L.revealed}: `}
                      {q.answerTitle}{' '}
                    </span>
                    {q.explanation}
                  </p>
                ) : (
                  <p>{q.explanation}</p>
                )
              ) : (
                <p>
                  {evaluation.allCorrect
                    ? 'כל הקביעות סווגו נכון.'
                    : 'עיינו בהסבר שליד כל קביעה שאינה מסומנת נכון.'}
                </p>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="quiz__actions">
        {!checked ? (
          <button className="btn" type="button" disabled={!canCheck} onClick={onCheck}>
            {L.check}
          </button>
        ) : resolved ? (
          <button className="btn" type="button" onClick={goNext}>
            {index === questions.length - 1 ? L.finish : L.next}
          </button>
        ) : (
          <button className="btn btn--ghost" type="button" onClick={onRetry}>
            {L.retry}
          </button>
        )}
        <span className="quiz__attempts small muted">
          ניסיון <span className="ltr-num">{Math.min(attempts || 1, MAX_ATTEMPTS)}</span> מתוך{' '}
          <span className="ltr-num">{MAX_ATTEMPTS}</span>
        </span>
      </div>
    </div>
  )
}

function Summary({ quiz, results, onRestart }) {
  const byTopic = {}
  Object.values(results).forEach((r) => {
    if (!byTopic[r.topic]) byTopic[r.topic] = { total: 0, sum: 0 }
    byTopic[r.topic].total += 1
    byTopic[r.topic].sum += r.score
  })

  const level = (avg) => (avg >= 0.8 ? 'strong' : avg >= 0.5 ? 'partial' : 'weak')

  return (
    <div className="quiz card quiz--summary">
      <div className="quiz__body">
        <span className="kicker">{quiz.summary.byTopicTitle}</span>
        <h3 className="quiz__summaryTitle">{quiz.summary.title}</h3>
        <span className="gold-rule gold-rule--sm" aria-hidden="true" />
        <p>{quiz.summary.text}</p>

        <ul className="quiz__topics">
          {Object.entries(quiz.topics).map(([key, label]) => {
            const t = byTopic[key]
            const avg = t ? t.sum / t.total : 0
            const lv = level(avg)
            return (
              <li className={`quiz__topic is-${lv}`} key={key}>
                <span className="quiz__topicName">{label}</span>
                <span className="quiz__topicMeter" aria-hidden="true">
                  <span style={{ width: `${Math.round(avg * 100)}%` }} />
                </span>
                <span className="quiz__topicLevel">{quiz.summary.levels[lv]}</span>
              </li>
            )
          })}
        </ul>

        {quiz.summary.refresh ? (
          <div className="quiz__refresh">
            <h4 className="quiz__refreshTitle">{quiz.summary.refreshTitle}</h4>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="small muted">{quiz.summary.refreshHint}</p>
            <ul className="quiz__refreshList">
              {quiz.summary.refresh.map((r) => (
                <li key={r.id}>
                  <a className="quiz__refreshItem" href={r.to}>
                    <span className="quiz__refreshName">{r.title}</span>
                    <span className="quiz__refreshText">{r.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <button className="btn btn--ghost btn--sm quiz__restart" type="button" onClick={onRestart}>
          {quiz.labels.restart}
        </button>
      </div>
    </div>
  )
}
