import { useId, useState } from 'react'
import Icon from '../../components/Icons/Icons'
import ExpandCards from '../../components/ExpandCards/ExpandCards'
import { officerAndLeader as ol } from '../../data/chapter2'
import './chapter2.css'

function Timeline() {
  const uid = useId()
  const [open, setOpen] = useState(ol.cases[0].id)

  return (
    <ol className="tline">
      {ol.cases.map((c) => {
        const isOpen = open === c.id
        return (
          <li className="tline__item" key={c.id}>
            <span className="tline__dot" aria-hidden="true" />
            <button
              type="button"
              className={`tline__btn${isOpen ? ' is-open' : ''}`}
              aria-expanded={isOpen}
              aria-controls={`${uid}-${c.id}`}
              onClick={() => setOpen(isOpen ? null : c.id)}
            >
              <span className="tline__when">{c.when}</span>
              <span className="tline__title">{c.title}</span>
            </button>
            <div id={`${uid}-${c.id}`} hidden={!isOpen}>
              <p className="tline__text">{c.text}</p>
              <span className="tline__tag">{c.danger}</span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default function StationOfficer() {
  return (
    <section className="section section--paper" id={ol.id} aria-labelledby="ch2-officer-title">
      <div className="container">
        <header className="st__head">
          <span className="st__kicker">{ol.kicker}</span>
          <h2 className="section-title" id="ch2-officer-title">
            {ol.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead st__intro">{ol.lead}</p>
        </header>

        <div className="st__blocks">
          <div className="split2">
            <div className="split2__side split2__side--a">
              <span className="split2__icon">
                <Icon name={ol.sides[0].icon} size={24} />
              </span>
              <h3 className="split2__title">{ol.sides[0].title}</h3>
              <span className="gold-rule gold-rule--sm" aria-hidden="true" />
              <p>{ol.sides[0].text}</p>
            </div>
            <div className="split2__divider" aria-hidden="true">
              <span className="split2__vs">מול</span>
            </div>
            <div className="split2__side split2__side--b">
              <span className="split2__icon">
                <Icon name={ol.sides[1].icon} size={24} />
              </span>
              <h3 className="split2__title">{ol.sides[1].title}</h3>
              <span className="gold-rule gold-rule--sm" aria-hidden="true" />
              <p>{ol.sides[1].text}</p>
            </div>
          </div>

          <aside className="callout">
            <span className="callout__label">{ol.callout.label}</span>
            <p>{ol.callout.text}</p>
          </aside>

          <div>
            <h3 className="block__title">{ol.dangersTitle}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="st__hint">{ol.dangersHint}</p>
            <div style={{ marginTop: '18px' }}>
              <ExpandCards items={ol.dangers} columns={2} />
            </div>
          </div>

          <div>
            <h3 className="block__title">{ol.casesTitle}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="st__hint">{ol.casesHint}</p>
            <Timeline />
          </div>
        </div>
      </div>
    </section>
  )
}
