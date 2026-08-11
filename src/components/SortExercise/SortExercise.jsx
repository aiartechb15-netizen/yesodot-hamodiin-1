import { useRef, useState } from 'react'
import Icon from '../Icons/Icons'
import './SortExercise.css'

/**
 * מיון מושגים לשתי קטגוריות.
 * שלוש דרכי הפעלה שקולות: גרירה בעכבר, בחירת מושג ולחיצה על קטגוריה, ומקלדת.
 */
export default function SortExercise({ terms, categories, hint, explanation, onResult }) {
  const [placement, setPlacement] = useState({}) // termId -> categoryId
  const [selected, setSelected] = useState(null)
  const [dragging, setDragging] = useState(null)
  const [checked, setChecked] = useState(false)
  const feedbackRef = useRef(null)

  const pool = terms.filter((t) => !placement[t.id])
  const placedAll = pool.length === 0
  const correctCount = terms.filter((t) => placement[t.id] === t.answer).length
  const allCorrect = checked && correctCount === terms.length

  const place = (termId, catId) => {
    if (checked || !termId) return
    setPlacement((p) => ({ ...p, [termId]: catId }))
    setSelected(null)
  }

  const unplace = (termId) => {
    if (checked) return
    setPlacement((p) => {
      const next = { ...p }
      delete next[termId]
      return next
    })
  }

  const onTermKey = (e, termId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setSelected(selected === termId ? null : termId)
    }
  }

  const check = () => {
    setChecked(true)
    if (onResult) onResult(correctCount === terms.length)
    window.requestAnimationFrame(() => feedbackRef.current?.focus())
  }

  const reset = () => {
    setChecked(false)
    setPlacement({})
    setSelected(null)
  }

  return (
    <div className="sortx">
      <p className="sortx__hint small muted">{hint}</p>

      <div className="sortx__pool" aria-label="מושגים למיון">
        {pool.length ? (
          <ul className="sortx__chips">
            {pool.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  className={`sortx__chip${selected === t.id ? ' is-selected' : ''}${dragging === t.id ? ' is-dragging' : ''}`}
                  draggable={!checked}
                  aria-pressed={selected === t.id}
                  onClick={() => setSelected(selected === t.id ? null : t.id)}
                  onKeyDown={(e) => onTermKey(e, t.id)}
                  onDragStart={(e) => {
                    setDragging(t.id)
                    e.dataTransfer.setData('text/plain', t.id)
                    e.dataTransfer.effectAllowed = 'move'
                  }}
                  onDragEnd={() => setDragging(null)}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="sortx__poolEmpty small muted">כל המושגים מוינו. אפשר לבדוק.</p>
        )}
      </div>

      <div className="sortx__cats">
        {categories.map((c) => {
          const items = terms.filter((t) => placement[t.id] === c.id)
          return (
            <section
              key={c.id}
              className={`sortx__cat${selected ? ' is-target' : ''}`}
              onDragOver={(e) => {
                if (!checked) e.preventDefault()
              }}
              onDrop={(e) => {
                e.preventDefault()
                place(e.dataTransfer.getData('text/plain'), c.id)
                setDragging(null)
              }}
            >
              <header className="sortx__catHead">
                <h4 className="sortx__catTitle">{c.title}</h4>
                <span className="sortx__catCount ltr-num">{items.length}</span>
              </header>

              {selected && !checked ? (
                <button className="sortx__drop" type="button" onClick={() => place(selected, c.id)}>
                  שיוך המושג שנבחר לכאן
                </button>
              ) : null}

              <ul className="sortx__placed">
                {items.map((t) => {
                  const state = checked ? (t.answer === c.id ? ' is-correct' : ' is-wrong') : ''
                  return (
                    <li key={t.id}>
                      <button
                        type="button"
                        className={`sortx__placedChip${state}`}
                        onClick={() => unplace(t.id)}
                        disabled={checked}
                        aria-label={checked ? t.label : `${t.label} — הסרה מהקטגוריה`}
                      >
                        <span>{t.label}</span>
                        {checked ? (
                          <Icon name={t.answer === c.id ? 'check' : 'close'} size={14} />
                        ) : (
                          <Icon name="close" size={14} />
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>

      <div className="sortx__feedbackWrap" tabIndex={-1} ref={feedbackRef} aria-live="polite">
        {checked ? (
          <div className={`sortx__feedback${allCorrect ? ' is-correct' : ' is-wrong'}`}>
            <span className="sortx__feedbackTitle">
              <Icon name={allCorrect ? 'check' : 'close'} size={18} />
              {allCorrect ? 'כל המושגים מוינו נכון' : 'חלק מהמושגים אינם במקום'}
            </span>
            <p className="small">
              מוינו נכון <span className="ltr-num">{correctCount}</span> מתוך{' '}
              <span className="ltr-num">{terms.length}</span> מושגים.
            </p>
            <p className="sortx__explain">{explanation}</p>
          </div>
        ) : null}
      </div>

      <div className="sortx__actions">
        {!checked ? (
          <button className="btn btn--sm" type="button" disabled={!placedAll} onClick={check}>
            בדיקה
          </button>
        ) : (
          <button className="btn btn--ghost btn--sm" type="button" onClick={reset}>
            מיון מחדש
          </button>
        )}
      </div>
    </div>
  )
}
