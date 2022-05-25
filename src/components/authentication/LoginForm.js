import Button from '@material-ui/core/Button'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import WebFooter from '../../source/WebScreen/WebFooter'
import '../authentication/Login.css'
import { getQueryParams } from '../authentication/utils'

export class SignIn extends Component {
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
    this.loadQueryParams()
  }

  loadQueryParams = () => {
    let queryParams = getQueryParams()

    if (queryParams.u && queryParams.p) {
      let userName = decodeURI(queryParams.u)
      let password = decodeURI(queryParams.p)
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

  handleKeyUp(e) {
    if (e.keyCode == 9) {
      e.preventDefault()
          }
  }

  render() {
    return (
                                    
      
                        
            
                                                                                                            
                                                                              
                                          
      
      
            
      <div class="loginformnew">
        {!this.props.isNative && (
          <>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="loginform_containernew">
                <div className="login_image_container">
                  <img src={require('../../source/Images/Banner/welcome_image_desktop.png')} className="login_main_image" />
                  <img src={require('../../source/Images/Banner/uhs-logo.svg')} className="login_uhs_logo" />
                </div>

                <p className="login_new_error_text" hidden={this.props.errorMsg.length <= 0}>
                  {this.props.errorMsg}
                </p>

                <div className="login_input_container">
                  <input
                    type="text"
                    ref={this.emailInput}
                    placeholder="ENTER YOUR EMAIL"
                    name="username"
                    required
                    onChange={this.handleChange}
                    className="login_input_username"
                  />

                  <input
                    className="login_input_username"
                    id="pass"
                    type="password"
                    placeholder="ENTER YOUR PASSWORD"
                    name="password"
                    ref={this.passwordInput}
                    required
                    onChange={this.handleChange.bind(this)}
                    onKeyDown={this.handleKeyUp}
                  />

                  <span className="p-viewer" onClick={() => this.togglePassword('pass')}>
                    {this.state.isReveal ? (
                      <i className="fa fa-eye-slash" aria-hidden="true"></i>
                    ) : (
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    )}
                  </span>

                  <Button type="submit" class="login_button" disabled={this.props.disableSiginBtn}>
                    SIGN IN
                  </Button>
                </div>

                <div className="forgot_text-margin">
                  <div className="loginmobile_forgot_text" onClick={this.handleForgot.bind(this)}>
                    Forgot your password?
                  </div>
                </div>

                <div className="login_bottom_text">
                  <div className="login_bottom_subtext">Having trouble logging in?</div>
                  <div className="login_bottom_subtext">
                    <Link to="/check-registration">
                      <span className="login_plese_text">Please check </span>
                    </Link>
                    if your email has been registered on the portal.
                  </div>
                </div>
              </div>
            </form>
            <WebFooter />
          </>
        )}
      </div>
    )
  }
}
export default SignIn
