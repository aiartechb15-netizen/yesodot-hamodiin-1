import { Link } from 'react-router-dom'
import ImagePlaceholder from '../components/ImagePlaceholder/ImagePlaceholder'
import { nextLesson } from '../data/chapter1'
import './sections.css'

export default function NextLesson() {
  return (
    <section className="section section--white" id="next-lesson" aria-labelledby="next-lesson-title">
      <div className="container">
        <div className="next">
          <div className="next__media">
            <ImagePlaceholder label={nextLesson.image} motif={nextLesson.imageMotif} />
          </div>
          <div className="next__body">
            <h2 className="next__title" id="next-lesson-title">
              {nextLesson.title}
            </h2>
            <span className="gold-rule gold-rule--sm gold-rule--center" aria-hidden="true" />
            <p className="next__text">{nextLesson.text}</p>
            <Link className="btn" to={nextLesson.ctaTo}>
              {nextLesson.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
