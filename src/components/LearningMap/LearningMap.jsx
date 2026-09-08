import { useEffect, useId, useState } from 'react'
import './LearningMap.css'

/**
 * "מודיעין כמערכת לומדת" — מסך שלם שהאיור הוא הרקע שלו.
 *
 * אין כאן תמונה שמונחת בתוך העמוד: האיור נפרש על כל המקטע, מקצה לקצה
 * ועד תפריט הצד, ומעליו יושבות חמש נקודות מידע. לחיצה על נקודה פותחת
 * את ההסבר שלה בלבד — ישירות על הרקע, בלי כרטיס ובלי מלבן, ומחוברת
 * לנקודה בקו זהב דק. אין רשימות, כרטיסיות או חזרה על המלל מתחת לאיור:
 * כל תוכן המקטע נפתח מן הנקודות.
 *
 * גיאומטריה: הנקודות ממוקמות באחוזים בתוך .lmap__frame — מסגרת שמחשבת
 * בדיוק את הקופסה שאליה האיור נפרש ב-cover (max בין רוחב המקטע לגובהו
 * לפי יחס האיור). שכבת הרקע ושכבת הנקודות מקבלות את אותה מסגרת, ולכן
 * כל נקודה נשארת על הפרט שלה בכל יחס מסך, ולא נודדת עם החיתוך.
 */
export default function LearningMap({ image, alt, title, titleId, hint, points }) {
  const uid = useId()
  const [active, setActive] = useState(null)
  const [seen, setSeen] = useState([])

  const current = points.find((p) => p.id === active) || null
  const noteId = `${uid}-note`

  const toggle = (id) => {
    setActive((prev) => (prev === id ? null : id))
    setSeen((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  /* Esc סוגר את ההסבר הפתוח — בלי כפתור סגירה שיתחרה באיור */
  useEffect(() => {
    if (!active) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <div className="lmap">
      {/* שכבת הרקע: השמנת האטומה חוסמת את גיליון המוטיבים של העמוד,
          ולכן במקטע הזה האיור הוא הרקע היחיד */}
      <div className="lmap__bg">
        <div className="lmap__frame">
          <img className="lmap__img" src={image} alt={alt} />
        </div>
      </div>

      {/* שכבת התוכן — מעל האיור. השכבה עצמה שקופה ללחיצות, ורק
          הנקודות עצמן לוכדות אותן */}
      <div className="lmap__fore">
        <header className="lmap__head">
          <h2 className="lmap__title" id={titleId}>
            {title}
          </h2>
          <span className="lmap__rule" aria-hidden="true" />
          <p className="lmap__hint">{hint}</p>
        </header>

        <div
          className="lmap__frame lmap__frame--hot"
          style={current ? { '--nx': `${current.x}%`, '--ny': `${current.y}%` } : undefined}
        >
          {points.map((p) => {
            const isActive = p.id === active
            return (
              <button
                key={p.id}
                type="button"
                className={`lspot${isActive ? ' is-active' : ''}${
                  seen.includes(p.id) ? ' is-seen' : ''
                }`}
                style={{ '--x': `${p.x}%`, '--y': `${p.y}%` }}
                aria-expanded={isActive}
                aria-controls={noteId}
                onClick={() => toggle(p.id)}
              >
                {/* הכיתוב מעל הנקודה: הקו המקשר יוצא מן הנקודה לצדדים,
                    ואילו הכיתוב היה חוצה אותו לו ישב מתחתיה */}
                <span className="lspot__label">{p.term}</span>
                <span className="lspot__dot" aria-hidden="true" />
              </button>
            )
          })}

          {/* ההסבר — אחד בכל רגע, על הרקע עצמו, וקו זהב דק מחבר אותו
              לנקודה. הצד נבחר פנימה: נקודה בחצי הימני של האיור פותחת
              שמאלה, ונקודה בחצי השמאלי פותחת ימינה. */}
          <div className="lmap__note" id={noteId} role="region" aria-live="polite">
            {current ? (
              <div
                className="lnote"
                key={current.id}
                data-side={current.x > 50 ? 'left' : 'right'}
              >
                <span className="lnote__link" aria-hidden="true" />
                <p className="lnote__text">{current.text}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
