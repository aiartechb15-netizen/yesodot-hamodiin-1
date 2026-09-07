import ChapterNav from '../ChapterNav/ChapterNav'
import './ChapterLayout.css'

/**
 * שלד עמוד הפרק — תפריט הצד ואזור התוכן.
 * מסך הפתיחה של הפרק נשאר מחוץ לשלד, ברוחב מלא; התפריט מתחיל
 * יחד עם תוכן הפרק.
 *
 * sections: [{ id, label }] — מבנה הפרק לפי סדר המקטעים בעמוד.
 */
export default function ChapterLayout({ sections, title, label, children }) {
  return (
    <div className="chLayout">
      <ChapterNav sections={sections} title={title} label={label} />
      <div className="chLayout__main">{children}</div>
    </div>
  )
}
