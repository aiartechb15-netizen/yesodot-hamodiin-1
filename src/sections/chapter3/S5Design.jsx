import FillBlanks from '../../components/FillBlanks/FillBlanks'
import { design } from '../../data/chapter3'
import './chapter3.css'

export default function S5Design() {
  return (
    <section className="section section--white" id={design.id} aria-labelledby="ch3-design-title">
      <div className="container">
        <header className="s3head">
          <span className="s3head__kicker">{design.kicker}</span>
          <h2 className="section-title" id="ch3-design-title">
            {design.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        <div className="s3blocks">
          <div className="openGrid openGrid--2">
            {design.blocks.map((b) => (
              <article key={b.id}>
                <h3 className="openBlock__title">{b.title}</h3>
                <span className="gold-rule gold-rule--sm" aria-hidden="true" />
                <p>{b.text}</p>
              </article>
            ))}
          </div>

          <div>
            <h3 className="s3sub">{design.exercise.title}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <div style={{ marginTop: '18px' }}>
              <FillBlanks
                bank={design.exercise.bank}
                bankLabel={design.exercise.bankLabel}
                sentences={design.exercise.sentences}
                hint={design.exercise.hint}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
