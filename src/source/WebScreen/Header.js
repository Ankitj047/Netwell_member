import Backdrop from '@material-ui/core/Backdrop'
import Badge from '@material-ui/core/Badge'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import Modal2 from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import moment from 'moment'
import React from 'react'
import Modal1 from 'react-awesome-modal'
import { Button, Modal } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import customStyle from '../../components/healthqn/CSS/stylesheet_UHS'
import firebase from '../../firebase'
import {
  getCardDetails,
  getCardEnableData,
  gethealthcard,
  getNetworkName,
  getNotificationDetails,
  getProgramInfo,
  updateNotificationStatus
} from '../ApiCall'
import AlertNotification from '../Images/notification/notification_alert_icon.svg'
import AnnouncementNotification from '../Images/notification/notification_announcement_icon.svg'
import PromoNotification from '../Images/notification/notification_promo_icon.svg'
import ReminderNotification from '../Images/notification/notification_reminder_icon.svg'
import SurveyNotification from '../Images/notification/notification_survey_icon.svg'
import UpdateNotification from '../Images/notification/notification_update_icon.svg'
import ContactInformationCard from '../WebScreen/ContactInformationCard'
import DocumentsCardNew from '../WebScreen/DocumentsCardNew'
import IDCard from '../WebScreen/HealthCard/IDCard'
import ProgramInfo from '../WebScreen/programInfo/programInfo'
import CuramLifeCardNotification from './CuramLifeCard/CuramLifeCardNotification'
import HealthyShareIDCard from './HealthyShare Card/IDCard'
import LeftDrawer from './LeftDrawer'
import RightDrawer from './RightDrawer'
import './WebScreens.css'

const NextButton = withStyles(customStyle.viewBtn)(Button)

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: false,
      dockval: false,
      rightslider: false,
      rightdockval: false,
      showHealthCard: false,
      contactCardData: null,
      documentCardData: null,
      notificationData: [],
      notificationCount: 0,
      anchorEl: null,
      open: false,
      unReadData: [],
      visibleHealthy: false,
      curamLifeCardOpen: false
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
    this.onrightsliderClick = this.onrightsliderClick.bind(this)
    this.leftdrawerclose = this.leftdrawerclose.bind(this)
    this.drawercloseExpenseOpen = this.drawercloseExpenseOpen.bind(this)
    this.documentscardopen = this.documentscardopen.bind(this)
    this.contactscardopen = this.contactscardopen.bind(this)

    this.child = React.createRef()
  }

  componentDidMount() {
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
        this.getCount()
        const myEvent = new CustomEvent('myevent1', {
          detail: {},
          bubbles: true,
          cancelable: true,
          composed: false
        })
        document.dispatchEvent(myEvent)
      })
    }
    this.getCount()
  }

  openCuramLifeCard = () => {
    this.setState({ sidebarOpen: false, curamLifeCardOpen: true })
  }

  closeCuramLifeCard = () => {
    this.setState({ curamLifeCardOpen: false })
  }

  getCount() {
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
              this.setState({ unReadData: dt })
            }
          }
        )
      } else {
        this.setState({ notificationData: [] })
      }
    })
  }

  leftdrawerclose(val) {
    this.setState({ sidebarOpen: false })
    this.onCardClick()
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

  closeProgramModal() {
    this.setState({
      programInfoModal: false
    })
  }

  onSetSidebarOpen() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen, dockval: !this.state.dockval, rightslider: false })
  }

  onrightsliderClick() {
    this.setState({ rightslider: !this.state.rightslider, rightdockval: !this.state.rightdockval, sidebarOpen: false, dockval: false })
  }
  onCardClick = () => {
    this.setState({ loader: true })
    this.gethealthcarddata()
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
        loader: false,
        visible: false
      })
    } else {
      this.setState({
        showHealthCard: true,
        visible: true,
        visibleHealthy: false
      })
    }
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
        showEmpId: false
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
        showEmpId: true
      })
    }

    if (this.state.plainId == '8011') {
      this.setState({
        showEmpId: true
      })
    }

    if (this.state.plainId == '9011') {
      this.setState({
        showEmpId: true
      })
    }

    if (this.state.plainId == '10011') {
      this.setState({
        showEmpId: true
      })
    }

    if (this.state.plainId == '11011') {
      this.setState({
        showEmpId: true
      })
    }

    if (this.state.plainId == '12011') {
      this.setState({
        showEmpId: true
      })
    }

    if (this.state.plainId == '13011') {
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
        visible: false
      })
    } else {
      this.setState({
        showHealthCard: true,
        visible: true,
        visibleHealthy: false,
        loader: false
      })
    }
  }

  openTempModal = () => {
    this.setState({
      sidebarOpen: false,
      tempNotAvailableModal: true
    })
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

  onClickUpdateNotificationStatus = (id, url, type) => {
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
      updateNotificationStatus(obj).then(res => {})
    }
    getCardEnableData(client_id, cardName).then(res => {
      if (cardName == 'HealthTool') {
        if (
          (res.data.response.enable == 'true' || res.data.response.enable == true) &&
          (this.state.showhealthtools == 'true' || this.state.showhealthtools == true)
        ) {
          this.showHealthTool()
          this.getCount()
        } else {
          this.openTempModal()
          this.getCount()
        }
      }

      if (res.data.response.enable == 'false' || res.data.response.enable == false) {
        this.openTempModal()
        this.getCount()
        if (type == undefined) {
          updateNotificationStatus(obj).then(res => {})
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
          this.getCount()
        }

        if (cardName == 'Documents') {
          this.documentscardopen()
          this.getCount()
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

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open
    })
  }
  handleClickAway = () => {
    this.setState({
      open: false
    })
  }
  render() {
    return (
      <Sidebar
        sidebar={
          <LeftDrawer
            name={this.props.name}
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
        styles={{ sidebar: { background: 'white', width: '304px', height: '100%', position: 'fixed' } }}
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
              zIndex: 4,
              position: 'fixed'
            }
          }}
        >
          <div class="">
            {/* ===============header============ */}
            <div class="h_new" style={{ position: 'fixed', width: '100%' }}>
              <div class="h_left_icon_div">
                <div class="h_menuicon_draweropen">
                  <MenuIcon style={{ color: '#ffffff' }} onClick={() => this.onSetSidebarOpen()} />
                </div>
                <Link to="/">
                  <img src={require('../Images/HomeIcon/logo (1).svg')} class="h_white_logo" />
                </Link>
              </div>

              <div className="d-flex">
                <div className="appsicon_cursor">
                  <div>
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
            </div>

            <div class="webhome_tooltip_container_medical mr-2">
              <div class="web_tooltiop_member_container">
                <div class="web_orange_tagh" onClick={() => this.onrightsliderClick()}>
                  <img src={require('../Images/Drawer/my health icon.png')} class="web_patch_icon" />
                  <div class="web_patch_text">Member Apps</div>
                </div>
                <div
                  class="web_yellow_tagh"
                  onClick={() => {
                    sessionStorage.setItem('chatwindow', true)
                    this.props.history.push('/')
                  }}
                >
                  <img src={require('../Images/Drawer/my health.svg')} class="web_patch_icon_yellow" />
                  <div class="web_patch_text_yellow">AI Assistant</div>
                </div>
              </div>
            </div>
          </div>

          {/* =============================healthcard modal=============== */}

          {this.state.digitalheathcard && this.state.network ? (
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
              open={this.state.visible}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={this.state.visible}>
                <IDCard
                  handleClose={this.handleClose}
                  data={this.state.digitalheathcard}
                  cardId={this.state.cardId}
                  network={this.state.network}
                  contactNumber={this.state.contactNumber}
                  showEmpId={this.state.showEmpId}
                />
              </Fade>
            </Modal2>
          ) : null}

          {/* -------------------------------Healthy share card----------------------- */}

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
                <HealthyShareIDCard
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
                  <img src={require('../Images/LeftDrawer Icon/program-info-icon-active.svg')} style={{ marginRight: '20px' }} />
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
                <DocumentsCardNew documentCardData={this.state.documentCardData} close={true} onClick={() => this.closeDocumentmodal()} />
              )}
            </div>
          </Modal1>

          <Modal1 visible={this.state.contactmodal} width="23%" effect="fadeInUp">
            <div>
              {this.state.contactCardData && (
                <ContactInformationCard contactCardData={this.state.contactCardData} close={true} onClick={() => this.closeContacts()} />
              )}
            </div>
          </Modal1>

          <Modal1 visible={this.state.curamLifeCardOpen} effect="fadeInUp">
            <div>
              <CuramLifeCardNotification closeCuramLifeCard={this.closeCuramLifeCard} />
            </div>
          </Modal1>

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
        </Sidebar>
      </Sidebar>
    )
  }
}

export default withRouter(Header)
