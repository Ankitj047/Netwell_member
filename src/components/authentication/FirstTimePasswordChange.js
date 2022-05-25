import Button from '@material-ui/core/Button'
import { Auth } from 'aws-amplify'
import React, { useState } from 'react'
import { deviceType, isMobile, isTablet } from 'react-device-detect'
import WebFooter from '../../source/WebScreen/WebFooter'
import '../authentication/Login.css'
import { getQueryParams } from '../authentication/utils'
import InputPassword from './InputPasswordBox'
import PasswordValidations from './PwdValidations'
function ResetPasswordForm(props) {
  const [verificationCode, setVerification] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [disableSendBtn, setDisableSendBtn] = useState(true)

  const handleConfirmVerification = e => {
    e.preventDefault()
    console.log('calling reset')
    console.log(props.email)
    console.log(verificationCode)
    console.log(password)
    if (password == confirmPassword) {
      props.toggleLoader(true)
      Auth.completeNewPassword(props.user, password)
        .then(user => {
          console.log(user)
          props.toggleLoader(false)
          let queryParams = getQueryParams()
          console.log(queryParams)
          if (queryParams.u) {
            let userName = decodeURI(queryParams.u)
            let url = window.location.href.split('?')[0] + '?u=' + userName + '&p=' + password
            window.location.replace(url)
          } else {
            window.location.reload()
          }
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
    if (e.target.name == 'password') {
      setPassword(e.target.value)
    } else if (e.target.name == 'confirmPassword') {
      setConfirmPassword(e.target.value)
    }
  }
  const toggleResetBtn = allPassed => {
    setDisableSendBtn(!allPassed)
  }

  return (
    <div>
      {deviceType == 'browser' && (isMobile == false || isMobile == 'false') && (isTablet == false || isTablet == 'false') ? (
        <form className="main-form">
          <div class="rege">
            <div class="rege_container">
              <div class="login_image_container">
                <img src={require('../../source/Images/Banner/welcome_image_desktop.png')} class="reset_login_main_image" />
                <img src={require('../../source/Images/Banner/uhs-logo.svg')} class="reset_login_uhs_logo" />
              </div>

              <div class="firsttime_changepassword_text">Change Password</div>
              <div class="firsttime_changepassword_subtext">Please enter your new password below.</div>

              <p className="reset_errormsg" hidden={errorMessage.length <= 0} style={{}}>
                {errorMessage}
              </p>

              <div class="reset_container">
                <div className="a-form-ctrl_web firsttime_margin_class">
                  <p className="">New Password</p>
                  <InputPassword handleChange={handleChange} name={'password'} />
                </div>

                <div className="a-form-ctrl_web firsttime_margin_class">
                  <p className="">Enter New Password Again</p>
                  <InputPassword handleChange={handleChange} name={'confirmPassword'} />
                </div>
              </div>
              <button type="submit" className="firsettime_send_button" onClick={handleConfirmVerification}>
                Send
              </button>

              <div class="mb-3">
                <PasswordValidations password={password} allPassed={toggleResetBtn} />
              </div>
              <WebFooter />
            </div>
          </div>
        </form>
      ) : (
        <div class="loginmobile">
          <div class="loginmobile_header">
            <div class="loginmobile_header_text">Member Portal</div>
          </div>

          <div class="loginmobile_container">
            <form>
              <div class="loginmobile_image_container">
                <img src={require('../../source/Images/Banner/uhs-logo.svg')} class="loginmobile_logo" />
                <img src={require('../../source/Images/Banner/welcome_image_mobile.png')} class="loginmobile_banner" />
              </div>

              <div class="firsttimemobile_bottom_text">
                <div class="firsttimemobile_bottom_subtext">Change Password</div>
                <div class="firsttimemobile_bottom_subtext2">
                  <div>Please enter your new passsword below.</div>
                </div>
              </div>

              <div class="loginmobile_input_container">
                <p className="a-errorMessage" hidden={errorMessage.length <= 0} style={{ marginTop: '10px' }}>
                  {errorMessage}
                </p>

                <div class="mobile-linput"></div>
                <div style={{ position: 'relative', marginBottom: '40px' }}>
                  <InputPassword handleChange={handleChange} name={'password'} placeholder="NEW PASSWORD" />
                </div>

                <div style={{ position: 'relative', marginBottom: '30px' }}>
                  <InputPassword handleChange={handleChange} name={'confirmPassword'} placeholder="NEW PASSWORD AGAIN" />
                </div>

                <Button type="submit" variant="contained" color="" class="loginmobile_button" onClick={handleConfirmVerification}>
                  Send
                </Button>
              </div>

              <div className="mt-3 passowrd_validation_center">
                <PasswordValidations password={password} allPassed={toggleResetBtn} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResetPasswordForm
