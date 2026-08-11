import { useEffect, useState } from 'react'
import { railSections } from '../../data/chapter1'
import './SectionProgress.css'

export default function SectionProgress({ sections = railSections, label = 'מסלול התקדמות בפרק' }) {
  const [activeId, setActiveId] = useState(sections[0].id)

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35
      let current = sections[0].id
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= line) current = s.id
      }
      setActiveId(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sections])

  const activeIndex = sections.findIndex((s) => s.id === activeId)

  return (
    <nav className="rail" aria-label={label}>
      <span className="rail__line" aria-hidden="true" />
      <ul className="rail__list">
        {sections.map((s, i) => {
          const state = i === activeIndex ? 'is-active' : i < activeIndex ? 'is-done' : ''
          return (
            <li key={s.id} className="rail__item">
              <a
                className={`rail__dot ${state}`}
                href={`#${s.id}`}
                aria-current={i === activeIndex ? 'true' : undefined}
                aria-label={`${s.label} — מקטע ${i + 1} מתוך ${sections.length}`}
              >
                <span className="ltr-num" aria-hidden="true">
                  {i + 1}
                </span>
              </a>
              <span className="rail__tip">{s.label}</span>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
