import { Fragment, useId, useState } from 'react'
import Icon from '../../components/Icons/Icons'
import { officerAndLeader as ol } from '../../data/chapter2'
import './chapter2.css'

/** שתי סכנות — כותרות פתוחות בשני טורים; ההסבר נפתח מתחת לשתיהן, על רקע העמוד. */
function Dangers() {
  const uid = useId()
  const [open, setOpen] = useState(null)
  const active = ol.dangers.find((d) => d.id === open)

  return (
    <div className="dangers">
      <div className="dangers__cols">
        {ol.dangers.map((d) => {
          const isOpen = d.id === open
          return (
            <h4 className="dangers__col" key={d.id}>
              <button
                type="button"
                className={`dangers__btn${isOpen ? ' is-open' : ''}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-panel`}
                onClick={() => setOpen(isOpen ? null : d.id)}
              >
                <span className="dangers__name">{d.title}</span>
                <span className="dangers__sign" aria-hidden="true" />
              </button>
            </h4>
          )
        })}
      </div>

      <div className="dangers__panel" id={`${uid}-panel`} role="region" aria-live="polite" hidden={!active}>
        {active ? <p className="dangers__text">{active.text}</p> : null}
      </div>
    </div>
  )
}

/** מקרי בוחן — ציר זמן אופקי; הבחירה מדגישה את הכותרת בלבד, והטקסט מופיע מתחת. */
function Cases() {
  const uid = useId()
  const [active, setActive] = useState(ol.cases[0].id)
  const current = ol.cases.find((c) => c.id === active)

  return (
    <div className="tline">
      <div className="tline__track">
        {ol.cases.map((c, i) => (
          <Fragment key={c.id}>
            {i > 0 ? <span className="tline__link" aria-hidden="true" /> : null}
            <button
              type="button"
              className={`tline__btn${c.id === active ? ' is-active' : ''}`}
              aria-pressed={c.id === active}
              aria-controls={`${uid}-case`}
              onClick={() => setActive(c.id)}
            >
              {/* שורת השנה נשמרת גם כשאין שנה, כדי שכל הכותרות יישבו על אותו קו */}
              <span className="tline__when ltr-num">{c.when}</span>
              <span className="tline__title">{c.title}</span>
              <span className="tline__rule" aria-hidden="true" />
            </button>
          </Fragment>
        ))}
      </div>

      <div className="tline__panel" id={`${uid}-case`} role="region" aria-live="polite">
        <p className="tline__text">{current.text}</p>
        <span className="tline__tag">{current.danger}</span>
      </div>
    </div>
  )
}

export default function StationOfficer() {
  return (
    <section className="section section--paper" id={ol.id} aria-labelledby="ch2-officer-title">
      <div className="container">
        <header className="st__head">
          <h2 className="section-title" id="ch2-officer-title">
            {ol.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead st__intro">{ol.lead}</p>
        </header>

        <div className="st__blocks">
          <div className="duo">
            {ol.sides.map((s) => (
              <div className="duo__side" key={s.id}>
                <span className="duo__icon" aria-hidden="true">
                  <Icon name={s.icon} size={22} />
                </span>
                <h3 className="duo__title">{s.title}</h3>
                <p className="duo__text">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="keyMsg">
            <span className="keyMsg__label">{ol.callout.label}</span>
            <p className="keyMsg__text">{ol.callout.text}</p>
          </div>

          <div>
            <h3 className="block__title">{ol.dangersTitle}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="st__hint">{ol.dangersHint}</p>
            <Dangers />
          </div>

          <div>
            <h3 className="block__title">{ol.casesTitle}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="st__hint">{ol.casesHint}</p>
            <Cases />
          </div>
        </div>
      </div>
    </section>
  )
}
