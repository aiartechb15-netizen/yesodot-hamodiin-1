import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
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

  /* וריאנט inline: כל הכרטיסים מקבלים את גובה התוכן הארוך ביותר.
     הטקסטים נמדדים בפועל, כי מספר השורות משתנה עם רוחב הכרטיס —
     ערך קבוע היה חותך תוכן במסך צר או מותיר חלל מיותר במסך רחב. */
  const gridRef = useRef(null)
  const textRefs = useRef([])
  const titleRefs = useRef([])
  const [reserve, setReserve] = useState({ title: 0, text: 0 })

  const measure = useCallback(() => {
    const maxOf = (list) => {
      const hs = list.filter(Boolean).map((el) => el.scrollHeight)
      return hs.length ? Math.max(...hs) : 0
    }
    const next = { title: maxOf(titleRefs.current), text: maxOf(textRefs.current) }
    setReserve((prev) => (prev.title === next.title && prev.text === next.text ? prev : next))
  }, [])

  useLayoutEffect(() => {
    if (!inline) return undefined
    measure()
    const grid = gridRef.current
    if (!grid || typeof ResizeObserver === 'undefined') return undefined
    const ro = new ResizeObserver(measure)
    ro.observe(grid)
    return () => ro.disconnect()
  }, [inline, items, measure])

  // גופנים שנטענים אחרי הרינדור משנים את גובה הטקסט — מודדים שוב
  useEffect(() => {
    if (!inline || !document.fonts) return undefined
    let alive = true
    document.fonts.ready.then(() => {
      if (alive) measure()
    })
    return () => {
      alive = false
    }
  }, [inline, measure])

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

  const head = (item, idx) => (
    <>
      <span className="xcard__icon">
        <Icon name={item.icon} size={24} />
      </span>
      <span className="xcard__body">
        <span
          className="xcard__title"
          style={inline && reserve.title ? { minHeight: `${reserve.title}px` } : undefined}
        >
          <span
            className="xcard__titleText"
            ref={
              inline
                ? (el) => {
                    titleRefs.current[idx] = el
                  }
                : undefined
            }
          >
            {item.title2 || item.title}
          </span>
        </span>
        <span className="xcard__rule" aria-hidden="true" />
      </span>
      <Icon name="chevron" size={20} className="xcard__chev" />
    </>
  )

  if (inline) {
    return (
      <div className="xcards xcards--inline">
        {progress}

        <ul className={`xcards__grid xcards__grid--${columns}`} ref={gridRef}>
          {items.map((item, idx) => {
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
                    {head(item, idx)}
                  </button>
                  <div className="xcard__inlinePanel" id={`${uid}-${item.id}`} aria-hidden={!isOpen}>
                    <div
                      className="xcard__inlineInner"
                      /* השטח השמור חל רק על כרטיס פתוח, כדי שכרטיס סגור יישאר קומפקטי */
                      style={isOpen && reserve.text ? { minHeight: `${reserve.text}px` } : undefined}
                    >
                      <p
                        className="xcards__panelText"
                        ref={(el) => {
                          textRefs.current[idx] = el
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
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
        {items.map((item, idx) => {
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
                {head(item, idx)}
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
