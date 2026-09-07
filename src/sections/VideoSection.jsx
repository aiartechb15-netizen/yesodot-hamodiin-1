import Icon from '../components/Icons/Icons'
import './VideoSection.css'

/* מסך סרטון הפתיחה של הפרק.
   האזור הזה הוא מסך אחד שלם ולא כרטיס בתוך דף: אין בו כותרת ואין בו
   טקסט הסבר — הסרטון הוא כל התוכן, והשאר קומפוזיציה מודיעינית שקטה
   שממסגרת אותו. כל שכבות הרקע דקורטיביות בלבד: aria-hidden, ללא
   pointer-events, ואף אחת מהן אינה נראית או מתנהגת כפקד. */

/* קווים טופוגרפיים — פסים זורמים ברקע, בעוצמה שמורגשת ולא נקראת.
   slice כדי שימלאו את המסך בכל יחס מסך. */
function TopoLines() {
  return (
    <svg
      className="vstage__topo"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="rgba(7, 26, 45, 0.055)" strokeWidth="1">
        <path d="M-40 168C220 96 430 236 700 214S1180 62 1660 154" />
        <path d="M-40 244C220 172 430 312 700 290S1180 138 1660 230" />
        <path d="M-40 320C220 248 430 388 700 366S1180 214 1660 306" />
        <path d="M-40 402C220 330 430 470 700 448S1180 296 1660 388" />
        <path d="M-40 492C220 420 430 560 700 538S1180 386 1660 478" />
        <path d="M-40 590C220 518 430 658 700 636S1180 484 1660 576" />
        <path d="M-40 696C220 624 430 764 700 742S1180 590 1660 682" />
        <path d="M-40 810C220 738 430 878 700 856S1180 704 1660 796" />
      </g>
    </svg>
  )
}

/* כדור הארץ — רשת מרידיאנים ויבשות מופשטות, עדין מאוד. יושב מאחורי
   הסרטון ומעניק עומק בלי להוסיף רעש. */
function Globe() {
  return (
    <svg className="vstage__globe" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="vstage-globe-clip">
          <circle cx="200" cy="200" r="190" />
        </clipPath>
      </defs>

      <g clipPath="url(#vstage-globe-clip)">
        <circle cx="200" cy="200" r="190" fill="rgba(196, 163, 71, 0.05)" />
        {/* יבשות מופשטות — הרמז מספיק, אין כאן טענה קרטוגרפית */}
        <g fill="rgba(7, 26, 45, 0.075)">
          <path d="M96 96c24-12 56-4 62 12s-10 24-12 38 8 24 0 32-36-2-44-18-26-30-22-46 10-14 16-18Z" />
          <path d="M150 196c12-6 22 4 20 20s-12 40-20 58c-6 14-16 18-20 6s6-32 8-50 2-30 12-34Z" />
          <path d="M228 128c16-8 34-4 40 6s-4 18-18 20-24-4-26-12-2-10 4-14Z" />
          <path d="M232 168c20-8 42 0 46 16s-8 32-14 50-16 36-26 38-14-14-12-30 -6-36-2-54 4-16 8-20Z" />
          <path d="M282 118c26-8 58 4 66 22s-12 28-32 24-36-14-38-28-2-16 4-18Z" />
        </g>
      </g>

      <g fill="none" stroke="rgba(7, 26, 45, 0.13)" strokeWidth="1">
        <circle cx="200" cy="200" r="190" />
        <ellipse cx="200" cy="200" rx="128" ry="190" />
        <ellipse cx="200" cy="200" rx="62" ry="190" />
        <path d="M200 10v380" />
        <path d="M53 80c49 20 245 20 294 0" />
        <path d="M20 140c60 24 300 24 360 0" />
        <path d="M10 200h380" />
        <path d="M20 260c60 24 300 24 360 0" />
        <path d="M53 320c49 20 245 20 294 0" />
      </g>
    </svg>
  )
}

/* קשת המסלול — קו זהב דק עם נקודות עצירה קטנות, שמלווה את הסרטון
   מצדו החיצוני. סימן, לא ניווט. */
function Orbit() {
  return (
    <svg className="vstage__orbit" viewBox="0 0 520 900" aria-hidden="true" focusable="false">
      <path
        d="M40 40A412.7 412.7 0 0 1 40 860"
        fill="none"
        stroke="rgba(196, 163, 71, 0.55)"
        strokeWidth="1.2"
      />
      <g fill="#c4a347">
        <circle cx="399.4" cy="180" r="6" />
        <circle cx="482.2" cy="330" r="7.5" />
        <circle cx="485.1" cy="560" r="6.5" />
        <circle cx="399.4" cy="720" r="5.5" />
      </g>
    </svg>
  )
}

/* חפצי השטח — מפה מודפסת, צילום שטח קטן ומצפן. שלושתם מצוירים
   בקווים ובשטחים שטוחים מהפלטה הקיימת, בלי צל ובלי ברק, כדי
   שייקראו כאיור רקע ולא כתמונות תוכן. */
function FieldArtifacts() {
  return (
    <svg className="vstage__kit" viewBox="0 0 460 600" aria-hidden="true" focusable="false">
      {/* קשת זהב פנימית שעוטפת את החפצים */}
      <path
        d="M300 26A262 262 0 0 0 300 550"
        fill="none"
        stroke="rgba(196, 163, 71, 0.4)"
        strokeWidth="1"
      />
      <g fill="rgba(196, 163, 71, 0.5)">
        <circle cx="52" cy="196" r="4.5" />
        <circle cx="38" cy="288" r="5.5" />
        <circle cx="58" cy="382" r="4.5" />
      </g>

      {/* המפה */}
      <g transform="rotate(-5 230 300)">
        <path
          d="M42 170 300 106l128 48-26 300-102 66-248-50Z"
          fill="#e7dcc4"
          stroke="rgba(7, 26, 45, 0.2)"
          strokeWidth="1"
        />
        {/* קווי הקיפול והרשת של גיליון מודפס */}
        <g fill="none" stroke="rgba(7, 26, 45, 0.14)" strokeWidth="1">
          <path d="M300 106v416" />
          <path d="M170 138v368" />
          <path d="M48 262c116 22 236 14 376-24" />
          <path d="M56 370c116 22 236 14 348-24" />
        </g>
        <g fill="none" stroke="rgba(124, 100, 38, 0.5)" strokeWidth="1">
          <path d="M118 300c26-46 96-58 140-24s42 92-4 118-116 4-140-38-22-30 4-56Z" />
          <path d="M146 300c20-32 74-42 106-16s28 66-6 84-84 0-102-28-14-22 2-40Z" />
          <path d="M176 300c12-18 44-24 62-10s16 40-4 50-50 0-60-16-6-16 2-24Z" />
          <path d="M64 216c44 10 84-6 118-30" />
          <path d="M70 424c52-8 96 6 132 34" />
          <path d="M330 178c26 26 40 62 42 100" />
        </g>
        <path
          d="M104 424c56-52 88-34 132-84s70-54 118-108"
          fill="none"
          stroke="rgba(196, 163, 71, 0.75)"
          strokeWidth="1.4"
          strokeDasharray="5 6"
        />
        <g fill="rgba(124, 100, 38, 0.5)">
          <circle cx="104" cy="424" r="4" />
          <circle cx="354" cy="232" r="4" />
        </g>
      </g>

      {/* צילום השטח — יושב על פינת המפה, לא לצדה */}
      <g transform="rotate(-9 196 132)">
        <rect
          x="102"
          y="54"
          width="188"
          height="156"
          rx="2"
          fill="#fbf8f1"
          stroke="rgba(7, 26, 45, 0.16)"
          strokeWidth="1"
        />
        <clipPath id="vstage-photo-clip">
          <rect x="114" y="66" width="164" height="112" />
        </clipPath>
        <g clipPath="url(#vstage-photo-clip)">
          <rect x="114" y="66" width="164" height="112" fill="#c3c7c5" />
          <path d="M114 146l44-46 34 30 30-38 56 46v40h-164Z" fill="#8d9599" />
          <path d="M114 166l40-30 40 24 44-28 40 26v20h-164Z" fill="#5d6871" />
          <circle cx="244" cy="90" r="12" fill="rgba(255, 255, 255, 0.5)" />
        </g>
        <path d="M126 194h84" stroke="rgba(7, 26, 45, 0.16)" strokeWidth="1" />
      </g>

      {/* המצפן */}
      <g transform="translate(122 476)">
        <circle r="74" fill="#efe7d6" stroke="rgba(196, 163, 71, 0.8)" strokeWidth="2.5" />
        <circle r="62" fill="#f7f2e6" stroke="rgba(7, 26, 45, 0.16)" strokeWidth="1" />
        <g fill="none" stroke="rgba(7, 26, 45, 0.28)" strokeWidth="1">
          <path d="M0-62v-10M0 62v10M-62 0h-10M62 0h10" />
          <path d="M44-44l7-7M-44 44l-7 7M44 44l7 7M-44-44l-7-7" />
        </g>
        <g transform="rotate(24)">
          <path d="M0-46 10-10 46 0 10 10 0 46-10 10-46 0-10-10Z" fill="rgba(18, 57, 85, 0.75)" />
          <path d="M0-46 10-10 46 0 0 0Z" fill="rgba(196, 163, 71, 0.9)" />
        </g>
        <circle r="5" fill="#f7f2e6" stroke="rgba(7, 26, 45, 0.4)" strokeWidth="1.4" />
      </g>
    </svg>
  )
}

export default function VideoSection({ video, title, background = 'section--cream' }) {
  return (
    <section
      className={`section vstage ${background}`}
      id={video.id}
      aria-label={title || video.title}
    >
      <div className="vstage__decor" aria-hidden="true">
        <TopoLines />
        <Globe />
        <Orbit />
        <FieldArtifacts />
      </div>

      <div className="container vstage__inner">
        {/* השם הנגיש נמסר על ה-figure עצמו, כי אין עוד כותרת גלויה */}
        <figure className="vstage__video" role="img" aria-label={`${video.title} — ${video.note}`}>
          <div className="vstage__frame">
            <span className="vstage__play">
              <Icon name="play" size={34} />
            </span>
          </div>
        </figure>
      </div>
    </section>
  )
}
