import Icon from '../../components/Icons/Icons'
import ExpandCards from '../../components/ExpandCards/ExpandCards'
import { operational as op } from '../../data/chapter3'
import './chapter3.css'

export default function S3Operational() {
  return (
    <section className="section section--white" id={op.id} aria-labelledby="ch3-op-title">
      <div className="container">
        <header className="s3head">
          <h2 className="section-title" id="ch3-op-title">
            {op.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        <div className="s3blocks">
          <aside className="callout">
            <span className="callout__label">{op.purposeLabel}</span>
            <p>{op.purpose}</p>
          </aside>

          <div>
            <h3 className="s3sub">{op.consumersTitle}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <ul className="tiles">
              {op.consumers.map((c) => (
                <li className="tile" key={c.id}>
                  <span className="tile__icon">
                    <Icon name={c.icon} size={22} />
                  </span>
                  <span className="tile__title">{c.title}</span>
                </li>
              ))}
            </ul>
            <aside className="callout callout--teal" style={{ marginTop: '18px' }}>
              <span className="callout__label">בשנים האחרונות</span>
              <p>{op.consumersNote}</p>
            </aside>
          </div>

          <div>
            <h3 className="s3sub">{op.howTitle}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="s3hint">{op.howHint}</p>
            <div style={{ marginTop: '18px' }}>
              <ExpandCards items={op.how} columns={3} />
            </div>
            <aside className="callout callout--example" style={{ marginTop: '20px' }}>
              <span className="callout__label">מן הניתוח לבסיס המודיעיני</span>
              <p>{op.outcome}</p>
            </aside>
          </div>

          <div>
            <h3 className="s3sub">{op.questionsTitle}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <ul className="qlist">
              {op.questions.map((q, i) => (
                <li key={q}>
                  <span className="qlist__mark ltr-num">{i + 1}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
