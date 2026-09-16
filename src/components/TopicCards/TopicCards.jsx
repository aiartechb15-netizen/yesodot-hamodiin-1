import { Link } from 'react-router-dom'
import { topicCards } from '../../data/chapter1'
import './TopicCards.css'

/* שלוש הכניסות לקורס. כל כרטיס הוא מלבן אופקי החצוי לשניים בדיוק
   לרוחבו: מימין אזור לבן שבו מספר הפרק ושמו בלבד, ומשמאל התצלום
   בתוך ריפוד קטן כדי שלא ייגע במסגרת.
   אין CTA פנימי ואין חץ: הכרטיס כולו הוא הקישור, ולכן סימן פעולה
   נוסף היה כפילות של מה שכבר קיים בכל שטחו. */
export default function TopicCards() {
  return (
    <section className="section section--plain" id="topics" aria-label="פרקי הקורס">
      <div className="container">
        <ul className="topics">
          {topicCards.map((card) => {
            const body = (
              <>
                <div className="topic__media">
                  <img
                    className="topic__img"
                    src={card.src}
                    alt={card.alt}
                    loading="lazy"
                    style={{ objectPosition: card.position, filter: card.filter }}
                  />
                  {/* הצללה רכה בתחתית התצלום בלבד — היא מתחילה מתחת
                      לאמצעו ומתחזקת בהדרגה, ולכן אין קו מפגש חד */}
                  <span className="topic__shade" aria-hidden="true" />
                </div>
                <div className="topic__body">
                  <span className="topic__kicker">{card.caption}</span>
                  <h3 className="topic__title">{card.title}</h3>
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
