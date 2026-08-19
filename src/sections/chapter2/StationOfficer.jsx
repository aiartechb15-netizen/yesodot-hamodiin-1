import Icon from '../../components/Icons/Icons'
import { officerAndLeader as ol } from '../../data/chapter2'
import './chapter2.css'

/* כל התחנה עוסקת במשתנה אחד — המרחק בין הקמ״ן לקברניט.
   הגליף מצייר אותו: עיגול טורקיז (הקמ״ן) ועיגול כחול (הקברניט),
   וכל מה שמשתנה בין המצבים הוא המרחק ביניהם. */
const GLYPH = {
  far: { a: 8, b: 64, link: { x1: 19, x2: 53, cls: 'dglyph__link--broken' } },
  right: { a: 24, b: 48, link: { x1: 31, x2: 41, cls: 'dglyph__link--good' } },
  close: { a: 31, b: 41, link: null },
}

function DistanceGlyph({ state, size = 72 }) {
  const g = GLYPH[state] || GLYPH.far
  return (
    <svg
      className="dglyph"
      width={size}
      height={(size * 22) / 72}
      viewBox="0 0 72 22"
      aria-hidden="true"
      focusable="false"
    >
      {g.link ? (
        <line className={`dglyph__link ${g.link.cls}`} x1={g.link.x1} y1="11" x2={g.link.x2} y2="11" />
      ) : null}
      <circle className="dglyph__dot dglyph__dot--b" cx={g.b} cy="11" r="6" />
      <circle className="dglyph__dot dglyph__dot--a" cx={g.a} cy="11" r="6" />
    </svg>
  )
}

/** מצב הגליף לפי מזהה הסכנה, עם נפילה בטוחה אם המזהים בנתונים ישתנו. */
const stateOf = (id) => (id in GLYPH ? id : 'far')

/** מקרה בוחן מצביע על אחת משתי הסכנות — הקישור נעשה לפי הכותרת בנתונים. */
const dangerState = (label) => stateOf(ol.dangers.find((d) => d.title === label)?.id)

/** שתי נקודות המבט — פיצול סימטרי מתוך אותו מידע. */
function Viewpoints() {
  return (
    <div className="of__split">
      <span className="of__fan" aria-hidden="true">
        <span className="of__fanStem" />
        <span className="of__fanNode" />
        <span className="of__fanLeg of__fanLeg--a" />
        <span className="of__fanLeg of__fanLeg--b" />
      </span>

      <div className="of__sides">
        {ol.sides.map((s) => (
          <article className={`of__side of__side--${s.id}`} key={s.id}>
            <div className="of__sideTop">
              <span className="of__sideIcon" aria-hidden="true">
                <Icon name={s.icon} size={24} />
              </span>
              <h3 className="of__sideTitle">{s.title}</h3>
            </div>
            <p className="of__sideText">{s.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

/** שתי הסכנות כשני קצוות של אותו ציר; באמצע — הנקודה הנכונה, מסומנת בזהב. */
function Poles() {
  return (
    <div className="of__poles">
      {ol.dangers.map((d) => (
        <article className="of__pole" key={d.id}>
          <div className="of__poleHead">
            <DistanceGlyph state={stateOf(d.id)} />
            <h4 className="of__poleTitle">{d.title}</h4>
          </div>
          <p className="of__poleText">{d.text}</p>
        </article>
      ))}
      {/* אמצע הציר — המרחק הנכון, כפי שנוסח במסר המרכזי שמעל */}
      <span className="of__mid" aria-hidden="true">
        <span className="of__midMark">
          <DistanceGlyph state="right" />
        </span>
      </span>
    </div>
  )
}

/** מקרי בוחן — ציר זמן אנכי; כל מקרה נושא את תווית הסכנה שהוא מדגים. */
function Cases() {
  return (
    <ol className="of__cases">
      {ol.cases.map((c) => (
        <li className="of__case" key={c.id}>
          <span className="of__caseMark" aria-hidden="true" />
          <div className="of__caseHead">
            <h4 className="of__caseTitle">
              {c.when ? <span className="of__caseWhen ltr-num">{c.when}</span> : null}
              {c.title}
            </h4>
            <span className="of__caseTag">
              <DistanceGlyph state={dangerState(c.danger)} size={40} />
              {c.danger}
            </span>
          </div>
          <p className="of__caseText">{c.text}</p>
        </li>
      ))}
    </ol>
  )
}

export default function StationOfficer() {
  return (
    <section className="section section--paper" id={ol.id} aria-labelledby="ch2-officer-title">
      <div className="container">
        <header className="st__head of__head">
          <h2 className="section-title section-title--center" id="ch2-officer-title">
            {ol.title}
          </h2>
          <span className="gold-rule gold-rule--center" aria-hidden="true" />
          <p className="lead of__lead">{ol.lead}</p>
        </header>

        <Viewpoints />
      </div>

      {/* המסר המרכזי — פס לרוחב העמוד, ציר האמצע שכל השאר נמדד ביחס אליו */}
      <div className="of__banner">
        <div className="container">
          <span className="of__bannerLabel">{ol.callout.label}</span>
          <p className="of__bannerText">{ol.callout.text}</p>
        </div>
      </div>

      <div className="container of__tail">
        <section className="of__block" aria-labelledby="ch2-officer-dangers">
          <h3 className="of__blockTitle" id="ch2-officer-dangers">
            {ol.dangersTitle}
          </h3>
          <span className="gold-rule gold-rule--sm gold-rule--center" aria-hidden="true" />
          <Poles />
        </section>

        <section className="of__block" aria-labelledby="ch2-officer-cases">
          <h3 className="of__blockTitle" id="ch2-officer-cases">
            {ol.casesTitle}
          </h3>
          <span className="gold-rule gold-rule--sm gold-rule--center" aria-hidden="true" />
          <Cases />
        </section>
      </div>
    </section>
  )
}
