import { chapterMap } from '../data/chapter1'
import './sections.css'

export default function ChapterMap() {
  return (
    <section className="section section--white" id="chapter-map" aria-labelledby="chapter-map-title">
      <div className="container">
        <h2 className="section-title" id="chapter-map-title">
          {chapterMap.title}
        </h2>
        <span className="gold-rule" aria-hidden="true" />
        <p className="lead" style={{ maxWidth: '760px' }}>
          {chapterMap.intro}
        </p>

        <div className="gates">
          {chapterMap.gates.map((g) => (
            <a className="gate" href={g.href} key={g.id}>
              <span className="gate__num">{g.number}</span>
              <h3 className="gate__title">{g.title}</h3>
              <p className="gate__desc">{g.description}</p>
              <span className="gate__go">מעבר לשער ←</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
