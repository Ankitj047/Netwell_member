import DateFnsUtils from '@date-io/date-fns'
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import 'date-fns'
import moment from 'moment'
import React, { Component } from 'react'
import Modal1 from 'react-awesome-modal'
import { Modal } from 'react-bootstrap'
import { getCardEnableData, getNeoTransactionMobile, getPaymentCardData, MobilegetTransactionData } from '../../ApiCall'
import CommonLoader from '../../CommonLoader'
import ChatIcon from '../../WebScreen/ChatBox/ChatIcon'
import MobileHeader from '../MobileHeader'
import MobileFooter from './../MobileFooter'
import CommonDropDwn from './CommonDropDwn'
import PaymentCard from './MobilePaymentCard/PaymentCardFront'
import CustomeCss from './paymentmode.css.js'
import Sample from './sampleTextField'
import SimpleAccordion from './SimpleAccordion'
import customStyle from './stylesheet_UHS'
// import customStyle from '../../../components/healthqn/CSS/stylesheet_UHS'
const NextButton = withStyles(customStyle.viewBtn)(Button)
const NextButton1 = withStyles(customStyle.PayButton)(Button)

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

export default class MyNeedsMobile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      response: [],
      formatedjsonData: null,
      page: 0,
      loader: true,
      loadMoreBtnshow: false,
      notfoundmsg: '',
      tempNotAvailableModal: false,
      selectedDate: null,
      providerName: '',
      purposeOfVisit: '',
      visible: false,
      accountTypes: [],
      pamentData: [],
      visibleCard: false,
      paymentCardData: null,
      successModal: false,
      MsgModal: '',
      disabled: true
    }
  }

  componentDidMount() {
    this.setState({ loader: true })
    // this.getCardEnable()
    // if(localStorage.getItem('SOURCE') === 'NEO'){
    //   this.getNeoTransaction();
    // } else {
    //   this.callapi()
    // }
    this.getPaymentCardData()

    // this.createjson()
  }

  callapi() {
    MobilegetTransactionData(this.state.page).then(res => {
      if (res.data.response.length > 0) {
        if (res.data.response[0].totalRecord > 10) {
          this.setState({ loadMoreBtnshow: true })
        } else {
          this.setState({ loadMoreBtnshow: false })
        }
        this.setState({ response: res.data.response, page: this.state.page + 1, loader: false })
      } else {
        this.setState({ notfoundmsg: 'My Transactions Data Not Available', loader: false })
      }
      this.createjson()
    })
  }

  getNeoTransaction = () => {
    getNeoTransactionMobile(this.state.page).then(res => {
      if (res.data.totalrecords > 0) {
        this.setState({ response: res.data.pageList, page: this.state.page + 1, loader: false })
      } else {
        this.setState({ notfoundmsg: 'My Transactions Data Not Available', loader: false })
      }
      if (res.data.totalrecords > 10) {
        this.setState({ loadMoreBtnshow: true })
      } else {
        this.setState({ loadMoreBtnshow: false })
      }
      this.createjson()
    })
  }

  getCardEnable = () => {
    let client_id = localStorage.getItem('CLIENT_ID')

    getCardEnableData(client_id, 'MyTransaction').then(res => {
      console.log('getCardEnableData=====', res.data.response.enable)

      if (res.data.response.enable == 'true' || res.data.response.enable == true) {
        this.setState({ tempNotAvailableModal: true })
      }
    })
  }

  callapiLoadmore() {
    this.setState({ loader: true })
    if (localStorage.getItem('SOURCE') === 'NEO') {
      getNeoTransactionMobile(this.state.page).then(res => {
        var resnew = res.data.pageList
        var data = this.state.response
        var newdata = data.concat(resnew)

        this.setState({ response: newdata, page: this.state.page + 1, loader: false })
        if (res.data.totalrecords === newdata.length) {
          this.setState({ loadMoreBtnshow: false })
        } else {
          this.setState({ loadMoreBtnshow: true })
        }
        this.createjson()
      })
    } else {
      MobilegetTransactionData(this.state.page).then(res => {
        var resnew = res.data.response
        var data = this.state.response
        var newdata = data.concat(resnew)

        if (res.data.response[0].totalRecord === newdata.length) {
          this.setState({ loadMoreBtnshow: false })
        } else {
          this.setState({ loadMoreBtnshow: true })
        }

        this.setState({ response: newdata, loader: false, page: this.state.page + 1 })
        this.createjson()
      })
    }
  }

  getPaymentCardData = () => {
    let request
    // request={
    //   "memberNumber":"12345"
    // }
    request = {
      // dyanamic EMPID from idcard API..........
      memberNumber: localStorage.getItem('Member_EMPID')
    }

    // request={
    //   "memberNumber":"CHO772020 " //Non-Neo it should be CHO772020 Channelname+6 digit
    // }
    getPaymentCardData(request)
      .then(res => {
        console.log('getPaymentCardData====', res)
        if (res && res.data.length > 0) {
          let firstName = res.data.map(obj => {
            return obj.memberFirstName
          })
          let lastName = res.data.map(obj => {
            return obj.memberLastName
          })
          let fullName = firstName + ' ' + lastName
          this.state.accountTypes.push(fullName)
          this.setState({ pamentData: res.data, loader: false }, () => this.createjson())
        } else {
          this.setState({
            notfoundmsg:
              'There are no payment cards approved for your account. Submitted payment card requests, if any, may take 2-3 days to be processed. For any clarifications or to request for a payment card, call Customer Service.',
            loader: false
          })
        }
      })
      .catch(error => {
        console.error('Error during service worker registration namita:', error.message)
        this.setState({
          notfoundmsg:
            'There are no payment cards approved for your account. Submitted payment card requests, if any, may take 2-3 days to be processed. For any clarifications or to request for a payment card, call Customer Service.',
          loader: false
        })
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
        // if(this.state.MsgModalerror!=''){
        //  let evt = new CustomEvent('errorCode',{detail:{flag:true}});
        //   window.dispatchEvent(evt);
        // }
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
    this.validateForm()
    this.setState(
      {
        refresh: true
      },
      () => this.validateForm()
    )
  }

  validateForm = () => {
    if (
      this.state.providerName !== '' &&
      this.state.purposeOfVisit !== '' &&
      this.state.accountType !== '' &&
      this.state.selectedDate !== null
    ) {
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
        selectedDate: date
      },
      () => {
        let panel = document.getElementById('date-picker-dialog')
        panel.addEventListener('onmouseleave', function() {
          document.getElementById('date-picker-dialog-label').style.paddingTop = '10px'
        })
      }
    )
  }
  onCloseTempModal = () => {
    this.setState({ tempNotAvailableModal: false })
    window.location.href = '/'
  }
  createjson() {
    // var newobject = {};
    var formatredjson = []
    this.state.pamentData.map((item, i) => {
      // console.log("crate json call=============",item.transactionId)
      var newobject = {}
      newobject.cardIDNumber = 'Card ID'
      newobject.cardIDNumberVal = item.cardIDNumber ? item.cardIDNumber : 'NA'

      newobject.Scheduledfor = 'Activation Date'
      newobject.ScheduledforVal = item.cardActivationDate ? item.cardActivationDate : 'NA'

      newobject.statusClass = item.cardStatus ? item.cardStatus : item.cardStatus
      newobject.status = item.cardStatus ? item.cardStatus : 'NA'

      newobject.Expireson = 'Expires on'
      newobject.ExpiresonVal = item.expirationDate ? item.expirationDate : 'NA'

      newobject.Member = 'Member'
      newobject.MemberVal = item.memberFirstName || item.memberLastName ? item.memberFirstName + item.memberLastName : 'NA'

      newobject.Provider = 'Provider'
      newobject.ProviderVal = item.providerName ? item.providerName : 'NA'

      newobject.AmountAuthorized = 'Amount Authorized'
      newobject.AmountAuthorizedVal = item.amountAuthorized ? item.amountAuthorized : '0'

      newobject.panNumber = item.panNumber ? item.panNumber : 'NA'
      newobject.cvv = item.cvv ? item.cvv : 'NA'
      newobject.expirationDate = item.expirationDate ? item.expirationDate : 'NA'
      newobject.memberFirstName = item.memberFirstName ? item.memberFirstName : 'NA'
      newobject.memberLastName = item.memberLastName ? item.memberLastName : 'NA'
      newobject.procedureInformation = item.procedureInformation ? item.procedureInformation : 'NA'
      newobject.providerAddress1 =
        item.providerAddress1 || item.providerAddress2 !== null
          ? item.providerAddress1 + ',' + item.providerCity + ',' + item.providerState + ' ' + item.providerPostalCode
          : 'NA'
      newobject.amountAuthorized = item.amountAuthorized ? item.amountAuthorized : 'NA'
      newobject.providerName = item.providerName ? item.providerName : 'NA'

      newobject.AmountAuthorizedVal = item.amountAuthorized ? item.amountAuthorized : '0'

      /*if(item.transactionAmount || item.transaction_amount){
          newobject.ChargedLabel= "Total Amount";
          newobject.ChargedVal= item.transactionAmount ? item.transactionAmount : item.transaction_amount;
        }else{
          newobject.ChargedLabel= "Total Amount";
          newobject.ChargedVal= "NA";
        }*/
      newobject.PaidLabel = ''
      newobject.PaidVal = ''

      var innerobject = {
        MemberLabel: 'Procedure Information',
        MemberVal: item.procedureInformation ? item.procedureInformation : 'NA',

        PaidDateLabel: 'Provider Address',
        PaidDateVal: item.providerAddress1
          ? item.providerAddress1 + ',' + item.providerCity + ',' + item.providerState + ' ' + item.providerPostalCode
          : 'NA',

        RepricingDiscountLabel: 'Card Request Date',
        RepricingDiscountVal: item.cardRequestDate ? item.cardRequestDate : 'NA'
      }

      console.log('=====formated json state os=============', newobject)

      newobject.MoreDetail = innerobject
      // console.log("New Object is=============",newobject)

      formatredjson = formatredjson.concat(newobject)
    })

    this.setState({ formatedjsonData: formatredjson })
  }

  gotoPayement() {
    this.props.history.push('/SendCardRequest')
    // this.setState({open:true})
  }
  handleClose = () => {
    this.setState({ open: false })
  }

  sendRequest = () => {
    let requestObject = {
      member_name: this.state.accountType,
      purpose_of_visit: this.state.purposeOfVisit,
      provider_name: this.state.providerName,
      request_date: this.state.selectedDate
    }
    console.log('requestObject====', requestObject)
    this.setState({ successModal: true, open: false, loader: false, MsgModal: 'Request send successfully!' })
    /*   let mail = localStorage.getItem('userMail')
      let myDate= moment(this.state.selectedDate).format('MM') + '/' + moment(this.state.selectedDate).format('DD') + '/' + moment(this.state.selectedDate).format('YYYY')
      let obj1={"Subject":"CaseAPISIT",
       "Origin":"Payment System",
       "External_Application_Name__c":"Member Portal",
       "Status":"New",
       "Type":"Payment Card Request",
       "SuppliedEmail":mail,
       "Description":`member_name:${this.state.accountType},purpose:${this.state.purposeOfVisit},provider_name:${this.state.providerName},request_date:${myDate}`}
       
       let url="https://carynhealth--sit.my.salesforce.com/services/data/v45.0/sobjects/Case"
     
       axios.post(url,obj1,  {
         headers : {
           'Authorization': "Bearer"+ this.state.token,
                 
         }})
       .then(response => {
       console.log("requestObject====",response) */
    // if(response.success == 'true' || response.success == true){
    //           this.setState({successModal:true,open:false,loader:false,MsgModal:'Request send successfully!'})

    // }else{
    // this.setState({successModal:true,open:false,loader:false,MsgModal:response.errors})

    // }
    /* this.setState({successModal:true,open:false,loader:false,MsgModal:'Request send successfully!'}) */

    //})
  }
  handleCloseSuccessModal = () => {
    this.setState({
      successModal: false,

      purposeOfVisit: '',
      providerName: '',
      selectedDate: null,
      accountType: ''
    })
  }

  openMasterCard = (rowData, i) => {
    console.log('mobile payment wallet====', rowData)
    this.setState({ visibleCard: true, paymentCardData: rowData })
  }
  render() {
    // var x=this.state.formatedjsonData
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
    const { formatedjsonData } = this.state
    // console.log("====xxxxxxxxxxxxxxxxxx=============",x)
    console.log('=====state formatred json is=============', this.state.formatedjsonData)
    return (
      <div className="">
        {this.state.loader ? <CommonLoader /> : null}

        <MobileHeader name="My Payment Wallet " />

        {/* ------------------------------------------------ */}

        {this.state.formatedjsonData ? (
          <div className="mobileCommonBody">
            <div style={{ marginBottom: '51px' }}>
              <SimpleAccordion data={formatedjsonData} openCard={(row, i) => this.openMasterCard(row, i)} />

              {this.state.loadMoreBtnshow ? (
                <div className="loadMoreWrapper">
                  <button className="loadMoreBtn" onClick={() => this.callapiLoadmore()}>
                    Load More
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {this.state.notfoundmsg ? (
          <div style={{ padding: '180px 0px', textAlign: 'center' }} className="mobile_data_not_found">
            {this.state.notfoundmsg}
          </div>
        ) : null}
        <ChatIcon shiftup={true} openChat={() => console.log('')} />
        <ChatIcon showAIChatIcon={true} />

        {/* ------------------------------------------------ */}
        <div className="Bottom-Blue">
          <Grid container>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button variant="secondary" onClick={() => this.gotoPayement()} class="mytransaction_changepaymentbutton">
                REQUEST PAYMENT CARD
              </Button>
            </Grid>
          </Grid>
        </div>
        <Modal1 visible={this.state.tempNotAvailableModal} effect="fadeInUp">
          <div style={{ width: '80vw', height: '38vw' }}>
            <div className="tempModalTxt">
              We’re facing some technical difficulties, due to which this feature is currently unavailable. For support, call Member
              Services at {localStorage.getItem('CONTACT_NUMBER')}, Monday through Friday, 8.00am to 8.00pm CST.
            </div>

            <div className="mqalert_button_div">
              <NextButton
                variant="contained"
                class="yellow_popup_caption_button"
                onClick={this.onCloseTempModal}
                style={{
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  height: '37px',
                  backgroundColor: '#eb5757',
                  borderRadius: '20px',
                  color: '#fff',
                  fontWeight: 500
                }}
              >
                CLOSE
              </NextButton>
            </div>
          </div>
        </Modal1>

        {/* -------------------request card--------------------------- */}

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
                      <CommonDropDwn
                        setChild={this.changeTextFieldHandler.bind(this)}
                        name={'Member'}
                        label={'Member'}
                        value={this.state.accountType}
                        disable={false}
                        style={customStyle.dropDown}
                        fieldType={'dropDwn'}
                        helperMsg={'Select member'}
                        List={this.state.accountTypes}
                        parentDetails={{ label: 'Account_Type' }}
                      ></CommonDropDwn>
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
                            onMouseOver={() => this.setState({ birthDt: true })}
                            onMouseLeave={() => this.setState({ birthDt: false })}
                            autoComplete="off"
                            margin="none"
                            id="date-picker-dialog"
                            label="Preferred Date"
                            format="MM/dd/yyyy"
                            error={this.state.dateErr} //&&!this.state.todayDateValid
                            helperText={this.state.dateErr ? 'Enter valid date' : ''} //this.state.todayDateValid?'Date Required':
                            value={myDate} //this.state.todayDateValid?null:
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
                                paddingTop: 3,
                                color: !this.state.birthDtFocus ? 'grey' : this.state.birthDt ? '#533278' : 'grey'
                              }
                            }} //|| !this.state.todayDateValid
                            onChange={this.handleDateChange.bind(this)}
                            variant="filled"
                            onMouseEnter={this.handleHover}
                            TextFieldComponent={CssTextField}
                            KeyboardButtonProps={{
                              'aria-label': 'change date'
                            }}
                            style={{ width: '100%', zIndex: '2000!important' }}
                            minDate={new Date(tomorrow)}
                          />
                          {/* <span id='bd' style={customStyle.EnrollNew2Span}></span> */}
                          <span id="bd" className="preferedDateStyle">
                            {this.state.selectedDate == '' || this.state.selectedDate == null ? 'Select prefered date' : ''}
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
            {/* <Button variant="secondary" onClick={this.handleClose} style={{marginRight:'15px'}} class="ButtonBG">
                          CANCEL
                        </Button>
                        <Button variant="secondary" disabled={this.state.disabled}  class="ButtonBG" onClick={this.changePaymentMode} >
                          DONE
                        </Button> */}

            <Button variant="secondary" onClick={this.handleClose} class="ButtonBG">
              CANCEL
            </Button>
            <NextButton1 variant="contained" onClick={this.sendRequest} color="primary" disabled={this.state.disabled}>
              DONE
            </NextButton1>
          </Modal.Footer>
        </Modal>

        <Modal className="paymentCardModal" show={this.state.visibleCard} onHide={() => this.setState({ visibleCard: false })} centered>
          <Modal.Body style={{ padding: '0px' }}>
            <PaymentCard paymentData={this.state.paymentCardData} />
          </Modal.Body>
        </Modal>

        <div class="fixed-bottom">
          <MobileFooter />
        </div>
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
