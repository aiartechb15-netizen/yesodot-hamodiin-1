import { useEffect } from 'react'

/** כותרת הלשונית מתעדכנת לפי העמוד הפעיל. */
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}
