import { useId, useState } from 'react'
import Icon from '../Icons/Icons'
import './ExpandCards.css'

/**
 * רשת כרטיסים נפתחים. כל כרטיס נפתח בלחיצה (ולא בהובר) ומסומן כ"נצפה".
 */
export default function ExpandCards({
  items,
  columns = 3,
  showProgress = false,
  progressLabel,
  completedMessage,
  // uniformHeight: כל הכרטיסים בגובה זהה — גם בין השורות, לפי הכרטיס הגבוה ביותר
  uniformHeight = false,
}) {
  const uid = useId()
  const [open, setOpen] = useState([])
  const [visited, setVisited] = useState([])

  const toggle = (id) => {
    setVisited((v) => (v.includes(id) ? v : [...v, id]))
    setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

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

      <ul className={`xcards__grid xcards__grid--${columns}${uniformHeight ? ' xcards__grid--uniform' : ''}`}>
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
                  <span className="xcard__icon">
                    <Icon name={item.icon} size={24} />
                  </span>
                  <span className="xcard__title">{item.title2 || item.title}</span>
                  <Icon name="chevron" size={20} className="xcard__chev" />
                </button>
                <div className="xcard__panel" id={`${uid}-${item.id}`} hidden={!isOpen}>
                  <span className="gold-rule gold-rule--sm" aria-hidden="true" />
                  <p>{item.text}</p>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
