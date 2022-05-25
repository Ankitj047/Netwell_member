import Button from '@material-ui/core/Button'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../authentication/Login.css'
export default class LoginFormMobile extends Component {
  constructor(props) {
    super(props)
    this.emailInput = React.createRef()
    this.passwordInput = React.createRef()

    this.state = {
      username: '',
      password: '',
      errorflag: false,
      errorshow: false,
      isReveal: true
    }
  }

  componentDidMount() {
    let queryParams = new URLSearchParams(window.location.search)
    if (queryParams.has('username') && queryParams.has('password')) {
      let userName = decodeURI(queryParams.get('username'))
      let password = decodeURI(queryParams.get('password'))
      this.emailInput.current.value = userName
      this.passwordInput.current.value = password

      let usernameObj = {
        target: {
          name: 'username',
          value: userName
        }
      }
      this.props.handleChange(usernameObj)

      let passwordObj = {
        target: {
          name: 'password',
          value: password
        }
      }
      this.props.handleChange(passwordObj)
    }
  }

  handleSubmit = event => {
    this.props.handleSubmit(event)
  }

  handleChange = event => {
    this.props.handleChange(event)
  }

  handleForgot = event => {
    console.log('inside handle logout')
    this.props.handleForgot(event)
  }
  gotoCheckRegistration = event => {
    this.props.gotoCheckRegistration()
  }

  togglePassword = id => {
    this.setState({ isReveal: !this.state.isReveal })
    var pass = document.getElementById(id)
    if (pass.type == 'password') {
      pass.type = 'text'
    } else {
      pass.type = 'password'
    }
  }

  render() {
    return (
      <div class="loginmobile">
        <div class="loginmobile_header">
          {/* <MenuIcon style={{ color: '#ffffff', marginRight: '4vw',width:'8vw' }} /> */}
          <div class="loginmobile_header_text">Member Portal</div>
        </div>

        {!this.props.isNative && (
          <div className="loginmobile_container">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="loginmobile_image_container">
                <img src={require('../../source/Images/Banner/uhs-logo.svg')} className="loginmobile_logo" />
                <img src={require('../../source/Images/Banner/welcome_image_mobile.png')} className="loginmobile_banner" />
              </div>

              <div className="loginmobile_input_container">
                <p className="mobile_login_new_error_text" hidden={this.props.errorMsg.length <= 0}>
                  {this.props.errorMsg}
                </p>
                <div className="mobile-linput">
                  <input
                    type="text"
                    ref={this.emailInput}
                    placeholder="ENTER YOUR EMAIL"
                    name="username"
                    required
                    onChange={this.handleChange}
                    className="loginmobile_input_username"
                  />
                </div>
                <div style={{ position: 'relative', marginBottom: '15px' }}>
                  <input
                    type="password"
                    id="pass"
                    placeholder="ENTER YOUR PASSWORD"
                    name="password"
                    ref={this.passwordInput}
                    required
                    onChange={this.handleChange.bind(this)}
                    className="loginmobile_input_username"
                  />
                  <span className="p-viewer-mob" onClick={() => this.togglePassword('pass')}>
                    {this.state.isReveal ? (
                      <i className="fa fa-eye-slash" aria-hidden="true"></i>
                    ) : (
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    )}
                  </span>
                </div>

                <div className="mobile_forgot_text" onClick={this.handleForgot.bind(this)}>
                  Forgot your password?
                </div>

                <Button type="submit" variant="contained" color="" class="loginmobile_button" disabled={this.props.disableSiginBtn}>
                  SIGN IN
                </Button>
              </div>

              <div className="loginmobile_bottom_text">
                <div className="loginmobile_bottom_subtext">Having trouble logging in?</div>
                <div className="loginmobile_bottom_subtext2">
                  <div>
                    <Link to="/check-registration">
                      <span className="loginmobile_please_check">Please check </span>
                    </Link>
                    if your email has been{' '}
                  </div>
                  <div>registered on the portal.</div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    )
  }
}
