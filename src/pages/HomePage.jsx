import Hero from '../components/Hero/Hero'
import TopicCards from '../components/TopicCards/TopicCards'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { motifStyle } from '../data/backgrounds'

// דף הבית של הקורס — Hero וכרטיסי הפרקים בלבד.
export default function HomePage() {
  useDocumentTitle('יסודות המודיעין — קורס מתוקשב')

  return (
    <main id="main" className="hasMotif" style={motifStyle('home')}>
      <Hero />
      <TopicCards />
    </main>
  )
}
