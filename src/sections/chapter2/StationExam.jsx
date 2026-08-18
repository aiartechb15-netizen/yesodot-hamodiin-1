import Quiz from '../../components/Quiz/Quiz'
import { exam } from '../../data/chapter2'
import './chapter2.css'

export default function StationExam() {
  return (
    <section className="section section--paper" id={exam.id} aria-labelledby="ch2-exam-title">
      <div className="container">
        <header className="st__head">
          <h2 className="section-title section-title--center" id="ch2-exam-title">
            {exam.title}
          </h2>
          <span className="gold-rule gold-rule--center" aria-hidden="true" />
          <p className="lead" style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
            {exam.intro}
          </p>
        </header>

        <Quiz data={exam} />
      </div>
    </section>
  )
}
