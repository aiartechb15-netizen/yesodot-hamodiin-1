import VideoPlaceholder from '../components/VideoPlaceholder/VideoPlaceholder'
import { gate2, videos } from '../data/chapter1'
import './sections.css'

export default function Gate2() {
  return (
    <section className="section section--white" id="gate-2" aria-labelledby="gate-2-title">
      <div className="container">
        <header className="gateHead">
          <h2 className="section-title" id="gate-2-title">
            {gate2.headline}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead" style={{ maxWidth: '860px' }}>
            {gate2.paragraph}
          </p>
        </header>

        <div className="videoWrap">
          <VideoPlaceholder video={videos.history} />
        </div>
      </div>
    </section>
  )
}
