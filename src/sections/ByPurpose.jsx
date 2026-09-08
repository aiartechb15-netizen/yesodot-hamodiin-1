import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { byPurpose } from '../data/chapter1'
import './sections.css'

/**
 * "מודיעין לפי ייעוד" — אזור תוכן אחד, קומפקטי ומאוזן.
 *
 * אין כאן שני צדי מסך, כרטיסים, מסגרות, קשתות, אייקונים או קווים
 * מחברים: כותרת, קו זהב, שורת הנחיה, שתי אפשרויות טקסטואליות באותה
 * שורה, ומתחתיהן ההסבר של האפשרות שנבחרה.
 *
 * קו הזהב של הבורר הוא אלמנט אחד שנע בין שתי האפשרויות. מיקומו
 * נמדד מן הכפתור הפעיל ולא מחושב מראש, ולכן הוא מדויק בכל רוחב מסך
 * ובכל אורך כיתוב.
 */
export default function ByPurpose() {
  const [open, setOpen] = useState(byPurpose.items[0].id)

  const rowRef = useRef(null)
  const optRefs = useRef({})
  const [rule, setRule] = useState(null)

  /* מרכז הקו הקצר מתחת לאפשרות הפעילה */
  const measure = useCallback(() => {
    const row = rowRef.current
    const btn = optRefs.current[open]
    if (!row || !btn) return
    const r = row.getBoundingClientRect()
    const b = btn.getBoundingClientRect()
    setRule(Math.round(b.left - r.left + b.width / 2))
  }, [open])

  useLayoutEffect(() => {
    measure()
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
      <div className="container">
        <div className="purpose">
          <h2 className="section-title" id="by-purpose-title">
            {byPurpose.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="purpose__hint">{byPurpose.hint}</p>

          {/* הבורר — שתי אפשרויות טקסטואליות, בלי כרטיס, כפתור־גלולה
              או מסגרת. הקו הזהב אחד, ונע אל האפשרות שנבחרה. */}
          <div className="purpose__choice" ref={rowRef} role="tablist" aria-label={byPurpose.title}>
            {byPurpose.items.map((item) => {
              const isOpen = item.id === open
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    optRefs.current[item.id] = el
                  }}
                  className={`pchoice${isOpen ? ' is-on' : ''}`}
                  type="button"
                  role="tab"
                  id={`purpose-tab-${item.id}`}
                  aria-selected={isOpen}
                  aria-controls={`purpose-${item.id}`}
                  onClick={() => setOpen(item.id)}
                >
                  {/* הנקודה שמורה תמיד ונדלקת רק בפעילה, כדי שרוחב
                      האפשרות לא ישתנה והקו לא יקפוץ */}
                  <span className="pchoice__dot" aria-hidden="true" />
                  {item.title}
                </button>
              )
            })}

            <span
              className="purpose__rule"
              aria-hidden="true"
              style={rule === null ? { opacity: 0 } : { transform: `translateX(${rule}px)` }}
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
      </div>
    </section>
  )
}
