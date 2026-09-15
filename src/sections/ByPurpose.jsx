import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { byPurpose } from '../data/chapter1'
import purposeArt from '../assets/images/מודיעין לפי ייעוד תמונת רקע.png'
import './sections.css'

/**
 * "מודיעין לפי ייעוד" — רכיב אחד בשתי עמודות: התוכן מימין והאיור
 * משמאל, צמוד אליו.
 *
 * בתוכן: כותרת, קו זהב, שורת הנחיה, שורת טאבים על קו בסיס דק,
 * ומתחתיה ההסבר של הטאב שנבחר ותיבת הדוגמאות.
 *
 * קו הזהב של הטאבים הוא אלמנט אחד שנע ומתמתח בין הטאבים. מיקומו
 * ורוחבו נמדדים מן הטאב הפעיל ולא מחושבים מראש, ולכן הם מדויקים בכל
 * רוחב מסך ובכל אורך כיתוב.
 */
export default function ByPurpose() {
  const [open, setOpen] = useState(byPurpose.items[0].id)

  const rowRef = useRef(null)
  const [rule, setRule] = useState(null)

  /* קצה שמאל ורוחב של הטאב הפעיל. הטאב נקרא מן ה-DOM ולא מן ה-state,
     ולכן הפונקציה יציבה ואפשר לרשום את המאזינים פעם אחת בלבד. */
  const measure = useCallback(() => {
    const row = rowRef.current
    const btn = row?.querySelector('.pchoice.is-on')
    if (!row || !btn) return
    const r = row.getBoundingClientRect()
    const b = btn.getBoundingClientRect()
    setRule({ x: Math.round(b.left - r.left), w: Math.round(b.width) })
  }, [])

  useLayoutEffect(() => {
    measure()
  }, [measure, open])

  useLayoutEffect(() => {
    window.addEventListener('resize', measure)
    /* הגופן נטען אחרי הרינדור הראשון ומשנה את רוחב הכיתוב */
    if (document.fonts?.ready) document.fonts.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  return (
    <section
      className="section section--white byPurpose"
      id="by-purpose"
      aria-labelledby="by-purpose-title"
    >
      <div className="container purpose-layout">
        <div className="purpose">
          <h2 className="section-title" id="by-purpose-title">
            {byPurpose.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="purpose__hint">{byPurpose.hint}</p>

          {/* שורת הטאבים — קו בסיס דק לכל רוחב השורה, וקו זהב אחד
              שנע אל הטאב שנבחר ומקבל את רוחבו */}
          <div className="purpose__choice" ref={rowRef} role="tablist" aria-label={byPurpose.title}>
            {byPurpose.items.map((item) => {
              const isOpen = item.id === open
              return (
                <button
                  key={item.id}
                  className={`pchoice${isOpen ? ' is-on' : ''}`}
                  type="button"
                  role="tab"
                  id={`purpose-tab-${item.id}`}
                  aria-selected={isOpen}
                  aria-controls={`purpose-${item.id}`}
                  onClick={() => setOpen(item.id)}
                >
                  {item.title}
                </button>
              )
            })}

            <span
              className="purpose__rule"
              aria-hidden="true"
              style={
                rule === null
                  ? { opacity: 0 }
                  : { width: `${rule.w}px`, transform: `translateX(${rule.x}px)` }
              }
            />
          </div>

          {/* שני ההסברים יושבים באותו תא; הלא-פעיל מוסתר ב-visibility
              וממשיך לתרום לגובה, ולכן ההחלפה אינה משנה את גובה המסך */}
          <div className="purpose__body">
            {byPurpose.items.map((item) => {
              const isOpen = item.id === open
              return (
                <div
                  key={item.id}
                  className={`pbody${isOpen ? ' is-on' : ''}`}
                  id={`purpose-${item.id}`}
                  role="tabpanel"
                  aria-labelledby={`purpose-tab-${item.id}`}
                  aria-hidden={isOpen ? undefined : 'true'}
                >
                  <h3 className="pbody__title">{item.title}</h3>
                  <p className="pbody__text">{item.text}</p>
                  <p className="pbody__example">
                    <span className="pbody__exampleLabel">{item.examplesLabel}: </span>
                    {item.examples}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* איור דקורטיבי בלבד — אינו מוסר מידע שאינו כתוב לצדו */}
        <div className="purpose__visual" aria-hidden="true">
          <img src={purposeArt} alt="" />
        </div>
      </div>
    </section>
  )
}
