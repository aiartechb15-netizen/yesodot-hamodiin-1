import { useId, useState } from 'react'
import Icon from '../Icons/Icons'
import './TraitList.css'

/**
 * רשימה טיפוגרפית ממוספרת עם אזור הסבר אחד משותף.
 *
 * נבנתה כרכיב נפרד מ-ExpandCards בכוונה: אותו תוכן, אבל בלי כרטיסים,
 * מסגרות או צללים — רק מספר, אייקון, שם, וקו דק בין פריט לפריט.
 * ExpandCards ממשיך לשרת את המקטעים האחרים כפי שהוא.
 *
 * בכל רגע פתוח מאפיין אחד בלבד, והראשון פתוח בכניסה למסך.
 */
export default function TraitList({ items, progressLabel, completedMessage }) {
  const uid = useId()
  const panelId = `${uid}-panel`

  const first = items[0]?.id ?? null
  const [active, setActive] = useState(first)
  /* המאפיין הראשון נחשב "נצפה" כבר בכניסה, כי הוא פתוח */
  const [visited, setVisited] = useState(first ? [first] : [])

  const select = (id) => {
    setActive(id)
    setVisited((v) => (v.includes(id) ? v : [...v, id]))
  }

  const current = items.find((i) => i.id === active) || null
  const allDone = visited.length === items.length

  return (
    <div className="traits">
      {/* מד ההתקדמות — אותו מד ואותו מלל של שאר המקטעים */}
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

      <ol className="traits__list">
        {items.map((item, idx) => {
          const isActive = item.id === active
          return (
            <li className="traits__item" key={item.id}>
              <button
                type="button"
                className={`trait${isActive ? ' is-active' : ''}`}
                aria-expanded={isActive}
                aria-controls={panelId}
                onClick={() => select(item.id)}
              >
                {/* המספר דקורטיבי: הסדר כבר נמסר לקורא המסך מה-ol */}
                <span className="trait__num" aria-hidden="true">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="trait__icon" aria-hidden="true">
                  <Icon name={item.icon} size={22} />
                </span>
                <span className="trait__title">{item.title2 || item.title}</span>
                {/* סימון הפריט הפעיל: קו זהב קצר, בלי מסגרת */}
                <span className="trait__mark" aria-hidden="true" />
              </button>
            </li>
          )
        })}
      </ol>

      {/* אזור ההסבר המשותף — אחד לכל הרשימה, מתחתיה */}
      <div className="traits__panel" id={panelId} role="region" aria-live="polite">
        {current ? (
          /* key מאלץ הרכבה מחדש בכל החלפה, כדי שאנימציית המעבר תרוץ שוב */
          <div className="traits__panelInner" key={current.id}>
            <h3 className="traits__panelTitle">{current.title2 || current.title}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="traits__panelText">{current.text}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
