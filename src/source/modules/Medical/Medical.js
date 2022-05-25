import axios from 'axios'
import moment from 'moment'
import React, { Component } from 'react'
import { Col, Container, ProgressBar, Row, Table } from 'react-bootstrap'
// import MemberHeader from "../Components/MemberHeader";
// import MemberSubheader from "../Components/MemberSubheader";
import { FiMessageSquare } from 'react-icons/fi'
import Header from '../../WebScreen/Header'
import MedicalDetails from '../MedicalDetails/MedicalDetails'

export default class Medical extends Component {
  constructor(props) {
    super(props)
    this.onGoToMedicalDetails = this.onGoToMedicalDetails.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  state = {
    stepper: '',
    currentStep: 0,
    data: [],
    selectedUser: {},
    membersData: [],
    disablePrev: false,
    disableNext: true,
    disableFinish: true
  }

  componentDidMount() {
    let mail = localStorage.getItem('userMail')
    let data = {
      email: mail
    }
    let request = { subscriberIdSource: localStorage.getItem('sourceid') }
    axios.post(process.env.REACT_APP_BASE_URL_ENROLLMENT + '/questionbank/healthinfo', request).then(membersResult => {
      if (membersResult.data.response) {
        this.setState({
          membersData: membersResult.data.response,
          data: membersResult.data.response
        })
      }
    })
  }

  updateStateHandler = () => {}

  onGoToMedicalDetails = item => {
    this.props.history.push('MedicalDetail')
  }

  goBack = () => {
    this.props.history.goBack()
  }

  // conditional rendering
  renderBtn = status => {
    if (status == 0) {
      return 'START'
    }
    if (status > 0 && status < 5) {
      return 'EDIT'
    }
    if (status == 5) {
      return 'RESUME'
    }
  }

  showDate = ({ lastUpdatedDate, completionStatus }) => {
    return moment(lastUpdatedDate).format('MMMM D, YYYY')
  }

  render() {
    const cardFooterBtns = ['BACK', 'NEXT', 'FINISH LATER']

    const setStepper = value => {
      const prevCurrentStep = this.state.currentStep
      if (prevCurrentStep !== 0) {
        this.setState({ currentStep: value == 'back' ? prevCurrentStep - 1 : prevCurrentStep + 1 })
      } else {
        // go back to dashboard
        this.goBack()
      }
    }

    const switchBtns = () => {
      let currentBtnGrp
      if (this.state.currentStep == 0) {
        currentBtnGrp = (
          <span className="medical_donebtn cursor_pointer mr-3 mt-4" onClick={() => setStepper('back')}>
            {cardFooterBtns[0]}
          </span>
        )
      } else {
        currentBtnGrp = (
          <div class="d-flex">
            <span className="medical_donebtn cursor_pointer mr-3 mt-4" onClick={() => setStepper('back')}>
              {cardFooterBtns[0]}
            </span>
            <span className="medical_donebtn cursor_pointer mr-3 mt-4" onClick={() => setStepper('next')}>
              {cardFooterBtns[1]}
            </span>
            <span
              className={`${
                this.state.currentStep == 4
                  ? 'medical_donebtn cursor_pointer mr-3 mt-4 disabled'
                  : 'medical_donebtn cursor_pointer mr-3 mt-4'
              }`}
            >
              {cardFooterBtns[2]}
            </span>
          </div>
        )
      }
      return currentBtnGrp
    }

    const onViewDetails = item => {
      const currentStep = this.state.currentStep
      this.setState({ currentStep: currentStep + 1, selectedUser: item })
    }

    return (
      <Container fluid>
        <Header name={'Health Questionnaire'} />
        <Row className="d-flex justify-content-center custom-margin-top">
          <Col md={10} className="bg-white rounded-top px-3 pb-0">
            <div className="medical_header text-uppercase d-flex align-items-center">Health Questionnaire</div>
          </Col>

          <Col md={10} className="bg-white rounded-top px-3 pt-3" style={{ paddingBottom: '5rem' }}>
            {this.state.currentStep == 0 ? (
              <Row>
                <Col md={12}>
                  {/* <div className="medical_subtext ">
                    Please select a family member and fill in their medical
                    questionnaire. This information will help us serve you better,
                    hence please update this regularly to reflect your current health.
                    </div> */}
                  <Table borderless>
                    <thead>
                      <tr>
                        <th className="font-weight-bold th-color">Name</th>
                        <th className="font-weight-bold th-color">Completion Status</th>
                        <th className="font-weight-bold th-color"></th>
                        <th className="font-weight-bold th-color">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.membersData &&
                        this.state.membersData.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>
                                {' '}
                                {item.firstName} {item.lastName}{' '}
                              </td>
                              <td>
                                <ProgressBar
                                  className="mt-3"
                                  style={{ height: '0.5rem' }}
                                  max={10}
                                  variant={item.completionStatus == 10 ? 'success' : 'warning'}
                                  now={item.completionStatus}
                                />
                              </td>
                              <td className="text-center">
                                <button className="status-btn" onClick={() => onViewDetails(item)}>
                                  {this.renderBtn(item.completionStatus)}
                                </button>
                              </td>
                              <td>{this.showDate(item)}</td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            ) : (
              <MedicalDetails data={this.state}></MedicalDetails>
            )}

            {/* <Table borderless>
              <thead>
                <tr>
                  <th className="font-weight-bold th-color">Name</th>
                  <th className="font-weight-bold th-color">Completion Status</th>
                  <th className="font-weight-bold th-color"></th>
                  <th className="font-weight-bold th-color">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {response.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td> {item.firstName} {item.lastName} </td>
                      <td>
                        <ProgressBar className="mt-3" style={{ height: '0.5rem' }} max={10} variant={item.completionStatus == 10 ? 'success' : 'warning'} now={item.completionStatus} />
                      </td>
                      <td className="text-center">
                        <button className="status-btn" onClick={() => this.onGoToMedicalDetails(item)}>
                          {renderBtn(item.completionStatus)}
                        </button>
                      </td>
                      <td>
                        {showDate(item)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table> */}
          </Col>

          <Col md={10} className="card-bottom border d-flex justify-content-between p-3">
            {/* {cardFooterBtns.map((btn, i) => {
                return (
                  <span key={i} className="medical_donebtn cursor_pointer mr-3 mt-4" onClick={() => btn == 'BACK' ? this.goBack() : () => false}>
                    {btn}
                  </span>
                )
              })} */}
            {switchBtns()}

            <div className="medical_need_help_div">
              <div className="medical_help_text_div">
                <div className="medical_needhelp">Need help? </div>
                <div className="medical_needmsg">Chat with our Health Share Representative</div>
                <div className="medical_needmsg">or call 1 (888) 366 6243.</div>
              </div>
              <div className="ml-auto medical_help text-center pt-3">
                <FiMessageSquare className="medical_help_icon" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
