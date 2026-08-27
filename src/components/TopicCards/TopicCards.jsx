import { Link } from 'react-router-dom'
import { topicCards } from '../../data/chapter1'
import './TopicCards.css'

/* שלוש הכניסות לקורס. כל כרטיס הוא תצלום שממלא אותו לרוחבו ולגובהו,
   ומעליו מסך קרמי שנפתח מימין — שם יושב הטקסט. אין אזור לבן נפרד
   מתחת לתמונה: התצלום, המעבר והטקסט הם משטח אחד.
   אין CTA פנימי: הכרטיס כולו הוא הקישור, ולכן "לפרק ←" היה כפילות
   של פעולה שכבר קיימת בכל שטחו. */
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
