import { lohamam as lm } from '../../data/chapter3'
import './chapter3.css'

/* כרטיסיית התהליך שהייתה בראש המסך — שלושת השלבים, העיגולים,
   האייקונים והחצים שביניהם — ירדה. מה שנשאר פותח ישירות ב"כיצד זה
   עובד?", ומתחתיו הערת "שימו לב" — הערה פתוחה ולא כרטיס לצדו, ולכן
   הטקסט נפרש על מלוא רוחב אזור התוכן. */
export default function S7Lohamam() {
  return (
    <section className="section section--white" id={lm.id} aria-labelledby="ch3-lm-title">
      <div className="container">
        <header className="s3head">
          <h2 className="section-title" id="ch3-lm-title">
            {lm.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead" style={{ maxWidth: '860px' }}>
            {lm.definition}
          </p>
        </header>

        <div className="s3blocks">
          <article className="lm__how">
            <h3 className="openBlock__title">כיצד זה עובד?</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p>{lm.body}</p>

            <aside className="lm__note">
              <span className="lm__noteLabel">{lm.routineCallout.label}</span>
              <p className="lm__noteText">{lm.routineCallout.text}</p>
            </aside>
          </article>

          {/* ההישג המרכזי — מקטע פתוח על רקע העמוד: בלי כרטיס, מסגרת,
              רקע או צל. ההפרדה ממה שמעליו היא קו אופקי דק ומרווח. */}
          <section className="lm__achieve">
            <h3 className="lm__achieveTitle">{lm.achievementTitle}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="lm__achieveText">{lm.achievement}</p>
          </section>
        </div>
      </div>
    </section>
  )
}
