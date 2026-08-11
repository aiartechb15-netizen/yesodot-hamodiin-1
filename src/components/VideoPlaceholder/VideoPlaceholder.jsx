import Icon from '../Icons/Icons'
import './VideoPlaceholder.css'

export default function VideoPlaceholder({ video }) {
  return (
    <figure className="video" role="img" aria-label={`${video.placeholder} — ${video.note}`}>
      <div className="video__frame">
        <span className="video__play" aria-hidden="true">
          <Icon name="play" size={30} />
        </span>
        <h3 className="video__title">{video.title}</h3>
        <p className="video__note">{video.note}</p>
        <span className="video__ph">{video.placeholder}</span>
      </div>
      <figcaption className="video__caption">{video.detail}</figcaption>
    </figure>
  )
}
