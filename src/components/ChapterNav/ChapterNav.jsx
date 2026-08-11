import { useEffect, useState } from 'react'
import Icon from '../Icons/Icons'
import './ChapterNav.css'

/**
 * סרגל ניווט דביק לתחנות הפרק: שם התחנה הנוכחית, מיקום בפרק וכפתורי הקודם/הבא.
 * אינו מציג אחוזי התקדמות בקורס.
 */
export default function ChapterNav({ stations, labels }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35
      let current = 0
      stations.forEach((s, i) => {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= line) current = i
      })
      setIndex(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [stations])

  const current = stations[index]
  const prev = index > 0 ? stations[index - 1] : null
  const next = index < stations.length - 1 ? stations[index + 1] : null
  const pct = ((index + 1) / stations.length) * 100

  return (
    <nav className="cnav" aria-label={labels.ariaLabel}>
      <div className="cnav__inner container">
        <a
          className={`cnav__arrow${prev ? '' : ' is-disabled'}`}
          href={prev ? `#${prev.id}` : undefined}
          aria-disabled={prev ? undefined : 'true'}
          tabIndex={prev ? undefined : -1}
        >
          <Icon name="chevron" size={18} className="cnav__chev cnav__chev--prev" />
          <span>{labels.prev}</span>
        </a>

        <div className="cnav__current" aria-live="polite">
          <span className="cnav__name">{current.label}</span>
          <span className="cnav__sep" aria-hidden="true">
            •
          </span>
          <span className="cnav__pos ltr-num">
            {labels.position(current.station, stations.length)}
          </span>
        </div>

        <a
          className={`cnav__arrow cnav__arrow--next${next ? '' : ' is-disabled'}`}
          href={next ? `#${next.id}` : undefined}
          aria-disabled={next ? undefined : 'true'}
          tabIndex={next ? undefined : -1}
        >
          <span>{labels.next}</span>
          <Icon name="chevron" size={18} className="cnav__chev cnav__chev--next" />
        </a>
      </div>
      <span className="cnav__track" aria-hidden="true">
        <span className="cnav__fill" style={{ width: `${pct}%` }} />
      </span>
    </nav>
  )
}
