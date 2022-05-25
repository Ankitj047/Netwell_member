import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import NotificationsIcon from '@material-ui/icons/Notifications'
import axios from 'axios'
import moment from 'moment'
import React, { Component } from 'react'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { toggleExitHealthqnAlert, toggleHealthQnEditMode } from '../../../actions/healthQnActions'
import customStyle from '../../../components/healthqn/CSS/stylesheet_UHS'
import ExitConfirm from '../../../components/healthqn/Enrollment/Alert'
import configuration from '../../../components/healthqn/Enrollment/config'
import CustomeCss from '../../../components/healthqn/Enrollment/EnrollFamily/EnrollFamily.module.css'
import EnrollNew2 from '../../../components/healthqn/Enrollment/EnrollFamily/EnrollNew2'
import EnrollNew3 from '../../../components/healthqn/Enrollment/EnrollFamily/EnrollNew3'
import EnrollNew4 from '../../../components/healthqn/Enrollment/EnrollFamily/EnrollNew4'
import EnrollNew5 from '../../../components/healthqn/Enrollment/EnrollFamily/EnrollNew5'
import EnrollNew6 from '../../../components/healthqn/Enrollment/EnrollFamily/EnrollNew6'
import i18n from '../../../components/healthqn/Enrollment/i18next'
import Loader from '../../../components/healthqn/loader'
import { logoutApplication } from '../../../components/layout/Header'

const styles = props => customStyle.enrollScreen

const ViewButton = withStyles(customStyle.proceedBtn)(Button)

const NextButton = withStyles(customStyle.viewBtn)(Button)

const DoneBtn = withStyles(customStyle.doneBtn)(Button)

class NewMedical extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      totalSteps: 4,
      progress: 0,
      disablePrev: false,
      disableNext: true,
      disableFinish: true,
      checkedB: true,
      firstName: '',
      lastName: '',
      socialNumber: '',
      relationship: '',
      showEdit: false,
      membersData: [],
      id: '',
      subId: '',
      isAllDataFilled: true,
      enrollFamilyData: [
        {
          birthDate: '',
          gender: ''
          /*feet: '',
                inches: '',
                weight: ''*/
        }
      ],
      houseHoldData: {},
      loaderShow: false,
      lifeStyleQuestionData: [],
      healthQuestionData: [],
      currentQuestionData: [],
      instructionData: [],
      authorize: false,
      privacyPolicy: false,
      age: null,
      currentUser: '',
      fullName: ''
    }
    this.props.toggleHealthQnEditMode(false)
  }
  goBack = () => {
    this.props.history.push('/')
  }

  reduceProgress = () => {
    if (this.state.count > 0) {
      this.setState({
        count: this.state.count - 1,
        progress: ((this.state.count - 1) / this.state.totalSteps) * 100
      })
    } else {
      this.setState({
        showEdit: false
      })
      this.props.toggleHealthQnEditMode(false)
    }
  }

  increaseProgress = () => {
    if (this.state.count < this.state.totalSteps) {
      this.setState({
        count: this.state.count + 1,
        progress: ((this.state.count + 1) / this.state.totalSteps) * 100
      })
    }
  }

  textChangeHandler = (event, name) => {
    this.state[name] = event.target.value
    this.setState({
      refresh: true
    })
  }

  getDateInUTC(date) {
    let newDateTime = date + new Date(date).getTimezoneOffset() * 60 * 1000
    return new Date(newDateTime)
  }

  editButtonHandler = (event, key, flag, index, type) => {
    this.setState({
      loaderShow: true,
      currentUser: key.firstName + ' ' + key.lastName
    })

    let gender = ''
    if (key.gender === 'M') {
      gender = 'MALE'
    } else if (key.gender === 'F') {
      gender = 'FEMALE'
    } else if (key.gender === 'U') {
      gender = 'NEUTRAL'
    }

    let data = [
      {
        dob: key.dob ? this.getDateInUTC(parseInt(key.dob)) : new Date(),
        gender: key.gender ? gender : '',
        email: key.email ? key.email : '',
        isPrimary: key.memberUniqueId == key.subscriberUniqueId
      }
    ]

    fetch(configuration.baseUrl + '/questionbank/getQuestions')
      .then(response => response.json())
      .then(membersResult => {
        let queResult = membersResult.response.questionList
        let lifeStyleQuestionData = []
        let healthQuestionData = []
        let currentQuestionData = []
        let healthQuestions = []
        for (let i = 0; i < queResult.length; i++) {
          if (key.healthQuestions && key.healthQuestions.length > 0) {
            let found = key.healthQuestions.find(obj => obj.questionID.toString() === queResult[i].question.id.toString())
            let optionId = ''
            let response = ''

            if (queResult[i].question.type === 'radio') {
              if (found.response) {
                let arr = queResult[i].options.find(obj => obj.option === found.response)
                optionId = arr.id
                response = found.response
              } else {
                optionId = ''
                response = ''
              }
            } else if (queResult[i].question.type === 'textbox') {
              response = found.response
              optionId = ''
            } else if (queResult[i].question.type === 'dropdown') {
              console.log('========== found.response ===========')
              console.log(found.response)
              if (found.response) {
                response = found.response.split(',')
              } else {
                response = []
              }
              optionId = ''
            }

            if (queResult[i].question.questionTypeCode === 'LIFESTYLE') {
              lifeStyleQuestionData.push({
                questionID: queResult[i].question.id,
                type: queResult[i].question.type,
                question: queResult[i].question.question,
                questionTypeCode: queResult[i].question.questionTypeCode,
                answer: response,
                optionId: optionId,
                options: queResult[i].options,
                relatedQue: found.reltdQstnID
              })
            } else if (queResult[i].question.questionTypeCode === 'HEALTH') {
              healthQuestionData.push({
                questionID: queResult[i].question.id,
                type: queResult[i].question.type,
                question: queResult[i].question.question,
                questionTypeCode: queResult[i].question.questionTypeCode,
                answer: response,
                optionId: optionId,
                options: queResult[i].options,
                relatedQue: found.reltdQstnID
              })
            } else if (queResult[i].question.questionTypeCode === 'CURRENT') {
              currentQuestionData.push({
                questionID: queResult[i].question.id,
                type: queResult[i].question.type,
                question: queResult[i].question.question,
                questionTypeCode: queResult[i].question.questionTypeCode,
                answer: response,
                optionId: optionId,
                options: queResult[i].options,
                relatedQue: found.reltdQstnID
              })
            }
          } else {
            let relatedQ = []
            let question = queResult[i].question

            if (question.relatedQuestions.length > 0) {
              for (let j = 0; j < question.relatedQuestions.length; j++) {
                let obj = {
                  id: null,
                  questionID: question.relatedQuestions[j].id,
                  responseTypCode: question.relatedQuestions[j].responseTypCode,
                  response: '',
                  questionTypCode: question.questionTypeCode,
                  maintTypCode: null,
                  questionDesc: question.relatedQuestions[j].question
                }

                relatedQ.push(obj)
              }
            }

            let obj = {
              id: null,
              questionID: question.id,
              responseTypCode: question.responseTypCode,
              response: '',
              questionTypCode: question.questionTypeCode,
              questionDesc: question.question,
              reltdQstnID: relatedQ
            }

            healthQuestions.push(obj)

            if (queResult[i].question.questionTypeCode === 'LIFESTYLE') {
              lifeStyleQuestionData.push({
                questionID: queResult[i].question.id,
                type: queResult[i].question.type,
                question: queResult[i].question.question,
                questionTypeCode: queResult[i].question.questionTypeCode,
                answer: '',
                optionId: '',
                options: queResult[i].options,
                relatedQue: relatedQ
              })
            } else if (queResult[i].question.questionTypeCode === 'HEALTH') {
              healthQuestionData.push({
                questionID: queResult[i].question.id,
                type: queResult[i].question.type,
                question: queResult[i].question.question,
                questionTypeCode: queResult[i].question.questionTypeCode,
                answer: '',
                optionId: '',
                options: queResult[i].options,
                relatedQue: relatedQ
              })
            } else if (queResult[i].question.questionTypeCode === 'CURRENT') {
              currentQuestionData.push({
                questionID: queResult[i].question.id,
                type: queResult[i].question.type,
                question: queResult[i].question.question,
                questionTypeCode: queResult[i].question.questionTypeCode,
                answer: '',
                optionId: '',
                options: queResult[i].options,
                relatedQue: relatedQ
              })
            }
          }
        }

        if (key.healthQuestions && key.healthQuestions.length === 0) {
          this.state.membersData[index].healthQuestions = healthQuestions
        }

        let count = key.completionStatus ? key.completionStatus : 0
        var progressVal = 0
        if (flag === 'RESUME') {
          progressVal = (count / this.state.totalSteps) * 100
        }
        let isViewMode = type == 'VIEWMODE' ? true : false
        this.props.toggleHealthQnEditMode(!isViewMode)
        this.setState({
          enrollFamilyData: data,
          showEdit: true,
          viewMode: isViewMode,
          count: count === 4 ? 0 : count,
          progress: progressVal,
          id: key.memberUniqueId,
          subId: key.subscriberUniqueId,
          authorize: type == 'VIEWMODE' ? key.authorize : false,
          privacyPolicy: type == 'VIEWMODE' ? key.privacyPolicy : false,
          // authorize: key.authorize,
          // privacyPolicy: key.privacyPolicy,
          fullName: key.fullName ? key.fullName : '',
          loaderShow: false,
          lifeStyleQuestionData: lifeStyleQuestionData,
          healthQuestionData: healthQuestionData,
          currentQuestionData: currentQuestionData,
          instructionData: membersResult.response.instructionSet
        })
      })
  }

  finishButtonHandler = event => {
    this.setState({
      loaderShow: true
    })

    let gender = ''
    if (this.state.enrollFamilyData[0].gender === 'MALE') {
      gender = 'M'
    } else if (this.state.enrollFamilyData[0].gender === 'FEMALE') {
      gender = 'F'
    } else if (this.state.enrollFamilyData[0].gender === 'NEUTRAL') {
      gender = 'U'
    }
    let user = this.state.membersData.find(obj => obj.memberUniqueId === this.state.id)
    user.authorize = this.state.authorize
    user.privacyPolicy = this.state.privacyPolicy
    user.dob = new Date(this.state.enrollFamilyData[0].dob).getTime()
    user.gender = gender
    user.completionStatus = this.state.count
    user.email = this.state.enrollFamilyData[0].email
    user.fullName = this.state.fullName

    for (let i = 0; i < this.state.lifeStyleQuestionData.length; i++) {
      let findQue = user.healthQuestions.find(
        obj => obj.questionID.toString() === this.state.lifeStyleQuestionData[i].questionID.toString()
      )
      findQue.response = this.state.lifeStyleQuestionData[i].answer.toString()
    }

    for (let i = 0; i < this.state.healthQuestionData.length; i++) {
      let findQue = user.healthQuestions.find(obj => obj.questionID.toString() === this.state.healthQuestionData[i].questionID.toString())
      findQue.response = this.state.healthQuestionData[i].answer.toString()
    }

    for (let i = 0; i < this.state.currentQuestionData.length; i++) {
      let findQue = user.healthQuestions.find(obj => obj.questionID.toString() === this.state.currentQuestionData[i].questionID.toString())
      findQue.response = this.state.currentQuestionData[i].answer.toString()
    }

    let arr = []
    arr.push(user)

    axios
      .post(configuration.baseUrl + '/questionbank/saveHealthQues', arr)
      .then(response => {
        let mail = localStorage.getItem('userMail')
        let data = {
          // "email": "harry@eb21.33mail.com"
          email: mail
        }
        let request = { subscriberIdSource: localStorage.getItem('sourceid') }
        axios.post(configuration.baseUrl + '/questionbank/healthinfo', request).then(membersResult => {
          this.props.toggleHealthQnEditMode(false)
          if (membersResult.data.response) {
            this.setState({
              membersData: membersResult.data.response,
              loaderShow: false,
              showEdit: false
            })
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.setState({
      loaderShow: true
    })
    let mail = localStorage.getItem('userMail')
    let data = {
      // "email": "22@javed786.33mail.com"
      email: mail
    }
    let request = { subscriberIdSource: localStorage.getItem('sourceid') }
    axios.post(configuration.baseUrl + '/questionbank/healthinfo', request).then(membersResult => {
      if (membersResult.data.response) {
        this.setState({
          membersData: membersResult.data.response,
          loaderShow: false
        })
      }
    })
  }

  validateFieldHandler(value, data) {
    let enrollFamilyData = this.state.enrollFamilyData
    enrollFamilyData[this.state.count] = data
    this.setState({
      disableNext: value,
      enrollFamilyData: enrollFamilyData,
      disableFinish: value
    })
  }

  saveQuestionData(value, data, type) {
    if (type === 'LIFESTYLE') {
      this.setState({
        disableNext: value,
        lifeStyleQuestionData: data,
        disableFinish: value
      })
    } else if (type === 'HEALTH') {
      this.setState({
        disableNext: value,
        healthQuestionData: data,
        disableFinish: value
      })
    } else if (type === 'CURRENT') {
      this.setState({
        disableNext: value,
        currentQuestionData: data,
        disableFinish: value
      })
    }
  }

  agreementChangeHandler = (value, authorize, privacyPolicy, fullName) => {
    this.setState({
      authorize: authorize,
      privacyPolicy: privacyPolicy,
      fullName: fullName,
      disableFinish: value,
      disableNext: true
    })
  }

  goBackToHome = () => {
    this.props.toggleExitHealthqnAlert(false)
    this.props.toggleHealthQnEditMode(false)

    if (this.props.healthQnExitAlertTrigger == 'HealthQn') {
      this.props.history.push('/')
    } else {
      logoutApplication()
    }
  }

  showLastUpdate = () => {
    console.log(this.state.membersData)
    let showLastUpdateTitle = this.state.membersData.some(item => item.completionStatus != 0 || item.lastUpdatedDate)
    if (showLastUpdateTitle) {
      return (
        <div style={customStyle.lastUpadateWrp}>
          <p className={CustomeCss.status}>{i18n.t('ENROLL_FAMILY.LAST_UPDATE')}</p>
        </div>
      )
    }
    return null
  }

  gotoMemberList = () => {
    this.setState({
      showEdit: false
    })
  }

  render() {
    const { classes } = this.props
    let currentScreen, currentStep
    console.log('this.state.count::', this.state.count)
    let finishButton
    if (this.state.count === 0) {
      currentStep = (
        <EnrollNew2
          onClick={this.validateFieldHandler.bind(this)}
          familyData={this.state.enrollFamilyData[this.state.count]}
          instData={this.state.instructionData[this.state.count]}
          age={this.state.age}
          viewMode={this.state.viewMode}
        />
      )
    } else if (this.state.count === 1) {
      currentStep = (
        <EnrollNew3
          onClick={this.saveQuestionData.bind(this)}
          familyData={this.state.lifeStyleQuestionData}
          instData={this.state.instructionData[this.state.count]}
          viewMode={this.state.viewMode}
        />
      )
    } else if (this.state.count === 2) {
      currentStep = (
        <EnrollNew4
          onClick={this.saveQuestionData.bind(this)}
          familyData={this.state.healthQuestionData}
          instData={this.state.instructionData[this.state.count]}
          viewMode={this.state.viewMode}
        />
      )
    } else if (this.state.count === 3) {
      currentStep = (
        <EnrollNew5
          onClick={this.saveQuestionData.bind(this)}
          familyData={this.state.currentQuestionData}
          instData={this.state.instructionData[this.state.count]}
          viewMode={this.state.viewMode}
        />
      )
    } else if (this.state.count === 4) {
      currentStep = (
        <EnrollNew6
          onClick={this.agreementChangeHandler.bind(this)}
          authorize={this.state.authorize}
          privacyPolicy={this.state.privacyPolicy}
          fullName={this.state.fullName}
          viewMode={this.state.viewMode}
        />
      )
    }

    if (this.state.count === 4) {
      finishButton = (
        <button
          type="button"
          className={
            this.state.disableFinish
              ? 'disabled-btn medical_donebtn border mr-2 text-uppercase'
              : 'medical_donebtn border mr-2 text-uppercase'
          }
          onClick={this.finishButtonHandler}
        >
          {i18n.t('BUTTON.FINISH')}
        </button>
      )
    } else {
      finishButton = (
        <button
          type="button"
          className="medical_donebtn mr-2 text-uppercase"
          style={{ minWidth: '15%' }}
          onClick={this.finishButtonHandler}
        >
          {' '}
          {i18n.t('BUTTON.FINISH_LATER')}
        </button>
      )
    }
    if (!this.state.showEdit) {
      currentScreen = (
        <div>
          <div>
            <form noValidate autoComplete="off">
              <p className={CustomeCss.textAlign1}>{i18n.t('ENROLL_FAMILY.SUB_TITLE')}</p>
              <div style={customStyle.EnrollNew1Display}>
                <div style={{ width: '85%' }}>
                  <div style={customStyle.EnrollNew1Display}>
                    <div style={customStyle.w35p}>
                      <p className={CustomeCss.nameTitle}>{i18n.t('ENROLL_FAMILY.HEADER1')}</p>
                    </div>
                    <div style={customStyle.w375px}>
                      {' '}
                      <p className={CustomeCss.status}>{i18n.t('ENROLL_FAMILY.STATUS')}</p>
                    </div>
                    <div style={{ width: '200px' }}></div>
                    {this.showLastUpdate()}
                  </div>
                  {this.state.membersData.map((key, index) => (
                    <div style={customStyle.enrollFamilyDisplay} key={index}>
                      <div style={customStyle.w35p}>
                        <p className={CustomeCss.name}>{key.firstName + ' ' + key.lastName}</p>
                      </div>
                      <div style={customStyle.w375px}>
                        {(key.completionStatus / this.state.totalSteps) * 100 === 100 ? (
                          <LinearProgress
                            value={(key.completionStatus / this.state.totalSteps) * 100}
                            variant="determinate"
                            classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimaryComplete }}
                            style={customStyle.mt10}
                          />
                        ) : (
                          <LinearProgress
                            value={(key.completionStatus / this.state.totalSteps) * 100}
                            variant="determinate"
                            classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}
                            style={customStyle.mt10}
                          />
                        )}
                      </div>
                      {key.completionStatus === 0 ? (
                        <div style={customStyle.w90px} style={{ width: '200px' }}>
                          <button
                            type="button"
                            className="status-btn mr-2"
                            onClick={event => this.editButtonHandler(event, key, 'START', index)}
                          >
                            {key.lastUpdatedDate ? 'RESUME' : 'START'}
                          </button>
                        </div>
                      ) : key.completionStatus === 4 ? (
                        <div style={customStyle.w200px}>
                          <button
                            type="button"
                            className="status-btn mr-2"
                            onClick={event => this.editButtonHandler(event, key, 'START', index)}
                          >
                            {i18n.t('BUTTON.EDIT')}
                          </button>

                          <button
                            type="button"
                            style={{ marginLeft: '10px' }}
                            className={classes.button}
                            onClick={event => this.editButtonHandler(event, key, 'START', index, 'VIEWMODE')}
                          >
                            View
                          </button>
                        </div>
                      ) : (
                        <div style={{ width: '200px' }}>
                          <button
                            type="button"
                            className="status-btn mr-2"
                            onClick={event => this.editButtonHandler(event, key, 'RESUME', index)}
                          >
                            {i18n.t('BUTTON.RESUME')}
                          </button>
                        </div>
                      )}
                      <div style={customStyle.lastUpadateWrp}>
                        {key.lastUpdatedDate && (
                          <p className={CustomeCss.lastDate}>
                            {moment(key.lastUpdatedDate).format('DD') +
                              ' ' +
                              moment(key.lastUpdatedDate).format('MMMM') +
                              ' ' +
                              moment(key.lastUpdatedDate).format('YYYY')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* <div style={customeClasses.helpText}>
                        <div style={{ fontWeight: 'bold' }}>{i18n.t('ENROLL_FAMILY.HELP')}</div>
                        <div>{i18n.t('ENROLL_FAMILY.CHAT_SUPPORT')}</div>
                    </div> */}
          <Row className="d-flex py-3 card-bottom" style={{ marginTop: '4rem' }}>
            <Col md={8} className="d-flex align-items-center">
              <button
                type="button"
                className="medical_donebtn border mr-2 text-uppercase"
                style={{ minWidth: '15%' }}
                onClick={this.goBack}
              >
                {i18n.t('BUTTON.BACK')}
              </button>
            </Col>
            <Col md={4} className=" d-flex flex-column align-items-end " style={{ fontSize: '12px' }}>
              <div className="font-weight-bold">Need help? </div>
              <div>Chat with our Health Share Representative</div>
              <div>or call 1 (888) 366 6243.</div>
            </Col>
          </Row>
        </div>
      )
    } else if (this.state.showEdit) {
      console.log('viewMode:::', this.state.viewMode)
      currentScreen = (
        <div
          style={{
            width: '100%'
          }}
        >
          <div>
            <div style={customStyle.enrollFamilyEnrollStyle}>{this.state.currentUser}</div>
            <LinearProgress
              variant="determinate"
              classes={{ colorPrimary: classes.progresscolorPrimary, barColorPrimary: classes.progressbarColorPrimaryNew }}
              style={classes.progress}
              value={this.state.progress}
            />
            <div style={customStyle.EnrollNew1}>{currentStep}</div>
          </div>

          <Row className="d-flex justify-content-between card-bottom" style={{ marginTop: '4rem' }}>
            <Col md={8} className="d-flex  align-items-center">
              <button
                type="button"
                className="medical_donebtn border mr-2 text-uppercase"
                style={{ minWidth: '15%' }}
                onClick={this.reduceProgress}
              >
                {i18n.t('BUTTON.BACK')}
              </button>
              {this.state.viewMode ? (
                <button
                  type="button"
                  className="medical_donebtn border mr-2 text-uppercase"
                  style={{ minWidth: '15%' }}
                  onClick={this.state.count === this.state.totalSteps ? this.gotoMemberList : this.increaseProgress}
                >
                  {this.state.count === this.state.totalSteps ? 'Finish' : 'Next'}
                </button>
              ) : (
                <button
                  className={
                    this.state.count === this.state.totalSteps
                      ? 'disabled-btn medical_donebtn mr-2 text-uppercase'
                      : 'medical_donebtn border text-uppercase mr-2'
                  }
                  style={{ width: '15%' }}
                  disabled={!this.state.disableNext ? (this.state.count === this.state.totalSteps ? true : false) : true}
                  onClick={this.increaseProgress}
                >
                  {i18n.t('BUTTON.NEXT')}
                </button>
              )}
              {this.state.viewMode ? null : finishButton}
            </Col>

            <Col md={4} className="py-2">
              {/* <div className="font-weight-bold">{i18n.t('ENROLL_FAMILY.HELP')}</div>
                            <div>{i18n.t('ENROLL_FAMILY.CHAT_SUPPORT')}</div> */}
              <div className="medical_need_help_div d-flex justify-content-end py-2">
                <div className="medical_help_text_div" style={{ fontSize: '12px' }}>
                  <div className="medical_needhelp">Need help? </div>
                  <div className="medical_needmsg">Chat with our Health Share Representative</div>
                  <div className="medical_needmsg">or call 1 (888) 366 6243.</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )
    }

    return (
      <Container fluid style={{ marginBottom: '4rem' }}>
        <Navbar className="custom-mobile-header" expand="lg" fixed="top">
          <ArrowBackIcon onClick={this.goBack} style={this.navBarIconStyle} />
          <div className="mobmedical_header_text">Medical Questionnaire</div>
          <NotificationsIcon style={this.navBarIconStyle} />
        </Navbar>

        <Row className="d-flex justify-content-center custom-margin-top ">
          <Col md={10} className="bg-white rounded-top px-3 pb-0 bg-white">
            <div className="medical_header text-uppercase d-flex align-items-center">{i18n.t('ENROLL_FAMILY.TITLE')}</div>
          </Col>
          <Col md={10} className="bg-white">
            {this.state.loaderShow ? <Loader></Loader> : ''}
            {currentScreen}
            <ExitConfirm
              open={this.props.showHealthQnExitAlert}
              handleCancel={() => this.props.toggleExitHealthqnAlert(false)}
              handleContinue={this.goBackToHome}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('ownProps::', ownProps)
  return {
    showHealthQnExitAlert: state.healthQn.showHealthQnExitAlert,
    history: ownProps.history,
    healthQnExitAlertTrigger: state.healthQn.healthQnExitAlertTrigger
  }
}

const mapDispatchToProps = {
  toggleHealthQnEditMode,
  toggleExitHealthqnAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewMedical))
