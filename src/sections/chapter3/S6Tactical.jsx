import IdentityCard from '../../components/IdentityCard/IdentityCard'
import ExpandCards from '../../components/ExpandCards/ExpandCards'
import { tactical as tac } from '../../data/chapter3'
import './chapter3.css'

export default function S6Tactical() {
  return (
    <section className="section section--paper" id={tac.id} aria-labelledby="ch3-tac-title">
      <div className="container">
        <header className="s3head">
          <h2 className="section-title" id="ch3-tac-title">
            {tac.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        <div className="s3blocks">
          <IdentityCard data={tac} tone="teal" />

          <div>
            <h3 className="s3sub">{tac.outputsTitle}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="s3hint">{tac.outputsHint}</p>
            <div style={{ marginTop: '18px' }}>
              <ExpandCards items={tac.outputs} columns={3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
