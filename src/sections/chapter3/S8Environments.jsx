import Icon from '../../components/Icons/Icons'
import SortExercise from '../../components/SortExercise/SortExercise'
import { environments as env } from '../../data/chapter3'
import './chapter3.css'

export default function S8Environments() {
  return (
    <section className="section section--cream" id={env.id} aria-labelledby="ch3-env-title">
      <div className="container">
        <header className="s3head">
          <h2 className="section-title" id="ch3-env-title">
            {env.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        <div className="s3blocks">
          <div className="envs">
            {env.sides.map((s) => (
              <article className={`env${s.id === 'tac' ? ' env--tac' : ''}`} key={s.id}>
                <span className="env__icon">
                  <Icon name={s.icon} size={24} />
                </span>
                <h3 className="env__title">{s.title}</h3>
                <span className="gold-rule gold-rule--sm" aria-hidden="true" />
                <p>{s.text}</p>
              </article>
            ))}
          </div>

          <div>
            <h3 className="s3sub">{env.exercise.title}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <div style={{ marginTop: '18px' }}>
              <SortExercise
                terms={env.exercise.terms}
                categories={env.exercise.categories}
                hint={env.exercise.hint}
                explanation={env.exercise.explanation}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
