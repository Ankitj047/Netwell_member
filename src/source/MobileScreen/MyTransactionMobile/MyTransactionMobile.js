import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import moment from 'moment'
import React, { Component } from 'react'
import Modal1 from 'react-awesome-modal'
import { Modal } from 'react-bootstrap'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import customStyle from '../../../components/healthqn/CSS/stylesheet_UHS'
import {
  createCase,
  getAccountNumber,
  getCardEnableData,
  getNeoTransactionMobile,
  getPaymentType,
  getRecurringDateData,
  MobilegetTransactionData
} from '../../ApiCall'
import CommonLoader from '../../CommonLoader'
import ChatIcon from '../../WebScreen/ChatBox/ChatIcon'
import MobCopyright from '../MobCopyright'
import SimpleAccordion from '../MobileCommonComponents/SimpleAccordion'
import MobileHeader from '../MobileHeader'
import MobileFooter from './../MobileFooter'

const NextButton = withStyles(customStyle.viewBtn)(Button)

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
      accountNo: '',
      paymentData: [],
      expanded: 'panel2',
      openChangeBillingModal:false,
      responseText:"",
    }
  }

  componentDidMount() {
    this.setState({ loader: true })
    // this.getCardEnable()
    if (localStorage.getItem('SOURCE') === 'NEO') {
      this.getNeoTransaction()
    } else {
      this.callapi()
    }
    this.getAccountNumber()
    this.getPayType(localStorage.getItem('sourceid'))
    this.getPaymentData()
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
  getAccountNumber = () => {
    getAccountNumber().then(res => {
      if (res.data.code === 200) {
        this.setState({ accountNo: res.data.response.replaceAll('*', 'X'), loader: false })
      }
    })
  }
  getPayType = empid => {
    getPaymentType(empid)
      .then(res => {
        if (res && res.data) {
          this.setState({
            paymentType: res.data.response.type
          })
        }
      })
      .catch()
  }
  getPaymentData = async () => {
    return getRecurringDateData()
      .then(res => {
        if (res && res.data) {
          this.setState(
            {
              paymentData: res.data.response
            },
            () => {
              this.getRecurringDay()
            }
          )
        }
      })
      .catch()
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

  onCloseTempModal = () => {
    this.setState({ tempNotAvailableModal: false })
    window.location.href = '/'
  }
  createjson() {
    // var newobject = {};
    var formatredjson = []
    this.state.response.map((item, i) => {
      // console.log("crate json call=============",item.transactionId)
      var newobject = {}
      newobject.ExpenseNumberLabel = 'Transaction ID'
      newobject.ExpenseNumberVal = item.transactionId ? item.transactionId : item.transaction_id

      newobject.DateOfServiceLabel = 'Transaction Date'
      newobject.DateOfServiceVal = item.createdDate ? item.createdDate : item.transaction_date

      newobject.statusClass = item.authorizationMessage ? item.authorizationMessage : item.authorization_message
      newobject.status = item.authorizationMessage ? item.authorizationMessage : item.authorization_message

      newobject.ProviderLabel = 'Payment Method'
      newobject.ProviderVal = item.payment_method ? item.payment_method : item.type

      newobject.ChargedLabel = 'Total Amount'
      newobject.ChargedVal = item.transactionAmount ? item.transactionAmount : item.transaction_amount

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
        MemberLabel: 'Monthly Share Contribution',
        MemberVal: item.monthlyShare ? item.monthlyShare : item.monthly_share,
        PaidDateLabel: 'UHF Monthly Membership Fee',
        PaidDateVal: item.uhfMonthlyFee ? item.uhfMonthlyFee : item.ufh_monthly_fee,
        EOSLabel: '',
        RepricingDiscountLabel: 'Application Fee',
        RepricingDiscountVal: item.applicationFee ? item.applicationFee : item.application_fee,
        IneligibleAmountLabel: '',
        IneligibleAmountVal: '',
        NonSharableAmountLabel: 'Refund Amount',
        NonSharableAmountVal: item.refundAmount ? item.refundAmount : 'NA',
        ConsultationFeeLabel: 'Refund Description',
        ConsultationFeeVal: item.refundDescription ? item.refundDescription : 'NA',
        SharingPercentageLabel: '',
        SharingPercentageVal: ''
      }

      newobject.MoreDetail = innerobject
      // console.log("New Object is=============",newobject)

      formatredjson = formatredjson.concat(newobject)

      // console.log("=====formated json state os=============",formatredjson)
    })

    this.setState({ formatedjsonData: formatredjson })
  }

  gotoPayement() {
    this.props.history.push('/MobileTransaction')
  }

  openDraftDayModal = () => {
    this.setState({loader:true})
    createCase().then(res => {
      if (res && res?.data?.success) {
        this.setState({loader:false, openChangeBillingModal:false, tempNotAvailableModal: true,
          responseText:'Your request has been submitted.',
        })
        // setModalMessage()
      } else {
        this.setState({loader:false, openChangeBillingModal:false, tempNotAvailableModal: true, 
          responseText:`We could not process your request. Please contact our Member Services team at ${localStorage.getItem('CONTACT_NUMBER')}, Monday through Friday 7:00 am to 6:00 pm CST or email at customerservice@universalhealthfellowship.org.`
        })
        // setModalMessage(
        //   
        // )
      }
    })
  }

  render() {
    // var x=this.state.formatedjsonData
    const { formatedjsonData } = this.state
    // console.log("====xxxxxxxxxxxxxxxxxx=============",x)
    return (
      <div className="">
        {this.state.loader ? <CommonLoader /> : null}
        <MobileHeader name="My Transactions " />
        {/* ------------------------------------------------ */}
        {this.state.formatedjsonData ? (
          <div className="mobileCommonBody">
            <Accordion expanded={this.state.expanded === 'panel1'} onChange={this.panelhandleChange('panel1')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <span className="labelRECENTTRANSACTIONS">RECENT TRANSACTIONS</span>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <div style={{ marginBottom: formatedjsonData.length >= 3 ? '51px' : 0 }}>
                    <SimpleAccordion data={formatedjsonData} />
                    {this.state.loadMoreBtnshow ? (
                      <div className="loadMoreWrapper">
                        <button className="loadMoreBtn" onClick={() => this.callapiLoadmore()}>
                          Load More
                        </button>
                      </div>
                    ) : null}
                  </div>
                  {this.state.notfoundmsg && (
                    <div style={{ padding: '180px 70px', textAlign: 'center' }} className="mobile_data_not_found">
                      {this.state.notfoundmsg}
                    </div>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={this.state.expanded === 'panel2'} onChange={this.panelhandleChange('panel2')} >
              <AccordionSummary2 expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                <span className="labelRECENTTRANSACTIONS">PAYMENT INFORMATION</span>
              </AccordionSummary2>
              <AccordionDetails2 style={{ marginBottom: 0 }}>
                <div style={{ margin: 32 }}>
                  <span class="TitleCurrentPaymentMethod">Current Payment Method</span>
                  <br />
                  <span class="numberPaymentMethod">{this.state.paymentType == 'Credit Card' ? 'Credit Card' : 'ACH'}</span>
                  <br />
                  <div style={{ marginTop: '63px' }}>
                    <table className="Last_4_digit">
                      <td className="td_style1">Account Number currently on file</td>
                      <td className="td_style" style={{ verticalAlign: 'middle' }}>
                        {this.state.accountNo}
                      </td>
                    </table>
                  </div>
                  <br />
                  <Button variant="secondary" onClick={() => this.gotoPayement()} class="newblueActionBtn">
                    CHANGE PAYMENT METHOD
                  </Button>
                  <hr />
                  <div>
                    <span class="TitleCurrentPaymentMethod">Next Payment Due Date</span>
                    <br />
                    <span class="numberPaymentMethod">{moment(this.state.paymentData.recurringDate).format('MMM DD YYYY')}</span>
                    <div>
                      <br />
                      <Button variant="secondary" onClick={() => this.setState({openChangeBillingModal:true})} class="newblueActionBtn">
                        CHANGE BILLING DATE
                      </Button>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </AccordionDetails2>
            <ChatIcon showAIChatIcon={true} />
              <ChatIcon shiftup={false} />
            </Accordion>
          </div>
        ) : null}
        {/* ------------------------------------------------ */}
        {/* <div className="Bottom-Blue">
          <Grid container>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button variant="secondary" onClick={() => this.gotoPayement()} class="mytransaction_changepaymentbutton">
                CHANGE PAYMENT METHOD
              </Button>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center', marginTop: 10 }}>
              <Button variant="secondary" onClick={() => this.openDraftDayModal()} class="mytransaction_changepaymentbutton">
                CHANGE BILLING DATE
              </Button>
            </Grid>
          </Grid>
        </div> */}

        <Modal size="small" show={this.state.openChangeBillingModal} onHide={() =>this.setState({openChangeBillingModal:false})} centered backdrop="static">
          <Modal.Header>
            <Modal.Title>Message</Modal.Title>
            <IconButton aria-label="close" onClick={() =>this.setState({openChangeBillingModal:false})} style={{ marginTop: '-13px' }}>
              <CloseIcon />
            </IconButton>
          </Modal.Header>

          <Modal.Body>
            <b>You can submit a request to change your billing date. Our Member Services team will get in touch with you at the earliest and guide you through the process. </b>
          </Modal.Body>

          <Modal.Footer>
            <div style={{flexDirection: 'row', width: '90vw', display: 'flex',}}>
            <Button variant="secondary" onClick={() =>this.openDraftDayModal()} class="ButtonBG">
            PROCEED
            </Button>
            <Button variant="secondary" onClick={() =>this.setState({openChangeBillingModal:false})} class="ButtonBG">
              CANCEL
            </Button>
            </div>
          </Modal.Footer>
        </Modal>


        <Modal size="small" show={this.state.tempNotAvailableModal} onHide={() =>this.setState({tempNotAvailableModal:false, responseText:""})} centered backdrop="static">
          <Modal.Header>
            <Modal.Title>Message</Modal.Title>
            <IconButton aria-label="close" onClick={() =>this.setState({tempNotAvailableModal:false, responseText:""})} style={{ marginTop: '-13px' }}>
              <CloseIcon />
            </IconButton>
          </Modal.Header>

          <Modal.Body>
            <b>{this.state.responseText}</b>
          </Modal.Body>

          <Modal.Footer>
          <div style={{flexDirection: 'row', justifyContent:'flex-start', width: "66vw"}}>
          <Button variant="secondary" onClick={() =>this.setState({tempNotAvailableModal:false, responseText:""})} class="ButtonBG">
              OK
            </Button>
          </div>
          </Modal.Footer>
        </Modal>

        <Modal1 visible={false} effect="fadeInUp">
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
        {/* {this.state.expanded === "panel2" && <ChatIcon openChat={() => console.log('')} shiftup={false} />} */}
        {!this.state.loader && this.state.expanded === 'panel2' && (
          <div style={{ bottom: '10vh', position: 'relative' }}>
            <MobCopyright />
          </div>
        )}
        <div class="fixed-bottom">
          <MobileFooter />
        </div>{' '}
      </div>
    )
  }
  panelhandleChange = panel => (event, expanded) => {
    this.setState({ expanded: expanded ? panel : this.state.expanded === 'panel1' ? 'panel2' : 'panel1' }, () => {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    })
  }
  getRecurringDay = () => {
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
      return moment(this.state.paymentData.recurringDate).format('MMMM DD, YYYY')
    } else {
      return ''
    }
  }
}
const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    padding: '0px',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 49,
    position: 'fixed',
    zIndex: 100,
    width: '100%',
    paddingLeft: '24px',
    paddingRight: '5px',
    '&$expanded': {
      minHeight: 12
    }
  },

  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiAccordionSummary)

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: 0,
    marginTop: 45,
    marginBottom: '50vh'
  }
}))(MuiAccordionDetails)

const AccordionSummary2 = withStyles({
  root: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: 0,
    minHeight: 49,
    width: '100%',
    zIndex: 1031,
    position: 'fixed',
    paddingLeft: '24px',
    paddingRight: '5px',
    bottom: '10vh',
    '&$expanded': {
      bottom: '100%',
      top: 53,
      marginTop: 52, //48
      minHeight: 49
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiAccordionSummary)

const AccordionDetails2 = withStyles(theme => ({
  root: {
    padding: 0,
    marginTop: 75,
    marginBottom: '23vh'
  }
}))(MuiAccordionDetails)
