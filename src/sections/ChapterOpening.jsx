import { chapterOpening } from '../data/chapter1'
import openingImage from '../assets/images/תמונה פרק 1 חדשה.png'
import './sections.css'

export default function ChapterOpening() {
  return (
    <section className="section section--paper" id="chapter-open" aria-labelledby="chapter-open-title">
      <div className="container open__container">
        <div className="split split--wideText open__split">
          <div>
            {/* "מטרת הפרק" היא הכותרת הראשונה של הסקשן, ולכן היא נושאת
                את ה-id שה-aria-labelledby של הסקשן מצביע עליו */}
            <div className="open__meta">
              <h3 className="openBlock__title" id="chapter-open-title">
                {chapterOpening.purposeTitle}
              </h3>
              <span className="gold-rule gold-rule--sm" aria-hidden="true" />
              <p>{chapterOpening.purpose}</p>

              <div className="open__outcomes">
                <h3 className="openBlock__title">{chapterOpening.outcomesTitle}</h3>
                <ul className="open__list">
                  {chapterOpening.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* עמודה שמאלית: התמונה בלבד */}
          <div className="open__media">
            <img className="open__img" src={openingImage} alt={chapterOpening.image} />
          </div>
        </div>
      </div>
    </section>
  )
}
