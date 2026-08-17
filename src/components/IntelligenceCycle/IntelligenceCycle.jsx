import { useId, useState } from 'react'
import Icon from '../Icons/Icons'
import { intelligenceCycle } from '../../data/chapter1'
import './IntelligenceCycle.css'

const R = 148
const C = 200
// שלב 1 למעלה, והמשך עם כיוון השעון: 1 למעלה, 2 בימין, 3 למטה, 4 בשמאל
const ANGLES = [90, 0, 270, 180]

const pos = (deg) => {
  const rad = (deg * Math.PI) / 180
  return { x: C + R * Math.cos(rad), y: C - R * Math.sin(rad) }
}

/* הראש של החץ מצייר לכיוון +x, ו-rotate ב-SVG מסובב עם כיוון השעון.
   הווקטור המשיק בכיוון השעון בנקודה deg הוא (sin, cos) בצירי המסך,
   ולכן זווית הסיבוב היא atan2(cos, sin). */
const arrowAt = (deg) => {
  const p = pos(deg)
  const rad = (deg * Math.PI) / 180
  const rot = (Math.atan2(Math.cos(rad), Math.sin(rad)) * 180) / Math.PI
  return { ...p, rot }
}

export default function IntelligenceCycle() {
  const uid = useId()
  const stages = intelligenceCycle.stages
  const [active, setActive] = useState(stages[0].id)
  const activeStage = stages.find((s) => s.id === active)

  return (
    <div className="cycle">
      <div className="cycle__diagram">
        <svg className="cycle__ring" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
          <circle cx={C} cy={C} r={R} fill="none" stroke="var(--border)" strokeWidth="2" />
          <circle cx={C} cy={C} r={R - 34} fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 7" />
          {[45, 135, 225, 315].map((deg) => {
            const a = arrowAt(deg)
            return (
              <g key={deg} transform={`translate(${a.x} ${a.y}) rotate(${a.rot})`}>
                <path
                  d="M-9 -6 L1 0 L-9 6"
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )
          })}
          <text x={C} y={C - 6} textAnchor="middle" className="cycle__ringTitle">
            מעגל
          </text>
          <text x={C} y={C + 22} textAnchor="middle" className="cycle__ringTitle">
            המודיעין
          </text>
        </svg>

        <ul className="cycle__nodes">
          {stages.map((s, i) => {
            const p = pos(ANGLES[i])
            return (
              <li
                key={s.id}
                className="cycle__node"
                style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 400) * 100}%` }}
              >
                <button
                  type="button"
                  className={`cycle__btn${s.id === active ? ' is-active' : ''}`}
                  aria-expanded={s.id === active}
                  aria-controls={`${uid}-panel`}
                  onClick={() => setActive(s.id)}
                >
                  <span className="cycle__num ltr-num">{s.number}</span>
                  <Icon name={s.icon} size={22} />
                  <span className="cycle__nodeTitle">{s.title}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="cycle__panel card card--pad" id={`${uid}-panel`} role="region" aria-live="polite">
        <span className="kicker">
          שלב <span className="ltr-num">{activeStage.number}</span> מתוך <span className="ltr-num">4</span>
        </span>
        <h3 className="card-title">{activeStage.title}</h3>
        <span className="gold-rule gold-rule--sm" aria-hidden="true" />
        <p>{activeStage.text}</p>
        <p className="cycle__outputs">
          <span className="term">{intelligenceCycle.outputsLabel}: </span>
          {activeStage.outputs}
        </p>
        <p className="cycle__loop">{intelligenceCycle.loopNote}</p>
      </div>
    </div>
  )
}
