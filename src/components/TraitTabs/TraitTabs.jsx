import { useId, useRef, useState } from 'react'
import Icon from '../Icons/Icons'
import './TraitTabs.css'

/** מספר דו-ספרתי: 01, 02 ... 07 */
const pad = (n) => String(n).padStart(2, '0')

/**
 * מאפייני עבודת המודיעין — פס ניווט אחד ואזור תוכן אחד.
 *
 * הפס מציג את כל שבעת המאפיינים מראש: עיגול ממוספר, שם מתחתיו, וקו
 * דק שמחבר בין העיגולים. אין כרטיס לכל מאפיין — הפס הוא רכיב ניווט
 * אחד. בחירה במאפיין מחליפה רק את אזור התוכן שמתחת; הפס נשאר קבוע.
 *
 * נגישות: תבנית tabs — מקש Tab נכנס לפס ויוצא ממנו בעצירה אחת, ומקשי
 * החצים עוברים בין המאפיינים. בעמוד RTL חץ שמאלה מתקדם.
 */
export default function TraitTabs({ items, completedMessage, label }) {
  const uid = useId()
  const [index, setIndex] = useState(0)
  /* המאפיין הראשון נצפה כבר בכניסה למסך, כי הוא המוצג */
  const [visited, setVisited] = useState([0])
  const tabRefs = useRef([])

  const total = items.length
  const tabId = (i) => `${uid}-tab-${i}`
  const panelId = (i) => `${uid}-panel-${i}`

  const select = (i, focus = false) => {
    setIndex(i)
    setVisited((v) => (v.includes(i) ? v : [...v, i]))
    const tab = tabRefs.current[i]
    if (!tab) return
    if (focus) tab.focus({ preventScroll: true })
    /* במסך צר הפס נגלל לרוחבו: הלשונית שנבחרה נגללת פנימה, בלי
       לגלול את העמוד עצמו */
    const rail = tab.closest('.tsel__rail')
    if (rail && rail.scrollWidth > rail.clientWidth) {
      const r = rail.getBoundingClientRect()
      const t = tab.getBoundingClientRect()
      if (t.left < r.left) rail.scrollBy({ left: t.left - r.left - 16, behavior: 'smooth' })
      else if (t.right > r.right) rail.scrollBy({ left: t.right - r.right + 16, behavior: 'smooth' })
    }
  }

  const onKeyDown = (event) => {
    let target = null
    if (event.key === 'ArrowLeft') target = (index + 1) % total
    else if (event.key === 'ArrowRight') target = (index - 1 + total) % total
    else if (event.key === 'Home') target = 0
    else if (event.key === 'End') target = total - 1
    if (target === null) return
    event.preventDefault()
    select(target, true)
  }

  const allDone = visited.length === total

  return (
    <div className="tsel">
      <div className="tsel__rail">
        <div className="tsel__track" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
          {items.map((item, i) => {
            const on = i === index
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                id={tabId(i)}
                className={`tsel__tab${on ? ' is-active' : ''}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={panelId(i)}
                tabIndex={on ? 0 : -1}
                onClick={() => select(i)}
              >
                <span className="tsel__num" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <span className="tsel__name">{item.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* כל שבעת ההסברים יושבים באותו תא: גובה האזור נקבע מן הארוך
          שביניהם, ולכן העמוד אינו קופץ במעבר בין מאפיין קצר לארוך */}
      <div className="tsel__stage">
        {items.map((item, i) => {
          const on = i === index
          return (
            <div
              key={item.id}
              id={panelId(i)}
              className={`tsel__panel${on ? ' is-on' : ''}`}
              role="tabpanel"
              aria-labelledby={tabId(i)}
              aria-hidden={on ? undefined : 'true'}
              tabIndex={on ? 0 : -1}
            >
              <span className="tsel__icon" aria-hidden="true">
                <Icon name={item.icon} size={44} />
              </span>
              <div className="tsel__body">
                <h3 className="tsel__title">{item.title2 || item.title}</h3>
                <p className="tsel__text">{item.text}</p>
              </div>
              <span className="tsel__bigNum" aria-hidden="true">
                {pad(i + 1)}
              </span>
            </div>
          )
        })}
      </div>

      {/* ההודעה מופיעה רק אחרי שכל שבעת המאפיינים נצפו. השורה שמורה
          תמיד, ולכן הופעתה אינה מזיזה דבר. */}
      <p className={`tsel__done${allDone ? ' is-on' : ''}`} aria-live="polite">
        {allDone ? completedMessage : ''}
      </p>
    </div>
  )
}
