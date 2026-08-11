import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../Icons/Icons'
import { course } from '../../data/chapter1'
import './Header.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (ch) => Boolean(ch.to) && pathname === ch.to

  return (
    <header className="hdr">
      <div className="hdr__inner container">
        <Link className="hdr__brand" to={course.homeHref}>
          <Icon name="bookOpen" size={26} />
          <span className="hdr__brandText">{course.title}</span>
        </Link>

        <nav className="hdr__nav" aria-label="פרקי הקורס">
          <ul className="hdr__list">
            {course.chapters.map((ch) => {
              const active = isActive(ch)
              const content = (
                <>
                  <span className="hdr__linkTitle">{ch.title}</span>
                  <span className="hdr__linkSub">{ch.subtitle}</span>
                </>
              )
              return (
                <li key={ch.id}>
                  {ch.to ? (
                    <Link
                      className={`hdr__link${active ? ' is-active' : ''}`}
                      to={ch.to}
                      aria-current={active ? 'page' : undefined}
                    >
                      {content}
                    </Link>
                  ) : (
                    <span className="hdr__link is-soon">{content}</span>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <span className="hdr__spacer" aria-hidden="true" />

        <button
          className="hdr__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="hdr-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={24} title={open ? 'סגירת התפריט' : 'פתיחת התפריט'} />
        </button>
      </div>

      <div id="hdr-mobile" className={`hdr__mobile${open ? ' is-open' : ''}`} hidden={!open}>
        <ul className="hdr__mobileList container">
          {course.chapters.map((ch) => {
            const active = isActive(ch)
            const content = (
              <>
                <span>{ch.title}</span>
                <span className="hdr__linkSub">{ch.subtitle}</span>
              </>
            )
            return (
              <li key={ch.id}>
                {ch.to ? (
                  <Link
                    className={`hdr__mobileLink${active ? ' is-active' : ''}`}
                    to={ch.to}
                    onClick={() => setOpen(false)}
                  >
                    {content}
                  </Link>
                ) : (
                  <span className="hdr__mobileLink is-soon">{content}</span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
