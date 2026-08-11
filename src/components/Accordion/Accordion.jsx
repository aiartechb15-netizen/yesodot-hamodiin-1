import { useId, useState } from 'react'
import Icon from '../Icons/Icons'
import './Accordion.css'

export default function Accordion({ items, allowMultiple = true, onOpen, className = '' }) {
  const uid = useId()
  const [open, setOpen] = useState([])

  const toggle = (id) => {
    setOpen((prev) => {
      const isOpen = prev.includes(id)
      if (isOpen) return prev.filter((x) => x !== id)
      if (onOpen) onOpen(id)
      return allowMultiple ? [...prev, id] : [id]
    })
  }

  return (
    <div className={`acc ${className}`}>
      {items.map((item) => {
        const isOpen = open.includes(item.id)
        const btnId = `${uid}-${item.id}-btn`
        const panelId = `${uid}-${item.id}-panel`
        return (
          <div className={`acc__item${isOpen ? ' is-open' : ''}`} key={item.id}>
            <h3 className="acc__heading">
              <button
                className="acc__btn"
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                {item.icon ? <Icon name={item.icon} size={22} className="acc__icon" /> : null}
                <span className="acc__title">{item.title2 || item.title}</span>
                <Icon name="chevron" size={20} className="acc__chev" />
              </button>
            </h3>
            <div className="acc__panel" id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen}>
              <div className="acc__panelInner">
                <p>{item.text}</p>
                {item.examples ? (
                  <p className="acc__example">
                    <span className="term">{item.examplesLabel || 'דוגמאות'}: </span>
                    {item.examples}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
