import Button from '@material-ui/core/Button'
import React, { Component } from 'react'
import { deviceType, isMobile, isTablet } from 'react-device-detect'
import { Link } from 'react-router-dom'
import WebFooter from '../../../source/WebScreen/WebFooter'
import '../Login.css'

export class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileNumber: ''
    }
  }
  checkRegistration = event => {
    this.props.checkRegistration(event)
    event.preventDefault()
    console.log(event)
  }

  handleChange1 = (event, type) => {
    this.props.handleChange1(event)
  }

  toggleShow = event => {
    this.props.toggleShow(event)
  }

  handleKeyUp(e) {
    if (e.keyCode == 9) {
      e.preventDefault()
    }
  }

  render() {
    return (
      <div>
        {deviceType == 'browser' && (isMobile == false || isMobile == 'false') && (isTablet == false || isTablet == 'false') ? (
          <div class="loginformnew">
            <form onSubmit={this.checkRegistration.bind(this)}>
              <div class="loginform_containernew">
                <div class="login_image_container">
                  <img src={require('../../../source/Images/Banner/welcome_image_desktop.png')} class="login_main_image" />
                  <img src={require('../../../source/Images/Banner/uhs-logo.svg')} class="login_uhs_logo" />
                </div>

                <div class="login_input_container">
                  <div class="checkregister_blue_text_container">
                    <div class="checkregister_having_text">Having trouble logging in?</div>
                    <div class="checkregister_having_subtext">Let’s check if your email has</div>
                    <div class="checkregister_having_subtext">been registered on the portal.</div>
                  </div>

                  <div class="forgot-input-con">
                    <input
                      class="login_input_username"
                      type="email"
                      name="email"
                      pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$"
                      required
                      onChange={this.handleChange1}
                      placeholder="ENTER YOUR EMAIL"
                      onKeyDown={this.handleKeyUp}
                    />

                    <Button type="submit" class="checkregister_button">
                      CHECK REGISTRATION
                    </Button>
                  </div>
                </div>

                <div class="checkregister_goto_subtext">
                  Go back to{' '}
                  <Link to="/login">
                    <span class="rege_goto">Sign In</span>
                  </Link>
                </div>
              </div>
            </form>
            <WebFooter />
          </div>
        ) : (
          <div class="loginmobile">
            <div class="loginmobile_header">
              {/* <MenuIcon style={{ color: '#ffffff', marginRight: '20px' }} /> */}
              <div class="loginmobile_header_text">Member Portal</div>
            </div>

            <div class="loginmobile_container">
              <form onSubmit={this.checkRegistration.bind(this)}>
                <div class="loginmobile_image_container">
                  <img src={require('../images/uhs-logo.png')} class="loginmobile_logo" />
                  <img src={require('../../../source/Images/Banner/welcome_image_mobile.png')} class="loginmobile_banner" />
                </div>

                <div class="loginmobile_input_container">
                  <input
                    type="email"
                    name="email"
                    pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$"
                    required
                    onChange={this.handleChange1}
                    placeholder="ENTER YOUR EMAIL"
                    class="loginmobile_input_username"
                  />

                  <Button type="submit" variant="contained" color="" class="loginmobile_button">
                    CHECK REGISTRATION
                  </Button>
                </div>

                <div class="loginmobile_bottom_text">
                  <div class="loginmobile_text_blue">Having trouble logging in?</div>
                  <div class="forgotmobile_text_details">
                    <div>Let’s check if your email has been registered </div>
                    <div>on the portal</div>
                  </div>
                  {/* <div class="loginmobile_bottom_subtext3"></div> */}
                  <div class="loginmobile_bottom_subtext2">
                    <div>
                      Go to
                      <Link to="/login">
                        <span class="loginmobile_please_check"> Sign In</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default SignUpForm
