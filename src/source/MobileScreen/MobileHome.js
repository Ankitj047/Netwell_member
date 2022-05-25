import Badge from '@material-ui/core/Badge'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Fab from '@material-ui/core/Fab'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import moment from 'moment'
import React, { Component } from 'react'
import Modal1 from 'react-awesome-modal'
import { Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import customStyle from '../../components/healthqn/CSS/stylesheet_UHS'
import { logoutApplication } from '../../components/layout/Header'
import firebase from '../../firebase'
import { getOs } from '../../utils/utility'
import {
  getAnnouncemetDetails,
  getCardEnableData,
  gethealthcard,
  getHealthqnInfo,
  getNetworkName,
  getNotificationDetails,
  getproviderLink,
  getsharingguidlineslink,
  getSourceID,
  getWelcomeBooklet,
  healthtools,
  updateNotificationStatus
} from '../ApiCall'
import AlertNotification from '../Images/notification/notification_alert_icon.svg'
import AnnouncementNotification from '../Images/notification/notification_announcement_icon.svg'
import PromoNotification from '../Images/notification/notification_promo_icon.svg'
import ReminderNotification from '../Images/notification/notification_reminder_icon.svg'
import SurveyNotification from '../Images/notification/notification_survey_icon.svg'
import UpdateNotification from '../Images/notification/notification_update_icon.svg'
import ChatIcon from '../WebScreen/ChatBox/ChatIcon'
import ChatMobile from './ChatMobileBox/ChatMobile'
import LeftSidebar from './LeftSidebar'
import MemberApps from './MemberApps'
import MemberServices from './MemberServices'
import MobileFooter from './MobileFooter'
import './MobileScreens.css'

const NextButton = withStyles(customStyle.viewBtn)(Button)
const CrudButton = withStyles(customStyle.crudBtn)(Fab)

class MobileHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: false,
      memberservices: true,
      memberapps: false,
      mqmoduleAlert: false,
      notificationData: [],
      notificationCount: 0,
      anchorEl: null,
      open: false,
      unReadData: [],
      NoticeunReadData: [],
      noticeData: [],
      content: '',
      providerLink: '',
      showhealthtools: false,
      logoutShowModal: false,
      loader: false,
      chatwindow: sessionStorage.getItem('chatwindow') == 'true'
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
    this.opentelemed = this.opentelemed.bind(this)
    this.findprovider = this.findprovider.bind(this)

    this.notices = this.notices.bind(this)
    this.faqopen = this.faqopen.bind(this)
    this.programinformation = this.programinformation.bind(this)
  }

  componentDidMount() {
    var healthalert = localStorage.getItem('healthQuestionModal')
    this.gethealthcarddata()
    this.gethealthtoolsdata()
    if (localStorage.getItem('Card_Disable') == true || localStorage.getItem('Card_Disable') == 'true') {
      this.setState({ tempNotAvailableModal: true })
    }
    if (localStorage.getItem('notification') == true) {
      let cardName = localStorage.getItem('cardName')
    }
    this.getSourceIDbyemail()
    this.loadQueryParams()
    if (healthalert == 'true') {
      this.gethqmoduleinfo()
    }
    const msg = firebase.messaging.isSupported() ? firebase.messaging() : null
    if (msg) {
      msg.onMessage(payload => {
        this.getNotification()
        this.getAnnouncemet()
        const myEvent = new CustomEvent('myevent', {
          detail: {},
          bubbles: true,
          cancelable: true,
          composed: false
        })
        document.dispatchEvent(myEvent)
      })
    }
    this.getNotification()
    this.getAnnouncemet()
  }
  getSourceIDbyemail() {
    getSourceID().then(res => {
      localStorage.setItem('sourceid', res.data.memberIdSource)
      if (localStorage.getItem('skip') != 'true') {
        this.gethqmoduleinfo()
      }
    })
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

  getAnnouncemet = () => {
    getAnnouncemetDetails().then(res => {
      if (res.data && res.data.response) {
        this.setState(
          {
            noticeData: res.data.response.notificationDetails.sort((a, b) => -a.type.localeCompare(b.type)),
            noticeDataCount: res.data.response.count
          },
          () => {
            if (this.state.noticeData) {
              let dt = this.state.noticeData.filter((val, index) => val.type == 'ANNOUNCEMENT')

              let newArr = dt.slice(0, 5)
            }
          }
        )
      } else {
        this.setState({ noticeData: [] })
      }
    })
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
              this.setState({ unReadData: newArr })
            }
          }
        )
      } else {
        this.setState({ notificationData: [] })
      }
    })
  }

  loadQueryParams = () => {
    localStorage.removeItem('Disable_popup')
    let cardtitle = ''
    let client_id = localStorage.getItem('CLIENT_ID')
    let queryParams = getQueryParams()
    let pushType = localStorage.getItem('pushType')
    if (localStorage.getItem('openModal') == 'true') {
      this.setState({ tempNotAvailableModal: true })
      localStorage.removeItem('openModal')
    }
    if (localStorage.getItem('notification') == true) {
      cardtitle = localStorage.getItem('cardName')
    } else {
      cardtitle = localStorage.getItem('cardtitle')
    }
    let cardName = ''

    getCardEnableData(client_id, cardtitle).then(res => {
      if (pushType && pushType === 'pushNotification') {
        localStorage.removeItem('pushType')
        localStorage.removeItem('cardtitle')
        localStorage.removeItem('Disable_popup')

        if (cardtitle == 'HealthTool') {
          if (
            (res.data.response.enable === 'true' || res.data.response.enable === true) &&
            (this.state.showhealthtools === 'true' || this.state.showhealthtools === true)
          ) {
            window.location.href = '/HealthToolsCard'
          } else {
            this.setState({ tempNotAvailableModal: true }, () => this.getNotification())
          }
        }

        if ((res && res.data.response.enable == 'false') || res.data.response.enable == false) {
          this.setState({ tempNotAvailableModal: true })
        } else {
          localStorage.removeItem('Disable_popup')
          localStorage.removeItem('pushType')
          localStorage.removeItem('cardtitle')
          if (cardtitle == 'MembershipId' || cardtitle == 'MemberIdcard') {
            window.location.href = '/DigitalHealthCardNew'
          } else if (cardtitle == 'ProgramInformation') {
            window.location.href = '/ProgramInformation'
          } else if (cardtitle == 'MyNeeds') {
            window.location.href = '/MyNeedsMobile'
          } else if (cardtitle == 'HealthQuestionnaire') {
            window.location.href = '/MobileMedical'
          } else if (cardtitle == 'MyTransaction') {
            window.location.href = '/MyTransactionMobile'
          } else if (cardtitle == 'ChangePayment') {
            window.location.href = '/MobileTransaction'
          } else if (cardtitle == 'Documents') {
            window.location.href = '/DocumentsScreen'
          } else if (cardtitle == 'PaymentWallet') {
            window.location.href = '/MyPaymentWalletMobile'
          }
        }
      } else {
        localStorage.removeItem('pushType')
        localStorage.removeItem('cardtitle')
      }
    })
  }
  gethealthcarddata() {
    gethealthcard().then(res => {
      if (res.data.memberIdCardList != null) {
        this.getNetworkData(res.data.memberIdCardList[0].planId)
        if (res.data.memberIdCardList != null) {
          this.setState({ cardDetails: res.data.memberIdCardList })

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
        }
      } else {
        this.setState({ alertflag: true, loader: false })
      }
    })
  }
  getNetworkData(plainid) {
    getNetworkName(plainid).then(res => {
      localStorage.setItem('NETWORK_NAME', res.data.provider_network)
      this.setState({ network: res.data.provider_network })

      this.setState({
        loader: false
      })
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
  closeMqalert() {
    localStorage.setItem('healthQuestionModal', 'false')
    this.setState({ mqmoduleAlert: false })
    localStorage.setItem('skip', 'true')
  }

  mqAlertyes() {
    localStorage.setItem('healthQuestionModal', 'false')
    this.setState({ mqmoduleAlert: false }, () => {
      this.props.history.push('/MobileMedical')
    })
  }

  onSetSidebarOpen() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
  }

  // ===============All Drawer Method Call here===========

  opentelemed() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
    window.open('http://www.mdlive.com/FlexCare')
  }

  findprovider() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
    getproviderLink().then(res => {
      if (res.data && res.data.length > 0) {
        let providerLink = res.data[0].fieldValue
        let url = ''
        url = providerLink
        window.open(providerLink, '_blank')
      }
    })
  }

  notices() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
    window.open('https://www.universalhealthfellowship.org/notices/')
  }
  faqopen() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
    window.open('https://www.universalhealthfellowship.org/FAQs/')
  }
  programinformation() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
    this.refs.programinfochild.openProgramInfo()
  }

  tempModalOpen = () => {
    this.setState({
      tempNotAvailableModal: true,
      sidebarOpen: !this.state.sidebarOpen
    })
  }

  gethqmoduleinfo() {
    this.setState({ loader: true })
    getHealthqnInfo().then(res => {
      let counter = 0
      let showHealthQNNotification = false
      this.setState({ mqmoduleAlert: false })
      if (res.data.response && res.data.response.length > 0) {
        res.data.response.forEach(item => {
          counter = item.completionStatus == 4 ? counter + 1 : counter
          localStorage.setItem('skip', 'false')
          this.setState({ loader: false })
        })
        if (counter != res.data.response.length) {
          showHealthQNNotification = true
          localStorage.setItem('skip', 'false')

          this.setState({ mqmoduleAlert: true, loader: false })
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

  onClickUpdateNotificationStatus = (id, url, type) => {
    let cardName = ''
    let client_id = localStorage.getItem('CLIENT_ID')
    let obj = { notificationId: id }

    this.setState({ notificationID: id })
    if (type == undefined) updateNotificationStatus(obj).then(res => {})
    if (url == 'Medical') {
      cardName = 'HealthQuestionnaire'
    } else if (url == 'Needs' || url == 'MyNeeds') {
      cardName = 'MyNeeds'
    } else if (url == 'Transaction') {
      cardName = 'MyTransaction'
    } else if (url == 'ProgramInformation') {
      cardName = 'ProgramInformation'
    } else if (url == 'MemberIdcard' || url == 'DigitalHealthCardNew') {
      cardName = 'MembershipId'
    } else if (url == 'HealthToolCard' || url == 'HealthToolsCard') {
      cardName = 'HealthTool'
    } else if (url == 'DocumentsScreen') {
      cardName = 'Documents'
    } else if (url == 'MobileTransaction') {
      cardName = 'ChangePayment'
    } else if (url == 'HealthyLife') {
      cardName = 'HealthyLife'
    } else if (url == 'PaymentWallet') {
      cardName = 'PaymentWallet'
    } else if (url == 'notices') {
      cardName = 'notices'
    }

    getCardEnableData(client_id, cardName).then(res => {
      if (cardName == 'HealthTool') {
        if (
          (res.data.response.enable == 'true' || res.data.response.enable == true) &&
          (this.state.showhealthtools == 'true' || this.state.showhealthtools == true)
        ) {
          window.location.href = '/HealthToolsCard'
        } else {
          this.setState({ tempNotAvailableModal: true, open: false }, () => this.getNotification())
        }
      }

      if ((res && res.data.response.enable == 'false') || res.data.response.enable == false) {
        this.setState({ tempNotAvailableModal: true, open: false }, () => this.getNotification())
      } else {
        if (cardName == 'HealthQuestionnaire') {
          window.location.href = '/MobileMedical'
        } else if (cardName == 'MyNeeds') {
          window.location.href = '/MyNeedsMobile'
        } else if (cardName == 'ProgramInformation') {
          window.location.href = '/ProgramInformation'
        } else if (cardName == 'MembershipId') {
          window.location.href = '/DigitalHealthCardNew'
        } else if (cardName == 'HealthyLife') {
          window.location.href = '/HealthyShareCard'
        } else if (cardName == 'Documents') {
          window.location.href = '/DocumentsScreen'
        } else if (cardName == 'MyTransaction') {
          window.location.href = '/MyTransactionMobile'
        } else if (cardName == 'ChangePayment') {
          window.location.href = '/MobileTransaction'
        } else if (cardName == 'PaymentWallet') {
          window.location.href = '/MyPaymentWalletMobile'
        } else if (cardName == 'notices') {
          getsharingguidlineslink.then(res => {
            if (res.data && res.data.length > 0) {
              let providerLink = res.data[0].fieldValue
              window.open(providerLink)
            }
          })
        }
      }
    })
  }
  closelogoutModal = () => {
    this.setState({
      logoutShowModal: false
    })
  }

  mqLogout = () => {
    logoutApplication()
  }

  render() {
    const id = this.state.open ? 'simple-popper' : null
    return (
      <Sidebar
        sidebar={
          <LeftSidebar
            name="Dashboard"
            opentelemed={() => this.opentelemed()}
            findprovider={() => this.findprovider()}
            notices={() => this.notices()}
            faqopen={() => this.faqopen()}
            programinformation={() => this.programinformation()}
            tempModalOpen={this.tempModalOpen}
            logoutprops={() => {
              this.setState({ logoutShowModal: true, sidebarOpen: false })
            }}
          />
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        sidebarClassName="sideBarWrap"
        styles={{
          sidebar: {
            background: 'white',
            height: '100%',
            position: 'fixed'
          }
        }}
      >
        {!this.state.chatwindow ? (
          <div class="mobile_full_size">
            <div class="fixed-top">
              <div class="header">
                <div class="header_left_div">
                  <MenuIcon style={{ color: '#ffffff', height: '25px', width: '25px' }} onClick={() => this.onSetSidebarOpen()} />
                  <div class="header_name">Dashboard</div>
                </div>
                <div className="d-flex">
                  <div className="appsicon_cursor">
                    <div>
                      <IconButton onClick={this.handleClick}>
                        <Badge badgeContent={this.state.notificationCount} color="error">
                          <NotificationsIcon style={{ color: '#ffffff' }} />
                        </Badge>
                      </IconButton>
                      <Popper transition open={this.state.open} anchorEl={this.state.anchorEl} className="mobile_notification_paper">
                        {({ TransitionProps }) => (
                          <ClickAwayListener onClickAway={this.handleClickAway}>
                            <Fade {...TransitionProps} timeout={350}>
                              <Paper>
                                {this.state.unReadData &&
                                  this.state.unReadData.map((data, index) => {
                                    return data.status == 'sent' && (data.type == 'REMINDER' || data.type == 'reminder') ? (
                                      <div
                                        key={index}
                                        className="notification_details_mainDiv"
                                        onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
                                      >
                                        <img src={ReminderNotification} className="Notification_category_img_details" />

                                        <div className="mobile_notification_category_Message_details">
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
                                        <div className="mobile_notification_category_Message_details">
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
                                        <div className="mobile_notification_category_Message_details">
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
                                        <div className="mobile_notification_category_Message_details">
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
                                        <div className="mobile_notification_category_Message_details">
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
                                        <div className="mobile_notification_category_Message_details">
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
                                          to="/MobileNotification"
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

              <div class="tabheader">
                <div
                  style={{ color: '#ffffff', fontSize: '14px', fontWeight: 500 }}
                  onClick={() => this.setState({ memberservices: true, memberapps: false })}
                >
                  MEMBER SERVICES
                </div>
                <div
                  style={{ color: '#ffffff', fontSize: '14px', fontWeight: 500 }}
                  onClick={() => this.setState({ memberservices: false, memberapps: true })}
                >
                  MEMBER APPS
                </div>
              </div>

              {this.state.memberservices ? (
                <div class="tab_bottom_border">
                  <div class="tab_bottom_border_div"></div>
                  <div class="tab_bottom_border_none"></div>
                </div>
              ) : (
                <div class="tab_bottom_border">
                  <div class="tab_bottom_border_none"></div>
                  <div class="tab_bottom_border_div"></div>
                </div>
              )}
            </div>
            {this.state.memberservices ? (
              <div class="mobilehome_memberservices">
                <MemberServices
                  ref="programinfochild"
                  unReadData={this.state.unReadData}
                  noticeData={this.state.noticeData}
                  noticeUnreadData={this.state.NoticeunReadData}
                  onUpdate={this.onClickUpdateNotificationStatus}
                />

              </div>                      
            ) : (
              <div class="mobilehome_memberapps">
                <MemberApps />
              </div>
            )}

            <div class="fixed-bottom">
              <MobileFooter name="Dashboard" />
            </div>

            <ChatIcon showAIChatIcon={true} />
            {/* ===================notification msg============= */}
            <Modal1 visible={this.state.mqmoduleAlert} effect="fadeInUp">
              <div style={{ width: '60vw' }}>
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

            <Modal1 visible={this.state.tempNotAvailableModal} effect="fadeInUp">
              <div style={{ width: '80vw' }}>
                <div className="tempModalTxt">
                  We’re facing some technical difficulties, due to which this feature is currently unavailable. For support, call Member
                  Services at {localStorage.getItem('CONTACT_NUMBER')}, Monday through Friday, 8.00am to 8.00pm CST.
                </div>
              </div>
              <div className="mqalert_button_div">
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

            {/* logout popup */}
            <Modal1 visible={this.state.logoutShowModal} effect="fadeInUp">
              <div style={{ width: '80vw' }}>
                <div className="tempModalTxt">
                  Are you sure you want to sign-out? <br />
                  This will log you off and close the app.
                </div>
              </div>
              <div className="mqalert_button_div">
                <button className="mqalert_button" style={{ backgroundColor: '#fb6647' }} onClick={this.closelogoutModal}>
                  NO
                </button>

                <button className="mqalert_button" style={{ backgroundColor: '#2e6da4' }} onClick={this.mqLogout}>
                  YES
                </button>
              </div>
            </Modal1>
          </div>
        ) : (
          <ChatMobile
            username={localStorage.getItem('subscriberName')}
            closeChat={() => this.closeChat()}
            navigate={intent => this.navigation(intent)}
          />
        )}
      </Sidebar>
    )
  }
  openChat = () => {
    this.setState({
      chatwindow: true
    })
  }
  closeChat = () => {
    this.setState({
      chatwindow: false
    })
    sessionStorage.setItem('chatwindow', false)
  }
  navigation = intent => {
    if (intent === 'Membership ID') {
      this.props.history.push('/DigitalHealthCardNew')
    } else if (intent === 'Health Tool') {
      this.props.history.push('/DigitalHealthCardNew')
    } else if (intent === 'find_provider') {
      window.open('http://findprovider.universalhealthfellowship.org/')
    } else if (intent === 'faq') {
      window.open('https://www.universalhealthfellowship.org/FAQs/')
    } else if (intent === 'Payment Card') {
      this.props.history.push('/MyPaymentWalletMobile')
    } else if (intent === 'Transactions') {
      this.props.history.push('/MyTransactionMobile')
    } else if (intent === 'documents') {
      this.props.history.push('/DocumentsScreen')
    } else if (intent === 'notifications') {
      this.props.history.push('/MobileNotification')
    } else if (intent === 'program information') {
      this.props.history.push('/ProgramInformation')
    } else if (intent === 'changeDependants') {
      this.props.history.push('/ProgramInformation/changeDependants')
    } else if (intent === 'Call') {
      var call = JSON.parse(localStorage.getItem('AgentDetails'))
      window.open(`tel:${call.phone}`)
    } else if (intent === 'Email') {
      window.open(`mailto:customerservice@universalhealthfellowship.org`)
    } else if (intent === 'memberPortal') {
      sessionStorage.setItem('chatwindow', false)
      window.location.reload()
    } else if (intent === 'telemed') {
      window.open(`http://www.mdlive.com/FlexCare`)
    } else if (intent === 'needs') {
      this.props.history.push('/MyNeedsMobile')
    } else if (intent === 'health questionary') {
      this.props.history.push('/MobileMedical')
    } else if (intent === 'ContactCardScreen') {
      this.props.history.push('/ContactScreen')
    } else if (intent === 'Call_Customer') {
      var call = localStorage.getItem('CONTACT_NUMBER')
      window.open(`tel:${call}`)
    } else if (intent === 'Announcements') {
      this.props.history.push('/AnnouncementMobile')
    } else if (intent === 'change_addons') {
      this.props.history.push('/ProgramInformation?change_addons=true')
    } else if (intent === 'change_dependants') {
      this.props.history.push('/ProgramInformation?change_dependants=true')
    } else if (intent === 'TransactionsPayment') {
      this.props.history.push('/MobileTransaction')
    } else if (intent === 'UHF') {
      getWelcomeBooklet().then(res => {
        if (res.data && res.data.length > 0) {
          let providerLink = res.data[0].fieldValue
          window.open(providerLink)
        }
      })
    } else if (intent === 'healthshareVSinsurance') {
      window.open(
        `https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Infographics/UHS+-+5+Questions+about+Health+Sharing.pdf`
      )
    } else if (intent === 'sharingGuideline') {
      getsharingguidlineslink().then(res => {
        if (res.data && res.data.length > 0) {
          let providerLink = res.data[0].fieldValue
          window.open(providerLink)
        }
      })
    } else if (intent === 'pharma') {
      this.pharmaNavigation()
    } else {
      this.props.history.push('/' + intent)
    }
  }
  pharmaNavigation = () => {
    var os = getOs()
    if (os == 'Mac OS' || os == 'iOS' || os == 'iPadOS') {
      window.open('https://apps.apple.com/us/app/flipt/id1329040340')
    }
    if (os == 'Windows' || os == 'Linux') {
      window.open('https://fliptrx.com/')
    }
    if (os == 'Android') {
      window.open('https://play.google.com/store/apps/details?id=com.gwlabs.flipt&hl=en_US&gl=US')
    }
  }
}
export default withRouter(MobileHome)
export const getQueryParams = () => {
  let url = window.location.href

  let queryObj = {}

  if (url !== undefined && url !== null && url.split('&').length > 1) {
    let queryString1 = url.split('&pushType=')[1]
    let queryParams = new URLSearchParams(queryString1)
    let url1 = queryString1.split('&cardtitle')
    let queryString2 = url.split('&cardtitle=')[1]
    if (url1[0] == 'pushNotification') {
      localStorage.setItem('pushType', url1[0])
      localStorage.setItem('cardtitle', queryString2)
    }
  }
}
