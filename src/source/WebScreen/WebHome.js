import { Grid } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import moment from 'moment'
import React from 'react'
import Modal1 from 'react-awesome-modal'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import customStyle from '../../components/healthqn/CSS/stylesheet_UHS'
import firebase from '../../firebase'
import { getOs } from '../../utils/utility'
import {
  getCardDetails,
  getCardEnableData,
  getHealthqnInfo,
  getNotificationDetails,
  getsharingguidlineslink,
  getSourceID,
  getWelcomeBooklet,
  healthtools,
  updateNotificationStatus
} from '../ApiCall'
import CommonLoader from '../CommonLoader'
import NotificationIcon from '../Images/notification/my_notifications_icon_active.svg'
import AlertNotification from '../Images/notification/notification_alert_icon.svg'
import AnnouncementNotification from '../Images/notification/notification_announcement_icon.svg'
import PromoNotification from '../Images/notification/notification_promo_icon.svg'
import ReminderNotification from '../Images/notification/notification_reminder_icon.svg'
import SurveyNotification from '../Images/notification/notification_survey_icon.svg'
import UpdateNotification from '../Images/notification/notification_update_icon.svg'
import ContactInformationCard from '../WebScreen/ContactInformationCard'
import MyCommunityCard from '../WebScreen/MyCommunityCard'
import AnnouncementCard from './AnnouncementNotification'
import ChatWindow from './ChatBox/ChatWindow'
import CommonFooter from './CommonFooter'
import CuramLifeCard from './CuramLifeCard'
import CuramLifeCardNotification from './CuramLifeCard/CuramLifeCardNotification'
import DocumentsCardNew from './DocumentsCardNew'
import LeftDrawer from './LeftDrawer'
import RightDrawer from './RightDrawer'
import SmallCard from './SmallCard'
import './WebScreens.css'

const NextButton = withStyles(customStyle.viewBtn)(Button)

class WebHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: false,
      dockval: false,
      rightslider: false,
      rightdockval: false,
      showHealthCard: false,
      bigcard: '',
      smallcard: '',
      rightcard: '',
      x: false,
      yellowPopup: false,
      username: localStorage.getItem('subscriberName'),
      digitalcard: false,
      documentsmodal: false,
      contactmodal: false,
      mqmoduleAlert: false,
      mqloader: false,
      myneedsfooter: false,
      contactCardData: null,
      documentCardData: null,
      tempNotAvailableModal: false,
      notificationData: [],
      unReadData: [],
      notificationCount: 0,
      anchorEl: null,
      open: false,
      show: false,
      showhealthtools: false,
      memberServices: sessionStorage.getItem('chatwindow') == 'true',
      curamLifeCardOpen: false
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
    this.onrightsliderClick = this.onrightsliderClick.bind(this)
    this.leftdrawerclose = this.leftdrawerclose.bind(this)
    this.drawercloseExpenseOpen = this.drawercloseExpenseOpen.bind(this)
    this.documentscardopen = this.documentscardopen.bind(this)
    this.contactscardopen = this.contactscardopen.bind(this)

    this.child = React.createRef()
    this.childsmallcard = React.createRef()
  }

  onIDCardPush = component => {
    this.child.current.onIDCardPush(component)
  }

  componentDidMount() {
    var healthalert = localStorage.getItem('healthQuestionModal')

    this.getNotification()
    this.loadQueryParams()
    this.getSourceIDbyemail()
    this.gethealthtoolsdata()
    if (healthalert == 'true') {
      this.gethqmoduleinfo()
    }
    var popupShow = localStorage.getItem('popupShow')
    this.setState({ yellowPopup: popupShow })

    const msg = firebase.messaging.isSupported() ? firebase.messaging() : null
    if (msg) {
      msg.onMessage(payload => {
        this.getNotification()
        const myEvent = new CustomEvent('myevent', {
          detail: {},
          bubbles: true,
          cancelable: true,
          composed: false
        })
        document.dispatchEvent(myEvent)
      })
    }

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
  }

  loadQueryParams = () => {
    if (localStorage.getItem('openModal') == 'true') {
      this.openTempModal()
      localStorage.removeItem('openModal')
    }
    if (localStorage.getItem('memberId') == 'true') {
      this.setState({ loader: true })
      this.leftdrawerclose()
      this.setState({ loader: false })

      localStorage.removeItem('memberId')
    }
    if (localStorage.getItem('healthTool') == 'true') {
      this.setState({ loader: true })
      this.showHealthTool()
      this.setState({ loader: false })

      localStorage.removeItem('healthTool')
    }
    if (localStorage.getItem('document') == 'true') {
      this.setState({ loader: true })
      this.documentscardopen()
      this.setState({ loader: false })

      localStorage.removeItem('document')
    }
  }

  gethealthtoolsdata() {
    healthtools().then(res => {
      if (res) {
        if (typeof res.data === 'string') {
          localStorage.setItem('HealthTool', true)
          this.setState({ showhealthtools: true, loader: false })
        } else {
          localStorage.setItem('HealthTool', false)
          this.setState({ showhealthtools: false, loader: false })
        }
      } else {
        localStorage.setItem('HealthTool', false)
        this.setState({ showhealthtools: false, loader: false })
      }
    })
  }
  getNotification = () => {
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

  onClickUpdateNotificationStatus = (id, url, type) => {
    let client_id = localStorage.getItem('CLIENT_ID')
    let obj = { notificationId: id }
    let cardName = ''

    updateNotificationStatus(obj).then(res => {})

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
        updateNotificationStatus(obj).then(res => {})
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

  getSourceIDbyemail() {
    getSourceID().then(res => {
      localStorage.setItem('sourceid', res.data.memberIdSource)
      if (localStorage.getItem('skip') != 'true') {
        this.gethqmoduleinfo()
      }
    })
  }

  showHealthTool = () => {
    this.setState({ show: true })
    this.childsmallcard.current.openHealthTools()
  }

  yellowpopupClose() {
    localStorage.setItem('popupShow', 'false')
    this.setState({ yellowPopup: false })
  }

  gethqmoduleinfo() {
    this.setState({ mqloader: true })
    getHealthqnInfo().then(res => {
      let counter = 0
      let showHealthQNNotification = false
      this.setState({ mqmoduleAlert: false })
      if (res.data.response && res.data.response.length > 0) {
        res.data.response.forEach(item => {
          counter = item.completionStatus == 4 ? counter + 1 : counter
          this.setState({ mqloader: false })
        })
        if (counter != res.data.response.length) {
          showHealthQNNotification = true
          this.setState({ mqmoduleAlert: true, mqloader: false })
        }
      }
    })
  }

  forceUpdateHandler() {
    this.forceUpdate()
  }

  openTempModal = () => {
    this.setState({
      sidebarOpen: false,
      tempNotAvailableModal: true
    })
  }

  onSetSidebarOpen() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen, dockval: !this.state.dockval, rightslider: false })
  }

  onrightsliderClick() {
    this.setState({ rightslider: !this.state.rightslider, rightdockval: !this.state.rightdockval, sidebarOpen: false, dockval: false })
  }
  onCardClick = () => {
    this.setState({
      showHealthCard: true
    })
  }

  leftdrawerclose(val) {
    this.setState({ sidebarOpen: false })
    this.childsmallcard.current.onCardClick()
  }
  drawercloseExpenseOpen() {
    this.setState({ sidebarOpen: false, digitalcard: true })
    this.childsmallcard.current.openProgramInfo()
  }

  documentscardopen(flag, enable) {
    this.setState({ sidebarOpen: false, documentsmodal: true })
  }
  closeDocumentmodal() {
    this.setState({ documentsmodal: false })
  }

  contactscardopen() {
    this.setState({ sidebarOpen: false, contactmodal: true })
  }

  openCuramLifeCard = () => {
    this.setState({ sidebarOpen: false, curamLifeCardOpen: true })
  }

  closeContacts() {
    this.setState({ contactmodal: false })
  }

  closeCuramLifeCard = () => {
    this.setState({ curamLifeCardOpen: false })
  }

  closeMqalert() {
    localStorage.setItem('healthQuestionModal', 'false')
    localStorage.setItem('skip', 'true')
    this.setState({ mqmoduleAlert: false })
  }

  mqAlertyes() {
    this.setState({ mqloader: true })
    localStorage.setItem('healthQuestionModal', 'false')
    this.setState({ mqmoduleAlert: false })

    window.location.href = '/Medical'
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

  closeTempModal = () => {
    this.setState({ tempNotAvailableModal: false })
  }
  toggleMemberServices = memberServices => {
    this.setState({ memberServices: !memberServices })
    sessionStorage.setItem('chatwindow', !memberServices)
    this.props.history.push('/chatwindow')
  }

  render() {
    return (
      <Sidebar
        sidebar={
          <LeftDrawer
            name={'Dashboard'}
            drawercloseparent={this.leftdrawerclose}
            drawercloseExpenseOpen={this.drawercloseExpenseOpen}
            documentsopen={this.documentscardopen}
            contactopen={this.contactscardopen}
            openTempModal={this.openTempModal}
            openccuramlife={this.openCuramLifeCard}
            closeCuramLifeCard={this.closeCuramLifeCard}
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
          <div class="" id="1">
            {/* ===============header============ */}
            <div class="h_new" id="2">
              <div class="h_left_icon_div" id="3">
                <div class="h_menuicon_draweropen">
                  <MenuIcon style={{ color: '#ffffff' }} onClick={() => this.onSetSidebarOpen()} />
                </div>
                <Link to="/">
                  <img src={require('../Images/HomeIcon/logo (1).svg')} class="h_white_logo" />
                </Link>
              </div>

              <div class="d-flex" id="4">
                <div class="appsicon_cursor">
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
                                      class="notification_details_mainDiv"
                                      onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                    >
                                      <img src={ReminderNotification} class="Notification_category_img_details" />
                                      <div class="notification_category_Message_details">
                                        <p class="notification_category_label_details">
                                          {data.title}
                                          <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                        </p>

                                        <div className="notification_details_message">{data.message}</div>
                                      </div>
                                    </div>
                                  ) : data.status == 'sent' && (data.type == 'ALERT' || data.type == 'alert') ? (
                                    <div
                                      key={index}
                                      class="notification_details_mainDiv"
                                      onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                    >
                                      <img src={AlertNotification} class="Notification_category_img_details" />
                                      <div class="notification_category_Message_details">
                                        <p class="notification_category_label_details">
                                          {data.title}
                                          <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                        </p>
                                        <div className="notification_details_message">{data.message}</div>
                                      </div>
                                    </div>
                                  ) : data.status == 'sent' && (data.type == 'UPDATE' || data.type == 'update') ? (
                                    <div
                                      key={index}
                                      class="notification_details_mainDiv"
                                      onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                    >
                                      <img src={UpdateNotification} class="Notification_category_img_details" />
                                      <div class="notification_category_Message_details">
                                        <p class="notification_category_label_details">
                                          {data.title}
                                          <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                        </p>
                                        <div className="notification_details_message">{data.message}</div>
                                      </div>
                                    </div>
                                  ) : data.status == 'sent' && (data.type == 'SURVEY' || data.type == 'survey') ? (
                                    <div
                                      key={index}
                                      class="notification_details_mainDiv"
                                      onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                    >
                                      <img src={SurveyNotification} class="Notification_category_img_details" />
                                      <div class="notification_category_Message_details">
                                        <p class="notification_category_label_details">
                                          {data.title}
                                          <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                        </p>
                                        <div className="notification_details_message">{data.message}</div>
                                      </div>
                                    </div>
                                  ) : data.status == 'sent' && (data.type == 'PROMOTIONAL' || data.type == 'promotional') ? (
                                    <div
                                      key={index}
                                      class="notification_details_mainDiv"
                                      onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                    >
                                      <img src={PromoNotification} class="Notification_category_img_details" />
                                      <div class="notification_category_Message_details">
                                        <p class="notification_category_label_details">
                                          {data.title}
                                          <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                        </p>
                                        <div className="notification_details_message">{data.message}</div>
                                      </div>
                                    </div>
                                  ) : data.status == 'sent' && (data.type == 'ANNOUNCEMENT' || data.type == 'announcement') ? (
                                    <div
                                      key={index}
                                      class="notification_details_mainDiv"
                                      onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath, data.type)}
                                    >
                                      <img src={AnnouncementNotification} class="Notification_category_img_details" />
                                      <div class="notification_category_Message_details">
                                        <p class="notification_category_label_details">
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
            </div>

            {/* ====================Body======= */}

            <div class="webhome_container container-fluid">
              {this.state.mqloader ? <CommonLoader /> : null}

              <div class="web_top_div">
                <div class=""></div>
                {!this.state.memberServices && (
                  <div class="web_middle_container">
                    <img src={require('../Images/HomeIcon/welcome-image.svg')} class="web_welcome_image" />
                    <div class="web_middle_seconddiv">
                      <img src={require('../Images/HomeIcon/welcome-back.svg')} class="web_welcome_back" />
                      <div class="web_top_username">{this.state.username} !</div>
                    </div>
                  </div>
                )}

                <div class="web_tooltiop_member_container">
                  <div class="web_orange_tag" onClick={() => this.onrightsliderClick()}>
                    <img src={require('../Images/Drawer/my health icon.png')} class="web_patch_icon" />
                    <div class="web_patch_text">Member Apps</div>
                  </div>
                  <div class="web_yellow_tag" onClick={() => this.toggleMemberServices(this.state.memberServices)}>
                    <img src={require('../Images/Drawer/my health.svg')} class="web_patch_icon_yellow" />
                    <div class="web_patch_text_yellow">{this.state.memberServices ? 'Member Services' : 'AI Assistant'}</div>
                  </div>

                  {this.state.yellowPopup == 'true' ? (
                    <div class="webhome_tooltip_container mr-2">
                      <div class="web_checkoutboldtext">Check out Member Apps</div>
                      <div class="web_tooltip_2nd_text">Talk to a doctor 24/7 for $0 using our Telemedicine App</div>
                      <NextButton
                        variant="contained"
                        class="yellow_popup_caption_button"
                        onClick={() => this.yellowpopupClose()}
                        style={{
                          paddingLeft: '1rem',
                          paddingRight: '1rem',
                          paddingTop: '0.5rem',
                          paddingBottom: '0.5rem',
                          height: '37px',
                          marginTop: '11%',
                          backgroundColor: '#eb5757',
                          borderRadius: '20px',
                          color: '#fff',
                          fontWeight: 500
                        }}
                      >
                        CLOSE
                      </NextButton>
                    </div>
                  ) : null}
                </div>
              </div>

              {!this.state.memberServices ? (
                <div
                  class="mainWrapper"
                  style={{ marginTop: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}
                >
                  <Grid container style={{ diplay: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    {/* Notifications */}
                    <Grid item md={3}>
                      {this.state.unReadData && this.state.unReadData.length > 0 ? (
                        <div>
                          <div class="cardwallet_back_notification">
                            <div class="NotificationCard-BG text-center" style={{ display: 'block' }}>
                              <div class="cardwallet_onover_backdivMain" style={{ cursor: 'auto' }}>
                                <div style={{ display: 'flex', width: '60%' }}>
                                  <img src={NotificationIcon} class="cardwaalet_img_backside" />
                                  <div class="notification_label_backside" style={{ paddingTop: '8px' }}>
                                    My Notifications
                                  </div>
                                </div>
                                <div style={{ textAlign: 'right', width: '40%' }}>
                                  <Link
                                    to="/Notification"
                                    style={{ textDecoration: 'none', float: 'right', marginRight: '-172px', marginTop: '-23px' }}
                                  >
                                    {' '}
                                    <span className="viewAll">View all</span>
                                  </Link>
                                </div>
                              </div>

                              <div
                                style={{
                                  height: ' 18.5vw',
                                  overflow: 'auto',
                                  marginTop: '8px'
                                  // backgroundColor:'rgba(234, 232, 219, 0.4)'
                                }}
                              >
                                {this.state.unReadData.slice(0, 5).map((data, idx) => {
                                  // idx ==0 && idx==1
                                  return data.type == 'REMINDER' || data.type == 'reminder' ? (
                                    <div
                                      key={idx}
                                      class="cardwallet_onover_backdiv"
                                      onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                    >
                                      <img src={ReminderNotification} class="Notification_category_img" />
                                      <div class="notification_category_Message">
                                        <p class="notification_category_label">
                                          {data.title}
                                          <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                        </p>
                                        <div style={{ color: '#4e4e4e' }}>{data.message}</div>
                                      </div>
                                    </div>
                                  ) : data.type == 'ALERT' || data.type == 'alert' ? (
                                    <div
                                      key={idx}
                                      class="cardwallet_onover_backdiv"
                                      onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                    >
                                      <img src={AlertNotification} class="Notification_category_img" />
                                      <div class="notification_category_Message">
                                        <p class="notification_category_label">
                                          {data.title}
                                          <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                        </p>
                                        <div style={{ color: '#4e4e4e' }}>{data.message}</div>
                                      </div>
                                    </div>
                                  ) : data.type == 'UPDATE' || data.type == 'update' ? (
                                    <div
                                      key={idx}
                                      class="cardwallet_onover_backdiv"
                                      onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                    >
                                      <img src={UpdateNotification} class="Notification_category_img" />
                                      <div class="notification_category_Message">
                                        <p class="notification_category_label">
                                          {data.title}
                                          <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                        </p>
                                        <div style={{ color: '#4e4e4e' }}>{data.message}</div>
                                      </div>
                                    </div>
                                  ) : data.type == 'SURVEY' || data.type == 'survey' ? (
                                    <div
                                      key={idx}
                                      class="cardwallet_onover_backdiv"
                                      onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                    >
                                      <img src={SurveyNotification} class="Notification_category_img" />
                                      <div class="notification_category_Message">
                                        <p class="notification_category_label">
                                          {data.title}
                                          <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                        </p>
                                        <div style={{ color: '#4e4e4e' }}>{data.message}</div>
                                      </div>
                                    </div>
                                  ) : data.type == 'PROMOTIONAL' || data.type == 'promotional' ? (
                                    <div
                                      key={idx}
                                      class="cardwallet_onover_backdiv"
                                      onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                    >
                                      <img src={PromoNotification} class="Notification_category_img" />
                                      <div class="notification_category_Message">
                                        <p class="notification_category_label">
                                          {data.title}
                                          <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                        </p>
                                        <div style={{ color: '#4e4e4e' }}>{data.message}</div>
                                      </div>
                                    </div>
                                  ) : data.type == 'ANNOUNCEMENT' || data.type == 'announcement' ? (
                                    <div
                                      key={idx}
                                      class="cardwallet_onover_backdiv"
                                      onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath, data.type)}
                                    >
                                      <img src={AnnouncementNotification} class="Notification_category_img" />
                                      <div class="notification_category_Message">
                                        <p class="notification_category_label">
                                          {data.title}
                                          <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                        </p>
                                        <div style={{ color: '#4e4e4e' }}>{data.message}</div>
                                      </div>
                                    </div>
                                  ) : null
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="cardwallet_back_notification">
                          <div className="NotificationCard-BG text-center">
                            <div className="cardwallet_onover_backdivMain" style={{ display: 'flex' }}>
                              <img src={NotificationIcon} className="cardwaalet_img_backside" />
                              <div className="notification_label_backside">My Notifications</div>
                              <div style={{ textAlign: 'right', width: '40%' }}>
                                <Link to="/Notification" style={{ textDecoration: 'none', float: 'right' }}>
                                  {' '}
                                  <span className="viewAll">View all</span>
                                </Link>
                              </div>
                            </div>

                            <div style={{ padding: '35px' }}>
                              <div className="tempModalTxt">You currently have no new notifications. </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Grid>
                    <Grid item md={3}>
                      {this.state.documentCardData && <DocumentsCardNew documentCardData={this.state.documentCardData} />}
                    </Grid>
                    <Grid item md={3}>
                    <CuramLifeCard />
                    </Grid>
                    <Grid item md={3}>
                      {this.state.contactCardData && <ContactInformationCard contactCardData={this.state.contactCardData} />}
                    </Grid>
                  </Grid>

                  <Grid container style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Grid item md={3} style={{ marginTop: 15 }}>
                      <AnnouncementCard />
                    </Grid>
                    {/* <Grid item md={3} style={{ marginTop: 15 }}>
                      <MyCommunityCard />
                    </Grid> */}
                    <Grid item md={6} style={{ marginTop: 15 }}>
                      <SmallCard
                        carddata={this.state.smallcard}
                        flag="cardBlock12"
                        ref={this.childsmallcard}
                        documentsopen={this.documentscardopen}
                        unReadData={this.state.unReadData}
                        onUpdate={this.onClickUpdateNotificationStatus}
                      />
                      {/* <SmallCard
                        carddata={this.state.smallcard}
                        flag="cardBlock02"
                        ref="childsmallcard"
                        documentsopen={this.documentscardopen}
                        unReadData={this.state.unReadData}
                        onUpdate={this.onClickUpdateNotificationStatus}
                      /> */}
                    </Grid>
                  </Grid>
                </div>
              ) : (
                <div>
                  <ChatWindow username={this.state.username} navigate={intent => this.navigation(intent)} ref={this.child} />
                  <div style={{ display:"none" }}>
                    <SmallCard
                      carddata={this.state.smallcard}
                      flag="cardBlock12"
                      ref={this.childsmallcard}
                      documentsopen={this.documentscardopen}
                      unReadData={this.state.unReadData}
                      onUpdate={this.onClickUpdateNotificationStatus}
                    />
                  </div>
                </div>
              )}
            </div>

            <div style={{ paddingTop: 40 }}>
              <CommonFooter />
            </div>

            <Modal1 visible={this.state.documentsmodal} width="23%" effect="fadeInUp">
              <div>
                <DocumentsCardNew documentCardData={this.state.documentCardData} close={true} onClick={() => this.closeDocumentmodal()} />
              </div>
            </Modal1>

            <Modal1 visible={this.state.contactmodal} effect="fadeInUp">
              <div>
                <ContactInformationCard contactCardData={this.state.contactCardData} close={true} onClick={() => this.closeContacts()} />
              </div>
            </Modal1>

            <Modal1 visible={this.state.curamLifeCardOpen} effect="fadeInUp">
              <div>
                <CuramLifeCardNotification closeCuramLifeCard={this.closeCuramLifeCard} />
              </div>
            </Modal1>

            {/* ===================notification msg============= */}
            <Modal1 visible={this.state.mqmoduleAlert} width="40%" effect="fadeInUp">
              <div style={{ width: '40vw' }}>
                <div class="mqalert_modal_text">
                  Hello! We notice that your health questionnaire is incomplete. Would you like to complete it now?
                </div>
                <br />
                <div class="mqalert_button_div">
                  <button className="mqalert_button" onClick={() => this.mqAlertyes()}>
                    YES
                  </button>

                  <button className="mqalert_button" onClick={() => this.closeMqalert()}>
                    SKIP
                  </button>
                </div>
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
                  onClick={this.closeTempModal}
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
        </Sidebar>
      </Sidebar>
    )
  }

  navigation = async intent => {
    switch (intent) {
      case 'Membership ID': {
        const idCard = await this.childsmallcard.current.onCardClick()
        return idCard
      }
      case 'Health Tool': {
        const idCard = await this.childsmallcard.current.openHealthTools()
        return idCard
      }
      case 'find_provider': {
        window.open('http://findprovider.universalhealthfellowship.org/')
        break
      }
      case 'faq': {
        window.open('https://www.universalhealthfellowship.org/FAQs/')
        break
      }
      case 'Payment Card': {
        this.props.history.push('/PaymentWallet')
        break
      }
      case 'Transactions': {
        this.props.history.push('/Transaction')
        break
      }
      case 'PaymentMethod': {
        this.props.history.push('/Transaction/payment')
        break
      }
      case 'BillingDate': {
        this.props.history.push('/Transaction/billing')
        break
      }
      case 'documents': {
        this.documentscardopen()
        break
      }
      case 'notifications': {
        this.props.history.push('/Notification')
        break
      }
      case 'program information': {
        this.props.history.push('/ProgramInformation')
        break
      }
      case 'changeDependants': {
        this.props.history.push('/ProgramInformation/changeDependants')
        break
      }
      case 'Call': {
        let call = JSON.parse(localStorage.getItem('AgentDetails'))

        break
      }
      case 'Email_Agent': {
        let call = JSON.parse(localStorage.getItem('AgentDetails'))
        window.open(`mailto:${call?.email}`, '_self')
        break
      }
      case 'Email': {
        window.open(`mailto:customerservice@universalhealthfellowship.org`, '_self')
        break
      }
      case 'memberPortal': {
        sessionStorage.setItem('chatwindow', false)
        window.location.reload()
        break
      }
      case 'telemed': {
        window.open(`http://www.mdlive.com/FlexCare`)
        break
      }
      case 'needs': {
        this.props.history.push('/MyNeeds')
        break
      }
      case 'health questionary': {
        this.props.history.push('/Medical')
        break
      }
      case 'ContactCardScreen': {
        this.contactscardopen()
        break
      }
      case 'Call_Customer': {
        this.contactscardopen()
        break
      }
      case 'Announcements': {
        this.props.history.push('/AnnouncementNotification')
        break
      }
      case 'change_addons': {
        this.props.history.push('/ProgramInformation?change_addons=true')
        break
      }
      case 'change_dependants': {
        this.props.history.push('/ProgramInformation?change_dependants=true')
        break
      }
      case 'TransactionsPayment': {
        this.props.history.push('/Transaction?change_payment=true')
        break
      }
      case 'UHF': {
        getWelcomeBooklet().then(res => {
          if (res.data && res.data.length > 0) {
            let providerLink = res.data[0].fieldValue
            window.open(providerLink)
          }
        })
        break
      }
      case 'healthshareVSinsurance': {
        window.open(
          `https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Infographics/UHS+-+5+Questions+about+Health+Sharing.pdf`
        )
        break
      }
      case 'sharingGuideline': {
        getsharingguidlineslink().then(res => {
          if (res.data && res.data.length > 0) {
            let providerLink = res.data[0].fieldValue
            window.open(providerLink)
          }
        })
        break
      }
      case 'pharma': {
        this.pharmaNavigation()
        break
      }
      case 'Search Sharing Guidelines': {
        this.child.current.readMoreHandle()
        break
      }
      case 'Search KnowledgeBase': {
        this.child.current.readMoreHandle()
        break
      }
      case 'Read More': {
        this.child.current.readMoreHandle()
        break
      }
      case 'ContactInformation': {
        this.child.current.showContactInformation()
        break
      }
      case 'RxSimpleShareFormuary': {
        window.open(
          `https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Important+Documents/UHS-RxSimpleShareFormuary.pdf`
        )
        break
      }
      case 'RxSimpleShareProgram': {
        window.open(`https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-RxSimpleShare-Flyer.pdf`)
        break
      }
      default: {
        this.props.history.push('/' + intent)
      }
    }
  }

  pharmaNavigation = () => {
    const os = getOs()
    switch (os) {
      case 'Mac OS':
      case 'iOS':
      case 'iPadOS':
        window.open('https://apps.apple.com/us/app/flipt/id1329040340')
        break
      case 'Windows':
      case 'Linux':
        window.open('https://fliptrx.com/')
        break
      case 'Android':
        window.open('https://play.google.com/store/apps/details?id=com.gwlabs.flipt&hl=en_US&gl=US')
        break
      default:
        break
    }
  }
}

export default withRouter(WebHome)
