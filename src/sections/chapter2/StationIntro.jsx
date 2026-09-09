import { chapter2Meta, intro } from '../../data/chapter2'
import earthImage from '../../assets/images/כדור לווין פרק 2.png'
import './chapter2.css'

/* מסך התוכן הראשון של הפרק, מיד אחרי מסך הפתיחה. שני טורים בלבד:
   מימין הטקסט — כותרת המסך, פסקת הפתיחה ומטרת הפרק — ומשמאל איור
   כדור הארץ והלוויין. שם הפרק והמשפט הקצר יושבים במסך הפתיחה שלפניו,
   ולכן אינם חוזרים כאן. הטקסטים עצמם לא השתנו.

   האיור דקורטיבי בלבד: כל מה שהוא מוסר כבר כתוב לצדו, ולכן הוא נמסר
   כ-aria-hidden ובלי alt — במקום להמציא לו תיאור שאינו מן הפרק. */
export default function StationIntro() {
  return (
    <section className="section section--cream ch2op" id={intro.id} aria-labelledby="ch2-intro-title">
      <div className="container ch2op__inner">
        <div className="ch2op__text">
          <h2 className="ch2op__title" id="ch2-intro-title">
            {intro.navLabel}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="ch2op__lead">{intro.text}</p>

          <h3 className="ch2op__goalLabel">{chapter2Meta.goalLabel}</h3>
          <p className="ch2op__goalText">{chapter2Meta.goal}</p>
        </div>

        <div className="ch2op__art" aria-hidden="true">
          <img className="ch2op__img" src={earthImage} alt="" />
        </div>
      </div>
    </section>
  )
}
