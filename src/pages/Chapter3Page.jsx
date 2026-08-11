import ChapterNav from '../components/ChapterNav/ChapterNav'
import NextChapter from '../components/NextChapter/NextChapter'
import useDocumentTitle from '../hooks/useDocumentTitle'

import S1Opener from '../sections/chapter3/S1Opener'
import S2Levels from '../sections/chapter3/S2Levels'
import S3Operational from '../sections/chapter3/S3Operational'
import S4Context from '../sections/chapter3/S4Context'
import S5Design from '../sections/chapter3/S5Design'
import S6Tactical from '../sections/chapter3/S6Tactical'
import S7Lohamam from '../sections/chapter3/S7Lohamam'
import S8Environments from '../sections/chapter3/S8Environments'
import S9Research from '../sections/chapter3/S9Research'
import S10Targets from '../sections/chapter3/S10Targets'
import S11Relations from '../sections/chapter3/S11Relations'
import S12Summary from '../sections/chapter3/S12Summary'
import S13Exam from '../sections/chapter3/S13Exam'

import { nav, nextChapter, stations } from '../data/chapter3'

// עמוד פרק 3 — "מודיעין אופרטיבי וטקטי" — שלוש עשרה תחנות.
export default function Chapter3Page() {
  useDocumentTitle('יסודות המודיעין — פרק 3: מודיעין אופרטיבי וטקטי')

  return (
    <>
      <ChapterNav stations={stations} labels={nav} />
      <main id="main" className="chapterPage">
        <S1Opener />
        <S2Levels />
        <S3Operational />
        <S4Context />
        <S5Design />
        <S6Tactical />
        <S7Lohamam />
        <S8Environments />
        <S9Research />
        <S10Targets />
        <S11Relations />
        <S12Summary />
        <S13Exam />
        <NextChapter {...nextChapter} />
      </main>
    </>
  )
}
