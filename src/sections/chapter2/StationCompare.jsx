import ComparisonTable from '../../components/ComparisonTable/ComparisonTable'
import { comparison } from '../../data/chapter2'
import './chapter2.css'

export default function StationCompare() {
  return (
    <section className="section section--white" id={comparison.id} aria-labelledby="ch2-compare-title">
      <div className="container">
        <header className="st__head">
          <h2 className="section-title" id="ch2-compare-title">
            {comparison.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead st__intro">{comparison.goal}</p>
        </header>

        <ComparisonTable />
      </div>
    </section>
  )
}
