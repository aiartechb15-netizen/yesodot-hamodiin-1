import { useState } from 'react'
import { operational as op } from '../../data/chapter3'
import './chapter3.css'

/* חמש התחנות לפי סדר המסלול המבוקש. הניסוחים הם אלה שבקובץ הנתונים;
   כאן נקבע רק הסדר שבו הן מופיעות על הנתיב. */
const PATH_ORDER = ['h1', 'h4', 'h5', 'h2', 'h3']

/* פסקת הצרכנים נפתחת בצמד המילים הזה, וזה החלק היחיד בה שמודגש.
   הפיצול נעשה מן הטקסט שבנתונים ולא מנוסח מחדש: אם הפתיח ישתנה שם,
   הפסקה תוצג במלואה בלי הדגשה, ולא יופיע כאן טקסט שאינו מן הפרק. */
const NOTE_LEAD = 'בשנים האחרונות'
const noteRest = op.consumersNote.startsWith(NOTE_LEAD)
  ? op.consumersNote.slice(NOTE_LEAD.length)
  : null

export default function S3Operational() {
  const stations = PATH_ORDER.map((id) => op.how.find((h) => h.id === id)).filter(Boolean)
  const [open, setOpen] = useState(stations[0]?.id ?? null)

  return (
    <section className="section section--white opsec" id={op.id} aria-labelledby="ch3-op-title">
      <div className="container opsec__wrap">
        {/* ---------- מסך ראשון: מטרת המודיעין והצרכנים ---------- */}
        <div className="opscreen">
          <h2 className="section-title" id="ch3-op-title">
            {op.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />

          {/* המטרה — טקסט פתוח על הרקע, בלי כרטיס ובלי מלבן */}
          <p className="opsec__label">{op.purposeLabel}</p>
          <p className="opsec__purpose">{op.purpose}</p>

          {/* הכותרת יושבת מתחת לחלק הפותח ברוחב מלא, ולא לצדו */}
          <h3 className="opsec__sub opconsumers__title">{op.consumersTitle}</h3>
          <span className="gold-rule gold-rule--sm" aria-hidden="true" />

          {/* ארבעת הצרכנים בשורה אחת, מימין לשמאל, מופרדים בקו זהב דק */}
          <ul className="opconsumers">
            {op.consumers.map((c) => (
              <li className="opconsumer" key={c.id}>
                {c.title}
              </li>
            ))}
          </ul>

          <p className="opconsumers__note">
            {noteRest === null ? (
              op.consumersNote
            ) : (
              <>
                <strong className="opconsumers__lead">{NOTE_LEAD}</strong>
                {noteRest}
              </>
            )}
          </p>
        </div>

        {/* המשך הנתיב אל המסך השני — בלי קו הפרדה אופקי */}
        <span className="opsec__thread" aria-hidden="true" />

        {/* ---------- מסך שני: כיצד המודיעין ממלא את מטרתו ---------- */}
        <div className="opscreen">
          <h3 className="opsec__sub opsec__sub--lead">{op.howTitle}</h3>
          <span className="gold-rule gold-rule--sm" aria-hidden="true" />
          <p className="opsec__hint">{op.howHint}</p>

          {/* הנתיב בנוי משלוש שורות בגובה קבוע — התחנות, קו הזהב ואזור
              ההסבר — ולכן גובהו אינו משתנה בין תחנה לתחנה.

              ההסבר אינו יושב עוד בתוך התחנה שנבחרה אלא באזור משותף
              אחד מתחת לכולן: חמשת ההסברים נמצאים שם כל הזמן זה על גבי
              זה, והמעבר ביניהם הוא בשקיפות בלבד. כך שום דבר שמתחת
              לנתיב אינו זז בלחיצה.

              aria-pressed ולא aria-expanded: הכפתורים אינם פותחים
              וסוגרים חמישה אזורים נפרדים אלא בוחרים איזה מהם מוצג
              באזור האחד והקבוע. */}
          <div className="oppath">
            <ol className="oppath__stops">
              {stations.map((item, i) => {
                const isOpen = item.id === open
                return (
                  <li className={`opstop${isOpen ? ' is-open' : ''}`} key={item.id}>
                    <button
                      type="button"
                      className="opstop__btn"
                      aria-pressed={isOpen}
                      aria-controls="opstop-desc"
                      onClick={() => setOpen(item.id)}
                    >
                      <span className="opstop__num ltr-num" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span className="opstop__title">{item.title}</span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <span className="oppath__rule" aria-hidden="true" />

            <div className="oppath__desc" id="opstop-desc" aria-live="polite">
              {stations.map((item) => (
                <p
                  className={`opstop__text${item.id === open ? ' is-on' : ''}`}
                  key={item.id}
                  aria-hidden={item.id !== open}
                >
                  {item.text}
                </p>
              ))}
            </div>
          </div>

          {/* סוף הנתיב — התוצר, כטקסט על הרקע */}
          <p className="opnote opnote--end">
            <span className="opnote__dot opnote__dot--gold" aria-hidden="true" />
            <span className="opnote__label">מן הניתוח לבסיס המודיעיני</span>
            {op.outcome}
          </p>

          <h3 className="opsec__sub opsec__sub--sm">{op.questionsTitle}</h3>
          <ul className="opq">
            {op.questions.map((q, i) => (
              <li key={q}>
                <span className="opq__num ltr-num" aria-hidden="true">
                  {i + 1}
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
