import Button from '@material-ui/core/Button'
import React, { Component } from 'react'
import { deviceType, isMobile, isTablet } from 'react-device-detect'
import { Link } from 'react-router-dom'
import './Login.css'
export default class DemoReset extends Component {
  render() {
    return (
      <div>
        {deviceType == 'browser' && (isMobile == false || isMobile == 'false') && (isTablet == false || isTablet == 'false') ? (
          <div class="rege">
            <div class="rege_container">
              <div class="login_image_container">
                <img src={require('./images/image.png')} class="reset_login_main_image" />
                <img src={require('./images/uhs-logo.png')} class="reset_login_uhs_logo" />
              </div>

              {/* {props.destination} */}
              <div class="reset_note">
                We have sent a password reset code by email to avishcar@gmail.com. Enter it below to reset your password.
              </div>

              <div class="reset_container">
                <input type="text" name="verificationCode" required placeholder="Code" class="reset_input_username" />

                <input type="password" required placeholder="New Password" class="reset_input_username" />

                <input type="password" required placeholder="ENTER NEW PASSWORD" class="reset_input_username" />
              </div>

              <div class="reset_errormsg">Please enter same password</div>

              <Button type="submit" variant="contained" color="" class="reset_button">
                CHANGE PASSWORD
              </Button>

              <div class="reset_bottom_text">
                Go back to{' '}
                <Link>
                  <span class="reset_goto">Sign In</span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div class="loginmobile">
            <div class="loginmobile_header">
              <div class="loginmobile_header_text">Member Portal</div>
            </div>

            <div class="loginmobile_container">
              <form>
                <div class="loginmobile_image_container">
                  <img src={require('../authentication/images/uhs-logo.png')} class="mob_reset_loginmobile_logo" />
                  <img src={require('../authentication/images/image.png')} class="mob_reset_loginmobile_banner" />
                </div>

                <div class="mob_reset_note">
                  We have sent a password reset code by email to avishcar@gmail.com. Enter it below to reset your password.
                </div>

                <div class="mob_reset_container">
                  <input type="text" name="verificationCode" required placeholder="Code" class="mob_reset_input_username" />

                  <input type="password" required placeholder="New Password" class="mob_reset_input_username" />

                  <input type="password" required placeholder="ENTER NEW PASSWORD" class="mob_reset_input_username" />

                  <div class="mob_reset_errormsg">Please enter same password</div>

                  <Button type="submit" variant="contained" color="" class="mob_reset_button">
                    CHANGE PASSWORD
                  </Button>

                  <div class="mob_reset_bottom_text">
                    Go back to{' '}
                    <Link>
                      <span class="mob_reset_goto">Sign In</span>
                    </Link>
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
