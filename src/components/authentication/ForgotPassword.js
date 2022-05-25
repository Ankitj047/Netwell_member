import { Auth } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { getProperEmailId } from '../../actions/homeActions'
import awsconfig from '../../aws-exports'
import apiService from '../../utils/apiservice'
import AlertBox from './AlertBox'
import ForceChangeUserAlert from './checkregistration/Alert'
import ForgotPasswordForm from './ForgotPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'

const ForgotPassword = props => {
  const [sendVerification, setSendVerification] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
  const [userName, seUserName] = useState('')
  const [codeDestination, setCodeDestination] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [showResendAlert, setshowResendAlert] = useState(false)
  const [emailStatus, setEmailStatus] = useState('')
  useEffect(() => {
    console.log('forgot password')
    let emailToReset = sessionStorage.getItem('emailToReset')
    if (emailToReset) {
      seUserName(emailToReset)
      handleSendVerification(emailToReset)
      sessionStorage.setItem('emailToReset', '')
    }
  }, [])

  const handleChange = e => {
        seUserName(e.target.value)
  }

  const handleSendVerification = async emailToReset => {
    let _userName = emailToReset ? emailToReset : userName
    props.toggleLoader(true)
    let email = await getProperEmailId(_userName)
    seUserName(email)
    checkRegistration(email)
  }

  const checkRegistration = _userName => {
    setAlertMsg('Sorry! We could not find an active registration for ' + _userName)
    setEmailStatus('')

        console.log('session started')
    let request = {
      cognitoUserPool: awsconfig.aws_user_pools_id,
      username: _userName
    }

    apiService
      .post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/getuser', request)
      .then(resp => {
        let userStatus = 'NotFound'
        if (resp && resp.data && resp.data.userStatus) {
          userStatus = resp.data.userStatus
          if (userStatus == 'CONFIRMED') {
            console.log(_userName)
            Auth.forgotPassword(_userName)
              .then(data => {
                console.log('send verification')
                console.log(data)
                props.toggleLoader(false)
                setSendVerification(true)
                setCodeDestination(data.CodeDeliveryDetails.Destination)
              })
              .catch(err => {
                props.toggleLoader(false)
                let msg = 'Please try again!'
                if (err.message) {
                  msg = err.message
                }
                alert(msg)
              })
          } else if (userStatus == 'FORCE_CHANGE_PASSWORD') {
                                                            apiService
              .post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/resetuser', request)
              .then(resp => {
                props.toggleLoader(false)
                setshowResendAlert(true)
              })
              .catch(err => {
                console.log(err)
                props.toggleLoader(false)
                let msg = 'Please try again!'
                if (err.message) {
                  msg = err.message
                }
                alert(msg)
              })
          } else {
            setShowAlert(true)
            props.toggleLoader(false)
          }
        } else {
          setShowAlert(true)
          props.toggleLoader(false)
        }
      })
      .catch(err => {
        setShowAlert(true)
        props.toggleLoader(false)
      })

      }

  const closeAlert = () => {
    setShowAlert(false)
    setshowResendAlert(false)
  }

  /**
   * Resend email
   */
  const resendEmail = () => {
    props.toggleLoader(true)
    setEmailStatus('')
    let request = {
      cognitoUserPool: awsconfig.aws_user_pools_id,
      username: userName
    }
    apiService
      .post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/resetuser', request)
      .then(resp => {
        props.toggleLoader(false)
        setEmailStatus('Email sent succesfully.')
      })
      .catch(err => {
        console.log(err)
        props.toggleLoader(false)
        let msg = 'Please try again!'
        if (err.message) {
          msg = err.message
        }
        alert(msg)
      })
  }

  if (!sendVerification) {
    return (
      <>
        <ForgotPasswordForm
          handleChange={handleChange}
          handleSendVerification={handleSendVerification}
          email={userName}
          toggleLoader={props.toggleLoader}
          gotoLoginScreen={props.gotoLoginScreen}
        />
        <AlertBox content={alertMsg} open={showAlert} handleClose={closeAlert} />
        <ForceChangeUserAlert
          open={showResendAlert}
          email={userName}
          currentView={'ForceChangePassword'}
          closeAlert={closeAlert}
          resendEmail={resendEmail}
          emailStatus={emailStatus}
          gotoResetPassword={null}
        />
      </>
    )
  } else {
    return (
      <ResetPasswordForm
        gotoLoginScreen={props.gotoLoginScreen}
        destination={codeDestination}
        email={userName}
        toggleLoader={props.toggleLoader}
      />
    )
  }
}
export default ForgotPassword
