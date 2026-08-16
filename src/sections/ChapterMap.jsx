import Icon from '../components/Icons/Icons'
import { chapterFocus } from '../data/chapter1'
import './sections.css'

// שלושת הרעיונות המרכזיים כמסלול אחד מתפתח — הסבר ויזואלי, ללא ניווט.
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

        <ol className="journey">
          <span className="journey__track" aria-hidden="true" />
          {chapterFocus.steps.map((s, i) => (
            <li className="journey__item" key={s.id}>
              <span className={`journey__marker journey__marker--${i}`}>
                <span className="journey__circle">
                  <Icon name={s.icon} size={30} />
                </span>
                <span className="journey__num ltr-num" aria-hidden="true">
                  {i + 1}
                </span>
              </span>
              <h3 className="journey__title">{s.title}</h3>
              <p className="journey__text">{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
