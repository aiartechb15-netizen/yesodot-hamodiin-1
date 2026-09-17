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

        {/* עמודה אחת בצד שמאל: שורת הקרדיטים, ומתחתיה שורת יצירת הקשר.
            העטיפה נוספה כדי שהשתיים ייערמו זו מתחת לזו ויישארו פריט
            אחד ב-flex של הפוטר — בלי לשנות את סדר שאר האלמנטים. */}
        <div className="ftr__end">
          {/* שורה אחת: כותרת, מפריד אנכי עדין, ואחריו שם היוצרת */}
          <div className="ftr__credits">
            <span className="ftr__creditsTitle">{footer.credits.title}</span>
            <span className="ftr__creditsSep" aria-hidden="true" />
            <span className="ftr__creditsName">{footer.credits.text}</span>
          </div>

          {/* המספר עטוף ב-dir="ltr" כדי שהספרות והמקפים יוצגו בסדר
              שבו הם נכתבים, בתוך משפט עברי שכיוונו ימין-לשמאל. */}
          <a className="ftr__contact" href={footer.contact.href}>
            {footer.contact.label} <span dir="ltr">{footer.contact.phone}</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
