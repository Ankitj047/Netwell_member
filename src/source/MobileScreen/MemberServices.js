import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'
import React, { Component } from 'react'
import Modal1 from 'react-awesome-modal'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import customStyle from '../../components/healthqn/CSS/stylesheet_UHS'
import {
  getCardDetails,
  getCardEnableData,
  getExpensLimit,
  gethealthcard,
  getMyneeds,
  getNotificationDetails,
  getProgramInfo,
  getproviderLink,
  healthtools,
  updateNotificationStatus
} from '../ApiCall'
import CommonLoader from '../CommonLoader'
import BackImg from '../Images/Banner/vector (1).svg'
import FAQ from '../Images/LeftDrawer Icon/FAQs icon (active).svg'
import Documents from '../Images/LeftDrawer Icon/find-a-provider-icon-active.svg'
import Medical from '../Images/LeftDrawer Icon/medical-q-icon-active.svg'
import DigitalCard from '../Images/LeftDrawer Icon/membership-card-icon-active.svg'
import MyNeeds from '../Images/LeftDrawer Icon/my-needs-icon-active.svg'
import MyTransactions from '../Images/LeftDrawer Icon/my_transactions_icon_active (1).svg'
import Notices from '../Images/LeftDrawer Icon/notices-icon-active.svg'
import ProgramInfoImage from '../Images/LeftDrawer Icon/program-info-icon-active.svg'
import NotificationIcon from '../Images/notification/my_notifications_icon_active.svg'
import AlertNotification from '../Images/notification/notification_alert_icon.svg'
import AnnouncementNotification from '../Images/notification/notification_announcement_icon.svg'
import NoticeIcon from '../Images/notification/notification_notice_icon.svg'
import PromoNotification from '../Images/notification/notification_promo_icon.svg'
import ReminderNotification from '../Images/notification/notification_reminder_icon.svg'
import SurveyNotification from '../Images/notification/notification_survey_icon.svg'
import UpdateNotification from '../Images/notification/notification_update_icon.svg'
import { NavigateURL } from '../MobileScreen/MobileNotification/NavigationURL'
import ChatIcon from '../WebScreen/ChatBox/ChatIcon'
import ModalAlert from '../WebScreen/ModalAlert'
import MainCardMobile from './MainCardMobile'
import MobCopyright from './MobCopyright'
import MobileContactInfo from './MobileContactInfo'
import MobileCuramLifeCard from './MobileCuramLifeCard'
import MobileDocuments from './MobileDocuments'


const NextButton = withStyles(customStyle.viewBtn)(Button)

export default class MemberServices extends Component {
  constructor(props) {
    super(props)
    this.state = {
      programInfoModal: false,
      cardDetails: null,
      expensData: null,
      loader: true,
      alertflag: false,
      yellowPopup: true,

      programInfo: null,
      eligibleServ: null,
      expenseLimits: null,
      showwallet: false,
      showhealthtools: false,
      showmyneeds: false,
      hideshowtransactioncard: true,
      dashboardCards: [],
      tempNotAvailableModal: false,
      contactCardData: null,
      documentCardData: null,
      notificationData: [],
      unReadData: [],
      providerLink: '',
      unreadCount: null,
      noticeModal: false,
      content: '',
      header: '',
      publishDate: '',
      URL: null,
      Type: null,
      empID: null
    }
    this.handleInputValue = this.handleInputValue.bind(this)
  }

  componentDidMount() {
    this.getNotification()
    this.gethealthtoolsdata()

    var popupShow = localStorage.getItem('popupShow')
    this.setState({ yellowPopup: popupShow })

    getCardDetails().then(res => {
      if (res.data.response) {
        let contactCardData = res.data.response.find(obj => obj.cardtitle === 'ContactInformation')
        let documentCardData = res.data.response.find(obj => obj.cardtitle === 'Documents')
        this.setState({
          dashboardCards: res.data.response,
          contactCardData: contactCardData,
          documentCardData: documentCardData
        })

        window.top.postMessage(
          JSON.stringify({
            selected_val: window.location.href,
            message: 'Url changes'
          }),
          '*'
        )
      }
    })
    document.addEventListener('myevent', event => {
      this.getNotification()
    })
  }

  yellowpopupClose() {
    localStorage.setItem('popupShow', 'false')
    this.setState({ yellowPopup: false })
  }
  getNotification = () => {
    getNotificationDetails(0).then(res => {
      if (res.data && res.data.response) {
        this.setState({ notificationData: res.data.response.notificationDetails, unreadCount: res.data.response.count }, () => {
          let arr = []
          if (this.state.notificationData) {
            let dt = this.state.notificationData.filter((val, index) => val.status == 'sent')
            let newArr = dt.slice(0, 2)
            this.setState({ unReadData: newArr })
          }
        })
      } else {
        this.setState({ message: 'Data Not Available!', notificationData: [] })
      }
    })
  }

  getCardEnable = () => {
    let client_id = localStorage.getItem('CLIENT_ID')
  }

  handleInputValue(val) {
    this.setState({ alertflag: val })
  }
  opennotices() {
    let client_id = localStorage.getItem('CLIENT_ID')

    window.open('https://www.universalhealthfellowship.org/notices/')
  }

  openprovider() {
    getproviderLink().then(res => {
      if (res.data && res.data.length > 0) {
        let providerLink = res.data[0].fieldValue
        let url = ''
        url = providerLink

        window.open(providerLink, '_blank')

        //window.open(url)
      } else {
        //alert('Data Not Availabel')
      }
    })
  }

  openfaqs() {
    let client_id = localStorage.getItem('CLIENT_ID')

    window.open('https://www.universalhealthfellowship.org/FAQs/')
  }

  closeProgramModal() {
    this.setState({
      programInfoModal: false
    })
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

  gethealthcarddataExpesepage() {
    gethealthcard().then(res => {})
  }

  handleExpenseLimit = () => {
    getExpensLimit().then(res => {
      if (res.data.length > 0) {
        this.setState({
          expensData: res.data,
          loader: false
        })
      }

      if (res.data.length == 0) {
        this.setState({
          loader: false,
          alertflag: true
        })
      }
    })
  }

  openshowwallet() {
    this.setState({ showwallet: true })
  }

  gethealthtoolsdata() {
    healthtools().then(res => {
      if (res) {
        /*if(res.data == "FCCARYNTEST" || res.data == "FCCARYN"){
          this.setState({showhealthtools:true})
        }else{
          this.setState({showhealthtools:false})
        }*/
        if (typeof res.data === 'string') {
          this.setState({ showhealthtools: true, loader: false })
        } else {
          this.setState({ showhealthtools: false, loader: false })
        }
      } else {
        this.setState({ showhealthtools: false, loader: false })
      }
    })
  }

  myneedsdata() {
    getMyneeds().then(res => {
      if (res.data.length > 0) {
        this.setState({ showmyneeds: true, loader: false })
      } else {
        this.setState({ showmyneeds: false, loader: false })
      }
    })
  }

  onClickUpdateNotificationStatus = (id, url) => {
    let cardName = ''
    let obj = { notificationId: id }
    let client_id = localStorage.getItem('CLIENT_ID')
    updateNotificationStatus(obj).then(res => {
      if (url == 'Medical') {
        cardName = 'HealthQuestionnaire'
      }
      if (url == 'Needs' || url == 'MyNeeds') {
        cardName = 'MyNeeds'
      }
      if (url == 'Transaction') {
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
      if (url == 'MobileTransaction') {
        cardName = 'ChangePayment'
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
            this.setState({ tempNotAvailableModal: true }, () => this.getNotification())
          }
        }
        if ((res && res.data.response.enable == 'false') || res.data.response.enable == false) {
          this.setState({ tempNotAvailableModal: true }, () => this.getNotification())
        } else {
          if (cardName == 'HealthQuestionnaire') {
            window.location.href = '/MobileMedical'
          }
          if (cardName == 'MyNeeds') {
            window.location.href = '/MyNeedsMobile'
          }

          if (cardName == 'ProgramInformation') {
            window.location.href = '/ProgramInformation'
          }
          if (cardName == 'MembershipId') {
            window.location.href = '/DigitalHealthCardNew'
          }

          if (cardName == 'Documents') {
            window.location.href = '/DocumentsScreen'
          }
          if (cardName == 'MyTransaction') {
            window.location.href = '/MyTransactionMobile'
          }
          if (cardName == 'ChangePayment') {
            window.location.href = '/MobileTransaction'
          }
        }
      })
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
      return moment(date).format('MMM DD, YYYY')
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

  publishDateformat(date) {
    const enrollmentDate = this.getDateInUTC(date, true)
    let nowdate = this.getDateInUTC(new Date(), true)

    var day = moment(enrollmentDate).format('DD')

    var mon = moment(enrollmentDate).format('MM')

    var year = moment(enrollmentDate).format('YYYY')

    var date = mon + '/' + day + '/' + year

    var todayDate = moment(nowdate).format('MM/DD/YYYY')
    let hr = moment(enrollmentDate).format('hh')

    return moment(date).format('MMMM DD,YYYY')
  }

  onClickNotices = (title, msg, url, type, date) => {
    this.setState({
      noticeModal: true,
      content: msg,
      header: title,
      publishDate: date,
      URL: url,
      Type: type
    })
  }

  handleOk = (id, url, type) => {
    NavigateURL(id, url, type)
    this.setState({ noticeModal: false })
  }

  render() {
    return (
      <div class="memberservices">
        {this.state.loader ? <CommonLoader /> : null}

        <div class="pop_container">
          <div class="">
            {/* <MobileNotification /> */}
            <div class="mob_Notification_card">
              {/* <Link to="/MobileNotification" style={{ textDecoration: 'none' }}> */}
              <div class="mob_notification_top_container">
                <img src={NotificationIcon} class="mob_myneeds_header_image" />
                <div class="mob_myneeds_header_text">My Notifications</div>
                <div style={{ textAlign: 'right' }}>
                  <Link to="/MobileNotification" style={{ textDecoration: 'none' }}>
                    <span className="viewAll">View all</span>
                  </Link>
                </div>
              </div>

              {this.props.unReadData && this.props.unReadData.length > 0 ? (
                <div>
                  <div
                    style={{
                      overflow: 'auto'
                    }}
                  >
                    {this.props.unReadData.slice(0, 2).map((data, idx) => {
                      return data.type == 'REMINDER' || data.type == 'reminder' ? (
                        <div
                          key={idx}
                          class="mobile_notification_details_mainDiv"
                          onClick={() => this.props.onUpdate(data.notificationID, data.urlPath)}
                        >
                          <img src={ReminderNotification} class="Notification_category_img_details" />
                          <div class="mobile_notification_category_Message_details">
                            <p class="notification_category_label_details">
                              {data.title}
                              <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                            </p>
                            <div className="notification_details_message">{data.message}</div>
                          </div>
                        </div>
                      ) : data.type == 'ALERT' || data.type == 'alert' ? (
                        <div
                          key={idx}
                          class="mobile_notification_details_mainDiv"
                          onClick={() => this.props.onUpdate(data.notificationID, data.urlPath)}
                        >
                          <img src={AlertNotification} class="Notification_category_img_details" />
                          <div class="mobile_notification_category_Message_details">
                            <p class="notification_category_label_details">
                              {data.title}
                              <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                            </p>
                            <div className="notification_details_message">{data.message}</div>
                          </div>
                        </div>
                      ) : data.type == 'UPDATE' || data.type == 'update' ? (
                        <div
                          key={idx}
                          class="mobile_notification_details_mainDiv"
                          onClick={() => this.props.onUpdate(data.notificationID, data.urlPath)}
                        >
                          <img src={UpdateNotification} class="Notification_category_img_details" />
                          <div class="mobile_notification_category_Message_details">
                            <p class="notification_category_label_details">
                              {data.title}
                              <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                            </p>
                            <div className="notification_details_message">{data.message}</div>
                          </div>
                        </div>
                      ) : data.type == 'SURVEY' || data.type == 'survey' ? (
                        <div
                          key={idx}
                          class="mobile_notification_details_mainDiv"
                          onClick={() => this.props.onUpdate(data.notificationID, data.urlPath)}
                        >
                          <img src={SurveyNotification} class="Notification_category_img_details" />
                          <div class="mobile_notification_category_Message_details">
                            <p class="notification_category_label_details">
                              {data.title}
                              <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                            </p>
                            <div className="notification_details_message">{data.message}</div>
                          </div>
                        </div>
                      ) : data.type == 'PROMOTIONAL' || data.type == 'promotional' ? (
                        <div
                          key={idx}
                          class="mobile_notification_details_mainDiv"
                          onClick={() => this.props.onUpdate(data.notificationID, data.urlPath)}
                        >
                          <img src={PromoNotification} class="Notification_category_img_details" />
                          <div class="mobile_notification_category_Message_details">
                            <p class="notification_category_label_details">
                              {data.title}
                              <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                            </p>
                            <div className="notification_details_message">{data.message}</div>
                          </div>
                        </div>
                      ) : data.type == 'ANNOUNCEMENT' || data.type == 'announcement' ? (
                        <div
                          key={idx}
                          class="mobile_notification_details_mainDiv"
                          onClick={() => this.props.onUpdate(data.notificationID, data.urlPath)}
                        >
                          <img src={AnnouncementNotification} class="Notification_category_img_details" />
                          <div class="mobile_notification_category_Message_details">
                            <p class="notification_category_label_details">
                              {data.title}
                              <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                            </p>
                            <div className="notification_details_message">{data.message}</div>
                          </div>
                        </div>
                      ) : null
                    })}
                  </div>

                  {/* </div> */}
                  {/* </div> */}
                </div>
              ) : (
                <div>
                  <div style={{ padding: '35px' }}>
                    <div className="tempModalTxt" style={{ fontSize: '14px' }}>
                      You currently have no new notifications.{' '}
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              )}
            </div>

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
          </div>

          <div class="">
            <MobileDocuments documentCardData={this.state.documentCardData} />
          </div>
          <div class="">
            <MobileCuramLifeCard />
          </div>
          {/* <div class="">
            <MobileMyCommunityCard />
          </div> */}

          {/* Announcement & Notices card--------------------- */}

          <div class="">
            <div class="mob_Notification_card">
              <div class="mob_notification_top_container">
                <img src={Notices} class="mob_myneeds_header_image" />
                <div class="mob_myneeds_header_text">Announcements & Notices</div>
                <div style={{ textAlign: 'right' }}>
                  <Link to="/AnnouncementMobile" style={{ textDecoration: 'none' }}>
                    <span className="viewAll">View all</span>
                  </Link>
                </div>
              </div>

              {this.props.noticeData && this.props.noticeData.length > 0 ? (
                <div>
                  <div
                    style={{
                      overflow: 'auto'
                    }}
                  >
                    {this.props.noticeData.slice(0, 2).map((data, idx) => {
                      return data.type == 'NOTICE' ||
                        data.type == 'Notice' ||
                        data.type == 'notice' ||
                        data.type == 'NOTICES' ||
                        data.type == 'Notices' ||
                        data.type == 'notices' ? (
                        <div
                          key={idx}
                          class="mobile_notification_details_mainDiv"
                          onClick={() =>
                            this.onClickNotices(data.title, data.message, data.urlPath, data.type, this.publishDateformat(data.createdDate))
                          }
                        >
                          <img src={NoticeIcon} class="Notification_category_img_details" />
                          <div class="mobile_notification_category_Message_details">
                            <p class="notification_category_label_details">
                              {data.type}
                              <span className="notification_details_Date">{this.dateformat(data.createdDate)}</span>
                            </p>
                            <div className="notification_details_message">{data.title}</div>
                          </div>
                        </div>
                      ) : data.type == 'ANNOUNCEMENT' || data.type == 'announcement' ? (
                        <div
                          key={idx}
                          class="mobile_notification_details_mainDiv"
                          onClick={() =>
                            this.onClickNotices(data.title, data.message, data.urlPath, data.type, this.publishDateformat(data.createdDate))
                          }
                        >
                          <img src={AnnouncementNotification} class="Notification_category_img_details" />
                          <div class="mobile_notification_category_Message_details">
                            <p class="notification_category_label_details">
                              {data.type}
                              <span className="notification_details_Date">{this.dateformat(data.createdDate)}</span>
                            </p>
                            <div className="notification_details_message">{data.title}</div>
                          </div>
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ padding: '35px' }}>
                    <div className="tempModalTxt">You currently have no new announcements & notices. </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {this.state.yellowPopup == 'true' ? (
            <div class="box stack-top">
              <Grid container>
                {/*infoPopBgWrapper*/}
                <Grid item xs={0} md={5} sm={5}></Grid>
                <Grid item xs={12} md={7} sm={7}>
                  <div className="infoPopContent">
                    <img className="infoPopBg" src={BackImg} style={{ width: '40rem' }}></img>
                    <div class="yellow_popup_caption"> Check out Member Apps</div>
                    <div class="yellow_popup_caption2"> Talk to a doctor 24/7 for $0 using our Telemedicine App</div>
                    <NextButton
                      variant="contained"
                      class="yellow_popup_caption_button"
                      onClick={() => this.yellowpopupClose()}
                      style={{ paddingLeft: '1rem', paddingRight: '1rem', width: '80px', height: '40px' }}
                    >
                      CLOSE
                    </NextButton>
                  </div>
                </Grid>
              </Grid>
            </div>
          ) : null}
        </div>

        <div className="mobile_small_card_conatiner">
          {this.state.dashboardCards &&
            this.state.dashboardCards.map(card => (
              <div>
                {(() => {
                  switch (card.cardtitle) {
                    case 'MembershipId':
                      return card.enable ? (
                        <div>
                          {this.state.showwallet ? (
                            <div class="mob_Card_wallet_container text-center">
                              <div class="card_wallet_back_container_main">
                                <img
                                  src={require('../Images/LeftDrawer Icon/membership-card-icon-active.svg')}
                                  class="mob_card_wallet_back_side"
                                />
                                <span class="mob_card_wallet_caption">ID Cards</span>
                              </div>

                              <div class="cardwallet_backside_caption">
                                {localStorage.getItem('CLIENT_ID') == '6548' ||
                                localStorage.getItem('CLIENT_ID') == 6548 ||
                                localStorage.getItem('CLIENT_ID') == '4367' ||
                                localStorage.getItem('CLIENT_ID') == 4367 ||
                                localStorage.getItem('CLIENT_ID') == '5540' ||
                                localStorage.getItem('CLIENT_ID') == 5540 ||
                                localStorage.getItem('CLIENT_ID') == '4376' ||
                                localStorage.getItem('CLIENT_ID') == 4376 ? (
                                  <Link to="/HealthyShareCard" style={{ textDecoration: 'none' }}>
                                    {' '}
                                    Membership Card
                                  </Link>
                                ) : (
                                  <Link to="/DigitalHealthCardNew" style={{ textDecoration: 'none' }}>
                                    {' '}
                                    Membership Card
                                  </Link>
                                )}
                              </div>

                              {this.state.showhealthtools ? (
                                <div class="cardwallet_backside_caption">
                                  <Link to="/HealthToolsCard" style={{ textDecoration: 'none' }}>
                                    Health Tools
                                  </Link>
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div onClick={() => this.openshowwallet()}>
                              <MainCardMobile name="ID Cards" img={DigitalCard} />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
                          <MainCardMobile name="ID Cards" img={DigitalCard} />
                        </div>
                      )

                    case 'HealthyLife':
                      return card.enable ? (
                        <div>
                          {this.state.showwallet ? (
                            <div class="mob_Card_wallet_container text-center">
                              <div class="card_wallet_back_container_main">
                                <img
                                  src={require('../Images/LeftDrawer Icon/membership-card-icon-active.svg')}
                                  class="mob_card_wallet_back_side"
                                />
                                <span class="mob_card_wallet_caption">ID Cards</span>
                              </div>

                              <div class="cardwallet_backside_caption">
                                <Link to="/HealthyShareCard" style={{ textDecoration: 'none' }}>
                                  UHS Membership Card
                                </Link>
                              </div>

                              {this.state.showhealthtools ? (
                                <div class="cardwallet_backside_caption">
                                  <Link to="/HealthToolsCard" style={{ textDecoration: 'none' }}>
                                    Health Tools
                                  </Link>
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div onClick={() => this.openshowwallet()}>
                              <MainCardMobile name="ID Cards" img={DigitalCard} />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
                          <MainCardMobile name="ID Cards" img={DigitalCard} />
                        </div>
                      )

                    case 'ProgramInformation':
                      return card.enable ? (
                        <Link to="/ProgramInformation" style={{ textDecoration: 'none' }}>
                          <MainCardMobile name="Program Information" img={ProgramInfoImage} />
                        </Link>
                      ) : (
                        <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
                          <MainCardMobile name="Program Information" img={ProgramInfoImage} />
                        </div>
                      )
                    case 'MyNeeds':
                      return card.enable ? (
                        <Link to="/MyNeedsMobile" style={{ textDecoration: 'none' }}>
                          <MainCardMobile name="My Needs" img={MyNeeds} />
                        </Link>
                      ) : (
                        <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
                          <MainCardMobile name="My Needs" img={MyNeeds} />
                        </div>
                      )

                    case 'MyTransaction':
                      return card.enable ? (
                        <Link to="/MyTransactionMobile">
                          <MainCardMobile name="My Transactions" img={MyTransactions} />
                        </Link>
                      ) : (
                        <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
                          <MainCardMobile name="My Transaction" img={MyTransactions} />
                        </div>
                      )
                    case 'FindProvider':
                      return card.enable ? (
                        <div onClick={() => this.openprovider()}>
                          <MainCardMobile name="Find a Provider" img={Documents} />
                        </div>
                      ) : (
                        <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
                          <MainCardMobile name="Find a Provider" img={Documents} />
                        </div>
                      )
                    case 'HealthQuestionnaire':
                      return card.enable ? (
                        <Link to="MobileMedical">
                          <MainCardMobile name="Health Questionnaire" img={Medical} />
                        </Link>
                      ) : (
                        <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
                          <MainCardMobile name="Health Questionnaire" img={Medical} />
                        </div>
                      )
                    case 'FAQs':
                      return card.enable ? (
                        <div onClick={() => this.openfaqs()}>
                          <MainCardMobile name="FAQs" img={FAQ} />
                        </div>
                      ) : (
                        <div onClick={() => this.setState({ tempNotAvailableModal: true })}>
                          <MainCardMobile name="FAQs" img={FAQ} />
                        </div>
                      )
                  }
                })()}
              </div>
            ))}
        </div>

        <MobileContactInfo contactCardData={this.state.contactCardData} />
            <ChatIcon showAIChatIcon={true} />
        <ChatIcon />
        <div style={{ display: 'block' }}>
          <MobCopyright />
        </div>
        {this.state.alertflag ? <ModalAlert handleInput={this.handleInputValue} /> : null}

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
          </div>
        </Modal1>

        <Modal size="lg" show={this.state.noticeModal} centered className="ChangPayModal paymentWalletModal" backdrop="static">
          <Modal.Body style={{ maxHeight: '400px', overflowX: 'scroll' }}>
            <Grid container direction="row" justify="space-between" alignItems="flex-start" style={{ flexWrap: 'nowrap' }}>
              <span class="Change-Payment-Method" style={{ lineHeight: '1.3' }}>
                {this.state.header}
              </span>
              <IconButton aria-label="close" onClick={() => this.setState({ noticeModal: false })} style={{ marginTop: '-13px' }}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <div>
              <Grid container>
                <div style={{ marginTop: '15%', marginBottom: '-2%', fontWeight: 'bold' }}>{this.state.publishDate}</div>
              </Grid>

              <div
                class="The-fellowship-incurs-additional-fees-related-to-p"
                dangerouslySetInnerHTML={{ __html: this.state.content }}
              ></div>
            </div>
          </Modal.Body>

          <Modal.Footer style={{ justifyContent: 'center' }}>
            <Button variant="contained" onClick={() => this.setState({ noticeModal: false })} class="ButtonBG">
              OK
            </Button>
            <Button variant="contained" onClick={() => this.handleOk(null, this.state.URL, this.state.Type)} class="ButtonBG">
              VIEW DETAILS
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
