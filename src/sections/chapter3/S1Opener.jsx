import { chapter3Meta, opener } from '../../data/chapter3'
import worldImage from '../../assets/images/פרק 3 עולם.png'
import './chapter3.css'

/* מסך התוכן הראשון של הפרק, מיד אחרי מסך הפתיחה. שני טורים בלבד:
   מימין הטקסט — כיתוב העל, קו זהב ושתי פסקאות ההקדמה — ומשמאל איור
   הגלובוס והמפות. שם הפרק והשורה הקצרה יושבים במסך הפתיחה שלפניו,
   ולכן אינם חוזרים כאן. הטקסטים עצמם לא השתנו.

   האיור דקורטיבי בלבד: כל מה שהוא מוסר כבר כתוב לצדו, ולכן הוא נמסר
   כ-aria-hidden ובלי alt — במקום להמציא לו תיאור שאינו מן הפרק. */
export default function S1Opener() {
  return (
    <section
      className="section section--cream ch3op"
      id={opener.id}
      aria-label={chapter3Meta.introLabel}
    >
      <div className="container ch3op__inner">
        <div className="ch3op__text">
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

        <div className="ch3op__art" aria-hidden="true">
          <img className="ch3op__img" src={worldImage} alt="" />
        </div>
      </div>
    </section>
  )
}
