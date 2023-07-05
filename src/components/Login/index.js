import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMessage: false, errorMsg: ''}

  getSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  getErrorMessage = errorMsg => {
    this.setState({errorMsg, showErrorMessage: true})
  }

  clickTOLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.getSubmitSuccess(data.jwt_token)
    } else {
      this.getErrorMessage(data.error_msg)
    }
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => (
    <div className="username-container">
      <label htmlFor="username" className="label">
        USERNAME
      </label>
      <input type="text" id="username" onChange={this.getUsername} />
    </div>
  )

  renderPassword = () => (
    <div className="password-container">
      <label htmlFor="password" className="label">
        PASSWORD
      </label>
      <input type="password" id="password" onChange={this.getPassword} />
    </div>
  )

  render() {
    const {showErrorMessage, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-route-container">
        <form className="login-form-container" onSubmit={this.clickTOLogin}>
          <div className="website-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              className="website-logo"
            />
          </div>
          {this.renderUsername()}
          {this.renderPassword()}

          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMessage && <h5 className="error-message">*{errorMsg}</h5>}
        </form>
      </div>
    )
  }
}

export default Login
