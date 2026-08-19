import LevelPyramid from '../../components/LevelPyramid/LevelPyramid'
import { levelsMap } from '../../data/chapter2'
import './chapter2.css'

export default function StationLevels() {
  return (
    <section className="section section--cream" id={levelsMap.id} aria-labelledby="ch2-levels-title">
      <div className="container levels-map">
        <header className="st__head levels-map__head">
          <h2 className="section-title" id="ch2-levels-title">
            {levelsMap.title}
          </h2>
          <span className="gold-rule gold-rule--center" aria-hidden="true" />
          <p className="lead st__intro">{levelsMap.intro}</p>
        </header>

        <LevelPyramid />
      </div>
    </section>
  )
}
