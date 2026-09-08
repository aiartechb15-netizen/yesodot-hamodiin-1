import { useState } from 'react'
import Icon from '../components/Icons/Icons'
import { byPurpose } from '../data/chapter1'
import './sections.css'

/* שתי קשתות זהב דקות בין שתי האפשרויות — רמז למעבר ביניהן,
   ולא קו מפריד ולא תרשים. */
function Arcs() {
  return (
    <span className="purpose__arcs" aria-hidden="true">
      <svg viewBox="0 0 56 240" fill="none" focusable="false">
        <path d="M10 26c30 42 30 146 0 188" stroke="currentColor" strokeWidth="1" />
        <path d="M28 62c20 26 20 90 0 116" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </svg>
    </span>
  )
}

/* "מודיעין לפי ייעוד" — שתי אפשרויות על רקע פתוח, בלי כרטיסים, בלי
   מסגרות ובלי הקו האנכי שהפריד ביניהן. אפשרות אחת פתוחה בכל רגע;
   "מודיעין חיובי" פתוח בכניסה למסך. */
export default function ByPurpose() {
  const [open, setOpen] = useState(byPurpose.items[0].id)

  return (
    <section className="section section--white byPurpose" id="by-purpose" aria-labelledby="by-purpose-title">
      <div className="container">
        <h2 className="section-title" id="by-purpose-title">
          {byPurpose.title}
        </h2>
        <span className="gold-rule" aria-hidden="true" />

        <div className={`purpose purpose--${open}`}>
          {byPurpose.items.map((item, i) => {
            const isOpen = item.id === open
            return (
              <div className="purpose__slot" key={item.id}>
                {/* הקשתות יושבות בין שתי האפשרויות */}
                {i === 1 ? <Arcs /> : null}

                <article className={`popt${isOpen ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="popt__btn"
                    aria-expanded={isOpen}
                    aria-controls={`purpose-${item.id}`}
                    onClick={() => setOpen(item.id)}
                  >
                    <span className="popt__icon" aria-hidden="true">
                      <Icon name={item.icon} size={isOpen ? 34 : 28} />
                    </span>
                    <span className="popt__head">
                      <span className="popt__title">{item.title}</span>
                      <span className="popt__cue">{byPurpose.hint}</span>
                    </span>
                  </button>

                  <div className="popt__panel" id={`purpose-${item.id}`}>
                    <div className="popt__panelInner">
                      <span className="gold-rule gold-rule--sm" aria-hidden="true" />
                      <p className="popt__text">{item.text}</p>
                      <p className="popt__example">
                        <span className="term">{item.examplesLabel}: </span>
                        {item.examples}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
