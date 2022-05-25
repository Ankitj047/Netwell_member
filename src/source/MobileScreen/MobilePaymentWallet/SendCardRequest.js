import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import axios from 'axios'
import 'date-fns'
import moment from 'moment'
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { getPaymentCardData, getSourceCode } from '../../ApiCall'
import CommonLoader from '../../CommonLoader'
import RadioChecked from '../../Images/radioButtonChecked.png'
import RadioUnchecked from '../../Images/radioButtonUnchecked.png'
import MobileFooter from '../MobileFooter'
import customStyle from './stylesheet_UHS'
import './transaction.css'

const AntTabs = withStyles(customStyle.tabs)(Tabs)

const AntTab = withStyles(theme => customStyle.tab)(props => <Tab disableRipple {...props} />)

const NextButton = withStyles(customStyle.ChangePayButton)(Button)

const PurpleRadio = withStyles(customStyle.radioBtn)(props => <Radio color="default" {...props} />)

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

class SendCardRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      activeTab: 0,
      // accountTypes: [],
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
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

      selectedDate: null,
      providerName: '',
      purposeOfVisit: '',
      visible: false,
      // accountTypes:["Member_Name"],
      pamentData: [],
      visibleCard: false,
      paymentCardData: null,
      birthDtFocus: false
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
          this.setState({
            loader: false,
            sourceCode: res.data.memberIdSource,
            empid: res.data.empId
            // accountTypes:["CHECKING","SAVINGS"],
          })
        })
        .catch()
    }
    this.getPaymentCardData()
  }

  getPaymentCardData = () => {
    let request
    request = {
      memberNumber: '12345'
    }
    // request={ // dyanamic EMPID from idcard API..........
    //   "memberNumber":localStorage.getItem("Member_EMPID")
    // }

    // if(localStorage.getItem('SOURCE') === 'NEO'){
    //    request={
    //     "memberNumber":"CNEO675423567"
    //   }
    // }

    // request={
    //   "memberNumber":"CHO772020 " //Non-Neo it should be CHO772020 Channelname+6 digit
    // }
    getPaymentCardData(request).then(res => {
      console.log('getPaymentCardData====', res)
      if (res && res.data.length > 0) {
        this.setState({ pamentData: res.data, loader: false })
      } else {
        this.setState({
          notfoundmsg:
            'No request for card have been entered into the system. Submitted card request may take 2-3 days to be displayed here. For any clarifications call Customer Service.',
          loader: false
        })
      }
    })
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
    if (this.state.providerName !== '' && this.state.purposeOfVisit !== '') {
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

  handleDateChange = (date, didMount) => {
    this.setState(
      {
        selectedDate: date,
        birthDtFocus: true
      },
      () => {
        let panel = document.getElementById('date-picker-dialog')
        panel.addEventListener('onmouseleave', function() {
          document.getElementById('date-picker-dialog-label').style.paddingTop = '10px'
        })
      }
    )
  }

  getDateInUTC = (date, getInMillisecs) => {
    if (date) {
      let newDateTime = new Date(date)

      return new Date(newDateTime)
    }

    return date
  }

  sendRequest = () => {
    let requestObject = {
      member_name: this.state.accountType,
      purpose_of_visit: this.state.purposeOfVisit,
      provider_name: this.state.providerName,
      request_date: this.state.selectedDate
    }
    console.log('requestObject====', requestObject)

    this.getDateInUTC(this.state.selectedDate)
    let mail = localStorage.getItem('userMail')

    let myDate =
      moment(this.state.selectedDate).format('MM') +
      '/' +
      moment(this.state.selectedDate).format('DD') +
      '/' +
      moment(this.state.selectedDate).format('YYYY')

    let obj1 = {
      Subject: 'CaseAPISIT',
      Origin: 'External', // fixed value
      External_Application_Name__c: 'Member Portal', // fixed value
      Status: 'New', // fixed value
      Type: 'Payment Card Request', // fixed value
      SuppliedEmail: mail,
      Description: `member_name:${this.state.accountType},purpose:${this.state.purposeOfVisit},provider_name:${this.state.providerName},request_date:${myDate}`
    }

    let url = process.env.REACT_APP_BASE_URL + 'v1/memberportal/caseCreation'

    axios
      .post(url, obj1, {
        headers: {
          Authorization: 'Bearer' + ' ' + localStorage.getItem('bearerToken')
        }
      })
      .then(response => {
        console.log('requestObject====', response)
        if (response.data.success == 'true' || response.data.success == true) {
          this.setState({ successModal: true, open: false, loader: false, MsgModal: 'Request send successfully!' })
        } else {
          this.setState({ successModal: true, open: false, loader: false, MsgModal: response.data.errors })
        }
        // this.setState({errorModal:true,open:false,loader:false,MsgModal:'Request send successfully!'})
      })
  }

  changePaymentMode = () => {}

  handleCloseErrorModal = () => {
    /*this.getAccountNumber()*/
    this.setState({ errorModal: false })
  }

  handleCloseSuccessModal = () => {
    this.setState({ successModal: false })
    this.goBack()
  }

  goBack = () => {
    this.props.history.push('/MyPaymentWalletMobile')
  }

  render() {
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
      <div style={{ backgroundColor: '#ffffff' }}>
        {this.state.loader ? <CommonLoader /> : null}

        {/* <MobileHeader name="Change Payment Method" /> */}

        <div className="mobileHeaderWrapper">
          <ArrowBackIcon style={{ width: '24px', height: '24px', color: '#ffffff' }} onClick={this.goBack} />
          <div className="mobileHeaderTitle" style={{ fontSize: '5.2vw' }}>
            Request a New Payment Card{' '}
          </div>
        </div>
        <div className="mobileCommonBody">
          <div style={{ padding: '180px 0px', textAlign: 'center' }} className="mobile_data_not_found">
            {/* To send rquest for payment card, call Member Services team at : {localStorage.getItem('CONTACT_NUMBER')} , Monday through Friday 8:00 am to 8:00 pm CST. */}
            {/* We may be able to help you save money by paying your healthcare provider at the time of your scheduled appointment. To request a payment card call Member Services at {localStorage.getItem('CONTACT_NUMBER')}, Monday to Friday 8am to 8pm CST. */}
            We can ease your next visit, by providing you with a payment card that you can use to pay your healthcare provider at the time
            of your scheduled appointment. To request a payment card call Member Services at {localStorage.getItem('CONTACT_NUMBER')},
            Monday to Friday 8am to 8pm CST.
          </div>
        </div>

        {/* <div className="mobileCommonBody">
                    <div style={{padding:'180px 0px',textAlign:'center'}} className="mobile_data_not_found">
                      To change your payment method, call Member Services team at : {localStorage.getItem('CONTACT_NUMBER')} , Monday through Friday 8:00 am to 8:00 pm CST.
                    </div>
                  </div>
              
                  <div className="mobileCommonBody">
                  <p class="send_request_header_text">
                        We can ease your next care visit by scheduling the appointment and help save 
                        money by paying our healthcare provider at the time of your scheduled appointment.
                        Fill in the purpose of your visit and if you have preferred provider you would
                        like to visit.

                          </p>
              
                
             
                      

                      <div className="grid_row1">
            <Grid container style={{marginTop:'20px'}} justify="center"
                alignItems="center">
                    <Grid item xs={10} sm={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} sm={4} style={{marginBottom:'-1%'}}>
						          <Sample setChild={this.changeTextFieldHandler.bind(this)} name={'Member'} reqFlag={true} label={'Member'} value={this.state.accountType} disable={false} style={CustomeCss.textField} length={120}  fieldType={'bank_name'} errMsg={'Enter valid member name'} helperMsg={'Member name required'}  parentDetails={{label : 'Account_Type'}} key={0}></Sample>

                        </Grid>
                        <Grid item xs={12} sm={4} style={{marginBottom:'-1%'}}>
						          <Sample setChild={this.changeTextFieldHandler.bind(this)} name={'Purpose_of_Visit'} reqFlag={true} label={'Purpose of Visit'} value={this.state.purposeOfVisit} disable={false} style={CustomeCss.textField} length={120}  fieldType={'accountName'} errMsg={'Enter valid purpose'} helperMsg={'Purpose of Visit required'}  parentDetails={{label : 'Account_Name'}} key={0}></Sample>

                        </Grid>
                        <Grid item xs={12} md={4} sm={3} style={{marginBottom:'-1%'}}>
						 <div style={{position: 'relative', zIndex: '100'}}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            required
                                            onBlur={()=> {
                                              this.state.birthDtFocus = true;
                                              this.setState({refresh : true});
                                          }}
                                            onMouseOver={() => this.setState({ birthDt: true })}
                                            onMouseLeave={() => this.setState({ birthDt: false })}
                                            autoComplete='off'
                                            margin="none"
                                            id="date-picker-dialog"
                                            label="Preferred Date"
                                            format="MM/dd/yyyy"
                                            error={this.state.dateErr} //&&!this.state.todayDateValid
                                            helperText={this.state.dateErr ? 'Enter valid date' : ''} //this.state.todayDateValid?'Date Required':
                                            value={tomorrow} //this.state.todayDateValid?null:
                                            onFocus={e => e.target.blur()}
                                            onCopy={this.handlerCopy}
                                            onPaste={this.handlerCopy}
                                            inputProps={{ style: { fontSize: '18px', fontFamily: 'Roboto, Arial, Helvetica, sans-serif', paddingLeft: '11px', paddingRight: '10px', marginTop: '11px', '&:focus': { outline: 'none' }, color: !this.state.birthDt ? 'grey' : '#533278' } }}
                                            InputLabelProps={{ style: { paddingLeft: 10, paddingRight: 10, paddingTop: !this.state.selectedDate ? this.state.birthDtFocus ? 12 : 0 : 12, color: !this.state.birthDtFocus ? 'grey' : this.state.birthDt ? '#533278' : 'grey' } }}//|| !this.state.todayDateValid
                                            onChange={this.handleDateChange.bind(this)}
                                            variant="filled"
                                            onMouseEnter={this.handleHover}
                                            TextFieldComponent={CssTextField}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            style={{ width: '100%',zIndex:'2000!important',backgroundColor:'#f4f4f4' }}
                                            minDate={new Date(tomorrow)}
                                        />
                                        <span id='bd' className="preferedDateStyle">{tomorrow == '' || tomorrow == null ?'Select prefered date' : ''}</span>


                                    </MuiPickersUtilsProvider>
                                    </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} style={{marginTop:'1.5%'}}>
                        <Grid item xs={12} md={6} sm={5} style={{marginBottom:'-3%'}} >
                                    <Sample setChild={this.changeTextFieldHandler.bind(this)} name={'Preferred_Healthcare_Provider'} reqFlag={true} label={'Preferred Healthcare Provider'} value={this.state.providerName} disable={false} style={CustomeCss.textField} length={120}  fieldType={'bank_name'} errMsg={'Enter valid healthcare provider'} helperMsg={'Preferred Healthcare Provider required'}  parentDetails={{label : 'bank_name'}} key={0}></Sample>

                        </Grid>
                      


                    </Grid>
                    </Grid>



                </Grid>

                <div className="Bottom-Blue">


               <Grid container>
                   <Grid item xs={6} style={{textAlign:"center"}} >
                           <Button variant="secondary" onClick={this.handleClose} class="ButtonBGMobile" >
                           CANCEL
                           </Button>
                   </Grid>
                   <Grid item xs={6} style={{textAlign:"center"}} >
                           <NextButton variant="contained" color="primary" onClick={this.sendRequest}   disabled={this.state.disabled} >
                           DONE
                           </NextButton>
                   </Grid>
               </Grid>



               </div>

            </div>
              </div> */}

        {/* =================================================== */}

        <div class="fixed-bottom">
          <MobileFooter name="Transaction" />
          {/* <MobileFooter /> */}
        </div>
        <Modal size="lg" show={this.state.open} onHide={this.handleClose} centered>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose} class="ButtonBG">
              CANCEL
            </Button>
            <Button variant="primary" onClick={this.sendRequest} class="ButtonBG">
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
export default SendCardRequest
