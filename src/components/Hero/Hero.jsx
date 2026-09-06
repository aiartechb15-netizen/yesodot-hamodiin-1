import { useEffect, useRef } from 'react'
import { hero } from '../../data/chapter1'
import openerImage from '../../assets/images/Frame 1 (2).png'
import './Hero.css'

/** החץ מוביל לאזור הפרקים שמתחת למסך הפתיחה. הוא נשאר עוגן אמיתי,
    כדי שיעבוד גם בלי JS, בפתיחה בלשונית חדשה, וכשהמשתמש ביקש
    להפחית תנועה. */
const TOPICS_ANCHOR = '#topics'
const TOPICS_ID = 'topics'

/* אורך הגלילה. ארוך מברירת המחדל של הדפדפן בכוונה: המסך הראשון גבוה,
   וגלילה מהירה מדי נקראת כקפיצה במקום כמעבר. */
const SCROLL_MS = 900

/* ease-in-out — יציאה רכה מהמנוחה, האטה רכה ביעד */
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

/* מסך הפתיחה הוא תצלום העיצוב עצמו: הכותרת והטקסט מודפסים בתוכו.
   ההמשך אל הפרקים נעשה בחץ שבתחתית המסך — רמז ולא קריאה לפעולה. */
export default function Hero() {
  const frame = useRef(0)

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const startCourse = (event) => {
    const target = document.getElementById(TOPICS_ID)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // בלי יעד או כשהתנועה מופחתת — נותנים לעוגן לעשות את עבודתו, מיידית
    if (!target || reducedMotion) return

    event.preventDefault()

    // אותו קיזוז שהדפדפן נותן לעוגנים: scroll-padding של העמוד ועוד
    // ה-scroll-margin של היעד. בלי החיבור הזה הגלילה נעצרת 16px מוקדם
    // מדי, ורצועה מתחתית מסך הפתיחה נשארת גלויה מתחת ל-Header
    const styles = getComputedStyle(document.documentElement)
    const offset =
      (parseFloat(styles.scrollPaddingTop) || 0) +
      (parseFloat(getComputedStyle(target).scrollMarginTop) || 0)
    const start = window.scrollY
    const end = Math.min(
      target.getBoundingClientRect().top + start - offset,
      document.documentElement.scrollHeight - window.innerHeight,
    )

    cancelAnimationFrame(frame.current)
    let t0 = null

    const step = (now) => {
      if (t0 === null) t0 = now
      const progress = Math.min((now - t0) / SCROLL_MS, 1)
      // 'instant' ולא ברירת המחדל: בלעדיו כל פריים היה נכנס לגלילה
      // חלקה משלו בגלל scroll-behavior: smooth הגלובלי, והשתיים היו
      // נאבקות זו בזו
      window.scrollTo({ top: start + (end - start) * ease(progress), behavior: 'instant' })
      if (progress < 1) {
        frame.current = requestAnimationFrame(step)
      } else {
        window.history.replaceState(null, '', TOPICS_ANCHOR)
      }
    }

    frame.current = requestAnimationFrame(step)
  }

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      {/* הכותרת מודפסת בתצלום; כאן היא קיימת לקוראי מסך ולמבנה המסמך בלבד */}
      <h1 className="sr-only" id="hero-title">
        {hero.title}
      </h1>

      <div className="hero__frame">
        <img className="hero__img" src={openerImage} alt="" />
      </div>

      {/* רמז להמשך: חץ בתחתית המסך, מחוץ למסגרת התמונה כדי שיישאר
          במרכז המסך ובמרחק קבוע מתחתיתו בכל רזולוציה */}
      <a className="hero__down" href={TOPICS_ANCHOR} aria-label={hero.cta} onClick={startCourse}>
        <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="m6 9.5 6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  )
}
