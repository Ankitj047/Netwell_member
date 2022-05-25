import Backdrop from '@material-ui/core/Backdrop'
import Badge from '@material-ui/core/Badge'
import CircularProgress from '@material-ui/core/CircularProgress'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Fab from '@material-ui/core/Fab'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
// import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress'
import Modal2 from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { withStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CloseIcon from '@material-ui/icons/Close'
import ForumIcon from '@material-ui/icons/Forum'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import axios from 'axios'
import moment from 'moment'
import React, { Component } from 'react'
import Modal1 from 'react-awesome-modal'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import { toggleExitHealthqnAlert, toggleHealthQnEditMode } from '../../../../src/actions/healthQnActions'
import customStyle from '../../../components/healthqn/CSS/stylesheet_UHS'
import ExitConfirm from '../../../components/healthqn/Enrollment/Alert'
import configuration from '../../../components/healthqn/Enrollment/config'
import CustomeCss from '../../../components/healthqn/Enrollment/EnrollFamily/EnrollFamily.module.css'
import EnrollNew2 from '../../../components/healthqn/Enrollment/EnrollFamily/EnrollNew2'
import EnrollNew3 from '../../../components/healthqn/Enrollment/EnrollFamily/EnrollNew3'
import EnrollNew4 from '../../../components/healthqn/Enrollment/EnrollFamily/EnrollNew4'
import EnrollNew5 from '../../../components/healthqn/Enrollment/EnrollFamily/EnrollNew5'
import EnrollNew6 from '../../../components/healthqn/Enrollment/EnrollFamily/EnrollNew6'
import i18n from '../../../components/healthqn/Enrollment/i18next'
import { logoutApplication } from '../../../components/layout/Header'
import firebase from '../../../firebase'
import {
  encryptMemberId,
  getCardDetails,
  getCardEnableData,
  gethealthcard,
  getMemberStatus,
  getNetworkName,
  getNotificationDetails,
  getProgramInfo,
  getSourceID,
  updateNotificationStatus
} from '../../ApiCall'
import CommonLoader from '../../CommonLoader'
import AlertNotification from '../../Images/notification/notification_alert_icon.svg'
import AnnouncementNotification from '../../Images/notification/notification_announcement_icon.svg'
import PromoNotification from '../../Images/notification/notification_promo_icon.svg'
import ReminderNotification from '../../Images/notification/notification_reminder_icon.svg'
import SurveyNotification from '../../Images/notification/notification_survey_icon.svg'
import UpdateNotification from '../../Images/notification/notification_update_icon.svg'
import CommonFooter from '../../WebScreen/CommonFooter'
import ContactInformationCard from '../../WebScreen/ContactInformationCard'
import DocumentsCardNew from '../../WebScreen/DocumentsCardNew'
import HealthyLifeCard from '../../WebScreen/HealthyShare Card/IDCard'
import LeftDrawer from '../../WebScreen/LeftDrawer'
import ModalAlert from '../../WebScreen/ModalAlert'
import ProgramInfo from '../../WebScreen/programInfo/programInfo'
import RightDrawer from '../../WebScreen/RightDrawer'
import WebHome from '../../WebScreen/WebHome'

const CrudButton = withStyles(customStyle.crudBtn)(Fab)

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
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
})

const styles = props => customStyle.enrollScreen

const ViewButton = withStyles(customStyle.proceedBtn)(Button)

const NextButton = withStyles(customStyle.viewBtn)(Button)

const DoneBtn = withStyles(customStyle.doneBtn)(Button)

class NewMedical extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      totalSteps: 4,
      progress: 0,
      disablePrev: false,
      disableNext: true,
      disableFinish: true,
      checkedB: true,
      firstName: '',
      lastName: '',
      socialNumber: '',
      relationship: '',
      showEdit: false,
      membersData: [],
      id: '',
      subId: '',
      isAllDataFilled: true,
      enrollFamilyData: [
        {
          birthDate: '',
          gender: ''
          /*feet: '',
                inches: '',
                weight: ''*/
        }
      ],
      houseHoldData: {},
      loaderShow: false,
      lifeStyleQuestionData: [],
      healthQuestionData: [],
      currentQuestionData: [],
      instructionData: [],
      authorize: false,
      privacyPolicy: false,
      age: null,
      currentUser: '',
      fullName: '',
      totalQueLength: 0,
      sidebarOpen: false,
      dockval: false,
      rightslider: false,
      rightdockval: false,
      programInfo: null,
      eligibleServices: null,
      expenseLimits: null,
      programInfoModal: false,
      network: null,
      channel: null,
      planIds: null,
      contactNumber: null,
      cardId: null,
      showEmpId: false,
      showHealthCard: false,
      visible: false,
      visibleHealthy: false,
      digitalheathcard: null,
      plainId: null,
      alertflag: false,
      loader: false,
      documentsmodal: false,
      contactmodal: false,
      contactCardData: null,
      documentCardData: null,
      notificationData: [],
      notificationCount: 0,
      anchorEl: null,
      open: false,
      unReadData: [],
      showIframe: false,
      commonModuleURL: ''
    }
    this.props.toggleHealthQnEditMode(false)

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
    this.onrightsliderClick = this.onrightsliderClick.bind(this)

    this.leftdrawerclose = this.leftdrawerclose.bind(this)
    this.drawercloseExpenseOpen = this.drawercloseExpenseOpen.bind(this)
    this.documentscardopen = this.documentscardopen.bind(this)
    this.contactscardopen = this.contactscardopen.bind(this)
    this.handleInputValue = this.handleInputValue.bind(this)
  }

  handleInputValue(val) {
    this.setState({ alertflag: val })
  }

  onSetSidebarOpen() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen, dockval: !this.state.dockval, rightslider: false })
  }

  onrightsliderClick() {
    this.setState({ rightslider: !this.state.rightslider, rightdockval: !this.state.rightdockval, sidebarOpen: false, dockval: false })
  }

  drawercloseExpenseOpen() {
    this.setState({ sidebarOpen: false, digitalcard: true })
    this.openProgramInfo()
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
        this.setState({ alertflag: true, loader: false })
      }
    })
  }

  closeProgramModal() {
    this.setState({
      programInfoModal: false
    })
  }

  leftdrawerclose(val) {
    this.setState({ sidebarOpen: false })
    this.onCardClick()
  }

  encryptData = async request => {
    let query = await encryptMemberId(request)
    return query
  }

  getCommonModuleURL = (type, query) => {
    let baseURL = process.env.REACT_APP_COMMON_MODULE_URL
    // baseURL = 'http://localhost:3002/'
    let token = localStorage.getItem('bearerToken')

    return baseURL + 'healthcard?query=' + query + '&token=' + token
  }

  onCardClick = async () => {
    this.setState({ loader: true })

    let memberIdSource = ''
    await getSourceID().then(res => {
      memberIdSource = res.data.memberIdSource
      console.log('Member source id issss in contact cardd', res.data.memberIdSource)
    })
    let memberStatus = ''
    await getMemberStatus(memberIdSource).then(res => {
      memberStatus = res.data
    })
    let type = memberStatus == 'Active' ? 'AC' : 'TE'

    let request = `memberid=${memberIdSource}&type=${type}`
    let query = await this.encryptData(request)
    let _healthCardURL = this.getCommonModuleURL('HEALTHCARD', query)

    this.setState({
      showHealthCard: true,
      visible: true,
      commonModuleURL: _healthCardURL,
      loader: false
    })
  }

  gethealthcarddata() {
    gethealthcard().then(res => {
      if (res.data.memberIdCardList != null) {
        this.setState({ digitalheathcard: res.data, plainId: res.data.memberIdCardList[0].planId })
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
      this.setState({ network: res.data.provider_network })
      this.setState({
        loader: false
      })
    })
  }

  handleClose = () => {
    this.setState({
      visible: false
    })
  }
  handleCloseHealthy = () => {
    this.setState({
      visibleHealthy: false
    })
  }
  documentscardopen() {
    this.setState({ sidebarOpen: false, documentsmodal: true })
  }
  closeDocumentmodal() {
    this.setState({ documentsmodal: false })
  }

  contactscardopen() {
    this.setState({ sidebarOpen: false, contactmodal: true })
  }
  closeContacts() {
    this.setState({ contactmodal: false })
  }

  getDateInUTC = (date, getInMillisecs) => {
    if (date) {
      let newDateTime = new Date(date)

      return new Date(newDateTime)
    }

    return date
  }

  dateformat(date) {
    const enrollmentDate = this.getDateInUTC(date, true)
    let nowdate = this.getDateInUTC(new Date(), true)

    var day = moment(enrollmentDate).format('DD')

    var mon = moment(enrollmentDate).format('MM')

    var year = moment(enrollmentDate).format('YYYY')

    var date = mon + '/' + day + '/' + year

    var todayDate = moment(nowdate).format('MM/DD/YYYY')
    let hr = moment(enrollmentDate).format('hh')

    if (date !== todayDate) {
      return moment(date).format('MMM DD')
    } else {
      if (hr == '00') {
        return moment(enrollmentDate).format('m') + 'mins'
      }
      if (hr > 12) {
        return moment(enrollmentDate).format('hh:mm A')
      } else {
        return moment(enrollmentDate).format('hh:mm A')
      }
    }
  }

  getDateInUTCdob = (date, getInMillisecs) => {
    if (date) {
      let newDateTime = date + new Date(date).getTimezoneOffset() * 60 * 1000
      if (getInMillisecs) {
        return newDateTime
      }
      return new Date(newDateTime)
    }
    return date
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
        visibleHealthy: true,
        loader: false
      })
    } else {
      this.setState({
        showHealthCard: true,
        visible: true,
        loader: false
      })
    }
  }

  goBack = () => {
    this.props.history.push('/')
  }

  reduceProgress = () => {
    if (this.state.count > 0) {
      this.setState({
        count: this.state.count - 1,
        progress: ((this.state.count - 1) / this.state.totalSteps) * 100
      })
    } else {
      this.setState({
        showEdit: false
      })
      this.props.toggleHealthQnEditMode(false)
    }
  }

  increaseProgress = () => {
    if (this.state.count < this.state.totalSteps) {
      this.setState({
        count: this.state.count + 1,
        progress: ((this.state.count + 1) / this.state.totalSteps) * 100
      })
    }
  }

  textChangeHandler = (event, name) => {
    this.state[name] = event.target.value
    this.setState({
      refresh: true
    })
  }

  editButtonHandler = (event, key, flag, index, type) => {
    this.setState({
      loaderShow: true,
      currentUser: key.firstName + ' ' + key.lastName
    })

    let gender = ''
    if (key.gender === 'M') {
      gender = 'MALE'
    } else if (key.gender === 'F') {
      gender = 'FEMALE'
    } else if (key.gender === 'U') {
      gender = 'NEUTRAL'
    }

    let data = [
      {
        dob: key.dob ? this.getDateInUTCdob(parseInt(key.dob, false)) : new Date(),
        gender: key.gender ? gender : '',
        email: key.email ? key.email : '',
        isPrimary: key.memberUniqueId == key.subscriberUniqueId
      }
    ]

    fetch(configuration.baseUrl + '/questionbank/getQuestions')
      .then(response => response.json())
      .then(membersResult => {
        let queResult = membersResult.response.questionList
        let lifeStyleQuestionData = []
        let healthQuestionData = []
        let currentQuestionData = []
        let healthQuestions = []
        for (let i = 0; i < queResult.length; i++) {
          if (key.healthQuestions && key.healthQuestions.length > 0) {
            let found = key.healthQuestions.find(obj => obj.questionID.toString() === queResult[i].question.id.toString())
            let optionId = ''
            let response = ''

            if (queResult[i].question.type === 'radio') {
              if (found.response) {
                let arr = queResult[i].options.find(obj => obj.option === found.response)
                optionId = arr.id
                response = found.response
              } else {
                optionId = ''
                response = ''
              }
            } else if (queResult[i].question.type === 'textbox') {
              response = found.response
              optionId = ''
            } else if (queResult[i].question.type === 'dropdown') {
              console.log('========== found.response ===========')
              console.log(found.response)
              if (found.response) {
                response = found.response.split(',')
              } else {
                response = []
              }
              optionId = ''
            }

            if (queResult[i].question.questionTypeCode === 'LIFESTYLE') {
              lifeStyleQuestionData.push({
                questionID: queResult[i].question.id,
                type: queResult[i].question.type,
                question: queResult[i].question.question,
                questionTypeCode: queResult[i].question.questionTypeCode,
                answer: response,
                optionId: optionId,
                options: queResult[i].options,
                relatedQue: found.reltdQstnID
              })
            } else if (queResult[i].question.questionTypeCode === 'HEALTH') {
              healthQuestionData.push({
                questionID: queResult[i].question.id,
                type: queResult[i].question.type,
                question: queResult[i].question.question,
                questionTypeCode: queResult[i].question.questionTypeCode,
                answer: response,
                optionId: optionId,
                options: queResult[i].options,
                relatedQue: found.reltdQstnID
              })
            } else if (queResult[i].question.questionTypeCode === 'CURRENT') {
              currentQuestionData.push({
                questionID: queResult[i].question.id,
                type: queResult[i].question.type,
                question: queResult[i].question.question,
                questionTypeCode: queResult[i].question.questionTypeCode,
                answer: response,
                optionId: optionId,
                options: queResult[i].options,
                relatedQue: found.reltdQstnID
              })
            }
          } else {
            let relatedQ = []
            let question = queResult[i].question

            if (question.relatedQuestions.length > 0) {
              for (let j = 0; j < question.relatedQuestions.length; j++) {
                let obj = {
                  id: null,
                  questionID: question.relatedQuestions[j].id,
                  responseTypCode: question.relatedQuestions[j].responseTypCode,
                  response: '',
                  questionTypCode: question.questionTypeCode,
                  maintTypCode: null,
                  questionDesc: question.relatedQuestions[j].question
                }

                relatedQ.push(obj)
              }
            }

            let obj = {
              id: null,
              questionID: question.id,
              responseTypCode: question.responseTypCode,
              response: '',
              questionTypCode: question.questionTypeCode,
              questionDesc: question.question,
              reltdQstnID: relatedQ
            }

            healthQuestions.push(obj)

            if (queResult[i].question.questionTypeCode === 'LIFESTYLE') {
              lifeStyleQuestionData.push({
                questionID: queResult[i].question.id,
                type: queResult[i].question.type,
                question: queResult[i].question.question,
                questionTypeCode: queResult[i].question.questionTypeCode,
                answer: '',
                optionId: '',
                options: queResult[i].options,
                relatedQue: relatedQ
              })
            } else if (queResult[i].question.questionTypeCode === 'HEALTH') {
              healthQuestionData.push({
                questionID: queResult[i].question.id,
                type: queResult[i].question.type,
                question: queResult[i].question.question,
                questionTypeCode: queResult[i].question.questionTypeCode,
                answer: '',
                optionId: '',
                options: queResult[i].options,
                relatedQue: relatedQ
              })
            } else if (queResult[i].question.questionTypeCode === 'CURRENT') {
              currentQuestionData.push({
                questionID: queResult[i].question.id,
                type: queResult[i].question.type,
                question: queResult[i].question.question,
                questionTypeCode: queResult[i].question.questionTypeCode,
                answer: '',
                optionId: '',
                options: queResult[i].options,
                relatedQue: relatedQ
              })
            }
          }
        }

        if (key.healthQuestions && key.healthQuestions.length === 0) {
          this.state.membersData[index].healthQuestions = healthQuestions
        }

        let count = key.completionStatus ? key.completionStatus : 0
        var progressVal = 0
        if (flag === 'RESUME') {
          progressVal = (count / this.state.totalSteps) * 100
        }
        let isViewMode = type == 'VIEWMODE' ? true : false
        this.props.toggleHealthQnEditMode(!isViewMode)
        this.setState({
          enrollFamilyData: data,
          showEdit: true,
          viewMode: isViewMode,
          count: count === 4 ? 0 : count,
          progress: progressVal,
          id: key.memberUniqueId,
          subId: key.subscriberUniqueId,
          authorize: type == 'VIEWMODE' ? key.authorize : false,
          privacyPolicy: type == 'VIEWMODE' ? key.privacyPolicy : false,
          // authorize: key.authorize,
          // privacyPolicy: key.privacyPolicy,
          fullName: key.fullName ? key.fullName : '',
          loaderShow: false,
          lifeStyleQuestionData: lifeStyleQuestionData,
          healthQuestionData: healthQuestionData,
          currentQuestionData: currentQuestionData,
          instructionData: membersResult.response.instructionSet
        })
      })
  }

  finishButtonHandler = event => {
    this.setState({
      loaderShow: true
    })

    let gender = ''
    if (this.state.enrollFamilyData[0].gender === 'MALE') {
      gender = 'M'
    } else if (this.state.enrollFamilyData[0].gender === 'FEMALE') {
      gender = 'F'
    } else if (this.state.enrollFamilyData[0].gender === 'NEUTRAL') {
      gender = 'U'
    }
    let user = this.state.membersData.find(obj => obj.memberUniqueId === this.state.id)
    user.authorize = this.state.authorize
    user.privacyPolicy = this.state.privacyPolicy
    user.dob = new Date(this.state.enrollFamilyData[0].dob).getTime()
    user.gender = gender
    user.completionStatus = this.state.count
    user.email = this.state.enrollFamilyData[0].email
    user.fullName = this.state.fullName

    for (let i = 0; i < this.state.lifeStyleQuestionData.length; i++) {
      let findQue = user.healthQuestions.find(
        obj => obj.questionID.toString() === this.state.lifeStyleQuestionData[i].questionID.toString()
      )
      findQue.response = this.state.lifeStyleQuestionData[i].answer.toString()
    }

    for (let i = 0; i < this.state.healthQuestionData.length; i++) {
      let findQue = user.healthQuestions.find(obj => obj.questionID.toString() === this.state.healthQuestionData[i].questionID.toString())
      findQue.response = this.state.healthQuestionData[i].answer.toString()
    }

    for (let i = 0; i < this.state.currentQuestionData.length; i++) {
      let findQue = user.healthQuestions.find(obj => obj.questionID.toString() === this.state.currentQuestionData[i].questionID.toString())
      findQue.response = this.state.currentQuestionData[i].answer.toString()
    }

    let arr = []
    arr.push(user)

    axios
      .post(configuration.baseUrl + '/questionbank/saveHealthQues', arr)
      .then(response => {
        this.setData()
        this.setState({
          showEdit: false
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.setState({
      loaderShow: true
    })
    this.setData()

    getCardDetails().then(res => {
      if (res.data.response) {
        let contactCardData = res.data.response.find(obj => obj.cardtitle === 'ContactInformation')
        let documentCardData = res.data.response.find(obj => obj.cardtitle === 'Documents')
        this.setState({
          contactCardData: contactCardData,
          documentCardData: documentCardData
        })
      }
    })

    const msg = firebase.messaging.isSupported() ? firebase.messaging() : null
    if (msg) {
      msg.onMessage(payload => {
        this.getNotification()
      })
    }
    this.getNotification()
  }

  getNotification() {
    getNotificationDetails().then(res => {
      if (res.data && res.data.response) {
        this.setState(
          {
            notificationData: res.data.response.notificationDetails,
            notificationCount: res.data.response.count
          },
          () => {
            if (this.state.notificationData) {
              let dt = this.state.notificationData.filter((val, index) => val.status == 'sent')
              let newArr = dt.slice(0, 5)
              this.setState({ unReadData: dt })
            }
          }
        )
      } else {
        this.setState({ notificationData: [] })
      }
    })
  }

  setData = () => {
    let mail = localStorage.getItem('userMail')
    let data = {
      email: mail
    }
    let request = { subscriberIdSource: localStorage.getItem('sourceid') }
    axios.post(configuration.baseUrl + '/questionbank/healthinfo', request).then(membersResult => {
      if (membersResult.data.response) {
        let membersData = membersResult.data.response

        fetch(configuration.baseUrl + '/questionbank/getQuestions')
          .then(response => response.json())
          .then(membersResult => {
            let queResult = membersResult.response.questionList

            for (let i = 0; i < membersData.length; i++) {
              let answredCount = 0
              for (let j = 0; j < membersData[i].healthQuestions.length; j++) {
                let data = membersData[i].healthQuestions[j].response
                let relatedQueAns = membersData[i].healthQuestions[j].reltdQstnID

                if (data === 'Yes' && relatedQueAns.length > 0) {
                  if (relatedQueAns[0].response) {
                    answredCount++
                  }
                } else {
                  if (data) {
                    answredCount++
                  }
                }
              }
              membersData[i].totalQuestionLength = answredCount
            }

            this.setState({
              membersData: membersData,
              loaderShow: false,
              totalQueLength: queResult.length
            })
          })
      }
    })
  }

  validateFieldHandler(value, data) {
    let enrollFamilyData = this.state.enrollFamilyData
    enrollFamilyData[this.state.count] = data
    this.setState({
      disableNext: value,
      enrollFamilyData: enrollFamilyData,
      disableFinish: value
    })
  }

  saveQuestionData(value, data, type) {
    if (type === 'LIFESTYLE') {
      this.setState({
        disableNext: value,
        lifeStyleQuestionData: data,
        disableFinish: value
      })
    } else if (type === 'HEALTH') {
      this.setState({
        disableNext: value,
        healthQuestionData: data,
        disableFinish: value
      })
    } else if (type === 'CURRENT') {
      this.setState({
        disableNext: value,
        currentQuestionData: data,
        disableFinish: value
      })
    }
  }

  agreementChangeHandler = (value, authorize, privacyPolicy, fullName) => {
    this.setState({
      authorize: authorize,
      privacyPolicy: privacyPolicy,
      fullName: fullName,
      disableFinish: value,
      disableNext: true
    })
  }

  goBackToHome = () => {
    this.props.toggleExitHealthqnAlert(false)
    this.props.toggleHealthQnEditMode(false)

    if (this.props.healthQnExitAlertTrigger == 'HealthQn') {
      this.props.history.push('/')
    } else {
      logoutApplication()
    }
  }

  showDate = lastUpdatedDate => {
    return moment(lastUpdatedDate).format('MMMM D, YYYY')
  }

  showLastUpdate = () => {
    console.log(this.state.membersData)
    let showLastUpdateTitle = this.state.membersData.some(item => item.completionStatus != 0 || item.lastUpdatedDate)
    if (showLastUpdateTitle) {
      return (
        <div>
          <p className={CustomeCss.status}>{i18n.t('ENROLL_FAMILY.LAST_UPDATE')}</p>
        </div>
      )
    }
    return null
  }

  gotoMemberList = () => {
    this.setState({
      showEdit: false
    })
  }

  openTempModal = () => {
    this.setState({
      sidebarOpen: false,
      tempNotAvailableModal: true
    })
  }

  onClickUpdateNotificationStatus = (id, url, type) => {
    console.log('Notification ID ====', id, url)
    let client_id = localStorage.getItem('CLIENT_ID')
    let obj = { notificationId: id }
    let cardName = ''

    if (url == 'Medical') {
      cardName = 'HealthQuestionnaire'
    }
    if (url == 'Needs' || url == 'MyNeeds') {
      cardName = 'MyNeeds'
    }
    if (url == 'Transaction' || url == 'MobileTransaction') {
      cardName = 'MyTransaction'
    }
    if (url == 'ProgramInformation') {
      cardName = 'ProgramInformation'
    }
    if (url == 'MemberIdcard' || url == 'DigitalHealthCardNew') {
      cardName = 'MembershipId'
    }
    if (url == 'HealthToolCard' || url == 'HealthToolsCard') {
      cardName = 'HealthTool'
    }
    if (url == 'DocumentsScreen') {
      cardName = 'Documents'
    }
    if (url == 'HealthyLife') {
      cardName = 'HealthyLife'
    }
    if (url == 'PaymentWallet') {
      cardName = 'PaymentWallet'
    }
    if (type == undefined) {
      updateNotificationStatus(obj).then(res => {
        console.log('saveUserNotificationDetails=====', res)
      })
    }

    getCardEnableData(client_id, cardName).then(res => {
      if (cardName == 'HealthTool') {
        if (
          (res.data.response.enable == 'true' || res.data.response.enable == true) &&
          (this.state.showhealthtools == 'true' || this.state.showhealthtools == true)
        ) {
          this.showHealthTool()
          this.getNotification()
        } else {
          this.openTempModal()
          this.getNotification()
        }
      }

      if (res.data.response.enable == 'false' || res.data.response.enable == false) {
        this.openTempModal()
        this.getNotification()
        if (type == undefined) {
          updateNotificationStatus(obj).then(res => {
            console.log('saveUserNotificationDetails=====', res)
          })
        }
      } else {
        if (cardName == 'HealthQuestionnaire') {
          window.location.href = '/Medical'
        }
        if (cardName == 'MyNeeds') {
          window.location.href = '/MyNeeds?open=true'
        }

        if (cardName == 'ProgramInformation') {
          window.location.href = '/ProgramInformation'
        }
        if (cardName == 'MembershipId' || cardName == 'HealthyLife') {
          this.leftdrawerclose()
          this.getNotification()
        }
        // if( cardName=='HealthTool'){

        //   this.showHealthTool()
        //   this.getNotification()
        // }
        if (cardName == 'Documents') {
          this.documentscardopen()
          this.getNotification()
        }
        if (cardName == 'MyTransaction') {
          window.location.href = '/Transaction'
        }
        if (cardName == 'PaymentWallet') {
          window.location.href = '/PaymentWallet'
        }
      }
    })
  }

  openCuramLifeCard = () => WebHome.openCuramLifeCard()

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open
    })
  }
  handleClickAway = () => {
    this.setState({
      open: false
      // anchorEl:null
    })
  }
  openChat = () => {
    sessionStorage.setItem('chatwindow', true)
    this.props.history.push('/')
  }
  render() {
    const { classes } = this.props
    let currentScreen, currentStep
    console.log('this.state.count::', this.state.count)
    let finishButton
    if (this.state.count === 0) {
      currentStep = (
        <EnrollNew2
          onClick={this.validateFieldHandler.bind(this)}
          familyData={this.state.enrollFamilyData[this.state.count]}
          instData={this.state.instructionData[this.state.count]}
          age={this.state.age}
          viewMode={this.state.viewMode}
        />
      )
    } else if (this.state.count === 1) {
      currentStep = (
        <EnrollNew3
          onClick={this.saveQuestionData.bind(this)}
          familyData={this.state.lifeStyleQuestionData}
          instData={this.state.instructionData[this.state.count]}
          viewMode={this.state.viewMode}
        />
      )
    } else if (this.state.count === 2) {
      currentStep = (
        <EnrollNew4
          onClick={this.saveQuestionData.bind(this)}
          familyData={this.state.healthQuestionData}
          instData={this.state.instructionData[this.state.count]}
          viewMode={this.state.viewMode}
        />
      )
    } else if (this.state.count === 3) {
      currentStep = (
        <EnrollNew5
          onClick={this.saveQuestionData.bind(this)}
          familyData={this.state.currentQuestionData}
          instData={this.state.instructionData[this.state.count]}
          viewMode={this.state.viewMode}
        />
      )
    } else if (this.state.count === 4) {
      currentStep = (
        <EnrollNew6
          onClick={this.agreementChangeHandler.bind(this)}
          authorize={this.state.authorize}
          privacyPolicy={this.state.privacyPolicy}
          fullName={this.state.fullName}
          viewMode={this.state.viewMode}
        />
      )
    }

    if (this.state.count === 4) {
      finishButton = (
        <button
          type="button"
          disabled={this.state.disableFinish}
          className={
            this.state.disableFinish
              ? 'disabled-btn medical_donebtn border-0 mr-2 text-uppercase'
              : 'medical_donebtn border-0 mr-2 text-uppercase'
          }
          onClick={this.finishButtonHandler}
        >
          {i18n.t('BUTTON.FINISH')}
        </button>
      )
    } else {
      finishButton = (
        <button
          type="button"
          className="medical_donebtn border-0 mr-2 text-uppercase"
          style={{ minWidth: '15%' }}
          onClick={this.finishButtonHandler}
        >
          {i18n.t('BUTTON.FINISH_LATER')}
        </button>
      )
    }
    if (!this.state.showEdit) {
      currentScreen = (
        <Row>
          <Col md={12}>
            <form noValidate autoComplete="off">
              <p className="font-roboto-reg mb-4" style={{ color: 'rgba(0, 0, 0, 0.87) ' }}>
                {i18n.t('ENROLL_FAMILY.SUB_TITLE')}
              </p>
              <Row className="d-flex card-content">
                <Col md={12}>
                  <Row>
                    <Col md={3} className={CustomeCss.nameTitle}>
                      {' '}
                      {i18n.t('ENROLL_FAMILY.HEADER1')}{' '}
                    </Col>
                    <Col md={3} className={CustomeCss.status}>
                      {' '}
                      {i18n.t('ENROLL_FAMILY.STATUS')}
                    </Col>
                    <Col md={3}> </Col>
                    <Col md={3} className="pl-0">
                      {this.showLastUpdate()}
                    </Col>
                  </Row>
                  {this.state.membersData.map((key, index) => (
                    <Row style={customStyle.enrollFamilyDisplay} key={index}>
                      <Col md={3}>
                        <p className={CustomeCss.name} style={{ fontSize: '14px' }}>
                          {key.firstName + ' ' + key.lastName}
                        </p>
                      </Col>
                      <Col md={3}>
                        {(key.totalQuestionLength / this.state.totalQueLength) * 100 === 100 ? (
                          <LinearProgress
                            value={(key.totalQuestionLength / this.state.totalQueLength) * 100}
                            variant="determinate"
                            classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimaryComplete }}
                            style={customStyle.mt10}
                          />
                        ) : (
                          <LinearProgress
                            value={(key.totalQuestionLength / this.state.totalQueLength) * 100}
                            variant="determinate"
                            classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}
                            style={customStyle.mt10}
                          />
                        )}
                      </Col>
                      {key.completionStatus === 0 ? (
                        <div className="d-flex flex-row w-25 pl-3">
                          <button
                            type="button"
                            className="d-flex justify-content-center align-items-center status-btn mx-1 mb-2"
                            style={{ width: '38%' }}
                            onClick={event => this.editButtonHandler(event, key, 'START', index)}
                          >
                            {key.lastUpdatedDate ? 'RESUME' : 'START'}
                            {/* START */}
                          </button>
                        </div>
                      ) : key.completionStatus === 4 ? (
                        <div className="d-flex flex-row w-25 pl-3">
                          <button
                            type="button"
                            className="d-flex justify-content-center align-items-center status-btn mx-1 mb-2 text-uppercase"
                            style={{ width: '38%' }}
                            onClick={event => this.editButtonHandler(event, key, 'START', index)}
                          >
                            {i18n.t('BUTTON.EDIT')}
                          </button>
                          <button
                            type="button"
                            className="d-flex justify-content-center align-items-center status-btn mx-1 mb-2 text-uppercase"
                            style={{ width: '38%' }}
                            onClick={event => this.editButtonHandler(event, key, 'START', index, 'VIEWMODE')}
                          >
                            VIEW
                          </button>
                        </div>
                      ) : (
                        <div className="d-flex flex-row w-25 pl-3">
                          <button
                            type="button"
                            className="d-flex justify-content-center align-items-center status-btn mx-1 mb-2 text-uppercase"
                            style={{ width: '38%' }}
                            onClick={event => this.editButtonHandler(event, key, 'RESUME', index)}
                          >
                            {i18n.t('BUTTON.RESUME')}
                          </button>
                        </div>
                      )}
                      <div>{key.lastUpdatedDate && <p className={CustomeCss.lastDate}> {this.showDate(key.lastUpdatedDate)} </p>}</div>
                    </Row>
                  ))}
                </Col>
              </Row>
            </form>
          </Col>

          <Col className="py-3 card-bottom" style={{ marginTop: '1.75rem' }}>
            <Row>
              <Col md={8} className="d-flex align-items-center">
                <button
                  type="button"
                  className="medical_donebtn border-0 mr-2 text-uppercase"
                  style={{ minWidth: '15%' }}
                  onClick={this.goBack}
                >
                  {i18n.t('BUTTON.BACK')}
                </button>
              </Col>
              <Col md={4} className=" d-flex flex-column align-items-end">
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
              </Col>
            </Row>
          </Col>
        </Row>
      )
    } else if (this.state.showEdit) {
      console.log('viewMode:::', this.state.viewMode)
      currentScreen = (
        <div
          style={{
            width: '100%'
          }}
        >
          <div>
            <div className="uname font-roboto-medium">{this.state.currentUser}</div>
            <LinearProgress
              variant="determinate"
              classes={{ colorPrimary: classes.progresscolorPrimary, barColorPrimary: classes.progressbarColorPrimaryNew }}
              style={classes.progress}
              value={this.state.progress}
            />
            <div style={customStyle.EnrollNew1}>{currentStep}</div>
          </div>

          <Row className="d-flex justify-content-between card-bottom">
            <Col md={8} className="d-flex  align-items-center">
              <button
                type="button"
                className="medical_donebtn border-0 mr-2 text-uppercase"
                style={{ minWidth: '15%' }}
                onClick={this.reduceProgress}
              >
                {i18n.t('BUTTON.BACK')}
              </button>
              {this.state.viewMode ? (
                <button
                  type="button"
                  className="medical_donebtn border-0 mr-2 text-uppercase"
                  style={{ minWidth: '15%' }}
                  onClick={this.state.count === this.state.totalSteps ? this.gotoMemberList : this.increaseProgress}
                >
                  {this.state.count === this.state.totalSteps ? 'Finish' : 'Next'}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={this.state.disableNext}
                  className={
                    this.state.disableNext
                      ? 'disabled-btn medical_donebtn border-0 mr-2 text-uppercase'
                      : 'medical_donebtn border-0 mr-2 text-uppercase'
                  }
                  onClick={this.increaseProgress}
                >
                  {i18n.t('BUTTON.NEXT')}
                </button>
              )}
              {this.state.viewMode ? null : finishButton}
            </Col>

            <Col md={4} className="py-2">
              <div className="medical_need_help_div d-flex justify-content-end py-2">
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
            </Col>
          </Row>
        </div>
      )
    }

    return (
      <div>
        {this.state.loader ? <CommonLoader /> : null}
        <Sidebar
          sidebar={
            <LeftDrawer
              name={'Medical Questionnaire'}
              drawercloseparent={this.leftdrawerclose}
              drawercloseExpenseOpen={this.drawercloseExpenseOpen}
              documentsopen={this.documentscardopen}
              contactopen={this.contactscardopen}
              openTempModal={this.openTempModal}
              openccuramlife={this.openCuramLifeCard}
            />
          }
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: 'white', width: '304px', position: 'fixed' } }}
        >
          {/* ====================right slider========== */}

          <Sidebar
            sidebar={<RightDrawer />}
            open={this.state.rightslider}
            onSetOpen={this.onrightsliderClick}
            pullRight={true}
            styles={{
              sidebar: {
                background: 'white',
                width: '360px',
                position: 'fixed'
              }
            }}
          >
            <div class="h_new">
              <div class="h_left_icon_div">
                <div class="h_menuicon_draweropen">
                  <MenuIcon style={{ color: '#ffffff' }} onClick={() => this.onSetSidebarOpen()} />
                </div>
                <Link to="/">
                  <img src={require('../../Images/HomeIcon/logo (1).svg')} class="h_white_logo" />
                </Link>
              </div>

              <div class="d-flex">
                <div className="appsicon_cursor">
                  <IconButton onClick={this.handleClick}>
                    <Badge badgeContent={this.state.notificationCount} color="error">
                      <NotificationsIcon style={{ color: '#ffffff' }} />
                    </Badge>
                  </IconButton>
                  <Popper transition open={this.state.open} anchorEl={this.state.anchorEl} className="notification_paper_shadow">
                    {({ TransitionProps }) => (
                      <ClickAwayListener onClickAway={this.handleClickAway}>
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper>
                            {this.state.unReadData &&
                              this.state.unReadData.slice(0, 5).map((data, index) => {
                                return data.status == 'sent' && (data.type == 'REMINDER' || data.type == 'reminder') ? (
                                  <div
                                    key={index}
                                    className="notification_details_mainDiv"
                                    onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                  >
                                    <img src={ReminderNotification} className="Notification_category_img_details" />

                                    <div className="notification_category_Message_details">
                                      <p className="notification_category_label_details">
                                        {data.title}
                                        <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                      </p>
                                      <div className="notification_details_message">{data.message}</div>
                                    </div>
                                  </div>
                                ) : data.status == 'sent' && (data.type == 'ALERT' || data.type == 'alert') ? (
                                  <div
                                    key={index}
                                    className="notification_details_mainDiv"
                                    onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                  >
                                    <img src={AlertNotification} className="Notification_category_img_details" />
                                    <div className="notification_category_Message_details">
                                      <p className="notification_category_label_details">
                                        {data.title}
                                        <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                      </p>
                                      <div className="notification_details_message">{data.message}</div>
                                    </div>
                                  </div>
                                ) : data.status == 'sent' && (data.type == 'UPDATE' || data.type == 'update') ? (
                                  <div
                                    key={index}
                                    className="notification_details_mainDiv"
                                    onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                  >
                                    <img src={UpdateNotification} className="Notification_category_img_details" />
                                    <div className="notification_category_Message_details">
                                      <p className="notification_category_label_details">
                                        {data.title}
                                        <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                      </p>
                                      <div className="notification_details_message">{data.message}</div>
                                    </div>
                                  </div>
                                ) : data.status == 'sent' && (data.type == 'SURVEY' || data.type == 'survey') ? (
                                  <div
                                    key={index}
                                    className="notification_details_mainDiv"
                                    onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                  >
                                    <img src={SurveyNotification} className="Notification_category_img_details" />
                                    <div className="notification_category_Message_details">
                                      <p className="notification_category_label_details">
                                        {data.title}
                                        <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                      </p>
                                      <div className="notification_details_message">{data.message}</div>
                                    </div>
                                  </div>
                                ) : data.status == 'sent' && (data.type == 'PROMOTIONAL' || data.type == 'promotional') ? (
                                  <div
                                    key={index}
                                    className="notification_details_mainDiv"
                                    onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                  >
                                    <img src={PromoNotification} className="Notification_category_img_details" />
                                    <div className="notification_category_Message_details">
                                      <p className="notification_category_label_details">
                                        {data.title}
                                        <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                      </p>
                                      <div className="notification_details_message">{data.message}</div>
                                    </div>
                                  </div>
                                ) : data.status == 'sent' && (data.type == 'ANNOUNCEMENT' || data.type == 'announcement') ? (
                                  <div
                                    key={index}
                                    className="notification_details_mainDiv"
                                    onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath, data.type)}
                                  >
                                    <img src={AnnouncementNotification} className="Notification_category_img_details" />
                                    <div className="notification_category_Message_details">
                                      <p className="notification_category_label_details">
                                        {data.title}
                                        <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                      </p>
                                      <div className="notification_details_message">{data.message}</div>
                                    </div>
                                  </div>
                                ) : null
                              })}

                            {this.state.unReadData && this.state.unReadData.length >= 5 ? (
                              <div class="notification_details_seeAll">
                                <div class="notification_category_Message_details">
                                  <p class="notification_category_label_details">
                                    <Link
                                      to="/Notification"
                                      style={{ textDecoration: 'none' }}
                                      onClick={() => this.setState({ notificationCount: 0 })}
                                    >
                                      {' '}
                                      <span className="notification_details_Date">See all</span>
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            ) : null}
                          </Paper>
                        </Fade>
                      </ClickAwayListener>
                    )}
                  </Popper>
                </div>
              </div>
            </div>

            <Container fluid style={{ marginBottom: '4rem' }}>
              <div class="webhome_tooltip_container_medical mr-2">
                <div class="web_tooltiop_member_container">
                  <div class="web_orange_tag" onClick={() => this.onrightsliderClick()}>
                    <img src={require('../../Images/Drawer/my health icon.png')} class="web_patch_icon" />
                    <div class="web_patch_text">Member Apps</div>
                  </div>
                  <div
                    class="web_yellow_tag"
                    onClick={() => {
                      sessionStorage.setItem('chatwindow', true)
                      this.props.history.push('/')
                    }}
                  >
                    <img src={require('../../Images/Drawer/my health.svg')} class="web_patch_icon_yellow" />
                    <div class="web_patch_text_yellow">AI Assistant</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '-48px', position: 'absolute', marginLeft: '35px' }}>
                <sapn className="Back_page" onClick={this.goBack}>
                  <ArrowBackIcon style={{ width: '24px', height: '24px', color: ' #543379', marginRight: '5px' }} onClick={this.goBack} />
                  BACK
                </sapn>
              </div>
              <Row className="d-flex justify-content-center custom-margin-top">
                <Col md={11} className="bg-white rounded-top px-3 pb-3">
                  <div className="medical_header text-uppercase d-flex align-items-center">Health Questionnaire</div>
                </Col>
                <Col md={11} className="bg-white">
                  {this.state.loaderShow ? <CommonLoader /> : ''}
                  {currentScreen}
                  <ExitConfirm
                    open={this.props.showHealthQnExitAlert}
                    handleCancel={() => this.props.toggleExitHealthqnAlert(false)}
                    handleContinue={this.goBackToHome}
                  />
                </Col>
              </Row>

              {/* =============================healthcard modal=============== */}

              <Modal2
                style={{
                  overflow: 'auto',
                  height: '100%',
                  top: '10%',
                  left: '25%'
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
                // onClose={this.handleClose}
              >
                <div>
                  <div
                    style={{
                      display: this.state.showIframe ? 'flex' : 'none',
                      justifyContent: 'flex-end',
                      background: '#f1f1f1',
                      borderTopLeftRadius: '5px',
                      borderTopRightRadius: '5px',
                      width: '725px'
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

              {this.state.digitalheathcard &&
              this.state.network &&
              (localStorage.getItem('CLIENT_ID') == '6548' ||
                localStorage.getItem('CLIENT_ID') == 6548 ||
                localStorage.getItem('CLIENT_ID') == '4367' ||
                localStorage.getItem('CLIENT_ID') == 4367 ||
                localStorage.getItem('CLIENT_ID') == '5540' ||
                localStorage.getItem('CLIENT_ID') == 5540 ||
                localStorage.getItem('CLIENT_ID') == '4376' ||
                localStorage.getItem('CLIENT_ID') == 4376) ? (
                <Modal2
                  style={{
                    overflow: 'auto',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={this.state.visibleHealthy}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500
                  }}
                >
                  <Fade in={this.state.visibleHealthy}>
                    <HealthyLifeCard
                      handleClose={this.handleCloseHealthy}
                      data={this.state.digitalheathcard}
                      cardId={this.state.cardId}
                      network={this.state.network}
                      contactNumber={this.state.contactNumber}
                      showEmpId={this.state.showEmpId}
                    />
                  </Fade>
                </Modal2>
              ) : null}

              {this.state.programInfo && this.state.eligibleServices && this.state.expenseLimits ? (
                <Modal
                  show={this.state.programInfoModal}
                  style={{ overflowY: 'hidden' }}
                  animation="fadeInUp"
                  onHide={() => this.closeProgramModal()}
                >
                  <Modal.Header closeButton style={{ fontFamily: 'Roboto', color: '#5f2161', fontWeight: 500 }}>
                    <div style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }} class="ld_image_div_container">
                      <img src={require('../../Images/LeftDrawer Icon/program-info-icon-active.svg')} style={{ marginRight: '20px' }} />
                    </div>
                    Program Information
                  </Modal.Header>

                  <ProgramInfo
                    programInfo={this.state.programInfo}
                    cardDetails={this.state.eligibleServices}
                    expensData={this.state.expenseLimits}
                  />
                </Modal>
              ) : null}

              <Modal1 visible={this.state.documentsmodal} width="23%" effect="fadeInUp">
                <div>
                  {this.state.documentCardData && (
                    <DocumentsCardNew
                      documentCardData={this.state.documentCardData}
                      close={true}
                      onClick={() => this.closeDocumentmodal()}
                    />
                  )}
                </div>
              </Modal1>

              <Modal1 visible={this.state.contactmodal} width="23%" effect="fadeInUp">
                <div>
                  {this.state.contactCardData && (
                    <ContactInformationCard
                      contactCardData={this.state.contactCardData}
                      close={true}
                      onClick={() => this.closeContacts()}
                    />
                  )}
                </div>
              </Modal1>

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
            </Container>

            <CommonFooter />
          </Sidebar>
        </Sidebar>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('ownProps::', ownProps)
  return {
    showHealthQnExitAlert: state.healthQn.showHealthQnExitAlert,
    history: ownProps.history,
    healthQnExitAlertTrigger: state.healthQn.healthQnExitAlertTrigger
  }
}

const mapDispatchToProps = {
  toggleHealthQnEditMode,
  toggleExitHealthqnAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, useStyles)(NewMedical))
