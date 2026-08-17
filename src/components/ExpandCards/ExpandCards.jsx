import { useId, useState } from 'react'
import Icon from '../Icons/Icons'
import './ExpandCards.css'

/**
 * כרטיסי בחירה בגובה אחיד קבוע + פאנל תוכן אחד משותף מתחתיהם.
 * הכרטיסים אינם משנים גובה בלחיצה: הם כפתורי בחירה בלבד,
 * וההסבר של הכרטיס הנבחר מוצג באזור המשותף שמתחת לרשת.
 */
export default function ExpandCards({
  items,
  columns = 3,
  showProgress = false,
  progressLabel,
  completedMessage,
}) {
  const uid = useId()
  const panelId = `${uid}-panel`
  const [active, setActive] = useState(null)
  const [visited, setVisited] = useState([])

  const select = (id) => {
    setVisited((v) => (v.includes(id) ? v : [...v, id]))
    setActive((prev) => (prev === id ? null : id))
  }

  const current = items.find((i) => i.id === active) || null
  const allDone = visited.length === items.length

  return (
    <div className="xcards">
      {showProgress ? (
        <div className="xcards__progress" aria-live="polite">
          <span className="xcards__progressText">
            {progressLabel} <span className="ltr-num">{visited.length}</span> /{' '}
            <span className="ltr-num">{items.length}</span>
          </span>
          <span className="xcards__progressBar" aria-hidden="true">
            <span style={{ width: `${(visited.length / items.length) * 100}%` }} />
          </span>
          {allDone ? <span className="xcards__done">{completedMessage}</span> : null}
        </div>
      ) : null}

      <ul className={`xcards__grid xcards__grid--${columns}`}>
        {items.map((item) => {
          const isActive = item.id === active
          const isVisited = visited.includes(item.id)
          return (
            <li key={item.id}>
              <button
                className={`xcard${isActive ? ' is-active' : ''}${isVisited ? ' is-visited' : ''}`}
                type="button"
                aria-expanded={isActive}
                aria-controls={panelId}
                onClick={() => select(item.id)}
              >
                <span className="xcard__icon">
                  <Icon name={item.icon} size={24} />
                </span>
                <span className="xcard__body">
                  <span className="xcard__title">{item.title2 || item.title}</span>
                  <span className="xcard__rule" aria-hidden="true" />
                </span>
                <Icon name="chevron" size={20} className="xcard__chev" />
              </button>
            </li>
          )
        })}
      </ul>

      <div className="xcards__panel" id={panelId} role="region" aria-live="polite" hidden={!current}>
        {current ? (
          /* key מאלץ הרכבה מחדש בכל החלפה, כדי שאנימציית המעבר תרוץ שוב */
          <div className="xcards__panelInner" key={current.id}>
            <h3 className="xcards__panelTitle">
              <span className="xcards__panelIcon" aria-hidden="true">
                <Icon name={current.icon} size={22} />
              </span>
              {current.title2 || current.title}
            </h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="xcards__panelText">{current.text}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
