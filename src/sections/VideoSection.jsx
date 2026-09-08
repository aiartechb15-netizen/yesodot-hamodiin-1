import Icon from '../components/Icons/Icons'
import './VideoSection.css'

/* מסך סרטון הפתיחה של הפרק.
   האזור הזה הוא מסך אחד שלם ולא כרטיס בתוך דף: אין בו כותרת ואין בו
   טקסט הסבר — הסרטון הוא כל התוכן. אין כאן שכבת איורים משלו: הרקע
   היחיד של המסך הוא גיליון הרקע הרציף של הפרק. */

export default function VideoSection({ video, title, background = 'section--cream' }) {
  return (
    <section
      className={`section vstage ${background}`}
      id={video.id}
      aria-label={title || video.title}
    >
      <div className="container vstage__inner">
        {/* השם הנגיש נמסר על ה-figure עצמו, כי אין עוד כותרת גלויה */}
        <figure className="vstage__video" role="img" aria-label={`${video.title} — ${video.note}`}>
          <div className="vstage__frame">
            <span className="vstage__play">
              <Icon name="play" size={34} />
            </span>
          </div>
        </figure>
      </div>
    </section>
  )
}
