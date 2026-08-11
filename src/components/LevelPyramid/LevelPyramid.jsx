import { useId, useState } from 'react'
import { levelsMap } from '../../data/chapter2'
import './LevelPyramid.css'

/** פירמידת רמות המודיעין — לחיצה על רמה חושפת את ההסבר שלה. */
export default function LevelPyramid() {
  const uid = useId()
  const [active, setActive] = useState(levelsMap.levels[0].id)
  const activeLevel = levelsMap.levels.find((l) => l.id === active)

  return (
    <div className="pyr">
      <ol className="pyr__stack" aria-label="רמות המודיעין">
        {levelsMap.levels.map((l, i) => (
          <li key={l.id} className="pyr__row" style={{ '--tier': i }}>
            <button
              type="button"
              className={`pyr__btn${l.id === active ? ' is-active' : ''}${l.focus ? ' is-focus' : ''}`}
              aria-expanded={l.id === active}
              aria-controls={`${uid}-panel`}
              onClick={() => setActive(l.id)}
            >
              <span className="pyr__index ltr-num">{i + 1}</span>
              <span className="pyr__name">{l.title}</span>
              {l.focus ? <span className="pyr__badge">במוקד הפרק</span> : null}
            </button>
          </li>
        ))}
      </ol>

      <div className="pyr__panel card card--pad" id={`${uid}-panel`} role="region" aria-live="polite">
        <span className="kicker">
          רמה <span className="ltr-num">{levelsMap.levels.findIndex((l) => l.id === active) + 1}</span> מתוך{' '}
          <span className="ltr-num">{levelsMap.levels.length}</span>
        </span>
        <h3 className="card-title">{activeLevel.title}</h3>
        <span className="gold-rule gold-rule--sm" aria-hidden="true" />
        <p>{activeLevel.text}</p>
        {activeLevel.focus ? <p className="pyr__focusNote">{levelsMap.focusNote}</p> : null}
      </div>
    </div>
  )
}
