import { useEffect, useRef } from 'react'

import logo from './assets/logo.png'
import openerImage from './assets/opener.jpg'
import chapter1Image from './assets/chapter-1.jpg'
import chapter2Image from './assets/chapter-2.jpg'
import chapter3Image from './assets/chapter-3.jpg'

import './landing.css'

/* כל הטקסטים והקישורים של דף הנחיתה במקום אחד.
   כדי לחבר את הכרטיסים לעמודים בפרויקט החדש — לשנות כאן את to. */
const content = {
  brand: 'יסודות המודיעין',
  home: '/',
  hero: {
    // הכותרת מודפסת בתוך התצלום; כאן היא קיימת לקוראי מסך בלבד
    title: 'יסודות המודיעין',
    cta: 'התחלת הקורס',
  },
  cards: [
    {
      id: 'topic-1',
      title: 'מהו מודיעין',
      caption: 'פרק 1',
      to: '/chapter/what-is-intelligence',
      src: chapter1Image,
      alt: 'שולחן עבודה מודיעיני: מפה, זכוכית מגדלת, תיק מסמכים, משקפת ומסך נתונים',
    },
    {
      id: 'topic-2',
      title: 'לאומי־אסטרטגי',
      caption: 'פרק 2',
      to: '/chapter/national-strategic',
      src: chapter2Image,
      alt: 'כדור הארץ בלילה מן החלל, אורות ערים ורשת נתונים',
    },
    {
      id: 'topic-3',
      title: 'אופרטיבי־טקטי',
      caption: 'פרק 3',
      to: '/chapter/operational-tactical',
      src: chapter3Image,
      alt: 'שני לוחמים בתצפית על עמק, רחפן מעליהם ומסך שטח בידיהם',
    },
  ],
  footer: {
    title: 'יסודות המודיעין',
    tagline: 'קורס מתוקשב — רמות ותכליות המודיעין',
    credits: { title: 'קרדיטים', text: 'יוצרת האתר - הודיה בן גיגי' },
  },
}

const TOPICS_ANCHOR = '#topics'
const TOPICS_ID = 'topics'

/* אורך הגלילה. ארוך מברירת המחדל של הדפדפן בכוונה: המסך הראשון גבוה,
   וגלילה מהירה מדי נקראת כקפיצה במקום כמעבר. */
const SCROLL_MS = 900

/* ease-in-out — יציאה רכה מהמנוחה, האטה רכה ביעד */
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

function BookIcon({ size = 22 }) {
  const p = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path {...p} d="M4 5.5h5.5A2.5 2.5 0 0 1 12 8v11a2.2 2.2 0 0 0-2.2-2H4z" />
      <path {...p} d="M20 5.5h-5.5A2.5 2.5 0 0 0 12 8v11a2.2 2.2 0 0 1 2.2-2H20z" />
    </svg>
  )
}

function Header() {
  return (
    <header className="hdr">
      <div className="hdr__inner">
        <a className="hdr__brand" href={content.home}>
          <BookIcon size={22} />
          <span className="hdr__brandText">{content.brand}</span>
        </a>
        <img className="hdr__logo" src={logo} alt="ארטק" />
      </div>
    </header>
  )
}

/* מסך הפתיחה הוא תצלום העיצוב עצמו: הכותרת והטקסט מודפסים בתוכו.
   ההמשך אל הפרקים נעשה בחץ שבתחתית המסך — רמז ולא קריאה לפעולה.
   החץ נשאר עוגן אמיתי, כדי שיעבוד גם בלי JS, בפתיחה בלשונית חדשה,
   וכשהמשתמש ביקש להפחית תנועה. */
function Hero() {
  const frame = useRef(0)

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const goToTopics = (event) => {
    const target = document.getElementById(TOPICS_ID)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // בלי יעד או כשהתנועה מופחתת — נותנים לעוגן לעשות את עבודתו, מיידית
    if (!target || reducedMotion) return

    event.preventDefault()

    // אותו קיזוז שהדפדפן נותן לעוגנים: scroll-padding של העמוד ועוד
    // ה-scroll-margin של היעד. בלי החיבור הזה הגלילה נעצרת 16px מוקדם
    // מדי, ורצועה מתחתית מסך הפתיחה נשארת גלויה מתחת ל-Header
    const styles = getComputedStyle(document.documentElement)
    const offset =
      (parseFloat(styles.scrollPaddingTop) || 0) +
      (parseFloat(getComputedStyle(target).scrollMarginTop) || 0)
    const start = window.scrollY
    const end = Math.min(
      target.getBoundingClientRect().top + start - offset,
      document.documentElement.scrollHeight - window.innerHeight,
    )

    cancelAnimationFrame(frame.current)
    let t0 = null

    const step = (now) => {
      if (t0 === null) t0 = now
      const progress = Math.min((now - t0) / SCROLL_MS, 1)
      // 'instant' ולא ברירת המחדל: בלעדיו כל פריים היה נכנס לגלילה
      // חלקה משלו בגלל scroll-behavior: smooth הגלובלי, והשתיים היו
      // נאבקות זו בזו
      window.scrollTo({ top: start + (end - start) * ease(progress), behavior: 'instant' })
      if (progress < 1) {
        frame.current = requestAnimationFrame(step)
      } else {
        window.history.replaceState(null, '', TOPICS_ANCHOR)
      }
    }

    frame.current = requestAnimationFrame(step)
  }

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <h1 className="sr-only" id="hero-title">
        {content.hero.title}
      </h1>

      <div className="hero__frame">
        <img className="hero__img" src={openerImage} alt="" />
      </div>

      {/* רמז להמשך: חץ בתחתית המסך, מחוץ למסגרת התמונה כדי שיישאר
          במרכז המסך ובמרחק קבוע מתחתיתו בכל רזולוציה */}
      <a
        className="hero__down"
        href={TOPICS_ANCHOR}
        aria-label={content.hero.cta}
        onClick={goToTopics}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="m6 9.5 6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  )
}

/* שלוש הכניסות לקורס. כל כרטיס הוא תצלום שממלא אותו לרוחבו ולגובהו,
   ומעליו מסך קרמי שנפתח מימין — שם יושב הטקסט. אין אזור לבן נפרד
   מתחת לתמונה: התצלום, המעבר והטקסט הם משטח אחד. */
function TopicCards() {
  return (
    <section className="section section--white" id="topics" aria-label="פרקי הקורס">
      <div className="container">
        <ul className="topics">
          {content.cards.map((card) => (
            <li key={card.id}>
              <a className="topic" href={card.to}>
                {/* object-position בקוד ולא בנתונים: החלק הגלוי של התצלום
                    הוא הצד השמאלי של הכרטיס, ולכן המסגרת מוסטת ימינה
                    בתוך התצלום כדי שהנושא ייפול באזור הפתוח */}
                <img className="topic__img" src={card.src} alt={card.alt} loading="lazy" />
                <span className="topic__veil" aria-hidden="true" />
                <div className="topic__body">
                  <span className="topic__kicker">{card.caption}</span>
                  <h3 className="topic__title">{card.title}</h3>
                  <span className="gold-rule gold-rule--sm" aria-hidden="true" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Footer() {
  const { title, tagline, credits } = content.footer
  return (
    <footer className="ftr">
      <div className="container ftr__inner">
        <div className="ftr__brand">
          <BookIcon size={24} />
          <div>
            <span className="ftr__title">{title}</span>
            <span className="ftr__tagline">{tagline}</span>
          </div>
        </div>

        {/* שורה אחת: כותרת, מפריד אנכי עדין, ואחריו שם היוצרת */}
        <div className="ftr__credits">
          <span className="ftr__creditsTitle">{credits.title}</span>
          <span className="ftr__creditsSep" aria-hidden="true" />
          <span className="ftr__creditsName">{credits.text}</span>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        דילוג לתוכן הראשי
      </a>
      <Header />
      <main id="main">
        <Hero />
        <TopicCards />
      </main>
      <Footer />
    </>
  )
}
