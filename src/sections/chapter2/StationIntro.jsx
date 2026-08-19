import { chapter2Meta, intro } from '../../data/chapter2'
import openerImage from '../../assets/images/תמונה_מודיעין_לאומי_ואסטרטגי.png'
import './chapter2.css'

/** תצלום פתיחה דקורטיבי — שולחן עבודה מודיעיני: מפת עולם, דוחות הערכה ותיק מסמכים. */
function OpenerArt() {
  return (
    <div className="ch2hero__art" aria-hidden="true">
      <img className="ch2hero__artImg" src={openerImage} alt="" />
    </div>
  )
}

export default function StationIntro() {
  return (
    <section className="ch2hero" id={intro.id} aria-labelledby="ch2-intro-title">
      <OpenerArt />
      <div className="ch2hero__inner container">
        <div className="ch2hero__text">
          <span className="ch2hero__badge">{chapter2Meta.number}</span>
          <h1 className="ch2hero__title" id="ch2-intro-title">
            {intro.headline}
          </h1>
          <span className="gold-rule" aria-hidden="true" />
          <p className="ch2hero__message">{intro.message}</p>
          <p className="ch2hero__text-body">{intro.text}</p>

          <div className="ch2hero__meta">
            <span className="ch2hero__metaLabel">{chapter2Meta.goalLabel}</span>
            <p className="ch2hero__metaText">{chapter2Meta.goal}</p>

            <span className="ch2hero__metaLabel ch2hero__metaLabel--spaced">
              {chapter2Meta.structureLabel}
            </span>
            <p className="ch2hero__metaText ch2hero__structure">{chapter2Meta.structure}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
