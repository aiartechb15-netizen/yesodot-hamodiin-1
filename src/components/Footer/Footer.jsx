import { useState } from 'react'
import Icon from '../Icons/Icons'
import { footer } from '../../data/chapter1'
import './Footer.css'

export default function Footer() {
  const [open, setOpen] = useState(false)

  return (
    <footer className="ftr">
      <div className="container ftr__inner">
        <div className="ftr__brand">
          <Icon name="bookOpen" size={24} />
          <div>
            <span className="ftr__title">{footer.title}</span>
            <span className="ftr__tagline">{footer.tagline}</span>
          </div>
        </div>

        <nav className="ftr__nav" aria-label="קישורים">
          <ul className="ftr__links">
            {footer.links.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container ftr__credits">
        <button
          className="ftr__creditsBtn"
          type="button"
          aria-expanded={open}
          aria-controls="ftr-credits-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name="chevron" size={18} className={open ? 'is-open' : ''} />
          <span>{footer.credits.title}</span>
        </button>
        <div id="ftr-credits-panel" className="ftr__creditsPanel" hidden={!open}>
          <p>{footer.credits.text}</p>
        </div>
      </div>
    </footer>
  )
}
