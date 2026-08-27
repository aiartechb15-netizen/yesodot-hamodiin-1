import { Link } from 'react-router-dom'
import { topicCards } from '../../data/chapter1'
import './TopicCards.css'

/* חץ הכניסה לפרק — פונה שמאלה, כיוון ההתקדמות ב-RTL */
function Arrow() {
  return (
    <svg
      className="topic__arrow"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M19 12H6m0 0 5.5-5.5M6 12l5.5 5.5" />
    </svg>
  )
}

/* שלוש הכניסות לקורס. כל כרטיס הוא תצלום שממלא אותו לרוחבו ולגובהו,
   ומעליו מסך קרמי שנפתח מימין — שם יושב הטקסט. אין אזור לבן נפרד
   מתחת לתמונה: התצלום, המעבר והטקסט הם משטח אחד. */
export default function TopicCards() {
  return (
    <section className="section section--white" id="topics" aria-label="פרקי הקורס">
      <div className="container">
        <ul className="topics">
          {topicCards.map((card) => {
            const body = (
              <>
                {/* object-position בקוד ולא בנתונים: החלק הגלוי של התצלום
                    הוא הצד השמאלי של הכרטיס, ולכן המסגרת מוסטת ימינה
                    בתוך התצלום כדי שהנושא ייפול באזור הפתוח */}
                <img
                  className="topic__img"
                  src={card.src}
                  alt={card.alt}
                  loading="lazy"
                  style={{ filter: card.filter }}
                />
                <span className="topic__veil" aria-hidden="true" />
                <div className="topic__body">
                  <span className="topic__kicker">{card.caption}</span>
                  <h3 className="topic__title">{card.title}</h3>
                  <span className="gold-rule gold-rule--sm" aria-hidden="true" />
                  {card.to ? (
                    <span className="topic__cta">
                      לפרק
                      <Arrow />
                    </span>
                  ) : null}
                </div>
              </>
            )
            return (
              <li key={card.id}>
                {card.to ? (
                  <Link className="topic" to={card.to}>
                    {body}
                  </Link>
                ) : (
                  <div className="topic topic--soon">{body}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
