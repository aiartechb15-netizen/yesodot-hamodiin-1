import BinderExercise from '../../components/BinderExercise/BinderExercise'
import { binders } from '../../data/chapter2'
import './chapter2.css'

export default function StationBinders() {
  return (
    <section className="section section--white" id={binders.id} aria-labelledby="ch2-binders-title">
      <div className="container">
        <header className="st__head">
          <h2 className="section-title" id="ch2-binders-title">
            {binders.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        <BinderExercise />
      </div>
    </section>
  )
}
