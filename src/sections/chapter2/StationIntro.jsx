import { chapter2Meta, intro } from '../../data/chapter2'
import './chapter2.css'

/* מסך התוכן הראשון של הפרק, מיד אחרי מסך הפתיחה: פסקת הפתיחה, מטרת
   הפרק ומבנהו. מסך הפתיחה עצמו נושא רק את שם הפרק ואת המשפט הקצר,
   ולכן כל הפירוט יושב כאן. הטקסטים והסדר שלהם כמו שהיו. */
export default function StationIntro() {
  return (
    <section className="section section--cream chIntro" id={intro.id} aria-labelledby="ch2-intro-title">
      <div className="container">
        <p className="chIntro__lead">{intro.text}</p>

        <div className="chIntro__block">
          <h2 className="openBlock__title" id="ch2-intro-title">
            {chapter2Meta.goalLabel}
          </h2>
          <span className="gold-rule gold-rule--sm" aria-hidden="true" />
          <p>{chapter2Meta.goal}</p>
        </div>

        <div className="chIntro__block">
          <h2 className="openBlock__title">{chapter2Meta.structureLabel}</h2>
          <span className="gold-rule gold-rule--sm" aria-hidden="true" />
          <p className="chIntro__structure">{chapter2Meta.structure}</p>
        </div>
      </div>
    </section>
  )
}
