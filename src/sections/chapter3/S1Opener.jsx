import { chapter3Meta, levels, opener } from '../../data/chapter3'
import './chapter3.css'

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round' }

/** איור רקע דקורטיבי — שרטוט מערכה ורשת תכנון. ללא טקסט. */
function OperationArt() {
  return (
    <div className="ch3hero__art" aria-hidden="true">
      <svg viewBox="0 0 420 300" focusable="false">
        <path {...S} d="M20 250h380M20 210h380M20 170h380M20 130h380M20 90h380" opacity="0.35" />
        <path {...S} d="M60 40v230M140 40v230M220 40v230M300 40v230M380 40v230" opacity="0.35" />
        <path {...S} d="M70 210c40-70 100-90 150-60s90 20 130-40" />
        <circle {...S} cx="140" cy="176" r="18" />
        <circle {...S} cx="256" cy="150" r="12" />
        <circle {...S} cx="340" cy="112" r="26" />
        <path {...S} d="M140 158v-28M122 176H94M158 176h28M140 194v28" />
        <path {...S} d="m300 96 26-26M326 70h-20M326 70v20" />
        <path {...S} d="M74 118h44l14 22-14 22H74l-14-22z" />
      </svg>
    </div>
  )
}

export default function S1Opener() {
  return (
    <>
      <section className="ch3hero" id={opener.id} aria-labelledby="ch3-title">
        <OperationArt />
        <div className="ch3hero__inner container">
          <div className="ch3hero__text">
            <span className="ch3hero__badge">{chapter3Meta.number}</span>
            <h1 className="ch3hero__title" id="ch3-title">
              {chapter3Meta.title}
            </h1>
            <span className="gold-rule" aria-hidden="true" />
            <div className="ch3hero__intro">
              {chapter3Meta.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="ch3hero__actions">
              <a className="btn" href={`#${levels.id}`}>
                {chapter3Meta.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="syl" aria-labelledby="ch3-syllabus-title">
        <div className="container">
          <h2 className="syl__title" id="ch3-syllabus-title">
            {chapter3Meta.syllabusTitle}
          </h2>
          <span className="gold-rule gold-rule--sm" aria-hidden="true" />
          <ul className="syl__list">
            {chapter3Meta.syllabus.map((s, i) => (
              <li key={s.label}>
                <a className="syl__item" href={s.to}>
                  <span className="syl__num ltr-num">{i + 1}</span>
                  <span className="syl__label">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
