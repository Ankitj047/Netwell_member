import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import firebase from '../../../firebase'
import { getAnnouncemetDetails, getNotificationDetails } from '../../ApiCall'
import CommonLoader from '../../CommonLoader'
import AnnouncementNotification from '../../Images/notification/notification_announcement_icon.svg'
import NoticeIcon from '../../Images/notification/notification_notice_icon.svg'
import ChatIcon from '../../WebScreen/ChatBox/ChatIcon'
import MobCopyright from '../MobCopyright'
import MobileFooter from '../MobileFooter'
import MobileHeader from '../MobileHeader'
import { NavigateURL } from './NavigationURL'
export default class AnnouncementMobile extends Component {
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
      loadMoreBtnshow: false,
      noticeModal: false,
      content: '',
      header: '',
      publishDate: '',
      URL: null,
      Type: null
    }
  }
  componentDidMount() {
    this.getAnnouncement()
    const msg = firebase.messaging.isSupported() ? firebase.messaging() : null
    if (msg) {
      msg.onMessage(payload => {
        this.getAnnouncement()
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
  getAnnouncement = () => {
    this.setState({
      loader: true
    })
    getAnnouncemetDetails(this.state.page).then(res => {
      if (res.data && res.data.response) {
        //    if(res.data.response.length > 0){
        if (res.data.response.pageList > 20) {
          this.setState({ loadMoreBtnshow: true })
        } else {
          this.setState({ loadMoreBtnshow: false })
        }
        // }
        this.setState({
          data: res.data.response.notificationDetails.sort((a, b) => -a.type.localeCompare(b.type)),
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

  onClickUpdateNotificationStatus = (title, msg, url, type, date) => {
    console.log('onClickUpdateNotificationStatus====', title, url, msg, date)
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

  goBack = () => {
    this.props.history.push('/')
  }
  render() {
    return (
      <div>
        {this.state.loader ? <CommonLoader /> : null}

        <MobileHeader name="Announcements & Notices" />

        <div className="notificationListWrapper">
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableBody>
                {this.state.data ? (
                  this.state.data.map((data, index) => {
                    return data.type == 'NOTICE' ||
                      data.type == 'Notice' ||
                      data.type == 'notice' ||
                      data.type == 'NOTICES' ||
                      data.type == 'Notices' ||
                      data.type == 'notices' ? (
                      <TableRow key={index}>
                        <TableCell class="notification_details_mainDiv">
                          <>
                            <img src={NoticeIcon} class="Notification_category_img_details" />
                            <div
                              class="notification_category_Message_details"
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
                              <p class="notification_category_label_details">
                                {data.type}
                                <span className="notification_details_Date">{this.dateformat(data.createdDate)}</span>
                              </p>
                              <div className="notification_details_message">{data.title}</div>
                            </div>
                          </>
                        </TableCell>
                      </TableRow>
                    ) : data.type == 'ANNOUNCEMENT' || data.type == 'announcement' ? (
                      <TableRow key={index}>
                        <TableCell class="notification_details_mainDiv">
                          <>
                            <img src={AnnouncementNotification} class="Notification_category_img_details" />
                            <div
                              class="notification_category_Message_details"
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
                              <p class="notification_category_label_details">
                                {data.type}
                                <span className="notification_details_Date">{this.dateformat(data.createdDate)}</span>
                              </p>
                              <div className="notification_details_message">{data.title}</div>
                            </div>
                          </>
                        </TableCell>
                      </TableRow>
                    ) : null
                  })
                ) : (
                  <div className="data_not_found" style={{ height: '90vh' }}>
                    <p class="noneeds_msg_display" style={{ textAlign: 'center' }}>
                      You currently have no new announcements & notices.
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
                // style={{margin:'0px',padding:'15px',overflowX: 'auto',
                // whiteSpace: "pre-wrap"}}
                dangerouslySetInnerHTML={{ __html: this.state.content }}
              >
                {/* {this.state.content} */}
              </div>
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
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        <div style={{bottom:"9vh", position: 'relative'}}>
            <ChatIcon showAIChatIcon={true} />
          <ChatIcon/>
        </div>
        <div style={{bottom:"9vh", position: 'relative'}}>
          <MobCopyright/>
        </div>
        <div class="fixed-bottom">
          <MobileFooter />
        </div>
      </div>
    )
  }
}
