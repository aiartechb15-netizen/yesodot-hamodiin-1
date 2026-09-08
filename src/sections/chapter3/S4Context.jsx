import Icon from '../../components/Icons/Icons'
import VideoPlaceholder from '../../components/VideoPlaceholder/VideoPlaceholder'
import MultiSelect from '../../components/MultiSelect/MultiSelect'
import { context as ctx } from '../../data/chapter3'
import './chapter3.css'

export default function S4Context() {
  return (
    <section className="section section--cream" id={ctx.id} aria-labelledby="ch3-ctx-title">
      <div className="container">
        <header className="s3head">
          <h2 className="section-title" id="ch3-ctx-title">
            {ctx.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        <div className="s3blocks">
          <div className="videoWrap">
            <VideoPlaceholder video={ctx.video} />
          </div>

          <aside className="callout">
            <span className="callout__label">העיקרון</span>
            <p>{ctx.principle}</p>
          </aside>

          <div>
            <p className="lead" style={{ maxWidth: '900px' }}>
              {ctx.factorsIntro}
            </p>
            <ul className="tiles tiles--5" style={{ marginTop: '20px' }}>
              {ctx.factors.map((f) => (
                <li className="tile" key={f.id}>
                  <span className="tile__icon">
                    <Icon name={f.icon} size={22} />
                  </span>
                  <span className="tile__title">{f.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="s3sub">{ctx.exercise.title}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <div style={{ marginTop: '18px' }}>
              <MultiSelect
                scenarioLabel={ctx.exercise.scenarioLabel}
                scenario={ctx.exercise.scenario}
                question={ctx.exercise.question}
                options={ctx.exercise.options}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
