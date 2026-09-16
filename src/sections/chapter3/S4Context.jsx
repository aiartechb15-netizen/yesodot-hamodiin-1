import ChangeMap from '../../components/ChangeMap/ChangeMap'
import ScenarioSteps from '../../components/ScenarioSteps/ScenarioSteps'
import VideoModal from '../../components/VideoModal/VideoModal'
import { context as ctx } from '../../data/chapter3'
import './chapter3.css'

/* המסך נקרא כמפת שינוי אחת ולא כרצף כרטיסים: כותרת ופתיח, אחריהם
   האינפוגרפיקה המעגלית עם אזור ההסבר שמתחלף לצדה, ומתחתיהם רצועת
   התרחיש שממנה נפתח התרגול.

   כל הידע שהיה כאן קודם נשאר: חמשת הגורמים הם צמתי המפה, העיקרון
   נקרא כשורה שקטה מתחת לפתיח, הסרטון עבר לחלון מודאלי שנפתח
   מקישור טקסט, וחמש שאלות התרגול נקראות אחת בכל פעם. */
export default function S4Context() {
  return (
    <section className="section section--cream ctxmap" id={ctx.id} aria-labelledby="ch3-ctx-title">
      <div className="container ctxmap__wrap">
        <header className="ctxmap__head">
          <p className="kicker">{ctx.eyebrow}</p>
          <h2 className="section-title" id="ch3-ctx-title">
            {ctx.mapTitle}
          </h2>
          <span className="gold-rule" aria-hidden="true" />

          <p className="ctxmap__intro">{ctx.intro}</p>
          <p className="ctxmap__principle">{ctx.principle}</p>

          {/* div ולא p: הרכיב מכיל גם את חלון ה-dialog, ו-p אינו יכול
              להכיל אותו */}
          <div className="ctxmap__video">
            <VideoModal video={ctx.video} label={ctx.videoLink} />
          </div>
        </header>

        <ChangeMap factors={ctx.factors} hub={ctx.hub} />

        <ScenarioSteps strip={ctx.strip} exercise={ctx.exercise} />
      </div>
    </section>
  )
}
