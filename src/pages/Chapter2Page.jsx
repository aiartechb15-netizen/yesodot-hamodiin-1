import ChapterLayout from '../components/ChapterLayout/ChapterLayout'
import NextChapter from '../components/NextChapter/NextChapter'
import useDocumentTitle from '../hooks/useDocumentTitle'

import StationIntro from '../sections/chapter2/StationIntro'
import StationNational from '../sections/chapter2/StationNational'
import StationOfficer from '../sections/chapter2/StationOfficer'
import StationCheck from '../sections/chapter2/StationCheck'
import StationStrategic from '../sections/chapter2/StationStrategic'
import StationForce from '../sections/chapter2/StationForce'
import StationResearch from '../sections/chapter2/StationResearch'
import StationCompare from '../sections/chapter2/StationCompare'
import StationExam from '../sections/chapter2/StationExam'

import { nextChapter, stations } from '../data/chapter2'

// עמוד פרק 2 — "מודיעין לאומי ואסטרטגי" — עשר תחנות.
export default function Chapter2Page() {
  useDocumentTitle('יסודות המודיעין — פרק 2: מודיעין לאומי ואסטרטגי')

  return (
    <>
      <main id="main" className="chapterPage">
        <ChapterLayout sections={stations} label="ניווט בין תחנות פרק 2">
          <StationIntro />
          <StationNational />
          <StationOfficer />
          <StationCheck />
          <StationStrategic />
          <StationForce />
          <StationResearch />
          <StationCompare />
          <StationExam />
          <NextChapter {...nextChapter} />
        </ChapterLayout>
      </main>
    </>
  )
}
