import { Fragment } from 'react'
import Icon from '../../components/Icons/Icons'
import { officerAndLeader as ol } from '../../data/chapter2'
import './chapter2.css'

/* כל התחנה עוסקת במשתנה אחד — המרחק בין הקמ״ן לקברניט.
   הגליף מצייר אותו: עיגול טורקיז (הקמ״ן) ועיגול כחול (הקברניט),
   וכל מה שמשתנה בין המצבים הוא המרחק ביניהם. */
const GLYPH = {
  far: { a: 9, b: 63, link: { x1: 21, x2: 51, cls: 'dglyph__link--broken' } },
  right: { a: 24, b: 48, link: { x1: 32, x2: 40, cls: 'dglyph__link--good' } },
  close: { a: 32, b: 40, link: null },
}

/** רוחב הגליף על הציר; במקומות משניים מועבר size קטן יותר. */
const GLYPH_W = 68

function DistanceGlyph({ state, size = GLYPH_W }) {
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
      <circle className="dglyph__dot dglyph__dot--b" cx={g.b} cy="11" r="7" />
      <circle className="dglyph__dot dglyph__dot--a" cx={g.a} cy="11" r="7" />
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

/* שתי הסכנות כציר מסומן אחד: שם הסכנה יושב על כל קצה, באמצע סימון
   המרחק הנכון, ומתחת לכל קצה ההסבר שלו. הכול בגריד אחד, כדי שבמסך
   צר אפשר יהיה לפרוש את אותם חלקים לסדר אנכי קריא. */
function Scale() {
  const side = (i) => (i === 0 ? 'a' : 'b')

  return (
    <div className="of__scale">
      {ol.dangers.map((d, i) => (
        <Fragment key={d.id}>
          {i > 0 ? (
            <>
              <span className="of__track of__track--b" aria-hidden="true" />
              <span className="of__mid" aria-hidden="true">
                <DistanceGlyph state="right" />
              </span>
              <span className="of__track of__track--a" aria-hidden="true" />
            </>
          ) : null}
          <h4 className={`of__end of__end--${side(i)}`}>
            <DistanceGlyph state={stateOf(d.id)} />
            <span className="of__endName">{d.title}</span>
          </h4>
        </Fragment>
      ))}

      {ol.dangers.map((d, i) => (
        <p className={`of__note of__note--${side(i)}`} key={d.id}>
          {d.text}
        </p>
      ))}
      <span className="of__noteDiv" aria-hidden="true" />
    </div>
  )
}

/** מקרי בוחן — שני מקרים זה לצד זה, כל אחד נושא את הסכנה שהוא מדגים. */
function Cases() {
  return (
    <ol className="of__cases">
      {ol.cases.map((c) => (
        <li className="of__case" key={c.id}>
          <span className="of__caseKicker">
            <DistanceGlyph state={dangerState(c.danger)} size={34} />
            {c.danger}
          </span>
          <h4 className="of__caseTitle">
            {c.when ? <span className="of__caseWhen ltr-num">{c.when}</span> : null}
            {c.title}
          </h4>
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
          <Scale />
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
