import ExpandCards from '../../components/ExpandCards/ExpandCards'
import { summary as sm } from '../../data/chapter3'
import './chapter3.css'

export default function S12Summary() {
  const t = sm.table

  return (
    <section className="section section--cream" id={sm.id} aria-labelledby="ch3-sum-title">
      <div className="container">
        <header className="s3head">
          <span className="s3head__kicker">{sm.kicker}</span>
          <h2 className="section-title" id="ch3-sum-title">
            {sm.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="s3hint">{sm.hint}</p>
        </header>

        <ExpandCards items={sm.items} columns={3} />

        <div style={{ marginTop: 'clamp(34px, 4vw, 52px)' }}>
          <h3 className="s3sub">{t.title}</h3>
          <span className="gold-rule gold-rule--sm" aria-hidden="true" />

          <div className="t3wrap" style={{ marginTop: '18px' }}>
            <table className="t3">
              <caption className="sr-only">{t.title}</caption>
              <thead>
                <tr>
                  {t.columns.map((c) => (
                    <th scope="col" key={c}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    <td>{r.operational}</td>
                    <td>{r.tactical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* במובייל הטבלה מוצגת ככרטיסי השוואה */}
          <div className="t3cards" style={{ marginTop: '18px' }}>
            {t.rows.map((r) => (
              <article className="t3card" key={r.label}>
                <span className="t3card__label">{r.label}</span>
                <div className="t3card__row">
                  <span className="t3card__col">{t.columns[1]}</span>
                  <span className="t3card__val">{r.operational}</span>
                </div>
                <div className="t3card__row">
                  <span className="t3card__col">{t.columns[2]}</span>
                  <span className="t3card__val">{r.tactical}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
