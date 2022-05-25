import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import moment from 'moment'
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { getAccountNumber, getSourceCode, storeTransaction } from '../../ApiCall'
import CommonLoader from '../../CommonLoader'
import RadioChecked from '../../Images/radioButtonChecked.png'
import RadioUnchecked from '../../Images/radioButtonUnchecked.png'
import MobileFooter from '../MobileFooter'
import CommonDropDwn from './CommonDropDwn'
import CustomeCss from './paymentmode.css.js'
import Sample from './sampleTextField'
import customStyle from './stylesheet_UHS'
import './transaction.css'

const AntTabs = withStyles(customStyle.tabs)(Tabs)

const AntTab = withStyles(theme => customStyle.tab)(props => <Tab disableRipple {...props} />)

const NextButton = withStyles(customStyle.ChangePayButton)(Button)

const PurpleRadio = withStyles(customStyle.radioBtn)(props => <Radio color="default" {...props} />)

class PaymentMode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      activeTab: 0,
      accountTypes: [],
      bankName: '',
      accountName: localStorage.getItem('subscriberName'),
      accountType: '',
      routingNo: '',
      accountNumber: '',
      cardNumber: '',
      holderName: localStorage.getItem('subscriberName'),
      expiryMonth: '',
      expiryYear: '',
      monthlyDebitDay: '',
      cvv: '',
      selectedValue: '',
      tabFirstIcon: RadioChecked,
      disabled: true,
      disabled2: true,
      errorModal: false,
      MsgModal: '',
      loader: false,
      tabSecondIcon: RadioUnchecked,
      sourceCode: null,
      empid: null,
      accountNo: null,
      successModal: false,
      errCodeCC: false,
      errCodeACH: false,
      MsgModalerrorFooterACH: '',
      MsgModalerrorFooterCC: '',
      years: [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  }
  handleClose = () => {
    //this.setState({open:false})
    this.goBack()
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  componentDidMount() {
    if (localStorage.getItem('SOURCE') !== 'NEO') {
      this.setState({ loader: true })
      getSourceCode()
        .then(res => {
          this.setState(
            {
              loader: false,
              sourceCode: res.data.memberIdSource,
              empid: res.data.empId,
              accountTypes: ['CHECKING', 'SAVINGS']
            },
            () => this.getAccountNumber()
          )
        })
        .catch()
    }
  }

  getAccountNumber = () => {
    // axios.get('http://3.136.92.227:8085/api/v6/transaction/getLast4AccountNumber/')
    getAccountNumber().then(res => {
      // this.setState({accountNo:res.data.response,loader:false})
      if (res.data.code === 200) {
        var accNo = res.data.response
        var star = '*'

        let AccountNo = accNo.split(star).join('X')
        this.setState({ accountNo: AccountNo, loader: false })
      } else if (res.data.code === 202) {
        let x = JSON.parse(res.data.response).error_message
        let errMsg = ''
        if (x.includes('-')) {
          let cds = x.split(' - ')
          errMsg = cds[1]
        } else {
          errMsg = x
        }

        this.setState({
          accountNo: '',
          errorModal: true,
          MsgModal: errMsg
        })
      } else {
        this.setState({ accountNo: '' })
      }
    })
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
        this.state.routingNo !== ''
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
        !this.state.validMonth
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
      // flag = 'ACH';
      this.setState({ activeTab: 0 })
      this.setState({ tabFirstIcon: RadioChecked })
      this.setState({ tabSecondIcon: RadioUnchecked })
    } else {
      // flag = 'CC';
      this.setState({ activeTab: 1 })
      this.setState({ tabFirstIcon: RadioUnchecked })
      this.setState({ tabSecondIcon: RadioChecked })
    }
  }

  changePaymentMode = () => {
    this.setState({ loader: true })
    let obj
    var payType = ''
    if (this.state.activeTab == 0) {
      payType = 'ACH'
    } else {
      payType = 'CC'
    }

    obj = {
      source: this.state.sourceCode,
      bankName: this.state.bankName,
      accountName: this.state.accountName,
      accountNumber: this.state.accountNumber,
      accountType: this.state.accountType,
      routingNo: this.state.routingNo,

      cardNumber: this.state.cardNumber,
      holderName: this.state.holderName,
      expiryMonth: this.state.expiryMonth
        ? moment()
            .month(this.state.expiryMonth)
            .format('M')
        : '',
      expiryYear: this.state.expiryYear,
      cvv: this.state.cvv,
      paymentType: payType
    }

    // axios.post('http://3.136.92.227:8085/api/v6/transaction/storeTransaction' ,obj)
    storeTransaction(obj).then(res => {
      if (res.data.code == 200) {
        if (this.state.activeTab == 0) {
          this.setState({
            loader: true
          })
        }
        if (this.state.activeTab == 1) {
          this.setState({
            loader: true
          })
        }
        this.setState({ successModal: true, loader: false, MsgModal: 'Updated payment details successfully!' })
      } else if (res.data.code == 202) {
        let x = JSON.parse(res.data.response).error_message
        let errMsg = ''
        if (x.includes('-')) {
          let cds = x.split(' - ')
          errMsg = cds[1]
        } else {
          errMsg = x
        }
        this.setState({
          // errorModal:true,
          MsgModal: errMsg,
          loader: false,
          errCodeACH: true
        })
        if (this.state.activeTab == 0) {
          this.setState({
            errCodeACH: true,
            cvv: '',
            cardNumber: '',
            errCodeCC: false,
            expiryMonth: '',
            expiryYear: '',
            reqFlag: false,
            disabled2: true
          })
          let evt = new CustomEvent('errorCode', { detail: { flag: true } })
          window.dispatchEvent(evt)
        }
        if (this.state.activeTab == 1) {
          this.setState({
            errCodeCC: true,
            bankName: '',
            accountNumber: '',
            accountType: '',
            routingNo: '',
            errCodeACH: false,
            disabled: true
          })

          let evt = new CustomEvent('errorCode', { detail: { flag: true } })
          window.dispatchEvent(evt)
        }
      } else if (res.data.code == 204) {
        if (this.state.activeTab == 0) {
          this.setState({
            errorModal: true,
            loader: false,
            MsgModal: 'Source is not registered',
            cvv: '',
            cardNumber: '',
            errCodeCC: false,
            expiryMonth: '',
            expiryYear: '',
            disabled2: true
          })
        } else {
          this.setState({
            errorModal: true,
            MsgModal: 'Source is not registered',
            loader: false,
            errCodeACH: false,
            bankName: '',
            accountNumber: '',
            accountType: '',
            routingNo: '',
            disabled: true
          })
        }
      } else if (res.data.code == 500) {
        if (this.state.activeTab == 0) {
          this.setState({
            errorModal: true,
            loader: false,
            MsgModal: 'Internal server error',
            cvv: '',
            cardNumber: '',
            errCodeCC: false,
            expiryMonth: '',
            expiryYear: '',
            disabled2: true
          })
        } else {
          this.setState({
            errorModal: true,
            MsgModal: 'Internal server error',
            loader: false,
            errCodeACH: false,
            bankName: '',
            accountNumber: '',
            accountType: '',
            routingNo: '',
            disabled: true
          })
        }
      } else {
        let x = JSON.parse(res.data.response).error_message
        let cds = x.split(' - ')
        if (this.state.activeTab == 0) {
          this.setState({
            MsgModal: cds[1],
            errorModal: true,
            loader: false,
            cvv: '',
            cardNumber: '',
            errCodeCC: false,
            expiryMonth: '',
            expiryYear: '',
            disabled2: true
          })
        } else {
          this.setState({
            MsgModal: cds[1],
            errorModal: true,
            loader: false,
            bankName: '',
            accountNumber: '',
            accountType: '',
            routingNo: '',
            disabled: true
          })
        }
      }
    })
  }

  handleCloseErrorModal = () => {
    /*this.getAccountNumber()*/
    this.setState({ errorModal: false })
  }

  handleCloseSuccessModal = () => {
    this.getAccountNumber()
    this.setState({ successModal: false })
    this.goBack()
  }

  handleChangeRadio = event => {
    this.setState({ selectedValue: event.target.value })
  }
  goBack = () => {
    this.props.history.push('/MyTransactionMobile')
  }

  render() {
    let currentScreen = ''
    if (this.state.activeTab === 0) {
      currentScreen = (
        <div className="grid_row1">
          <Grid container style={{ marginTop: '20px' }} justify="center" alignItems="center">
            <Grid item xs={10} sm={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4} sm={4} style={{ marginBottom: '-1%' }}>
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
                <Grid item xs={12} md={4} sm={3} style={{ marginBottom: '-1%' }}>
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
                <Grid item xs={12} md={6} sm={5} style={{ marginBottom: '-3%' }}>
                  {this.state.MsgModal != '' ? (
                    <Sample
                      setChild={this.changeTextFieldHandler.bind(this)}
                      name={'Routing_Number'}
                      MsgModalerror={this.state.MsgModal}
                      ErrCode={this.state.errCodeACH}
                      reqFlag={true}
                      label={'Routing Number'}
                      value={this.state.routingNo}
                      disable={false}
                      style={CustomeCss.textField}
                      length={9}
                      fieldType={'routingNo'}
                      errMsg={'Enter valid routing number'}
                      helperMsg={this.state.MsgModal}
                      parentDetails={{ label: 'Routing_Number' }}
                      key={0}
                    ></Sample>
                  ) : (
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
                  )}
                </Grid>
                <Grid item xs={12} md={6} sm={6}>
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

          <div className="Bottom-Blue">
            <Grid container>
              <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Button variant="secondary" onClick={this.handleClose} class="ButtonBGMobile">
                  CANCEL
                </Button>
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'center' }}>
                <NextButton variant="contained" color="primary" onClick={this.changePaymentMode} disabled={this.state.disabled}>
                  DONE
                </NextButton>
              </Grid>
            </Grid>
          </div>
        </div>
      )
    } else if (this.state.activeTab === 1) {
      currentScreen = (
        <div className="grid_row1">
          <Grid container style={{ marginTop: '20px' }} justify="center" alignItems="center">
            <Grid item xs={10} sm={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} style={{ marginBottom: '-3%' }}>
                  {this.state.MsgModal != '' ? (
                    <Sample
                      setChild={this.changeTextFieldHandler.bind(this)}
                      name={'Card_Number'}
                      MsgModalerror={this.state.MsgModal}
                      ErrCode={this.state.errCodeCC}
                      reqFlag={true}
                      label={'Card Number'}
                      value={this.state.cardNumber}
                      disable={false}
                      style={CustomeCss.textField}
                      length={16}
                      fieldType={'cardNumber'}
                      errMsg={'Card number up to 16 digits'}
                      helperMsg={this.state.MsgModal}
                      parentDetails={{ label: 'Card_Number' }}
                    ></Sample>
                  ) : (
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
                  )}
                </Grid>
                <Grid item xs={12} md={6} sm={5}>
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
              <Grid container spacing={2} style={{ marginTop: '2%' }}>
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
                <Grid item xs={12} md={4} sm={3}>
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

          <div className="Bottom-Blue">
            <Grid container>
              <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Button variant="secondary" onClick={this.handleClose} class="ButtonBGMobile">
                  CANCEL
                </Button>
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'center' }}>
                <NextButton variant="contained" color="primary" onClick={this.changePaymentMode} disabled={this.state.disabled2}>
                  DONE
                </NextButton>
              </Grid>
            </Grid>
          </div>
        </div>
      )
    }

    return (
      <div style={{ backgroundColor: '#ffffff' }}>
        {this.state.loader ? <CommonLoader /> : null}

        {/* <MobileHeader name="Change Payment Method" /> */}

        <div className="mobileHeaderWrapper">
          <ArrowBackIcon style={{ width: '24px', height: '24px', color: '#ffffff' }} onClick={this.goBack} />
          <div className="mobileHeaderTitle">Change Payment Method </div>
        </div>
        {localStorage.getItem('SOURCE') === 'NEO' ? (
          <div className="mobileCommonBody">
            <div style={{ padding: '180px 0px', textAlign: 'center' }} className="mobile_data_not_found">
              To change your payment method, call Member Services team at : {localStorage.getItem('CONTACT_NUMBER')} , Monday through Friday
              8:00 am to 8:00 pm CST.
            </div>
          </div>
        ) : (
          <div className="mobileCommonBody">
            <p class="The-fellowship-incurs-additional-fees-related-to-p_mobile">
              The fellowship incurs additional fees related to processing credit cards that we do not incur when processing ACH payments. We
              therefore encourage our members to pay by ACH, yet offer credit card payments as an option as well. If you choose to pay by
              credit card, you will incur an additional 3.5% fee to cover the fellowship’s cost.
              {/* <br/><br/>Last used account:{this.state.accountNo}  */}
              {/* {this.state.accountNo!=null?
                 <> {this.state.accountNo} this is your last used account for recurring.</>
                  :""} */}
            </p>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <table className="Last_4_digt_mobile">
                  <tr>
                    <td className="td_style1_mobile">Account Number currently on file</td>
                    <td className="td_style_mobile" style={{ verticalAlign: 'middle' }}>
                      {this.state.accountNo}
                    </td>
                  </tr>
                </table>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <AntTabs value={this.state.activeTab} onChange={this.handleChange} indicatorColor="primary" textColor="primary">
                  <AntTab
                    label="ACH DEBIT"
                    className="ant-col-15 tabBtn tabFirst"
                    icon={<img className="raidoBtn" src={this.state.tabFirstIcon} />}
                  />
                  <AntTab
                    label="CREDIT CARD"
                    className="ant-col-15 tabBtn tabSecond"
                    icon={<img className="raidoBtn" src={this.state.tabSecondIcon} />}
                  />
                </AntTabs>
              </Grid>
            </Grid>
            {/* <ChatIcon  shiftup={true} /> */}

            {currentScreen}
          </div>
        )}
        {/* =================================================== */}

        <div class="fixed-bottom">
          <MobileFooter name="Transaction" />
        </div>

        <Modal size="lg" show={this.state.open} onHide={this.handleClose} centered>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose} class="ButtonBG">
              CANCEL
            </Button>
            <Button variant="primary" onClick={this.handleClose} class="ButtonBG">
              DONE
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ===============================Error Modal====================================== */}

        <Modal size="small" show={this.state.errorModal} onHide={this.handleCloseErrorModal} centered backdrop="static">
          <Modal.Header>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <b> {this.state.MsgModal}</b>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseErrorModal} class="ButtonBG">
              OK
            </Button>
          </Modal.Footer>
        </Modal>
        {/* =====================================Success Modal=========================================== */}

        <Modal size="small" show={this.state.successModal} onHide={this.handleCloseSuccessModal} centered backdrop="static">
          <Modal.Header>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <b> {this.state.MsgModal}</b>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseSuccessModal} class="ButtonBG">
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
export default PaymentMode
