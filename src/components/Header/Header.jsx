import { Link } from 'react-router-dom'
import Icon from '../Icons/Icons'
import { course } from '../../data/chapter1'
import artechLogo from '../../assets/images/לוגו ארטק לבן.png'
import './Header.css'

export default function Header() {
  return (
    <header className="hdr">
      <div className="hdr__inner">
        <Link className="hdr__brand" to={course.homeHref}>
          <Icon name="bookOpen" size={26} />
          <span className="hdr__brandText">{course.title}</span>
        </Link>

        <img className="hdr__logo" src={artechLogo} alt="ארטק" />
      </div>
    </header>
  )
}
