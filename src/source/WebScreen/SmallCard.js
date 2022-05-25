import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import Modal2 from '@material-ui/core/Modal'
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import React, { Component } from 'react'
import Modal1 from 'react-awesome-modal'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import customStyle from '../../components/healthqn/CSS/stylesheet_UHS'
import {
  encryptMemberId,
  getCardDetails,
  getExpensLimit,
  gethealthcard,
  getMemberStatus,
  getNetworkName,
  getNotificationDetails,
  getProgramInfo,
  getproviderLink,
  getSourceID,
  healthtools
} from '../ApiCall'
import CommonLoader from '../CommonLoader'
import FAQ from '../Images/LeftDrawer Icon/FAQs icon (active).svg'
import Documents from '../Images/LeftDrawer Icon/find-a-provider-icon-active.svg'
import Medical from '../Images/LeftDrawer Icon/medical-q-icon-active.svg'
import DigitalCard from '../Images/LeftDrawer Icon/membership-card-icon-active.svg'
import MyNeeds from '../Images/LeftDrawer Icon/my-needs-icon-active.svg'
import Transaction from '../Images/LeftDrawer Icon/my_transactions_icon_active (1).svg'
import PaymentWallet from '../Images/LeftDrawer Icon/payment_wallet_icon_active.svg'
import Provider from '../Images/LeftDrawer Icon/program-info-icon-active.svg'
import HealthTools from '../WebScreen/HeathTools/HealthTools'
import MainCard from './MainCard'
import ModalAlert from './ModalAlert'

const NextButton = withStyles(customStyle.viewBtn)(Button)

export const planConfig1 = {
  UHF: {
    AFA: {
      normal: [6001, 6002, 6003, 6004, 6005, 6006]
    },
    PARISH: {
      normal: [9001, 9002, 9003, 9004, 9005, 9006]
    },
    DEFAULT: {
      normal: [10001, 10002, 10003, 10004, 10005, 10006, 11001, 11002, 11003, 11004, 11005, 11006],
      smartshare: [6011, 9011, 10011, 11011]
    }
  },
  UHS: {
    DEFAULT: {
      normal: [7001, 7002, 7003, 7004, 7005, 7006, 8001, 8002, 8003, 8004, 8005, 8006, 12001, 12002, 12003, 12004, 12005, 12006],
      smartshare: [1011, 7011, 8011, 12011]
      //not - NEO -> 1k series
    }
  }
}

/**
 * tutela - hst, neo, big - sourceid

maricopa, parish, chs chspl - empid
 */
export const planConfig = [
  {
    network: 'PHCS',
    channel: 'NEO',
    planIds: [1001, 1002, 1003, 1004, 1005, 1006],
    contactNumber: '(888) 366-6243',
    cardId: '1kNEOUHSR071820E072020',
    showEmpId: false
  },
  {
    network: 'PHCS',
    channel: 'Tutela',
    planIds: [7001, 7002, 7003, 7004, 7005, 7006],
    contactNumber: '(800) 987-1990',
    cardId: '7kTTUHSR071720E072020',
    showEmpId: true
  },
  {
    network: 'PHCS',
    channel: 'HST',
    planIds: [8001, 8002, 8003, 8004, 8005, 8006],
    contactNumber: '(888) 942-4725',
    cardId: '8kHSTUHSR071720E072020',
    showEmpId: true
  },
  {
    network: 'PHCS',
    channel: 'Parish',
    planIds: [9001, 9002, 9003, 9004, 9005, 9006],
    contactNumber: '(855) 030-4941',
    cardId: '9kPBUHSR071720E072020',
    showEmpId: true
  },
  {
    network: 'PHCS',
    channel: 'CHS',
    planIds: [10001, 10002, 10003, 10004, 10005, 10006],
    contactNumber: '(888) 792-4722',
    cardId: '10kCHUHSR081920E081220',
    showEmpId: true
  },
  {
    network: 'PHCS',
    channel: 'CHS-Plus',
    planIds: [11001, 11002, 11003, 11004, 11005, 11006],
    contactNumber: '(888) 792-4722',
    cardId: '11kCHUHSR081920E081220',
    showEmpId: true
  },
  {
    network: 'PHCS',
    channel: 'BIG',
    planIds: [12001, 12002, 12003, 12004, 12005, 12006],
    contactNumber: '(855) 809-0110',
    cardId: '12kBGUHS071720E072020',
    showEmpId: true
  },
  {
    network: 'PHCS',
    channel: 'Aspire',
    planIds: [13001, 13002, 13003, 13004, 13005, 13006, 13011, 13017, 13018, 13019, 13020, 13021, 13022],
    contactNumber: '(888) 992-4789',
    cardId: '13kAPUHSR092920E082420',
    showEmpId: true
  },
  {
    network: 'AFMC',
    channel: 'AFA',
    planIds: [6001, 6002, 6003, 6004, 6005, 6006],
    contactNumber: '(855) 229-0257',
    cardId: '6kAFAUHSR071820E072020',
    showEmpId: true
  },
  {
    network: 'Smartshare',
    channel: 'NEO',
    planIds: [1011, 7011, 8011, 12011, 13111],
    showEmpId: false //not sure for other than 1011 plans
  },
  {
    network: 'Smartshare',
    channel: 'UHF',
    planIds: [6011, 9011],
    showEmpId: true
  },
  {
    network: 'Smartshare',
    channel: 'UHF',
    planIds: [10011, 11011],
    contactNumber: '(888) 792-4722',
    showEmpId: true
  }
]

const useStyles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
    // border:'2px solid red',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
})

class SmallCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      templateData: false,
      showHealthCard: false,
      visible: false,
      visibleHealthy: false,
      isFlipped: false,
      digitalheathcard: null,
      programInfoModal: false,
      plainId: null,
      alertflag: false,
      loader: true,
      cardDetails: null,
      expensData: null,

      network: null,
      channel: null,
      planIds: null,
      contactNumber: null,
      cardId: null,
      showEmpId: false,

      // for program info
      programInfo: null,
      eligibleServices: null,
      expenseLimits: null,

      healthtoolscard: false,
      showwallet: false,
      showhealthtools: false,
      showmyneeds: false,
      myneedsfooter: false,

      tempNotAvailableModal: false,
      notificationData: [],
      unReadData: [],
      unreadNotification: [],
      showHealthToolCard: false,
      cardDisable: false,
      clientId: null,
      showIframe: false,
      openModalWindow: false,
      commonModuleURL: '',
      empID: '',

      aiHealthTools: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.onGoToMedical = this.onGoToMedical.bind(this)
    this.handleInputValue = this.handleInputValue.bind(this)

    this.openHealthTools = this.openHealthTools.bind(this)
    this.closehealthtools = this.closehealthtools.bind(this)

    this.handleHoverOff = this.handleHoverOff.bind(this)
  }

  componentDidMount() {
    this.setState({
      loader: true,
      clientId: localStorage.getItem('CLIENT_ID')
    })
    var myneedsfootertemp = sessionStorage.getItem('myneedsfooter')
    this.setState({ myneedsfooter: myneedsfootertemp })
    this.gethealthcarddata()

    if (this.props.digitalcardopen == true) {
      this.onCardClick()
    }
    this.getNotification()
    this.gethealthtoolsdata()
    getCardDetails().then(res => {
      this.setState(
        {
          smallCardData: res.data.response
        },
        () => {
          var smallCardData = this.state.smallCardData
          this.setState({ smallCardData: smallCardData.concat({ cardtitle: 'PaymentWallet' }) })
        }
      )
    })
    document.addEventListener('myevent', event => {
      this.getNotification()
    })
  }
  getNotification = () => {
    getNotificationDetails().then(res => {
      if (res.data && res.data.response) {
        this.setState({ notificationData: res.data.response.notificationDetails }, () => {
          if (this.state.notificationData) {
            let dt = this.state.notificationData.filter((val, index) => val.status == 'sent')
            let newArr = dt.slice(0, 2)
            this.setState({ unReadData: newArr })
          }
        })
      } else {
        this.setState({ notificationData: [] })
      }
    })
  }
  handleInputValue(val) {
    this.setState({ alertflag: val })
  }

  getTimeValue = () => {
    var cur = new Date()
    var datta = this.state.notificationData.map((data, index) => {
      return data.created_date
    })
    console.log('created_date==', datta)
  }
  sethealthcarddata() {
    if (
      this.state.plainId == '1001' ||
      this.state.plainId == '1002' ||
      this.state.plainId == '1003' ||
      this.state.plainId == '1004' ||
      this.state.plainId == '1005' ||
      this.state.plainId == '1006' ||
      this.state.plainId == '1017' ||
      this.state.plainId == '1018' ||
      this.state.plainId == '1019' ||
      this.state.plainId == '1020' ||
      this.state.plainId == '1021' ||
      this.state.plainId == '1022'
    ) {
      this.setState({
        showEmpId: false
      })
    }

    if (
      this.state.plainId == '7001' ||
      this.state.plainId == '7002' ||
      this.state.plainId == '7003' ||
      this.state.plainId == '7004' ||
      this.state.plainId == '7005' ||
      this.state.plainId == '7006' ||
      this.state.plainId == '7017' ||
      this.state.plainId == '7018' ||
      this.state.plainId == '7019' ||
      this.state.plainId == '7020' ||
      this.state.plainId == '7021' ||
      this.state.plainId == '7022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '8001' ||
      this.state.plainId == '8002' ||
      this.state.plainId == '8003' ||
      this.state.plainId == '8004' ||
      this.state.plainId == '8005' ||
      this.state.plainId == '8006' ||
      this.state.plainId == '8017' ||
      this.state.plainId == '8018' ||
      this.state.plainId == '8019' ||
      this.state.plainId == '8020' ||
      this.state.plainId == '8021' ||
      this.state.plainId == '8022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '9001' ||
      this.state.plainId == '9002' ||
      this.state.plainId == '9003' ||
      this.state.plainId == '9004' ||
      this.state.plainId == '9005' ||
      this.state.plainId == '9006' ||
      this.state.plainId == '9017' ||
      this.state.plainId == '9018' ||
      this.state.plainId == '9019' ||
      this.state.plainId == '9020' ||
      this.state.plainId == '9021' ||
      this.state.plainId == '9022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '10001' ||
      this.state.plainId == '10002' ||
      this.state.plainId == '10003' ||
      this.state.plainId == '10004' ||
      this.state.plainId == '10005' ||
      this.state.plainId == '10006' ||
      this.state.plainId == '10017' ||
      this.state.plainId == '10018' ||
      this.state.plainId == '10019' ||
      this.state.plainId == '10020' ||
      this.state.plainId == '10021' ||
      this.state.plainId == '10022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '11001' ||
      this.state.plainId == '11002' ||
      this.state.plainId == '11003' ||
      this.state.plainId == '11004' ||
      this.state.plainId == '11005' ||
      this.state.plainId == '11006' ||
      this.state.plainId == '11017' ||
      this.state.plainId == '11018' ||
      this.state.plainId == '11019' ||
      this.state.plainId == '11020' ||
      this.state.plainId == '11021' ||
      this.state.plainId == '11022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '12001' ||
      this.state.plainId == '12002' ||
      this.state.plainId == '12003' ||
      this.state.plainId == '12004' ||
      this.state.plainId == '12005' ||
      this.state.plainId == '12006' ||
      this.state.plainId == '12017' ||
      this.state.plainId == '12018' ||
      this.state.plainId == '12019' ||
      this.state.plainId == '12020' ||
      this.state.plainId == '12021' ||
      this.state.plainId == '12022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '6001' ||
      this.state.plainId == '6002' ||
      this.state.plainId == '6003' ||
      this.state.plainId == '6004' ||
      this.state.plainId == '6005' ||
      this.state.plainId == '6006' ||
      this.state.plainId == '6017' ||
      this.state.plainId == '6018' ||
      this.state.plainId == '6019' ||
      this.state.plainId == '6020' ||
      this.state.plainId == '6021' ||
      this.state.plainId == '6022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (this.state.plainId == '1011') {
      this.setState({
        showEmpId: false //not sure for other than 1011 plans
      })
    }

    if (this.state.plainId == '6011') {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '13001' ||
      this.state.plainId == '13002' ||
      this.state.plainId == '13003' ||
      this.state.plainId == '13004' ||
      this.state.plainId == '13005' ||
      this.state.plainId == '13006' ||
      this.state.plainId == '13017' ||
      this.state.plainId == '13018' ||
      this.state.plainId == '13019' ||
      this.state.plainId == '13020' ||
      this.state.plainId == '13021' ||
      this.state.plainId == '13022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (this.state.plainId == '7011') {
      this.setState({
        showEmpId: true //not sure for other than 1011 plans
      })
    }

    if (this.state.plainId == '8011') {
      this.setState({
        showEmpId: true //not sure for other than 1011 plans
      })
    }

    if (this.state.plainId == '9011') {
      this.setState({
        showEmpId: true //not sure for other than 1011 plans
      })
    }

    if (this.state.plainId == '10011') {
      this.setState({
        showEmpId: true //not sure for other than 1011 plans
      })
    }

    if (this.state.plainId == '11011') {
      this.setState({
        showEmpId: true //not sure for other than 1011 plans
      })
    }

    if (this.state.plainId == '12011') {
      this.setState({
        showEmpId: true //not sure for other than 1011 plans
      })
    }

    if (this.state.plainId == '13011') {
      this.setState({
        showEmpId: true //not sure for other than 1011 plans
      })
    }

    if (
      this.state.plainId == '14001' ||
      this.state.plainId == '14002' ||
      this.state.plainId == '14003' ||
      this.state.plainId == '14004' ||
      this.state.plainId == '14005' ||
      this.state.plainId == '14006' ||
      this.state.plainId == '14017' ||
      this.state.plainId == '14018' ||
      this.state.plainId == '14019' ||
      this.state.plainId == '14020' ||
      this.state.plainId == '14021' ||
      this.state.plainId == '14022' ||
      this.state.plainId == '14011'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '15001' ||
      this.state.plainId == '15002' ||
      this.state.plainId == '15003' ||
      this.state.plainId == '15004' ||
      this.state.plainId == '15005' ||
      this.state.plainId == '15006' ||
      this.state.plainId == '15017' ||
      this.state.plainId == '15018' ||
      this.state.plainId == '15019' ||
      this.state.plainId == '15020' ||
      this.state.plainId == '15021' ||
      this.state.plainId == '15022' ||
      this.state.plainId == '15011'
    ) {
      this.setState({
        showEmpId: true
      })
    }
    if (
      this.state.plainId == '20120' ||
      this.state.plainId == '20140' ||
      this.state.plainId == '20160' ||
      this.state.plainId == '20151' ||
      this.state.plainId == '20152' ||
      this.state.plainId == '20220' ||
      this.state.plainId == '20240' ||
      this.state.plainId == '20260' ||
      this.state.plainId == '20251' ||
      this.state.plainId == '20252' ||
      this.state.plainId == '20320' ||
      this.state.plainId == '20340' ||
      this.state.plainId == '20360' ||
      this.state.plainId == '20351' ||
      this.state.plainId == '20352' ||
      this.state.plainId == '20420' ||
      this.state.plainId == '20440' ||
      this.state.plainId == '20460' ||
      this.state.plainId == '20451' ||
      this.state.plainId == '20452' ||
      this.state.plainId == '20520' ||
      this.state.plainId == '20540' ||
      this.state.plainId == '20560' ||
      this.state.plainId == '20551' ||
      this.state.plainId == '20552'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    this.setState({
      loader: false
    })
  }

  gethealthcarddata() {
    gethealthcard().then(res => {
      if (localStorage.getItem('SOURCE') === 'NEO') {
        this.setState(
          {
            empID: res.data.memberIdCardList[0].memberId
          },
          () => {
            localStorage.setItem('Member_EMPID', this.state.empID)
          }
        )
      } else {
        res.data.memberIdCardList[0] &&
          res.data.memberIdCardList[0].planInfo.map((data, index) => {
            if (data.idcardField == 'prefix') {
              console.log('prefix empid=====', data.fieldValue)

              this.setState({ prefix: data.fieldValue }, () => {
                this.setState(
                  {
                    empID: this.state.prefix + res.data.memberIdCardList[0].empId
                  },
                  () => {
                    localStorage.setItem('Member_EMPID', this.state.empID)
                  }
                )
              })
            }
          })
      }

      if (res.data.memberIdCardList != null) {
        this.setState({
          digitalheathcard: res.data,
          plainId: res.data.memberIdCardList[0].planId,
          clientId: localStorage.getItem('CLIENT_ID')
        })

        this.sethealthcarddata()
        this.getNetworkData(res.data.memberIdCardList[0].planId)
        this.setContactandCardID(res.data)
      } else {
        this.setState({ alertflag: true, loader: false })
      }
    })
  }

  setContactandCardID(data) {
    data.memberIdCardList[0].planInfo.map((data, index) => {
      if (data.idcardField == 'contact number') {
        this.setState({ contactNumber: data.fieldValue })
      }
      if (data.idcardField == 'card id') {
        this.setState({ cardId: data.fieldValue })
      }
    })
  }

  getNetworkData(plainid) {
    getNetworkName(plainid).then(res => {
      console.log('netowrok name againt plain id=======', res.data)
      localStorage.setItem('NETWORK_NAME', res.data.provider_network)
      this.setState({ network: res.data.provider_network })
      this.setState({
        // showHealthCard: true,
        // visible: true,
        loader: false
      })
    })
  }

  async getTemplateDataByPlan(planId) {
    let templateData = false
    for (let i = 0; i < planConfig.length; i++) {
      let planData = planConfig[i]
      if (planData.planIds.includes(planId)) {
        templateData = planData
        break
      }
    }
    this.setState({ templateData: templateData })
    if (
      localStorage.getItem('CLIENT_ID') == '6548' ||
      localStorage.getItem('CLIENT_ID') == 6548 ||
      localStorage.getItem('CLIENT_ID') == '4367' ||
      localStorage.getItem('CLIENT_ID') == 4367 ||
      localStorage.getItem('CLIENT_ID') == '5540' ||
      localStorage.getItem('CLIENT_ID') == 5540 ||
      localStorage.getItem('CLIENT_ID') == '4376' ||
      localStorage.getItem('CLIENT_ID') == 4376
    ) {
      this.setState({
        showHealthCard: true,
        showHealthToolCard: true,
        visibleHealthy: true,
        loader: false
      })
    } else {
      this.setState({
        showHealthCard: true,
        showHealthToolCard: true,
        visible: true,
        loader: false
      })
    }
  }

  openProgramInfo() {
    this.setState({
      loader: true
    })
    this.getProgramInfo()
    this.setState({
      programInfoModal: true
    })
  }

  // new API for program info
  getProgramInfo() {
    getProgramInfo()
      .then(res => {
        if (res.data && res.data.programInfo) {
          const { programInfo, planInfo, expenseLimits } = res.data
          this.setState({
            programInfo: programInfo,
            eligibleServices: expenseLimits,
            expenseLimits: planInfo,
            loader: false
          })
        } else {
        }
      })
      .catch()
  }

  gethealthcarddataExpesepage() {
    gethealthcard().then(res => {
      console.log('SERVER RESPONSE Health Card=', res.data)
      if (res.data.memberIdCardList != null) {
        this.setState({ cardDetails: res.data.memberIdCardList })
      } else {
        // alert('Data not available.')
        this.setState({ alertflag: true, loader: false })
      }
    })
  }

  handleExpenseLimit = () => {
    getExpensLimit().then(res => {
      console.log('======================= get getExpensLimit =================')
      console.log(res)
      if (res.data.length > 0) {
        this.setState({
          expensData: res.data,
          loader: false
        })
      }

      if (res.data.length == 0) {
        console.log('No Data For Expense limit')
        // alert("EXPENSE DATA NOT AVALABEL")
        this.setState({
          loader: false,
          alertflag: true
        })
      }
    })
  }

  encryptData = async request => {
    // props.toggleGlobalLoader(true);
    let query = await encryptMemberId(request)
    // props.toggleGlobalLoader(false);
    return query
  }

  getCommonModuleURL = (type, query) => {
    let baseURL = process.env.REACT_APP_COMMON_MODULE_URL
    if (type == 'HEALTHTOOL') {
      // let baseURL = "http://localhost:3002/"
      let token = localStorage.getItem('bearerToken')
      return baseURL + 'healthtool?query=' + query + '&token=' + token
    } else {
      // let baseURL = "http://localhost:3002/"
      let token = localStorage.getItem('bearerToken')
      return baseURL + 'healthcard?query=' + query + '&token=' + token
    }
  }

  onCardClick = async card => {
    this.setState({ loader: true })

    let memberIdSource = ''
    await getSourceID().then(res => {
      memberIdSource = res.data.memberIdSource
      console.log('Member source id issss in contact cardd', res.data.memberIdSource)
      // this.agentInfoget(res.data.memberIdSource)
    })
    let memberStatus = ''
    await getMemberStatus(memberIdSource).then(res => {
      memberStatus = res.data
    })
    let type = memberStatus == 'Active' ? 'AC' : 'TE'

    let request = `memberid=${memberIdSource}&type=${type}`
    let query = await this.encryptData(request)
    let _healthCardURL = null
    if (card == 'healthtool') {
      _healthCardURL = this.getCommonModuleURL('HEALTHTOOL', query)
    } else {
      _healthCardURL = this.getCommonModuleURL('HEALTHCARD', query)
    }

    this.setState({
      showHealthCard: true,
      visible: true,
      commonModuleURL: _healthCardURL,
      loader: false
    })
  }

  opennotices() {
    window.open('https://www.universalhealthfellowship.org/notices/')
  }

  openprovider() {
    // var windowReference = window.open();
    getproviderLink().then(res => {
      console.log('PROVIDER===', res)
      if (res.data && res.data.length > 0) {
        console.log('PROVIDER===Link Dta is greater than 0')
        let providerLink = res.data[0].fieldValue
        window.open(providerLink)

        // windowReference.location = providerLink;
        // window.open('' + providerLink, '_blank')
      } else {
        console.log('PROVIDER===Link Dta is LESSS 0')
        alert('Data Not Availabel')
      }
    })
  }

  openfaqs() {
    window.open('https://www.universalhealthfellowship.org/FAQs/')
  }

  openModal() {
    this.setState({
      visible: true
    })
  }

  closeProgramModal() {
    this.setState({
      programInfoModal: false
    })
  }

  closeModal() {
    this.setState({
      visible: false,
      isFlipped: false
    })
  }

  handleClick(e) {
    e.preventDefault()
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }))
  }

  onGoToMedical = () => {
    this.props.history.push('Medical')
  }

  printCardView() {
    window.print()
  }

  handleClose = () => {
    this.setState({
      visible: false,
      openModalWindow: false,
      showIframe: false,
      digitalheathcard: null,
      network: null,
      showwallet: false
    })
  }

  openHealthTools = event => {
    // event.stopPropagation()
    this.setState({ healthtoolscard: true })
    console.log('state change isss===', this.state.healthtoolscard)
    this.setState({ loader: true })
    this.gethealthcarddata()
    this.setState({
      showHealthCard: true,
      showHealthToolCard: this.props.show
      // visible: true,
    })
  }

  closehealthtools = () => {
    this.setState({
      healthtoolscard: false,
      // isFlipped: false
      digitalheathcard: null,
      network: null,
      showwallet: false
    })
  }

  openshowwallet() {
    this.setState({ showwallet: true })
  }

  gethealthtoolsdata() {
    healthtools().then(res => {
      console.log('Helath tools===== ', res)

      if (res) {
        if (typeof res.data === 'string') {
          this.setState({ showhealthtools: true, loader: false })
          localStorage.setItem('HealthTool', true)
        } else {
          this.setState({ showhealthtools: false, loader: false })
          localStorage.setItem('HealthTool', false)
        }
      } else {
        this.setState({ showhealthtools: false, loader: false })
        localStorage.setItem('HealthTool', false)
      }
    })
  }

  openAIHealthTools = () => {
    return (
      <HealthTools
        handleClose={this.closehealthtools}
        data={this.state.digitalheathcard}
        cardId={this.state.cardId}
        network={this.state.network}
        contactNumber={this.state.contactNumber}
        showEmpId={this.state.showEmpId}
      />
    )
  }

  handleBoxToggle = () => this.setState({ showwallet: true })
  handleHoverOff = () => this.setState({ showwallet: false })

  render() {
    const { classes } = this.props
    const cardArray = []

    if (this.state.smallCardData)
      this.state.smallCardData.forEach(card => (
        <>
          {(() => {
            switch (card.cardtitle) {
              case 'MembershipId':
                if (this.props.flag === 'cardBlock12' || this.props.flag === 'cardBlock1')
                  card.enable
                    ? cardArray.push(
                        <div>
                          {this.state.showwallet ? (
                            <div onMouseLeave={this.handleHoverOff}>
                              <div class="cardwallet_back ">
                                <div class="cardwallet_onover_backdiv">
                                  <img
                                    src={require('../Images/LeftDrawer Icon/membership-card-icon-active.svg')}
                                    class="cardwaalet_img_backside"
                                  />
                                  <div class="cardwallet_label_backside">ID Cards</div>
                                </div>
                                <div class="cardwallet_back_text" onClick={() => this.onCardClick('')}>
                                  Membership Card
                                </div>
                                {this.state.showhealthtools == 'true' || this.state.showhealthtools == true || this.props.show == true ? (
                                  <div class="cardwallet_back_text" onClick={e => this.onCardClick('healthtool')}>
                                    Health Tools
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ) : (
                            <div onMouseOver={this.handleBoxToggle}>
                              <MainCard name="ID Cards" img={DigitalCard} />
                            </div>
                          )}
                        </div>
                      )
                    : cardArray.push(
                        <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
                          <MainCard name="ID Cards" img={DigitalCard} />
                        </div>
                      )
                break

              case 'ProgramInformation':
                if (this.props.flag === 'cardBlock12' || this.props.flag === 'cardBlock1')
                  card.enable
                    ? cardArray.push(
                        <Link to="/ProgramInformation" style={{ textDecoration: 'none' }}>
                          <MainCard name="Program Information" img={Provider} />
                        </Link>
                      )
                    : cardArray.push(
                        <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
                          <MainCard name="Program Information" img={Provider} />
                        </div>
                      )
                break
              case 'MyNeeds':
                if (this.props.flag === 'cardBlock12' || this.props.flag === 'cardBlock1')
                  card.enable
                    ? cardArray.push(
                        <Link to="/MyNeeds" style={{ textDecoration: 'none', marginLeft: '0.7vw' }}>
                          <MainCard name="My Needs" img={MyNeeds} />
                        </Link>
                      )
                    : cardArray.push(
                        <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
                          <MainCard name="My Needs" img={MyNeeds} />
                        </div>
                      )
                break
              case 'FindProvider':
                if (this.props.flag === 'cardBlock12' || this.props.flag === 'cardBlock2')
                  card.enable
                    ? cardArray.push(
                        <div onClick={() => this.openprovider()}>
                          <MainCard name="Find a Provider" img={Documents} />
                        </div>
                      )
                    : cardArray.push(
                        <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
                          <MainCard name="Find a Provider" img={Documents} />
                        </div>
                      )
                break
              case 'HealthQuestionnaire':
                if (this.props.flag === 'cardBlock12' || this.props.flag === 'cardBlock2')
                  card.enable
                    ? cardArray.push(
                        <Link to="/Medical" style={{ textDecoration: 'none' }}>
                          <MainCard name="Health Questionnaire" img={Medical} />
                        </Link>
                      )
                    : cardArray.push(
                        <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
                          <MainCard name="Health Questionnaire" img={Medical} />
                        </div>
                      )
                break
              case 'FAQs':
                if (this.props.flag === 'cardBlock12' || this.props.flag === 'cardBlock2')
                  card.enable
                    ? cardArray.push(
                        <div onClick={() => this.openfaqs()} style={{ marginLeft: '0.7vw' }}>
                          <MainCard name="FAQs" img={FAQ} />
                        </div>
                      )
                    : cardArray.push(
                        <div onClick={() => this.setState({ tempNotAvailableModal: true })} style={{ marginLeft: '0.7vw' }}>
                          <MainCard name="FAQs" img={FAQ} />
                        </div>
                      )
                break
              // case 'PaymentWallet':
              //   if (this.props.flag === 'cardBlock12' || this.props.flag === 'cardBlock2')
              //     cardArray.push(
              //       <Link to="/PaymentWallet" style={{ textDecoration: 'none' }}>
              //         <MainCard name="Payment Wallet" img={PaymentWallet} />
              //       </Link>
              //     )
              //   break
              case 'MyTransaction':
                if (this.props.flag === 'cardBlock12' || this.props.flag === 'cardBlock1')
                  card.enable
                    ? cardArray.push(
                        <Link to="/Transaction" style={{ textDecoration: 'none' }}>
                          <MainCard name="My Transactions" img={Transaction} />
                        </Link>
                      )
                    : cardArray.push(
                        <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
                          <MainCard name="My Transactions" img={Transaction} />
                        </div>
                      )
                break
            }
          })()}
        </>
      ))

    // if (this.props.flag == 'cardBlock02' && this.state.smallCardData)
    //   this.state.smallCardData.forEach(card => {
    //     switch (card.cardtitle) {
    //       case 'FindProvider':
    //         if (this.props.flag === 'cardBlock12' || this.props.flag === 'cardBlock2')
    //           card.enable
    //             ? cardArray.push(
    //                 <div onClick={() => this.openprovider()}>
    //                   <MainCard name="Find a Provider" img={Documents} />
    //                 </div>
    //               )
    //             : cardArray.push(
    //                 <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
    //                   <MainCard name="Find a Provider" img={Documents} />
    //                 </div>
    //               )
    //         break
    //       case 'HealthQuestionnaire':
    //         if (this.props.flag === 'cardBlock12' || this.props.flag === 'cardBlock2')
    //           card.enable
    //             ? cardArray.push(
    //                 <Link to="/Medical" style={{ textDecoration: 'none' }}>
    //                   <MainCard name="Health Questionnaire" img={Medical} />
    //                 </Link>
    //               )
    //             : cardArray.push(
    //                 <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
    //                   <MainCard name="Health Questionnaire" img={Medical} />
    //                 </div>
    //               )
    //         break
    //       // case 'FAQs':
    //       // if (this.props.flag === 'cardBlock12' || this.props.flag === 'cardBlock2')

    //       //   card.enable
    //       //     ? cardArray.push(
    //       //         <div onClick={() => this.openfaqs()} style={{ marginLeft: '0.7vw' }}>
    //       //           <MainCard name="FAQs" img={FAQ} />
    //       //         </div>
    //       //       )
    //       //     : cardArray.push(
    //       //         <div onClick={() => this.setState({ tempNotAvailableModal: true })} style={{ marginLeft: '0.7vw' }}>
    //       //           <MainCard name="FAQs" img={FAQ} />
    //       //         </div>
    //       //       )
    //       //   break
    //       case 'PaymentWallet':
    //         if (this.props.flag === 'cardBlock12' || this.props.flag === 'cardBlock2')
    //           cardArray.push(
    //             <Link to="/PaymentWallet" style={{ textDecoration: 'none' }}>
    //               <MainCard name="Payment Wallet" img={PaymentWallet} />
    //             </Link>
    //           )
    //     }
    //   })

    return (
      <div class="webhome_left_bottom_div" style={{ marginLeft: '-0.6vw' }}>
        {this.state.loader ? <CommonLoader /> : null}

        {cardArray}

        {/* <Link to="/PaymentWallet" style={{ textDecoration: 'none' }}>
                  <MainCard name="Payment Wallet" img={Documents} />
              </Link> */}

        <Modal2
          style={{
            overflow: 'auto',
            height: '100%'
          }}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.visible}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <div>
            <div
              style={{
                display: this.state.showIframe ? 'flex' : 'none',
                justifyContent: 'flex-end',
                background: '#f1f1f1',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px'
              }}
            >
              <IconButton
                aria-label="close"
                onClick={e => {
                  this.handleClose()
                }}
                style={{
                  color: 'black',
                  width: '30px',
                  height: '30px'
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            {!this.state.showIframe && (
              <div
                style={{
                  textAlign: 'center'
                }}
              >
                <CircularProgress />
              </div>
            )}
            {this.state.visible && (
              <iframe
                src={this.state.commonModuleURL}
                title="Common Module"
                onLoad={() => {
                  this.setState({
                    showIframe: true
                  })
                }}
                style={{
                  width: '725px',
                  height: '470px',
                  border: 'none',
                  margin: 'auto'
                }}
              ></iframe>
            )}
          </div>
        </Modal2>
        {this.state.digitalheathcard && this.state.network && this.state.healthtoolscard ? (
          <Modal2
            style={{
              overflow: 'auto',
              height: '100%'
            }}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={this.state.healthtoolscard}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={this.state.healthtoolscard}>
              <HealthTools
                handleClose={this.closehealthtools}
                data={this.state.digitalheathcard}
                cardId={this.state.cardId}
                network={this.state.network}
                contactNumber={this.state.contactNumber}
                showEmpId={this.state.showEmpId}
              />
            </Fade>
          </Modal2>
        ) : null}
        {this.state.alertflag ? <ModalAlert handleInput={this.handleInputValue} /> : null}
        <Modal1 visible={this.state.tempNotAvailableModal} width="30%" effect="fadeInUp">
          <div style={{ textAlign: 'center' }}>
            <div className="tempModalTxt">
              We’re facing some technical difficulties, due to which this feature is currently unavailable. For support, call Member
              Services at {localStorage.getItem('CONTACT_NUMBER')}, Monday through Friday, 8.00am to 8.00pm CST.
            </div>
            <NextButton
              variant="contained"
              class="yellow_popup_caption_button"
              onClick={() => this.setState({ tempNotAvailableModal: false })}
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
        </Modal1>
      </div>
    )
  }
}

export default withStyles(useStyles)(SmallCard)
