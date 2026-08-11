import VideoPlaceholder from '../components/VideoPlaceholder/VideoPlaceholder'
import './sections.css'

export default function VideoSection({ video, title, background = 'section--cream' }) {
  return (
    <section className={`section ${background}`} id={video.id} aria-labelledby={`${video.id}-title`}>
      <div className="container">
        <h2 className="section-title" id={`${video.id}-title`}>
          {title || video.title}
        </h2>
        <span className="gold-rule" aria-hidden="true" />
        <div style={{ maxWidth: '900px' }}>
          <VideoPlaceholder video={video} />
        </div>
      </div>
    </section>
  )
}
