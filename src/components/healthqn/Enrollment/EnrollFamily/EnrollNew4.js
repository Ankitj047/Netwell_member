import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import CommonMultilineText from '../../CommonScreens/commonMultilineText'
import Sample from '../../CommonScreens/sampleTextField'
import customStyle from '../../CSS/stylesheet_UHS'
import i18n from '../i18next'
import customeClasses from './EnrollFamily.css.js'

const PurpleRadio = withStyles(customStyle.radioBtn)(props => <Radio color="default" {...props} />)

class EnrollNew4 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionData: this.props.familyData,
      instData: this.props.instData
    }
  }

  componentDidMount() {
    console.log('=================== this.state.questionData ================')
    console.log(this.state.questionData)
    this.answerChangeHandler()
  }

  textChangeHandler = (val, isValid, parentObj) => {
    let questionData = this.state.questionData

    if (parentObj.type === 'Text') {
      if (isValid) {
        if (parentObj.name === 'medications' || parentObj.name === 'medical_equipment') {
          questionData[parentObj.index].relatedQue[0].response = val
        } else {
          questionData[parentObj.index].answer = val
        }
      } else {
        if (parentObj.name === 'medications' || parentObj.name === 'medical_equipment') {
          questionData[parentObj.index].relatedQue[0].response = ''
        } else {
          questionData[parentObj.index].answer = ''
        }
      }

      this.setState({
        questionData: questionData
      })
    }

    let validOne = questionData[2].optionId
      ? questionData[2].answer === 'Yes'
        ? questionData[2].relatedQue[0].response !== ''
          ? true
          : false
        : true
      : false
    let validTwo = questionData[3].optionId
      ? questionData[3].answer === 'Yes'
        ? questionData[3].relatedQue[0].response !== ''
          ? true
          : false
        : true
      : false
    if (questionData[0].answer !== '' && questionData[1].answer !== '' && validOne && validTwo) {
      this.props.onClick(false, this.state.questionData, 'HEALTH')
    } else {
      this.props.onClick(true, this.state.questionData, 'HEALTH')
    }
  }

  answerChangeHandler = (event, index, type, name) => {
    let questionData = this.state.questionData
    if (event) {
      console.log('============== uestionData[index] ================')
      console.log(questionData[index])

      let value = event.target.value
      if (type === 'Radio') {
        questionData[index].optionId = value
        let exists = questionData[index].options.find(obj => obj.id.toString() == value.toString())
        questionData[index].answer = exists ? exists.option : 'No'
        this.setState({
          questionData: questionData
        })
      } else if (type === 'Text') {
        questionData[index].answer = value
        this.setState({
          questionData: questionData
        })
      }
    }
    let validOne = questionData[2].optionId
      ? questionData[2].answer === 'Yes'
        ? questionData[2].relatedQue[0].response !== ''
          ? true
          : false
        : true
      : false
    let validTwo = questionData[3].optionId
      ? questionData[3].answer === 'Yes'
        ? questionData[3].relatedQue[0].response !== ''
          ? true
          : false
        : true
      : false
    if (questionData[0].answer !== '' && questionData[1].answer !== '' && validOne && validTwo) {
      this.props.onClick(false, this.state.questionData, 'HEALTH')
    } else {
      this.props.onClick(true, this.state.questionData, 'HEALTH')
    }
  }

  render() {
    return (
      <Row className="d-flex mt-2 card-content px-0">
        <Col md={7}>
          <Row className="d-inline-flex">
            <Col md={12} className="px-0 px-md-3">
              <div className="custom-subtitle">{this.state.instData.title}</div>
              {/* <div style={customeClasses.subTitle} className="mb-sm-2 mb-md-4" > {this.state.instData.title}</div> */}
            </Col>

            <Col sm={6} className="px-0 px-md-3">
              <Row>
                <Col sm={9} className="pr-md-2">
                  {/* <div style={customeClasses.Title}>
                    {this.state.questionData[0].question}
                  </div> */}
                  <div className="form-label">{this.state.questionData[0].question}</div>
                </Col>
                <Col sm={3} className="w-50">
                  <div>
                    {/* inputProps={{ maxLength: 2 }}  */}
                    <Sample
                      setChild={this.textChangeHandler.bind(this)}
                      name={'num1'}
                      reqFlag={true}
                      label={''}
                      value={this.state.questionData[0].answer}
                      disable={this.props.viewMode}
                      style={customeClasses.txtField}
                      length={2}
                      fieldType={'num'}
                      errMsg={'Enter Valid No.'}
                      helperMsg={'No. Required'}
                      parentDetails={{ index: 0, type: 'Text', name: 'ERInPast' }}
                    ></Sample>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col sm={6} className="px-0 px-md-3">
              <Row>
                <Col sm={9}>
                  {/* <div style={customeClasses.Title}>
                    {this.state.questionData[1].question}
                  </div> */}
                  <div className="form-label">{this.state.questionData[1].question}</div>
                </Col>
                <Col sm={3} className="w-50">
                  <div>
                    <Sample
                      setChild={this.textChangeHandler.bind(this)}
                      name={'num2'}
                      reqFlag={true}
                      label={''}
                      value={this.state.questionData[1].answer}
                      disable={this.props.viewMode}
                      style={customeClasses.txtField}
                      length={2}
                      fieldType={'num'}
                      errMsg={'Enter Valid No.'}
                      helperMsg={'No. Required'}
                      parentDetails={{ index: 1, type: 'Text', name: 'hospitalizedPast' }}
                    ></Sample>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col sm={6} className="mt-2 px-0 px-md-3">
              <Row>
                <Col sm={9} className="pr-0">
                  {/* <div style={customeClasses.Title}>{this.state.questionData[2].question}</div> */}
                  <div className="form-label pr-2">{this.state.questionData[2].question}</div>
                  <RadioGroup
                    aria-label="gender"
                    style={customStyle.EnrollNew4Disply}
                    name="gender1"
                    value={this.state.questionData[2].optionId.toString()}
                    onChange={event => this.answerChangeHandler(event, 2, 'Radio', '')}
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
                <Col sm={6}>
                  {this.state.questionData[2].answer === 'Yes' ? (
                    <div className="w-100">
                      <CommonMultilineText
                        setChild={this.textChangeHandler.bind(this)}
                        name={'medications'}
                        label={'List medication'}
                        value={this.state.questionData[2].relatedQue[0].response}
                        disable={this.props.viewMode}
                        style={customeClasses.areaField}
                        length={120}
                        fieldType={'text'}
                        errMsg={'Enter Valid Medication'}
                        helperMsg={'Medication Required'}
                        req={true}
                        parentDetails={{ index: 2, type: 'Text', name: 'medications' }}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Col>
              </Row>
            </Col>
            <Col sm={6} className="px-0 px-md-3">
              <Row className="mt-2">
                <Col sm={9}>
                  {/* <div style={customeClasses.Title}>{this.state.questionData[3].question}</div> */}
                  <div className="form-label">{this.state.questionData[3].question}</div>
                  <RadioGroup
                    aria-label="gender"
                    style={customStyle.EnrollNew4Disply}
                    name="gender1"
                    value={this.state.questionData[3].optionId.toString()}
                    onChange={event => this.answerChangeHandler(event, 3, 'Radio', '')}
                  >
                    {this.state.questionData[3].options.map((key, index) => (
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
                {/* <Col sm={5} className="pl-2 pl-md-0"> */}
                <Col sm={7}>
                  {this.state.questionData[3].answer === 'Yes' ? (
                    <div>
                      <CommonMultilineText
                        setChild={this.textChangeHandler.bind(this)}
                        name={'medical_equipment'}
                        label={'List Medical Equipment'}
                        value={this.state.questionData[3].relatedQue[0].response}
                        disable={this.props.viewMode}
                        style={customeClasses.areaField}
                        length={120}
                        req={true}
                        fieldType={'text'}
                        errMsg={'Enter Valid Medical Equipment'}
                        helperMsg={'Medical equipment Required'}
                        parentDetails={{ index: 3, type: 'Text', name: 'medical_equipment' }}
                      ></CommonMultilineText>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Col>
              </Row>

              {/* <div style={customStyle.w49}>
                <div style={customeClasses.Title}>{this.state.questionData[3].question}</div>
                <RadioGroup aria-label="gender" style={customStyle.EnrollNew4Disply} name="gender1" value={this.state.questionData[3].optionId.toString()} onChange={(event) => this.answerChangeHandler(event, 3, 'Radio', '')}>
                  {
                    this.state.questionData[3].options.map((key, index) => (
                      <FormControlLabel key={key.id} value={key.id.toString()} control={<PurpleRadio />} label={key.option} disabled={this.props.viewMode} />
                    ))
                  }
                </RadioGroup>
              </div>
              <div style={customStyle.w51}>
                {
                  this.state.questionData[3].answer === 'Yes' ? <div style={customStyle.w90}>
                    <CommonMultilineText setChild={this.textChangeHandler.bind(this)} name={'medical_equipment'} label={'List Medical Equipment'} value={this.state.questionData[3].relatedQue[0].response} disable={this.props.viewMode} style={customeClasses.areaField} length={120} req={true} fieldType={'text'} errMsg={'Enter Valid Medical Equipment'} helperMsg={'Medical equipment Required'} parentDetails={{ index: 3, type: 'Text', name: 'medical_equipment' }}></CommonMultilineText>
                  </div> : <div></div>
                }
              </div> */}
            </Col>
          </Row>
        </Col>
        {this.state.instData.description !== '' && (
          <Col md={5} className="mt-2 mt-md-0">
            <Row className="d-flex flex-column px-1">
              <Col md={10} className="px-0 px-md-3" style={{ marginTop: '15px' }}>
                <div className="custom-subtitle">{i18n.t('ENROLL_NEW.SUB_TITLE')}</div>
                <div className="description">
                  <div dangerouslySetInnerHTML={{ __html: this.state.instData.description }} />
                </div>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    )
  }
}

export default EnrollNew4
