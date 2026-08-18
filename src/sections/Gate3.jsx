import Icon from '../components/Icons/Icons'
import { gate3 } from '../data/chapter1'
import './sections.css'

export default function Gate3() {
  return (
    <section className="section section--paper" id="gate-3" aria-labelledby="gate-3-title">
      <div className="container">
        <header className="gateHead">
          <h2 className="section-title" id="gate-3-title">
            {gate3.headline}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead" style={{ maxWidth: '880px' }}>
            {gate3.paragraph}
          </p>
        </header>

        <nav className="axes" aria-label="צירי המיון של המודיעין">
          <span className="axes__line" aria-hidden="true" />
          <div className="axes__list">
            {gate3.axes.map((a, i) => (
              <a className="axis" href={a.href} key={a.id}>
                <span className="axis__dot">
                  <Icon name={a.icon} size={24} />
                </span>
                <span className="axis__title">{a.title}</span>
                <span className="axis__index">
                  ציר <span className="ltr-num">{i + 1}</span>
                </span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </section>
  )
}
