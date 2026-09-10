import { useId, useRef, useState } from 'react'
import './TraitCarousel.css'

/* ---------- גיאומטריית הקשת ----------
   קשת רחבה ורדודה בצורת חצי-עיגול תחתון: המיתר 500 והעומק 96, ומהם
   נגזר רדיוס המעגל. אותו מעגל מייצר גם את הקו שב-SVG וגם את מיקום
   שבע הנקודות, ולכן כל נקודה יושבת על הקו בדיוק.

   הנקודות מרווחות שווה בזווית — כלומר שווה לאורך הקשת עצמה, ולא
   שווה בציר האופקי. הראשונה בקצה הימני, ומשם ההתקדמות נעה עם כיוון
   השעון: ימין ← מטה ← שמאל. */
const ARC = { w: 560, h: 130, padX: 30, top: 14, depth: 96 }
const CHORD = ARC.w - ARC.padX * 2
const R = (CHORD * CHORD) / (8 * ARC.depth) + ARC.depth / 2
const CX = ARC.w / 2
const CY = ARC.top + ARC.depth - R
/* הזווית שבה יושב הקצה הימני של הקשת, ומשם עד הקצה השמאלי */
const START = Math.atan2(R - ARC.depth, CHORD / 2)
const SPAN = Math.PI - 2 * START

const ARC_PATH = `M ${ARC.w - ARC.padX} ${ARC.top} A ${R.toFixed(2)} ${R.toFixed(2)} 0 0 1 ${ARC.padX} ${ARC.top}`

/** מיקום נקודה i על הקשת, באחוזים מן הקופסה. */
const dotAt = (i, total) => {
  const angle = START + (SPAN * i) / (total - 1)
  const x = CX + R * Math.cos(angle)
  const y = CY + R * Math.sin(angle)
  return { left: `${(x / ARC.w) * 100}%`, top: `${(y / ARC.h) * 100}%` }
}

/** מרחק אצבע מזערי שנחשב להחלקה ולא לנגיעה */
const SWIPE = 40

/**
 * קרוסלת המאפיינים — מאפיין אחד בכל רגע.
 *
 * טיפוגרפיה בלבד: כותרת גדולה, קו זהב קצר וההסבר — בלי כרטיס,
 * מסגרת, רקע, אייקון או מספר. כל האזור מיושר לימין, בהמשך לקו
 * הכותרת של המסך.
 *
 * הניווט: שני חצים עגולים משני צדי התוכן, חצי-עיגול של שבע נקודות
 * מתחתיו, מקשי החצים במקלדת והחלקה במסך מגע. אין מונה "X מתוך 7"
 * ואין כיתוב ליד החצים — הנקודות הן מד ההתקדמות היחיד.
 */
export default function TraitCarousel({ items, completedMessage, label }) {
  const uid = useId()
  const slideId = `${uid}-slide`

  const [index, setIndex] = useState(0)
  /* המאפיין הראשון נצפה כבר בכניסה למסך, כי הוא המוצג */
  const [visited, setVisited] = useState([0])
  const touchX = useRef(null)

  const total = items.length
  const atStart = index === 0
  const atEnd = index === total - 1

  const go = (target) => {
    if (target < 0 || target > total - 1 || target === index) return
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

  /* החלקה במסך מגע: שמאלה = המאפיין הבא, ימינה = הקודם */
  const onTouchStart = (event) => {
    touchX.current = event.changedTouches[0].clientX
  }

  const onTouchEnd = (event) => {
    if (touchX.current === null) return
    const delta = event.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(delta) < SWIPE) return
    if (delta < 0) next()
    else prev()
  }

  const allDone = visited.length === total

  return (
    <div
      className="tcar"
      role="group"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* התוכן, וחץ עגול בכל אחד מצדיו. בכיוון RTL הראשון בשורה
          יושב בימין, ולכן הוא "הקודם". */}
      <div className="tcar__row">
        <button
          className="tcar__arrow"
          type="button"
          onClick={prev}
          disabled={atStart}
          aria-label="המאפיין הקודם"
          aria-controls={slideId}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M9.5 5.5 16 12l-6.5 6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* שבעת המאפיינים יושבים זה על זה באותו תא: גובה האזור נקבע
            מן הארוך שביניהם, ולכן העמוד אינו קופץ במעבר ביניהם */}
        <div className="tcar__slide" id={slideId} aria-live="polite">
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

        <button
          className="tcar__arrow"
          type="button"
          onClick={next}
          disabled={atEnd}
          aria-label="המאפיין הבא"
          aria-controls={slideId}
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
      </div>

      {/* חצי-העיגול: קו דק ושבע נקודות עליו, בלי מספרים ובלי אייקונים */}
      <div className="tcar__dial">
        <svg
          className="tcar__dialLine"
          viewBox={`0 0 ${ARC.w} ${ARC.h}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <path d={ARC_PATH} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>

        {items.map((item, i) => (
          <button
            key={item.id}
            className={`tcar__dot${i === index ? ' is-active' : ''}`}
            type="button"
            style={dotAt(i, total)}
            aria-current={i === index ? 'true' : undefined}
            aria-controls={slideId}
            aria-label={item.title2 || item.title}
            onClick={() => go(i)}
          />
        ))}
      </div>

      {/* ההודעה מופיעה רק אחרי שכל שבעת המאפיינים נצפו. השורה שמורה
          תמיד, ולכן הופעתה אינה מזיזה דבר. */}
      <p className={`tcar__done${allDone ? ' is-on' : ''}`} aria-live="polite">
        {allDone ? completedMessage : ''}
      </p>
    </div>
  )
}
