import { useId, useRef, useState } from 'react'
import FillBlanks from '../../components/FillBlanks/FillBlanks'
import { design } from '../../data/chapter3'
import './chapter3.css'

/* התחנה נקראת בשלושה שלבים בתוך אותו אזור במסך: שני שלבי ידע
   ואחריהם התרגול. המעבר ביניהם ידני — כפתורים, נקודות, מקשי חצים
   או החלקה — ואינו נוגע בגלילת העמוד: הגלילה ממשיכה לחלק הבא בפרק.

   שלושת השלבים נשארים ב-DOM כל הזמן. כך גובה האזור נקבע לפי הגבוה
   שבהם ואין קפיצות בגובה, והתשובות שכבר נבחרו בתרגול נשמרות גם
   כשעוברים לשלב אחר וחוזרים.

   סדר היחידות בכל שלב נקבע כאן ולא בנתונים: ב-RTL העמודה הראשונה
   היא הימנית. */
const SCREENS = [
  ['d1', 'd3'],
  ['d2', 'd4'],
]

const STEPS = 3

const blockOf = (id) => design.blocks.find((b) => b.id === id)

/* יחידת ידע — כותרת, קו זהב קצר ומלל. בלי כרטיס, מסגרת, רקע או צל. */
function Unit({ id }) {
  const block = blockOf(id)
  if (!block) return null
  return (
    <article className="dsgn__unit">
      <h3 className="dsgn__unitTitle">{block.title}</h3>
      <span className="gold-rule gold-rule--sm" aria-hidden="true" />
      <p className="dsgn__text">{block.text}</p>
    </article>
  )
}

export default function S5Design() {
  const uid = useId()
  const [step, setStep] = useState(0)
  /* כיוון המעבר האחרון — קובע מאיזה צד נכנסת השקופית */
  const [dir, setDir] = useState(1)
  const touchX = useRef(null)

  const go = (next) => {
    const target = Math.min(STEPS - 1, Math.max(0, next))
    if (target === step) return
    setDir(target > step ? 1 : -1)
    setStep(target)
  }

  /* ב-RTL חץ שמאלה מקדם קדימה וחץ ימינה חוזר אחורה */
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      go(step + 1)
    } else if (e.key === 'ArrowRight') {
      go(step - 1)
    } else {
      return
    }
    e.preventDefault()
  }

  const onTouchStart = (e) => {
    touchX.current = e.changedTouches[0].clientX
  }

  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    /* סף קצר מדי היה הופך כל גלילה אנכית מוטה להחלקה */
    if (Math.abs(dx) < 48) return
    /* ב-RTL החלקה שמאלה (dx שלילי) מקדמת קדימה */
    go(dx < 0 ? step + 1 : step - 1)
  }

  return (
    <section className="section section--white dsgn" id={design.id} aria-labelledby="ch3-design-title">
      <div className="container dsgn__wrap">
        {/* הכותרת קבועה מעל הקרוסלה ואינה מתחלפת בין השלבים */}
        <header className="s3head dsgn__head">
          <h2 className="section-title" id="ch3-design-title">
            {design.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        {/* המאזין יושב על העטיפה ולא על המסילה, כדי שמקשי החצים יפעלו
            גם כשהמיקוד על אחד מכפתורי המעבר או על נקודות החיווי */}
        <div className="dsgn__stages" onKeyDown={onKeyDown}>
          <div
            className="stages-carousel"
            role="group"
            aria-roledescription="קרוסלה"
            aria-label={design.title}
            tabIndex={0}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* המסילה אינה נעה: רק השקופית הפעילה מוצגת, ולכן גובה
                האזור הוא גובה התוכן שלה ואין חלל מתחתיו. השקופיות
                האחרות מוסתרות ב-display: none אך נשארות מורכבות,
                ולכן מצב התרגול נשמר. */}
            <div className={`stages-track is-${dir > 0 ? 'fwd' : 'back'}`}>
            {/* שלב 1 ושלב 2 — שתי יחידות ידע בכל אחד */}
            {SCREENS.map((ids, i) => (
              <div
                className={`stage-slide${step === i ? ' is-on' : ''}`}
                key={ids.join('-')}
                id={`${uid}-slide-${i}`}
                role="group"
                aria-roledescription="שלב"
                aria-label={`שלב ${i + 1} מתוך ${STEPS}`}
              >
                <div className="knowledge-grid">
                  {ids.map((id) => (
                    <Unit id={id} key={id} />
                  ))}
                </div>
              </div>
            ))}

            {/* שלב 3 — התרגול. אותו רכיב ואותם נתונים כמו קודם, והוא
                נשאר מורכב גם כשאינו מוצג, ולכן התשובות נשמרות. */}
            <div
              className={`stage-slide${step === 2 ? ' is-on' : ''}`}
              id={`${uid}-slide-2`}
              role="group"
              aria-roledescription="שלב"
              aria-label={`שלב 3 מתוך ${STEPS}`}
            >
              <div className="s3exercise dsgn__exercise">
                <h3 className="s3sub">{design.exercise.title}</h3>
                <span className="gold-rule gold-rule--sm" aria-hidden="true" />
                <FillBlanks
                  bank={design.exercise.bank}
                  sentences={design.exercise.sentences}
                  hint={design.exercise.hint}
                />
              </div>
            </div>
          </div>
          </div>

          {/* ---- שורת המעבר: כפתורים, נקודות ומספר השלב ---- */}
          <div className="dsgn__nav">
          <div className="dsgn__navSide dsgn__navSide--prev">
            {step > 0 ? (
              <button className="dsgn__navBtn" type="button" onClick={() => go(step - 1)}>
                <span className="dsgn__navArrow" aria-hidden="true">
                  →
                </span>
                הקודם
              </button>
            ) : null}
          </div>

          <p className="dsgn__progress">
            <span className="dsgn__dots">
              {Array.from({ length: STEPS }, (_, i) => (
                <button
                  className={`dsgn__dot${i === step ? ' is-on' : ''}`}
                  type="button"
                  key={i}
                  aria-label={`מעבר לשלב ${i + 1} מתוך ${STEPS}`}
                  aria-current={i === step ? 'true' : undefined}
                  aria-controls={`${uid}-slide-${i}`}
                  onClick={() => go(i)}
                />
              ))}
            </span>
            <span className="dsgn__count ltr-num" aria-hidden="true">
              {step + 1} / {STEPS}
            </span>
          </p>

          <div className="dsgn__navSide dsgn__navSide--next">
            {/* בשלב האחרון אין "הבא": משם ממשיכים בגלילה לחלק הבא */}
            {step < STEPS - 1 ? (
              <button className="dsgn__navBtn" type="button" onClick={() => go(step + 1)}>
                הבא
                <span className="dsgn__navArrow" aria-hidden="true">
                  ←
                </span>
              </button>
            ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
