import Button from '@material-ui/core/Button'
import React, { Component } from 'react'
import { deviceType, isMobile, isTablet } from 'react-device-detect'
import WebFooter from '../../source/WebScreen/WebFooter'
import './Login.css'

export class LoginOTPForm extends Component {
  constructor(props) {
    super(props)

    console.log(props.errorMesssage)
  }

  render() {
    return (
      <div>
        {deviceType == 'browser' && (isMobile == false || isMobile == 'false') && (isTablet == false || isTablet == 'false') ? (
          <div class="loginformnew">
            <form>
              <div class="loginform_containernew">
                <div class="login_image_container">
                  <img src={require('../../source/Images/Banner/welcome_image_desktop.png')} class="login_main_image" />
                  <img src={require('../../source/Images/Banner/uhs-logo.svg')} class="login_uhs_logo" />
                </div>

                <h4 className="label-head text-center">
                  We have delivered the authentication code by SMS to
                  {this.props.user.challengeParam.CODE_DELIVERY_DESTINATION}. Please enter the code to complete authentication.
                </h4>

                <p className="a-errorMessage" hidden={this.props.errorMesssage.length <= 0}>
                  The code entered is invalid, please try again.
                </p>
                <div class="login_input_container">
                  <input
                    type="password"
                                        name="verificationCode"
                    required
                    onChange={this.props.handleChange}
                    class="login_input_username"
                  />

                  <Button type="submit" class="login_button" onClick={this.props.confirmSignIn}>
                    SIGN IN
                  </Button>
                </div>

                <div class="text-center">
                  <span>Didn't receive?</span>{' '}
                  <span
                    class="mfa_resend_code"
                    onClick={() => {
                      this.props.handleSubmit()
                    }}
                  >
                    Resend Code
                  </span>
                </div>
              </div>
            </form>
            <WebFooter />
          </div>
        ) : (
          <div class="loginmobile">
            <div class="loginmobile_header">
              {/* <MenuIcon style={{ color: '#ffffff', marginRight: '4vw',width:'8vw' }} /> */}
              <div class="loginmobile_header_text">Member Portal</div>
            </div>

            <div class="loginmobile_container">
              <form
                            >
                <div class="loginmobile_image_container">
                  <img src={require('../../source/Images/Banner/uhs-logo.svg')} class="loginmobile_logo" />
                  <img src={require('../../source/Images/Banner/welcome_image_mobile.png')} class="loginmobile_banner" />
                </div>

                <h4 className="label-head text-center">
                  We have delivered the authentication code by SMS to
                  {this.props.user.challengeParam.CODE_DELIVERY_DESTINATION}. Please enter the code to complete authentication.
                </h4>

                <p className="a-errorMessage" hidden={this.props.errorMesssage.length <= 0}>
                  The code entered is invalid, please try again.
                </p>

                <div class="loginmobile_input_container">
                  {/* <p class="mobile_login_new_error_text" hidden={this.props.errorMsg.length <= 0}>{this.props.errorMsg}</p> */}
                  <div class="mobile-linput">
                    <input
                      type="password"
                                            name="verificationCode"
                      required
                      onChange={this.props.handleChange}
                      class="loginmobile_input_username"
                    />
                  </div>

                  <Button type="submit" variant="contained" color="" class="loginmobile_button mb-5" onClick={this.props.confirmSignIn}>
                    SIGN IN
                  </Button>
                </div>

                {/* <div class="loginmobile_bottom_text">
                <div class="loginmobile_bottom_subtext">Having trouble logging in?</div>
                <div class="loginmobile_bottom_subtext2">
                <div>
                if your email has been{' '}
                </div>
                <div>registered on the portal.</div>
                </div>
                </div> */}
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default LoginOTPForm






