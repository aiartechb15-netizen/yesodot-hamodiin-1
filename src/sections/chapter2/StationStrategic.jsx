import { useId, useState } from 'react'
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
/* קשת ההדגשה יושבת בין שתי הטבעות, ואורכה במעלות */
const HIGHLIGHT_R = 137
const HIGHLIGHT_ARC = 34

function Rings({ angle }) {
  const ring = (r, gap) => {
    const c = 2 * Math.PI * r
    /* מסלול העיגול ב-SVG מתחיל בשעה 3 ומתקדם עם כיוון השעון, וכל
       מחזור בתבנית הוא רבע היקף. ההיסט שמציב את הפתח במרכז הרבע הוא
       אורך הקו ועוד חצי פתח — ובלעדיו הפתחים נופלים כ-19 מעלות לפני
       ארבעת הכיוונים שבהם יושבים הנושאים. */
    return { r, dash: `${c / 4 - gap} ${gap}`, offset: c / 4 - gap / 2 }
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

      {/* הדגשת הנושא הפעיל: קשת קצרה בטורקיז שסוגרת את הפתח שבו הוא
          יושב. pathLength=360 מאפשר לחשוב במעלות — קשת של 34 מעלות
          שממורכזת על זווית הנושא. היא נעה בין הנושאים ברצף. */}
      <circle
        className="sboard__ring sboard__ring--active"
        cx="200"
        cy="200"
        r={HIGHLIGHT_R}
        pathLength="360"
        strokeDasharray={`${HIGHLIGHT_ARC} ${360 - HIGHLIGHT_ARC}`}
        strokeDashoffset={HIGHLIGHT_ARC / 2 - angle}
      />
    </svg>
  )
}

/* תחנה 6 — מודיעין אסטרטגי.
   מקטע פתוח, בלי כרטיס, מסגרת, צל או רקע משלו: שתי עמודות על רקע
   העמוד — התרשים המעגלי מימין ומקרי הבוחן משמאל, מופרדים בקו זהב
   אנכי דק. במסך צר הכול נערם: כותרת, תרשים, ומקרי הבוחן. */
export default function StationStrategic() {
  const uid = useId()
  const [open, setOpen] = useState(board.nodes[0].id)
  const active = board.nodes.find((n) => n.id === open) || board.nodes[0]

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
            <p className="sboard__intro">{board.intro}</p>
          </header>

          {/* התרשים: העיגול המרכזי, שתי הטבעות וארבעת הנושאים סביבן.
              הנושאים הם הבורר עצמו — לחיצה על נושא מחליפה את הפאנל
              שבעמודה השמאלית, וקשת ההדגשה נעה אליו. */}
          <div className="sboard__diagram" role="tablist" aria-label={board.title}>
            <div className="sboard__circle">
              <Rings angle={active.angle} />
              <p className="sboard__center">{board.centerLabel}</p>
            </div>

            {board.nodes.map((n) => {
              const isOpen = n.id === open
              return (
                <button
                  type="button"
                  role="tab"
                  id={`${uid}-${n.id}-tab`}
                  aria-selected={isOpen}
                  aria-controls={`${uid}-panel`}
                  className={`sboard__node sboard__node--${n.pos}${isOpen ? ' is-on' : ''}`}
                  key={n.id}
                  onClick={() => setOpen(n.id)}
                >
                  <span className="sboard__nodeTitle">{n.title}</span>
                  <span className="sboard__nodeSub">{n.sub}</span>
                </button>
              )
            })}
          </div>

          <div className="sboard__side">
            {/* שכבת הידע — פתוחה, בלי כרטיס ובלי מסגרת. בכל רגע מוצג
                הנושא שנבחר בלבד. */}
            <div
              className="sboard__panel"
              id={`${uid}-panel`}
              role="tabpanel"
              aria-labelledby={`${uid}-${active.id}-tab`}
              /* key מאלץ רינדור חדש בכל החלפה, וכך ההופעה העדינה
                 מתנגנת מחדש */
              key={active.id}
            >
              <h3 className="sboard__panelTitle">
                {active.title}
                <span className="sboard__panelSub"> — {active.sub}</span>
              </h3>
              <p className="sboard__panelLead">{active.lead}</p>

              <ul className="sboard__points">
                {active.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>

              <p className="sboard__panelQ">
                <span className="sboard__panelQLabel">{board.questionLabel}: </span>
                {active.question}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
