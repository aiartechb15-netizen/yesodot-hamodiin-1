import { hero } from '../../data/chapter1'
import eyeImage from '../../assets/images/תמונת מסך עין.png'
import './Hero.css'

/** הכפתור אינו מנווט לפרק אלא גולל לאזור הפרקים שמתחת ל-Hero.
    עוגן ולא onClick, כדי שהגלילה תשתמש ב-scroll-behavior הגלובלי
    ותכבד אוטומטית prefers-reduced-motion. */
const TOPICS_ANCHOR = '#topics'

/* מסך פתיחה: תצלום בצד שמאל, ובצד ימין רק שם הקורס, קו זהב וכפתור. */
export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero__panel">
        <h1 className="hero__title" id="hero-title">
          {hero.title}
        </h1>
        <span className="gold-rule gold-rule--center hero__rule" aria-hidden="true" />
        <a className="btn hero__cta" href={TOPICS_ANCHOR}>
          {hero.cta}
        </a>
      </div>

      <div className="hero__art" aria-hidden="true">
        <img className="hero__img" src={eyeImage} alt="" />
      </div>
    </section>
  )
}
