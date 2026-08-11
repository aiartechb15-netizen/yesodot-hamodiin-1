import Icon from '../components/Icons/Icons'
import { byOutput } from '../data/chapter1'
import './sections.css'

export default function ByOutput() {
  return (
    <section className="section section--white" id="by-output" aria-labelledby="by-output-title">
      <div className="container">
        <h2 className="section-title" id="by-output-title">
          {byOutput.title}
        </h2>
        <span className="gold-rule" aria-hidden="true" />

        <div className="bigCards bigCards--3">
          {byOutput.items.map((item) => (
            <article className="bigCard" key={item.id}>
              <span className="bigCard__icon">
                <Icon name={item.icon} size={26} />
              </span>
              <h3 className="bigCard__title">{item.title}</h3>
              <p>{item.text}</p>
              <p className="bigCard__example">
                <span className="term">{item.exampleLabel}: </span>
                {item.example}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
