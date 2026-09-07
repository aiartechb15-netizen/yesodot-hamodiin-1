import { chapterOpening } from '../data/chapter1'
import coverImage from '../assets/images/תמונה מסך פתיחה מהו מודיעין.png'
import './ChapterCover.css'

/* היעד של החץ הוא הסקשן הראשון של תוכן הפרק. עוגן אמיתי, ולא כפתור
   עם JS: כך הגלילה עובדת גם בלי סקריפט, והדפדפן מכבד את
   scroll-padding-top ואת prefers-reduced-motion בעצמו. */
const NEXT_ANCHOR = '#chapter-open'

/* מסך הפתיחה של הפרק: תצלום מלא מסך, הכותרת בלבד מעליו, וחץ בתחתית.
   הכותרת היא טקסט HTML חי ולא חלק מהתמונה — לשם קריאוּת, נגישות
   וחיפוש. */
export default function ChapterCover() {
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

      <a className="cover__down" href={NEXT_ANCHOR} aria-label="גלילה לתוכן הפרק">
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
