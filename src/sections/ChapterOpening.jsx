import ImagePlaceholder from '../components/ImagePlaceholder/ImagePlaceholder'
import { KnowledgeFlowMini } from '../components/KnowledgeFlow/KnowledgeFlow'
import { chapterOpening } from '../data/chapter1'
import './sections.css'

export default function ChapterOpening() {
  return (
    <section className="section section--paper" id="chapter-open" aria-labelledby="chapter-open-title">
      <div className="container">
        <div className="split split--wideText">
          <div>
            <h2 className="section-title" id="chapter-open-title">
              {chapterOpening.title}
            </h2>
            <span className="gold-rule" aria-hidden="true" />
            <p className="lead">{chapterOpening.welcome}</p>
            {chapterOpening.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <div className="open__meta card card--pad">
              <h3 className="card-title">{chapterOpening.purposeTitle}</h3>
              <span className="gold-rule gold-rule--sm" aria-hidden="true" />
              <p>{chapterOpening.purpose}</p>

              <div className="open__outcomes">
                <h3 className="card-title">{chapterOpening.outcomesTitle}</h3>
                <ul className="open__list">
                  {chapterOpening.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="callout callout--teal open__meta">
              <span className="callout__label">{chapterOpening.navigationTitle}</span>
              <p>{chapterOpening.navigation}</p>
            </aside>
          </div>

          <div className="open__media">
            <ImagePlaceholder label={chapterOpening.image} motif={chapterOpening.imageMotif} ratio="4 / 5" />
          </div>
        </div>

        <div className="open__flow">
          <KnowledgeFlowMini />
        </div>
      </div>
    </section>
  )
}
