import LevelPyramid from '../../components/LevelPyramid/LevelPyramid'
import { levelsMap, national } from '../../data/chapter2'
import './chapter2.css'

export default function StationLevels() {
  return (
    <section className="section section--paper" id={levelsMap.id} aria-labelledby="ch2-levels-title">
      <div className="container">
        <header className="st__head">
          <h2 className="section-title" id="ch2-levels-title">
            {levelsMap.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead st__intro">{levelsMap.intro}</p>
        </header>

        <LevelPyramid />

        <div style={{ marginTop: '30px' }}>
          <a className="btn" href={`#${national.id}`}>
            {levelsMap.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
