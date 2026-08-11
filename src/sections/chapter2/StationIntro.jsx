import { chapter2Meta, intro, levelsMap } from '../../data/chapter2'
import './chapter2.css'

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round' }

/** איור רקע דקורטיבי — שכבות מסמכים וקווי מפה. ללא טקסט. */
function OpenerArt() {
  return (
    <div className="ch2hero__art" aria-hidden="true">
      <svg viewBox="0 0 420 320" focusable="false">
        <path {...S} d="M40 250h300M60 268h260" />
        <path {...S} d="M70 60h190l40 40v150H70z" />
        <path {...S} d="M260 60v40h40" />
        <path {...S} d="M96 120h150M96 146h150M96 172h96" />
        <path {...S} d="M120 96h230l30 34v120H120z" opacity="0.75" />
        <path {...S} d="M150 150c26-18 52-18 78 0s52 18 78 0" opacity="0.75" />
        <path {...S} d="M150 186c26-12 52-12 78 0" opacity="0.75" />
        <circle {...S} cx="300" cy="200" r="22" opacity="0.75" />
        <path {...S} d="m317 217 20 20" opacity="0.75" />
      </svg>
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

          <div className="ch2hero__actions">
            <a className="btn" href={`#${levelsMap.id}`}>
              {intro.primaryCta}
            </a>
            <a className="btn btn--ghost" href={`#${levelsMap.id}`}>
              {intro.secondaryCta}
            </a>
          </div>

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
