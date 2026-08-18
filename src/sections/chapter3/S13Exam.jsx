import ExamStepper from '../../components/ExamStepper/ExamStepper'
import { exam } from '../../data/chapter3'
import './chapter3.css'

export default function S13Exam() {
  return (
    <section className="section section--paper" id={exam.id} aria-labelledby="ch3-exam-title">
      <div className="container">
        <header className="s3head" style={{ textAlign: 'center' }}>
          <h2 className="section-title" id="ch3-exam-title">
            {exam.title}
          </h2>
          <span className="gold-rule gold-rule--center" aria-hidden="true" />
          <p className="lead" style={{ maxWidth: '680px', margin: '0 auto' }}>
            {exam.intro}
          </p>
        </header>

        <ExamStepper exam={exam} />
      </div>
    </section>
  )
}
