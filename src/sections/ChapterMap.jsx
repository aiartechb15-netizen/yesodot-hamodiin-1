import { chapterFocus } from '../data/chapter1'
import './sections.css'

// שלושת הרעיונות המרכזיים ככרטיסים אופקיים — תוכן רציף בעמוד, ללא ניווט.
export default function ChapterMap() {
  return (
    <section className="section section--white" id="chapter-map" aria-labelledby="chapter-focus-title">
      <div className="container">
        <h2 className="section-title" id="chapter-focus-title">
          {chapterFocus.title}
        </h2>
        <span className="gold-rule" aria-hidden="true" />
        <p className="lead" style={{ maxWidth: '780px' }}>
          {chapterFocus.intro}
        </p>

        <ol className="ideas">
          {chapterFocus.steps.map((s) => (
            <li className="ideas__card" key={s.id}>
              <div className="ideas__num">
                <span className="ideas__digits ltr-num" aria-hidden="true">
                  {s.number}
                </span>
                <span className="ideas__numRule" aria-hidden="true" />
              </div>
              <div className="ideas__body">
                <h3 className="ideas__title">{s.title}</h3>
                <p className="ideas__text">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
