import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * מעבר בין עמודים מתרחש מיידית בראש העמוד — ללא אנימציית גלילה.
 * גלילה פנימית בתוך אותו עמוד (עוגנים) נשארת חלקה, ולכן שינוי hash בלבד אינו מטופל כאן.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lastPath = useRef(null)

  useLayoutEffect(() => {
    if (lastPath.current === pathname) return
    lastPath.current = pathname

    const root = document.documentElement
    const previous = root.style.scrollBehavior

    // ביטול זמני של scroll-behavior הגלובלי; חישוב סגנון כפוי כדי שהדפדפן יקרא את הערך החדש
    root.style.scrollBehavior = 'auto'
    void root.offsetHeight

    const jump = () => {
      const target = hash ? document.getElementById(hash.slice(1)) : null
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    }

    jump()

    // אישור נוסף אחרי הציור הראשון, למקרה שהפריסה של העמוד החדש הזיזה את מיקום הגלילה
    const raf = window.requestAnimationFrame(() => {
      jump()
      root.style.scrollBehavior = previous
    })

    return () => {
      window.cancelAnimationFrame(raf)
      root.style.scrollBehavior = previous
    }
  }, [pathname, hash])

  return null
}
