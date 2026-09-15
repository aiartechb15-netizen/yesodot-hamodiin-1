import TraitTabs from '../components/TraitTabs/TraitTabs'
import { uniqueTraits } from '../data/chapter1'
import './sections.css'

export default function UniqueTraitsSection() {
  return (
    <section className="section section--cream" id="unique-traits" aria-labelledby="unique-traits-title">
      <div className="container">
        <h2 className="section-title" id="unique-traits-title">
          {uniqueTraits.title}
        </h2>
        <span className="gold-rule" aria-hidden="true" />
        <p className="lead">{uniqueTraits.intro}</p>

        <TraitTabs
          items={uniqueTraits.items}
          label={uniqueTraits.title}
          completedMessage={uniqueTraits.completedMessage}
        />
      </div>
    </section>
  )
}
