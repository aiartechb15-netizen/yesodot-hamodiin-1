import { strategic } from '../../data/chapter2'
import './chapter2.css'

const board = strategic.board

/* הטבעות שסביב העיגול המרכזי. שתיהן קווים דקים בלבד — בלי מילוי,
   בלי צל ובלי גרדיאנט — ושתיהן נפתחות בארבע נקודות, בדיוק בכיוונים
   שבהם יושבים ארבעת הנושאים.

   הפתחים נוצרים ב-stroke-dasharray: אורך הקשת ואחריו אורך הפתח,
   וההיסט מזיז את התבנית בחצי פתח, כך שהפתח מתמרכז על 0° (ומכאן גם
   על 90°, 180° ו-270°). המידות נגזרות מהיקף המעגל, ולכן הן נשארות
   מדויקות בכל גודל תצוגה. */
function Rings() {
  const ring = (r, gap) => {
    const c = 2 * Math.PI * r
    return { r, dash: `${c / 4 - gap} ${gap}`, offset: gap / 2 }
  }
  /* הפתחים רחבים דיים כדי שכיתוב הנושא ייכנס לתוכם: כ-19 מעלות בכל
     אחת מארבע הנקודות. אורך הפתח נגזר מרדיוס הטבעת, ולכן שתי הטבעות
     נפתחות באותה זווית בדיוק. */
  const inner = ring(122, 40)
  const outer = ring(152, 50)

  return (
    <svg className="sboard__rings" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <circle
        className="sboard__ring sboard__ring--inner"
        cx="200"
        cy="200"
        r={inner.r}
        strokeDasharray={inner.dash}
        strokeDashoffset={inner.offset}
      />
      <circle
        className="sboard__ring sboard__ring--outer"
        cx="200"
        cy="200"
        r={outer.r}
        strokeDasharray={outer.dash}
        strokeDashoffset={outer.offset}
      />
    </svg>
  )
}

/* תחנה 6 — מודיעין אסטרטגי.
   מקטע פתוח, בלי כרטיס, מסגרת, צל או רקע משלו: שתי עמודות על רקע
   העמוד — התרשים המעגלי מימין ומקרי הבוחן משמאל, מופרדים בקו זהב
   אנכי דק. במסך צר הכול נערם: כותרת, תרשים, ומקרי הבוחן. */
export default function StationStrategic() {
  return (
    <section className="section section--white" id={strategic.id} aria-labelledby="ch2-strategic-title">
      <div className="container">
        <div className="sboard">
          <header className="sboard__head">
            <p className="sboard__kicker">{board.kicker}</p>
            <h2 className="section-title sboard__title" id="ch2-strategic-title">
              {board.title}
            </h2>
            <span className="gold-rule" aria-hidden="true" />
          </header>

          {/* התרשים: העיגול המרכזי, שתי הטבעות וארבעת הנושאים סביבן */}
          <div className="sboard__diagram">
            <div className="sboard__circle">
              <Rings />
              <p className="sboard__center">{board.centerLabel}</p>
            </div>

            {board.nodes.map((n) => (
              <div className={`sboard__node sboard__node--${n.pos}`} key={n.id}>
                <h3 className="sboard__nodeTitle">{n.title}</h3>
                <p className="sboard__nodeSub">{n.sub}</p>
              </div>
            ))}
          </div>

          {/* מקרי הבוחן: שורות פתוחות, מופרדות בקו דק */}
          <div className="sboard__cases">
            <h3 className="sboard__casesTitle">{board.casesTitle}</h3>
            <p className="sboard__casesHint">{board.casesHint}</p>

            <ul className="sboard__list">
              {board.cases.map((c) => (
                <li className="sboard__case" key={c.id}>
                  <span className="sboard__caseLabel">{c.label}</span>
                  <p className="sboard__caseText">{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
