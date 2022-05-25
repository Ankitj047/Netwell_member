import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import axios from 'axios'
import moment from 'moment'
import React, { Component } from 'react'
import { Col, Navbar, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { toggleExitHealthqnAlert, toggleHealthQnEditMode } from '../../../../src/actions/healthQnActions'
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
import { logoutApplication } from '../../../components/layout/Header'
import CustomLoader from '../../../source/CommonLoader'
import { getCardEnableData } from '../../ApiCall'
import MobCopyright from '../../MobileScreen/MobCopyright'
import MobileFooter from '../../MobileScreen/MobileFooter'
import ChatIcon from '../../WebScreen/ChatBox/ChatIcon'

const styles = props => customStyle.enrollScreen

const ViewButton = withStyles(customStyle.proceedBtn)(Button)

const NextButton = withStyles(customStyle.viewBtn)(Button)

const DoneBtn = withStyles(customStyle.doneBtn)(Button)

const navBarIconStyle = { color: '#ffffff', height: '25px', width: '25px' }

class NewMobileMedical extends Component {
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
      fullName: '',
      totalQueLength: 0
    }
    this.props.toggleHealthQnEditMode(false)
  }

  componentDidMount() {
    this.getCardEnable()
  }

  getCardEnable = () => {
    let client_id = localStorage.getItem('CLIENT_ID')

    getCardEnableData(client_id, 'HealthQuestionnaire').then(res => {
      console.log('getCardEnableData=====', res.data.response.enable)

      if (res.data.response.enable == 'false' || res.data.response.enable == false) {
        window.location.href = '/'
      }
    })
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

  getDateInUTC = (date, getInMillisecs) => {
    if (date) {
      let newDateTime = date + new Date(date).getTimezoneOffset() * 60 * 1000
      if (getInMillisecs) {
        return newDateTime
      }
      return new Date(newDateTime)
    }
    return date
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
        dob: key.dob ? this.getDateInUTC(parseInt(key.dob, false)) : new Date(),
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
        this.setData()
        this.setState({
          showEdit: false
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
    this.setData()
  }

  setData = () => {
    let mail = localStorage.getItem('userMail')
    let data = {
      email: mail
    }
    let request = { subscriberIdSource: localStorage.getItem('sourceid') }
    axios.post(configuration.baseUrl + '/questionbank/healthinfo', request).then(membersResult => {
      if (membersResult.data.response) {
        let membersData = membersResult.data.response

        fetch(configuration.baseUrl + '/questionbank/getQuestions')
          .then(response => response.json())
          .then(membersResult => {
            let queResult = membersResult.response.questionList

            for (let i = 0; i < membersData.length; i++) {
              let answredCount = 0
              for (let j = 0; j < membersData[i].healthQuestions.length; j++) {
                let data = membersData[i].healthQuestions[j].response
                let relatedQueAns = membersData[i].healthQuestions[j].reltdQstnID

                if (data === 'Yes' && relatedQueAns.length > 0) {
                  if (relatedQueAns[0].response) {
                    answredCount++
                  }
                } else {
                  if (data) {
                    answredCount++
                  }
                }
              }
              membersData[i].totalQuestionLength = answredCount
            }

            this.setState({
              membersData: membersData,
              loaderShow: false,
              totalQueLength: queResult.length
            })
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

  showDate = lastUpdatedDate => {
    return moment(lastUpdatedDate).format('MMMM D, YYYY')
  }

  showLastUpdate = () => {
    console.log(this.state.membersData)
    let showLastUpdateTitle = this.state.membersData.some(item => item.completionStatus != 0 || item.lastUpdatedDate)
    if (showLastUpdateTitle) {
      return (
        <div>
          <span className={CustomeCss.status}>{i18n.t('ENROLL_FAMILY.LAST_UPDATE')}</span>
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

  cardFooterBtns = ['BACK', 'NEXT', 'FINISH LATER']

  render() {
    const { classes } = this.props
    let currentScreen, currentStep
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
          disabled={this.state.disableFinish}
          className={
            this.state.disableFinish
              ? 'disabled-btn medical_donebtn_mobile mx-1 text-uppercase'
              : 'medical_donebtn_mobile  mx-1 text-uppercase'
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
          className="medical_donebtn_mobile  mx-1 text-uppercase"
          style={{ minWidth: '38%' }}
          onClick={this.finishButtonHandler}
        >
          {i18n.t('BUTTON.FINISH_LATER')}
        </button>
      )
    }
    if (!this.state.showEdit) {
      currentScreen = (
        <Row className="mt=0 mt-md-3">
          <Col sm={10} md={12}>
            <form noValidate autoComplete="off">
              <p className="font-roboto-reg mb-4 text-justify" style={{ color: 'rgba(0, 0, 0, 0.87) ' }}>
                {i18n.t('ENROLL_FAMILY.SUB_TITLE')}
              </p>
              <Row className="d-flex">
                <Col md={12} sm={12} xs={12} id="1">
                  {this.state.membersData.map((key, index) => (
                    <Row key={index} id={index}>
                      <Col xs={12}>
                        {(key.totalQuestionLength / this.state.totalQueLength) * 100 === 100 ? (
                          <LinearProgress
                            value={(key.totalQuestionLength / this.state.totalQueLength) * 100}
                            variant="determinate"
                            classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimaryComplete }}
                            style={customStyle.mt10}
                          />
                        ) : (
                          <LinearProgress
                            value={(key.totalQuestionLength / this.state.totalQueLength) * 100}
                            variant="determinate"
                            classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}
                            style={customStyle.mt10}
                          />
                        )}
                      </Col>
                      <Col xs={12}>
                        <Row className="d-flex flex-row my-3">
                          <Col xs={9} className="d-flex flex-column center center">
                            <Row className="d-flex flex-column" style={{ width: 'auto' }}>
                              <Col xs={4} className="d-flex flex-column">
                                <span className="nameTitlemobile" style={{ marginTop: '0px' }}>
                                  {i18n.t('ENROLL_FAMILY.HEADER1')}
                                </span>
                                <span className="font-roboto-reg font-weight-bold" style={{ fontSize: '14px', width: 'max-content' }}>
                                  {key.firstName + ' ' + key.lastName}
                                </span>
                              </Col>
                              <Col xs={5} className="d-flex flex-column mt-2">
                                <span style={{ fontSize: '22px', width: 'max-content', letterSpacing: '0.96px' }}>
                                  {this.showLastUpdate()}
                                </span>
                                {key.lastUpdatedDate && (
                                  <span className="font-roboto-reg font-weight-bold" style={{ fontSize: '14px', width: 'max-content' }}>
                                    {this.showDate(key.lastUpdatedDate)}
                                  </span>
                                )}
                              </Col>
                            </Row>
                          </Col>
                          <Col xs={3} className="text-right">
                            {key.completionStatus === 0 ? (
                              <div className="d-flex flex-row d-flex justify-content-end">
                                <button
                                  type="button"
                                  className="d-flex justify-content-center align-items-center status-btn-mobile mx-1 mb-2"
                                  style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
                                  onClick={event => this.editButtonHandler(event, key, 'START', index)}
                                >
                                  {key.lastUpdatedDate ? 'RESUME' : 'START'}
                                </button>
                              </div>
                            ) : key.completionStatus === 4 ? (
                              <div className="d-flex flex-row d-flex justify-content-end">
                                <button
                                  type="button"
                                  className="d-flex justify-content-center align-items-center status-btn-mobile mx-1 mb-2 text-uppercase"
                                  onClick={event => this.editButtonHandler(event, key, 'START', index)}
                                >
                                  {i18n.t('BUTTON.EDIT')}
                                </button>
                                <button
                                  type="button"
                                  className="d-flex justify-content-center align-items-center status-btn-mobile mx-1 mb-2 text-uppercase"
                                  onClick={event => this.editButtonHandler(event, key, 'START', index, 'VIEWMODE')}
                                >
                                  VIEW
                                </button>
                              </div>
                            ) : (
                              <div className="d-flex flex-row justify-content-end">
                                <button
                                  type="button"
                                  className="d-flex justify-content-center align-items-center status-btn-mobile mx-1 mb-2 text-uppercase"
                                  style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
                                  onClick={event => this.editButtonHandler(event, key, 'RESUME', index)}
                                >
                                  {i18n.t('BUTTON.RESUME')}
                                </button>
                              </div>
                            )}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      )
    } else if (this.state.showEdit) {
      console.log('viewMode:::', this.state.viewMode)
      currentScreen = (
        <div
          style={{
            width: '100%'
          }}
        >
          <div className="mt-3">
            <div style={customStyle.enrollFamilyEnrollStyle}>
              <span style={{ color: '#5f2161' }}>{this.state.currentUser}</span>
            </div>
            <LinearProgress
              variant="determinate"
              classes={{ colorPrimary: classes.progresscolorPrimary, barColorPrimary: classes.progressbarColorPrimaryNew }}
              style={classes.progress}
              value={this.state.progress}
            />
            <div className="d-flex flex-column px-3">{currentStep}</div>
          </div>

          {/* <Navbar className="custom-mobile-footer d-flex justify-content-around" style={{ height: '9vh' }} expand="lg" fixed="bottom" > */}
          <Navbar className="custom-mobile-footer d-flex justify-content-around" style={{ height: '9vh' }} expand="lg" fixed="bottom">
            <Row className="d-flex justify-content-center">
              <Col sm={8} className="d-flex align-items-center">
                <button
                  type="button"
                  className="medical_donebtn_mobile border rounded-pill mx-1 text-uppercase"
                  onClick={this.reduceProgress}
                >
                  {i18n.t('BUTTON.BACK')}
                </button>
                {this.state.viewMode ? (
                  <button
                    type="button"
                    className="medical_donebtn_mobile border rounded-pill text-uppercase"
                    style={{ minWidth: '15%' }}
                    onClick={this.state.count === this.state.totalSteps ? this.gotoMemberList : this.increaseProgress}
                  >
                    {this.state.count === this.state.totalSteps ? 'Finish' : 'Next'}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={this.state.disableNext}
                    className={
                      this.state.disableNext
                        ? 'disabled-btn medical_donebtn_mobile border rounded-pill mx-1 text-uppercase'
                        : 'medical_donebtn_mobile border rounded-pill mx-1 text-uppercase'
                    }
                    onClick={this.increaseProgress}
                  >
                    {i18n.t('BUTTON.NEXT')}
                  </button>
                )}
                {this.state.viewMode ? null : finishButton}
              </Col>
            </Row>
          </Navbar>
        </div>
      )
    }

    return (
      <div className="mobmedical">
        <Navbar className="custom-mobile-header  text-white" expand="lg" fixed="top">
          <ArrowBackIcon onClick={this.goBack} style={this.navBarIconStyle} />
          <div className="mobmedical_header_text"> Health Questionnaire</div>
          <div></div>
        </Navbar>

        <Row
          className="d-flex justify-content-center no-gutters"
          style={{ marginTop: '77px', marginBottom: '91px', maxHeight: '50vh', minHeight: '19vh'}}
        >
          <Col sm={10} md={12} className="bg-white px-3">
            {this.state.loaderShow ? <CustomLoader /> : ''}
            {currentScreen}

            <ExitConfirm
              open={this.props.showHealthQnExitAlert}
              handleCancel={() => this.props.toggleExitHealthqnAlert(false)}
              handleContinue={this.goBackToHome}
            />
          </Col>
          {this.state.loaderShow ?"": <div style={{ marginTop: '13vh', bottom: '5vh', paddingBottom: '37px', position: 'static' }}>
              <ChatIcon openChat={() => console.log('')} />
              <ChatIcon showAIChatIcon />
              <MobCopyright />
          </div>}
        </Row>
       
       
          <div style={{ bottom: '4vh', position: 'relative' }}>
            {!this.state.showEdit ? <MobileFooter /> : ''}
          </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewMobileMedical))
