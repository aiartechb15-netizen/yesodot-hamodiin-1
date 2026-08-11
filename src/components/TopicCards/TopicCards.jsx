import { Link } from 'react-router-dom'
import { topicCards } from '../../data/chapter1'
import './TopicCards.css'

export default function TopicCards() {
  return (
    <section className="section section--white" id="topics" aria-label="פרקי הקורס">
      <div className="container">
        <ul className="topics">
          {topicCards.map((card) => {
            const body = (
              <>
                <div className="topic__media">
                  <img className="topic__img" src={card.src} alt={card.alt} loading="lazy" />
                </div>
                <div className="topic__body">
                  <h3 className="topic__title">{card.title}</h3>
                  <span className="gold-rule gold-rule--sm gold-rule--center" aria-hidden="true" />
                  <span className="topic__caption">{card.caption}</span>
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
