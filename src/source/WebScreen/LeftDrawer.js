import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logoutApplication } from '../../components/layout/Header'
import { getOs } from '../../utils/utility'
import { getCardDetails, gethealthcard, getproviderLink, getRxSimpleShareData } from '../ApiCall'
import NotificationIcon from '../Images/notification/my_notifications_icon_active.svg'
export default class LeftDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: localStorage.getItem('subscriberName'),
      id: false,
      link: 'http://www.mdlive.com/FlexCare',
      fliptLink: '',
      showmyneeds: false,
      dashboardCards: [],
      pharmaShow: false
    }
    this.closeparentdrawer = this.closeparentdrawer.bind(this)
    this.opendocuments = this.opendocuments.bind(this)
    this.opencontacts = this.opencontacts.bind(this)
  }

  componentDidMount() {
    gethealthcard().then(resp => {
      let data = {
        memberSSN: resp.data.memberIdCardList[0].memberSSN,
        type: 'family'
      }
      getRxSimpleShareData(data).then(res => {
        if (res && Array.isArray(res)) {
          res.map(value => {
            if (value.addon === 'UHS RxSimpleShare' && value.status === 'AC') this.setState({ pharmaShow: true })
          })
        }
      })
    })
    var os = getOs()

    if (os == 'Mac OS') {
      this.setState({ link: 'http://www.mdlive.com/FlexCare', fliptLink: 'https://apps.apple.com/us/app/flipt/id1329040340' })
    }
    if (os == 'iOS') {
      this.setState({
        link: 'https://apps.apple.com/us/app/mdlive/id839671393',
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
        let modifiedData = res.data.response.reduce((prev, next) => {
          if (next.cardtitle === 'ProgramInformation') {
            return [...prev, next, { cardtitle: 'CuramLifeCard' }]
          }
          return [...prev, next]
        }, [])
        this.setState({
          dashboardCards: modifiedData
        })
      }
    })
  }

  closeparentdrawer(enable) {
    if (enable) {
      this.props.drawercloseparent(false)
    } else {
      this.props.openTempModal()
    }
  }

  openExpenseCard() {
    this.props.drawercloseExpenseOpen(false)
  }

  opendocuments() {
    this.props.documentsopen(false)
  }

  handleSignout = () => {
    logoutApplication()
  }

  opennotices(enable) {
    if (enable) {
      window.open('https://www.universalhealthfellowship.org/notices/')
    } else {
      this.props.openTempModal()
    }
  }

  opencontacts() {
    this.props.contactopen(false)
  }
  
  openccuramlife = () => {
    // console.log("::::::::::::::::: props ", this.props)
    // this.props.
    this.props.openccuramlife(true)
  }

  openprovider(enable) {
    if (enable) {
      var windowReference = window.open()
      getproviderLink().then(res => {
        if (res.data && res.data.length > 0) {
          let providerLink = res.data[0].fieldValue
          windowReference.location = providerLink
        } else {
          alert('Data Not Availabel')
        }
      })
    } else {
      this.props.openTempModal()
    }
  }

  openfaqs(enable) {
    if (enable) {
      window.open('https://www.universalhealthfellowship.org/FAQs/')
    } else {
      this.props.openTempModal()
    }
  }

  openhealthcard() {
    this.setState({ id: true })
  }

  opentelemed() {
    window.open(this.state.link)
  }
  openFlipt = () => {
    window.open(this.state.fliptLink)
  }

  render() {
    return (
      <div class="leftdrawer">
        <div className="ld_user_div">
          <AccountCircleIcon />
          <div className="ld_username">Hello, {this.state.username} </div>
        </div>
        <Link
          to="/"
          style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
          class={`ld_menu_container ${this.props.name == 'Dashboard' && 'ld_menu_container_selected'}`}
        >
          <div class="ld_image_div_container">
            <img src={require('../Images/LeftDrawer Icon/dashboard-icon-active (1).svg')} style={{ marginRight: '20px' }} />
          </div>
          <div clas="ld_menu_name">Dashboard</div>
        </Link>
        <Link
          to="/Notification"
          style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
          class={`ld_menu_container ${this.props.name == 'My Notifications' && 'ld_menu_container_selected'}`}
        >
          <div class="ld_image_div_container">
            <img src={NotificationIcon} style={{ marginRight: '20px' }} />
          </div>
          <div clas="ld_menu_name">My Notifications</div>
        </Link>

        <Link
          to="/AnnouncementNotification"
          style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
          class={`ld_menu_container ${this.props.name == 'Announcements' && 'ld_menu_container_selected'}`}
        >
          <div class="ld_image_div_container">
            <img src={require('../Images/LeftDrawer Icon/notices-icon-active.svg')} style={{ marginRight: '20px' }} />
          </div>
          <div clas="ld_menu_name">Announcements & Notices</div>
        </Link>
        {/* <Link
          to="/PaymentWallet"
          style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
          class={`ld_menu_container ${this.props.name == 'Announcements' && 'ld_menu_container_selected'}`}
        >
          <div class="ld_image_div_container">
            <img src={require('../Images/LeftDrawer Icon/payment_wallet_icon_active.svg')} style={{ marginRight: '20px' }} />
          </div>
          <div clas="ld_menu_name">Payment Wallet</div>
        </Link> */}
        {this.state.dashboardCards &&
          this.state.dashboardCards.map(card => (
            <>
              {(() => {
                switch (card.cardtitle) {
                  case 'Documents':
                    return (
                      <>
                        <div
                          to="/"
                          style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                          className={`ld_menu_container ${this.props.name == 'Documents' && 'ld_menu_container_selected'}`}
                          onClick={() => this.opendocuments()}
                        >
                          <div className="ld_image_div_container">
                            <img src={require('../Images/LeftDrawer Icon/documents-icon-active.svg')} style={{ marginRight: '20px' }} />
                          </div>
                          <div clas="ld_menu_name">Documents</div>
                        </div>
                        <div
                          style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                          onClick={() => this.opentelemed()}
                          className={`ld_menu_container ${this.props.name == 'Telemed' && 'ld_menu_container_selected'}`}
                        >
                          <div className="ld_image_div_container">
                            <img src={require('../Images/LeftDrawer Icon/telemed-icon-active.svg')} style={{ marginRight: '20px' }} />
                          </div>
                          <div clas="ld_menu_name">Telemed</div>
                        </div>
                        {this.state.pharmaShow && (
                          <div
                            style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                            onClick={() => this.openFlipt()}
                            className={`ld_menu_container ${this.props.name == 'flipt' && 'ld_menu_container_selected'}`}
                          >
                            <div className="ld_image_div_container">
                              <img
                                src={require('../../assets/images/pharma_benefits_icon_active.svg')}
                                style={{ marginRight: '20px', width: '20px' }}
                              />
                            </div>
                            <div clas="ld_menu_name">Pharma</div>
                          </div>
                        )}
                      </>
                    )

                  case 'FindProvider':
                    return (
                      <div
                        style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                        className={`ld_menu_container ${this.props.name == 'Find a Provider' && 'ld_menu_container_selected'}`}
                        onClick={() => this.openprovider(card.enable)}
                      >
                        <div className="ld_image_div_container">
                          <img src={require('../Images/LeftDrawer Icon/find-a-provider-icon-active.svg')} style={{ marginRight: '20px' }} />
                        </div>
                        <div clas="ld_menu_name">Find a Provider</div>
                      </div>
                    )

                  case 'MembershipId':
                    return (
                      <div
                        style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                        className={`ld_menu_container ${this.props.name == 'Membership Id' && 'ld_menu_container_selected'}`}
                        onClick={() => this.closeparentdrawer(card.enable)}
                      >
                        <div className="ld_image_div_container">
                          <img src={require('../Images/LeftDrawer Icon/membership-card-icon-active.svg')} style={{ marginRight: '20px' }} />
                        </div>
                        <div clas="ld_menu_name"> Membership Card</div>
                      </div>
                    )

                  case 'ProgramInformation':
                    return card.enable ? (
                      <>
                        <>
                          <Link
                            to="/ProgramInformation"
                            style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                            class={`ld_menu_container ${this.props.name == 'Program Information' && 'ld_menu_container_selected'}`}
                          >
                            <div class="ld_image_div_container">
                              <img
                                src={require('../Images/LeftDrawer Icon/program-info-icon-active.svg')}
                                style={{ marginRight: '20px' }}
                              />
                            </div>
                            <div clas="ld_menu_name">Program Information</div>
                          </Link>
                        </>
                        {/* 
                        <div
                          onClick={this.openccuramlife}
                          style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                          class={`ld_menu_container ${this.props.name == 'Announcements' && 'ld_menu_container_selected'}`}
                        >
                          <div class="ld_image_div_container" id="curam lifeimage">
                            <img
                              src={require('../Images/CuramLife.svg')}
                              style={{ marginRight: '20px', width: '39px', marginLeft: '-6px', height: '34px' }}
                            />
                          </div>
                          <div clas="ld_menu_name">UHF / Curam Wellness Center™</div>
                        </div>
                       */}
                      </>
                    ) : (
                      <>
                        {' '}
                        <>
                          <div
                            style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                            className={`ld_menu_container ${this.props.name == 'Program Information' && 'ld_menu_container_selected'}`}
                            onClick={() => this.props.openTempModal()}
                          >
                            <div className="ld_image_div_container">
                              <img
                                src={require('../Images/LeftDrawer Icon/program-info-icon-active.svg')}
                                style={{ marginRight: '20px' }}
                              />
                            </div>
                            <div clas="ld_menu_name">Program Information</div>
                          </div>
                        </>
                        {/* <div
                          onClick={this.openccuramlife}
                          style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                          class={`ld_menu_container ${this.props.name == 'Announcements' && 'ld_menu_container_selected'}`}
                        >
                          <div class="ld_image_div_container" id="curam lifeimage">
                            <img
                              src={require('../Images/CuramLife.svg')}
                              style={{ marginRight: '20px', width: '39px', marginLeft: '-6px', height: '34px' }}
                            />
                          </div>
                          <div clas="ld_menu_name">UHF / Curam Wellness Center™</div>
                        </div> */}
                      </>
                    )
                  case 'CuramLifeCard':
                    return (
                      <div
                        onClick={this.openccuramlife}
                        style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                        class={`ld_menu_container ${this.props.name == 'CuramLifeCard' && 'ld_menu_container_selected'}`}
                      >
                        <div class="ld_image_div_container" id="curam lifeimage">
                          <img
                            src={require('../Images/CuramLife.svg')}
                            style={{ marginRight: '20px', width: '39px', marginLeft: '-6px', height: '34px' }}
                          />
                        </div>
                        <div clas="ld_menu_name">UHF / Curam Wellness Center™</div>
                      </div>
                    )

                  case 'MyNeeds':
                    return card.enable ? (
                      <Link
                        to="/MyNeeds"
                        style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                        class={`ld_menu_container ${this.props.name == 'MyNeeds' && 'ld_menu_container_selected'}`}
                      >
                        <div class="ld_image_div_container">
                          <img src={require('../Images/LeftDrawer Icon/my-needs-icon-active.svg')} style={{ marginRight: '20px' }} />
                        </div>
                        <div clas="ld_menu_name">My Needs</div>
                      </Link>
                    ) : (
                      <div
                        style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                        className={`ld_menu_container ${this.props.name == 'MyNeeds' && 'ld_menu_container_selected'}`}
                        onClick={() => this.props.openTempModal()}
                      >
                        <div className="ld_image_div_container">
                          <img src={require('../Images/LeftDrawer Icon/my-needs-icon-active.svg')} style={{ marginRight: '20px' }} />
                        </div>
                        <div clas="ld_menu_name">My Needs</div>
                      </div>
                    )

                  case 'MyTransaction':
                    return card.enable ? (
                      <Link
                        to="/Transaction"
                        style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                        class={`ld_menu_container ${this.props.name == 'MyTransactions' && 'ld_menu_container_selected'}`}
                      >
                        <div class="ld_image_div_container">
                          <img
                            src={require('../Images/LeftDrawer Icon/my_transactions_icon_active (1).svg')}
                            style={{ marginRight: '20px' }}
                          />
                        </div>
                        <div clas="ld_menu_name">My Transactions</div>
                      </Link>
                    ) : (
                      <div
                        style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                        className={`ld_menu_container ${this.props.name == 'MyTransactions' && 'ld_menu_container_selected'}`}
                        onClick={() => this.props.openTempModal()}
                      >
                        <div className="ld_image_div_container">
                          <img
                            src={require('../Images/LeftDrawer Icon/my_transactions_icon_active (1).svg')}
                            style={{ marginRight: '20px' }}
                          />
                        </div>
                        <div clas="ld_menu_name">My Transactions</div>
                      </div>
                    )

                  case 'HealthQuestionnaire':
                    return card.enable ? (
                      <Link
                        to="/Medical"
                        style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                        class={`ld_menu_container ${this.props.name == 'Medical Questionnaire' && 'ld_menu_container_selected'}`}
                      >
                        <div class="ld_image_div_container">
                          <img src={require('../Images/LeftDrawer Icon/medical-q-icon-active.svg')} style={{ marginRight: '20px' }} />
                        </div>
                        <div clas="ld_menu_name">Health Questionnaire</div>
                      </Link>
                    ) : (
                      <div
                        style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                        className={`ld_menu_container ${this.props.name == 'Medical Questionnaire' && 'ld_menu_container_selected'}`}
                        onClick={() => this.props.openTempModal()}
                      >
                        <div className="ld_image_div_container">
                          <img src={require('../Images/LeftDrawer Icon/medical-q-icon-active.svg')} style={{ marginRight: '20px' }} />
                        </div>
                        <div clas="ld_menu_name">Health Questionnaire</div>
                      </div>
                    )

                  case 'ContactInformation':
                    return (
                      <div
                        style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                        className={`ld_menu_container ${this.props.name == 'Contact Information' && 'ld_menu_container_selected'}`}
                        onClick={() => this.opencontacts()}
                      >
                        <div className="ld_image_div_container">
                          <img src={require('../Images/LeftDrawer Icon/contact-info-icon-active.svg')} style={{ marginRight: '20px' }} />
                        </div>
                        <div clas="ld_menu_name">Contact Information</div>
                      </div>
                    )

                  case 'FAQs':
                    return (
                      <div
                        style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
                        className={`ld_menu_container ${this.props.name == 'FAQs' && 'ld_menu_container_selected'}`}
                        onClick={() => this.openfaqs(card.enable)}
                      >
                        <div className="ld_image_div_container">
                          <img src={require('../Images/LeftDrawer Icon/FAQs icon (active).svg')} style={{ marginRight: '20px' }} />
                        </div>
                        <div clas="ld_menu_name">FAQs</div>
                      </div>
                    )
                }
              })()}
            </>
          ))}

        <div
          style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}
          class={`ld_menu_container ${this.props.name == 'Sign Out' && 'ld_menu_container_selected'}`}
          onClick={this.handleSignout}
        >
          <div class="ld_image_div_container">
            <img src={require('../Images/LeftDrawer Icon/logout-icon-active.svg')} style={{ marginRight: '20px' }} />
          </div>
          <div clas="ld_menu_name">Sign Out</div>
        </div>
      </div>
    )
  }
}
