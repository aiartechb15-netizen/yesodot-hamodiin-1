import KnowledgeFlow from '../components/KnowledgeFlow/KnowledgeFlow'
import { knowledgeFlow } from '../data/chapter1'
import './sections.css'

export default function KnowledgeFlowSection() {
  return (
    <section className="section section--cream" id="knowledge-flow" aria-labelledby="knowledge-flow-title">
      <div className="container">
        <h2 className="section-title" id="knowledge-flow-title">
          {knowledgeFlow.title}
        </h2>
        <span className="gold-rule" aria-hidden="true" />
        <p className="lead" style={{ maxWidth: '720px' }}>
          {knowledgeFlow.intro}
        </p>
        <div style={{ marginTop: '30px' }}>
          <KnowledgeFlow />
        </div>
      </div>
    </section>
  )
}
