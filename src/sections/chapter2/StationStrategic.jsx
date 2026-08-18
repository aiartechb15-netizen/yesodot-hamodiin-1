import { useId, useState } from 'react'
import Icon from '../../components/Icons/Icons'
import IdentityCard from '../../components/IdentityCard/IdentityCard'
import { strategic } from '../../data/chapter2'
import './chapter2.css'

function Products() {
  const uid = useId()
  const [open, setOpen] = useState(null)

  return (
    <ul className="products">
      {strategic.products.map((p) => {
        const isOpen = open === p.id
        return (
          <li key={p.id}>
            <article className={`product${isOpen ? ' is-open' : ''}`}>
              <button
                type="button"
                className="product__btn"
                aria-expanded={isOpen}
                aria-controls={`${uid}-${p.id}`}
                onClick={() => setOpen(isOpen ? null : p.id)}
              >
                <span className="product__icon">
                  <Icon name={p.icon} size={26} />
                </span>
                <span className="product__title">{p.title}</span>
                <span className="gold-rule gold-rule--sm" aria-hidden="true" />
                {!isOpen ? <span className="product__cue">לחשיפת התוצר</span> : null}
              </button>
              <div className="product__panel" id={`${uid}-${p.id}`} hidden={!isOpen}>
                <p className="product__text">{p.text}</p>
                {p.linkTo ? (
                  <a className="product__link" href={p.linkTo}>
                    {p.linkLabel}
                  </a>
                ) : null}
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}

export default function StationStrategic() {
  return (
    <section className="section section--white" id={strategic.id} aria-labelledby="ch2-strategic-title">
      <div className="container">
        <header className="st__head">
          <h2 className="section-title" id="ch2-strategic-title">
            {strategic.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        <div className="st__blocks">
          <IdentityCard data={strategic} tone="teal" />

          <div>
            <h3 className="block__title">{strategic.productsTitle}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="st__hint">{strategic.productsHint}</p>
            <div style={{ marginTop: '18px' }}>
              <Products />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
