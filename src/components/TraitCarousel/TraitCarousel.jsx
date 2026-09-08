import { useId, useState } from 'react'
import './TraitCarousel.css'

/** מספר תחנה דו-ספרתי: 1 → "01". */
const pad = (n) => String(n).padStart(2, '0')

/* ---------- גיאומטריית הקשת ----------
   קשת מעגלית רדודה בצורת U. כל המידות נגזרות כאן פעם אחת: אותו
   מעגל מייצר גם את הקו שב-SVG וגם את מיקום שבע התחנות, ולכן כל
   תחנה יושבת בדיוק על הקו ולא מעליו או מתחתיו.

   הקופסה רחבה מן הקשת עצמה, כדי שהתחנות שבקצוות ייכנסו בשלמותן.
   ה-SVG וה-viewBox חולקים את אותו יחס גובה-רוחב, ולכן המרות
   האחוזים שלמטה נכונות בכל רוחב מסך. */
const ARC = { w: 880, h: 168, left: 30, right: 850, top: 24, depth: 120 }
const CHORD = ARC.right - ARC.left
const RADIUS = (CHORD * CHORD) / (8 * ARC.depth) + ARC.depth / 2
const CX = (ARC.left + ARC.right) / 2
const CY = ARC.top + ARC.depth - RADIUS
const ARC_PATH = `M ${ARC.right} ${ARC.top} A ${RADIUS.toFixed(2)} ${RADIUS.toFixed(2)} 0 0 1 ${ARC.left} ${ARC.top}`

/** מיקום תחנה i על הקשת. RTL: 01 בימין הקשת ו-07 בשמאלה. */
const stopAt = (i, total) => {
  const x = ARC.right - (i * CHORD) / (total - 1)
  const y = CY + Math.sqrt(RADIUS * RADIUS - (x - CX) ** 2)
  return { left: `${(x / ARC.w) * 100}%`, top: `${(y / ARC.h) * 100}%` }
}

/**
 * קרוסלת המאפיינים — מאפיין אחד במרכז המסך בכל רגע.
 *
 * קרוסלה טיפוגרפית: אין כרטיס, מלבן, מסגרת, רקע או אייקון סביב
 * התוכן — רק הכותרת, קו זהב קצר וההסבר, על רקע המסך עצמו.
 *
 * ההתקדמות מוצגת אך ורק בשבע התחנות הממוספרות שעל הקשת: אין מונה
 * "X מתוך 7", אין שורת מספרים ישרה ואין נקודות דקורטיביות.
 *
 * הניווט: שני חצים שצמודים לתוכן — "הקודם" בימין ו"הבא" בשמאל,
 * כמתחייב מכיוון הקריאה — לחיצה על תחנה, ומקשי החצים במקלדת.
 * אין מעבר מעגלי: בקצוות הכפתור המתאים מושבת.
 */
export default function TraitCarousel({
  items,
  completedMessage,
  label,
  prevLabel = 'הקודם',
  nextLabel = 'הבא',
}) {
  const uid = useId()
  const slideId = `${uid}-slide`

  const [index, setIndex] = useState(0)
  /* 1 = קדימה, ‎-1 = אחורה. קובע מאיזה צד המגירה נכנסת */
  const [dir, setDir] = useState(1)
  /* המאפיין הראשון נצפה כבר בכניסה למסך, כי הוא המוצג */
  const [visited, setVisited] = useState([0])

  const total = items.length
  const atStart = index === 0
  const atEnd = index === total - 1

  const go = (target) => {
    if (target < 0 || target > total - 1 || target === index) return
    setDir(target > index ? 1 : -1)
    setIndex(target)
    setVisited((v) => (v.includes(target) ? v : [...v, target]))
  }

  const prev = () => go(index - 1)
  const next = () => go(index + 1)

  /* בעמוד RTL חץ שמאלה מתקדם וחץ ימינה חוזר */
  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      next()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      prev()
    }
  }

  const current = items[index]
  const allDone = visited.length === total

  return (
    <div className="tcar" role="group" aria-label={label} tabIndex={0} onKeyDown={onKeyDown}>
      <div className="tcar__stage">
        {/* בכיוון RTL העמודה הראשונה יושבת בימין — ולכן "הקודם" כאן */}
        <div className="tcar__nav">
          <button
            className="tcar__arrow tcar__arrow--prev"
            type="button"
            onClick={prev}
            disabled={atStart}
            aria-label="המאפיין הקודם"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M14.5 5.5 8 12l6.5 6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="tcar__navName" aria-hidden="true">
            {prevLabel}
          </span>
        </div>

        {/* כל שבעת המאפיינים יושבים זה על זה באותו תא, והלא-פעילים
            מוסתרים ב-visibility בלבד. כך גובה האזור נקבע מן המאפיין
            הארוך ביותר בכל רוחב מסך, והקשת והחצים אינם זזים במעבר —
            בלי גובה מינימלי קבוע שצריך לנחש מראש. */}
        <div
          className={`tcar__slide tcar__slide--${dir > 0 ? 'fwd' : 'back'}`}
          id={slideId}
          aria-live="polite"
        >
          {items.map((item, i) => (
            <div
              className={`tcar__panel${i === index ? ' is-on' : ''}`}
              key={item.id}
              aria-hidden={i === index ? undefined : 'true'}
            >
              <h3 className="tcar__title">{item.title2 || item.title}</h3>
              <span className="tcar__rule" aria-hidden="true" />
              <p className="tcar__text">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="tcar__nav">
          <button
            className="tcar__arrow tcar__arrow--next"
            type="button"
            onClick={next}
            disabled={atEnd}
            aria-label="המאפיין הבא"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M14.5 5.5 8 12l6.5 6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="tcar__navName" aria-hidden="true">
            {nextLabel}
          </span>
        </div>
      </div>

      {/* הקשת — קו הזהב ושבע התחנות שיושבות עליו */}
      <div className="tcar__arc">
        <svg
          className="tcar__arcLine"
          viewBox={`0 0 ${ARC.w} ${ARC.h}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <path d={ARC_PATH} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>

        {items.map((item, i) => (
          <button
            key={item.id}
            className={`tcar__stop${i === index ? ' is-active' : ''}${
              visited.includes(i) && i !== index ? ' is-visited' : ''
            }`}
            type="button"
            style={stopAt(i, total)}
            aria-current={i === index ? 'true' : undefined}
            aria-controls={slideId}
            aria-label={`${pad(i + 1)} — ${item.title2 || item.title}`}
            onClick={() => go(i)}
          >
            <span aria-hidden="true">{pad(i + 1)}</span>
          </button>
        ))}
      </div>

      {/* ההודעה מופיעה רק אחרי שביקרו בכל שבע התחנות. השורה שמורה
          תמיד, כדי שהופעתה לא תזיז את הקשת ואת התוכן שמעליה. */}
      <p className={`tcar__done${allDone ? ' is-on' : ''}`} aria-live="polite">
        {allDone ? completedMessage : ''}
      </p>
    </div>
  )
}
