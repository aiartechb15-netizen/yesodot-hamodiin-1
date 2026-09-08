import { Fragment } from 'react'
import { chapterOpening } from '../data/chapter1'
import './sections.css'

/** מספר דו-ספרתי למסלול: 1 → "01". */
const pad = (n) => String(n).padStart(2, '0')

/* מסך מטרת הפרק: בחלקו העליון הכותרת, קו הזהב ופסקת המטרה; בחלקו
   התחתון תוצאות הלמידה כמסלול ממוספר רציף — שתי שורות של שלוש,
   מימין לשמאל, שמחוברות ביניהן בקו מעוגל. אין כאן תמונה, כרטיס או
   מסגרת: ההיררכיה נבנית מהמספרים, מקווי החיבור ומגודל הטקסט. */
export default function ChapterOpening() {
  const last = chapterOpening.outcomes.length - 1

  return (
    <section className="section section--paper" id="chapter-open" aria-labelledby="chapter-open-title">
      <div className="container open__container open__inner">
        <header className="open__head">
          <h2 className="open__title" id="chapter-open-title">
            {chapterOpening.purposeTitle}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="open__purpose">{chapterOpening.purpose}</p>
        </header>

        <div className="open__outcomes">
          <h3 className="open__outcomesTitle">{chapterOpening.outcomesTitle}</h3>
          <span className="gold-rule" aria-hidden="true" />

          <ol className="lpath">
            {chapterOpening.outcomes.map((o, i) => (
              <Fragment key={o}>
                <li
                  className={`lpath__step${i === 2 ? ' lpath__step--rowEnd' : ''}${
                    i === 3 ? ' lpath__step--rowStart' : ''
                  }${i === last ? ' lpath__step--last' : ''}`}
                >
                  {/* המספר, נקודת הזהב וקו ההמשך — סימון חזותי בלבד;
                      המספור הנגיש מגיע מה-ol עצמו */}
                  <span className="lpath__mark" aria-hidden="true">
                    <span className="lpath__dot" />
                    <span className="lpath__num">{pad(i + 1)}</span>
                    <span className="lpath__line" />
                  </span>
                  <p className="lpath__text">{o}</p>
                </li>

                {/* הפנייה מסוף השורה העליונה לתחילת התחתונה */}
                {i === 2 ? <li className="lpath__turn" aria-hidden="true" /> : null}
              </Fragment>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
