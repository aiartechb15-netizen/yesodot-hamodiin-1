import MiniCheck from '../../components/MiniCheck/MiniCheck'
import { quickCheck } from '../../data/chapter2'
import './chapter2.css'

export default function StationCheck() {
  return (
    <section className="section section--cream" id={quickCheck.id} aria-labelledby="ch2-check-title">
      <div className="container">
        <header className="st__head">
          <h2 className="section-title" id="ch2-check-title">
            {quickCheck.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead st__intro">{quickCheck.intro}</p>
        </header>

        <MiniCheck />
      </div>
    </section>
  )
}
