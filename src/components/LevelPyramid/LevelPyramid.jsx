import { useId, useState } from 'react'
import { levelsMap } from '../../data/chapter2'
import './LevelPyramid.css'

/** מפת רמות המודיעין — לחיצה על רמה מחליפה את תוכן הכרטיס היחיד. */
export default function LevelPyramid() {
  const uid = useId()
  const [active, setActive] = useState(levelsMap.levels[0].id)
  const activeLevel = levelsMap.levels.find((l) => l.id === active)

  return (
    <div className="pyr">
      <div className="pyr__trackScroll">
        <ol className="pyr__track" aria-label="רמות המודיעין">
          {levelsMap.levels.map((l, i) => (
            <li key={l.id} className="pyr__level">
              <button
                type="button"
                className={`pyr__btn${l.id === active ? ' is-active' : ''}${l.focus ? ' is-focus' : ''}`}
                aria-pressed={l.id === active}
                aria-controls={`${uid}-panel`}
                onClick={() => setActive(l.id)}
              >
                {l.focus ? <span className="pyr__badge">במוקד הפרק</span> : null}
                <span className="pyr__index ltr-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="pyr__name">{l.title}</span>
                <span className="pyr__activeRule" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="pyr__panel" id={`${uid}-panel`} role="region" aria-live="polite">
        <span className="pyr__kicker">
          רמה <span className="ltr-num">{levelsMap.levels.findIndex((l) => l.id === active) + 1}</span> מתוך{' '}
          <span className="ltr-num">{levelsMap.levels.length}</span>
        </span>
        <h3 className="pyr__panelTitle">{activeLevel.title}</h3>
        <span className="gold-rule gold-rule--sm gold-rule--center" aria-hidden="true" />
        <p>{activeLevel.text}</p>
      </div>
    </div>
  )
}
