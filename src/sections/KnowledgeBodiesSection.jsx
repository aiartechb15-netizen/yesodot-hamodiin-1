import KnowledgeBodies from '../components/KnowledgeBodies/KnowledgeBodies'
import { knowledgeBodies } from '../data/chapter1'
import './sections.css'

export default function KnowledgeBodiesSection() {
  return (
    <section className="section section--white" id="knowledge-bodies" aria-labelledby="knowledge-bodies-title">
      <div className="container">
        <h2 className="section-title" id="knowledge-bodies-title">
          {knowledgeBodies.title}
        </h2>
        <span className="gold-rule" aria-hidden="true" />
        <p className="lead" style={{ maxWidth: '840px', marginBottom: '34px' }}>
          {knowledgeBodies.intro}
        </p>
        <KnowledgeBodies />
      </div>
    </section>
  )
}
