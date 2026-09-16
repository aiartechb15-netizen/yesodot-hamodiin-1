import ExpandCards from '../../components/ExpandCards/ExpandCards'
import { relations as rel } from '../../data/chapter3'
import './chapter3.css'

export default function S11Relations() {
  return (
    <section className="section section--white" id={rel.id} aria-labelledby="ch3-rel-title">
      <div className="container">
        <header className="s3head">
          <h2 className="section-title" id="ch3-rel-title">
            {rel.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="s3hint">{rel.hint}</p>
        </header>

        <ExpandCards items={rel.items} columns={2} />

        {/* מקטע פתוח ולא כרטיס: התוכן יושב ישירות על רקע העמוד, ומה
            שמפריד אותו מן האקורדיונים שמעליו הוא קו דק ומרווח בלבד */}
        <aside className="s3prox">
          <h3 className="s3prox__title">{rel.callout.label}</h3>
          <span className="gold-rule gold-rule--sm" aria-hidden="true" />
          <p className="s3prox__text">{rel.callout.text}</p>
        </aside>
      </div>
    </section>
  )
}
