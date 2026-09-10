import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
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
export default function LearningMap({ image, alt, title, titleId, hint, points, decorDots = [] }) {
  const uid = useId()
  const [active, setActive] = useState(null)
  const [seen, setSeen] = useState([])

  const current = points.find((p) => p.id === active) || null

  /* ההסבר האחרון שנפתח נשאר מורכב גם אחרי הסגירה, כדי שתהיה לו
     דעיכה. בלעדיו React היה מסיר אותו מיד והוא היה נעלם בבת אחת. */
  const [shown, setShown] = useState(null)
  const shownPoint = points.find((p) => p.id === shown) || null
  const noteId = `${uid}-note`

  const toggle = (id) => {
    setActive((prev) => (prev === id ? null : id))
    setSeen((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  /* תגית שיושבת על נקודה בשולי האיור עלולה לחרוג מן המקטע, מפני
     שהאיור רחב ממנו ונחתך. כאן נמדדת כל תגית מול גבולות המקטע
     ומוזזת פנימה במידה הדרושה בלבד; הגבעול נשאר מכוון לסמן, ולכן
     הקשר בין הכיתוב לנקודה נשמר. */
  const stageRef = useRef(null)
  const noteRef = useRef(null)
  /* ההיסט האנכי של ההסבר. הוא נמדד ואינו מחושב מראש: מיקום התגיות
     תלוי בחיתוך האיור וברוחב המסך, ולכן ערך קבוע היה נכון במסך אחד
     ושגוי באחר. */
  const [noteDy, setNoteDy] = useState(0)
  const spotRefs = useRef({})

  const fitLabels = useCallback(() => {
    const stage = stageRef.current
    if (!stage) return
    const bounds = stage.getBoundingClientRect()
    const edge = 14
    const gap = 10

    /* המיקום הטבעי נגזר מן הסמן ומרוחב התגית ולא מן התגית עצמה:
       היא כבר נושאת את ההזזה הקודמת, והסמן אינו. כך החישוב יוצא
       זהה בכל מדידה ואינו תלוי בסדר רענון הסגנון */
    const items = Object.values(spotRefs.current)
      .filter(Boolean)
      .map((btn) => {
        const label = btn.querySelector('.lspot__label')
        const dot = btn.getBoundingClientRect()
        const box = label.getBoundingClientRect()
        return {
          btn,
          label,
          center: dot.left + dot.width / 2,
          half: label.offsetWidth / 2,
          top: box.top,
          bottom: box.bottom,
          shift: 0,
        }
      })

    const clamp = (it) => {
      const left = it.center + it.shift - it.half
      const right = it.center + it.shift + it.half
      if (left < bounds.left + edge) it.shift += bounds.left + edge - left
      else if (right > bounds.right - edge) it.shift += bounds.right - edge - right
    }

    items.forEach(clamp)

    /* שתי תגיות שכנות באיור צר עלולות להיפגש. הן אטומות, ולכן כל
       זוג חופף נפרד לשני הצדדים במידה השווה שחסרה לו, וכל אחת
       נבלמת מחדש בשולי המקטע. שלושה מעברים מספיקים לחמש נקודות. */
    for (let pass = 0; pass < 3; pass += 1) {
      for (let i = 0; i < items.length; i += 1) {
        for (let j = i + 1; j < items.length; j += 1) {
          const a = items[i]
          const b = items[j]
          if (a.bottom <= b.top || b.bottom <= a.top) continue
          const ac = a.center + a.shift
          const bc = b.center + b.shift
          const need = a.half + b.half + gap - Math.abs(ac - bc)
          if (need <= 0) continue
          const dir = ac <= bc ? 1 : -1
          a.shift -= (need / 2) * dir
          b.shift += (need / 2) * dir
          clamp(a)
          clamp(b)
        }
      }
    }

    items.forEach((it) => it.btn.style.setProperty('--shift', `${Math.round(it.shift)}px`))
  }, [])

  useLayoutEffect(() => {
    fitLabels()
    window.addEventListener('resize', fitLabels)
    /* הגופן נטען אחרי הרינדור הראשון ומשנה את רוחב התגיות */
    if (document.fonts?.ready) document.fonts.ready.then(fitLabels)
    return () => window.removeEventListener('resize', fitLabels)
  }, [fitLabels])

  useEffect(() => {
    if (active) setShown(active)
  }, [active])

  /* Esc סוגר את ההסבר הפתוח — בלי כפתור סגירה שיתחרה באיור */
  useEffect(() => {
    if (!active) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  /* ההסבר נפתח לצד הנקודה, ולעיתים נופל בדיוק על תגית של נקודה
     שכנה. כאן הוא נמדד מול כל התגיות שאינן שלו ומוזז אנכית במידה
     המזערית שמפנה את הכיסוי — כלפי הכיוון הקרוב מבין השניים. שאר
     הנקודות נשארות גלויות ולחיצות; רק ההסבר זז. */
  useLayoutEffect(() => {
    const note = noteRef.current
    if (!active || !note) {
      setNoteDy(0)
      return
    }

    /* מודדים ללא ההיסט הקודם, אחרת הוא היה מצטבר */
    note.style.setProperty('--note-dy', '0px')
    const nr = note.getBoundingClientRect()

    let shift = 0
    for (const [id, el] of Object.entries(spotRefs.current)) {
      if (!el || id === active) continue
      const label = el.querySelector('.lspot__label')
      if (!label) continue
      const lr = label.getBoundingClientRect()
      const overX = Math.min(nr.right, lr.right) - Math.max(nr.left, lr.left)
      const overY = Math.min(nr.bottom, lr.bottom) - Math.max(nr.top, lr.top)
      if (overX <= 0 || overY <= 0) continue

      const down = lr.bottom - nr.top + 14
      const up = lr.top - nr.bottom - 14
      const pick = Math.abs(down) <= Math.abs(up) ? down : up
      if (Math.abs(pick) > Math.abs(shift)) shift = pick
    }

    setNoteDy(Math.round(shift))
  }, [active, shown])

  return (
    <div className="lmap" ref={stageRef}>
      {/* שכבת הרקע: השמנת האטומה חוסמת את גיליון המוטיבים של העמוד,
          ולכן במקטע הזה האיור הוא הרקע היחיד */}
      <div className="lmap__bg">
        <div className="lmap__frame">
          <img className="lmap__img" src={image} alt={alt} />

          {/* כתמי שמנת מטושטשים על עיגולי הזהב הדקורטיביים שבאיור.
              הם יושבים באותה מסגרת כמו הנקודות, ולכן נשארים עליהם
              בכל יחס מסך; רק חמש הנקודות שיש להן פעולה נשארות. */}
          {decorDots.map((d, i) => (
            <span
              key={i}
              className="lmap__decor"
              aria-hidden="true"
              style={{ '--dx': `${d.x}%`, '--dy': `${d.y}%`, '--ds': `${d.size || 2.1}%` }}
            />
          ))}
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
          style={
            shownPoint ? { '--nx': `${shownPoint.x}%`, '--ny': `${shownPoint.y}%` } : undefined
          }
        >
          {points.map((p) => {
            const isActive = p.id === active
            return (
              <button
                key={p.id}
                ref={(el) => {
                  spotRefs.current[p.id] = el
                }}
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
            {shownPoint ? (
              /* key מאלץ הרכבה מחדש בכל החלפת נקודה, ולכן דעיכת
                 הפתיחה רצה גם במעבר בין נקודה לנקודה ולא רק בפתיחה
                 הראשונה. בסגירה המחלקה is-on יורדת וההסבר נמוג
                 במקומו, במקום להיעלם בבת אחת. */
              <div
                className={`lnote${active ? ' is-on' : ''}`}
                key={shownPoint.id}
                ref={noteRef}
                style={{ '--note-dy': `${noteDy}px` }}
                data-side={shownPoint.x > 50 ? 'left' : 'right'}
                aria-hidden={active ? undefined : 'true'}
              >
                <span className="lnote__link" aria-hidden="true" />
                <p className="lnote__text">{shownPoint.text}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
