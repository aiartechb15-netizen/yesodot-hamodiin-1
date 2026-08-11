import Tabs from '../Tabs/Tabs'
import { approaches } from '../../data/chapter1'
import './ResearchApproaches.css'

export default function ResearchApproaches() {
  return (
    <Tabs
      tabs={approaches.tabs}
      ariaLabel={approaches.title}
      className="approaches"
      renderPanel={(tab) => (
        <div className="approaches__panel">
          <div className="approaches__main card card--pad">
            <h3 className="card-title">{tab.title}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <div className="approaches__row">
              <span className="approaches__label">{approaches.labels.principle}</span>
              <p>{tab.principle}</p>
            </div>
            <div className="approaches__row">
              <span className="approaches__label">{approaches.labels.method}</span>
              <p>{tab.method}</p>
            </div>
          </div>
          <aside className="callout callout--example approaches__example">
            <span className="callout__label">{approaches.labels.example}</span>
            <p>{tab.example}</p>
          </aside>
        </div>
      )}
    />
  )
}
