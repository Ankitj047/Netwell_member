import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'
import React, { Component } from 'react'
import Modal1 from 'react-awesome-modal'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import customStyle from '../../../components/healthqn/CSS/stylesheet_UHS'
import { getCardEnableData, getNotificationDetails, updateNotificationStatus } from '../../ApiCall'
import NotificationIcon from '../../Images/notification/my_notifications_icon_active.svg'
import AlertNotification from '../../Images/notification/notification_alert_icon.svg'
import AnnouncementNotification from '../../Images/notification/notification_announcement_icon.svg'
import PromoNotification from '../../Images/notification/notification_promo_icon.svg'
import ReminderNotification from '../../Images/notification/notification_reminder_icon.svg'
import SurveyNotification from '../../Images/notification/notification_survey_icon.svg'
import UpdateNotification from '../../Images/notification/notification_update_icon.svg'

const NextButton = withStyles(customStyle.viewBtn)(Button)

export default class MobileNotification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      message: null,
      unreadCount: null,
      unReadData: [],
      tempNotAvailableModal: false
    }
  }
  componentDidMount() {
    this.getNotification()
    document.addEventListener('myevent', event => {
      this.getNotification()
    })
  }
  getNotification = () => {
    getNotificationDetails(0).then(res => {
      if (res.data && res.data.response) {
        console.log('Notifivation ===', res.data.response)
        this.setState({ data: res.data.response.notificationDetails, unreadCount: res.data.response.count }, () => {
          let arr = []
          if (this.state.data) {
            let dt = this.state.data.filter((val, index) => val.status == 'sent')
            this.state.unReadData = dt.slice(0, 2)
            console.log('Arr===', this.state.unReadData)
          }
        })
      }
      //  else{
      //     this.setState({message:"Data Not Available!", data :[]})
      //  }
    })
  }
  onClickUpdateNotificationStatus = (id, url) => {
    console.log('Notification ID ====', id, url)
    let cardName = ''
    let obj = { notificationId: id }

    if (url == 'Medical') {
      // window.location.href='/MobileMedical'
      cardName = 'HealthQuestionnaire'
    }
    if (url == 'Needs' || url == 'MyNeeds') {
      //window.location.href='/MyNeedsMobile'
      cardName = 'MyNeeds'
    }
    if (url == 'Transaction') {
      cardName = 'MyTransaction'
    }
    if (url == 'ProgramInformation') {
      //window.location.href='/ProgramInformation'
      cardName = 'ProgramInformation'
    }
    if (url == 'MemberIdcard' || url == 'DigitalHealthCardNew') {
      //window.location.href='/DigitalHealthCardNew'
      cardName = 'MembershipId'
    }
    if (url == 'HealthToolCard' || url == 'HealthToolsCard') {
      // window.location.href='/HealthToolsCard'
      cardName = 'HealthTool'
    }
    if (url == 'DocumentsScreen') {
      //window.location.href='/DocumentsScreen'
      cardName = 'Documents'
    }
    if (url == 'MobileTransaction') {
      // window.location.href='/MobileTransaction'
      cardName = 'ChangePayment'
    }

    let client_id = localStorage.getItem('CLIENT_ID')
    updateNotificationStatus(obj).then(res => {
      console.log('saveUserNotificationDetails=====', res)
      this.getNotification()
    })

    getCardEnableData(client_id, cardName).then(res => {
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
        if (cardName == 'HealthTool') {
          window.location.href = '/HealthToolsCard'
        }
        if (cardName == 'Documents') {
          window.location.href = '/DocumentsScreen'
        }
        if (cardName == 'MyTransaction') {
          window.location.href = '/MyTransactionMobile'
        }
        if (cardName == 'ChangePayment') {
          window.location.href = '/MobileTransaction'
          // window.location.href='/MobileTransaction'
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

  render() {
    return (
      <div class="mob_Notification_card">
        <Link to="/MobileNotification" style={{ textDecoration: 'none' }}>
          <div class="mob_notification_top_container">
            <img src={NotificationIcon} class="mob_myneeds_header_image" />
            <div class="mob_myneeds_header_text">My Notifications</div>
          </div>
        </Link>
        {this.state.unReadData && this.state.unreadCount > 0 ? (
          <div>
            {this.state.unReadData.map((data, idx) => {
              return data.type == 'REMINDER' || data.type == 'reminder' ? (
                <div
                  key={idx}
                  class="mobile_notification_details_mainDiv"
                  onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
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
                  onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
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
                  onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
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
                  onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
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
                  onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
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
                  onClick={() => this.onClickUpdateNotificationStatus(data.notificationID, data.urlPath)}
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
              ) : (
                <Grid container style={{ padding: '10px', backgroundColor: 'white' }}>
                  <span style={{ fontStyle: 'Roboto', fontWeight: '500' }}>
                    **For complete status, please refer to the Explanation of Sharing (EOS) mailed to your address on file
                  </span>
                </Grid>
              )
            })}
          </div>
        ) : (
          //  <div class="mob_Notification_card" >

          <div className="mobile_notification_details_mainDiv">
            <div style={{ padding: '35px' }}>
              <div className="tempModalTxt">You currently have no new notifications </div>
            </div>
          </div>
        )}

        {/* {
                this.state.data ?
                  <div className="">
                    <div className="mob_documents_infomiddiv text-left">
                      <div className="mob_documentscardnew_welcome_div" onClick={() => this.openwelcome()}>Welcome
                        Booklet
                      </div>
                      <div className="mob_documentscardnew_welcome_div"
                           onClick={() => this.opensharingguidlines()}>Sharing Guidelines
                      </div>
                      <div className="mob_documentscardnew_welcome_div" onClick={() => this.opensecond()}>Member
                        Responsibilities
                      </div>
                      <div className="mob_documentscardnew_welcome_div" onClick={() => this.openthird()}>Statement of
                        Shared Faith and Beliefs
                      </div>

                      <div className="mob_documentscardnew_welcome_div" onClick={() => this.getstartedHealth()}>Get
                        Started with Health Sharing
                      </div>
                      <div className="mob_documentscardnew_welcome_div" onClick={() => this.open5question()}>5 Questions
                        about Health Sharing
                      </div>
                      <div className="mob_documentscardnew_welcome_div" onClick={() => this.tipsTelemedicin()}>Tips on
                        Telemedicine
                      </div>
                      <div className="mob_documentscardnew_welcome_div" onClick={() => this.great4reason()}>4 Great
                        Reasons to share UHS
                      </div>
                      <div className="mob_documentscardnew_welcome_div" onClick={() => this.quick3facts()}>3 Quick Facts
                        for Doctors
                      </div>
                    </div>

                  </div>
                  :
                  <div style={{fontSize : '14px', fontWeight : 'bold', textAlign : 'center'}}>
                    <div>This card is temporally unavailable.</div>
                  </div>
              }
 */}

        {/* <div>
    <MobileFooter name="Documents"/>
    </div> */}
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
    )
  }
}
