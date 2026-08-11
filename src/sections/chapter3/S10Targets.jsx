import VideoPlaceholder from '../../components/VideoPlaceholder/VideoPlaceholder'
import ScenarioPicker from '../../components/ScenarioPicker/ScenarioPicker'
import { targets as tg } from '../../data/chapter3'
import './chapter3.css'

export default function S10Targets() {
  return (
    <section className="section section--paper" id={tg.id} aria-labelledby="ch3-tg-title">
      <div className="container">
        <header className="s3head">
          <span className="s3head__kicker">{tg.kicker}</span>
          <h2 className="section-title" id="ch3-tg-title">
            {tg.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        <div className="s3blocks">
          <div style={{ maxWidth: '900px' }}>
            <VideoPlaceholder video={tg.video} />
          </div>

          <div>
            <div className="principle">
              <span className="principle__formula">
                <span>גודל המטרה</span>
                <span className="principle__eq">=</span>
                <span>גודל הדרג</span>
              </span>
              <p className="principle__text">{tg.principle}</p>
            </div>

            <ol className="rungs" aria-label="סולם הדרגים">
              {tg.ladder.map((r, i) => (
                <li className={`rung rung--${i}`} key={r}>
                  {r}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="s3sub">{tg.exercise.title}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="lead" style={{ maxWidth: '880px' }}>
              {tg.exercise.intro}
            </p>
            <div style={{ marginTop: '18px' }}>
              <ScenarioPicker
                scenarios={tg.exercise.scenarios}
                options={tg.exercise.options}
                hint={tg.exercise.hint}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
