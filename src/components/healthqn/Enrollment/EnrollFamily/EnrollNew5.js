import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { withStyles } from '@material-ui/core/styles'
import MuiPhoneNumber from 'material-ui-phone-number'
import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { isValidPhoneNumber } from 'react-phone-number-input'
import CommonMultilineText from '../../CommonScreens/commonMultilineText'
import Sample from '../../CommonScreens/sampleTextField'
import customStyle from '../../CSS/stylesheet_UHS'
import '../healthqn.css'
import i18n from '../i18next'
import customeClasses from './EnrollFamily.css.js'

const styles = {
  textDecoration: 'none',
  // backgroundColor:'#ffffff'
  '&:hover': {
    color: 'white'
  }
}
const CustomeTextField1 = withStyles(customStyle.phone_number_input)(MuiPhoneNumber)

const PurpleRadio = withStyles(customStyle.radioBtn)(props => <Radio color="default" {...props} />)

class EnrollNew5 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionData: this.props.familyData,
      val: [],
      count: 0,
      instData: this.props.instData,
      checked: new Map(),
      phoneErr: false,
      phoneVal: ''
    }
  }

  componentDidMount() {
    console.log('=====================  componentDidMount =======================')
    console.log(this.state.questionData)

    this.textChangeHandler('', '', '')
    this.answerChangeHandler('', '', '')
    let phoneValue = this.state.questionData[2].relatedQue[1].response
    // if (phoneValue) {
    //   phoneValue = phoneValue.split('+1')[1].trim()
    // }
    this.setValue(phoneValue)
  }
  answerChangeHandler = (event, index, type) => {
    let questionData = this.state.questionData
    if (event) {
      let value = event.target.value
      if (type === 'Radio') {
        questionData[index].optionId = value
        let exists = questionData[index].options.find(obj => obj.id.toString() === value.toString())
        questionData[index].answer = exists ? exists.option : 'No'
        this.setState({
          questionData: questionData
        })
      } else if (type === 'Multiple') {
        console.log('---Checked---' + questionData)
      } else if (type === 'dropdown') {
        const { options } = event.target
        const value = []
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value)
          }
        }
        questionData[index].answer = value
        this.setState({
          questionData: questionData
        })
      }
    }

    let validOne = questionData[0].optionId
      ? questionData[0].answer === 'Yes'
        ? questionData[0].relatedQue[0].response !== ''
        : true
      : false
    let validTwo = questionData[2].optionId
      ? questionData[2].answer === 'Yes'
        ? questionData[2].relatedQue[0].response !== ''
        : true
      : false

    if (validOne && validTwo && questionData[1].answer.length > 0) {
      this.props.onClick(false, this.state.questionData, 'CURRENT')
    } else {
      this.props.onClick(true, this.state.questionData, 'CURRENT')
    }
  }

  textChangeHandler = (val, isValid, parentObj) => {
    let questionData = this.state.questionData
    if (parentObj.type === 'Question') {
      if (isValid) {
        questionData[parentObj.index].relatedQue[0].response = val
      } else {
        questionData[parentObj.index].relatedQue[0].response = ''
      }
    } else if (parentObj.type === 'physician') {
      if (isValid) {
        questionData[parentObj.index].relatedQue[0].response = val
        questionData[parentObj.index].relatedQue[2].response = ''
      } else {
        questionData[parentObj.index].relatedQue[0].response = ''
        questionData[parentObj.index].relatedQue[2].response = ''
      }
    } else if (parentObj.type === 'otherPhysician') {
      if (isValid) {
        questionData[parentObj.index].relatedQue[2].response = val
        questionData[parentObj.index].relatedQue[0].response = ''
        questionData[parentObj.index].relatedQue[1].response = ''
      } else {
        questionData[parentObj.index].relatedQue[2].response = ''
        questionData[parentObj.index].relatedQue[0].response = ''
        questionData[parentObj.index].relatedQue[1].response = ''
      }
    }
    this.setState({
      questionData: questionData
    })

    let validOne = questionData[0].optionId
      ? questionData[0].answer === 'Yes'
        ? questionData[0].relatedQue[0].response !== ''
        : true
      : false
    let validTwo = questionData[2].optionId
      ? questionData[2].answer === 'Yes'
        ? questionData[2].relatedQue[0].response !== ''
        : true
      : false

    if (validOne && validTwo && questionData[1].answer.length > 0) {
      this.props.onClick(false, this.state.questionData, 'CURRENT')
    } else {
      this.props.onClick(true, this.state.questionData, 'CURRENT')
    }
  }

  setValue(value) {
    console.log(value)
    let valueWithCode
    // if (!value.includes('+1')) {
    // }
    valueWithCode = value
    if (value.length >= 2) {
      let isvalid = !!isValidPhoneNumber(valueWithCode)
      console.log('phone no---', valueWithCode)
      this.setState({
        phoneErr: !isvalid,
        phoneVal: value
      })
      console.log('isvalid::', isvalid)
      if (isvalid) {
        this.state.questionData[2].relatedQue[1].response = valueWithCode
      } else {
        this.state.questionData[2].relatedQue[1].response = ''
      }
      this.setState({ refresh: true }, () => {
        this.validateForm()
      })
    } else {
      this.state.questionData[2].relatedQue[1].response = ''
      this.setState({ phoneErr: false }, () => {
        this.validateForm()
      })
    }
  }

  validateForm() {
    if (this.state.questionData[1].answer.length > 0 && this.state.questionData[2].answer.toLowerCase() === 'no') {
      this.props.onClick(false, this.state.questionData, 'CURRENT')
    } else if (this.state.questionData[1].answer.length > 0 && this.state.questionData[2].relatedQue[0].response !== '') {
      this.props.onClick(false, this.state.questionData, 'CURRENT')
    } else {
      this.props.onClick(true, this.state.questionData, 'CURRENT')
    }
  }

  onToggle = (event, key) => {
    if (this.state.questionData[1].answer.indexOf(key) === -1) {
      if (key.toLowerCase() === 'none') {
        this.state.questionData[1].answer = []
        this.state.questionData[1].answer.push(key)
      } else {
        if (this.state.questionData[1].answer.indexOf('None') !== -1) {
          this.state.questionData[1].answer.splice(this.state.questionData[1].answer.indexOf('None'), 1)
        }

        if (Array.isArray(this.state.questionData[1].answer)) {
          this.state.questionData[1].answer.push(key)
        } else {
          let arr = []
          arr.push(key)
          this.state.questionData[1].answer = arr
        }
      }
    } else {
      this.state.questionData[1].answer.splice(this.state.questionData[1].answer.indexOf(key), 1)
    }

    this.setState({ refresh: true })
    let validOne = this.state.questionData[0].optionId
      ? this.state.questionData[0].answer === 'Yes'
        ? this.state.questionData[0].relatedQue[0].response !== ''
        : true
      : false
    let validTwo = this.state.questionData[2].optionId
      ? this.state.questionData[2].answer === 'Yes'
        ? this.state.questionData[2].relatedQue[0].response !== ''
        : true
      : false

    if (validOne && validTwo && this.state.questionData[1].answer.length > 0) {
      this.props.onClick(false, this.state.questionData, 'CURRENT')
    } else {
      this.props.onClick(true, this.state.questionData, 'CURRENT')
    }
  }
  render() {
    const { classes } = this.props
    return (
      <Row className="d-flex mt-2 card-content">
        <Col md={7}>
          {/* <div style={customeClasses.subTitle} >
            {this.state.instData.title}
          </div> */}
          <Row>
            <Col md={12} className="px-0 px-md-3">
              <div className="custom-subtitle">{this.state.instData.title}</div>
            </Col>

            <Col md={6} className="px-0 px-md-3">
              {/* <div style={customeClasses.Title}>{this.state.questionData[2].question}</div> */}
              <div className="form-label">{this.state.questionData[2].question}</div>
              <RadioGroup
                aria-label="phyRadio"
                style={{ display: 'block' }}
                name="phyRadio"
                value={this.state.questionData[2].optionId.toString()}
                onChange={event => this.answerChangeHandler(event, 2, 'Radio')}
              >
                {this.state.questionData[2].options.map((key, index) => (
                  <FormControlLabel
                    key={key.id}
                    value={key.id.toString()}
                    control={<PurpleRadio />}
                    label={key.option}
                    disabled={this.props.viewMode}
                  />
                ))}
              </RadioGroup>
            </Col>

            <Col md={6} className="px-0 px-md-3">
              {this.state.questionData[2].answer === 'Yes' ? (
                <div>
                  <Row className="my-2 d-flex justify-content-end px-3">
                    <Col md={12} className="px-0">
                      <Sample
                        setChild={this.textChangeHandler.bind(this)}
                        name={'pCarePhy'}
                        reqFlag={true}
                        label={'Primary Care Physician'}
                        value={this.state.questionData[2].relatedQue[0].response}
                        disable={this.props.viewMode}
                        style={customeClasses.txtField}
                        length={25}
                        fieldType={'any'}
                        errMsg={'Enter Valid Primary Care Physician'}
                        helperMsg={'Primary Physician required'}
                        parentDetails={{ index: 2, type: 'physician' }}
                      ></Sample>
                    </Col>
                  </Row>
                  <Row className="my-2 d-flex justify-content-end px-3">
                    <Col
                      md={12}
                      className="px-0 p-1 override-phone"
                      style={{ width: '100%', backgroundColor: '#f8f8f8', borderRadius: '4px' }}
                    >
                      <CustomeTextField1
                        id="p1"
                        name="phone"
                        error=""
                        // error={this.state.phoneErr}
                        label="Phone No."
                        data-cy="user-phone"
                        value={this.state.phoneVal}
                        // disableCountryCode={true}
                        // withCountryCallingCode
                        disabled={this.props.viewMode}
                        // country="US"
                        // helperText={this.state.phoneVal ? (isValidPhoneNumber(this.state.phoneVal) ? undefined : 'Please enter a valid Phone Number') : ''}
                        defaultCountry={'US'}
                        onChange={this.setValue.bind(this)}
                        style={{
                          width: '100%',
                          //height: '56px',
                          marginTop: '0',
                          marginBottom: '0',
                          marginLeft: '0',
                          borderRadius: '4px'
                        }}
                        // InputLabelProps={{ style: { paddingLeft: 12, paddingRight: 12, paddingTop: 10, color: this.state.phoneErr ? 'red' : !this.state.phoneVal ? 'grey' : '#533278' } }}
                        inputProps={{
                          style: {
                            fontSize: '18px',
                            color: '#19191d',
                            fontfamily: 'Roboto',
                            paddingLeft: '0',
                            paddingRight: '17px',
                            paddingTop: '12px',
                            outline: '0px',
                            width: '100%',
                            '&:hover': {
                              color: '#533278'
                            }
                          },
                          placeholder: ''
                        }}
                      />
                    </Col>
                  </Row>
                </div>
              ) : this.state.questionData[2].answer === 'No' && this.state.questionData[2].optionId !== '' ? (
                <div>
                  <Row>
                    <Col md={12} className="mt-md-1">
                      <CommonMultilineText
                        setChild={this.textChangeHandler.bind(this)}
                        name={'otherPhy'}
                        label={'Other physicians you see regularly'}
                        req={false}
                        value={this.state.questionData[2].relatedQue[2].response}
                        disable={this.props.viewMode}
                        style={customStyle.w100}
                        length={120}
                        fieldType={'any'}
                        errMsg={'Enter Valid Other Physician'}
                        helperMsg={''}
                        parentDetails={{ index: 2, type: 'otherPhysician' }}
                      ></CommonMultilineText>
                    </Col>
                  </Row>
                </div>
              ) : (
                <div></div>
              )}
            </Col>
          </Row>
          <Row className="my-3">
            <Col md={6} className="mt-2 px-0 px-md-3">
              {/* <div style={customeClasses.Title}>{this.state.questionData[0].question}</div> */}
              <div className="form-label">{this.state.questionData[0].question}</div>
              <RadioGroup
                aria-label="gender"
                style={customStyle.enrollNew3Display}
                name="gender1"
                value={this.state.questionData[0].optionId.toString()}
                onChange={event => this.answerChangeHandler(event, 0, 'Radio')}
              >
                {this.state.questionData[0].options.map((key, index) => (
                  <FormControlLabel
                    key={key.id}
                    value={key.id.toString()}
                    control={<PurpleRadio />}
                    label={key.option}
                    disabled={this.props.viewMode}
                  />
                ))}
              </RadioGroup>
              <div className="w-100">
                {this.state.questionData[0].answer === 'Yes' ? (
                  <div className="w-100">
                    <CommonMultilineText
                      setChild={this.textChangeHandler.bind(this)}
                      name={'lstDes'}
                      label={'List conditions or diseases'}
                      req={true}
                      value={this.state.questionData[0].relatedQue[0].response}
                      disable={this.props.viewMode}
                      style={customStyle.w100}
                      length={120}
                      fieldType={'text'}
                      errMsg={'Enter Valid List of Condition/Diseases'}
                      helperMsg={'List of Condition/Diseases required'}
                      parentDetails={{ index: 0, type: 'Question' }}
                    ></CommonMultilineText>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </Col>
            <Col md={6} className="mt-2 px-0 px-md-2 ">
              {/* style={{ marginBottom: '8px', fontSize: '14px', lineHeight: '16px', marginLeft: '36px', display: 'block' }} */}
              <span className="my-4" className="form-label">
                {this.state.questionData[1].question}
              </span>
              <div
                style={{
                  backgroundColor: '#f8f8f8',
                  float: 'left',
                  maxHeight: '132px',
                  overflowX: 'hidden',
                  overflowY: 'auto'
                }}
              >
                {/* <div style={customStyle.enrollNew5SelectDiv1}> */}
                <div>
                  {this.state.questionData[1].options.map((key, index) => (
                    <label style={{ width: '100%', marginBottom: '-10px' }} key={index}>
                      <Checkbox
                        id="input"
                        inputProps={{
                          'aria-label': 'secondary checkbox'
                        }}
                        disabled={this.props.viewMode}
                        style={{ color: '#533278' }}
                        checked={this.state.questionData[1].answer.indexOf(key.option) !== -1}
                        onChange={event => this.onToggle(event, key.option)}
                      />

                      {key.option}
                    </label>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        {this.state.instData.description !== '' && (
          <Col md={5}>
            <Row className="d-flex flex-column px-1 mt-4 mt-md-0">
              <Col md={10} className="px-0 px-md-3" style={{ marginTop: '15px' }}>
                <div className="custom-subtitle">{i18n.t('ENROLL_NEW.SUB_TITLE')}</div>
                {/* <div dangerouslySetInnerHTML={{ __html: this.state.instData.description }} /> */}
                <div className="description" dangerouslySetInnerHTML={{ __html: this.state.instData.description }} />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    )
  }
}

export default withStyles(styles)(EnrollNew5)
