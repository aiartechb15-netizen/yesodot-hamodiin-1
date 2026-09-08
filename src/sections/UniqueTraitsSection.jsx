import TraitList from '../components/TraitList/TraitList'
import { uniqueTraits } from '../data/chapter1'
import './sections.css'
import BackgroundDecor from '../components/BackgroundDecor/BackgroundDecor'

export default function UniqueTraitsSection() {
  return (
    <section className="section section--cream" id="unique-traits" aria-labelledby="unique-traits-title">
      <BackgroundDecor variant="globe" />
      <div className="container">
        <h2 className="section-title" id="unique-traits-title">
          {uniqueTraits.title}
        </h2>
        <span className="gold-rule" aria-hidden="true" />
        <p className="lead" style={{ marginBottom: '28px' }}>
          {uniqueTraits.intro}
        </p>
        <TraitList
          items={uniqueTraits.items}
          progressLabel={uniqueTraits.completeLabel}
          completedMessage={uniqueTraits.completedMessage}
        />
      </div>
    </section>
  )
}
