import Icon from '../Icons/Icons'
import { stationNav, stations } from '../../data/chapter2'
import './StationNav.css'

/** ניווט בין תחנות הפרק — קודמת / הבאה + מיקום נוכחי. */
export default function StationNav({ current }) {
  const i = stations.findIndex((s) => s.station === current)
  const prev = i > 0 ? stations[i - 1] : null
  const next = i < stations.length - 1 ? stations[i + 1] : null

  return (
    <nav className="snav" aria-label="ניווט בין תחנות הפרק">
      <div className="snav__side">
        {prev ? (
          <a className="snav__link" href={`#${prev.id}`}>
            <Icon name="chevron" size={18} className="snav__chev snav__chev--prev" />
            <span className="snav__labels">
              <span className="snav__kicker">{stationNav.prev}</span>
              <span className="snav__title">{prev.label}</span>
            </span>
          </a>
        ) : null}
      </div>

      <span className="snav__position">{stationNav.ofLabel(current, stations.length)}</span>

      <div className="snav__side snav__side--end">
        {next ? (
          <a className="snav__link snav__link--next" href={`#${next.id}`}>
            <span className="snav__labels">
              <span className="snav__kicker">{stationNav.next}</span>
              <span className="snav__title">{next.label}</span>
            </span>
            <Icon name="chevron" size={18} className="snav__chev snav__chev--next" />
          </a>
        ) : null}
      </div>
    </nav>
  )
}
