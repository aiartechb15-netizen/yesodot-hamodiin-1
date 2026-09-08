import { chapter2Meta, intro } from '../../data/chapter2'
import './chapter2.css'

/* שמות התחנות נגזרים משורת "מבנה הפרק" שבנתונים — אותו טקסט בדיוק,
   רק שהחצים משמשים כמפריד ולא כתו שנקרא על המסך. */
const stops = chapter2Meta.structure
  .split('←')
  .map((name) => name.trim())
  .filter(Boolean)

/** מספר תחנה דו-ספרתי, כדי ש-"1" ייקרא "01" גם על הציר. */
const pad = (n) => String(n).padStart(2, '0')

/* מסך התוכן הראשון של הפרק, מיד אחרי מסך הפתיחה: כותרת המסך, פסקת
   הפתיחה, מטרת הפרק ומבנהו. שם הפרק והמשפט הקצר יושבים במסך הפתיחה
   שלפניו, ולכן אינם חוזרים כאן. הטקסטים והסדר שלהם כמו שהיו — מה
   שהשתנה הוא הפריסה בלבד. */
export default function StationIntro() {
  return (
    <section className="section section--cream ch2op" id={intro.id} aria-labelledby="ch2-intro-title">
      <div className="container ch2op__inner">
        <header className="ch2op__head">
          <h2 className="ch2op__title" id="ch2-intro-title">
            {intro.navLabel}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="ch2op__lead">{intro.text}</p>
        </header>

        {/* מטרת הפרק מימין; משמאל מספר התחנה כמשקולת חזותית בלבד */}
        <div className="ch2op__mid">
          <div className="ch2op__goal">
            <h3 className="ch2op__goalLabel">{chapter2Meta.goalLabel}</h3>
            <p className="ch2op__goalText">{chapter2Meta.goal}</p>
          </div>

          <span className="ch2op__num" aria-hidden="true">
            {pad(intro.station)}
          </span>
        </div>

        {/* מבנה הפרק כציר תחנות ממוספר, מימין לשמאל */}
        <div className="ch2op__structure">
          <h3 className="ch2op__structureLabel">{chapter2Meta.structureLabel}</h3>
          <ol className="ch2op__track">
            {stops.map((name, i) => (
              <li className="ch2op__stop" key={name}>
                <span className="ch2op__dot">{pad(i + 1)}</span>
                <span className="ch2op__stopName">{name}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
