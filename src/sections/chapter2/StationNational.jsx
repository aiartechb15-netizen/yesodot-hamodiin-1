import IdentityCard from '../../components/IdentityCard/IdentityCard'
import { national } from '../../data/chapter2'
import './chapter2.css'
import BackgroundDecor from '../../components/BackgroundDecor/BackgroundDecor'

export default function StationNational() {
  return (
    <section
      className="section section--white st--open"
      id={national.id}
      aria-labelledby="ch2-national-title"
    >
      <BackgroundDecor variant="globe" />
      <div className="container">
        <header className="st__head">
          <h2 className="section-title" id="ch2-national-title">
            {national.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        <IdentityCard data={national} tone="navy" layout="open" />
      </div>
    </section>
  )
}
