import React, { Component } from 'react'
import { getProperEmailId } from '../../actions/homeActions'
import awsconfig from '../../aws-exports'
import apiService from '../../utils/apiservice'
import AlertBox from './checkregistration/Alert'
import CheckRegistrationForm from './checkregistration/CheckRegistration'
import UserConfirmed from './checkregistration/UserConfirmed'
import UserForceChangePwd from './checkregistration/UserForceChangePwd'
import UserNotFound from './checkregistration/UserNotFound'
import Loader from './loader'
import './style.scss'

export const views = {
  CheckRegistration: 'CheckRegistration',
  NotFound: 'NotFound',
  Confirmed: 'Confirmed',
  ForceChangePassword: 'ForceChangePassword'
}
export class CheckRegistration extends Component {
  constructor(props) {
    super(props)
    console.log(props, 'from reg')
    this.state = {
      email: '',
      phone: '',
      userState: '',
      currentView: views.CheckRegistration,
      errorMessage: '',
      errorConfirm: '',
      countryCode: '+1',
      showLoader: false,
      hidePassword: true
    }

    this.handleChange1 = this.handleChange1.bind(this)
  }

  componentDidMount() {
    document.body.classList.add('bodyc')
  }
  componentWillUnmount() {
    document.body.classList.remove('bodyc')
  }

  handleChange1 = e => {
    console.log(e)
    let targetValue = e.target.value
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  toggleLoader = value => {
    this.setState({
      showLoader: value
    })
  }

  toggleShow = () => {
    this.setState({ hidePassword: !this.state.hidePassword })
  }

  checkRegistration = async () => {
    this.setState({
      emailStatus: ''
    })

    this.toggleLoader(true)
    let email = await getProperEmailId(this.state.email)
    await this.setState({
      email: email
    })

    let request = {
      cognitoUserPool: awsconfig.aws_user_pools_id,
      username: this.state.email
    }

    apiService
      .post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/getuser', request)
      .then(resp => {
        console.log('chcck', resp)
        let userStatus = 'NotFound'
        if (resp && resp.data && resp.data.userStatus) {
          userStatus = resp.data.userStatus

          if (userStatus == 'CONFIRMED') {
            this.toggleLoader(false)
            this.setState({
              currentView: views.Confirmed,
              showAlert: true
            })
          } else if (userStatus == 'FORCE_CHANGE_PASSWORD') {
            let request = {
              cognitoUserPool: awsconfig.aws_user_pools_id,
              username: this.state.email
            }
            apiService
              .post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/resetuser', request)
              .then(resp => {
                this.toggleLoader(false)
                this.setState({
                  currentView: views.ForceChangePassword,
                  showAlert: true
                })
              })
              .catch(err => {
                console.log(err)
                this.toggleLoader(false)
                alert('Please try again!')
              })
          } else {
            this.toggleLoader(false)
            this.setState({
              currentView: views.NotFound,
              showAlert: true
            })
          }
        } else {
          this.setState({
            currentView: views.NotFound,
            showAlert: true
          })
          this.toggleLoader(false)
        }
      })
      .catch(err => {
        this.setState({
          currentView: views.NotFound,
          showAlert: true
        })
        this.toggleLoader(false)
      })
  }

  checkAgain = () => {
    this.setState({
      currentView: views.CheckRegistration
    })
  }
  getView() {
    const { currentView } = this.state
    console.log(currentView)
    switch (currentView) {
      case views.CheckRegistration:
        return <CheckRegistrationForm checkRegistration={this.checkRegistration} handleChange1={this.handleChange1} />
      case views.Confirmed:
        return <UserConfirmed />
      case views.NotFound:
        return <UserNotFound email={this.state.email} checkAgain={this.checkAgain} />
      case views.ForceChangePassword:
        return <UserForceChangePwd />
    }
  }

  resendEmail = () => {
    this.toggleLoader(true)
    this.setState({
      emailStatus: ''
    })
    let request = {
      cognitoUserPool: awsconfig.aws_user_pools_id,
      username: this.state.email
    }
    apiService
      .post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/resetuser', request)
      .then(resp => {
        this.toggleLoader(false)
        this.setState({
          emailStatus: 'Email sent succesfully.'
        })
      })
      .catch(err => {
        console.log(err)
        this.toggleLoader(false)
        alert('Please try again!')
      })
  }

  closeAlert = () => {
    this.setState({
      showAlert: false
    })
  }

  gotoResetPassword = () => {
    this.closeAlert()
    sessionStorage.setItem('emailToReset', this.state.email)
    this.props.history.push('/login')
  }
  render() {
    return (
      <>
        <div className="signup">
          {/* <CssBaseline /> */}
          {/* <Container maxWidth="xs"> */}
          {/* <Card className="login-card" style={{ marginTop: "50px" }}> */}

          {/* <div className="logo">
                                <img alt="logo" className="logo-custom" src={require('./images/auth-logo.jpg')} />
                            </div> */}

          <CheckRegistrationForm checkRegistration={this.checkRegistration} handleChange1={this.handleChange1} />
          {/* </Card> */}

          {/* </Container> */}
        </div>
        <AlertBox
          open={this.state.showAlert}
          email={this.state.email}
          currentView={this.state.currentView}
          closeAlert={this.closeAlert}
          resendEmail={this.resendEmail}
          emailStatus={this.state.emailStatus}
          gotoResetPassword={this.gotoResetPassword}
        />
        <Loader showLoader={this.state.showLoader} />
      </>
    )
  }
}

export default CheckRegistration
