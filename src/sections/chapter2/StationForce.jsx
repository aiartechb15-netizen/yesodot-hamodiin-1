import { useId, useState } from 'react'
import Icon from '../../components/Icons/Icons'
import StationNav from '../../components/StationNav/StationNav'
import { forceBuilding as fb } from '../../data/chapter2'
import './chapter2.css'

export default function StationForce() {
  const uid = useId()
  const [open, setOpen] = useState([fb.steps[0].id])

  const toggle = (id) => setOpen((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const revealAll = () => setOpen(fb.steps.map((s) => s.id))
  const nextClosed = fb.steps.find((s) => !open.includes(s.id))

  return (
    <section className="section section--paper" id={fb.id} aria-labelledby="ch2-force-title">
      <div className="container">
        <header className="st__head">
          <span className="st__kicker">{fb.kicker}</span>
          <h2 className="section-title" id="ch2-force-title">
            {fb.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead st__intro">{fb.opener}</p>
          <p className="st__hint">{fb.hint}</p>
        </header>

        <ol className="steps">
          {fb.steps.map((s, i) => {
            const isOpen = open.includes(s.id)
            return (
              <li key={s.id}>
                <button
                  type="button"
                  className={`step${isOpen ? ' is-open' : ''}${s.highlight ? ' is-highlight' : ''}`}
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-${s.id}`}
                  onClick={() => toggle(s.id)}
                >
                  <span className="step__num ltr-num">{i + 1}</span>
                  <span className="step__label">{s.label}</span>
                  <Icon name="chevron" size={20} className="step__chev" />
                </button>
                <p className="step__text" id={`${uid}-${s.id}`} hidden={!isOpen}>
                  {s.text}
                </p>
              </li>
            )
          })}
        </ol>

        <div className="steps__actions">
          {nextClosed ? (
            <button className="btn btn--sm" type="button" onClick={() => toggle(nextClosed.id)}>
              {fb.nextStep}
            </button>
          ) : null}
          <button className="btn btn--ghost btn--sm" type="button" onClick={revealAll}>
            {fb.revealAll}
          </button>
        </div>

        <StationNav current={fb.station} />
      </div>
    </section>
  )
}
