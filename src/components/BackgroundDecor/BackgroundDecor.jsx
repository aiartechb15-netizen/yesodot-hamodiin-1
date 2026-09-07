import './BackgroundDecor.css'

/* שכבת רקע דקורטיבית למקטעי התוכן: איורי קו מודיעיניים דקים, בפינות
   ובשוליים בלבד. הכול SVG — חד בכל רזולוציה, בלי תמונות רסטר.
   השכבה אינה לחיצה, אינה נקראת לקוראי מסך, ויושבת מתחת לתוכן. */

/* --- אבני הבניין. כל אחת מצוירת ב-viewBox משלה ונמתחת לפי המיקום --- */

function Globe() {
  return (
    <svg className="dec__svg" viewBox="0 0 220 220" fill="none" aria-hidden="true">
      <circle cx="110" cy="110" r="100" />
      {/* מרידיאנים: אליפסות שרוחבן הולך ומצטמצם — כדור ולא עיגול */}
      <ellipse cx="110" cy="110" rx="34" ry="100" />
      <ellipse cx="110" cy="110" rx="68" ry="100" />
      {/* קווי רוחב */}
      <path d="M14 74h192M10 110h200M14 146h192" />
    </svg>
  )
}

function Orbits() {
  return (
    <svg className="dec__svg" viewBox="0 0 220 150" fill="none" aria-hidden="true">
      <ellipse cx="110" cy="75" rx="105" ry="40" transform="rotate(-16 110 75)" />
      <ellipse cx="110" cy="75" rx="105" ry="40" transform="rotate(22 110 75)" />
      <circle className="dec__dot" cx="22" cy="59" r="3" />
      <circle className="dec__dot" cx="186" cy="97" r="3" />
    </svg>
  )
}

function Route() {
  return (
    <svg className="dec__svg" viewBox="0 0 200 90" fill="none" aria-hidden="true">
      <path d="M6 70C46 30 74 74 112 34c22-23 48-16 82 6" strokeDasharray="5 7" />
      <circle className="dec__dot" cx="6" cy="70" r="3" />
      <circle className="dec__dot" cx="112" cy="34" r="3" />
      <circle cx="194" cy="40" r="5" />
    </svg>
  )
}

function Satellite() {
  return (
    <svg className="dec__svg" viewBox="0 0 200 130" fill="none" aria-hidden="true">
      {/* גוף */}
      <rect x="82" y="48" width="36" height="34" rx="3" />
      {/* פאנלים סולריים */}
      <path d="M22 55h56v20H22zM122 55h56v20h-56zM40 55v20M60 55v20M140 55v20M160 55v20" />
      <path d="M78 65h4M118 65h4" />
      {/* אנטנה וצלחת */}
      <path d="M100 48V26" />
      <path d="M86 26a14 9 0 0 1 28 0" />
      {/* אלומת שידור */}
      <path d="M100 86c-18 12-28 24-32 38M100 86c18 12 28 24 32 38" strokeDasharray="4 8" />
      <circle className="dec__dot" cx="100" cy="30" r="2.5" />
    </svg>
  )
}

function TerrainMap() {
  return (
    <svg className="dec__svg" viewBox="0 0 260 180" fill="none" aria-hidden="true">
      {/* מפת שטח מופשטת: מתארים סגורים ורשת דקה מתחתיהם */}
      <path d="M40 150c22-30 8-56 34-74 26-19 62-6 84-26 16-15 44-14 62 4" />
      <path d="M18 168c26-34 14-66 44-88 30-22 68-8 92-30 18-16 50-14 70 6" />
      <path d="M74 176c14-24 6-42 26-56 20-14 46-4 62-20" />
      <path d="M0 60h260M0 100h260M0 140h260M60 0v180M130 0v180M200 0v180" strokeOpacity="0.5" />
      <circle className="dec__dot" cx="130" cy="100" r="3" />
    </svg>
  )
}

function Target() {
  return (
    <svg className="dec__svg" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="48" />
      <circle cx="60" cy="60" r="26" />
      <path d="M60 0v24M60 96v24M0 60h24M96 60h24" />
      <circle className="dec__dot" cx="60" cy="60" r="3.5" />
    </svg>
  )
}

function Topo() {
  return (
    <svg className="dec__svg" viewBox="0 0 300 190" fill="none" aria-hidden="true">
      <path d="M-10 34c58-26 96 14 148 2 40-9 60-30 172-14" />
      <path d="M-10 66c62-28 104 16 156 2 42-11 62-28 164-12" />
      <path d="M-10 98c66-30 112 18 164 2 44-13 64-26 156-10" />
      <path d="M-10 130c70-32 120 20 172 2 46-15 66-24 148-8" />
      <path d="M-10 162c74-34 128 22 180 2 48-17 68-22 140-6" />
    </svg>
  )
}

function Compass() {
  return (
    <svg className="dec__svg" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="52" />
      <circle cx="60" cy="60" r="40" strokeDasharray="3 9" />
      <path d="M60 16l12 44-12 44-12-44z" />
      <path d="M16 60h88" strokeOpacity="0.6" />
      <circle className="dec__dot" cx="60" cy="60" r="3" />
    </svg>
  )
}

function Radar() {
  return (
    <svg className="dec__svg" viewBox="0 0 190 190" fill="none" aria-hidden="true">
      {/* קשתות מכ״ם היוצאות מפינה אחת */}
      <path d="M4 186a56 56 0 0 0 56-56" />
      <path d="M4 186a100 100 0 0 0 100-100" />
      <path d="M4 186a144 144 0 0 0 144-144" />
      <path d="M4 186L150 40" strokeDasharray="4 8" />
      <circle className="dec__dot" cx="104" cy="98" r="3" />
    </svg>
  )
}

function CoordGrid() {
  return (
    <svg className="dec__svg" viewBox="0 0 240 200" fill="none" aria-hidden="true">
      <path d="M40 0v200M80 0v200M120 0v200M160 0v200M200 0v200M0 40h240M0 80h240M0 120h240M0 160h240" />
      {/* צלבי קואורדינטה בודדים */}
      <path d="M74 74h12M80 68v12M154 114h12M160 108v12" strokeOpacity="0.9" />
      <circle className="dec__dot" cx="120" cy="80" r="3" />
      <circle cx="160" cy="160" r="7" />
    </svg>
  )
}

function Eye() {
  return (
    <svg className="dec__svg" viewBox="0 0 180 110" fill="none" aria-hidden="true">
      <path d="M6 55C48 12 132 12 174 55c-42 43-126 43-168 0Z" />
      <circle cx="90" cy="55" r="26" />
      <circle cx="90" cy="55" r="11" />
      <circle className="dec__dot" cx="90" cy="55" r="3" />
    </svg>
  )
}

function Links() {
  return (
    <svg className="dec__svg" viewBox="0 0 200 120" fill="none" aria-hidden="true">
      <path d="M14 96l52-58 62 34 58-52" />
      <path d="M66 38l62-24M128 72l-62 24" strokeOpacity="0.6" strokeDasharray="4 7" />
      <circle cx="14" cy="96" r="4" />
      <circle className="dec__dot" cx="66" cy="38" r="3" />
      <circle cx="128" cy="72" r="4" />
      <circle className="dec__dot" cx="186" cy="20" r="3" />
    </svg>
  )
}

/* --- הווריאציות. בכל אחת שניים-שלושה אלמנטים מרכזיים, לא יותר --- */

/* המיקומים לוגיים ולא ימין/שמאל: בעמוד RTL ה-start הוא הצד שבו
   יושבות הכותרות והטקסט, ולכן האיורים נדחקים אל ה-end ואל פסי
   הריפוד שמעל התוכן ומתחתיו. */
const VARIANTS = {
  /* גלובוס, מסלולים ונקודות מידע */
  globe: [
    { key: 'orbits', place: 'top-end', size: 'md', Art: Orbits },
    { key: 'globe', place: 'bottom-end', size: 'lg', Art: Globe },
    { key: 'route', place: 'bottom-start', size: 'sm', Art: Route },
  ],
  /* לוויין, מפת שטח וסימון מטרה */
  satellite: [
    { key: 'sat', place: 'top-end', size: 'md', Art: Satellite },
    { key: 'map', place: 'bottom-end', size: 'lg', Art: TerrainMap },
    { key: 'target', place: 'bottom-start', size: 'sm', Art: Target },
  ],
  /* קווי טופוגרפיה, מצפן וקשת מכ״ם */
  topo: [
    { key: 'radar', place: 'top-end', size: 'md', Art: Radar },
    { key: 'topo', place: 'bottom-end', size: 'lg', Art: Topo },
    { key: 'compass', place: 'bottom-start', size: 'sm', Art: Compass },
  ],
  /* רשת קואורדינטות, עין גאומטרית וקווי חיבור */
  grid: [
    { key: 'grid', place: 'top-end', size: 'lg', Art: CoordGrid },
    { key: 'eye', place: 'bottom-end', size: 'md', Art: Eye },
    { key: 'links', place: 'bottom-start', size: 'sm', Art: Links },
  ],
}

/**
 * רקע דקורטיבי למקטע תוכן.
 * variant: globe | satellite | topo | grid — נבחר לפי תוכן המקטע,
 * כדי שלא יופיע אותו רקע בשני מסכים סמוכים.
 */
export default function BackgroundDecor({ variant = 'globe' }) {
  const pieces = VARIANTS[variant] ?? VARIANTS.globe

  return (
    <div className="dec" aria-hidden="true">
      {pieces.map(({ key, place, size, Art }) => (
        <div key={key} className={`dec__piece dec__piece--${place} dec__piece--${size}`}>
          <Art />
        </div>
      ))}
    </div>
  )
}
