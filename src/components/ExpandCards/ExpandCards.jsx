import { useId, useState } from 'react'
import Icon from '../Icons/Icons'
import './ExpandCards.css'

/**
 * שתי התנהגויות, אותו עיצוב כרטיס:
 *
 * ברירת מחדל — כרטיסי בחירה בגובה אחיד קבוע + פאנל תוכן אחד משותף מתחתיהם.
 * inline      — כל כרטיס הוא אקורדיון עצמאי שנפתח בתוך עצמו. הרשת מיושרת
 *               ל-start, ולכן פתיחת כרטיס אינה מותחת את הכרטיסים שלידו.
 */
export default function ExpandCards({
  items,
  columns = 3,
  showProgress = false,
  progressLabel,
  completedMessage,
  inline = false,
}) {
  const uid = useId()
  const panelId = `${uid}-panel`
  const [active, setActive] = useState(null)
  const [open, setOpen] = useState([])
  const [visited, setVisited] = useState([])

  const markVisited = (id) => setVisited((v) => (v.includes(id) ? v : [...v, id]))

  const select = (id) => {
    markVisited(id)
    setActive((prev) => (prev === id ? null : id))
  }

  const toggle = (id) => {
    markVisited(id)
    setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const current = items.find((i) => i.id === active) || null
  const allDone = visited.length === items.length

  const progress = showProgress ? (
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
  ) : null

  const head = (item) => (
    <>
      <span className="xcard__icon">
        <Icon name={item.icon} size={24} />
      </span>
      <span className="xcard__body">
        <span className="xcard__title">{item.title2 || item.title}</span>
        <span className="xcard__rule" aria-hidden="true" />
      </span>
      <Icon name="chevron" size={20} className="xcard__chev" />
    </>
  )

  if (inline) {
    return (
      <div className="xcards xcards--inline">
        {progress}

        <ul className={`xcards__grid xcards__grid--${columns}`}>
          {items.map((item) => {
            const isOpen = open.includes(item.id)
            const isVisited = visited.includes(item.id)
            return (
              <li key={item.id}>
                <article className={`xcard${isOpen ? ' is-open' : ''}${isVisited ? ' is-visited' : ''}`}>
                  <button
                    className="xcard__btn"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-${item.id}`}
                    onClick={() => toggle(item.id)}
                  >
                    {head(item)}
                  </button>
                  <div className="xcard__inlinePanel" id={`${uid}-${item.id}`} hidden={!isOpen}>
                    <p className="xcards__panelText">{item.text}</p>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="xcards">
      {progress}

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
                {head(item)}
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
