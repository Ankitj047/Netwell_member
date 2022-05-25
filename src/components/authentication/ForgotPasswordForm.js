import Button from '@material-ui/core/Button'
import React, { useEffect, useState } from 'react'
import { deviceType, isMobile, isTablet } from 'react-device-detect'
import WebFooter from '../../source/WebScreen/WebFooter'
import './Login.css'

const ForgotPasswordForm = props => {
  const [defaultValue, setDefaultValue] = useState('')

  useEffect(() => {}, [])

  const handleSendVerification = e => {
    if (e) {
      e.preventDefault()
    }
    props.handleSendVerification()
  }

            
            
  const handleKeyUp = e => {
    if (e.keyCode == 9) {
      e.preventDefault()
          }
  }

  return (
    <div>
      {deviceType == 'browser' && (isMobile == false || isMobile == 'false') && (isTablet == false || isTablet == 'false') ? (
        <div class="loginformnew">
          <form onSubmit={handleSendVerification}>
            <div class="loginform_containernew">
              <div class="login_image_container">
                <img src={require('../../source/Images/Banner/welcome_image_desktop.png')} class="login_main_image" />
                <img src={require('../../source/Images/Banner/uhs-logo.svg')} class="login_uhs_logo" />
              </div>

              <div class="login_input_container">
                <div class="checkregister_blue_text_container">
                  <div class="checkregister_having_text">Forgot your password?</div>
                  <div class="checkregister_having_subtext">Enter your Email and we will send a</div>
                  <div class="checkregister_having_subtext">message to reset your password.</div>
                </div>
                <div class="forgot-input-con">
                  <input
                    class="login_input_username"
                    type="email"
                    name="email"
                    pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$"
                    required
                    placeholder="ENTER YOUR EMAIL"
                    class="login_input_username"
                    onChange={props.handleChange}
                    onKeyDown={handleKeyUp}
                  />

                  <Button type="submit" class="checkregister_button">
                    RESET MY PASSWORD
                  </Button>
                </div>
              </div>

              <div class="checkregister_goto_subtext">
                Go back to
                <span class="rege_goto" onClick={() => props.gotoLoginScreen()}>
                  {' '}
                  Sign In
                </span>
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
            <form onSubmit={handleSendVerification}>
              <div class="loginmobile_image_container">
                <img src={require('../authentication/images/uhs-logo.png')} class="loginmobile_logo" />
                <img src={require('../../source/Images/Banner/welcome_image_mobile.png')} class="loginmobile_banner" />
              </div>

              <div class="loginmobile_input_container">
                <input
                  type="email"
                  name="email"
                  pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$"
                  required
                  placeholder="ENTER YOUR EMAIL"
                                    class="loginmobile_input_username"
                  onChange={props.handleChange}
                />

                <Button type="submit" variant="contained" color="" class="loginmobile_button">
                  RESET MY PASSWORD
                </Button>
              </div>

              <div class="loginmobile_bottom_text">
                <div class="loginmobile_text_blue">Forgot your password?</div>
                <div class="forgotmobile_text_details">
                  <div>Enter your Email and we will send a message to</div>
                  <div>reset your password</div>
                </div>
                <div class="loginmobile_bottom_subtext2">
                  <div>
                    Go to
                    <span class="loginmobile_please_check" onClick={() => props.gotoLoginScreen()}>
                      {' '}
                      Sign In
                    </span>
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

export default ForgotPasswordForm





