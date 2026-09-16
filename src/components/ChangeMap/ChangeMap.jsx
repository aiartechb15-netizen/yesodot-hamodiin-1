import { useState } from 'react'
import './ChangeMap.css'

/**
 * מפת השינוי — אינפוגרפיקה מעגלית אחת ואזור הסבר אחד שמתחלף.
 *
 * חמשת הגורמים יושבים על טבעת סביב עיגול מרכזי. הסדר מתחיל למעלה
 * ומתקדם עם כיוון השעון: 1 למעלה, 2 בימין למעלה, 3 בימין למטה,
 * 4 בשמאל למטה, 5 בשמאל למעלה. הזווית של כל גורם מחושבת כאן ולא
 * נכתבת ביד, כדי שהוספה או הסרה של גורם תחלק את הטבעת מחדש מאליה.
 *
 * כל חמשת ההסברים נשארים ב-DOM ויושבים זה על זה באותו תא גריד.
 * גובה האזור נקבע לפי ההסבר הארוך שבהם, ולכן אין קפיצה בגובה
 * כשעוברים בין גורמים — בלי לנחש מספר קבוע. ההסברים שאינם פעילים
 * מקבלים visibility: hidden, שמוציא אותם גם מעץ הנגישות, ולכן
 * ה-aria-live מקריא רק את ההסבר שנחשף.
 */
/* רדיוס המסלול שעליו יושבים הגורמים, באחוזים מרוחב המפה: 252 מתוך
   600. הריבוע של 600 הוא שטח המפה כולה — הטבעות (350 ו-270) והגורמים
   שסביבן; הטבעת החיצונית עצמה נשארת 350, והגורמים יושבים מחוצה לה,
   במרחק שמשאיר לכל כיתוב לפחות 16 פיקסלים ממנה. */
const RADIUS_PCT = (252 / 600) * 100

export default function ChangeMap({ factors, hub }) {
  const [activeId, setActiveId] = useState(factors[0]?.id)

  return (
    <div className="cmap">
      {/* ---------- העמודה הימנית: המפה ---------- */}
      <div className="cmap__dial">
        <div className="cmap__ring cmap__ring--inner" aria-hidden="true" />
        <div className="cmap__ring cmap__ring--outer" aria-hidden="true" />

        <div className="cmap__hub" aria-hidden="true">
          {hub.map((line) => (
            <span className="cmap__hubLine" key={line}>
              {line}
            </span>
          ))}
        </div>

        {factors.map((f, i) => {
          const on = f.id === activeId
          /* מעלה (90-) היא נקודת ההתחלה, ומשם עם כיוון השעון:
             90-, 18-, 54, 126 ו-198 מעלות */
          const angle = ((-90 + (360 / factors.length) * i) * Math.PI) / 180
          /* המיקום נמסר כאחוזים מן הריבוע של המפה ולא כאורך קבוע, כדי
             שהוא ייצמד לטבעת גם כשהמפה מתכווצת. RADIUS_PCT הוא
             125/380 באחוזים. המרחק נמדד מן הקצה הימני, כמו שאר
             הפריטים במפה ב-RTL. */
          const x = 50 - RADIUS_PCT * Math.cos(angle)
          const y = 50 + RADIUS_PCT * Math.sin(angle)
          return (
            <button
              className={`cmap__node${on ? ' is-on' : ''}`}
              type="button"
              key={f.id}
              style={{ '--x': `${x.toFixed(3)}%`, '--y': `${y.toFixed(3)}%` }}
              aria-pressed={on}
              onClick={() => setActiveId(f.id)}
            >
              <span className="cmap__nodeNum ltr-num" aria-hidden="true">
                {i + 1}
              </span>
              <span className="cmap__nodeName">{f.short}</span>
            </button>
          )
        })}
      </div>

      {/* ---------- העמודה השמאלית: ההסבר המתחלף ---------- */}
      <div className="cmap__details" aria-live="polite">
        {factors.map((f, i) => (
          <article
            className={`cmap__detail${f.id === activeId ? ' is-on' : ''}`}
            key={f.id}
          >
            <span className="cmap__detailNum ltr-num" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="cmap__detailTitle">{f.title}</h3>
            <p className="cmap__detailText">{f.detail}</p>
            <p className="cmap__detailQ">{f.question}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
