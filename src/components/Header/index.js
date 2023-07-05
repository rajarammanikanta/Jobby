import './index.css'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

const Header = props => {
  const clickToLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="bg-container">
      <nav className="nav-bar">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <div>
          <ul className="list-items">
            <Link to="/" className="links">
              <li className="home">Home</li>
            </Link>
            <Link to="/jobs" className="links">
              <li className="jobs">Jobs</li>
            </Link>
          </ul>
        </div>
        <button type="button" className="logout-button" onClick={clickToLogout}>
          Logout
        </button>
      </nav>
    </div>
  )
}

export default withRouter(Header)
