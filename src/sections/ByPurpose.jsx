import Icon from '../components/Icons/Icons'
import { byPurpose } from '../data/chapter1'
import './sections.css'

export default function ByPurpose() {
  return (
    <section className="section section--white" id="by-purpose" aria-labelledby="by-purpose-title">
      <div className="container">
        <h2 className="section-title" id="by-purpose-title">
          {byPurpose.title}
        </h2>
        <span className="gold-rule" aria-hidden="true" />

        <div className="openGrid openGrid--2">
          {byPurpose.items.map((item) => (
            <article key={item.id}>
              <span className="openBlock__icon" aria-hidden="true">
                <Icon name={item.icon} size={26} />
              </span>
              <h3 className="openBlock__title">{item.title}</h3>
              <span className="gold-rule gold-rule--sm" aria-hidden="true" />
              <p>{item.text}</p>
              <p className="openBlock__example">
                <span className="term">{item.examplesLabel}: </span>
                {item.examples}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
