import { useId, useState } from 'react'
import Icon from '../../components/Icons/Icons'
import { strategicResearch as sr } from '../../data/chapter2'
import './chapter2.css'

function Lenses() {
  const uid = useId()
  const [open, setOpen] = useState(null)

  return (
    <ul className="lenses">
      {sr.lenses.map((l) => {
        const isOpen = open === l.id
        return (
          <li key={l.id}>
            <button
              type="button"
              className={`lens${isOpen ? ' is-open' : ''}`}
              aria-expanded={isOpen}
              aria-controls={`${uid}-${l.id}`}
              onClick={() => setOpen(isOpen ? null : l.id)}
            >
              <span className="lens__top">
                <span className="lens__ring">
                  <span className="lens__num ltr-num">{l.number}</span>
                  <Icon name={l.icon} size={24} />
                </span>
                <span className="lens__title">{l.title}</span>
              </span>

              <span className="lens__body" id={`${uid}-${l.id}`} hidden={!isOpen}>
                <span>{l.text}</span>
                <span className="lens__example">
                  <span className="term">{sr.exampleLabel}: </span>
                  {l.example}
                </span>
              </span>

              {!isOpen ? <span className="lens__more">לחשיפת העדשה</span> : null}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default function StationResearch() {
  return (
    <section className="section section--cream" id={sr.id} aria-labelledby="ch2-research-title">
      <div className="container">
        <header className="st__head">
          <span className="st__kicker">{sr.kicker}</span>
          <h2 className="section-title" id="ch2-research-title">
            {sr.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead st__intro">{sr.opener}</p>
        </header>

        <div className="st__blocks">
          <div className="grid-2">
            {sr.rows.map((r) => (
              <article className="card card--pad" key={r.id}>
                <h3 className="card-title">{r.label}</h3>
                <span className="gold-rule gold-rule--sm" aria-hidden="true" />
                <p>{r.text}</p>
              </article>
            ))}
          </div>

          <div className="card card--pad">
            <h3 className="card-title">{sr.examineTitle}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <ul className="examine">
              {sr.examine.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="block__title">{sr.lensesTitle}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="st__hint">{sr.lensesHint}</p>
            <div style={{ marginTop: '18px' }}>
              <Lenses />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
