import IdentityCard from '../../components/IdentityCard/IdentityCard'
import { strategic } from '../../data/chapter2'
import './chapter2.css'

export default function StationStrategic() {
  return (
    <section className="section section--white" id={strategic.id} aria-labelledby="ch2-strategic-title">
      <div className="container">
        <header className="st__head">
          <h2 className="section-title" id="ch2-strategic-title">
            {strategic.title}
          </h2>
          <span className="gold-rule" aria-hidden="true" />
        </header>

        {/* פריסה פתוחה: אותו תוכן ואותה התנהגות, בלי מעטפת לבנה —
            התוכן יושב ישירות על רקע העמוד */}
        <div className="st__blocks st__blocks--open">
          <IdentityCard data={strategic} tone="teal" layout="open" />
        </div>
      </div>
    </section>
  )
}
