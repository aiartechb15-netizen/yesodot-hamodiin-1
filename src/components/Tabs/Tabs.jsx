import { useId, useRef, useState } from 'react'
import Icon from '../Icons/Icons'
import './Tabs.css'

/**
 * לשוניות נגישות עם ניווט במקלדת (חצים מותאמים ל־RTL).
 * tabs: [{ id, title | tab, icon? }]
 * renderPanel: (tab) => node
 */
export default function Tabs({ tabs, renderPanel, ariaLabel, className = '' }) {
  const uid = useId()
  const [active, setActive] = useState(tabs[0].id)
  const refs = useRef({})

  const onKeyDown = (e) => {
    const idx = tabs.findIndex((t) => t.id === active)
    let next = null
    // ב־RTL: "שמאלה" מתקדם ברשימה, "ימינה" חוזר אחורה
    if (e.key === 'ArrowLeft') next = (idx + 1) % tabs.length
    else if (e.key === 'ArrowRight') next = (idx - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    if (next === null) return
    e.preventDefault()
    const id = tabs[next].id
    setActive(id)
    refs.current[id]?.focus()
  }

  const activeTab = tabs.find((t) => t.id === active)

  return (
    <div className={`tabs ${className}`}>
      <div className="tabs__list" role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown}>
        {tabs.map((t) => (
          <button
            key={t.id}
            ref={(el) => (refs.current[t.id] = el)}
            className={`tabs__tab${t.id === active ? ' is-active' : ''}`}
            role="tab"
            type="button"
            id={`${uid}-${t.id}-tab`}
            aria-selected={t.id === active}
            aria-controls={`${uid}-${t.id}-panel`}
            tabIndex={t.id === active ? 0 : -1}
            onClick={() => setActive(t.id)}
          >
            {t.icon ? <Icon name={t.icon} size={20} /> : null}
            <span>{t.tab || t.title}</span>
          </button>
        ))}
      </div>
      <div
        className="tabs__panel"
        role="tabpanel"
        id={`${uid}-${activeTab.id}-panel`}
        aria-labelledby={`${uid}-${activeTab.id}-tab`}
        tabIndex={0}
      >
        {renderPanel(activeTab)}
      </div>
    </div>
  )
}
