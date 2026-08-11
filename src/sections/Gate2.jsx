import { useEffect, useState } from 'react'
import VideoPlaceholder from '../components/VideoPlaceholder/VideoPlaceholder'
import { gate2, videos } from '../data/chapter1'
import './sections.css'

const STORAGE_KEY = 'ch1-reflection'

export default function Gate2() {
  const [value, setValue] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(STORAGE_KEY)
      if (v) {
        setValue(v)
        setSaved(true)
      }
    } catch {
      /* אחסון מקומי אינו זמין */
    }
  }, [])

  const onChange = (e) => {
    setValue(e.target.value)
    try {
      window.localStorage.setItem(STORAGE_KEY, e.target.value)
      setSaved(e.target.value.trim().length > 0)
    } catch {
      /* אחסון מקומי אינו זמין */
    }
  }

  return (
    <section className="section section--white" id="gate-2" aria-labelledby="gate-2-title">
      <div className="container">
        <header className="gateHead">
          <span className="gateHead__num">
            {gate2.number} — {gate2.title}
          </span>
          <h2 className="section-title" id="gate-2-title">
            {gate2.headline}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead" style={{ maxWidth: '860px' }}>
            {gate2.paragraph}
          </p>
        </header>

        <div style={{ maxWidth: '900px' }}>
          <VideoPlaceholder video={videos.history} />
        </div>

        <div className="reflect">
          <span className="kicker">{gate2.reflection.label}</span>
          <p className="reflect__q">
            <label htmlFor="reflection">{gate2.reflection.question}</label>
          </p>
          <textarea
            id="reflection"
            className="reflect__area"
            value={value}
            onChange={onChange}
            placeholder={gate2.reflection.placeholder}
          />
          {saved ? <span className="reflect__saved">{gate2.reflection.saved}</span> : null}
        </div>
      </div>
    </section>
  )
}
