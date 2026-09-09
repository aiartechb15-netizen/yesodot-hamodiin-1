import { useEffect, useId, useRef, useState } from 'react'
import Icon from '../Icons/Icons'
import useMediaQuery from '../../hooks/useMediaQuery'
import './ChapterNav.css'

/* מעל הרוחב הזה התפריט הוא עמודה קבועה בצד ימין; מתחתיו הוא נפתח כמגירה. */
const DESKTOP = '(min-width: 1080px)'

/* הקו שקובע איזה מקטע "נוכחי": שליש מגובה החלון. מקטע נחשב נוכחי
   כל עוד ראשו עבר את הקו, ולכן האחרון שעבר אותו הוא הפעיל. */
const ACTIVE_LINE = 0.32

/**
 * תפריט הצד של הפרק — רכיב אחד ויחיד לשלושת הפרקים, בלי גרסאות
 * לפי פרק: אותו מבנה, אותו עיצוב ואותו רוחב בכל מקום, ורק רשימת
 * המקטעים משתנה.
 *
 * ברשימה מופיע שם המקטע בלבד — בלי מספור, בלי מונה התקדמות ובלי
 * ציר אנכי. המקטע הנוכחי נייבי ומודגש, ולצדו פס טורקיז דק.
 * sections: [{ id, label }] — המקטעים הקיימים בפרק, לפי סדר העמוד.
 */
export default function ChapterNav({ sections, title = 'תוכן הפרק', label = 'ניווט בין מקטעי הפרק' }) {
  const isDesktop = useMediaQuery(DESKTOP)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState(() => sections[0]?.id)
  const panelId = useId()
  const listRef = useRef(null)

  /* איתור המקטע הנוכחי. הקריאה ל-DOM נדחית ל-rAF כדי שגלילה
     לא תשלם על מדידה בכל אירוע. */
  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const line = window.innerHeight * ACTIVE_LINE
      let current = sections[0]?.id

      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= line) current = s.id
      }

      /* בתחתית העמוד המקטע האחרון לעולם לא חוצה את הקו, ולכן הוא
         מסומן במפורש — אחרת הסימון "נתקע" מקטע אחד לפני הסוף. */
      const doc = document.documentElement
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 4) {
        current = sections[sections.length - 1]?.id ?? current
      }

      setActiveId(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sections])

  // מעבר לדסקטופ סוגר מגירה שנשארה פתוחה
  useEffect(() => {
    if (isDesktop) setOpen(false)
  }, [isDesktop])

  // כשהמגירה פתוחה: Escape סוגר, והעמוד שמאחוריה לא נגלל
  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  /* גלילת הפריט הפעיל אל תוך התפריט — רק כשלרשימה עצמה יש גלילה,
     כדי שהעמוד עצמו לעולם לא יזוז בגלל התפריט. */
  useEffect(() => {
    const list = listRef.current
    if (!list || list.scrollHeight <= list.clientHeight) return

    const item = list.querySelector('[aria-current="true"]')
    if (!item) return

    const top = item.offsetTop - list.offsetTop
    const bottom = top + item.offsetHeight
    if (top < list.scrollTop) list.scrollTop = top - 12
    else if (bottom > list.scrollTop + list.clientHeight) {
      list.scrollTop = bottom - list.clientHeight + 12
    }
  }, [activeId])

  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === activeId),
  )

  return (
    <nav className="chnav" aria-label={label}>
      {/* מסכים צרים: פס פתיחה דביק מתחת ל-Header */}
      <div className="chnav__bar">
        <button
          type="button"
          className="chnav__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name="menu" size={18} className="chnav__toggleIcon" />
          <span className="chnav__toggleText">
            <span className="chnav__toggleKicker">{title}</span>
            <span className="chnav__toggleCurrent">{sections[activeIndex]?.label}</span>
          </span>
        </button>
      </div>

      <div
        className={`chnav__scrim${open ? ' is-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div className={`chnav__panel${open ? ' is-open' : ''}`} id={panelId}>
        <div className="chnav__head">
          <span className="chnav__title">{title}</span>
          <button
            type="button"
            className="chnav__close"
            onClick={() => setOpen(false)}
            aria-label="סגירת התפריט"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <ul className="chnav__list" ref={listRef}>
          {sections.map((s, i) => {
            const isActive = i === activeIndex
            return (
              <li key={s.id}>
                <a
                  className={`chnav__link${isActive ? ' is-active' : ''}`}
                  href={`#${s.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="chnav__label">{s.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
