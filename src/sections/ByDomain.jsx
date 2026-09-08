import Icon from '../components/Icons/Icons'
import { byDomain } from '../data/chapter1'
import domainImage from '../assets/images/מהו מודיעין תמונה 2.png'
import './sections.css'

export default function ByDomain() {
  return (
    <section className="section section--white" id="by-domain" aria-labelledby="by-domain-title">
      <div className="container">
        <h2 className="section-title" id="by-domain-title">
          {byDomain.title}
        </h2>
        <span className="gold-rule" aria-hidden="true" />
        <p className="lead">{byDomain.intro}</p>

        {/* קטלוג התחומים לצד התצלום — כל התחומים גלויים בבת אחת */}
        <div className="domains__layout">
          <ol className="domains">
            {byDomain.domains.map((d, i) => (
              <li className="domain" key={d.id}>
                <span className="domain__num ltr-num" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="domain__icon" aria-hidden="true">
                  <Icon name={d.icon} size={20} />
                </span>
                <h3 className="domain__title">{d.title}</h3>
                <p className="domain__text">{d.text}</p>
              </li>
            ))}
          </ol>

          <img className="domains__img" src={domainImage} alt={byDomain.domains[0].image} />
        </div>
      </div>
    </section>
  )
}
