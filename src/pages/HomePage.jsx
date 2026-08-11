import Hero from '../components/Hero/Hero'
import TopicCards from '../components/TopicCards/TopicCards'
import useDocumentTitle from '../hooks/useDocumentTitle'

// דף הבית של הקורס — Hero וכרטיסי הפרקים בלבד.
export default function HomePage() {
  useDocumentTitle('יסודות המודיעין — קורס מתוקשב')

  return (
    <main id="main">
      <Hero />
      <TopicCards />
    </main>
  )
}
