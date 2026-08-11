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

        <div className="bigCards bigCards--2">
          {byPurpose.items.map((item) => (
            <article className="bigCard" key={item.id}>
              <span className="bigCard__icon">
                <Icon name={item.icon} size={26} />
              </span>
              <h3 className="bigCard__title">{item.title}</h3>
              <p>{item.text}</p>
              <p className="bigCard__example">
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
