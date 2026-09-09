import Icon from '../components/Icons/Icons'
import './VideoSection.css'

/* מסך סרטון הפתיחה של הפרק.
   האזור הזה הוא מסך אחד שלם ולא כרטיס בתוך דף. אין כאן שכבת איורים
   משלו: הרקע היחיד של המסך הוא גיליון הרקע הרציף של הפרק.

   purpose — אופציונלי: { title, text }. כשהוא נמסר, מטרת הפרק יושבת
   באותו מסך, ישירות מתחת לסרטון ובאותו רוחב עמודה בדיוק, כך שהשניים
   נקראים כיחידה אחת ולא כשני אזורים. בלעדיו המסך נשאר כשהיה —
   הסרטון הוא כל התוכן. */

const PURPOSE_TITLE_ID = 'vstage-purpose-title'

export default function VideoSection({ video, title, purpose, background = 'section--cream' }) {
  return (
    <section
      className={`section vstage ${background}`}
      id={video.id}
      {...(purpose
        ? { 'aria-labelledby': PURPOSE_TITLE_ID }
        : { 'aria-label': title || video.title })}
    >
      <div className="container vstage__inner">
        {/* השם הנגיש נמסר על ה-figure עצמו, כי הוא אינו הכותרת של המסך */}
        <figure className="vstage__video" role="img" aria-label={`${video.title} — ${video.note}`}>
          <div className="vstage__frame">
            <span className="vstage__play">
              <Icon name="play" size={34} />
            </span>
          </div>
        </figure>

        {purpose ? (
          <div className="vstage__purpose">
            <h2 className="vstage__purposeTitle" id={PURPOSE_TITLE_ID}>
              {purpose.title}
            </h2>
            <span className="gold-rule" aria-hidden="true" />
            <p className="vstage__purposeText">{purpose.text}</p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
