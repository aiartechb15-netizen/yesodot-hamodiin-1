import Hero from '../components/Hero/Hero'
import TopicCards from '../components/TopicCards/TopicCards'
import useDocumentTitle from '../hooks/useDocumentTitle'

/* דף הבית — Hero וכרטיסי הפרקים בלבד.
   אין כאן hasMotif: מסך בחירת הפרקים מוחרג ממנגנון גיליונות הרקע,
   והרקע שלו אחיד. */
export default function HomePage() {
  useDocumentTitle('יסודות המודיעין — קורס מתוקשב')

  return (
    <main id="main">
      <Hero />
      <TopicCards />
    </main>
  )
}
