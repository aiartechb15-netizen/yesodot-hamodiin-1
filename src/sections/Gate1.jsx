import LearningMap from '../components/LearningMap/LearningMap'
import { gate1, learningMap } from '../data/chapter1'
import learningImage from '../assets/images/מודיעין כמערכת לומדה.png'
import './sections.css'

/* שער 1 — "מודיעין כמערכת לומדת".
   המקטע הוא מסך אחד שהאיור הוא הרקע שלו: אין בו כרטיסיות, רשימות או
   פסקאות מתחת לתמונה. כל מלל השער — שני הצדדים ושלושת הרבדים — נשמר
   ב-data/chapter1.js ומוצג דרך נקודות המידע שעל האיור בלבד. */
export default function Gate1() {
  return (
    <section className="section section--learning" id="gate-1" aria-labelledby="gate-1-title">
      <LearningMap
        image={learningImage}
        alt={learningMap.alt}
        title={gate1.learningSystem.title}
        titleId="gate-1-title"
        hint={learningMap.hint}
        points={learningMap.points}
        decorDots={learningMap.decorDots}
      />
    </section>
  )
}
