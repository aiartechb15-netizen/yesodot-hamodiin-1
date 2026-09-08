import LearningMap from '../components/LearningMap/LearningMap'
import { gate1, learningMap } from '../data/chapter1'
import learningImage from '../assets/images/מודיעין כמערכת לומדה.png'
import './sections.css'

export default function Gate1() {
  const { learningSystem: ls, infoVsKnowledge: ik } = gate1

  return (
    <section className="section section--paper" id="gate-1" aria-labelledby="gate-1-title">
      <div className="container">
        <header className="gateHead">
          <h2 className="section-title" id="gate-1-title">
            {gate1.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        {/* 1. מודיעין כמערכת לומדת — איור אחד עם חמש נקודות מידע.
            שני הצדדים ושלושת הרבדים אינם מוצגים עוד כרשימות פתוחות:
            הטקסטים שלהם נפתחים מהנקודה שעליה לוחצים. */}
        <h3 className="lsys__title">{ls.title}</h3>
        <span className="gold-rule gold-rule--sm" aria-hidden="true" />
        <p className="lsys__hint">{learningMap.hint}</p>

        <LearningMap
          image={learningImage}
          alt={learningMap.alt}
          points={learningMap.points}
          groups={learningMap.groups}
          doneMessage={learningMap.doneMessage}
        />

        <p className="lsys__lead">{ls.paragraph}</p>

        {/* 2. בין מידע לידע */}
        <article className="rail rail--single">
          <h3 className="rail__title">{ik.title}</h3>
          <span className="gold-rule gold-rule--sm" aria-hidden="true" />
          <p className="rail__lead">{ik.paragraph}</p>

          <div className="inset">
            <span className="inset__label">{ik.example.label}</span>
            <p>{ik.example.text}</p>
          </div>
        </article>

        {/* 3. משפט מסכם — קו דק עם הדגשה זהובה במרכזו, ומתחתיו המשפט */}
        <div className="keyIdea">
          <span className="keyIdea__rule" aria-hidden="true" />
          <p className="keyIdea__text">{ls.callout.text}</p>
        </div>
      </div>
    </section>
  )
}
