import { useId, useState } from 'react'
import Icon from '../Icons/Icons'
import './TraitCarousel.css'

/** מספר תחנה דו-ספרתי: 1 → "01". */
const pad = (n) => String(n).padStart(2, '0')

/**
 * קרוסלת המאפיינים — מאפיין אחד במרכז המסך בכל רגע.
 *
 * החליפה את TraitList: אין כאן רשימה שמציגה את כל המאפיינים יחד, אין
 * שתי עמודות, אין קווים מפרידים ואין סרגל התקדמות. הניווט נעשה בשני
 * חצים שצמודים לתוכן, בשבע תחנות ממוספרות ובמקשי החצים במקלדת.
 *
 * המעבר בין מאפיינים מונפש ב-CSS: ה-key על המגירה מאלץ הרכבה מחדש,
 * וכיוון ההחלקה נקבע לפי כיוון התנועה.
 */
export default function TraitCarousel({ items, counterLabel, completedMessage, label }) {
  const uid = useId()
  const slideId = `${uid}-slide`

  const [index, setIndex] = useState(0)
  /* 1 = קדימה, ‎-1 = אחורה. קובע מאיזה צד המגירה נכנסת */
  const [dir, setDir] = useState(1)
  /* המאפיין הראשון נצפה כבר בכניסה למסך, כי הוא המוצג */
  const [visited, setVisited] = useState([0])

  const total = items.length

  const go = (next, direction) => {
    const target = (next + total) % total
    setDir(direction)
    setIndex(target)
    setVisited((v) => (v.includes(target) ? v : [...v, target]))
  }

  const prev = () => go(index - 1, -1)
  const next = () => go(index + 1, 1)

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

  /** שם המאפיין בהיסט נתון, במעגל — לתוויות שליד החצים. */
  const nameOf = (i) => {
    const item = items[(i + total) % total]
    return item.title2 || item.title
  }

  return (
    <div className="tcar" role="group" aria-label={label} tabIndex={0} onKeyDown={onKeyDown}>
      <div className="tcar__stage">
        <div className="tcar__nav tcar__nav--prev">
          <button className="tcar__arrow" type="button" onClick={prev} aria-label="המאפיין הקודם">
            <Icon name="chevron" size={24} className="tcar__chev tcar__chev--prev" />
          </button>
          {/* שם המאפיין השכן — רמז לאן החץ מוביל, ולא פקד בפני עצמו */}
          <span className="tcar__navName" aria-hidden="true">
            {nameOf(index - 1)}
          </span>
        </div>

        <div className="tcar__slide" id={slideId} aria-live="polite">
          <div className={`tcar__panel tcar__panel--${dir > 0 ? 'fwd' : 'back'}`} key={current.id}>
            <span className="tcar__icon" aria-hidden="true">
              <Icon name={current.icon} size={32} />
            </span>
            <h3 className="tcar__title">{current.title2 || current.title}</h3>
            <span className="gold-rule" aria-hidden="true" />
            <p className="tcar__text">{current.text}</p>
          </div>
        </div>

        <div className="tcar__nav tcar__nav--next">
          <button className="tcar__arrow" type="button" onClick={next} aria-label="המאפיין הבא">
            <Icon name="chevron" size={24} className="tcar__chev tcar__chev--next" />
          </button>
          <span className="tcar__navName" aria-hidden="true">
            {nameOf(index + 1)}
          </span>
        </div>
      </div>

      {/* הניווט התחתון: שבע התחנות, המונה וההודעה — גוש אחד ולא
          שלושה אלמנטים מנותקים */}
      <div className="tcar__foot">
        <ol className="tcar__stops">
          {items.map((item, i) => (
            <li key={item.id}>
              <button
                className={`tcar__stop${i === index ? ' is-active' : ''}${
                  visited.includes(i) ? ' is-visited' : ''
                }`}
                type="button"
                aria-current={i === index ? 'true' : undefined}
                aria-controls={slideId}
                aria-label={`${pad(i + 1)} — ${item.title2 || item.title}`}
                onClick={() => go(i, i > index ? 1 : -1)}
              >
                <span aria-hidden="true">{pad(i + 1)}</span>
              </button>
            </li>
          ))}
        </ol>

        <p className="tcar__counter">
          <span className="ltr-num">{index + 1}</span> {counterLabel}{' '}
          <span className="ltr-num">{total}</span>
        </p>

        {allDone ? <p className="tcar__done">{completedMessage}</p> : null}
      </div>
    </div>
  )
}
