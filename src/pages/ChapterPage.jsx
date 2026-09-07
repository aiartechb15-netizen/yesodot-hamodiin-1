import ChapterLayout from '../components/ChapterLayout/ChapterLayout'
import coverImage from '../assets/images/תמונה מסך פתיחה מהו מודיעין.png'
import useDocumentTitle from '../hooks/useDocumentTitle'

import ChapterCover from '../sections/ChapterCover'
import ChapterOpening from '../sections/ChapterOpening'
import VideoSection from '../sections/VideoSection'
import Gate1 from '../sections/Gate1'
import ApproachesSection from '../sections/ApproachesSection'
import UniqueTraitsSection from '../sections/UniqueTraitsSection'
import Gate2 from '../sections/Gate2'
import ByPurpose from '../sections/ByPurpose'
import ByLevel from '../sections/ByLevel'
import ByOutput from '../sections/ByOutput'
import CycleSection from '../sections/CycleSection'
import ByDomain from '../sections/ByDomain'
import QuizSection from '../sections/QuizSection'
import NextLesson from '../sections/NextLesson'

import { chapterCover, chapterOpening, railSections, videos } from '../data/chapter1'

// עמוד פרק 1 — "מהו מודיעין?" — כל תוכן הפרק והאינטראקציות.
export default function ChapterPage() {
  useDocumentTitle('יסודות המודיעין — פרק 1: מהו מודיעין?')

  return (
    <>
      <main id="main" className="chapterPage">
        <ChapterCover
          image={coverImage}
          eyebrow={chapterCover.eyebrow}
          title={chapterOpening.title}
          tagline={chapterCover.tagline}
          step={chapterCover.step}
          scrollLabel={chapterCover.scrollLabel}
          nextId="chapter-open"
        />
        <ChapterLayout sections={railSections} label="ניווט בין מקטעי פרק 1">
          <ChapterOpening />
          <VideoSection video={videos.intro} />
          <Gate1 />
          <ApproachesSection />
          <UniqueTraitsSection />
          <Gate2 />
          <ByPurpose />
          <ByLevel />
          <ByOutput />
          <CycleSection />
          <ByDomain />
          <QuizSection />
          <NextLesson />
        </ChapterLayout>
      </main>
    </>
  )
}
