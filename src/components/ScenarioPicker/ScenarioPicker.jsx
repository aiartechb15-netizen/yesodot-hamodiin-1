import { useId, useState } from 'react'
import Icon from '../Icons/Icons'
import './ScenarioPicker.css'

/**
 * תרגול תרחישים: בכל תרחיש בוחרים דרג אחד.
 * המשוב וההסבר נפתחים רק אחרי הבחירה.
 */
export default function ScenarioPicker({ scenarios, options, hint }) {
  const uid = useId()
  const [answers, setAnswers] = useState({})

  return (
    <div className="scen">
      <p className="scen__hint small muted">{hint}</p>

      <ol className="scen__list">
        {scenarios.map((s, i) => {
          const picked = answers[s.id]
          const isCorrect = picked === s.correct
          return (
            <li className="scen__item" key={s.id}>
              <div className="scen__head">
                <span className="scen__num ltr-num">{i + 1}</span>
                <p className="scen__text">{s.text}</p>
              </div>

              <fieldset className="scen__options">
                <legend className="sr-only">בחרו דרג לתרחיש מספר {i + 1}</legend>
                {options.map((o) => {
                  const state = picked
                    ? o === s.correct
                      ? ' is-correct'
                      : o === picked
                        ? ' is-wrong'
                        : ''
                    : ''
                  return (
                    <label className={`scen__opt${picked === o ? ' is-picked' : ''}${state}`} key={o}>
                      <input
                        type="radio"
                        name={`${uid}-${s.id}`}
                        checked={picked === o}
                        disabled={Boolean(picked)}
                        onChange={() => setAnswers((a) => ({ ...a, [s.id]: o }))}
                      />
                      <span>{o}</span>
                    </label>
                  )
                })}
              </fieldset>

              {picked ? (
                <div className={`scen__feedback${isCorrect ? ' is-correct' : ' is-wrong'}`}>
                  <span className="scen__feedbackTitle">
                    <Icon name={isCorrect ? 'check' : 'close'} size={16} />
                    {isCorrect ? 'תשובה נכונה' : `התשובה הנכונה: ${s.correct}`}
                  </span>
                  <p>{s.why}</p>
                </div>
              ) : null}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
