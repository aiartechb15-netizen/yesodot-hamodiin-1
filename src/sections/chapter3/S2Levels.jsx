import { useId, useState } from 'react'
import { levels } from '../../data/chapter3'
import './chapter3.css'

function DownArrow() {
  return (
    <span className="lvls__arrow" aria-hidden="true">
      <svg viewBox="0 0 12 24" width="12" height="20" focusable="false">
        <path
          d="M6 1v20M1.5 16 6 21l4.5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export default function S2Levels() {
  const uid = useId()
  const [active, setActive] = useState(levels.items[2].id)
  const current = levels.items.find((l) => l.id === active)

  return (
    <section className="section section--paper" id={levels.id} aria-labelledby="ch3-levels-title">
      <div className="container">
        <header className="s3head">
          <span className="s3head__kicker">{levels.kicker}</span>
          <h2 className="section-title" id="ch3-levels-title">
            {levels.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead" style={{ maxWidth: '780px' }}>
            {levels.intro}
          </p>
        </header>

        <div className="lvls">
          <ol className="lvls__list">
            {levels.items.map((l, i) => (
              <li key={l.id}>
                <button
                  type="button"
                  className={`lvls__btn${l.id === active ? ' is-active' : ''}${l.focus ? ' is-focus' : ''}`}
                  aria-expanded={l.id === active}
                  aria-controls={`${uid}-panel`}
                  onClick={() => setActive(l.id)}
                >
                  <span className="lvls__num ltr-num">{i + 1}</span>
                  <span className="lvls__name">{l.title}</span>
                  {l.focus ? <span className="lvls__tag">במוקד הפרק</span> : <span />}
                </button>
                {i < levels.items.length - 1 ? <DownArrow /> : null}
              </li>
            ))}
          </ol>

          <div className="lvls__panel">
            <div className="card card--pad" id={`${uid}-panel`} role="region" aria-live="polite">
              <span className="kicker">
                רמה <span className="ltr-num">{levels.items.findIndex((l) => l.id === active) + 1}</span> מתוך{' '}
                <span className="ltr-num">{levels.items.length}</span>
              </span>
              <h3 className="card-title">{current.title}</h3>
              <span className="gold-rule gold-rule--sm" aria-hidden="true" />
              <p>{current.text}</p>
            </div>

            <aside className="callout callout--teal" style={{ marginTop: '20px' }}>
              <span className="callout__label">במוקד</span>
              <p>{levels.focusNote}</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
