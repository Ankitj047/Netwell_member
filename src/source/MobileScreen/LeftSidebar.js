import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logoutApplication } from '../../components/layout/Header'
import { getOs } from '../../utils/utility'
import { getCardDetails, gethealthcard, getMyneeds, getproviderLink, getRxSimpleShareData } from '../ApiCall'
import './LeftSidebar.css'
export default class LeftSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: localStorage.getItem('subscriberName'),
      x: 'select',
      link: 'http://www.mdlive.com/FlexCare',
      showmyneeds: false,
      dashboardCards: [],
      fliptLink: '',
      pharmaShow: false
    }
  }

  componentDidMount() {
    var os = getOs()
    gethealthcard().then(resp => {
      let data = {
        memberSSN: resp.data.memberIdCardList[0].memberSSN,
        type: 'family'
      }
      getRxSimpleShareData(data).then(res => {
        res.map(value => {
          if (value.addon === 'UHS RxSimpleShare' && value.status === 'AC') this.setState({ pharmaShow: true })
        })
      })
    })

    if (os == 'Mac OS') {
      this.setState({ link: 'http://www.mdlive.com/FlexCare', fliptLink: 'https://apps.apple.com/us/app/flipt/id1329040340' })
    }
    if (os == 'iOS') {
      this.setState({
        link: 'https://itunes.apple.com/us/app/mdlive/id839671393',
        fliptLink: 'https://apps.apple.com/us/app/flipt/id1329040340'
      })
    }
    if (os == 'iPadOS') {
      this.setState({
        link: 'https://itunes.apple.com/us/app/mdlive/id839671393',
        fliptLink: 'https://apps.apple.com/us/app/flipt/id1329040340'
      })
    }
    if (os == 'Windows') {
      this.setState({ link: 'http://www.mdlive.com/FlexCare', fliptLink: 'https://fliptrx.com/' })
    }
    if (os == 'Android') {
      this.setState({
        link: 'https://play.google.com/store/apps/details?id=com.mdlive.mobile',
        fliptLink: 'https://play.google.com/store/apps/details?id=com.gwlabs.flipt&hl=en_US&gl=US'
      })
    }
    if (os == 'Linux') {
      this.setState({ link: 'http://www.mdlive.com/FlexCare', fliptLink: 'https://fliptrx.com/' })
    }

    getCardDetails().then(res => {
      if (res.data.response) {
        this.setState({
          dashboardCards: res.data.response
        })
      }
    })
  }

  handleSignout = () => {
    if (sessionStorage.getItem('USER_FROM') == 'native' || sessionStorage.getItem('USER_FROM') == 'Native') {
      this.props.logoutprops()
    } else {
      logoutApplication()
    }
  }

  openprovider() {
    getproviderLink().then(res => {
      if (res.data && res.data.length > 0) {
        let providerLink = res.data[0].fieldValue
        let url = ''
        url = providerLink
        window.location.href = providerLink
      }
    })
  }

  opentelemed() {
    window.open(this.state.link)
  }
  findprovider(enable) {
    if (enable) {
      this.props.findprovider(false)
    } else {
      this.props.tempModalOpen()
    }
  }
  notices(enable) {
    if (enable) {
      this.props.notices(false)
    } else {
      this.props.tempModalOpen()
    }
  }
  faqopen(enable) {
    if (enable) {
      this.props.faqopen(false)
    } else {
      this.props.tempModalOpen()
    }
  }
  programinformation() {
    this.props.programinformation(false)
  }

  myneedsdata() {
    getMyneeds().then(res => {
      if (res.data.length > 0) {
        this.setState({ showmyneeds: true })
      } else {
        this.setState({ showmyneeds: false })
      }
    })
  }
  openFlipt = () => {
    window.open(this.state.fliptLink)
  }
  render() {
    return (
      <div class="mob_leftdrawer">
        <img src={require('../Images/Banner/uhs-logo.svg')} class="mob_ld_user_div_logo_img" />

        <div class="mob_ld_user_div">
          <AccountCircleIcon />
          <div class="mob_ld_username">Hello, {this.state.username}</div>
        </div>

        <div class={`mob_ld_menu_container ${this.props.name == 'Dashboard' && 'mob_ld_menu_container_selected'}`}>
          <img
            src={require('../Images/LeftDrawer Icon/dashboard-icon-active (1).svg')}
            style={{ marginRight: '20px' }}
            className="mob_ld_menu_img"
          />
          <div className="mob_ld_menu_name">Dashboard</div>
        </div>

        <Link to="/MobileNotification" class="mob_ld_menu_container">
          <img
            className="mob_ld_menu_img"
            src={require('../Images/notification/my_notifications_icon_active.svg')}
            style={{ marginRight: '17px' }}
          />
          <div className="mob_ld_menu_name">My Notifications</div>
        </Link>

        <Link to="/AnnouncementMobile" class="mob_ld_menu_container">
          <img
            className="mob_ld_menu_img"
            src={require('../Images/LeftDrawer Icon/notices-icon-active.svg')}
            style={{ marginRight: '17px' }}
          />
          <div className="mob_ld_menu_name">Announcements & Notices</div>
        </Link>

        {this.state.dashboardCards &&
          this.state.dashboardCards.map(card => (
            <>
              {(() => {
                switch (card.cardtitle) {
                  case 'Documents':
                    return (
                      <>
                        <Link to="/DocumentsScreen" class="mob_ld_menu_container">
                          <img
                            className="mob_ld_menu_img"
                            src={require('../Images/LeftDrawer Icon/documents-icon-active.svg')}
                            style={{ marginRight: '20px' }}
                          />
                          <div className="mob_ld_menu_name">Documents</div>
                        </Link>
                        <div className="mob_ld_menu_container" onClick={() => this.opentelemed()}>
                          <img
                            className="mob_ld_menu_img"
                            src={require('../Images/LeftDrawer Icon/telemed-icon-active.svg')}
                            style={{ marginRight: '20px' }}
                          />
                          <div className="mob_ld_menu_name">Telemed</div>
                        </div>
                        {this.state.pharmaShow && (
                          <div className="mob_ld_menu_container" onClick={() => this.openFlipt()}>
                            <img
                              className="mob_ld_menu_img"
                              src={require('../../assets/images/pharma_benefits_icon_active.svg')}
                              style={{ marginRight: '20px', width: '20px' }}
                            />
                            <div className="mob_ld_menu_name">Pharma</div>
                          </div>
                        )}
                      </>
                    )

                  case 'FindProvider':
                    return (
                      <div className="mob_ld_menu_container" onClick={() => this.findprovider(card.enable)}>
                        <img
                          className="mob_ld_menu_img"
                          src={require('../Images/LeftDrawer Icon/find-a-provider-icon-active.svg')}
                          style={{ marginRight: '20px' }}
                        />
                        <div className="mob_ld_menu_name">Find a Provider</div>
                      </div>
                    )

                  case 'MembershipId':
                    return card.enable ? (
                      localStorage.getItem('CLIENT_ID') == '6548' ||
                      localStorage.getItem('CLIENT_ID') == 6548 ||
                      localStorage.getItem('CLIENT_ID') == '4367' ||
                      localStorage.getItem('CLIENT_ID') == 4367 ||
                      localStorage.getItem('CLIENT_ID') == '5540' ||
                      localStorage.getItem('CLIENT_ID') == 5540 ||
                      localStorage.getItem('CLIENT_ID') == '4376' ||
                      localStorage.getItem('CLIENT_ID') == 4376 ? (
                        <Link to="/HealthyShareCard" style={{ textDecoration: 'none' }} class="mob_ld_menu_container">
                          <img
                            className="mob_ld_menu_img"
                            src={require('../Images/LeftDrawer Icon/membership-card-icon-active.svg')}
                            style={{ marginRight: '20px' }}
                          />
                          <div className="mob_ld_menu_name"> Membership Card</div>
                        </Link>
                      ) : (
                        <Link to="/DigitalHealthCardNew" style={{ textDecoration: 'none' }} class="mob_ld_menu_container">
                          <img
                            className="mob_ld_menu_img"
                            src={require('../Images/LeftDrawer Icon/membership-card-icon-active.svg')}
                            style={{ marginRight: '20px' }}
                          />
                          <div className="mob_ld_menu_name">UHS Membership Card</div>
                        </Link>
                      )
                    ) : (
                      <div className="mob_ld_menu_container" onClick={() => this.props.tempModalOpen()}>
                        <img
                          className="mob_ld_menu_img"
                          src={require('../Images/LeftDrawer Icon/membership-card-icon-active.svg')}
                          style={{ marginRight: '20px' }}
                        />
                        <div className="mob_ld_menu_name">UHS Membership Card</div>
                      </div>
                    )
                  // case 'Paymentwallet':
                  //   return card.enable ? (
                  //     <Link to="/MyPaymentWalletMobile" class="mob_ld_menu_container" style={{ textDecoration: 'none' }}>
                  //       <img
                  //         className="mob_ld_menu_img"
                  //         src={require('../Images/LeftDrawer Icon/payment_wallet_icon_active.svg')}
                  //         style={{ marginRight: '20px' }}
                  //       />
                  //       <div className="mob_ld_menu_name">My Payment Wallet</div>
                  //     </Link>
                  //   ) : (
                  //     <div className="mob_ld_menu_container" onClick={() => this.props.tempModalOpen()}>
                  //       <img
                  //         className="mob_ld_menu_img"
                  //         src={require('../Images/LeftDrawer Icon/payment_wallet_icon_active.svg')}
                  //         style={{ marginRight: '20px' }}
                  //       />
                  //       <div className="mob_ld_menu_name">My Payment Wallet</div>
                  //     </div>
                  //   )
                  case 'HealthyLife':
                    return card.enable ? (
                      <Link to="/HealthyShareCard" style={{ textDecoration: 'none' }} class="mob_ld_menu_container">
                        <img
                          className="mob_ld_menu_img"
                          src={require('../Images/LeftDrawer Icon/membership-card-icon-active.svg')}
                          style={{ marginRight: '20px' }}
                        />
                        <div className="mob_ld_menu_name">UHS Membership Card</div>
                      </Link>
                    ) : (
                      <div className="mob_ld_menu_container" onClick={() => this.props.tempModalOpen()}>
                        <img
                          className="mob_ld_menu_img"
                          src={require('../Images/LeftDrawer Icon/membership-card-icon-active.svg')}
                          style={{ marginRight: '20px' }}
                        />
                        <div className="mob_ld_menu_name">UHS Membership Card</div>
                      </div>
                    )
                  case 'ProgramInformation':
                    return card.enable ? (
                      <>
                        <Link to="/ProgramInformation" class="mob_ld_menu_container" style={{ textDecoration: 'none' }}>
                          <img
                            className="mob_ld_menu_img"
                            src={require('../Images/LeftDrawer Icon/program-info-icon-active.svg')}
                            style={{ marginRight: '20px' }}
                          />
                          <div className="mob_ld_menu_name">Program Information</div>
                        </Link>
                        <Link to="/MobileCuramLifeCardNotification" class="mob_ld_menu_container">
                          <img
                            className="mob_ld_menu_img"
                            src={require('../Images/CuramLife.svg')}
                            style={{ marginRight: '17px', width: 30, height: 30, marginLeft: -5 }}
                          />
                          <div className="mob_ld_menu_name" style={{ display: 'flex', alignItems: 'center' }}>
                            UHF / Curam Wellness Center™
                          </div>
                        </Link>
                      </>
                    ) : (
                      <>
                        <div className="mob_ld_menu_container" onClick={() => this.props.tempModalOpen()}>
                          <img
                            className="mob_ld_menu_img"
                            src={require('../Images/LeftDrawer Icon/program-info-icon-active.svg')}
                            style={{ marginRight: '20px' }}
                          />
                          <div className="mob_ld_menu_name">Program Information</div>
                        </div>{' '}
                        <Link to="/MobileCuramLifeCardNotification" class="mob_ld_menu_container">
                          <img
                            className="mob_ld_menu_img"
                            src={require('../Images/CuramLife.svg')}
                            style={{ marginRight: '17px', width: 30, height: 30, marginLeft: -5 }}
                          />
                          <div className="mob_ld_menu_name">UHF / Curam Wellness Center™</div>
                        </Link>
                      </>
                    )

                  case 'MyNeeds':
                    return card.enable ? (
                      <Link to="/MyNeedsMobile" class="mob_ld_menu_container" style={{ textDecoration: 'none' }}>
                        <img
                          className="mob_ld_menu_img"
                          src={require('../Images/LeftDrawer Icon/my-needs-icon-active.svg')}
                          style={{ marginRight: '20px' }}
                        />
                        <div className="mob_ld_menu_name">My Needs</div>
                      </Link>
                    ) : (
                      <div className="mob_ld_menu_container" onClick={() => this.props.tempModalOpen()}>
                        <img
                          className="mob_ld_menu_img"
                          src={require('../Images/LeftDrawer Icon/my-needs-icon-active.svg')}
                          style={{ marginRight: '20px' }}
                        />
                        <div className="mob_ld_menu_name">My Needs</div>
                      </div>
                    )

                  case 'MyTransaction':
                    return card.enable ? (
                      <Link to="/MyTransactionMobile" class="mob_ld_menu_container" style={{ textDecoration: 'none' }}>
                        <img
                          className="mob_ld_menu_img"
                          src={require('../Images/LeftDrawer Icon/my_transactions_icon_active.svg')}
                          style={{ marginRight: '20px' }}
                        />
                        <div className="mob_ld_menu_name">My Transactions</div>
                      </Link>
                    ) : (
                      <div className="mob_ld_menu_container" onClick={() => this.props.tempModalOpen()}>
                        <img
                          className="mob_ld_menu_img"
                          src={require('../Images/LeftDrawer Icon/my_transactions_icon_active.svg')}
                          style={{ marginRight: '20px' }}
                        />
                        <div className="mob_ld_menu_name">My Transactions</div>
                      </div>
                    )

                  case 'HealthQuestionnaire':
                    return card.enable ? (
                      <Link to="/MobileMedical" style={{ textDecoration: 'none' }} class="mob_ld_menu_container">
                        <img
                          className="mob_ld_menu_img"
                          src={require('../Images/LeftDrawer Icon/medical-q-icon-active.svg')}
                          style={{ marginRight: '20px' }}
                        />
                        <div className="mob_ld_menu_name">Health Questionnaire</div>
                      </Link>
                    ) : (
                      <div className="mob_ld_menu_container" onClick={() => this.props.tempModalOpen()}>
                        <img
                          className="mob_ld_menu_img"
                          src={require('../Images/LeftDrawer Icon/medical-q-icon-active.svg')}
                          style={{ marginRight: '20px' }}
                        />
                        <div className="mob_ld_menu_name">Health Questionnaire</div>
                      </div>
                    )

                  // case 'Notices':
                  //   return (
                  //     <div className="mob_ld_menu_container" onClick={() => this.notices(card.enable)}>
                  //       <img
                  //         className="mob_ld_menu_img"
                  //         src={require('../Images/LeftDrawer Icon/notices-icon-active.svg')}
                  //         style={{ marginRight: '20px' }}
                  //       />
                  //       <div className="mob_ld_menu_name">Notices</div>
                  //     </div>
                  //   )

                  case 'ContactInformation':
                    return (
                      <Link to="/ContactScreen" class="mob_ld_menu_container">
                        <img src={require('../Images/LeftDrawer Icon/contact-info-icon-active.svg')} style={{ marginRight: '20px' }} />
                        <div className="mob_ld_menu_name">Contact Information</div>
                      </Link>
                    )

                  case 'FAQs':
                    return (
                      <div className="mob_ld_menu_container" onClick={() => this.faqopen(card.enable)}>
                        <img
                          className="mob_ld_menu_img"
                          src={require('../Images/LeftDrawer Icon/FAQs icon (active).svg')}
                          style={{ marginRight: '20px' }}
                        />
                        <div className="mob_ld_menu_name">FAQs</div>
                      </div>
                    )
                }
              })()}
            </>
          ))}

        <div class="mob_ld_menu_container" onClick={this.handleSignout}>
          <img
            className="mob_ld_menu_img"
            src={require('../Images/LeftDrawer Icon/logout-icon-active.svg')}
            style={{ marginRight: '20px' }}
          />
          <div className="mob_ld_menu_name">Sign Out</div>
        </div>

        <div class="mob_version_no">
          <div className="mob_ld_menu_name_version">Version 4.1.0</div>
        </div>
      </div>
    )
  }
}
