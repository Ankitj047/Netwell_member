import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Radio from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CloseIcon from '@material-ui/icons/Close'
import ForumIcon from '@material-ui/icons/Forum'
import moment from 'moment'
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import {
  createCase,
  getAccountNumber,
  getEnrollMemberInfoById,
  getMemberPlanData,
  getNeoTransaction,
  getPaymentType,
  getRecurringDateData,
  getSourceCode,
  getTransactionData,
  storeTransaction
} from '../../ApiCall'
import CommonLoader from '../../CommonLoader'
import RadioChecked from '../../Images/radioButtonChecked.png'
import RadioUnchecked from '../../Images/radioButtonUnchecked.png'
import CommonFooter from '../CommonFooter'
import Header from '../Header'
import CommonDropDwn from './CommonDropDwn'
import CustomeCss from './paymentmode.css.js'
import Sample from './sampleTextField'
import customStyle from './stylesheet_UHS'
import './Transaction.css'
import TransactionDataTable from './TransactionDataTable'

const CrudButton = withStyles(customStyle.crudBtn)(Fab)

const AntTabs = withStyles(customStyle.tabs)(Tabs)

const AntTab = withStyles(theme => customStyle.tab)(props => <Tab disableRipple {...props} />)

const NextButton = withStyles(customStyle.PayButton)(Button)

const PurpleRadio = withStyles(customStyle.radioBtn)(props => <Radio color="default" {...props} />)

const getPaymentPopUp = () => {
  return window.location.href.includes('payment') ? true : false
}
const getDraftDayPopUp = () => {
  return window.location.href.includes('billing') ? true : false
}

export default class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      disabled: true,
      tableData: [],
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
      payType: '',
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

      draftDayModal: false,
      nextRecurringDate: '',
      draftDaySelected: '',
      memberPlanInfo: '',
      effectivePaymentDate: '',
      firstPaymentDate: '',
      firstPaymentAmount: '',
      todayDate: '',
      initialApplicationFee: '',
      STATE_PARAM: JSON.parse(sessionStorage.getItem('STATE_PARAM')),
      subsequentPaymentDate: '',
      beforeEffectiveDate: null,
      effectiveDateModal: false,
      beforeEffectiveDateFlag: false,
      paymentData: [],
      paymentType: ''
    }
  }

  billingPopUp = async () => {
    await this.getTransactionData()
    await this.getAccountNumber()
    await this.getSourceCodeFun()
    await this.getPaymentData()
    await this.openDraftDayModal()
  }

  componentDidMount() {
    this.setState({ loader: true })

    if (getDraftDayPopUp()) {
      this.billingPopUp()
    }
    if (getPaymentPopUp()) {
      this.handleClickOpen()
    }
    if (localStorage.getItem('SOURCE') === 'NEO') {
      this.getNeoTransactionData()
    } else {
      this.getTransactionData()
      this.getAccountNumber()
      this.getSourceCodeFun()
      this.getPaymentData()
    }
  }
  jumpToPayment() {
    let url = window.location.href
    if (url.split('Transaction?').length > 1) {
      let queryString = url.split('Transaction?')[1]
      let queryParams = new URLSearchParams(queryString)
      let change_payment = decodeURI(queryParams.get('change_payment'))
      if (change_payment === 'true') {
        this.handleClickOpen()
      }
      this.props.history.replace('/Transaction')
    }
  }
  getNeoTransactionData = () => {
    getNeoTransaction().then(res => {
      if (res.data.totalrecords > 0) {
        this.setState({ tableData: res.data.pageList, loader: false })
      } else {
        this.setState({ notfoundmsg: 'My Transactions Data Not Available', loader: false })
      }
      this.jumpToPayment()
    })
  }

  getSourceCodeFun = () => {
    getSourceCode()
      .then(res => {
        if (res && res.data) {
          this.setState(
            {
              sourceCode: res.data.memberIdSource,
              empid: res.data.empId,
              accountTypes: ['CHECKING', 'SAVINGS'],
              loader: false
            },
            () => {
              this.getEnrollMember(res.data.memberIdSource)
              this.getPayType(res.data.memberIdSource)
            }
          )
        } else {
          this.setState(
            {
              sourceCode: res.data.memberIdSource,
              empid: res.data.empId,
              accountTypes: ['CHECKING', 'SAVINGS'],
              loader: false
            },
            () => {
              this.getEnrollMember(res.data.memberIdSource)
              this.getPayType(res.data.memberIdSource)
            }
          )
        }
      })
      .catch()
  }

  getTransactionData = () => {
    getTransactionData().then(res => {
      if (res.data.response.length > 0) {
        this.setState({ tableData: res.data.response, loader: false }, () => {
          let type = this.state.tableData.map(val => {
            return val.type
          })

          this.setState({ payType: type })
        })
      } else {
        this.setState({ notfoundmsg: 'My Transactions Data Not Available', loader: false })
      }
    })
  }

  getAccountNumber = () => {
    getAccountNumber().then(res => {
      if (res.data.code === 200) {
        this.setState({ accountNo: res.data.response.replaceAll('*', 'X'), loader: false })
      } else if (res.data.code === 202) {
        let x = JSON.parse(res.data.response).error_message
        let errMsg = ''
        if (x.includes('-')) {
          let cds = x.split(' - ')
          errMsg = cds[1]
        } else {
          errMsg = x
        }
        if (this.state.activeTab === 0) {
          this.setState({
            accountNo: '',
            MsgModalerrorFooterACH: errMsg
          })
        } else {
          this.setState({
            accountNo: '',
            MsgModalerrorFooterCC: errMsg
          })
        }
      } else {
        this.setState({ accountNo: '' })
      }
      this.jumpToPayment()
    })
  }

  handleClose = () => {
    this.setState(
      {
        open: false,
        bankName: '',
        accountName: this.state.accountName,
        accountNumber: '',
        accountType: '',
        routingNo: '',

        cardNumber: '',
        holderName: this.state.holderName,
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        payType: '',
        MsgModalerror: '',
        errCodeACH: false,
        errCodeCC: false,
        MsgModalerrorFooterACH: '',
        MsgModalerrorFooterCC: ''
      },
      () => this.validateForm()
    )
  }

  handleClickOpen = () => {
    this.setState({ open: true })
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
    if (this.state.activeTab === 0) {
      if (
        this.state.bankName !== '' &&
        this.state.accountName !== '' &&
        this.state.accountNumber !== '' &&
        this.state.accountType !== '' &&
        this.state.routingNo !== ''
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
      this.setState({ activeTab: 0, errCodeACH: this.state.errCodeACH })
      this.setState({ tabFirstIcon: RadioChecked })
      this.setState({ tabSecondIcon: RadioUnchecked })
    } else {
      this.setState({ activeTab: 1 })
      this.setState({ tabFirstIcon: RadioUnchecked })
      this.setState({ tabSecondIcon: RadioChecked })
    }
  }

  handleChangeRadio = event => {
    this.setState({ selectedValue: event.target.value })
  }

  getPaymentData = async () => {
    return getRecurringDateData()
      .then(res => {
        if (res && res.data) {
          this.setState({
            paymentData: res.data.response
          }, () => console.log("::::::::::::::::: paymentData",this.state.paymentData))
        }
      })
      .catch()
  }

  getPayType = empid => {
    getPaymentType(empid)
      .then(res => {
        if (res && res.data) {
          this.setState({
            memberDetails: res.data.response,
            paymentType: res.data.response.type
          })
        }
      })
      .catch()
  }

  changePaymentMode = () => {
    this.setState({ loader: true, MsgModalerror: '' })

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

    storeTransaction(obj).then(res => {
      if (res.data.code == 200) {
        if (this.state.activeTab == 0) {
          this.setState({
            open: false,
            loader: true
          })
        }
        if (this.state.activeTab == 0) {
          this.setState({
            open: false,
            loader: true
          })
        }

        this.setState({ errorModal: true, open: false, loader: false, MsgModal: 'Updated payment details successfully!' }, () => {
          this.getSourceCodeFun()
        })
      } else if (res.data.code == 202) {
        let x = JSON.parse(res.data.response).error_message
        let errMsg = ''
        if (x.includes('-')) {
          let cds = x.split(' - ')
          errMsg = cds[1]
        } else {
          errMsg = x
        }
        this.setState({ MsgModalerror: errMsg, loader: false, errCodeACH: true })

        if (this.state.activeTab == 0 && this.state.MsgModalerror != '') {
          this.setState({
            errCodeACH: true,
            cvv: '',
            cardNumber: '',
            errCodeCC: false,
            expiryMonth: '',
            expiryYear: '',
            reqFlag: false
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
            errCodeACH: false
          })

          let evt = new CustomEvent('errorCode', { detail: { flag: true } })
          window.dispatchEvent(evt)
        }
      } else if (res.data.code == 204) {
        if (this.state.activeTab == 0) {
          this.setState({
            MsgModalerrorFooterACH: 'Source is not registered',
            loader: false,
            MsgModalerrorFooterCC: '',
            cvv: '',
            cardNumber: '',
            errCodeCC: false,
            expiryMonth: '',
            expiryYear: ''
          })
        } else {
          this.setState({
            MsgModalerrorFooterCC: 'Source is not registered',
            loader: false,
            MsgModalerrorFooterACH: '',
            bankName: '',
            accountNumber: '',
            accountType: '',
            routingNo: ''
          })
        }
      } else if (res.data.code == 500) {
        if (this.state.activeTab == 0) {
          this.setState({
            MsgModalerrorFooterACH: 'Internal server error',
            loader: false,
            MsgModalerrorFooterCC: '',
            cvv: '',
            cardNumber: '',
            errCodeCC: false,
            expiryMonth: '',
            expiryYear: ''
          })
        } else {
          this.setState({
            MsgModalerrorFooterCC: 'Internal server error',
            loader: false,
            MsgModalerrorFooterACH: '',
            bankName: '',
            accountNumber: '',
            accountType: '',
            routingNo: ''
          })
        }
      } else {
        let x = JSON.parse(res.data.response).error_message
        let cds = x.split(' - ')
        if (this.state.activeTab == 0) {
          this.setState({
            MsgModalerrorFooterACH: cds[1],
            loader: false,
            cvv: '',
            cardNumber: '',
            errCodeCC: false,
            expiryMonth: '',
            expiryYear: ''
          })
        } else {
          this.setState({ MsgModalerrorFooterCC: cds[1], loader: false, bankName: '', accountNumber: '', accountType: '', routingNo: '' })
        }
      }
    })
  }

  handleCloseErrorModal = () => {
    this.getAccountNumber()
    this.setState({
      errorModal: false,

      bankName: '',
      accountName: this.state.accountName,
      accountNumber: '',
      accountType: '',
      routingNo: '',

      cardNumber: '',
      holderName: this.state.holderName,
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      payType: '',
      MsgModalerror: '',
      errCodeACH: false,
      errCodeCC: false
    })
  }

  getEnrollMember = memberId => {
    getEnrollMemberInfoById(memberId).then(response => {
      if (response && response.data.response) {
        this.setState({ subID: response.data.response.subId, loader: false }, () => {
          getMemberPlanData(response.data.response.subId).then(res => {
            if (res && res.data.response) {
              this.setState({
                loader: false,
                memberPlanInfo: res.data.response
              })
            } else {
              this.setState({ loader: false })
            }
          })
        })
      } else {
        this.setState({ loader: false })
      }
    })
  }

  openDraftDayModal = () => {
    this.setState({
      loaderShow: true,
      open: false,
      effectiveDateModal: false,
      draftDayModal: true
    })

    var tDate = new Date()

    var getFirstPaymentAmount = this.state.paymentData.paymentAmount
    if (getFirstPaymentAmount != undefined) {
      getFirstPaymentAmount = '$' + Number(getFirstPaymentAmount).toFixed(2)
    } else {
      getFirstPaymentAmount = '$0'
    }

    this.setState({
      loaderShow: false,
      firstPaymentAmount: getFirstPaymentAmount,
      todayDate: moment(tDate).format('dddd, MMMM Do, YYYY'),
      initialApplicationFee: '$75'
    })
  }

  answerChangeHandler = (event, name, optionId) => {
    if (name === 'radio') {
      var paymentDate = this.state.beforeEffectiveDateFlag
        ? moment(this.state.beforeEffectiveDate)
            .subtract(event.target.value, 'days')
            .format('MM-DD-YYYY')
        : moment(this.state.memberPlanInfo.targetDate)
            .subtract(event.target.value, 'days')
            .format('MM-DD-YYYY')
      var getSubsequentPaymentDate = this.state.beforeEffectiveDateFlag
        ? moment(this.state.beforeEffectiveDate)
            .subtract(event.target.value, 'days')
            .format('MM-DD-YYYY')
        : moment(this.state.memberPlanInfo.targetDate)
            .subtract(event.target.value, 'days')
            .format('MM-DD-YYYY')

      var varDate = new Date(paymentDate)
      var today = new Date()

      if (varDate >= today) {
        console.log('future date')
      } else {
        console.log('past date')
        paymentDate = today
      }
      this.setState({
        draftDaySelected: event.target.value,
        effectivePaymentDate: moment(this.state.memberPlanInfo.targetDate).format('dddd, MMMM Do, YYYY'),
        firstPaymentDate: moment(paymentDate).format('dddd, MMMM Do, YYYY'),
        subsequentPaymentDate: getSubsequentPaymentDate
      })
    }
  }

  updateDraftDay = () => {
    this.setState({ loader: true })
    createCase().then(res => {
      if (res && res?.data?.success) {
        this.setState({
          errorModal: true,
          open: false,
          draftDayModal: false,
          loader: false,
          draftDayModal: false,
          MsgModal: 'Your request has been submitted.'
        })
      } else {
        this.setState({
          errorModal: true,
          open: false,
          loader: false,
          draftDayModal: false,
          MsgModal: `We could not process your request. Please contact our Member Services team at 1 (888) 366 6243, Monday through Friday 7:00 am to 6:00 pm CST or email at customerservice@universalhealthfellowship.org.`
        })
      }
    })
    // this.setState({
    //   loader: true,
    //   open: false
    // })
  }

  handleCloseDraftDayModal = () => {
    this.setState({
      loaderShow: false,
      open: false,
      draftDayModal: false,
      draftDaySelected: ''
    })
  }

  goBack = () => {
    this.props.history.push('/')
  }

  getRecurringDate = () => {
    if (this.state.paymentData.recurringDate) {
      return `Your next billing date: <b>${moment(this.state.paymentData.recurringDate).format('dddd, MMMM Do, YYYY')}</b>`
    } else {
      return ''
    }
  }
  getRecurringDay = (myDate) => {
    if (this.state.paymentData.recurringDate) {
      let date = new Date()
      let dateDay = date.getDate()
      let dateMonth = date.getMonth()
      let dateYear = date.getFullYear()
      if (parseInt(moment(this.state.paymentData.recurringDate).date()) < dateDay) {
        if (dateMonth === 12) {
          dateYear += 1
          dateMonth = 1
        } else {
          dateMonth += 1
        }
        dateDay = moment(this.state.paymentData.recurringDate).date()
      }
      return `${dateMonth + 1}/${dateDay}/${dateYear}`
    } else {
      return ''
    }
  }
  render() {
    const { classes } = this.props

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
                    name={'AccountType'}
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
                <Grid item xs={12} sm={6} style={{ marginBottom: '-2%' }}>
                  {this.state.MsgModalerror != '' ? (
                    <Sample
                      setChild={this.changeTextFieldHandler.bind(this)}
                      name={'Routing_Number'}
                      MsgModalerror={this.state.MsgModalerror}
                      ErrCode={this.state.errCodeACH}
                      reqFlag={true}
                      label={'Routing Number'}
                      value={this.state.routingNo}
                      disable={false}
                      style={CustomeCss.textField}
                      length={9}
                      fieldType={'routingNo'}
                      errMsg={'Enter valid routing number'}
                      helperMsg={this.state.MsgModalerror}
                      parentDetails={{ label: 'Routing_Number' }}
                      key={0}
                    ></Sample>
                  ) : (
                    <Sample
                      setChild={this.changeTextFieldHandler.bind(this)}
                      name={'Routing_Number'}
                      MsgModalerror={this.state.MsgModalerror}
                      ErrCode={this.state.errCodeACH}
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
                  )}{' '}
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
                    length={26}
                    fieldType={'accountNumber'}
                    errMsg={'Account number must be 4 and up to 26 digits'}
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
                  {this.state.MsgModalerror != '' ? (
                    <Sample
                      setChild={this.changeTextFieldHandler.bind(this)}
                      name={'Card_Number'}
                      MsgModalerror={this.state.MsgModalerror}
                      ErrCode={this.state.errCodeCC}
                      reqFlag={this.state.reqFlag}
                      label={'Card Number'}
                      value={this.state.cardNumber}
                      disable={false}
                      style={CustomeCss.textField}
                      length={16}
                      fieldType={'cardNumber'}
                      errMsg={'Card number up to 16 digits'}
                      helperMsg={this.state.MsgModalerror}
                      parentDetails={{ label: 'Card_Number' }}
                    ></Sample>
                  ) : (
                    <Sample
                      setChild={this.changeTextFieldHandler.bind(this)}
                      name={'Card_Number'}
                      MsgModalerror={this.state.MsgModalerror}
                      ErrCode={this.state.errCodeCC}
                      reqFlag={this.state.reqFlag}
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
              <span className="progInfoTitle">MY TRANSACTIONS</span>
            </div>

            <div className="tablebackgroundouter">
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {this.state.tableData && this.state.tableData.length > 0 ? (
                  <div style={{ width: '78%' }}>
                    <TransactionDataTable tableData={this.state.tableData} />
                  </div>
                ) : (
                  <div className="data_not_found" style={{ width: '78%' }}>
                    <h5 class="noneeds_msg_display">{this.state.notfoundmsg}</h5>
                  </div>
                )}
                {this.paymentInformationScreen()}
              </div>
            </div>

            <div className="progInfoFooter">
              <div className="row">
                <div className="col-md-6">
                  {/* <button
                    type="button"
                    onClick={this.handleClickOpen}
                    className="blueActionBtn border-0 mr-2 text-uppercase"
                    style={{ marginTop: '10px' }}
                  >
                    Change Payment Method
                  </button>

                  <button
                    type="button"
                    onClick={this.openDraftDayModal}
                    className="blueActionBtn border-0 mr-2 text-uppercase"
                    style={{ marginTop: '10px' }}
                  >
                    Change Billing Date
                  </button> */}
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

        <Modal size="lg" show={this.state.open} onHide={this.handleClose} centered className="ChangPayModal" backdrop="static">
          {localStorage.getItem('SOURCE') === 'NEO' ? (
            <Modal.Body>
              <Grid container direction="row" justify="space-between" alignItems="flex-start">
                <span style={{ textAlign: 'center', fontSize: '17px', fontWeight: 'bold' }}>
                  To change your payment method, call Member Services team at : {localStorage.getItem('CONTACT_NUMBER')} , Monday through
                  Friday 8:00 am to 8:00 pm CST.
                </span>
              </Grid>
            </Modal.Body>
          ) : (
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
              <Grid container direction="row" justify="flex-end" alignItems="flex-end">
                <Grid item xs={12} sm={3} md={4}>
                  <table className="Last_4_digit">
                    <td className="td_style1">Account Number currently on file</td>
                    <td className="td_style" style={{ verticalAlign: 'middle' }}>
                      {/* XXXXXX4567 */}
                      {this.state.accountNo}
                    </td>
                  </table>
                </Grid>
              </Grid>
              {currentScreen}
            </Modal.Body>
          )}

          <Modal.Footer>
            {localStorage.getItem('SOURCE') === 'NEO' ? (
              <Button variant="secondary" onClick={this.handleClose} style={{ marginRight: '15px' }} class="ButtonBG">
                OK
              </Button>
            ) : (
              <>
                {this.state.activeTab === 0 ? (
                  <span className="Footer-error-msg" style={{ width: '500px' }}>
                    {this.state.MsgModalerrorFooterACH}
                  </span>
                ) : (
                  <span className="Footer-error-msg" style={{ width: '500px' }}>
                    {this.state.MsgModalerrorFooterCC}
                  </span>
                )}
                <Button variant="secondary" onClick={this.handleClose} style={{ marginRight: '15px' }} class="ButtonBG">
                  CANCEL
                </Button>
                {/* onClick={this.changePaymentMode} */}
                <NextButton
                  variant="contained"
                  disabled={this.state.activeTab == 0 ? this.state.disabled : this.state.disabled2}
                  color="primary"
                  onClick={this.changePaymentMode}
                >
                  DONE
                </NextButton>
              </>
            )}
          </Modal.Footer>
        </Modal>

        {/*------------------Draft day modal-------------------------------------------  */}

        <Modal size="small" show={this.state.draftDayModal} onHide={this.handleCloseDraftDayModal} centered backdrop="static">
          <Modal.Header>
            <Modal.Title>Message</Modal.Title>
            <IconButton aria-label="close" onClick={this.handleCloseDraftDayModal} style={{ marginTop: '-13px' }}>
              <CloseIcon />
            </IconButton>
          </Modal.Header>

          <Modal.Body>
            {this.state.loader ? <CommonLoader /> : null}
            <span style={{ fontSize: '16px', fontWeight: '500' }}>
            You can submit a request to change your billing date. Our Member Services team will get in touch with you at the earliest and guide you through the process.
            </span>
          </Modal.Body>

          <Modal.Footer style={{ justifyContent: 'center' }}>
            <Button variant="secondary" onClick={this.updateDraftDay} class="ButtonBG">
              PROCEED
            </Button>
            <Button variant="secondary" onClick={this.handleCloseDraftDayModal} class="ButtonBG">
              CANCEL
            </Button>
          </Modal.Footer>
        </Modal>

        {/* <Modal
          size="lg"
          show={this.state.draftDayModal}
          onHide={this.handleCloseDraftDayModal}
          centered
          className="ChangPayModal"
          backdrop="static"
        >
          {localStorage.getItem('SOURCE') === 'NEO' ? (
            <Modal.Body>
              <Grid container direction="row" justify="space-between" alignItems="flex-start">
                <span style={{ textAlign: 'center', fontSize: '17px', fontWeight: 'bold' }}>
                  To change your payment method, call Member Services team at : {localStorage.getItem('CONTACT_NUMBER')} , Monday through
                  Friday 8:00 am to 8:00 pm CST.
                </span>
              </Grid>
            </Modal.Body>
          ) : (
            <Modal.Body>
              <Grid container direction="row" justify="space-between" alignItems="flex-start">
                <span class="Change-Payment-Method" style={{ paddingLeft: 5 }}>
                  Choose When You Want to be Charged
                </span>
                <IconButton aria-label="close" onClick={this.handleCloseDraftDayModal} style={{ marginTop: '-13px' }}>
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} style={{ marginBottom: 10 }}>
                  <p
                    class="yournextpayment"
                    style={{ marginLeft: 5, paddingTop: '10px' }}
                    dangerouslySetInnerHTML={{ __html: this.getRecurringDate() }}
                  >
                    {}
                  </p>
                  <p class="The-fellowship-incurs-additional-fees-related-to-p" style={{ marginLeft: '5px' }}>
                    You can submit a request to change your billing date. Our Member Services team will get in touch with you at the
                    earliest and guide you through the process.
                  </p>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginLeft: '-5px' }}>
                <Grid item xs={12} sm={12}>
                </Grid>
              </Grid>

              <div style={{ padding: '15px 0 0 0', marginLeft: '2px', fontFamily: 'Roboto', fontWeight: '400' }}>
                {this.state.draftDaySelected ? (
                  <div>
                    <div className="row effectiveDateSectionWeb">
                      <div className="col-5">Program Effective Date</div>
                      <div className="col-2"></div>
                      <div className="col-5">{this.state.effectivePaymentDate}</div>
                    </div>

                    <div className="paymentDatesWrapper">
                      <div className="row recurringDateSection">
                        <div className="col-5">Recurring Monthly Payment</div>
                        <div className="col-2">
                          {this.state.firstPaymentAmount}
                          {this.state.paymentType == 'Credit Card' ? <span>&#42;</span> : null}
                        </div>
                        <div className="col-5">
                          {this.state.subsequentPaymentDate} <sup>+</sup>
                        </div>
                      </div>
                      You can submit a request to change your billing date. Our Member Services team will get in touch with you at the
                      earliest and guide you through the process.
                    </div>
                  </div>
                ) : null}
              </div>
            </Modal.Body>
          )}

          <Modal.Footer>
            {localStorage.getItem('SOURCE') === 'NEO' ? (
              <Button variant="secondary" onClick={this.handleClose} style={{ marginRight: '15px' }} class="ButtonBG">
                OK
              </Button>
            ) : (
              <>
                <Button variant="secondary" onClick={this.handleCloseDraftDayModal} style={{ marginRight: '15px' }} class="ButtonBG">
                  CANCEL
                </Button>
                <NextButton
                  variant="contained"
                  color="primary"
                  onClick={() => this.updateDraftDay()}
                >
                  PROCEED
                </NextButton>
              </>
            )}
          </Modal.Footer>
        </Modal> */}

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

        <CommonFooter />
      </div>
    )
  }
  paymentInformationScreen = () => {
    return  (
      <div class="paymentBlock">
        <span className="PaymentInfoTitle"> Payment Information</span>
        <div style={{ marginTop: '20px' }}>
          <div>
            <span class="TitleCurrentPaymentMethod">Current Payment Method</span>
            <br />
            <span class="numberPaymentMethod">{this.state.paymentType == 'Credit Card' ? 'Credit Card' : 'ACH'}</span>
          </div>
          <div style={{ marginTop: '63px' }}>
            <table className="Last_4_digit">
              <td className="td_style1">Account Number currently on file</td>
              <td className="td_style" style={{ verticalAlign: 'middle' }}>
                {this.state.loader ? null :this.state.accountNo}
              </td>
            </table>
          </div>
          <div style={{ paddingTop: '10px' }}>
            <button type="button" onClick={this.handleClickOpen} className="newblueActionBtn border-0 mr-2 text-uppercase">
              Change Payment Method
            </button>
          </div>
          <hr />
          <div>
            <span class="TitleCurrentPaymentMethod">Next Payment Due Date</span>
            <br />
            <span class="numberPaymentMethod">{this.state.loader ? null : moment(this.state.paymentData.recurringDate).format('MMMM DD, YYYY')}</span>
            <div>
              <button
                type="button"
                onClick={this.openDraftDayModal}
                className="newblueActionBtn border-0 mr-2 text-uppercase"
                style={{ marginTop: '10px' }}
              >
                {' '}
                Change Billing Date
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  openChat = () => {
    sessionStorage.setItem('chatwindow', true)
    this.props.history.push('/')
  }
}
