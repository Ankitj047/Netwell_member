import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import { Auth } from 'aws-amplify'
import axios from 'axios'
import React, { Component } from 'react'
import Modal1 from 'react-awesome-modal'
import { Button } from 'react-bootstrap'
import { deviceType, isMobile, isTablet } from 'react-device-detect'
import { getProperEmailId, getUserDetails } from '../../actions/homeActions'
import customStyle from '../../components/healthqn/CSS/stylesheet_UHS'
import FirstTimePasswordChange from './FirstTimePasswordChange'
import ForgotPassword from './ForgotPassword'
import Loader from './loader'
import Login from './LoginForm'
import LoginFormMobile from './LoginFormMobile'
import LoginOTPForm from './LoginOTPForm'
import './style.scss'

const NextButton = withStyles(customStyle.viewBtn)(Button)

export class SignIn extends Component {
  constructor(props) {
    super(props)
    let emailToReset = sessionStorage.getItem('emailToReset')

    this.state = {
      username: '',
      password: '',

      signedin: false,
      confirmationCode: '',
      forgotPass: emailToReset ? true : false,
      firstTimepwdRest: false,
            sendVerification: false,
      verificationCode: '',
      sendMFA: false,
            user: {},
      errorMesssage: '',
      showLoader: false,
      isNative: false,
      tempNotAvailableModal: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleForgot = this.handleForgot.bind(this)
    this.handleSendVerification = this.handleSendVerification.bind(this)

    this.confirmSignIn = this.confirmSignIn.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.autoSignIn = this.autoSignIn.bind(this)
  }

  componentDidMount() {
    this.loadQueryParams()
    document.body.classList.add('bodyColor')
  }

    loadQueryParams = () => {
    let queryParams = getQueryParams()
    let client_id = localStorage.getItem('CLIENT_ID')

    let USER_FROM = sessionStorage.getItem('USER_FROM')
    if (USER_FROM && USER_FROM === 'native') {
      this.toggleLoader(true)
      this.setState({
        isNative: true
      })
      this.autoSignIn(queryParams.u, queryParams.type)
    }
  }

  async autoSignIn(email, type) {
    let userData = await getUserDetails(email)
    axios
      .get(process.env.REACT_APP_NEW_BASE_URL_NOTIFICATION + 'getSessionDetails/' + email + '/' + type)
      .then(response => {
        console.log(response)
        if (response.data.code === 200) {
          if (response.data.response.activeflag) {
            let data = response.data.response
            sessionStorage.setItem('USER_ACTIVE_SESSION', 'true')
            sessionStorage.setItem('TYPE', type)
            if (userData) {
              let find = userData.data.memberIdCardList[userData.data.memberIdCardList.length - 1]
              localStorage.setItem('SOURCE', find.source)
              localStorage.setItem('CLIENT_ID', find.clientId)
              let contact = userData.data.memberIdCardList[userData.data.memberIdCardList.length - 1].planInfo.find(
                obj => obj.idcardField == 'contact number'
              )
              contact ? localStorage.setItem('CONTACT_NUMBER', contact.fieldValue) : localStorage.setItem('CONTACT_NUMBER', 'NA')

              localStorage.setItem('userMail', data.email)
              localStorage.setItem('subscriberName', data.username)
              localStorage.setItem('phone', data.phone)
              if (localStorage.getItem('popupShow') && localStorage.getItem('popupShow') === 'false') {
                localStorage.setItem('popupShow', 'false')
              } else {
                localStorage.setItem('popupShow', 'true')
              }

              if (localStorage.getItem('healthQuestionModal') && localStorage.getItem('healthQuestionModal') === 'false') {
                localStorage.setItem('healthQuestionModal', 'false')
              } else {
                localStorage.setItem('healthQuestionModal', 'true')
              }
                                                        
                            
                                                                                    
              
                                          
              
                            
                            
                                          
                                          
                                                                                                  
                                          
              
              
                                        }
            window.location.reload()
                      } else {
            sessionStorage.setItem('USER_ACTIVE_SESSION', 'false')
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  
  componentWillUnmount() {
    document.body.classList.remove('bodyColor')
  }

  handleChange(e) {
    console.log('change')
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  tempModalOpen = () => {
    this.setState({
      tempNotAvailableModal: true
          })
  }

  async handleSubmit(e) {
    if (e) {
      e.preventDefault()
    }
    this.toggleLoader(true)
    const { signedin, username, password, user } = this.state
    this.setState({
      errorMesssage: ''
    })

    let email = await getProperEmailId(username)
    let userData = await getUserDetails(email)

    console.log('username:::', username)
        const authUser = await Auth.signIn({
      username: email,
      password: password
    }).catch(err => {
                  this.setState({
        errorMesssage: 'Incorrect username or password.',
        disableSiginBtn: false
      })
      this.toggleLoader(false)
    })
    this.toggleLoader(false)
    if (authUser) {
      if (authUser.challengeName === 'SMS_MFA' || authUser.challengeName === 'SOFTWARE_TOKEN_MFA') {
        this.setState({
          user: authUser,
          sendMFA: true,
          disableSiginBtn: false
        })
      } else if (authUser.challengeName == 'NEW_PASSWORD_REQUIRED') {
        this.setState({
          user: authUser,
          disableSiginBtn: false,
          firstTimepwdRest: true
        })
      } else {
                this.setState({
          disableSiginBtn: false
        })
        if (userData) {
          let find = userData.data.memberIdCardList[userData.data.memberIdCardList.length - 1]
          localStorage.setItem('SOURCE', find.source)
          localStorage.setItem('CLIENT_ID', find.clientId)
          let contact = userData.data.memberIdCardList[userData.data.memberIdCardList.length - 1].planInfo.find(
            obj => obj.idcardField == 'contact number'
          )
          contact ? localStorage.setItem('CONTACT_NUMBER', contact.fieldValue) : localStorage.setItem('CONTACT_NUMBER', 'NA')
        }
        window.location.reload()
      }
    }
  }

  handleForgot(e) {
    e.preventDefault()
        this.setState({
      forgotPass: true
    })
  }

  handleSendVerification(e) {
    e.preventDefault()
    const { username } = this.state
    Auth.forgotPassword(username)
      .then(data => console.log(data))
      .catch(err => console.log(err))
    this.setState({
      sendVerification: true
    })
  }

  async confirmSignIn(e) {
    e.preventDefault()
    const { verificationCode, sendMFA, signedin, user, username } = this.state
    this.toggleLoader(true)
    let userData = await getUserDetails(username)

    const loggedUser = await Auth.confirmSignIn(
      user,       verificationCode,       'SMS_MFA'
          )
      .then(() => {
        console.log('sign in confirm success')
        if (userData) {
          let find = userData.data.memberIdCardList[userData.data.memberIdCardList.length - 1]
          localStorage.setItem('SOURCE', find.source)
          localStorage.setItem('CLIENT_ID', find.clientId)
          let contact = userData.data.memberIdCardList[userData.data.memberIdCardList.length - 1].planInfo.find(
            obj => obj.idcardField == 'contact number'
          )
          contact ? localStorage.setItem('CONTACT_NUMBER', contact.fieldValue) : localStorage.setItem('CONTACT_NUMBER', 'NA')
        }
        window.location.reload()
        this.toggleLoader(false)
              })
      .catch(err => {
        console.log(err)
        this.toggleLoader(false)
        this.setState({
          errorMesssage: err.message
        })

              })
  }

  async handleLogout() {
    console.log('trying to logout')
    let curUser = await Auth.currentAuthenticatedUser()
    console.log(curUser)
    await Auth.signOut()
    localStorage.clear()
    sessionStorage.clear()
    curUser = await Auth.currentAuthenticatedUser()
    console.log(curUser)
  }

  toggleLoader = value => {
    this.setState({
      showLoader: value
    })
  }
  getVIew() {
    const { signedin, forgotPass, sendVerification, verificationCode, sendMFA, user, firstTimepwdRest } = this.state
    if (forgotPass) {
      return <ForgotPassword confirmSignIn={this.confirmSignIn} toggleLoader={this.toggleLoader} gotoLoginScreen={this.gotoLoginScreen} />
    } else if (sendMFA) {
      return (
        <LoginOTPForm
          user={user}
          handleChange={this.handleChange}
          confirmSignIn={this.confirmSignIn}
          errorMesssage={this.state.errorMesssage}
          handleSubmit={this.handleSubmit}
        />
      )
    } else if (signedin) {
      return (
        <Card style={{ padding: '20px', marginTop: '50px' }}>
          welcome you are signed in
          <button onClick={this.handleLogout}>logout</button>
        </Card>
      )
    } else if (firstTimepwdRest) {
      return <FirstTimePasswordChange user={user} confirmSignIn={this.confirmSignIn} toggleLoader={this.toggleLoader} />
    } else {
      return (
        <div>
          {deviceType == 'browser' && (isMobile == false || isMobile == 'false') && (isTablet == false || isTablet == 'false') ? (
            <Login
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              handleForgot={this.handleForgot}
              handleToggle={this.props.handleToggle}
              errorMsg={this.state.errorMesssage}
              disableSiginBtn={this.state.disableSiginBtn}
              gotoCheckRegistration={this.gotoCheckRegistration}
              isNative={this.state.isNative}
            />
          ) : (
            <LoginFormMobile
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              handleForgot={this.handleForgot}
              handleToggle={this.props.handleToggle}
              errorMsg={this.state.errorMesssage}
              disableSiginBtn={this.state.disableSiginBtn}
              gotoCheckRegistration={this.gotoCheckRegistration}
              isNative={this.state.isNative}
            />
          )}
        </div>
      )
    }
  }

  gotoLoginScreen = () => {
    this.setState({
      forgotPass: false,
      firstTimepwdRest: false,
      signedin: false,
      sendMFA: false
    })
  }

  gotoCheckRegistration = () => {
    this.props.history.push('/check-registration')
  }

  tempModalclose = () => {
    this.setState({ tempNotAvailableModal: false })

          }
  render() {
    return (
      <>
        {this.getVIew()}
        <Loader showLoader={this.state.showLoader} />
        <Modal1 visible={this.state.tempNotAvailableModal} effect="fadeInUp">
          <div style={{ width: '80vw' }}>
            <div className="tempModalTxt">
              We’re facing some technical difficulties, due to which this feature is currently unavailable. For support, call Member
              Services at {localStorage.getItem('CONTACT_NUMBER')}, Monday through Friday, 8.00am to 8.00pm CST.
            </div>
          </div>
          <div className="mqalert_button_div">
            <NextButton
              variant="contained"
              class="yellow_popup_caption_button"
              onClick={this.tempModalclose}
              style={{
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                height: '37px',
                backgroundColor: '#eb5757',
                borderRadius: '20px',
                color: '#fff',
                fontWeight: 500
              }}
            >
              CLOSE
            </NextButton>
          </div>
        </Modal1>
      </>
    )
  }
}

export default SignIn

export const getQueryParams = () => {
  let url = window.location.href
  let queryObj = {}

  if (url.split('login?').length > 1) {
    let queryString = url.split('login?')[1]
    let queryParams = new URLSearchParams(queryString)
    let userFrom = queryParams.get('userFrom')
    let type = queryParams.get('type')
        
        
    userFrom && sessionStorage.setItem('USER_FROM', userFrom)

    let userName = decodeURI(queryParams.get('username'))
    let password = decodeURI(queryParams.get('password'))
    queryObj = { u: userName, p: password, type: type }
  }
  return queryObj
}
