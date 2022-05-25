import DateFnsUtils from '@date-io/date-fns'
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CloseIcon from '@material-ui/icons/Close'
import ForumIcon from '@material-ui/icons/Forum'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import axios from 'axios'
import 'date-fns'
import moment from 'moment'
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { getPaymentCardData, getSourceCode } from '../../ApiCall'
import CommonLoader from '../../CommonLoader'
import RadioChecked from '../../Images/radioButtonChecked.png'
import RadioUnchecked from '../../Images/radioButtonUnchecked.png'
import Header from '../Header'
import TransactionDataTable from './DataTable'
import PaymentCard from './PaymentCard/PaymentCardFront'
import CustomeCss from './paymentmode.css.js'
import './PaymentWallet.css'
import Sample from './sampleTextField'
import customStyle from './stylesheet_UHS'

const CrudButton = withStyles(customStyle.crudBtn)(Fab)

const AntTab = withStyles(theme => customStyle.tab)(props => <Tab disableRipple {...props} />)

const NextButton = withStyles(customStyle.PayButton)(Button)

const CssTextField = withStyles(() => ({
  root: {
    '& .MuiInput-root': {
      '&:hover:not($disabled):not($focused):not($error):before': {
        borderBottom: '2px solid #533278'
      },

      '&.MuiInput-underline.Mui-focused:after': {
        borderBottom: '2px solid #533278'
      }
    }
  }
}))(TextField)
export default class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      disabled: true,
      tableData: [],
      open: false,
      activeTab: 0,
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
      paymentType: '',
      cvv: '',
      selectedValue: '',
      years: [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031],
      tabFirstIcon: RadioChecked,
      tabSecondIcon: RadioUnchecked,
      sourceCode: localStorage.getItem('sourceid'),
      empid: null,
      disabled2: true,
      errorModal: false,
      MsgModal: '',
      accountNo: null,
      MsgModalerror: '',
      loader: true,
      notfoundmsg: '',
      errCodeCC: false,
      errCodeACH: false,
      MsgModalerrorFooterACH: '',
      MsgModalerrorFooterCC: '',
      reqFlag: true,
      selectedDate: null,
      setSelectedDate: '',
      targetDate: null,
      providerName: '',
      purposeOfVisit: '',
      visible: false,
      paymentCardData: null,
      notfoundmsg1: '',
      notfoundmsg2: '',
      notfoundmsg3: '',
      birthDt: false,
      requestCardModal: false
    }
    this.openPaymentCard = this.openPaymentCard.bind(this)
  }

  componentDidMount() {
    this.setState({ loader: true })
    this.getSourceCodeFun()
    this.getPaymentCardData()
  }

  postForAccessToken = () => {
    let url =
      'https://test.salesforce.com/services/oauth2/token?password=Test@123poA3y92JUomMOSHlsv4tY13u&grant_type=password&client_secret=ABD0D24D689E3BCA8ACA4D7DDFF8311152D183EEF70072C99CD647329BE47866&client_id=3MVG9PG9sFc71i9niSy3spF8Y.sZ9VHsCuRQDCCArRoxKX.vQMzNRq8zTXVyZaoLvVl3GAlolvNqzRxmAg65.&username=carynintegrationsit@ust.com.sit'
    console.log('----URL----', url)

    var headers = {
      'Access-Control-Allow-Origin': 'https://dev.member.universalhealthfellowship.org/'
    }
    axios
      .post(url, null, { headers: headers })

      .then(response => {
        console.log('Payment Token====:' + response.access_token)
        return response
      })
      .catch(error => {
        console.log('Catche error===', JSON.stringify(error))
        return error
      })
  }

  getSourceCodeFun = () => {
    getSourceCode()
      .then(res => {
        this.setState({
          sourceCode: res.data.memberIdSource,
          empid: res.data.empId,

          loader: false
        })
      })
      .catch()
  }

  getPaymentCardData = () => {
    let request

    request = {
      memberNumber: localStorage.getItem('Member_EMPID')
    }

    /* if(localStorage.getItem('SOURCE') === 'NEO'){
           request={
            "memberNumber":"CNEO675423567"
          }
        } */

    getPaymentCardData(request)
      .then(res => {
        console.log('getPaymentCardData====', res)

        if (res && res.data.length > 0) {
          this.setState({ tableData: res.data, loader: false })
        } else {
          this.handleError()
        }
      })
      .catch(error => {
        console.error('Error during service worker registration namita:', error.message)

        this.handleError()
      })
  }

  handleError = () => {
    this.setState({
      notfoundmsg1: 'There are no payment cards approved for your account.',
      notfoundmsg2: 'Submitted payment card requests, if any, may take 2-3 days to be processed. ',
      notfoundmsg3: ' For any clarifications call Customer Service.',
      loader: false
    })
  }
  handleClose = () => {
    this.setState({ open: false, purposeOfVisit: '', providerName: '', selectedDate: null }, () => this.validateForm())
  }

  handleClickOpen = () => {
    this.setState({ requestCardModal: true })
  }

  changeTextFieldHandler = (val, isValid, parentObj) => {
    if (parentObj.label === 'bank_name') {
      if (isValid) {
        this.state.providerName = val
      } else {
        this.state.providerName = ''
      }
    } else if (parentObj.label === 'Account_Name') {
      if (isValid) {
        this.state.purposeOfVisit = val
      } else {
        this.state.purposeOfVisit = ''
      }
    } else if (parentObj.label === 'Routing_Number') {
      if (isValid) {
        this.state.routingNo = val
        this.state.errCodeACH = false
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
        this.state.MsgModalerror = ''
        this.state.errCodeCC = ''
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
    if (this.state.providerName !== '' && this.state.purposeOfVisit !== '' && this.state.accountType !== '') {
      this.setState(
        {
          disabled: false
        },
        () => console.log('====Button===' + this.state.disabled)
      )
    } else {
      this.setState(
        {
          disabled: true
        },
        () => console.log('====Button===' + this.state.disabled)
      )
    }
  }

  openPaymentCard = rowData => {
    console.log('Parent data ====', rowData)
    this.setState({ visible: true, paymentCardData: rowData })
  }

  getDateInUTC = (date, getInMillisecs) => {
    if (date) {
      let newDateTime = new Date(date)

      return new Date(newDateTime)
    }

    return date
  }

  sendRequest = () => {}

  closeRequestCardModal = () => {
    this.setState({ requestCardModal: false })
  }

  changePaymentMode = () => {}

  handleCloseErrorModal = () => {
    this.setState({
      errorModal: false,

      purposeOfVisit: '',
      providerName: '',
      selectedDate: null,
      accountType: ''
    })
  }

  handleHover() {
    var panel = document.getElementById('date-picker-dialog')
    panel.addEventListener('mouseover', function() {
      document.getElementById('date-picker-dialog').style.paddingTop = '0px'
    })
  }

  handleDateChange = (date, didMount) => {
    this.setState(
      {
        selectedDate: date
      },
      () => {
        let panel = document.getElementById('date-picker-dialog')
        panel.addEventListener('onmouseleave', function() {
          document.getElementById('date-picker-dialog-label').style.paddingTop = '10px'
        })
      }
    )
    this.validateForm()
  }
  goBack = () => {
    this.props.history.push('/')
  }

  clickCalender = () => {
    console.log('clickCalender')
  }
  openChat = () => {
    sessionStorage.setItem('chatwindow', true)
    this.props.history.push('/')
  }
  render() {
    const { classes } = this.props
    let myDate =
      moment(this.state.selectedDate).format('MM') +
      '/' +
      moment(this.state.selectedDate).format('DD') +
      '/' +
      moment(this.state.selectedDate).format('YYYY')
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return (
      <div className="progInfoMainWrapper">
        {this.state.loader ? <CommonLoader /> : null}
        <Header name={'MyTransactions'} />
        <div className="container progInfoContainer" style={{ zIndex: '0' }}>
          <sapn className="Back_page" onClick={this.goBack}>
            <ArrowBackIcon style={{ width: '24px', height: '24px', color: ' #543379', marginRight: '5px' }} onClick={this.goBack} />
            BACK
          </sapn>
          <div className="commonWrap" style={{ marginTop: '-27px' }}>
            <div className="progInfoSection" style={{ marginTop: '-15px' }}>
              <span className="progInfoTitle">PAYMENT WALLET</span>
            </div>

            <div className="tablebackgroundouter tablebackgroundouterPaymentWallet">
              {this.state.tableData && this.state.tableData.length > 0 ? (
                <TransactionDataTable tableData={this.state.tableData} openPaymentCard={row => this.openPaymentCard(row)} />
              ) : (
                <div className="data_not_found">
                  <h5 class="noneeds_msg_display">{this.state.notfoundmsg1}</h5>
                  <h5 class="noneeds_msg_display">{this.state.notfoundmsg2}</h5>
                  <h5 class="noneeds_msg_display">{this.state.notfoundmsg3}</h5>
                </div>
              )}
            </div>

            <div className="progInfoFooter">
              <div className="row">
                <div className="col-md-6">
                  <button
                    type="button"
                    onClick={this.handleClickOpen}
                    className="blueActionBtn border-0 mr-2 text-uppercase"
                    style={{ marginTop: '10px' }}
                  >
                    Request Payment Card
                  </button>
                </div>
                <div className="col-md-6 dpFlex">
                  {/* <div className="elevation"></div> */}
                  <div className="footerText" style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                      <p>Need help?</p>
                      <p>Chat with our Health Share Representative</p>
                      <p>or call 1 (888) 366 6243.</p>
                    </div>
                    <div style={{ marginLeft: 12 }}>
                      {/* <Fab color="#41B5C2" style={{ backgroundColor: '#533278' }} aria-label="add" onClick={() => this.openChat()}>
                        <img src={require('../../../assets/images/carynIcon.jpg')} />
                      </Fab> */}
                      <CrudButton
                        className={'purechat-button-expand'}
                        color="primary"
                        onClick={() => window.pureChat()}
                        aria-label="add"
                        style={customStyle.CommonChatBtn}
                      >
                        <ForumIcon />
                      </CrudButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================== */}

        <Modal
          size="lg"
          show={this.state.open}
          onHide={this.handleClose}
          centered
          className="ChangPayModal paymentWalletModal"
          backdrop="static"
        >
          <Modal.Body>
            {/* <PaymentCard/> */}
            <Grid container direction="row" justify="space-between" alignItems="flex-start">
              <span class="Change-Payment-Method">Request Card</span>
              <IconButton aria-label="close" onClick={this.handleClose} style={{ marginTop: '-13px' }}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <p class="The-fellowship-incurs-additional-fees-related-to-p">
                  We can ease your next care visit by scheduling the appointment and help save money by paying our healthcare provider at
                  the time of your scheduled appointment. Fill in the purpose of your visit and if you have preferred provider you would
                  like to visit.
                </p>
              </Grid>
            </Grid>

            <div>
              <Grid container spacing={1} style={{ marginTop: '1%' }}>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      {/* <CommonDropDwn setChild={this.changeTextFieldHandler.bind(this)} name={'Member'} label={'Member'} value={this.state.accountType} disable={false} style={customStyle.dropDown}  fieldType={'dropDwn'}  helperMsg={'Select member'} List={this.state.accountTypes}  parentDetails={{label:'Account_Type'}}></CommonDropDwn> */}
                      <Sample
                        setChild={this.changeTextFieldHandler.bind(this)}
                        name={'Member'}
                        reqFlag={true}
                        label={'Member'}
                        value={this.state.accountType}
                        disable={false}
                        style={CustomeCss.textField}
                        length={120}
                        fieldType={'bank_name'}
                        errMsg={'Enter valid member name'}
                        helperMsg={'Member name required'}
                        parentDetails={{ label: 'Account_Type' }}
                        key={0}
                      ></Sample>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Sample
                        setChild={this.changeTextFieldHandler.bind(this)}
                        name={'Purpose_of_Visit'}
                        reqFlag={true}
                        label={'Purpose of Visit'}
                        value={this.state.purposeOfVisit}
                        disable={false}
                        style={CustomeCss.textField}
                        length={120}
                        fieldType={'bank_name'}
                        errMsg={'Enter valid purpose'}
                        helperMsg={'Purpose of Visit required'}
                        parentDetails={{ label: 'Account_Name' }}
                        key={0}
                      ></Sample>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} style={{ marginBottom: '-1%' }}>
                      <div style={{ position: 'relative', zIndex: '100' }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            required
                            onBlur={() => this.setState({ birthDtFocus: true })}
                            onMouseOver={() => this.setState({ birthDt: false })}
                            onMouseLeave={() => this.setState({ birthDt: true })}
                            autoComplete="off"
                            margin="none"
                            id="date-picker-dialog"
                            label="Preferred Date"
                            format="MM/dd/yyyy"
                            error={this.state.dateErr}
                            helperText={this.state.dateErr ? 'Enter valid date' : ''}
                            value={tomorrow}
                            onFocus={e => e.target.blur()}
                            onCopy={this.handlerCopy}
                            onPaste={this.handlerCopy}
                            inputProps={{
                              style: {
                                fontSize: '18px',
                                fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
                                paddingLeft: '11px',
                                paddingRight: '10px',
                                marginTop: '11px',
                                '&:focus': { outline: 'none' },
                                color: !this.state.birthDt ? 'grey' : '#533278'
                              }
                            }}
                            InputLabelProps={{
                              style: {
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: this.state.birthDt == false ? 0 : 0,
                                color: !this.state.birthDtFocus ? 'grey' : this.state.birthDt ? '#533278' : 'grey'
                              }
                            }}
                            onChange={this.handleDateChange.bind(this)}
                            variant="filled"
                            onMouseEnter={this.handleHover}
                            TextFieldComponent={CssTextField}
                            KeyboardButtonProps={{
                              'aria-label': 'change date'
                            }}
                            style={{ width: '100%', zIndex: '2000!important', backgroundColor: '#f4f4f4' }}
                            minDate={new Date(tomorrow)}
                          />
                          {/* <span id='bd' className="preferedDateStyle">{this.state.selectedDate == '' || this.state.selectedDate == null ?'Select prefered date' : ''}</span> */}

                          <span id="bd" className="preferedDateStyle">
                            {tomorrow == '' || tomorrow == null ? 'Select prefered date' : ''}
                          </span>
                        </MuiPickersUtilsProvider>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={8} style={{ marginBottom: '-1%' }}>
                      <Sample
                        setChild={this.changeTextFieldHandler.bind(this)}
                        name={'Preferred_Healthcare_Provider'}
                        reqFlag={true}
                        label={'Preferred Healthcare Provider'}
                        value={this.state.providerName}
                        disable={false}
                        style={CustomeCss.textField}
                        length={120}
                        fieldType={'bank_name'}
                        errMsg={'Enter valid healthcare provider'}
                        helperMsg={'Preferred Healthcare Provider required'}
                        parentDetails={{ label: 'bank_name' }}
                        key={0}
                      ></Sample>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose} style={{ marginRight: '15px' }} class="ButtonBG">
              CANCEL
            </Button>
            <NextButton variant="contained" disabled={this.state.disabled} color="primary" onClick={this.sendRequest}>
              DONE
            </NextButton>
          </Modal.Footer>
        </Modal>

        {/* ===============================Error Modal====================================== */}

        <Modal size="small" show={this.state.errorModal} onHide={this.handleCloseErrorModal} centered backdrop="static">
          <Modal.Header>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/* {this.state.loader?<CommonLoader/>:null} */}
            <b> {this.state.MsgModal}</b>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseErrorModal} class="ButtonBG">
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          size="lg"
          show={this.state.requestCardModal}
          onHide={this.closeRequestCardModal}
          centered
          className="ChangPayModal"
          backdrop="static"
        >
          <Modal.Body>
            <Grid container direction="row" justify="space-between" alignItems="flex-start">
              <span class="Change-Payment-Method">Request a New Payment Card</span>
              <IconButton aria-label="close" onClick={this.closeRequestCardModal} style={{ marginTop: '-13px' }}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid container direction="row" justify="space-between" alignItems="flex-start">
              <span style={{ textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>
                {/* To send rquest for payment card, call Member Services team at : {localStorage.getItem('CONTACT_NUMBER')} , Monday through Friday 8:00 am to 8:00 pm CST. */}
                {/* We may be able to help you save money by paying your healthcare provider at the time of your scheduled appointment. To request a payment card call Member Services at {localStorage.getItem('CONTACT_NUMBER')}, Monday to Friday 8am to 8pm CST. */}
                We can ease your next visit, by providing you with a payment card that you can use to pay your healthcare provider at the
                time of your scheduled appointment. To request a payment card call Member Services at{' '}
                {localStorage.getItem('CONTACT_NUMBER')}, Monday to Friday 8am to 8pm CST.
              </span>
            </Grid>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeRequestCardModal} style={{ marginRight: '15px' }} class="ButtonBG">
              CLOSE
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal className="paymentCardModal" show={this.state.visible} onHide={() => this.setState({ visible: false })} centered>
          <Modal.Body style={{ padding: '0px' }}>
            <PaymentCard paymentData={this.state.paymentCardData} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
