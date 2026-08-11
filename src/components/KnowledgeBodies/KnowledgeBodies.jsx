import { useId, useState } from 'react'
import Icon from '../Icons/Icons'
import Accordion from '../Accordion/Accordion'
import useMediaQuery from '../../hooks/useMediaQuery'
import { knowledgeBodies } from '../../data/chapter1'
import './KnowledgeBodies.css'

const R = 168
const C = 210
const START = 90 // הצומת הראשון למעלה, והמשך נגד כיוון השעון

export default function KnowledgeBodies() {
  const uid = useId()
  const isWide = useMediaQuery('(min-width: 900px)')
  const [active, setActive] = useState(knowledgeBodies.nodes[0].id)
  const activeNode = knowledgeBodies.nodes.find((n) => n.id === active)
  const n = knowledgeBodies.nodes.length

  if (!isWide) {
    return <Accordion items={knowledgeBodies.nodes} className="kb__acc" />
  }

  const point = (i) => {
    const deg = START + (360 / n) * i
    const rad = (deg * Math.PI) / 180
    return { x: C + R * Math.cos(rad), y: C - R * Math.sin(rad) }
  }

  return (
    <div className="kb">
      <div className="kb__map">
        <svg className="kb__lines" viewBox="0 0 420 420" aria-hidden="true" focusable="false">
          {knowledgeBodies.nodes.map((node, i) => {
            const p = point(i)
            return (
              <line
                key={node.id}
                x1={C}
                y1={C}
                x2={p.x}
                y2={p.y}
                stroke={node.id === active ? 'var(--gold)' : 'var(--border)'}
                strokeWidth={node.id === active ? 2 : 1}
                strokeDasharray="4 6"
              />
            )
          })}
          <circle cx={C} cy={C} r="62" fill="var(--navy)" />
          <text x={C} y={C + 7} textAnchor="middle" className="kb__centerText">
            {knowledgeBodies.center}
          </text>
        </svg>

        <ul className="kb__nodes">
          {knowledgeBodies.nodes.map((node, i) => {
            const p = point(i)
            return (
              <li
                key={node.id}
                className="kb__node"
                style={{ left: `${(p.x / 420) * 100}%`, top: `${(p.y / 420) * 100}%` }}
              >
                <button
                  type="button"
                  className={`kb__btn${node.id === active ? ' is-active' : ''}`}
                  aria-expanded={node.id === active}
                  aria-controls={`${uid}-panel`}
                  onClick={() => setActive(node.id)}
                >
                  <Icon name={node.icon} size={20} />
                  <span>{node.title}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="kb__panel card card--pad" id={`${uid}-panel`} role="region" aria-live="polite">
        <h3 className="card-title">{activeNode.title}</h3>
        <span className="gold-rule gold-rule--sm" aria-hidden="true" />
        <p>{activeNode.text}</p>
      </div>
    </div>
  )
}
