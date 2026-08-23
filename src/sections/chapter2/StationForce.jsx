import Icon from '../../components/Icons/Icons'
import { binders, forceBuilding as fb } from '../../data/chapter2'
import './chapter2.css'

/* חמשת השלבים הם תהליך אחד רציף, ולכן כולם גלויים תמיד:
   מסלול אנכי שמתחיל בימין — מספר, כותרת, ומתחתיהם ההסבר. */
export default function StationForce() {
  return (
    <section className="section section--paper" id={fb.id} aria-labelledby="ch2-force-title">
      <div className="container">
        <header className="st__head">
          <h2 className="section-title" id="ch2-force-title">
            {fb.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead st__intro">{fb.opener}</p>
        </header>

        <ol className="fsteps">
          {fb.steps.map((s, i) => (
            <li className={`fstep${s.highlight ? ' fstep--mark' : ''}`} key={s.id}>
              <span className="fstep__num ltr-num">{i + 1}</span>
              <div className="fstep__body">
                <h3 className="fstep__head">
                  <span className="fstep__icon" aria-hidden="true">
                    <Icon name={s.icon} size={20} />
                  </span>
                  {s.label}
                </h3>
                <p className="fstep__text">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="fsteps__actions">
          <a className="btn btn--sm" href={`#${binders.id}`}>
            {fb.nextStep}
          </a>
        </div>
      </div>
    </section>
  )
}
