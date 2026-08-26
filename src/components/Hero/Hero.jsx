import { hero } from '../../data/chapter1'
import openerImage from '../../assets/images/Frame 1 (2).png'
import './Hero.css'

/** הכפתור אינו מנווט לפרק אלא גולל לאזור הפרקים שמתחת למסך הפתיחה.
    עוגן ולא onClick, כדי שהגלילה תשתמש ב-scroll-behavior הגלובלי
    ותכבד אוטומטית prefers-reduced-motion. */
const TOPICS_ANCHOR = '#topics'

/* מסך הפתיחה הוא תצלום העיצוב עצמו: הכותרת, הטקסט והכפתור מודפסים
   בתוכו. הכפתור שבתצלום מקבל שכבת קישור שקופה מעליו, שיושבת באחוזים
   מתוך המסגרת ולכן נשארת מדויקת בכל רזולוציה. */
export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      {/* הכותרת מודפסת בתצלום; כאן היא קיימת לקוראי מסך ולמבנה המסמך בלבד */}
      <h1 className="sr-only" id="hero-title">
        {hero.title}
      </h1>

      <div className="hero__frame">
        <img className="hero__img" src={openerImage} alt="" />
        <a className="hero__cta" href={TOPICS_ANCHOR} aria-label={hero.cta} />
      </div>
    </section>
  )
}
