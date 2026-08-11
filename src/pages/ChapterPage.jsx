import SectionProgress from '../components/SectionProgress/SectionProgress'
import useDocumentTitle from '../hooks/useDocumentTitle'

import ChapterOpening from '../sections/ChapterOpening'
import ChapterMap from '../sections/ChapterMap'
import VideoSection from '../sections/VideoSection'
import Gate1 from '../sections/Gate1'
import KnowledgeFlowSection from '../sections/KnowledgeFlowSection'
import ApproachesSection from '../sections/ApproachesSection'
import KnowledgeBodiesSection from '../sections/KnowledgeBodiesSection'
import UniqueTraitsSection from '../sections/UniqueTraitsSection'
import Gate2 from '../sections/Gate2'
import Gate3 from '../sections/Gate3'
import ByPurpose from '../sections/ByPurpose'
import ByLevel from '../sections/ByLevel'
import ByOutput from '../sections/ByOutput'
import CycleSection from '../sections/CycleSection'
import ByDomain from '../sections/ByDomain'
import QuizSection from '../sections/QuizSection'
import NextLesson from '../sections/NextLesson'

import { videos } from '../data/chapter1'

// עמוד פרק 1 — "מהו מודיעין?" — כל תוכן הפרק והאינטראקציות.
export default function ChapterPage() {
  useDocumentTitle('יסודות המודיעין — פרק 1: מהו מודיעין?')

  return (
    <>
      <SectionProgress />
      <main id="main">
        <ChapterOpening />
        <ChapterMap />
        <VideoSection video={videos.intro} />
        <Gate1 />
        <KnowledgeFlowSection />
        <ApproachesSection />
        <KnowledgeBodiesSection />
        <UniqueTraitsSection />
        <Gate2 />
        <Gate3 />
        <ByPurpose />
        <ByLevel />
        <ByOutput />
        <CycleSection />
        <ByDomain />
        <QuizSection />
        <NextLesson />
      </main>
    </>
  )
}
