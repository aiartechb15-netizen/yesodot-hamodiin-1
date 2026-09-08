import Icon from '../../components/Icons/Icons'
import { forceBuilding as fb } from '../../data/chapter2'
import forceImage from '../../assets/images/modiin_force_building_visual.png'
import './chapter2.css'

/* חמשת השלבים הם תהליך אחד רציף, ולכן כולם גלויים תמיד:
   מסלול אנכי שמתחיל בימין — מספר, כותרת, ומתחתיהם ההסבר.
   בצד שמאל תצלום דקורטיבי שנמסך אל רקע העמוד, כך שהשניים
   נקראים כקומפוזיציה אחת ולא כשני אזורים נפרדים. */
export default function StationForce() {
  return (
    <section className="section section--paper" id={fb.id} aria-labelledby="ch2-force-title">
      <div className="container fbuild">
        <div className="fbuild__main">
          <header className="st__head">
            <h2 className="section-title" id="ch2-force-title">
              {fb.title}
            </h2>
            <span className="gold-rule" aria-hidden="true" />
            <p className="lead st__intro">{fb.opener}</p>
          </header>

          <ol className="fsteps">
            {fb.steps.map((s, i) => (
              <li className="fstep" key={s.id}>
                <span className="fstep__num ltr-num">{i + 1}</span>
                <div className="fstep__body">
                  <h3 className="fstep__head">
                    <span className="fstep__icon" aria-hidden="true">
                      <Icon name={s.icon} size={18} />
                    </span>
                    {s.label}
                  </h3>
                  <p className="fstep__text">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="fbuild__art" aria-hidden="true">
          <img className="fbuild__img" src={forceImage} alt="" loading="lazy" />
        </div>
      </div>
    </section>
  )
}
