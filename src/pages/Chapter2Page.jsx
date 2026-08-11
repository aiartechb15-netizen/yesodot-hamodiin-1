import ChapterNav from '../components/ChapterNav/ChapterNav'
import NextChapter from '../components/NextChapter/NextChapter'
import useDocumentTitle from '../hooks/useDocumentTitle'

import StationIntro from '../sections/chapter2/StationIntro'
import StationLevels from '../sections/chapter2/StationLevels'
import StationNational from '../sections/chapter2/StationNational'
import StationOfficer from '../sections/chapter2/StationOfficer'
import StationCheck from '../sections/chapter2/StationCheck'
import StationStrategic from '../sections/chapter2/StationStrategic'
import StationForce from '../sections/chapter2/StationForce'
import StationBinders from '../sections/chapter2/StationBinders'
import StationResearch from '../sections/chapter2/StationResearch'
import StationCompare from '../sections/chapter2/StationCompare'
import StationExam from '../sections/chapter2/StationExam'

import { nav, nextChapter, stations } from '../data/chapter2'

// עמוד פרק 2 — "מודיעין לאומי ואסטרטגי" — אחת עשרה תחנות.
export default function Chapter2Page() {
  useDocumentTitle('יסודות המודיעין — פרק 2: מודיעין לאומי ואסטרטגי')

  return (
    <>
      <ChapterNav stations={stations} labels={nav} />
      <main id="main" className="chapterPage">
        <StationIntro />
        <StationLevels />
        <StationNational />
        <StationOfficer />
        <StationCheck />
        <StationStrategic />
        <StationForce />
        <StationBinders />
        <StationResearch />
        <StationCompare />
        <StationExam />
        <NextChapter {...nextChapter} />
      </main>
    </>
  )
}
