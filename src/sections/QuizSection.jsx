import Quiz from '../components/Quiz/Quiz'
import { quiz } from '../data/chapter1'
import './sections.css'

export default function QuizSection() {
  return (
    <section className="section section--paper" id="quiz" aria-labelledby="quiz-title">
      <div className="container">
        <h2 className="section-title" id="quiz-title">
          {quiz.title}
        </h2>
        <span className="gold-rule" aria-hidden="true" />
        {/* מרג'ין לוגי ולא פיזי: ב-RTL הפסקה נצמדת לימין והשארית נבלעת משמאל */}
        <p className="lead" style={{ maxWidth: '760px', marginInline: '0 auto', marginBottom: '34px' }}>
          {quiz.intro}
        </p>
        <Quiz />
      </div>
    </section>
  )
}
