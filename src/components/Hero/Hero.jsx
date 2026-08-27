import { useEffect, useRef, useState } from 'react'
import { hero } from '../../data/chapter1'
import openerImage from '../../assets/images/Frame 1 (2).png'
import './Hero.css'

/** הכפתור מוביל לאזור הפרקים שמתחת למסך הפתיחה. הוא נשאר עוגן אמיתי,
    כדי שיעבוד גם בלי JS, בפתיחה בלשונית חדשה, וכשהמשתמש ביקש
    להפחית תנועה. */
const TOPICS_ANCHOR = '#topics'
const TOPICS_ID = 'topics'

/* אורכי המעבר; חייבים להתאים לערכים ב-Hero.css */
const EXIT_MS = 420
const ENTER_MS = 520

/* מסך הפתיחה הוא תצלום העיצוב עצמו: הכותרת, הטקסט והכפתור מודפסים
   בתוכו. הכפתור שבתצלום מקבל שכבת קישור שקופה מעליו, שיושבת באחוזים
   מתוך המסגרת ולכן נשארת מדויקת בכל רזולוציה. */
export default function Hero() {
  // idle → exit (מסך הפתיחה דוהה ועולה) → enter (הכרטיסים נכנסים) → idle
  const [phase, setPhase] = useState('idle')
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const startCourse = (event) => {
    const target = document.getElementById(TOPICS_ID)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // בלי יעד או כשהתנועה מופחתת — נותנים לעוגן לעשות את עבודתו, מיידית
    if (!target || reducedMotion) return

    event.preventDefault()
    setPhase('exit')

    // הגלילה מתבצעת כשמסך הפתיחה כבר שקוף, ולכן אינה נראית כגלילה
    timers.current.push(
      setTimeout(() => {
        // 'instant' ולא 'auto': auto מציית ל-scroll-behavior: smooth הגלובלי,
        // וזה היה הופך את הקפיצה לגלילה נראית לעין
        target.scrollIntoView({ behavior: 'instant', block: 'start' })
        window.history.replaceState(null, '', TOPICS_ANCHOR)
        setPhase('enter')
      }, EXIT_MS),
    )

    timers.current.push(setTimeout(() => setPhase('idle'), EXIT_MS + ENTER_MS))
  }

  const phaseClass = phase === 'exit' ? ' hero--exit' : phase === 'enter' ? ' hero--handoff' : ''

  return (
    <section className={`hero${phaseClass}`} id="hero" aria-labelledby="hero-title">
      {/* הכותרת מודפסת בתצלום; כאן היא קיימת לקוראי מסך ולמבנה המסמך בלבד */}
      <h1 className="sr-only" id="hero-title">
        {hero.title}
      </h1>

      <div className="hero__frame">
        <img className="hero__img" src={openerImage} alt="" />
        <a className="hero__cta" href={TOPICS_ANCHOR} aria-label={hero.cta} onClick={startCourse} />
      </div>
    </section>
  )
}
