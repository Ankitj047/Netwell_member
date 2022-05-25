import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import customStyle from '../../CSS/stylesheet'
import i18n from '../i18next'

const PurpleRadio = withStyles(customStyle.radioBtn)(props => <Radio color="default" {...props} />)

class EnrollNew3 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionData: this.props.familyData,
      instData: this.props.instData
    }
  }

  componentDidMount() {
    this.answerChangeHandler('', '')
  }

  answerChangeHandler = (event, index) => {
    let questionData = this.state.questionData
    if (event) {
      let value = event.target.value
      let answer = questionData[index].options.find(obj => obj.id.toString() === value.toString())
      questionData[index].optionId = value
      questionData[index].answer = answer.option
      this.setState({
        questionData: questionData
      })
    }
    if (questionData[0].optionId !== '' && questionData[1].optionId !== '' && questionData[2].optionId !== '') {
      // && questionData[3].optionId !== ''
      this.props.onClick(false, this.state.questionData, 'LIFESTYLE')
    } else {
      this.props.onClick(true, this.state.questionData, 'LIFESTYLE')
    }
  }
  handlerCopy(e) {
    e.preventDefault()
  }
  render() {
    return (
      <Row className="d-flex mt-2  card-content">
        {/* <div style={customeClasses.subTitle} className="mb-sm-2 mb-md-4" > {this.state.instData.title}</div> */}
        <Col md={7}>
          <Row className="d-flex">
            <Col md={12} className="px-0 px-md-3">
              {/* <div style={customeClasses.subTitle} >{this.state.instData.title}</div> */}
              <div className="custom-subtitle"> {this.state.instData.title}</div>
            </Col>

            <Col sm={12} md={7} className="px-0 px-md-3">
              {/* <div style={customeClasses.Title}>{this.state.questionData[0].question}</div> */}
              <div className="form-label">{this.state.questionData[0].question}</div>
              <RadioGroup
                aria-label="gender"
                style={customStyle.enrollNew3Display}
                name="gender1"
                value={this.state.questionData[0].optionId.toString()}
                onChange={event => this.answerChangeHandler(event, 0)}
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
            </Col>
            <Col sm={12} md={5} className="px-0 px-md-3">
              {/* <div style={customeClasses.Title}>{this.state.questionData[1].question}</div> */}
              <div className="form-label">{this.state.questionData[1].question}</div>
              <RadioGroup
                aria-label="gender"
                style={customStyle.enrollNew3Display}
                name="gender1"
                value={this.state.questionData[1].optionId.toString()}
                onChange={event => this.answerChangeHandler(event, 1)}
              >
                {this.state.questionData[1].options.map((key, index) => (
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
          </Row>
          <Row className="d-flex">
            <Col sm={12} md={7} className="px-0 px-md-3">
              {/* <div style={customeClasses.Title}>{this.state.questionData[2].question}</div> */}
              <div className="form-label">{this.state.questionData[2].question}</div>
              <RadioGroup
                aria-label="gender"
                style={customStyle.enrollNew3Display}
                name="gender1"
                value={this.state.questionData[2].optionId.toString()}
                onChange={event => this.answerChangeHandler(event, 2)}
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
            <Col sm={12} md={5}>
              {' '}
            </Col>
          </Row>
          {/* <div className="d-flex"> */}
          {/* inside div was aleady commented */}
          {/* <div style={customStyle.enrollNew3DivnewStyle}>
              <div style={customeClasses.Title}>{this.state.questionData[3].question}</div>
              <RadioGroup aria-label="gender" style={customStyle.enrollNew3Display} name="gender1" value={this.state.questionData[3].optionId.toString()} onChange={(event) => this.answerChangeHandler(event, 3)}>
                {
                  this.state.questionData[3].options.map((key, index) => (
                    <FormControlLabel key={key.id} value={key.id.toString()} control={<PurpleRadio />} label={key.option} />
                  ))
                }
              </RadioGroup>
            </div> */}
          {/* </div> */}
        </Col>
        {this.state.instData.description !== '' && (
          <Col md={5}>
            <Row className="d-flex flex-column">
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

export default EnrollNew3
