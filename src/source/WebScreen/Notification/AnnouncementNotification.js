import { Grid } from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CloseIcon from '@material-ui/icons/Close'
import ForumIcon from '@material-ui/icons/Forum'
import moment from 'moment'
import React, { Component } from 'react'
import Modal1 from 'react-awesome-modal'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import customStyle from '../../../components/healthqn/CSS/stylesheet_UHS'
import { getAnnouncemetDetails } from '../../ApiCall'
import CommonLoader from '../../CommonLoader'
import AnnouncementNotification from '../../Images/notification/notification_announcement_icon.svg'
import NoticeIcon from '../../Images/notification/notification_notice_icon.svg'
import MobileFooter from '../../MobileScreen/MobileFooter'
import CommonFooter from '../CommonFooter'
import Header from '../Header'
import { NavigateURL } from './NavigationURL'

const CrudButton = withStyles(customStyle.crudBtn)(Fab)

const NextButton = withStyles(customStyle.viewBtn)(Button)

export default class AnnouncementNotificationCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataUnread: [],
      dataRead: [],
      noticeData: [],
      data: [],
      message: null,
      loader: false,
      date: '',
      page: 0,
      rowsPerPage: 20,
      rowCount: 0,
      createdDate: [],
      tempNotAvailableModal: false,
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
    this.loadQueryParams()
    document.addEventListener('myevent1', event => {
      this.setState({ page: 0 }, () => this.getNotification())
    })
  }

  loadQueryParams = () => {
    if (localStorage.getItem('openModal') == true) {
      this.openTempModal()
    }
  }

  getAnnouncemet = () => {
    this.setState({
      loader: true
    })
    getAnnouncemetDetails(this.state.page).then(res => {
      if (res.data && res.data.response) {
        this.setState({
          data: res.data.response.notificationDetails.sort((a, b) => -a.type.localeCompare(b.type)),
          rowCount: res.data.response.pageList,
          loader: false
        })
      } else {
        this.setState({ message: 'Notification not available !', loader: false })
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

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage }, () => this.getNotification())
  }

  onClickUpdateNotificationStatus = (title, msg, url, type, date) => {
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
    if (localStorage.getItem('OpenModal') == true || localStorage.getItem('OpenModal') == 'true') {
      this.openTempModal()
      this.setState({ noticeModal: false })
    }
    this.setState({ noticeModal: false })
  }

  openTempModal = () => {
    this.setState({
      sidebarOpen: false,
      tempNotAvailableModal: true
    })
  }

  closeTempModal = () => {
    localStorage.removeItem('OpenModal')
    this.setState({ tempNotAvailableModal: false })
  }

  goBack = () => {
    this.props.history.push('/')
  }
  render() {
    return (
      <div className="progInfoMainWrapper">
        {this.state.loader ? <CommonLoader /> : null}
        <div className="mobileViewHeader">
          <div className="mobile_header">
            <Link to="/">
              <ArrowBackIcon style={{ width: '24px', height: '24px', color: '#ffffff' }} />
            </Link>
            <div className="mobile_header_title">Announcements & Notices </div>
          </div>
        </div>

        <div className="webHeader">
          <Header name={'Announcements'} />
        </div>
        <div className="container progInfoContainer">
          <span className="Back_page" onClick={this.goBack}>
            <ArrowBackIcon style={{ width: '24px', height: '24px', color: ' #543379', marginRight: '5px' }} onClick={this.goBack} />
            BACK
          </span>
          <div className="commonWrap">
            <div className="myNotificationSection_mob">
              <h2 className="progInfoTitle">Announcements & Notices</h2>

              <TableContainer component={Paper} style={{ height: '50vh', overflow: 'auto' }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableBody>
                    {this.state.data ? (
                      this.state.data.map((data, index) => {
                        return data.type == 'ANNOUNCEMENT' || data.type == 'announcement' ? (
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
                                  <div style={{ color: '#4e4e4e' }}>{data.title}</div>
                                </div>
                              </>
                            </TableCell>
                          </TableRow>
                        ) : data.type == 'NOTICE' ||
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
                                  <div style={{ color: '#4e4e4e' }}>{data.title}</div>
                                </div>
                              </>
                            </TableCell>
                          </TableRow>
                        ) : null
                      })
                    ) : (
                      <TableRow>
                        <TableCell align="center" class="notification_details_mainDiv">
                          You currently have no new announcements & notices.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {this.state.data ? (
                <TablePagination
                  rowsPerPageOptions={[]}
                  component="div"
                  count={this.state.rowCount}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              ) : null}
            </div>
            <div className="progInfoFooter" style={{ paddingTop: '0px' }}>
              <div className="row">
                <div className="col-md-12 dpFlex">
                  <div className="footerText" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <div>
                      <p>Need help?</p>
                      <p>Chat with our Health Share Representative</p>
                      <p>or call 1 (888) 366 6243.</p>
                    </div>
                    <div style={{ marginLeft: 12 }} className="">
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
              </div>
            </div>
          </div>
        </div>

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
              ></div>
            </div>
          </Modal.Body>

          <Modal.Footer style={{ justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => this.setState({ noticeModal: false })}
              style={{ marginRight: '15px', padding: '0px' }}
              className="announcementFooterButton"
            >
              OK
            </Button>

            <Button
              variant="contained"
              onClick={() => this.handleOk(null, this.state.URL, this.state.Type)}
              style={{ marginRight: '15px', padding: '0px' }}
              className="announcementFooterButton"
            >
              VIEW DETAILS
            </Button>
          </Modal.Footer>
        </Modal>

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

        <div className="webFooter">
          <CommonFooter />
        </div>
        <div className="mobileFooter">
          <MobileFooter />
        </div>
      </div>
    )
  }
}

export const getQueryParams = () => {
  let url = window.location.href

  let queryObj = {}

  if (url !== undefined && url !== null && url.split('?').length > 1) {
    let queryString1 = url.split('?openModal=')[1]
    let queryParams = new URLSearchParams(queryString1)

    if (queryString1 == 'true') {
      localStorage.setItem('openModal', true)
    }
  }
}
