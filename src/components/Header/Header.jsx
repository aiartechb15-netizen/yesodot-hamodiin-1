import { Link } from 'react-router-dom'
import Icon from '../Icons/Icons'
import { course } from '../../data/chapter1'
import './Header.css'

export default function Header() {
  return (
    <header className="hdr">
      <div className="hdr__inner container">
        <Link className="hdr__brand" to={course.homeHref}>
          <Icon name="bookOpen" size={26} />
          <span className="hdr__brandText">{course.title}</span>
        </Link>
      </div>
    </header>
  )
}
