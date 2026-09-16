import { chapter3Meta, opener } from '../../data/chapter3'
import './chapter3.css'

/* מסך התוכן הראשון של הפרק, מיד אחרי מסך הפתיחה: כיתוב העל, קו זהב
   ושתי פסקאות ההקדמה, מיושרים לימין. שם הפרק והשורה הקצרה יושבים
   במסך הפתיחה שלפניו, ולכן אינם חוזרים כאן.

   איור הגלובוס והמפות שהיה משמאל ירד, ואיתו גם עמודת הגריד ששמרה לו
   מקום — אחרת היה נשאר כאן חצי מסך ריק. איורי גיליון הרקע של הפרק
   אינם חלק מן המסך הזה וממשיכים כרגיל. */
export default function S1Opener() {
  return (
    <section
      className="section section--cream ch3op"
      id={opener.id}
      aria-label={chapter3Meta.introLabel}
    >
      <div className="container ch3op__inner">
        <div className="ch3op__text">
          {/* כותרת העמוד של המסך — אותו סגנון של כותרות העמוד בשאר הפרק
              (.section-title + קו הזהב שמתחתיה) */}
          <h2 className="section-title ch3op__title">
            {opener.title}
          </h2>
          <span className="gold-rule ch3op__titleRule" aria-hidden="true" />

          <p className="ch3op__overline">
            {chapter3Meta.introOverline}
            <span className="ch3op__overlineRule" aria-hidden="true" />
          </p>

          {chapter3Meta.intro.map((paragraph, i) => (
            <p className="ch3op__para" key={i}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
