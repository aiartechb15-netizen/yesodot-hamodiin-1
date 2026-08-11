import Hero from '../components/Hero/Hero'
import TopicCards from '../components/TopicCards/TopicCards'

// דף הבית של הקורס — Hero וכרטיסי הפרקים בלבד.
export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <TopicCards />
    </main>
  )
}
