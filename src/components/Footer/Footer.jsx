import Icon from '../Icons/Icons'
import { footer } from '../../data/chapter1'
import './Footer.css'

export default function Footer() {
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

        <div className="ftr__credits">
          <span className="ftr__creditsTitle">{footer.credits.title}</span>
          <span className="ftr__creditsName">{footer.credits.text}</span>
        </div>
      </div>
    </footer>
  )
}
