import { useId, useState } from 'react'
import { comparison } from '../../data/chapter2'
import './ComparisonTable.css'

/** טבלת השוואה קצרה כברירת מחדל, עם הרחבה לטבלה המלאה. */
export default function ComparisonTable() {
  const uid = useId()
  const [full, setFull] = useState(false)

  return (
    <div className="cmp">
      <div className="cmp__scroll">
        <table className="cmp__table">
          <caption className="sr-only">
            השוואה בין מודיעין לאומי למודיעין אסטרטגי
          </caption>
          <thead>
            <tr>
              <th scope="col" className="cmp__corner">
                <span className="sr-only">מאפיין</span>
              </th>
              {comparison.columns.map((c) => (
                <th scope="col" key={c}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.shortRows.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                <td>{r.national}</td>
                <td>{r.strategic}</td>
              </tr>
            ))}
          </tbody>
          {full ? (
            <tbody className="cmp__full" id={`${uid}-full`}>
              {comparison.fullRows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>{r.national}</td>
                  <td>{r.strategic}</td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
      </div>

      <button
        className="btn btn--ghost btn--sm cmp__toggle"
        type="button"
        aria-expanded={full}
        aria-controls={`${uid}-full`}
        onClick={() => setFull((v) => !v)}
      >
        {full ? comparison.hideFull : comparison.showFull}
      </button>
    </div>
  )
}
