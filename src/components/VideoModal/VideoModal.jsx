import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from '../Icons/Icons'
import './VideoModal.css'

/**
 * קישור טקסט קצר שפותח את הסרטון בחלון מודאלי.
 *
 * מבוסס על <dialog> ו-showModal של הדפדפן ולא על div עם role="dialog":
 * משם מגיעים בחינם מלכודת המיקוד, שכבת ה-::backdrop, סגירה ב-Esc
 * והוצאת שאר העמוד מעץ הנגישות. מה שנשאר לנו הוא רק להחזיר את המיקוד
 * אל הקישור שממנו נפתח החלון — כך המשתמש חוזר בדיוק לאותו מקום בעמוד,
 * והגלילה אינה זזה.
 */
export default function VideoModal({ video, label }) {
  const dialogRef = useRef(null)
  const linkRef = useRef(null)
  const [open, setOpen] = useState(false)

  const close = useCallback(() => {
    const d = dialogRef.current
    if (d?.open) d.close()
  }, [])

  /* showModal חייב להיקרא על האלמנט אחרי שהוא כבר ב-DOM, ולכן הפתיחה
     יושבת כאן ולא בתוך המטפל של הלחיצה */
  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  /* close מופעל גם ב-Esc וגם בלחיצה על כפתור הסגירה, ולכן החזרת
     המיקוד יושבת על האירוע עצמו ומכסה את שני המקרים */
  const onClose = () => {
    setOpen(false)
    linkRef.current?.focus()
  }

  /* לחיצה על השטח שמחוץ לתיבה סוגרת. האירוע נורה על ה-dialog עצמו,
     שהוא גם ה-::backdrop, ולכן די בבדיקה שהיעד הוא ה-dialog */
  const onClick = (e) => {
    if (e.target === dialogRef.current) close()
  }

  return (
    <>
      <button className="vlink" type="button" ref={linkRef} onClick={() => setOpen(true)}>
        <span className="vlink__icon" aria-hidden="true">
          <Icon name="play" size={15} />
        </span>
        {label}
      </button>

      <dialog className="vmodal" ref={dialogRef} onClose={onClose} onClick={onClick}>
        <div className="vmodal__box">
          <div className="vmodal__bar">
            <h2 className="vmodal__title">{video.title}</h2>
            <button className="vmodal__close" type="button" onClick={close} aria-label="סגירת הסרטון">
              <Icon name="close" size={20} />
            </button>
          </div>

          {/* מסגרת הנגן עצמה. כל עוד אין קובץ, כאן יושב הכיתוב שמסביר
              שהסרטון יתווסף — אותו טקסט שהיה במסך קודם. */}
          <div className="vmodal__frame">
            <span className="vmodal__play" aria-hidden="true">
              <Icon name="play" size={30} />
            </span>
            <p className="vmodal__note">{video.note}</p>
          </div>

          <p className="vmodal__detail">{video.detail}</p>
        </div>
      </dialog>
    </>
  )
}
