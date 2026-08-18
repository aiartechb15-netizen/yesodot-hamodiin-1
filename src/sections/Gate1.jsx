import Icon from '../components/Icons/Icons'
import { gate1 } from '../data/chapter1'
import './sections.css'

export default function Gate1() {
  const { learningSystem: ls, knowingVsUnderstanding: ku, infoVsKnowledge: ik } = gate1

  return (
    <section className="section section--paper" id="gate-1" aria-labelledby="gate-1-title">
      <div className="container">
        <header className="gateHead">
          <span className="gateHead__num">{gate1.number}</span>
          <h2 className="section-title" id="gate-1-title">
            {gate1.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        {/* 1. כותרת ופתיח */}
        <h3 className="lsys__title">{ls.title}</h3>
        <span className="gold-rule gold-rule--sm" aria-hidden="true" />
        <p className="lsys__lead">{ls.paragraph}</p>

        {/* 2. המפגש — מלבן אחד המחולק לשני חצאים שווים */}
        <p className="lsys__meet">{ls.meetingLead}</p>
        <div className="meet">
          {ls.sides.map((s, i) => (
            <div className={`meet__side meet__side--${s.key}`} key={s.key}>
              <span className="meet__term">
                <span className="meet__dot" aria-hidden="true" />
                {s.term}
              </span>
              <p className="meet__text">{s.text}</p>
              {i === 0 ? <span className="meet__rule" aria-hidden="true" /> : null}
            </div>
          ))}
        </div>

        {/* 3. שני אזורי תוכן מקבילים — אותו רוחב, אותו גובה, אותם מרווחים */}
        <div className="rails">
          <article className="rail">
            <h3 className="rail__title">{ku.title}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="rail__lead">{ku.lead}</p>

            <ol className="proc">
              {ku.layers.map((l, i) => (
                <li className={`proc__step proc__step--${i}`} key={l.term}>
                  <span className="proc__marker" aria-hidden="true">
                    <span className="proc__dot" />
                  </span>
                  <span className="proc__icon" aria-hidden="true">
                    <Icon name={l.icon} size={18} />
                  </span>
                  <div className="proc__body">
                    <h4 className="proc__term">{l.term}</h4>
                    <p className="proc__text">{l.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          <article className="rail">
            <h3 className="rail__title">{ik.title}</h3>
            <span className="gold-rule gold-rule--sm" aria-hidden="true" />
            <p className="rail__lead">{ik.paragraph}</p>

            <div className="inset">
              <span className="inset__label">{ik.example.label}</span>
              <p>{ik.example.text}</p>
            </div>
          </article>
        </div>

        {/* 4. משפט מסכם — קו דק עם הדגשה זהובה במרכזו, ומתחתיו המשפט */}
        <div className="keyIdea">
          <span className="keyIdea__rule" aria-hidden="true" />
          <p className="keyIdea__text">{ls.callout.text}</p>
        </div>
      </div>
    </section>
  )
}
