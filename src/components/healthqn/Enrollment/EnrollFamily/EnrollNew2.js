import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import 'date-fns'
import moment from 'moment'
import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import CommonLoader from '../../../../source/CommonLoader'
import CommonDropDwn from '../../CommonScreens/CommonDropDwn'
import Sample from '../../CommonScreens/sampleTextField'
import customStyle from '../../CSS/stylesheet_UHS'
import i18n from '../i18next'
import customeClasses from './EnrollFamily.css.js'

const styles = theme => ({
  underline: {
    '&.MuiInput-underline:before': {
      borderBottom: '2px solid grey'
    },
    '&.MuiInput-underline:after': {
      // The MUI source seems to use this but it doesn't work
      borderBottom: '2px solid red'
    }
  }
})
class EnrollNew2 extends Component {
  eventListener = null
  constructor(props) {
    super(props)

    this.state = {
      count: 0,
      selectedDate: new Date(),
      setSelectedDate: '',
      refresh: false,
      progress: 0,
      disablePrev: false,
      checkedB: true,
      dob: this.props.familyData.dob,
      gender: this.props.familyData.gender,
      email: this.props.familyData.email,
      isPrimary: this.props.familyData.isPrimary,
      /*feet: this.props.familyData.feet,
      inches: this.props.familyData.inches,
      weight: this.props.familyData.weight,*/
      showEdit: false,
      genderList: ['MALE', 'FEMALE'],
      loaderShow: false,
      instData: this.props.instData,
      ageValid: false,
      age_latest: '',
      dateErr: false,
      todayDateValid: false,
      birthDtFocus: false,
      birthDt: false,
      x1: '',
      heightValid: true
    }
  }

  componentDidMount() {
    let age = this.handleDateChange(this.state.dob, true)
    this.textChangeHandler()
    this.setState({
      refresh: true,
      loaderShow: true,
      ageValid: age
    })

    if (parseInt(this.state.feet) === 0 && parseInt(this.state.inches) === 0) {
      let evt = new CustomEvent('feet', { detail: { flag: true } })
      window.dispatchEvent(evt)
      this.setState({
        heightValid: false,
        loaderShow: false
      })
      // this.state.heightValid = false;
    } else if (this.state.feet !== '' && this.state.inches !== '') {
      let evt = new CustomEvent('feet', { detail: { flag: false } })
      window.dispatchEvent(evt)
      // this.state.heightValid = true;
      this.setState({
        heightValid: true,
        loaderShow: false
      })
    }

    // fetch(configuration.baseUrl + '/questionbank/getGender')
    //   .then((response) => response.json())
    //   .then(response => {
    //     if (response.response) {
    //       this.setState({
    //         genderList: response.response,
    //         loaderShow: false

    //       });
    //     }
    //   })
    //   .catch(error => {
    //     this.setState({
    //       loaderShow: false
    //     });
    //   })
  }

  enableNext() {
    console.log('============== enableNext ============')
    console.log(this.state.dob)

    if (
      this.state.dob !== '' &&
      this.state.gender !== '' &&
      this.state.feet !== '' &&
      this.state.weight !== '' &&
      this.state.inches !== '' &&
      !this.state.dateErr &&
      this.state.heightValid
    ) {
      let obj = {
        dob: this.state.dob,
        gender: this.state.gender,
        feet: this.state.feet,
        inches: this.state.inches,
        weight: this.state.weight,
        email: this.state.email
      }
      this.props.onClick(false, obj)
    } else {
      let obj = {
        dob: this.state.dob,
        gender: this.state.gender,
        feet: this.state.feet,
        inches: this.state.inches,
        weight: this.state.weight,
        email: this.state.email
      }
      this.props.onClick(true, obj)
    }
  }

  textChangeHandler = (val, valid, details) => {
    if (valid) {
      this.state[details.name] = val
      if (details.name === 'feet' || details.name === 'inches') {
        if (parseInt(this.state.feet) === 0 && parseInt(this.state.inches) === 0) {
          let evt = new CustomEvent('feet', { detail: { flag: true, parentData: details, value: val } })
          window.dispatchEvent(evt)
          this.state.heightValid = false
        } else if (this.state.feet !== '' && this.state.inches !== '') {
          let evt = new CustomEvent('feet', { detail: { flag: false, parentData: details, value: val } })
          window.dispatchEvent(evt)
          this.state.heightValid = true
        }
      }
    } else if (details) {
      this.state[details.name] = ''
    }
    this.setState({
      refresh: true
    })
    this.enableNext()
  }

  handleHover() {
    var panel = document.getElementById('date-picker-dialog')
    var p2 = document.getElementsByName('KeyboardDatePicker')
    panel.addEventListener('mouseover', function() {
      document.getElementById('date-picker-dialog').style.color = '#533278'
    })
  }

  calculate_age = dob1 => {
    var today = new Date()
    var birthDate = new Date(dob1)
    var age_now = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--
    }
    if (this.props.age !== null && this.props.age !== undefined && age_now !== this.props.age) {
      return false
    } else if (age_now > 85) {
      return false
    } else {
      return true
    }
  }
  handleDateChange = (date, didMount) => {
    const today = new Date()
    const valDate = new Date(date)
    let validAge = false

    this.state.dob = moment(date).format('YYYY-MM-DD')
    if (
      this.props.age > 0 &&
      valDate.getDate() === today.getDate() &&
      valDate.getMonth() === today.getMonth() &&
      valDate.getFullYear() === today.getFullYear()
    ) {
      if (didMount === true) {
        this.state.todayDateValid = true
      } else {
        this.state.todayDateValid = false
      }
      validAge = false
    } else {
      if (
        this.props.age === 0 &&
        valDate.getDate() === today.getDate() &&
        valDate.getMonth() === today.getMonth() &&
        valDate.getFullYear() === today.getFullYear()
      ) {
        this.state.todayDateValid = false
        validAge = true
      } else {
        if (didMount === true && valDate === today) {
          this.state.todayDateValid = true
        } else {
          this.state.todayDateValid = false
        }
        validAge = this.calculate_age(this.state.dob)
      }
    }

    this.setState({
      ageValid: validAge
    })
    if (!validAge) {
      this.setState({ dateErr: true }, () => {
        this.enableNext()
      })
    } else {
      this.setState({ dateErr: false }, () => {
        this.enableNext()
      })
    }
  }

  fourthMethod(e) {
    const re = /^[0-9]*$/
    if (!re.test(e.key)) {
      e.preventDefault()
    }
  }
  firstMethod(e) {
    const re = /^[a-zA-Z]*$/
    if (!re.test(e.key)) {
      e.preventDefault()
    }
  }
  handlerCopy(e) {
    e.preventDefault()
  }
  render() {
    const { classes } = this.props
    let myDate =
      moment(this.state.dob).format('MM') + '/' + moment(this.state.dob).format('DD') + '/' + moment(this.state.dob).format('YYYY')

    return (
      <Row className="d-flex mt-2 card-content px-3">
        {this.state.loaderShow ? <CommonLoader /> : ''}
        <Col md={7} className="px-1 px-md-2">
          <Row>
            <Col md={12} className="px-1 px-md-2">
              <div className="custom-subtitle">{this.state.instData.title}</div>
            </Col>
            <Col md={12}>
              <Row className="d-flex justify-content-between">
                <Col md={10}>
                  <Row className="d-flex justify-content-between">
                    <Col sm={12} md={5} className="my-2 px-0">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          required
                          disabled={true}
                          onBlur={() => this.setState({ birthDtFocus: true })}
                          onMouseOver={() => this.setState({ birthDt: true })}
                          onMouseOut={() => this.setState({ birthDt: false })}
                          autoComplete="off"
                          margin="none"
                          id="date-picker-dialog"
                          label="Birth Date"
                          format="MM/dd/yyyy"
                          error={this.state.dateErr && !this.state.todayDateValid}
                          helperText={
                            this.state.todayDateValid
                              ? 'Date Required'
                              : this.state.dateErr
                              ? 'Date does not correspond with age entered earlier. Change age to [' + this.props.age + ']'
                              : ''
                          }
                          value={this.state.todayDateValid ? null : myDate}
                          onFocus={e => e.target.blur()}
                          onCopy={this.handlerCopy}
                          onPaste={this.handlerCopy}
                          inputProps={{
                            style: {
                              fontSize: '18px',
                              fontfamily: 'Roboto',
                              paddingLeft: '12px',
                              paddingRight: '12px',
                              marginTop: '6px',
                              '&:focus': { outline: 'none' },
                              color: !this.state.birthDt ? 'black' : '#533278'
                            }
                          }}
                          InputLabelProps={{
                            style: {
                              paddingLeft: 12,
                              paddingRight: 12,
                              paddingTop: this.state.birthDtFocus || !this.state.todayDateValid ? 12 : 0,
                              color: !this.state.birthDtFocus ? 'grey' : '#533278'
                            }
                          }}
                          onChange={this.handleDateChange}
                          variant="filled"
                          onMouseEnter={this.handleHover}
                          KeyboardButtonProps={{
                            'aria-label': 'change date'
                          }}
                          className="w-100 card-bottom"
                          maxDate={new Date()}
                        />
                      </MuiPickersUtilsProvider>
                    </Col>
                    <Col sm={12} md={5} className="my-2 px-0 mr-sm-0 mr-md-3">
                      <CommonDropDwn
                        setChild={this.textChangeHandler.bind(this)}
                        name={'Birth Gender'}
                        label={'Birth Gender'}
                        value={this.state.gender}
                        disable={true}
                        style={customStyle.dropDown}
                        fieldType={'dropDwn'}
                        helperMsg={'Select Gender'}
                        List={this.state.genderList}
                        parentDetails={{ name: 'gender' }}
                      ></CommonDropDwn>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={9} className="my-3 px-1 px-md-0">
              <Sample
                setChild={this.textChangeHandler.bind(this)}
                name={'Email'}
                reqFlag={this.state.isPrimary}
                label={'Email'}
                value={this.state.email}
                disable={this.props.viewMode || this.state.isPrimary}
                style={customeClasses.txtField}
                length={25}
                fieldType={'any'}
                errMsg={'Enter Valid Email'}
                helperMsg={''}
                parentDetails={{ name: 'email' }}
              ></Sample>
            </Col>
          </Row>
        </Col>
        <Col md={5} className="px-1">
          <Row className="d-flex flex-column" style={{ marginTop: '15px' }}>
            <Col md={10} className="px-1">
              <div className="custom-subtitle">{i18n.t('ENROLL_NEW.SUB_TITLE')}</div>
              <div className="description">
                We need your email address for any personal health related communication.
                <div dangerouslySetInnerHTML={{ __html: this.state.instData.description }} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default EnrollNew2
