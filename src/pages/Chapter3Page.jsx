import ChapterLayout from '../components/ChapterLayout/ChapterLayout'
import ChapterCover from '../sections/ChapterCover'
import coverImage from '../assets/images/תמונה פרק 3.png'
import NextChapter from '../components/NextChapter/NextChapter'
import useDocumentTitle from '../hooks/useDocumentTitle'

import S1Opener from '../sections/chapter3/S1Opener'
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

import { chapter3Meta, chapterCover, nextChapter, opener, stations } from '../data/chapter3'

// עמוד פרק 3 — "מודיעין אופרטיבי וטקטי" — שתים עשרה תחנות.
export default function Chapter3Page() {
  useDocumentTitle('יסודות המודיעין — פרק 3: מודיעין אופרטיבי וטקטי')

  return (
    <>
      <main id="main" className="chapterPage">
        <ChapterCover
          image={coverImage}
          eyebrow={chapterCover.eyebrow}
          title={chapter3Meta.title}
          tagline={chapter3Meta.subtitle}
          step={chapterCover.step}
          scrollLabel={chapterCover.scrollLabel}
          nextId={opener.id}
          titleId="ch3-cover-title"
          focus={{ narrow: '38% center', portrait: '30% center' }}
        />
        <ChapterLayout sections={stations} label="ניווט בין תחנות פרק 3">
          <S1Opener />
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
        </ChapterLayout>
      </main>
    </>
  )
}
