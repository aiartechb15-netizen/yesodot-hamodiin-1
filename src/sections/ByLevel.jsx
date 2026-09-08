import { useId, useState } from 'react'
import { byLevel } from '../data/chapter1'
import './sections.css'

function DownArrow() {
  return (
    <span className="ladder__arrow" aria-hidden="true">
      <svg viewBox="0 0 12 30" width="12" height="26" focusable="false">
        <path
          d="M6 1v26M1.5 22 6 27l4.5-5"
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

export default function ByLevel() {
  const uid = useId()
  const [active, setActive] = useState(byLevel.levels[0].id)
  const activeLevel = byLevel.levels.find((l) => l.id === active)

  return (
    <section className="section section--cream" id="by-level" aria-labelledby="by-level-title">
      <div className="container">
        <h2 className="section-title" id="by-level-title">
          {byLevel.title}
        </h2>
        <span className="gold-rule" aria-hidden="true" />
        <p className="lead">{byLevel.intro}</p>

        <div className="ladder">
          <ol className="ladder__list">
            {byLevel.levels.map((l, i) => (
              <li className="ladder__item" key={l.id}>
                <button
                  type="button"
                  className={`ladder__btn${l.id === active ? ' is-active' : ''}`}
                  aria-expanded={l.id === active}
                  aria-controls={`${uid}-panel`}
                  onClick={() => setActive(l.id)}
                >
                  <span className="ladder__step ltr-num">{i + 1}</span>
                  <span className="ladder__name">{l.title}</span>
                </button>
                {i < byLevel.levels.length - 1 ? <DownArrow /> : null}
              </li>
            ))}
          </ol>

          <div className="ladder__panel">
            <div className="card card--pad" id={`${uid}-panel`} role="region" aria-live="polite">
              <span className="kicker">רמת מודיעין</span>
              <h3 className="card-title">{activeLevel.title}</h3>
              <span className="gold-rule gold-rule--sm" aria-hidden="true" />
              <p>{activeLevel.text}</p>
            </div>

            <aside className="callout" style={{ marginTop: '22px' }}>
              <span className="callout__label">{byLevel.callout.label}</span>
              <p>{byLevel.callout.text}</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
