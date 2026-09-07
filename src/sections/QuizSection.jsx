import Quiz from '../components/Quiz/Quiz'
import { quiz } from '../data/chapter1'
import './sections.css'
import BackgroundDecor from '../components/BackgroundDecor/BackgroundDecor'

export default function QuizSection() {
  return (
    <section className="section section--paper" id="quiz" aria-labelledby="quiz-title">
      <BackgroundDecor variant="grid" />
      <div className="container">
        <h2 className="section-title section-title--center" id="quiz-title">
          {quiz.title}
        </h2>
        <span className="gold-rule gold-rule--center" aria-hidden="true" />
        <p className="lead" style={{ maxWidth: '760px', margin: '0 auto 34px', textAlign: 'center' }}>
          {quiz.intro}
        </p>
        <Quiz />
      </div>
    </section>
  )
}
