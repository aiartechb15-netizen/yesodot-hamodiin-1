import FillBlanks from '../../components/FillBlanks/FillBlanks'
import { design } from '../../data/chapter3'
import './chapter3.css'

/* התחנה נקראת בשלושה מסכים רצופים במקום במסך אחד עמוס: שני מסכי ידע
   ואחריהם מסך התרגול. כל מסך בגובה חלון כמעט מלא, והמעבר ביניהם
   בגלילה רגילה. החלוקה היא של התצוגה בלבד — התוכן, הסדר והלוגיקה
   נשארו כשהיו.

   סדר היחידות בכל מסך נקבע כאן ולא בנתונים: ב-RTL העמודה הראשונה
   היא הימנית. */
const SCREENS = [
  ['d1', 'd3'],
  ['d2', 'd4'],
]

const blockOf = (id) => design.blocks.find((b) => b.id === id)

/* חיווי התמצאות בלבד: שלוש נקודות והמספר. אינו כפתור ואינו ניווט,
   ולכן הוא מוסתר מקוראי מסך — הכותרות הן שנושאות את המבנה. */
function Progress({ step }) {
  return (
    <p className="dsgn__progress" aria-hidden="true">
      <span className="dsgn__dots">
        {[1, 2, 3].map((n) => (
          <span className={`dsgn__dot${n === step ? ' is-on' : ''}`} key={n} />
        ))}
      </span>
      <span className="dsgn__count ltr-num">{step} / 3</span>
    </p>
  )
}

/* יחידת ידע — כותרת, קו זהב קצר ומלל. בלי כרטיס, מסגרת, רקע או צל. */
function Unit({ id }) {
  const block = blockOf(id)
  if (!block) return null
  return (
    <article className="dsgn__unit">
      <h3 className="dsgn__unitTitle">{block.title}</h3>
      <span className="gold-rule gold-rule--sm" aria-hidden="true" />
      <p className="dsgn__text">{block.text}</p>
    </article>
  )
}

export default function S5Design() {
  return (
    <section className="section section--white dsgn" id={design.id} aria-labelledby="ch3-design-title">
      <div className="container dsgn__wrap">
        {/* ---------- מסך 1 — עקרונות המערכה ---------- */}
        <div className="dsgn__screen">
          <header className="s3head dsgn__head">
            <h2 className="section-title" id="ch3-design-title">
              {design.title}
            </h2>
            <span className="gold-rule" aria-hidden="true" />
          </header>

          <div className="knowledge-grid">
            {SCREENS[0].map((id) => (
              <Unit id={id} key={id} />
            ))}
          </div>

          <Progress step={1} />
        </div>

        {/* ---------- מסך 2 — התנאים להצלחה ---------- */}
        <div className="dsgn__screen dsgn__screen--center">
          <div className="knowledge-grid">
            {SCREENS[1].map((id) => (
              <Unit id={id} key={id} />
            ))}
          </div>

          <Progress step={2} />
        </div>

        {/* ---------- מסך 3 — התרגול ----------
            אותו רכיב ואותם נתונים כמו קודם; רק המסגרת שסביבו השתנתה. */}
        <div className="dsgn__screen dsgn__screen--center">
          <div className="s3exercise dsgn__exercise">
            <h3 className="s3sub">{design.exercise.title}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <FillBlanks
              bank={design.exercise.bank}
              sentences={design.exercise.sentences}
              hint={design.exercise.hint}
            />
          </div>

          <Progress step={3} />
        </div>
      </div>
    </section>
  )
}
