import { useId, useState } from 'react'
import './LearningMap.css'

/**
 * "מודיעין כמערכת לומדת" כחוויית למידה: איור אחד, וחמש נקודות מידע
 * שיושבות עליו. בכניסה למסך לא מוצג הסבר; לחיצה על נקודה פותחת את
 * ההסבר שלה בלבד, ומעבר לנקודה אחרת מחליף אותו.
 *
 * אין כאן כרטיס, מסגרת, מלבן או צל: הנקודות יושבות ישירות על האיור,
 * וההסבר יושב על רקע העמוד ומופרד מהאיור בקו זהב דק בלבד.
 *
 * הנקודות ממוקמות באחוזים ביחס לאיור, ולכן הן נשארות על אותו פרט
 * בכל רוחב מסך. במסך צר הן יורדות, ובמקומן רשימת המושגים שמתחת
 * לאיור הופכת לדרך היחידה לפתוח הסבר.
 */
export default function LearningMap({ image, alt, points, groups, doneMessage }) {
  const uid = useId()
  const panelId = `${uid}-panel`

  const [active, setActive] = useState(null)
  const [seen, setSeen] = useState([])

  const select = (id) => {
    setActive(id)
    setSeen((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const current = points.find((p) => p.id === active) || null
  const allSeen = seen.length === points.length
  const byId = (id) => points.find((p) => p.id === id)

  return (
    <div className="lmap">
      <div className="lmap__stage">
        <img className="lmap__img" src={image} alt={alt} />

        {/* נקודות המידע — יושבות על האיור, לא בתוך מלבן */}
        {points.map((p) => {
          const isActive = p.id === active
          const isSeen = seen.includes(p.id)
          return (
            <button
              key={p.id}
              type="button"
              className={`lspot${isActive ? ' is-active' : ''}${isSeen ? ' is-seen' : ''}`}
              style={{ '--x': `${p.x}%`, '--y': `${p.y}%` }}
              aria-expanded={isActive}
              aria-controls={panelId}
              onClick={() => select(p.id)}
            >
              <span className="lspot__dot" aria-hidden="true" />
              <span className="lspot__label">{p.term}</span>
            </button>
          )
        })}
      </div>

      {/* מקרא המושגים. במסך צר הוא הופך לדרך הפעולה, ובמסך רחב הוא
          נשאר שורות ההקשר שכבר קיימות בפרק. */}
      <div className="lmap__legend">
        {groups.map((g, i) => (
          <div className="lmap__group" key={i}>
            {g.title ? <h4 className="lmap__groupTitle">{g.title}</h4> : null}
            <p className="lmap__groupLead">{g.lead}</p>
            <ul className="lmap__terms">
              {g.ids.map((id) => {
                const p = byId(id)
                if (!p) return null
                const isActive = p.id === active
                const isSeen = seen.includes(p.id)
                return (
                  <li key={id}>
                    <button
                      type="button"
                      className={`lterm${isActive ? ' is-active' : ''}${isSeen ? ' is-seen' : ''}`}
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => select(p.id)}
                    >
                      {p.term}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* ההסבר — אחד בכל רגע, על רקע העמוד, מופרד בקו זהב דק */}
      <div className="lmap__panel" id={panelId} role="region" aria-live="polite">
        <span className="lmap__panelRule" aria-hidden="true" />
        {current ? (
          /* key מאלץ הרכבה מחדש, כדי שההיעלמות וההופעה ירוצו בכל החלפה */
          <div className="lmap__panelInner" key={current.id}>
            <h4 className="lmap__panelTerm">{current.term}</h4>
            <p className="lmap__panelText">{current.text}</p>
          </div>
        ) : null}
      </div>

      {/* מד ההתקדמות — נקודה לכל מושג שנצפה */}
      <div className="lmap__progress" aria-live="polite">
        <span className="lmap__dots" aria-hidden="true">
          {points.map((p) => (
            <span key={p.id} className={`lmap__dot${seen.includes(p.id) ? ' is-filled' : ''}`} />
          ))}
        </span>
        <span className="sr-only">{`נצפו ${seen.length} מתוך ${points.length} מושגים`}</span>
        {allSeen ? <span className="lmap__done">{doneMessage}</span> : null}
      </div>
    </div>
  )
}
