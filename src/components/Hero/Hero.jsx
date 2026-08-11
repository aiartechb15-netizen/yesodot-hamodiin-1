import { Link } from 'react-router-dom'
import { hero } from '../../data/chapter1'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero__textInner">
        <h1 className="hero__title" id="hero-title">
          {hero.titleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <span className="gold-rule" aria-hidden="true" />
        <p className="hero__tagline">{hero.tagline}</p>
        <p className="hero__lead">
          {hero.lead.split('\n').map((line, i, all) => (
            <span key={i}>
              {line}
              {i < all.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
        <Link className="btn hero__cta" to={hero.ctaTo}>
          {hero.cta}
        </Link>
      </div>
    </section>
  )
}
