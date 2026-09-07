import { useEffect, useRef } from 'react'

import { chapterOpening } from '../data/chapter1'
import coverImage from '../assets/images/תמונה מסך פתיחה מהו מודיעין.png'
import './ChapterCover.css'

/* היעד של החץ הוא הסקשן הראשון של תוכן הפרק. עוגן אמיתי ולא כפתור,
   כדי שהגלילה תעבוד גם בלי JS ובפתיחה בלשונית חדשה. */
const NEXT_ANCHOR = '#chapter-open'
const NEXT_ID = 'chapter-open'

/* אורך הגלילה. ארוך מברירת המחדל של הדפדפן בכוונה: מסך הפתיחה גבוה,
   וגלילה מהירה מדי נקראת כקפיצה במקום כמעבר. */
const SCROLL_MS = 900

/* ease-in-out — יציאה רכה מהמנוחה, האטה רכה ביעד */
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

/* מסך הפתיחה של הפרק: תצלום מלא מסך, הכותרת בלבד מעליו, וחץ בתחתית.
   הכותרת היא טקסט HTML חי ולא חלק מהתמונה — לשם קריאוּת, נגישות
   וחיפוש. */
export default function ChapterCover() {
  const frame = useRef(0)

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const scrollToNext = (event) => {
    const target = document.getElementById(NEXT_ID)
    if (!target) return

    event.preventDefault()

    /* הקיזוז הוא ה-scroll-padding של העמוד בלבד — Header ועוד 16px.
       הדפדפן היה מוסיף לו גם את ה-scroll-margin של הסקשן, שהוא אותו
       ערך עצמו, ועוצר כ-100px מוקדם מדי; אז רצועה מתחתית התצלום
       נשארת גלויה מתחת ל-Header. */
    const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
    const start = window.scrollY
    const end = Math.min(
      target.getBoundingClientRect().top + start - offset,
      document.documentElement.scrollHeight - window.innerHeight,
    )

    const settle = () => window.history.replaceState(null, '', NEXT_ANCHOR)

    // תנועה מופחתת — מגיעים לאותו מקום, בלי ההנפשה
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: end, behavior: 'instant' })
      settle()
      return
    }

    cancelAnimationFrame(frame.current)
    let t0 = null

    const step = (now) => {
      if (t0 === null) t0 = now
      const progress = Math.min((now - t0) / SCROLL_MS, 1)
      /* 'instant' ולא ברירת המחדל: בלעדיו כל פריים היה נכנס לגלילה
         חלקה משלו בגלל scroll-behavior: smooth הגלובלי, והשתיים היו
         נאבקות זו בזו */
      window.scrollTo({ top: start + (end - start) * ease(progress), behavior: 'instant' })
      if (progress < 1) frame.current = requestAnimationFrame(step)
      else settle()
    }

    frame.current = requestAnimationFrame(step)
  }

  return (
    <section
      className="cover"
      id="chapter-cover"
      aria-labelledby="chapter-cover-title"
      style={{ '--cover-img': `url(${coverImage})` }}
    >
      <div className="cover__inner">
        <h1 className="cover__title" id="chapter-cover-title">
          {chapterOpening.title}
        </h1>
      </div>

      <a
        className="cover__down"
        href={NEXT_ANCHOR}
        aria-label="גלילה לתוכן הפרק"
        onClick={scrollToNext}
      >
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
