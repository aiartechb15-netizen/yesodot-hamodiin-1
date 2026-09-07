import { Fragment, useId, useState } from 'react'
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

/* דיוקן קו — פרופיל אחד משמש את שתי הדמויות: הוא מצויר פונה שמאלה,
   והדמות שבצד השני מתהפכת ב-CSS. מה שמבדיל ביניהן הוא הלבוש בלבד:
   כתפייה עם דרגות לקמ״ן, דש חליפה ועניבה לקברניט.
   הגולגולת היא קשת של מעגל אחד (מרכז 108,82 · רדיוס 46), והפנים,
   הלסת והסנטר נתלים עליה — כך הפרופורציות נשמרות בכל גודל תצוגה. */
function ProfileArt({ variant }) {
  return (
    <svg className="of__art" viewBox="0 0 200 250" aria-hidden="true" focusable="false">
      <path
        className="of__artLine"
        d="M108 36
           A 46 46 0 0 1 120 126
           C112 130 102 142 88 146 C78 149 70 146 66 140
           C60 130 58 118 62 110
           C63 107 57 105 51 103 C46 102 44 100 47 96
           L64 84 C65 81 63 79 63 77 C63 72 64 69 65 66
           A 46 46 0 0 1 108 36 Z"
      />
      {/* אוזן, קו שיער וגבה */}
      <path className="of__artLine of__artLine--thin" d="M104 82 C112 81 117 88 116 96 C115 104 110 108 104 107" />
      <path className="of__artLine of__artLine--thin" d="M67 62 C76 46 92 38 110 39" />
      <path className="of__artLine of__artLine--thin" d="M62 80 C68 76 74 76 79 79" />
      {/* צוואר */}
      <path className="of__artLine" d="M86 148 C87 159 87 170 87 180" />
      <path className="of__artLine" d="M124 133 C130 149 129 165 127 180" />

      {variant === 'kaman' ? (
        <>
          {/* מדים — צווארון עומד, כתפיים וכתפייה עם דרגות */}
          <path className="of__artLine" d="M87 180 C66 187 40 200 26 250" />
          <path className="of__artLine" d="M127 180 C151 187 175 200 187 250" />
          <path
            className="of__artLine of__artLine--thin"
            d="M87 180 C94 194 104 201 113 200 C121 199 126 191 127 180"
          />
          <path className="of__artLine of__artLine--thin" d="M62 189 L48 198 L53 209 L67 200 Z" />
          <path className="of__artLine of__artLine--thin" d="M55 195 L59 201" />
          <path className="of__artLine of__artLine--thin" d="M59 193 L63 199" />
        </>
      ) : (
        <>
          {/* חליפה — כתפיים, דש פתוח, צווארון חולצה ועניבה */}
          <path className="of__artLine" d="M87 180 C64 187 38 200 24 250" />
          <path className="of__artLine" d="M127 180 C153 187 177 200 189 250" />
          <path className="of__artLine" d="M87 180 C94 196 100 216 102 250" />
          <path className="of__artLine" d="M127 180 C121 195 116 216 114 250" />
          <path className="of__artLine of__artLine--thin" d="M96 196 C104 211 109 231 110 250" />
          <path className="of__artLine of__artLine--thin" d="M112 202 L121 210 L117 250 L106 246 Z" />
        </>
      )}
    </svg>
  )
}

/** המסמך המשותף — שני הצדדים מסתכלים על אותו נייר. */
function DocArt() {
  return (
    <svg className="of__doc" viewBox="0 0 72 88" aria-hidden="true" focusable="false">
      <path className="of__docLine" d="M4 6 h44 l20 20 v56 a2 2 0 0 1-2 2 H6 a2 2 0 0 1-2-2 V8 a2 2 0 0 1 2-2 Z" />
      <path className="of__docLine" d="M48 6 v18 a2 2 0 0 0 2 2 h18" />
      <path className="of__docLine of__docLine--text" d="M17 40 h30" />
      <path className="of__docLine of__docLine--text" d="M17 51 h38" />
      <path className="of__docLine of__docLine--text" d="M17 62 h38" />
      <path className="of__docLine of__docLine--text" d="M17 73 h22" />
    </svg>
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

/** דמות אחת על הבמה: הדיוקן, קו החיבור אל המסמך, השם והמשפט הקצר. */
function Figure({ side }) {
  return (
    <figure className={`of__fig of__fig--${side.id}`}>
      <div className="of__portrait">
        <ProfileArt variant={side.id} />
        <span className="of__link" aria-hidden="true">
          <span className="of__linkDot" />
        </span>
      </div>
      <figcaption className="of__cap">
        <h3 className="of__figName">{side.title}</h3>
        <p className="of__figText">{side.caption}</p>
      </figcaption>
    </figure>
  )
}

/* שני אזורי ההעמקה שבתחתית התחנה — סגורים כברירת מחדל. הפותחים הם
   שורת טקסט אחת עם חץ, בלי כרטיס ובלי מסגרת, כדי שהבמה שמעליהם
   תישאר המוקד היחיד של המסך. */
const DEEP = [
  { id: 'dangers', title: ol.dangersTitle, hint: ol.dangersHint, Panel: Scale },
  { id: 'cases', title: ol.casesTitle, hint: ol.casesHint, Panel: Cases },
]

function DeepDives() {
  const uid = useId()
  const [open, setOpen] = useState(null)

  return (
    <div className="of__deep">
      <div className="of__deepBar">
        <span className="of__deepLabel">{ol.deepLabel}</span>
        {DEEP.map((d, i) => (
          <Fragment key={d.id}>
            {i > 0 ? <span className="of__deepDiv" aria-hidden="true" /> : null}
            <button
              className={`of__deepBtn${open === d.id ? ' is-open' : ''}`}
              type="button"
              id={`${uid}-${d.id}-btn`}
              aria-expanded={open === d.id}
              aria-controls={`${uid}-${d.id}-panel`}
              onClick={() => setOpen((prev) => (prev === d.id ? null : d.id))}
            >
              <span className="of__deepName">{d.title}</span>
              <Icon name="chevron" size={19} className="of__deepChev" />
            </button>
          </Fragment>
        ))}
      </div>

      {DEEP.map((d) => (
        <div
          className="of__deepPanel"
          key={d.id}
          id={`${uid}-${d.id}-panel`}
          role="region"
          aria-labelledby={`${uid}-${d.id}-btn`}
          hidden={open !== d.id}
        >
          <p className="of__deepHint">{d.hint}</p>
          <d.Panel />
        </div>
      ))}
    </div>
  )
}

export default function StationOfficer() {
  const [kaman, kabarnit] = ol.sides

  return (
    <section className="section section--paper" id={ol.id} aria-labelledby="ch2-officer-title">
      <div className="container">
        <header className="of__head">
          <h2 className="section-title section-title--center" id="ch2-officer-title">
            {ol.title}
          </h2>
          <p className="lead of__lead">{ol.lead}</p>
        </header>

        {/* הבמה: שתי הדמויות פונות אל אותו מסמך. במרכז — המסמך והמשפט
            בלבד, בלי עיגול, מסגרת, רקע או צל סביבם. */}
        <div className="of__stage">
          <Figure side={kaman} />

          <div className="of__core">
            <span className="of__axis of__axis--top" aria-hidden="true">
              <span className="of__axisDot" />
            </span>
            <DocArt />
            <p className="of__pivot">{ol.pivot}</p>
            <span className="of__axis of__axis--bottom" aria-hidden="true">
              <span className="of__axisDot" />
            </span>
          </div>

          <Figure side={kabarnit} />
        </div>

        <span className="of__tick" aria-hidden="true" />
        <p className="of__summary">{ol.summary}</p>

        <DeepDives />
      </div>
    </section>
  )
}
