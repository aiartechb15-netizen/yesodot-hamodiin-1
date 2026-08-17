import Tabs from '../components/Tabs/Tabs'
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
        <p className="lead" style={{ marginBottom: '26px' }}>
          {byDomain.intro}
        </p>

        <Tabs
          tabs={byDomain.domains}
          ariaLabel={byDomain.title}
          renderPanel={(tab) => (
            <div className="domain__panel">
              <div className="card card--pad">
                <h3 className="card-title">{tab.title}</h3>
                <span className="gold-rule gold-rule--sm" aria-hidden="true" />
                <p>{tab.text}</p>
              </div>
              <img className="domain__img" src={domainImage} alt={tab.image} />
            </div>
          )}
        />
      </div>
    </section>
  )
}
