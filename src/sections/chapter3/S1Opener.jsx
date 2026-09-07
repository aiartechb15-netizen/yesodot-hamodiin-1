import BackgroundDecor from '../../components/BackgroundDecor/BackgroundDecor'
import { chapter3Meta, opener, operational } from '../../data/chapter3'
import './chapter3.css'

/* מסך התוכן הראשון של הפרק, מיד אחרי מסך הפתיחה: שתי פסקאות ההקדמה
   והמעבר לתחנה הראשונה. שם הפרק והשורה הקצרה יושבים במסך הפתיחה,
   ולכן אינם חוזרים כאן. הטקסטים והסדר שלהם כמו שהיו.
   ה-aria-label נותן למקטע שם נגיש בלי להוסיף כיתוב על המסך. */
export default function S1Opener() {
  return (
    <section className="section section--cream chIntro" id={opener.id} aria-label={chapter3Meta.introLabel}>
      <BackgroundDecor variant="satellite" />
      <div className="container">
        <div className="chIntro__lead">
          {chapter3Meta.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="chIntro__actions">
          <a className="btn" href={`#${operational.id}`}>
            {chapter3Meta.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
