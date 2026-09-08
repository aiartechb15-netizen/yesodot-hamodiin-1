import IdentityCard from '../../components/IdentityCard/IdentityCard'
import { strategic } from '../../data/chapter2'
import './chapter2.css'

export default function StationStrategic() {
  return (
    <section className="section section--white" id={strategic.id} aria-labelledby="ch2-strategic-title">
      <div className="container">
        <header className="st__head">
          <h2 className="section-title" id="ch2-strategic-title">
            {strategic.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        <div className="st__blocks">
          <IdentityCard data={strategic} tone="teal" />
        </div>
      </div>
    </section>
  )
}
