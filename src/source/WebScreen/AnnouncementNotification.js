import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import customStyle from '../../components/healthqn/CSS/stylesheet_UHS'
import firebase from '../../firebase'
import { getAnnouncemetDetails } from '../ApiCall'
import Notices from '../Images/LeftDrawer Icon/notices-icon-active.svg'
import AnnouncementNotification from '../Images/notification/notification_announcement_icon.svg'
import NoticeIcon from '../Images/notification/notification_notice_icon.svg'
import { NavigateURL } from '../WebScreen/Notification/NavigationURL'
import './WebScreens.css'

const NextButton = withStyles(customStyle.viewBtn)(Button)

class AnnouncementCard extends React.Component {
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
      mqmoduleAlert: null,
      mqloader: false,
      myneedsfooter: false,
      contactCardData: null,
      documentCardData: null,
      tempNotAvailableModal: false,
      notificationData: [],
      unReadData: [],
      noticeData: [],
      notificationCount: 0,
      anchorEl: null,
      open: false,
      show: false,
      showhealthtools: false,
      content: '',
      header: '',
      publishDate: '',
      noticeModal: false,
      URL: null,
      Type: null
    }
  }

  componentDidMount() {
        this.getAnnouncemet()
    var popupShow = localStorage.getItem('popupShow')
    this.setState({ yellowPopup: popupShow })

    const msg = firebase.messaging.isSupported() ? firebase.messaging() : null
    if (msg) {
      msg.onMessage(payload => {
                this.getAnnouncemet()
        const myEvent = new CustomEvent('myevent', {
          detail: {},
          bubbles: true,
          cancelable: true,
          composed: false
        })
        document.dispatchEvent(myEvent)
        console.log('onMessage:+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++home ', payload)
      })
    }
  }

  getAnnouncemet = () => {
    getAnnouncemetDetails().then(res => {
      if (res.data && res.data.response) {
        this.setState(
          {
            notificationData: res.data.response.notificationDetails.sort((a, b) => -a.type.localeCompare(b.type)),
            notificationCount: res.data.response.count
          },
          () => {
            console.log('sort data--', this.state.notificationData)
            if (this.state.notificationData) {
              let noticeData = this.state.notificationData.filter((val, index) => val.type == 'Notices')
              let dt = this.state.notificationData.filter((val, index) => val.type == 'ANNOUNCEMENT')
              let content = this.state.notificationData.filter((val, index) => val.message)

              let newArr = dt.slice(0, 5)
              this.setState({ unReadData: this.state.notificationData, noticeData: noticeData })
            }
          }
        )
      } else {
        this.setState({ notificationData: [] })
      }
    })
  }

  onClickUpdateNotificationStatus = (title, msg, url, type, date) => {
    console.log('onClickUpdateNotificationStatus====', msg)
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

  render() {
    return (
      <div>
        <Grid container>
          <Grid item md={3}>
            {this.state.notificationData && this.state.notificationData.length > 0 ? (
              <div>
                <div class="cardwallet_back_notification">
                  <div class="NotificationCard-BG text-center" style={{ display: 'block' }}>
                    <div class="cardwallet_onover_backdivMain" style={{ cursor: 'auto' }}>
                      <div style={{ display: 'flex', width: '100%', textAlign: 'left' }}>
                        <img src={Notices} class="cardwaalet_img_backside" />
                        <div class="notification_label_backside" style={{ paddingTop: '8px' }}>
                          Announcements & Notices
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', width: '64%' }}>
                        <Link
                          to="/AnnouncementNotification"
                          style={{ textDecoration: 'none', float: 'right', marginRight: '-107px', marginTop: '-31px' }}
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
                        marginTop: '0px'
                                              }}
                    >
                      {this.state.notificationData.slice(0, 5).map((data, idx) => {
                        
                        return data.type == 'NOTICE' ||
                          data.type == 'Notice' ||
                          data.type == 'notice' ||
                          data.type == 'NOTICES' ||
                          data.type == 'Notices' ||
                          data.type == 'notices' ? (
                          <div
                            key={idx}
                            class="cardwallet_onover_backdiv"
                            onClick={() =>
                              this.onClickUpdateNotificationStatus(
                                data.title,
                                data.message,
                                data.urlPath,
                                data.type,
                                this.publishDateformat(data.createdDate)
                              )
                            }
                          >
                            <img src={NoticeIcon} class="Notification_category_img" />
                            <div class="notification_category_Message">
                              <p class="notification_category_label">
                                {data.type}
                                <span className="notification_details_Date">{this.dateformat(data.createdDate)}</span>
                              </p>
                              <div style={{ color: '#4e4e4e' }}>{data.title}</div>
                            </div>
                          </div>
                        ) : data.type == 'ANNOUNCEMENT' || data.type == 'announcement' ? (
                          <div
                            key={idx}
                            class="cardwallet_onover_backdiv"
                            onClick={() =>
                              this.onClickUpdateNotificationStatus(
                                data.title,
                                data.message,
                                data.urlPath,
                                data.type,
                                this.publishDateformat(data.createdDate)
                              )
                            }
                          >
                            <img src={AnnouncementNotification} class="Notification_category_img" />
                            <div class="notification_category_Message">
                              <p class="notification_category_label">
                                {data.type}
                                <span className="notification_details_Date">{this.dateformat(data.createdDate)}</span>
                              </p>
                              <div style={{ color: '#4e4e4e' }}>{data.title}</div>
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
                    <img src={Notices} className="cardwaalet_img_backside" />
                    <div className="notification_label_backside">Announcements & Notices</div>
                    <div style={{ textAlign: 'right' }}>
                      <Link to="/AnnouncementNotification" style={{ textDecoration: 'none', float: 'right', marginRight: '-56px' }}>
                        {' '}
                        <span className="viewAll">View all</span>
                      </Link>
                    </div>
                  </div>

                  <div style={{ padding: '35px' }}>
                    <div className="tempModalTxt">You currently have no new announcements & notices. </div>
                  </div>
                </div>
              </div>
            )}
          </Grid>

          <Modal show={this.state.noticeModal} centered className="ChangPayModal paymentWalletModal" backdrop="static">
            <Modal.Body style={{ maxHeight: '410px', overflowY: 'auto' }}>
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
                  <div style={{ fontWeight: 'bold', marginTop: '5%', marginLeft: '3%' }}>{this.state.publishDate}</div>
                </Grid>

                <div
                  class="The-fellowship-incurs-additional-fees-related-to-p"
                                                      dangerouslySetInnerHTML={{ __html: this.state.content }}
                >
                  {/* {this.state.content} */}
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer style={{ justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={() => this.setState({ noticeModal: false })}
                style={{ marginRight: '15px' }}
                className="announcementFooterButton"
              >
                OK
              </Button>

              <Button
                variant="contained"
                onClick={() => this.handleOk(null, this.state.URL, this.state.Type)}
                style={{ marginRight: '15px' }}
                className="announcementFooterButton"
              >
                VIEW DETAILS
              </Button>
            </Modal.Footer>
          </Modal>
        </Grid>
      </div>
    )
  }
}
export default AnnouncementCard
