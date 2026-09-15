import { useEffect, useRef, useState } from 'react'
import ChapterNav from '../ChapterNav/ChapterNav'
import './ChapterLayout.css'

/**
 * שלד עמוד הפרק — תפריט הצד ואזור התוכן.
 * מסך הפתיחה של הפרק נשאר מחוץ לשלד, ברוחב מלא; התפריט מתחיל
 * יחד עם תוכן הפרק.
 *
 * sections: [{ id, label }] — מבנה הפרק לפי סדר המקטעים בעמוד.
 *
 * מצב הכיווץ יושב כאן ולא בתפריט עצמו, מפני שרוחב העמודה הוא של
 * השלד: כשהתפריט מתכווץ אזור התוכן מתרחב אליו מאליו.
 */
/* משך המעבר של רוחב העמודה (ChapterLayout.css) ועוד מרווח קטן */
const ANCHOR_MS = 340

export default function ChapterLayout({ sections, title, label, children }) {
  const [collapsed, setCollapsed] = useState(false)
  const mainRef = useRef(null)
  const frame = useRef(0)

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  /* כשהעמודה מתרחבת או מצטמצמת הטקסט נשבר מחדש והמקטעים משנים גובה,
     ולכן אותו מיקום גלילה היה מציג פתאום תוכן אחר. כאן נבחר המקטע
     שבראש החלון, ולאורך כל המעבר הגלילה מתוקנת כך שהוא נשאר באותו
     גובה בדיוק — הקורא ממשיך מאותה שורה. */
  const toggleCollapsed = () => {
    const main = mainRef.current
    const line = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
    const anchor = main
      ? [...main.querySelectorAll('section[id]')].find((el) => el.getBoundingClientRect().bottom > line)
      : null
    const offset = anchor ? anchor.getBoundingClientRect().top : 0

    setCollapsed((v) => !v)
    if (!anchor) return

    cancelAnimationFrame(frame.current)
    const start = performance.now()
    const hold = (now) => {
      const drift = anchor.getBoundingClientRect().top - offset
      /* 'instant' ולא ברירת המחדל: בלעדיו הגלילה החלקה הגלובלית
         הייתה נאבקת בתיקון בכל פריים */
      if (Math.abs(drift) >= 1) window.scrollBy({ top: drift, behavior: 'instant' })
      if (now - start < ANCHOR_MS) frame.current = requestAnimationFrame(hold)
    }
    frame.current = requestAnimationFrame(hold)
  }

  return (
    <div className={`chLayout${collapsed ? ' is-collapsed' : ''}`}>
      <ChapterNav
        sections={sections}
        title={title}
        label={label}
        collapsed={collapsed}
        onToggleCollapsed={toggleCollapsed}
      />
      <div className="chLayout__main" ref={mainRef}>
        {children}
      </div>
    </div>
  )
}
