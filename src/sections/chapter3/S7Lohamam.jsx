import Icon from '../../components/Icons/Icons'
import { lohamam as lm } from '../../data/chapter3'
import './chapter3.css'

function Arrow() {
  // חץ בכיוון הקריאה בעברית (ימין → שמאל)
  return (
    <span className="flow3__arrow" aria-hidden="true">
      <svg viewBox="0 0 40 12" width="36" height="12" focusable="false">
        <path
          d="M38 6H4M10 1.5 4 6l6 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export default function S7Lohamam() {
  return (
    <section className="section section--white" id={lm.id} aria-labelledby="ch3-lm-title">
      <div className="container">
        <header className="s3head">
          <span className="s3head__kicker">{lm.kicker}</span>
          <h2 className="section-title" id="ch3-lm-title">
            {lm.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="lead" style={{ maxWidth: '860px' }}>
            {lm.definition}
          </p>
        </header>

        <div className="s3blocks">
          <ol className="flow3" aria-label="תהליך הלוחמ״מ">
            {lm.flow.map((f, i) => (
              <li className="flow3__item" key={f.id}>
                <span className="flow3__node">
                  <span className={`flow3__circle flow3__circle--${i}`} aria-hidden="true">
                    <Icon name={f.icon} size={28} />
                  </span>
                  <span className="flow3__label">{f.title}</span>
                </span>
                {i < lm.flow.length - 1 ? <Arrow /> : null}
              </li>
            ))}
          </ol>

          <div className="grid-2">
            <article className="card card--pad">
              <h3 className="card-title">כיצד זה עובד?</h3>
              <span className="gold-rule gold-rule--sm" aria-hidden="true" />
              <p>{lm.body}</p>
            </article>

            <aside className="callout callout--teal">
              <span className="callout__label">{lm.routineCallout.label}</span>
              <p>{lm.routineCallout.text}</p>
            </aside>
          </div>

          <aside className="callout">
            <span className="callout__label">{lm.achievementTitle}</span>
            <p>{lm.achievement}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
