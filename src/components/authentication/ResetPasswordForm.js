import Button from '@material-ui/core/Button'
import { Auth } from 'aws-amplify'
import React, { useState } from 'react'
import { deviceType, isMobile, isTablet } from 'react-device-detect'
import WebFooter from '../../source/WebScreen/WebFooter'
import InputPassword from './InputPasswordBox'
import './Login.css'
import PasswordValidations from './PwdValidations'

function ResetPasswordForm(props) {
  const [verificationCode, setVerification] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [disableResetBtn, setdisableResetBtn] = useState(true)

  const handleConfirmVerification = e => {
    e.preventDefault()
                console.log(password)
    if (password == confirmPassword) {
      props.toggleLoader(true)
      Auth.forgotPasswordSubmit(props.email, verificationCode, password)
        .then(data => {
          props.toggleLoader(false)
          console.log('password reset success')
          console.log(data)
          window.location.reload()
        })
        .catch(err => {
          props.toggleLoader(false)
          console.log(err.message)
          setErrorMessage(err.message)
        })
    } else {
      setErrorMessage('Please enter same password')
    }
  }

  const handleChange = e => {
            if (e.target.name == 'verificationCode') {
      setVerification(e.target.value)
    } else if (e.target.name == 'password') {
      console.log(e.target.name)
      let password = e.target.value
      setPassword(e.target.value)
    } else if (e.target.name == 'confirmPassword') {
      setConfirmPassword(e.target.value)
    }
  }

  const toggleResetBtn = allPassed => {
    setdisableResetBtn(!allPassed)
  }

  return (
    <div>
      {deviceType == 'browser' && (isMobile == false || isMobile == 'false') && (isTablet == false || isTablet == 'false') ? (
        <div class="loginformnew">
          <form
                    >
            <div class="loginform_containernew">
              <div class="login_image_container">
                <img src={require('../../source/Images/Banner/welcome_image_desktop.png')} class="login_main_image" />
                <img src={require('../../source/Images/Banner/uhs-logo.svg')} class="login_uhs_logo" />
              </div>

              <div class="reset_note">
                We have sent a password reset code by email to {props.destination}. Enter it below to reset your password.
              </div>

              {/* <p class="login_new_error_text" hidden={this.props.errorMsg.length <= 0}>{this.props.errorMsg}</p> */}

              <div class="login_input_container_reset_div">
                <input
                  placeholder="CODE"
                  class="xxxxxreset_input_username"
                  type="text"
                  name="verificationCode"
                  required
                  onChange={handleChange}
                />

                <div className="inputpassword_box_container">
                  <InputPassword handleChange={handleChange} name={'password'} placeholder="NEW PASSWORD" />
                </div>

                <div className="inputpassword_box_container">
                  <InputPassword handleChange={handleChange} name={'confirmPassword'} placeholder="ENTER NEW PASSWORD" />
                </div>
              </div>
              <div style={{ marginTop: '2vw' }}>
                <p className="a-errorMessage" style={{ marginTop: '10px' }} hidden={errorMessage.length <= 0}>
                  {errorMessage}
                </p>
              </div>

              <div class="reset_button_top_div">
                <button type="submit" className="checkregister_button margin_top mb-2" onClick={handleConfirmVerification}>
                  CHANGE PASSWORD
                </button>
              </div>

              <div class="passowrd_validation_center">
                <PasswordValidations password={password} allPassed={toggleResetBtn} />
              </div>

              <div class="checkregister_goto_subtext">
                Go back to{' '}
                <span class="rege_goto" onClick={() => props.gotoLoginScreen()}>
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
            {/* <MenuIcon style={{ color: '#ffffff', marginRight: '4vw',width:'8vw' }} /> */}
            <div class="loginmobile_header_text">Member Portal</div>
          </div>

          <div class="loginmobile_container">
            <form>
              <div class="loginmobile_image_container">
                <img src={require('../../source/Images/Banner/uhs-logo.svg')} class="loginmobile_logo" />
                <img src={require('../../source/Images/Banner/welcome_image_mobile.png')} class="loginmobile_banner" />
              </div>

              <div class="reset_password_mail_text_msg">
                <div class="forgotmobile_text_details">
                  <div>We have sent a password reset code by email to {props.destination}. Enter it below to reset your password.</div>
                </div>
              </div>

              <div class="loginmobile_input_container">
                {/* <p class="mobile_login_new_error_text" hidden={this.props.errorMsg.length <= 0}>{this.props.errorMsg}</p> */}

                <div class="mobile-linput">
                  <input
                    placeholder="CODE"
                    class="loginmobile_input_username"
                    type="text"
                    name="verificationCode"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div style={{ position: 'relative', marginBottom: '40px' }}>
                  <InputPassword handleChange={handleChange} name={'password'} placeholder="NEW PASSWORD" />
                </div>

                <div style={{ position: 'relative', marginBottom: '30px' }}>
                  <InputPassword handleChange={handleChange} name={'confirmPassword'} placeholder="ENTER NEW PASSWORD" />
                </div>

                <p className="a-errorMessage" style={{ marginTop: '10px' }} hidden={errorMessage.length <= 0}>
                  {errorMessage}
                </p>
                <Button type="submit" variant="contained" color="" class="loginmobile_button" onClick={handleConfirmVerification}>
                  CHANGE PASSOWRD
                </Button>
              </div>

              <div className="mt-3 passowrd_validation_center">
                <PasswordValidations password={password} allPassed={toggleResetBtn} />
              </div>

              <div class="loginmobile_bottom_text">
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

export default ResetPasswordForm














