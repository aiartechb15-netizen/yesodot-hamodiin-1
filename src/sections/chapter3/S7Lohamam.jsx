import { lohamam as lm } from '../../data/chapter3'
import './chapter3.css'

/* כרטיסיית התהליך שהייתה בראש המסך — שלושת השלבים, העיגולים,
   האייקונים והחצים שביניהם — ירדה. מה שנשאר פותח ישירות ב"כיצד זה
   עובד?" ובתיבת "שימו לב" שלצידה. */
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
          <div className="grid-2">
            <article>
              <h3 className="openBlock__title">כיצד זה עובד?</h3>
              <span className="gold-rule gold-rule--sm" aria-hidden="true" />
              <p>{lm.body}</p>
            </article>

            <aside className="callout callout--teal">
              <span className="callout__label">{lm.routineCallout.label}</span>
              <p>{lm.routineCallout.text}</p>
            </aside>
          </div>

          <aside className="callout">
            <span className="callout__label">{lm.achievementTitle}</span>
            <p>{lm.achievement}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
