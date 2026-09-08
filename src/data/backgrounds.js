// רקעי המודיעין — ארבעה גיליונות שמנת שהמוטיבים שלהם (מכ״ם, מפות, קווי
// גובה, מצפן, לוויין, משקפת) יושבים בשוליים והמרכז שלהם נשאר נקי.
// הגיליון נבחר פעם אחת לכל עמוד ונצבע על מסכי התוכן הבהירים שלו.

import motif1 from '../assets/images/רקע 1.png'
import motif2 from '../assets/images/רקע 2.png'
import motif3 from '../assets/images/רקע 3.png'
import motif4 from '../assets/images/רקע 4.png'

export const motifs = [motif1, motif2, motif3, motif4]

/* שיבוץ קבוע לכל עמוד. הסדר אינו עוקב אחרי סדר הקבצים, כדי שהמעבר בין
   העמודים ייראה מגוון ולא ממוספר, ואין שני עמודים סמוכים שחולקים גיליון:
   בית → 3 · פרק 1 → 1 · פרק 2 → 4 · פרק 3 → 2. */
const BY_PAGE = {
  home: 2,
  ch1: 0,
  ch2: 3,
  ch3: 1,
}

/* גיבוי לעמוד שאינו ברשימה — hash דטרמיניסטי של המפתח ולא Math.random:
   הרקע חייב לצאת זהה בכל רינדור ובכל טעינה, אחרת הוא היה מתחלף
   ומהבהב בכל מעבר בין מסכים. */
function hashIndex(key) {
  let h = 0
  for (let i = 0; i < key.length; i += 1) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return h % motifs.length
}

/** כתובת גיליון הרקע של העמוד. אותו מפתח מחזיר תמיד את אותו גיליון. */
export function motifFor(pageKey) {
  const index = pageKey in BY_PAGE ? BY_PAGE[pageKey] : hashIndex(pageKey)
  return motifs[index]
}

/**
 * סגנון מוכן ל-<main> של העמוד: מגדיר את המשתנה שכל מסכי התוכן קוראים
 * ממנו. הערך נגזר מייבוא סטטי, ולכן הוא קבוע לאורך כל חיי העמוד.
 */
export function motifStyle(pageKey) {
  return { '--page-motif': `url("${motifFor(pageKey)}")` }
}
