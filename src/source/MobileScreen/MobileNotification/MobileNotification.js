import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import moment from 'moment'
import React, { Component } from 'react'
import firebase from '../../../firebase'
import { getNotificationDetails } from '../../ApiCall'
import CommonLoader from '../../CommonLoader'
import AlertNotification from '../../Images/notification/notification_alert_icon.svg'
import AnnouncementNotification from '../../Images/notification/notification_announcement_icon.svg'
import PromoNotification from '../../Images/notification/notification_promo_icon.svg'
import ReminderNotification from '../../Images/notification/notification_reminder_icon.svg'
import SurveyNotification from '../../Images/notification/notification_survey_icon.svg'
import UpdateNotification from '../../Images/notification/notification_update_icon.svg'
import ChatIcon from '../../WebScreen/ChatBox/ChatIcon'
import MobCopyright from '../MobCopyright'
import MobileFooter from '../MobileFooter'
import MobileHeader from '../MobileHeader'
import { NavigateURL } from './NavigationURL'

export default class Notification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataUnread: [],
      dataRead: [],
      data: [],
      message: null,
      loader: false,
      date: '',
      page: 0,
      limit: 20,
      rowCount: 0,
      loadMoreBtnshow: false
    }
  }
  componentDidMount() {
    this.getNotification()
    const msg = firebase.messaging.isSupported() ? firebase.messaging() : null
    if (msg) {
      msg.onMessage(payload => {
        this.getNotification()
        // const myEvent = new CustomEvent("myevent",{
        //   detail: {},
        //   bubbles: true,
        //   cancelable: true,
        //   composed: false,
        // })
        // document.dispatchEvent(myEvent);
        // console.log("onMessage:+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++home ", payload);
      })
    }
  }
  getNotification = () => {
    this.setState({
      loader: true
    })
    getNotificationDetails(this.state.page).then(res => {
      if (res.data && res.data.response) {
        //    if(res.data.response.length > 0){
        if (res.data.response.pageList > 20) {
          this.setState({ loadMoreBtnshow: true })
        } else {
          this.setState({ loadMoreBtnshow: false })
        }
        // }
        this.setState({
          data: res.data.response.notificationDetails,
          rowCount: res.data.response.pageList,
          loader: false,
          page: 1
        })
      } else {
        this.setState({ message: 'Notification not available !', loader: false })
      }
    })
  }

  handleChangePage = (event, newPage) => {
    this.setState({ loader: true })
    getNotificationDetails(this.state.page).then(res => {
      var resnew = res.data.response.notificationDetails
      // var data = this.state.data;
      // var newdata = data.concat(resnew);
      if (this.state.data.length <= this.state.rowCount) {
        this.setState({ page: this.state.page + 1, data: [...this.state.data, ...resnew], loader: false })
      }
      if (this.state.data.length == this.state.rowCount) {
        this.setState({ loadMoreBtnshow: false })
      } else {
        this.setState({ loadMoreBtnshow: true })
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

  onClickNotification = (id, url, type) => {
    NavigateURL(id, url, type)
  }

  goBack = () => {
    this.props.history.push('/')
  }
  render() {
    return (
      <div>
        {this.state.loader ? <CommonLoader /> : null}
        {/* <div className="mobileViewHeader">
                <div className="mobile_header">
                  <Link to="/"><ArrowBackIcon style={{ width: '24px', height: '24px', color: '#ffffff' }} /></Link>
                  <div className="mobile_header_title">My Notifications1</div>
                  </div>
              </div> */}

        {/* <div className="container progInfoContainer"> */}
        {/* <div className="commonWrap" > */}
        {/* <div className="progInfoSection_mob" > */}

        <MobileHeader name="My Notifications" />

        <div className="notificationListWrapper">
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableBody>
                {this.state.data ? (
                  this.state.data.map((data, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell
                          class={data.status == 'delivered' ? 'notification_details_mainDiv' : 'notification_details_mainDiv_read'}
                        >
                          {data.type == 'REMINDER' || data.type == 'reminder' ? (
                            <>
                              <img src={ReminderNotification} class="Notification_category_img_details" />
                              <div
                                class="notification_category_Message_details"
                                onClick={() => this.onClickNotification(data.notificationID, data.urlPath)}
                              >
                                <p class="notification_category_label_details">
                                  {data.title}
                                  <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                </p>
                                <div className="notification_details_message">{data.message}</div>
                              </div>
                            </>
                          ) : data.type == 'ALERT' || data.type == 'alert' ? (
                            <>
                              <img src={AlertNotification} class="Notification_category_img_details" />
                              <div
                                class="notification_category_Message_details"
                                onClick={() => this.onClickNotification(data.notificationID, data.urlPath)}
                              >
                                <p class="notification_category_label_details">
                                  {data.title}
                                  <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                </p>
                                <div className="notification_details_message">{data.message}</div>
                              </div>
                            </>
                          ) : data.type == 'UPDATE' || data.type == 'update' ? (
                            <>
                              <img src={UpdateNotification} class="Notification_category_img_details" />
                              <div
                                class="notification_category_Message_details"
                                onClick={() => this.onClickNotification(data.notificationID, data.urlPath)}
                              >
                                <p class="notification_category_label_details">
                                  {data.title}
                                  <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                </p>
                                <div className="notification_details_message">{data.message}</div>
                              </div>
                            </>
                          ) : data.type == 'SURVEY' || data.type == 'survey' ? (
                            <>
                              <img src={SurveyNotification} class="Notification_category_img_details" />
                              <div
                                class="notification_category_Message_details"
                                onClick={() => this.onClickNotification(data.notificationID, data.urlPath)}
                              >
                                <p class="notification_category_label_details">
                                  {data.title}
                                  <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                </p>
                                <div className="notification_details_message">{data.message}</div>
                              </div>
                            </>
                          ) : data.type == 'PROMOTIONAL' || data.type == 'promotional' ? (
                            <>
                              <img src={PromoNotification} class="Notification_category_img_details" />
                              <div
                                class="notification_category_Message_details"
                                onClick={() => this.onClickNotification(data.notificationID, data.urlPath)}
                              >
                                <p class="notification_category_label_details">
                                  {data.title}
                                  <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                </p>
                                <div className="notification_details_message">{data.message}</div>
                              </div>
                            </>
                          ) : data.type == 'ANNOUNCEMENT' || data.type == 'announcement' ? (
                            <>
                              <img src={AnnouncementNotification} class="Notification_category_img_details" />
                              <div
                                class="notification_category_Message_details"
                                onClick={() => this.onClickNotification(data.notificationID, data.urlPath)}
                              >
                                <p class="notification_category_label_details">
                                  {data.title}
                                  <span className="notification_details_Date">{this.dateformat(data.created_date)}</span>
                                </p>
                                <div className="notification_details_message">{data.message}</div>
                              </div>
                            </>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <div className="data_not_found" style={{ height: '90vh' }}>
                    <p class="noneeds_msg_display" style={{ textAlign: 'center' }}>
                      You currently have no new notifications.
                    </p>
                  </div>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {this.state.loadMoreBtnshow ? (
            <div className="loadMoreWrapper_notification" onClick={() => this.handleChangePage()}>
              <button className="loadMoreBtn_notification">Load More</button>
            </div>
          ) : null}
        </div>

        <div style={{ bottom: '9vh', position: 'relative' }}>
            <ChatIcon showAIChatIcon={true} />
          <ChatIcon />
        </div>
        <div style={{ bottom: '9vh', position: 'relative' }}>
          <MobCopyright />
        </div>
        <div class="fixed-bottom">
          <MobileFooter />
        </div>
      </div>
    )
  }
}
