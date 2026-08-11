import IdentityCard from '../../components/IdentityCard/IdentityCard'
import { national } from '../../data/chapter2'
import './chapter2.css'

export default function StationNational() {
  return (
    <section className="section section--white" id={national.id} aria-labelledby="ch2-national-title">
      <div className="container">
        <header className="st__head">
          <span className="st__kicker">{national.kicker}</span>
          <h2 className="section-title" id="ch2-national-title">
            {national.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        <IdentityCard data={national} tone="navy" />
      </div>
    </section>
  )
}
