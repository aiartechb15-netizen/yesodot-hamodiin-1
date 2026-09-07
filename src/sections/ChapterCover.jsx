import { useEffect, useRef } from 'react'

import './ChapterCover.css'

/* אורך הגלילה. ארוך מברירת המחדל של הדפדפן בכוונה: מסך הפתיחה גבוה,
   וגלילה מהירה מדי נקראת כקפיצה במקום כמעבר. */
const SCROLL_MS = 900

/* ease-in-out — יציאה רכה מהמנוחה, האטה רכה ביעד */
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

/**
 * מסך הפתיחה של פרק: תצלום מלא מסך, ומעליו מספר הפרק, שמו, משפט
 * הפתיחה, סימון ההתקדמות וחץ גלילה — ותו לא. תוכן הפרק מתחיל במסך
 * שאחריו. הכותרות הן טקסט HTML חי ולא חלק מהתמונה, לשם קריאוּת,
 * נגישות וחיפוש.
 *
 * אותו רכיב משמש את שלושת הפרקים; מה שמשתנה הוא ה-props.
 * focus קובע את נקודת החיתוך של התצלום ביחסי מסך שונים, כי בכל
 * תצלום הנושא יושב במקום אחר.
 */
export default function ChapterCover({
  image,
  eyebrow,
  title,
  tagline,
  step,
  scrollLabel,
  nextId,
  titleId = 'chapter-cover-title',
  focus = {},
}) {
  const NEXT_ID = nextId
  const NEXT_ANCHOR = `#${nextId}`
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
      aria-labelledby={titleId}
      style={{
        '--cover-img': `url(${image})`,
        ...(focus.wide ? { '--cover-pos': focus.wide } : null),
        ...(focus.narrow ? { '--cover-pos-narrow': focus.narrow } : null),
        ...(focus.square ? { '--cover-pos-square': focus.square } : null),
        ...(focus.portrait ? { '--cover-pos-portrait': focus.portrait } : null),
      }}
    >
      <div className="cover__inner">
        <span className="cover__eyebrow">{eyebrow}</span>
        <h1 className="cover__title" id={titleId}>
          {title}
        </h1>
        {/* קו הזהב הוא סימן ולא מפריד תוכן, ולכן span ולא hr */}
        <span className="cover__rule" aria-hidden="true" />
        <p className="cover__tagline">{tagline}</p>
      </div>

      {/* סימון ההתקדמות בקורס. ה-dir יושב על הספרות בלבד ולא על ה-p:
          על ה-p הוא היה הופך גם את ה-inline-start של המיקום, והסימון
          היה קופץ לצד שמאל של המסך. לקורא המסך נמסר משפט מלא. */}
      <p className="cover__step">
        <span className="sr-only">{`פרק ${step.current} מתוך ${step.total}`}</span>
        <span className="cover__stepDigits" dir="ltr" aria-hidden="true">
          <span className="cover__stepCurrent">{step.current}</span>
          {` / ${step.total}`}
        </span>
      </p>

      <a
        className="cover__down"
        href={NEXT_ANCHOR}
        aria-label="גלילה לתוכן הפרק"
        onClick={scrollToNext}
      >
        <span className="cover__downCircle">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="m6 9.5 6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="cover__downLabel">{scrollLabel}</span>
      </a>
    </section>
  )
}
