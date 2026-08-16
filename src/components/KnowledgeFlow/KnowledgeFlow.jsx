import { useId, useState } from 'react'
import Icon from '../Icons/Icons'
import { knowledgeFlow } from '../../data/chapter1'
import './KnowledgeFlow.css'

function Arrow() {
  // חץ המצביע לכיוון הקריאה בעברית (ימין → שמאל)
  return (
    <span className="kflow__arrow" aria-hidden="true">
      <svg viewBox="0 0 40 12" width="40" height="12" focusable="false">
        <path
          d="M38 6H4M10 1.5 4 6l6 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

/** מידע ← ידע ← הבנה: שורה אחת ממורכזת, החצים יושבים בין העיגולים. */
export function KnowledgeFlowMini({ steps = knowledgeFlow.steps }) {
  return (
    <ol className="kmini" aria-label="ממידע לידע ולהבנה">
      {steps.map((s, i) => (
        <li className="kmini__item" key={s.id}>
          <span className="kmini__node">
            <span className={`kmini__circle kmini__circle--${i}`} aria-hidden="true">
              <Icon name={s.icon} size={28} />
            </span>
            <span className="kmini__label">{s.title}</span>
          </span>
          {i < steps.length - 1 ? (
            <span className="kmini__arrow" aria-hidden="true">
              <svg viewBox="0 0 44 12" width="44" height="12" focusable="false">
                <path
                  d="M42 6H4M11 1.5 4 6l7 4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

export default function KnowledgeFlow() {
  const uid = useId()
  const [active, setActive] = useState(knowledgeFlow.steps[0].id)
  const activeStep = knowledgeFlow.steps.find((s) => s.id === active)

  return (
    <div className="kflowBlock">
      <ol className="kflow" aria-label={knowledgeFlow.title}>
        {knowledgeFlow.steps.map((s, i) => (
          <li className="kflow__node" key={s.id}>
            <button
              type="button"
              className={`kflow__btn${s.id === active ? ' is-active' : ''}`}
              aria-expanded={s.id === active}
              aria-controls={`${uid}-panel`}
              onClick={() => setActive(s.id)}
            >
              <span className={`kflow__circle kflow__circle--${i}`}>
                <Icon name={s.icon} size={30} />
              </span>
              <span className="kflow__label">{s.title}</span>
              <span className="kflow__short">{s.short}</span>
            </button>
            {i < knowledgeFlow.steps.length - 1 ? <Arrow /> : null}
          </li>
        ))}
      </ol>

      <div className="kflow__panel card card--pad" id={`${uid}-panel`} role="region" aria-live="polite">
        <h3 className="card-title">{activeStep.title}</h3>
        <span className="gold-rule gold-rule--sm" aria-hidden="true" />
        <p>{activeStep.text}</p>
      </div>
    </div>
  )
}
