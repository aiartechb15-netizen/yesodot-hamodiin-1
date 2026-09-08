import { useId, useState } from 'react'
import Icon from '../../components/Icons/Icons'
import { research as rs } from '../../data/chapter3'
import './chapter3.css'

export default function S9Research() {
  const uid = useId()
  const [open, setOpen] = useState(null)

  return (
    <section className="section section--white" id={rs.id} aria-labelledby="ch3-rs-title">
      <div className="container">
        <header className="s3head">
          <h2 className="section-title" id="ch3-rs-title">
            {rs.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead" style={{ maxWidth: '880px' }}>
            {rs.intro}
          </p>
          <p className="s3hint">{rs.hint}</p>
        </header>

        <ul className="abbrs">
          {rs.cards.map((c) => {
            const isOpen = open === c.id
            return (
              <li key={c.id}>
                <button
                  type="button"
                  className={`abbr${isOpen ? ' is-open' : ''}`}
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-${c.id}`}
                  onClick={() => setOpen(isOpen ? null : c.id)}
                >
                  <span className="abbr__top">
                    <span className="abbr__icon">
                      <Icon name={c.icon} size={22} />
                    </span>
                    <span>
                      <span className="abbr__code">{c.abbr}</span>
                      <span className="abbr__title">{c.title}</span>
                    </span>
                  </span>
                  <span className="abbr__text" id={`${uid}-${c.id}`} hidden={!isOpen}>
                    {c.text}
                  </span>
                  {!isOpen ? <span className="abbr__cue">לפתיחת ההגדרה</span> : null}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
