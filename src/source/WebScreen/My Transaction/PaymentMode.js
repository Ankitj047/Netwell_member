import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Radio from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { getSourceCode } from '../../ApiCall'
import CommonDropDwn from './CommonDropDwn'
import CustomeCss from './paymentmode.css.js'
import Sample from './sampleTextField'
import customStyle from './stylesheet_UHS'
import './Transaction.css'
const AntTabs = withStyles(customStyle.tabs)(Tabs)

const AntTab = withStyles(theme => customStyle.tab)(props => <Tab disableRipple {...props} />)

const NextButton = withStyles(customStyle.viewBtn)(Button)

const PurpleRadio = withStyles(customStyle.radioBtn)(props => <Radio color="default" {...props} />)

class PaymentMode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      activeTab: 1,
      accountTypes: [],
      bankName: '',
      accountName: '',
      accountType: '',
      routingNo: '',
      accountNumber: '',
      cardNumber: '',
      holderName: '',
      expiryMonth: '',
      expiryYear: '',
      monthlyDebitDay: '',
      cvv: '',
      selectedValue: '',
      sourceCode: null,
      empid: null
    }
  }
  handleClose = () => {
    this.setState({ open: false })
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  componentDidMount() {
    console.log('Change PAyment mode==========+++++++')
    getSourceCode()
      .then(res => {
        if (res.data && res.data.programInfo) {
                    this.setState({
            sourceCode: res.memberIdSource,
            empid: res.empId
          })

          console.log('res Data==========+++++++', res.memberIdSource)
          console.log('getProgramInfo', this.state.sourceCode)
        } else {
        }
      })
      .catch()
  }

  changeTextFieldHandler = (val, isValid, parentObj) => {
    if (parentObj.label === 'bank_name') {
      if (isValid) {
        this.state.bankName = val
      } else {
        this.state.bankName = ''
      }
    } else if (parentObj.label === 'Account_Name') {
      if (isValid) {
        this.state.accountName = val
      } else {
        this.state.accountName = ''
      }
    } else if (parentObj.label === 'Routing_Number') {
      if (isValid) {
        this.state.routingNo = val
      } else {
        this.state.routingNo = ''
      }
    } else if (parentObj.label === 'Account_Number') {
      if (isValid) {
        this.state.accountNumber = val
      } else {
        this.state.accountNumber = ''
      }
    } else if (parentObj.label === 'Account_Type') {
      if (isValid) {
        this.state.accountType = val
      } else {
        this.state.accountType = ''
      }
    } else if (parentObj.label === 'Card_Number') {
      if (isValid) {
        this.state.cardNumber = val
      } else {
        this.state.cardNumber = ''
      }
    } else if (parentObj.label === 'Holder_Name') {
      if (isValid) {
        this.state.holderName = val
      } else {
        this.state.holderName = ''
      }
    } else if (parentObj.label === 'expiryMonth') {
      if (isValid) {
        let currentDate = new Date()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()
        let selectedMon = moment()
          .month(val)
          .format('M')
        if (this.state.expiryYear) {
          if (this.state.expiryYear === year && parseInt(selectedMon) < month) {
            this.state.validMonth = true
            let evt = new CustomEvent('month', { detail: { flag: true } })
            window.dispatchEvent(evt)
          } else {
            this.state.validMonth = false
            let evt = new CustomEvent('month', { detail: { flag: false } })
            window.dispatchEvent(evt)
          }
        }
        this.state.expiryMonth = val
      } else {
        this.state.expiryMonth = ''
      }
    } else if (parentObj.label === 'expiryYear') {
      if (isValid) {
        let date = new Date()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let selectedMon = moment()
          .month(this.state.expiryMonth)
          .format('M')
        if (val === year && parseInt(selectedMon) < month) {
          this.state.validMonth = true
          let evt = new CustomEvent('month', { detail: { flag: true } })
          window.dispatchEvent(evt)
        } else {
          this.state.validMonth = false
          let evt = new CustomEvent('month', { detail: { flag: false } })
          window.dispatchEvent(evt)
        }
        this.state.expiryYear = val
      } else {
        this.state.expiryYear = ''
      }
    } else if (parentObj.label === 'cvv') {
      if (isValid) {
        this.state.cvv = val
      } else {
        this.state.cvv = ''
      }
    } else if (parentObj.label === 'monthlyDebitDay') {
      if (isValid) {
        this.state.monthlyDebitDay = val
      } else {
        this.state.monthlyDebitDay = ''
      }
    } else if (parentObj.label === 'Street') {
      if (isValid) {
        this.state.userAddress.street = val
      } else {
        this.state.userAddress.street = ''
      }
    }
    this.setState(
      {
        refresh: true
      },
      () => this.validateForm()
    )
  }

  validateForm() {
    if (this.state.activeTab === 0) {
      if (
        this.state.bankName !== '' &&
        this.state.accountName !== '' &&
        this.state.accountNumber !== '' &&
        this.state.accountType !== '' &&
        this.state.routingNo !== '' &&
        this.state.monthlyDebitDay !== ''
      ) {
        this.setState({
          disabled: false
        })
      } else {
        this.setState({
          disabled: true
        })
      }
    } else if (this.state.activeTab === 1) {
      if (
        this.state.cardNumber !== '' &&
        this.state.holderName !== '' &&
        this.state.expiryMonth !== '' &&
        this.state.expiryYear !== '' &&
        this.state.cvv !== '' &&
        !this.state.validMonth &&
        this.state.monthlyDebitDay !== ''
      ) {
        this.setState({
          disabled2: false
        })
      } else {
        this.setState({
          disabled2: true
        })
      }
    }
  }
  handleChange = (event, newValue) => {
    console.log('====================New Value' + newValue)
    this.setState({
      loaderShow: true,
      refresh: true
    })
    let flag
    if (newValue === 0) {
            this.setState({ activeTab: 0 })
    } else {
            this.setState({ activeTab: 1 })
    }
  }

  handleChangeRadio = event => {
    this.setState({ selectedValue: event.target.value })
  }

  render() {
    let currentScreen = ''
    if (this.state.activeTab === 0) {
      currentScreen = (
        <div>
          <Grid container spacing={1} style={{ marginTop: '1%' }}>
            <Grid item xs={12} sm={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} style={{ marginBottom: '-1%' }}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={'Bank_Name'}
                    reqFlag={true}
                    label={'Bank Name'}
                    value={this.state.bankName}
                    disable={false}
                    style={CustomeCss.textField}
                    length={120}
                    fieldType={'bank_name'}
                    errMsg={'Enter valid bank name'}
                    helperMsg={'Bank name required'}
                    parentDetails={{ label: 'bank_name' }}
                    key={0}
                  ></Sample>
                </Grid>
                <Grid item xs={12} sm={4} style={{ marginBottom: '-1%' }}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={'Account_Name'}
                    reqFlag={true}
                    label={'Name on Account'}
                    value={this.state.accountName}
                    disable={false}
                    style={CustomeCss.textField}
                    length={120}
                    fieldType={'accountName'}
                    errMsg={'Enter valid account name'}
                    helperMsg={'Name on account required'}
                    parentDetails={{ label: 'Account_Name' }}
                    key={0}
                  ></Sample>
                </Grid>
                <Grid item xs={12} sm={4} style={{ marginBottom: '-1%' }}>
                  <CommonDropDwn
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={'Account Type'}
                    label={'Account Type'}
                    value={this.state.accountType}
                    disable={false}
                    style={customStyle.dropDown}
                    fieldType={'dropDwn'}
                    helperMsg={'Select account type'}
                    List={this.state.accountTypes}
                    parentDetails={{ label: 'Account_Type' }}
                  ></CommonDropDwn>
                </Grid>
              </Grid>
              <Grid container spacing={3} style={{ marginTop: '1.5%' }}>
                <Grid item xs={12} sm={6} style={{ marginBottom: '-3%' }}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={'Routing_Number'}
                    reqFlag={true}
                    label={'Routing Number'}
                    value={this.state.routingNo}
                    disable={false}
                    style={CustomeCss.textField}
                    length={9}
                    fieldType={'routingNo'}
                    errMsg={'Enter valid routing number'}
                    helperMsg={'Routing number required'}
                    parentDetails={{ label: 'Routing_Number' }}
                    key={0}
                  ></Sample>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={'Account_Number'}
                    reqFlag={true}
                    label={'Account Number'}
                    value={this.state.accountNumber}
                    disable={false}
                    style={CustomeCss.textField}
                    length={17}
                    fieldType={'accountNumber'}
                    errMsg={'Account number up to 17 digits'}
                    helperMsg={'Account number required'}
                    parentDetails={{ label: 'Account_Number' }}
                    key={0}
                  ></Sample>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )
    } else if (this.state.activeTab === 1) {
      currentScreen = (
        <div>
          <Grid container spacing={1} style={{ marginTop: '1%' }}>
            <Grid item xs={12} sm={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} style={{ marginBottom: '-3%' }}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={'Card_Number'}
                    reqFlag={true}
                    label={'Card Number'}
                    value={this.state.cardNumber}
                    disable={false}
                    style={CustomeCss.textField}
                    length={16}
                    fieldType={'cardNumber'}
                    errMsg={'Card number up to 16 digits'}
                    helperMsg={'Card number required'}
                    parentDetails={{ label: 'Card_Number' }}
                  ></Sample>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={'Holder_Name'}
                    reqFlag={true}
                    label={'Card Holder Name'}
                    value={this.state.holderName}
                    disable={false}
                    style={CustomeCss.textField}
                    length={25}
                    fieldType={'holderName'}
                    errMsg={'Enter valid card holder name'}
                    helperMsg={'Card holder name required'}
                    parentDetails={{ label: 'Holder_Name' }}
                  ></Sample>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <CommonDropDwn
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={'expiryMonth'}
                    label={'Expiration Month'}
                    value={this.state.expiryMonth}
                    disable={false}
                    style={customStyle.dropDown}
                    fieldType={'dropDwn'}
                    helperMsg={'Select expiration month'}
                    errMsg={"The expiration date is before today's date. Enter valid expiration month"}
                    List={this.state.months}
                    parentDetails={{ label: 'expiryMonth', val: this.state.expiryYear }}
                    key={1}
                  ></CommonDropDwn>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CommonDropDwn
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={'expiryYear'}
                    label={'Expiration Year'}
                    value={this.state.expiryYear}
                    disable={false}
                    style={customStyle.dropDown}
                    fieldType={'dropDwn'}
                    helperMsg={'Select expiration year'}
                    errMsg={"The expiration date is before today's date. Enter valid expiration year"}
                    List={this.state.years}
                    parentDetails={{ label: 'expiryYear', val: this.state.expiryMonth }}
                    key={1}
                  ></CommonDropDwn>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={'cvv'}
                    label={'CVV'}
                    reqFlag={true}
                    value={this.state.cvv}
                    disable={false}
                    style={CustomeCss.textField}
                    length={4}
                    fieldType={'cvv'}
                    errMsg={'Enter valid CVV'}
                    helperMsg={'CVV required'}
                    parentDetails={{ label: 'cvv' }}
                    key={1}
                  ></Sample>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )
    }

    return (
      <div>
        <button onClick={this.handleClickOpen}>Change Payment Mode</button>

        {/* =================================================== */}

        <Modal size="lg" show={this.state.open} onHide={this.handleClose} centered>
          <Modal.Body>
            <Grid container direction="row" justify="space-between" alignItems="flex-start">
              <span class="Change-Payment-Method">Change Payment Method</span>
              <IconButton aria-label="close" onClick={this.handleClose} style={{ marginTop: '-13px' }}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <p class="The-fellowship-incurs-additional-fees-related-to-p">
                  The fellowship incurs additional fees related to processing credit cards that we do not incur when processing ACH
                  payments. We therefore encourage our members to pay by ACH, yet offer credit card payments as an option as well. If you
                  choose to pay by credit card, you will incur an additional 3.5% fee to cover the fellowship’s cost.
                </p>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <AntTabs value={this.state.activeTab} onChange={this.handleChange} indicatorColor="primary" textColor="primary">
                  {/* <Radio
                                  checked={this.state.selectedValue === '0'}
                                  onChange={this.handleChangeRadio}
                                  value="0"
                                  name="radio-button-demo"
                                  inputProps={{ 'aria-label': 'A' }}
                                /> */}
                  <AntTab label="ACH DEBIT" className="ant-col-15" control={<Radio />} />

                  <AntTab
                    label="CREDIT CARD"
                    className="ant-col-15"
                    style={{ paddingLeft: '0px', fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }}
                  />
                </AntTabs>
              </Grid>
            </Grid>
            {currentScreen}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose} class="ButtonBG">
              CANCEL
            </Button>
            <Button variant="primary" onClick={this.handleClose} class="ButtonBG">
              DONE
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
export default PaymentMode
