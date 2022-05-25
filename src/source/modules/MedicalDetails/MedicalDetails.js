import { FormControl, FormControlLabel, FormLabel, makeStyles, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core'
import axios from 'axios'
import moment from 'moment'
import React, { Component } from 'react'
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'

class MedicalDetails extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    instructionSet: [],
    questionList: [],
    data: this.props.data
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data })
  }

  componentDidUpdate = (prevProps, prevState) => {
    // const prevStep = prevProps.data.currentStep;
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_BASE_URL_ENROLLMENT + '/questionbank/getQuestions').then(membersResult => {
      if (membersResult.data.response) {
        this.setState({
          instructionSet: membersResult.data.response.instructionSet,
          questionList: membersResult.data.response.questionList
        })
      }
    })
  }

  render() {
    console.log(this.state)
    const cardFooterBtns = ['BACK', 'NEXT', 'FINISH LATER']

    const progressBar = [{ variant: 'warning' }, { status: 30 }]

    const useStyles = makeStyles(theme => ({
      container: {
        display: 'flex',
        flexWrap: 'wrap'
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 100
      }
    }))

    const getGender = genderInitial => {
      const genderList = ['Male', 'Female', 'Neutral']
      switch (genderInitial) {
        case 'M':
          return genderList[0]
        case 'F':
          return genderList[1]
        case 'U':
          return genderList[2]
      }
    }

    const getDateInUTC = date => {
      let newDateTime = date + new Date(date).getTimezoneOffset() * 60 * 1000
      return new Date(newDateTime)
    }

    const getBirthDate = dob => {
      return moment(getDateInUTC(parseInt(dob))).format('YYYY-MM-DD')
    }

    // sends back [] of options of particular questionID
    const getOptionsByQuestionId = questionId => {
      const found = this.state.questionList.find(item => {
        const { question, options } = item
        if (questionId == question['id']) {
          return options
        }
      })
      return found['options']
    }

    const handleChange = () => {}
    let currentForm
    const formStepper = () => {
      if (this.state.instructionSet && this.state.instructionSet.length > 0) {
        switch (this.state.data.currentStep) {
          case 1:
            currentForm = (
              <Row className="d-flex justify-content-center">
                <Col md={12} className="bg-white pb-4">
                  <Row>
                    <Col md={6}>
                      <div className="d-flex flex-column">
                        <label className="font-weight-bold">{this.state.instructionSet[0].title}</label>
                        <div className="d-flex">
                          <FormControl className="p-2 w-100 d-flex flex-column">
                            <div class="d-flex justify-content-between flex-row">
                              <TextField
                                variant="filled"
                                style={{ width: '40%' }}
                                id="date"
                                label="Birth Date"
                                type="date"
                                defaultValue={getBirthDate(this.state.data.selectedUser.dob)}
                                className={useStyles.textField}
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                              <Select
                                variant="filled"
                                style={{ width: '40%' }}
                                label="Birth Gender"
                                id="demo-simple-select"
                                value={getGender(this.state.data.selectedUser.gender)}
                                onChange={handleChange}
                              >
                                <MenuItem value={'Male'}>Male</MenuItem>
                                <MenuItem value={'Female'}>Female</MenuItem>
                              </Select>
                            </div>
                            <div class="mt-3">
                              <TextField
                                variant="filled"
                                style={{ width: '100%' }}
                                id="email"
                                label="Email"
                                type="email"
                                defaultValue={this.state.data.selectedUser.email}
                                className={useStyles.textField}
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </div>
                          </FormControl>
                        </div>
                      </div>
                    </Col>

                    <Col md={{ span: 4, offset: 2 }} className="d-flex flex-column ">
                      <label className="font-weight-bold">Why we need this</label>
                      <div>We need your email address for any personal health related communication.</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
            break
          case 2:
            currentForm = (
              <Row className="d-flex justify-content-center">
                {this.state.questionList && this.state.questionList.length > 0}
                <Col md={12} className="bg-white pb-4">
                  <Row>
                    <Col md={6}>
                      <div className="d-flex flex-column">
                        <label className="font-weight-bold mb-4">{this.state.instructionSet[1].title}</label>
                        <div className="d-flex">
                          <FormControl className="p-2 w-100 d-flex flex-column">
                            <Row class="d-flex justify-content-between flex-row">
                              <Col md={6} className="d-flex flex-column">
                                <FormLabel component="legend">{this.state.questionList[0].question.question}</FormLabel>
                                <RadioGroup
                                  className="d-flex flex-row"
                                  aria-label="alcohol"
                                  name="alcohol"
                                  value={this.state.data.selectedUser.healthQuestions[0].response}
                                  onChange={handleChange}
                                >
                                  {getOptionsByQuestionId(this.state.questionList[0].question.id).map((item, i) => {
                                    return <FormControlLabel key={i} value={item.option} control={<Radio />} label={item.option} />
                                  })}
                                </RadioGroup>
                              </Col>
                              <Col md={6} className="d-flex flex-column">
                                <FormLabel component="legend"> {this.state.questionList[1].question.question}</FormLabel>
                                <RadioGroup
                                  className="d-flex flex-row"
                                  aria-label="exercise"
                                  name="exercise"
                                  value={this.state.data.selectedUser.healthQuestions[1].response}
                                  onChange={handleChange}
                                >
                                  {getOptionsByQuestionId(this.state.questionList[1].question.id).map((item, i) => {
                                    return <FormControlLabel key={i} value={item.option} control={<Radio />} label={item.option} />
                                  })}
                                </RadioGroup>
                              </Col>
                            </Row>
                            <div class="mt-3">
                              <Row class="d-flex justify-content-between flex-row">
                                <Col md={12} className="d-flex flex-column">
                                  <FormLabel component="legend"> {this.state.questionList[2].question.question}</FormLabel>
                                  <RadioGroup
                                    className="d-flex flex-row"
                                    aria-label="diet"
                                    name="diet"
                                    value={this.state.data.selectedUser.healthQuestions[2].response}
                                    onChange={handleChange}
                                  >
                                    {getOptionsByQuestionId(this.state.questionList[1].question.id).map((item, i) => {
                                      return <FormControlLabel key={i} value={item.option} control={<Radio />} label={item.option} />
                                    })}
                                  </RadioGroup>
                                </Col>
                              </Row>
                            </div>
                          </FormControl>
                        </div>
                      </div>
                    </Col>

                    <Col md={{ span: 4, offset: 2 }} className="d-flex flex-column ">
                      <label className="font-weight-bold">Why we need this</label>
                      <div>We need your email address for any personal health related communication.</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
            break
          case 3:
            currentForm = (
              <Row>
                {this.state.instructionSet && this.state.instructionSet.length > 0 ? (
                  <Col md={8}>
                    <label className="font-weight-bold mb-4">{this.state.instructionSet[2].title}</label>
                    <Row>
                      <Col md={6} className="d-flex flex-column font-14">
                        <div class="d-flex mb-2">
                          {this.state.questionList[3].question.question}
                          <div>
                            <TextField id="filled-basic" variant="filled" />
                          </div>
                        </div>
                      </Col>
                      <Col md={6} className="d-flex flex-column font-14">
                        <div class="d-flex mb-2">
                          {this.state.questionList[4].question.question}
                          <div>
                            <TextField id="filled-basic" variant="filled" />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col md={6} className="d-flex flex-column font-14">
                        <FormLabel component="legend"> {this.state.questionList[5].question.question}</FormLabel>
                        <RadioGroup
                          className="d-flex flex-row"
                          aria-label="medication"
                          name="medication"
                          value={this.state.data.selectedUser.healthQuestions[2].response}
                          onChange={handleChange}
                        >
                          {getOptionsByQuestionId(this.state.questionList[1].question.id).map((item, i) => {
                            return <FormControlLabel key={i} value={item.option} control={<Radio />} label={item.option} />
                          })}
                        </RadioGroup>
                      </Col>
                      <Col md={6} className="d-flex flex-column font-14">
                        <FormLabel component="legend"> {this.state.questionList[6].question.question}</FormLabel>
                        <RadioGroup
                          className="d-flex flex-row"
                          aria-label="medicalEq"
                          name="medicalEq"
                          value={this.state.data.selectedUser.healthQuestions[2].response}
                          onChange={handleChange}
                        >
                          {getOptionsByQuestionId(this.state.questionList[1].question.id).map((item, i) => {
                            return <FormControlLabel key={i} value={item.option} control={<Radio />} label={item.option} />
                          })}
                        </RadioGroup>
                      </Col>
                    </Row>
                  </Col>
                ) : (
                  ''
                )}

                <Col md={4} className="d-flex flex-column">
                  <label className="font-weight-bold">Why we need this</label>
                  <div>We need your email address for any personal health related communication.</div>
                </Col>
              </Row>
            )
            break
          case 4:
            currentForm = (
              <Row>
                <Col md={8}>
                  <label className="font-weight-bold mb-4">{this.state.instructionSet[3].title}</label>
                </Col>
              </Row>
            )
            break
        }
        return currentForm
      }
    }

    return (
      <Container fluid className="px-0">
        {this.state.data && this.state.data.selectedUser ? (
          <Row>
            <Col md={12} className="bg-white rounded-top p-3">
              <div>
                <span className="captiontextdiv mb-2">
                  {' '}
                  {this.state.data.selectedUser.firstName} {this.state.data.selectedUser.lastName}{' '}
                </span>
                <ProgressBar className="mt-3" style={{ height: '0.5rem' }} variant="warning" max={5} now={this.state.data.currentStep} />
              </div>
            </Col>
          </Row>
        ) : (
          ''
        )}
        {formStepper()}
      </Container>
    )
  }
}

export default MedicalDetails
