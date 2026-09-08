import { Link } from 'react-router-dom'
import Icon from '../Icons/Icons'
import './NextChapter.css'

/** מעבר מסודר בין פרקי הקורס — נשמר אחיד בכל הפרקים. */
export default function NextChapter({ kicker, title, text, cta, to }) {
  return (
    <section className="section section--white nextch" aria-labelledby="nextch-title">
      <div className="container">
        <div className="nextch__card">
          <span className="nextch__icon" aria-hidden="true">
            <Icon name="bookOpen" size={26} />
          </span>
          <span className="kicker">{kicker}</span>
          <h2 className="nextch__title" id="nextch-title">
            {title}
          </h2>
          <span className="gold-rule gold-rule--sm gold-rule--center" aria-hidden="true" />
          <p className="nextch__text">{text}</p>
          <Link className="btn" to={to}>
            {cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
