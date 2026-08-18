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

        <div className="topics topics--3">
          {byOutput.items.map((item) => (
            <article key={item.id}>
              <span className="topic__icon" aria-hidden="true">
                <Icon name={item.icon} size={26} />
              </span>
              <h3 className="topic__title">{item.title}</h3>
              <span className="gold-rule gold-rule--sm" aria-hidden="true" />
              <p>{item.text}</p>
              <p className="topic__example">
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
