import { Box, Grid, Tab, Tabs } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import { createMuiTheme, makeStyles, ThemeProvider, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import CloseIcon from '@material-ui/icons/Close'
import ForumIcon from '@material-ui/icons/Forum'
import axios from 'axios'
import moment from 'moment'
import React, { Component, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useHistory, withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import {
  getAgentInfo,
  getCardEnableData,
  getClientDetails,
  getEncryptData,
  getEnrolledMemberData,
  getEnrollMemberInfoById,
  gethealthcard,
  getProgramInfo,
  getRxSimpleShareData,
  getSourceID
} from '../../ApiCall'
import CommonLoader from '../../CommonLoader'
import MobCopyright from '../../MobileScreen/MobCopyright'
import MobileFooter from '../../MobileScreen/MobileFooter'
// import '../../MobileScreen/MobileFooter.css'
import ChatIcon from '../ChatBox/ChatIcon'
import CommonFooter from '../CommonFooter'
import Header from '../Header'
import customStyle from './CSS/stylesheet_UHS'
import i18n from './i18next'
import './ProgramInformation.css'

const CrudButton = withStyles(customStyle.crudBtn)(Fab)
const NextButton = withStyles(customStyle.ChangePayButton)(Button)

window.mobileAndTabletCheck = function() {
  let check = false
  ;(function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true
  })(navigator.userAgent || navigator.vendor || window.opera)
  return check
}

const TableHeadCell = withStyles({
  root: {
    borderBottom: 'none',
    padding: '8px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',

    letterSpacing: '1.12px',
    textAlign: 'left',
    color: '#454d58'
  }
})(TableCell)

const TableBodyCell = withStyles({
  root: {
    borderBottom: 'none',
    padding: '8px',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: '500',

    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#000'
  }
})(TableCell)

const AntTabs = withStyles(customStyle.ProgTabs)(Tabs)
// const NextButton = withStyles(customStyle.PayButton)(Button)

class ProgramInformation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      sampleData: sampleData,
      barRange: '0',
      barRangeYellow: '0',
      acsmTotal: '',
      acsmmet: '',
      acsmremain: '',
      nsamet: '',
      nsaremain: '',
      programname: '',
      programname2: '',
      showwithacsm: false,
      clientID: '',
      associationId: '',
      clientName: '',
      brokerId: '',
      subID: '',
      healthToolAddonActive: false,
      rxSimpleShareActive: false,
      addOnsObj: [],
      counterHealthTool: 0,
      counterRxSimpleShare: 0,
      enrolledDataMember: [],
      selectedTab:"summary",
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  componentDidMount() {
    this.setState({
      loader: true
    })
    this.getCardEnable()
    this.getAddonsData()
    this.getEnrolledMemberData()
    getProgramInfo()
      .then(res => {
        if (res.data && res.data.programInfo) {
          this.setState({
            programInfo: res.data.programInfo,
            eligibleServices: res.data.planInfo,
            expenseLimits: res.data.expenseLimits
          })

          let clientId = {
            clientId: localStorage.getItem('CLIENT_ID')
          }
          getClientDetails(clientId).then(response => {
            if (response.data.response) {
              this.setState(
                {
                  clientID: response.data.response.clientId,
                  associationId: response.data.response.association,
                  clientName: response.data.response.clientName
                },
                () => {
                  if (localStorage.getItem('SOURCE') !== 'NEO') {
                    this.getSourceIDbyemail()
                  }
                }
              )
            }
          })

          var str = res.data.programInfo.programName
          if (str.includes('+')) {
            var str1 = res.data.programInfo.programName
            var res1 = str1.split(' ')
            this.setState({ programname: res1[0], programname2: ' with ' + res1[2], showwithacsm: true })
          } else {
            this.setState({ programname: res.data.programInfo.programName, showwithacsm: false })
          }

          var percentascm = res.data.acsm.met / res.data.acsm.remaining
          var percentascm = percentascm * 100

          var percentnsa = res.data.nsa.met / res.data.nsa.remaining
          var percentnsa = percentnsa * 100

          this.setState({
            acsmmet: res.data.acsm.met,
            acsmTotal: res.data.acsm.total,
            acsmremain: res.data.acsm.remaining,
            nsamet: res.data.nsa.met,
            nsaremain: res.data.nsa.remaining,
            barRange: percentnsa,
            barRangeYellow: percentascm,
            loader: false
          })
        } else {
          this.setState({ loader: false })
        }
      })
      .catch()
  }

  getAddonsData = () => {
    gethealthcard().then(resp => {
      let data = {
        memberSSN: resp.data.memberIdCardList[0].memberSSN,
        type: 'family'
      }
      getRxSimpleShareData(data).then(res => {
        this.setState(
          {
            addOnsObj: res
          },
          () => {
            let counterHealthTool = 0
            let counterRxSimpleShare = 0

            this.state.addOnsObj.forEach(item => {
              // counts[x] = (counts[x] || 0) + 1;
              counterHealthTool = item.addon == 'UHS Health Tools' ? counterHealthTool + 1 : counterHealthTool
              counterRxSimpleShare = item.addon == 'UHS RxSimpleShare' ? counterRxSimpleShare + 1 : counterRxSimpleShare
            })

            let findRxSimpleData = res.find(obj => obj.addon === 'UHS RxSimpleShare' && obj.status === 'AC')
            let findHealToolData = res.find(obj => obj.addon === 'UHS Health Tools' && obj.status === 'AC')
            if (findRxSimpleData) {
              this.setState({
                rxSimpleShareActive: true,
                counterRxSimpleShare: counterRxSimpleShare
              })
            }
            if (findHealToolData) {
              this.setState({
                healthToolAddonActive: true,
                counterHealthTool: counterHealthTool
              })
            }
          }
        )
      })
    })
  }

  getEnrolledMemberData = () => {
    getEnrolledMemberData().then(res => {
      if (res && res.data) {
        this.setState({
          enrolledDataMember: res.data
        })
      }
    })
  }

  jumpToAddons() {
    let url = window.location.href
    if (url.split('ProgramInformation?').length > 1) {
      let queryString = url.split('ProgramInformation?')[1]
      let queryParams = new URLSearchParams(queryString)
      let addons = decodeURI(queryParams.get('change_addons'))
      if (addons === 'true') {
        this.changeProgram()
      } else {
        this.updateHousehold()
      }
      this.props.history.replace('/ProgramInformation')
    }
  }
  getCardEnable = () => {
    let client_id = localStorage.getItem('CLIENT_ID')

    getCardEnableData(client_id, 'ProgramInformation').then(res => {
      if (res.data.response.enable == 'false' || res.data.response.enable == false) {
        window.location.href = '/'
      }
    })
  }

  getSourceIDbyemail() {
    getSourceID().then(res => {
      this.agentInfoget(res.data.memberIdSource)
      this.getEnrollMember(res.data.memberIdSource)
    })
  }

  agentInfoget(sourceid) {
    if (sourceid) {
      getAgentInfo(sourceid).then(res => {
        if (res.data.response) {
          this.setState({
            agentemail: res.data.response.email,
            agentname: res.data.response.name,
            agentno: res.data.response.phone,
            brokerId: res.data.response.brokerId
          })
        } else {
        }
      })
    }
  }
  getEnrollMember = memberId => {
    getEnrollMemberInfoById(memberId).then(response => {
      if (response && response.data.response) {
        this.setState({ subID: response.data.response.subId, loader: false }, () => {
          this.jumpToAddons()
        })
      } else {
        this.setState({ loader: false }, () => {
          this.jumpToAddons()
        })
      }
    })
  }

  changeProgram = () => {
    let obj = {
      clientId: this.state.clientName,
      associationId: this.state.associationId,
      brokerId: this.state.brokerId,
      fromMember: true,
      isSelectProgram: true,
      user_subId: localStorage.getItem('userMail'),
      memberId: localStorage.getItem('sourceid'),
      subID: this.state.subID
    }
    if (this.state.subID === null || this.state.subID === undefined || this.state.subID === '') {
      this.setState({
        errorModal: true
      })
    } else {
      let windowReference = window.open()
      getEncryptData(obj).then(response => {
        let URL = process.env.REACT_APP_LOGIN_ENROLLMENT + 'login#state=' + response.data.response
        windowReference.location = URL
      })
    }
  }

  updateHousehold = () => {
    let obj = {
      clientId: this.state.clientName,
      associationId: this.state.associationId,
      brokerId: this.state.brokerId,
      fromMember: true,
      user_subId: localStorage.getItem('userMail'),
      isHouseholdUpdate: true,
      memberId: localStorage.getItem('sourceid'),
      subID: this.state.subID,
      isEditCensus: false
    }
    if (this.state.subID === null || this.state.subID === undefined || this.state.subID === '') {
      this.setState({
        errorModal: true
      })
    } else {
      let windowReference = window.open()
      getEncryptData(obj).then(response => {
        let URL = process.env.REACT_APP_LOGIN_ENROLLMENT + 'login#state=' + response.data.response

        windowReference.location = URL
      })
    }
  }

  goBack = () => {
    this.props.history.push('/')
  }

  handleCloseErrorModal = () => {
    this.setState({
      errorModal: false
    })
  }
  selectTab=(newValue)=>{
    this.setState({selectedTab: newValue})
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
            <div className="mobile_header_title">Program Information </div>
          </div>
        </div>

        <div className="webHeader">
          <Header name={'Program Information'} />
        </div>

        <div className="container progInfoContainer">
          <sapn className="Back_page" onClick={this.goBack}>
            <ArrowBackIcon style={{ width: '24px', height: '24px', color: ' #543379', marginRight: '5px' }} onClick={this.goBack} />
            BACK
          </sapn>

          <div className="commonWrap">
            <ProgramInfoCard state={this.state} selectTab={(newValue) => this.selectTab(newValue)} />
            <div className="progInfoFooter" style={{ paddingTop: '0px', display: window.mobileAndTabletCheck() ? 'none' : '' }}>
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
          <div className="mobileFooter">
            <div style={{ bottom: '9vh', paddingBottom:
                    this.state.selectedTab==="summary"|| this.state.selectedTab==="enrolledMembers" || this.state.selectedTab==="addOns"?
                      "15vh":"7vh"
                  }}>
              <ChatIcon 
                shiftup={ this.state.selectedTab==="enrolledMembers" || this.state.selectedTab==="addOns"? true : false} 
                changeProgram={this.state.selectedTab==="summary"? true:false}
                showAIChatIcon={true} />
              <div>
                <ChatIcon />
              </div>
              <div>
                <MobCopyright />
              </div>
            </div>
          </div>
          <div className="fixed-bottom" style={{ visibility: window.mobileAndTabletCheck() ? '' : 'hidden' }}>
            <MobileFooter />
          </div>
        </div>

        <div className="webFooter">
          <CommonFooter />
        </div>

        {/* ===============================Error Modal====================================== */}

        <Modal size="small" show={this.state.errorModal} onHide={this.handleCloseErrorModal} centered backdrop="static">
          <Modal.Header>
            <Modal.Title>Message</Modal.Title>
            <IconButton aria-label="close" onClick={this.handleCloseErrorModal} style={{ marginTop: '-13px' }}>
              <CloseIcon />
            </IconButton>
          </Modal.Header>

          <Modal.Body>
            <b> {i18n.t('PROGRAM_INFORMATION_ERROR_MESSAGE.SUBID_MISSING')}</b>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseErrorModal} class="ButtonBG">
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
export default withRouter(ProgramInformation)

const names = ['James', 'Paul', 'John', 'George', 'Ringo']
const sampleData = [
  { id: 733, planId: '7006', idcardField: 'Telemedicine', fieldValue: '$0' },
  { id: 735, planId: '7006', idcardField: 'PCP Office Visit', fieldValue: '$35' },
  { id: 736, planId: '7006', idcardField: 'Urgent Care', fieldValue: '$100' },
  { id: 737, planId: '7006', idcardField: 'ER Visit', fieldValue: '$400' }
]

const ProgramInfoCard = props => {
  const tabInQuery = window.location.href.includes('changeDependants') ? 'enrolledMembers' : 'summary'
  const [selectedTab, setSelectedTab] = useState('summary')
  const history = useHistory()

  const openChat = () => {
    sessionStorage.setItem('chatwindow', true)
    history.push('/')
  }
  const selectTab =(newValue)=>{
    setSelectedTab(newValue)
    props.selectTab(newValue)
  }
  return (
    <div className="progInfoSection" style={{ paddingBottom: '0.5px' }}>
      <h2 className="progInfoTitle">Program Information</h2>
      <Box sx={{ width: '100%' }}>
        <AntTabs
          variant="scrollable"
          value={selectedTab}
          onChange={(e, newValue) => selectTab(newValue)}
          textColor="rgba(255, 255, 255, 0.12)"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          // variant="scrollable"
          id="tabs"
          style={{ width: '100%' }}
        >
          <Tab label="Summary" value="summary" style={{ textTransform: 'capitalize',width:'20%' }} />
          <Tab label="Eligible Services" value="eligibleServices" style={{ textTransform: 'capitalize',width:'20%' }} />
          <Tab label="Expense Limits" value="expenseLimits" style={{ textTransform: 'capitalize',width:'20%' }} />
          <Tab label="Add-ons" value="addOns" style={{ textTransform: 'capitalize',width:'20%' }} />
          <Tab label="Enrolled Members" value="enrolledMembers" style={{ textTransform: 'capitalize',width:'20%' }} />
        </AntTabs>

        {selectedTab === 'summary' && <SummaryTabContent props={props} />}
        {selectedTab === 'eligibleServices' && <EligibleServiceTabContent props={props} />}
        {selectedTab === 'expenseLimits' && <ExpenseLimitTabContent props={props} />}
        {selectedTab === 'addOns' && <AddOnsTabContent props={props} />}
        {selectedTab === 'enrolledMembers' && <EnrolledMembersTabContent props={props} />}
      </Box>
    </div>
  )
}

const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const SummaryTabContent = ({ props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [msgModal, setmsgModal] = useState(null)
  const [loader, setLoader] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const closeSuccessModal = () => setIsSuccess(false)
  const setModalValue = val => {
    if (val == 'PROCEED') {
      setLoader(true)
      let obj1 = {
        Subject: localStorage.getItem('sourceid'),

        Origin: 'External',

        External_Application_Name__c: 'Member Portal',

        Status: 'New',

        Type: 'Account Update',

        SuppliedEmail: localStorage.getItem('userMail'),

        Description: 'Request to change'
      }

      let url = process.env.REACT_APP_BASE_URL + 'v1/memberportal/caseCreation'

      axios
        .post(url, obj1, {
          headers: {
            Authorization: 'Bearer' + ' ' + localStorage.getItem('bearerToken')
          }
        })
        .then(response => {
          if (response.data.success == 'true' || response.data.success == true) {
            setmsgModal('PROCEED')
            setIsOpen(false)
            setIsSuccess(true)
            setLoader(false)
          }
          // this.setState({errorModal:true,open:false,loader:false,MsgModal:'Request send successfully!'})
        })
    }
    if (val == 'CANCEL') {
      setLoader(true)
      setmsgModal('CANCEL')
      setIsOpen(false)
      setIsSuccess(true)
      setLoader(false)
    }
    // setIsOpen(false)
  }
  return (
    <div className="row sumary">
      <div className="col-12 col-md-3" style={{ margin: '0px 0px 30px 0px' }}>
        <h1 className="logoFont UHS6">{props.state.programname}</h1>
        {props.state.showwithacsm ? <h1 className="logoFont ACSM">{props.state.programname2}</h1> : null}
      </div>
      <div className="col-12 col-md-4 headerSumary">
        <h6 className="infoHeading">Summary</h6>
        {localStorage.getItem('NETWORK_NAME') == 'smartshare50' || localStorage.getItem('NETWORK_NAME') == 'smartshare25' ? null : (
          <div className="progessBarWrapper">
            <div className="barTitle">Non-Sharable amount</div>
            <div className="progressContainer">
              <div className="progressIndicator" style={{ width: props.state.barRange + '%' }}>
                <ArrowRightAltIcon viewBox="0 6 24 24" style={{ color: '#ffffff' }} />
              </div>
            </div>

            <div className="amtWrapper">
              <span className="metAmt">${numberWithCommas(props.state.nsamet)} met</span>
              <span className="remainingAmt">${numberWithCommas(props.state.nsaremain)} remaining</span>
            </div>
          </div>
        )}

        <div className="progessBarWrapper">
          {(props.state.acsmmet == 0 && props.state.acsmremain == 0 && props.state.acsmTotal == 0) ||
          (props.state.acsmmet == 0.0 && props.state.acsmremain == 0.0 && props.state.acsmTotal == 0.0) ? null : (
            <>
              <div className="barTitle">Annual Co-Share Maximum Amount</div>
              <div className="progressContainerYellow">
                <div className="progressIndicatorYellow" style={{ width: props.state.barRangeYellow + '%' }}>
                  <ArrowRightAltIcon viewBox="0 6 24 24" style={{ color: '#ffffff' }} />
                </div>
              </div>

              <div className="amtWrapper">
                <span className="metAmt metAmtYellow">${numberWithCommas(props.state.acsmmet)} met</span>
                <span className="remainingAmt">${numberWithCommas(props.state.acsmremain)} remaining</span>
              </div>
            </>
          )}
        </div>
      </div>
      {window.mobileAndTabletCheck() ? (
        <Grid container className="Bottom-Blue">
          <Grid item xs={12} style={{ textAlign: 'center', alignItems: 'center' }}>
            <button type="button" variant="outlined" onClick={openModal} className="programInfoButton" style={{ marginTop: '10px' }}>
              CHANGE PROGRAM
            </button>
          </Grid>
        </Grid>
      ) : (
        <div className="col-md-6" style={{ margin: '35px 0px 70px 0px' }}>
          <button type="button" onClick={openModal} className="programInfoButton" style={{ marginTop: '10px' }}>
            CHANGE PROGRAM
          </button>
        </div>
      )}
      <Modal size="small" show={isOpen} onHide={closeModal} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>Message</Modal.Title>
          <IconButton aria-label="close" onClick={closeModal} style={{ marginTop: '-13px' }}>
            <CloseIcon />
          </IconButton>
        </Modal.Header>

        <Modal.Body>
          {loader ? <CommonLoader /> : null}
          <span style={{ fontSize: '16px', fontWeight: '500' }}>
            You can submit a request to change your membership program. Our Member Services team will get in touch with you at the earliest
            and guide you through the process.
          </span>
        </Modal.Body>

        <Modal.Footer style={{ justifyContent: 'center' }}>
          <Button variant="secondary" onClick={() => setModalValue('PROCEED')} class="ButtonBG">
            PROCEED
          </Button>
          <Button variant="secondary" onClick={() => setModalValue('CANCEL')} class="ButtonBG">
            CANCEL
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="small" show={isSuccess} onHide={closeSuccessModal} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>Message</Modal.Title>
          <IconButton aria-label="close" onClick={closeSuccessModal} style={{ marginTop: '-13px' }}>
            <CloseIcon />
          </IconButton>
        </Modal.Header>

        <Modal.Body>
          {loader ? <CommonLoader /> : null}
          <b>
            {msgModal == 'PROCEED' ? (
              <span style={{ fontSize: '16px', fontWeight: '500' }}>Your request has been submitted.</span>
            ) : (
              <span style={{ fontSize: '16px', fontWeight: '500' }}>
                We could not process your request. Please contact our Member Services team at 1 (888) 366 6243 ,Monday through Friday 7:00
                am to 6:00 pm CST or email at customerservice@universalhealthfellowship.org
                {/* {localStorage.getItem('CONTACT_NUMBER')} */}
                {/* <Member Services Email>. */}
              </span>
            )}
          </b>
        </Modal.Body>

        <Modal.Footer style={{ justifyContent: 'center' }}>
          <Button variant="secondary" onClick={closeSuccessModal} class="ButtonBG">
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

const EligibleServiceTabContent = ({ props }) => {
  return (
    <div className="row EligibleServiceTabContent">
      <div className="col-12 col-md-5">
        <div className="leftData">
          <div className="row">
            <div className="col-12 col-md-5" style={{ paddingBottom: '16px' }}>
              {/* <h6 className="infoHeading">Eligible Services</h6> */}
              <div className="row">
                {props.state.eligibleServices &&
                  props.state.eligibleServices.map(col => (
                    <div className="col-6 col-md-12" style={{ marginBottom: '20px' }}>
                      <p className="label">{col.idcardField}</p>
                      <p className="number" dangerouslySetInnerHTML={{ __html: col.fieldValue }}></p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ExpenseLimitTabContent = ({ props }) => {
  return (
    <div className="row EligibleServiceTabContent">
      <div className="col-12 col-md-5">
        <div className="leftData">
          <div className="row">
            <div className="col-12 col-md-7" style={{ paddingBottom: '16px' }}>
              <div className="row">
                {props.state.expenseLimits &&
                  props.state.expenseLimits.map(col => (
                    <div className="col-6 col-md-12" style={{ marginBottom: '20px' }}>
                      <p className="label" dangerouslySetInnerHTML={{ __html: col.idcardField }}></p>
                      <p className="number">{col.fieldValue}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AddOnsTabContent = ({ props }) => {
  const fetchData = () => {
    let obj = {
      clientId: props.state.clientName,
      associationId: props.state.associationId,
      brokerId: props.state.brokerId,
      fromMember: true,
      isSelectProgram: true,
      user_subId: localStorage.getItem('userMail'),
      memberId: localStorage.getItem('sourceid'),
      subID: props.state.subID
    }
    // if (props.state.subID === null || props.state.subID === undefined || props.state.subID === '') {
    //   this.setState({
    //     errorModal: true
    //   })
    // } else {
    const windowReference = window.open()
    getEncryptData(obj).then(response => {
      const URL = process.env.REACT_APP_LOGIN_ENROLLMENT + 'login#state=' + response.data.response
      windowReference.location = URL
    })
    // }
  }

  const dateformat = date => {
    const enrollmentDate = getDateInUTC(date, true)
    let nowdate = getDateInUTC(new Date(), true)

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

  const getDateInUTC = (date, getInMillisecs) => {
    if (date) {
      let newDateTime = new Date(date)
      return new Date(newDateTime)
    }

    return date
  }

  return (
    <div className="row addonsTab">
      <div className="col-12 col-md-6 paddingRXSimpleShare">
        {/* {props.state.showwithacsm ? <h1 className="logoFont RxSimpleShare">RxSimpleShare</h1> : null} */}

        <h1 className="logoFont RxSimpleShare" style={{ marginBottom: '15px' }}>
          RxSimpleShare
        </h1>

        <div className="col-12 col-md-10" style={{ paddingLeft: '0px' }}>
          {props.state.rxSimpleShareActive ? (
            <>
              <span className={'Program_status_button Active'}>Active</span>
              <div className="row" style={{ marginLeft: '0px' }}>
                <div className="col-7 col-md-7" style={{ paddingLeft: '0px' }}>
                  <p className="AddOnslabel">Members Enrolled</p>
                  {props.state.addOnsObj &&
                    props.state.addOnsObj.map((val, idx) => {
                      return val.addon == 'UHS RxSimpleShare' && val.status == 'AC' ? (
                        <div className="row" style={{ marginLeft: '0px' }}>
                          <p className="AddOnsValue">{val.firstName + ' ' + val.lastName}</p>
                        </div>
                      ) : null
                    })}
                </div>

                <div className="col-5 col-md-5" style={{ paddingLeft: '0px' }}>
                  <p className="AddOnslabel">Effective Date</p>

                  {props.state.addOnsObj &&
                    props.state.addOnsObj.map((val, idx) => {
                      return val.addon == 'UHS RxSimpleShare' && val.status == 'AC' ? (
                        <div className="row" style={{ marginLeft: '0px' }}>
                          <p className="AddOnsValue">{dateformat(val.addOnEffectiveDate)}</p>
                        </div>
                      ) : null
                    })}
                </div>
              </div>
              <div className="row" style={{ marginLeft: '0px' }}>
                <div className="col-12 col-md-12" style={{ paddingLeft: '0px' }}>
                  <p className="AddOnslabel">Add-On Monthly Fee</p>
                  <p className="AddOnsValue">
                    ${props.state.counterRxSimpleShare ? props.state.counterRxSimpleShare * 25 : 25}{' '}
                    <span className="AddOnslabel">(Family Total)</span>{' '}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <span className={'Program_status_button DECLINED'}>Inactive</span>
              <div className="row" style={{ marginLeft: '0px' }}>
                <div className="col-12 col-md-12" style={{ paddingLeft: '0px' }}>
                  <p className="AddOnslabel">Add-On Monthly Fee</p>
                  <p className="AddOnsValue">
                    $25 <span className="AddOnslabel">(Family Total)</span>{' '}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* -----------health tool data------------------ */}

      <div className="col-12 col-md-5">
        <div className="leftDataAddons">
          <div className="row" style={{ height: '315px', overflowY: 'auto' }}>
            <div className="col-12 col-md-12" style={{ paddingBottom: '16px' }}>
              <h1 className="logoFont RxSimpleShare" style={{ marginBottom: '15px' }}>
                Health Tools
              </h1>
              <div className="col-12 col-md-12" style={{ paddingLeft: '0px' }}>
                {props.state.healthToolAddonActive == true ? (
                  <>
                    <span className={'Program_status_button Active'}>Active</span>
                    <div className="row" style={{ marginLeft: '0px' }}>
                      <div className="col-7 col-md-6" style={{ paddingLeft: '0px' }}>
                        <p className="AddOnslabel">Members Enrolled</p>

                        {props.state.addOnsObj &&
                          props.state.addOnsObj.map((val, idx) => {
                            return val.addon == 'UHS Health Tools' && val.status == 'AC' ? (
                              <div className="row" style={{ marginLeft: '0px' }}>
                                <div className="col-12 col-md-6" style={{ paddingLeft: '0px' }}>
                                  <p className="AddOnsValue">{val.firstName + ' ' + val.lastName}</p>
                                </div>
                              </div>
                            ) : null
                          })}
                        <div className="row" style={{ marginLeft: '0px' }}>
                          <div className="col-12 col-md-12" style={{ paddingLeft: '0px' }}>
                            <p className="AddOnslabel">Add-On Monthly Fee</p>
                            <p className="AddOnsValue">
                              $25<span className="AddOnslabel">(Family Total)</span>{' '}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-5 col-md-5" style={{ paddingLeft: '0px' }}>
                        <p className="AddOnslabel">Effective Date</p>

                        {props.state.addOnsObj &&
                          props.state.addOnsObj.map((val, idx) => {
                            return val.addon == 'UHS Health Tools' && val.status == 'AC' ? (
                              <div className="row" style={{ marginLeft: '0px' }}>
                                <div className="col-12 col-md-6" style={{ paddingLeft: '0px' }}>
                                  <p className="AddOnsValue">{dateformat(val.addOnEffectiveDate)}</p>
                                </div>
                              </div>
                            ) : null
                          })}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <span className={'Program_status_button DECLINED'}>Inactive</span>
                    <div className="row" style={{ marginLeft: '0px' }}>
                      <div className="col-12 col-md-12" style={{ paddingLeft: '0px' }}>
                        <p className="AddOnslabel">Add-On Monthly Fee</p>
                        <p className="AddOnsValue">
                          $25 <span className="AddOnslabel">(Family Total)</span>{' '}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        {window.mobileAndTabletCheck() ? (
          <Grid container className="Bottom-Blue">
            <Grid item xs={12} style={{ textAlign: 'center', alignItems: 'center' }}>
              <button
                type="button"
                onClick={fetchData}
                disabled={
                  localStorage.getItem('SOURCE') === 'NEO' ||
                  localStorage.getItem('CLIENT_ID') == '6548' ||
                  localStorage.getItem('CLIENT_ID') == 6548 ||
                  localStorage.getItem('CLIENT_ID') == '4367' ||
                  localStorage.getItem('CLIENT_ID') == 4367 ||
                  localStorage.getItem('CLIENT_ID') == '5540' ||
                  localStorage.getItem('CLIENT_ID') == 5540 ||
                  localStorage.getItem('CLIENT_ID') == '4376' ||
                  localStorage.getItem('CLIENT_ID') == 4376 ||
                  localStorage.getItem('CLIENT_ID') == 5541 ||
                  localStorage.getItem('CLIENT_ID') == '5541' ||
                  localStorage.getItem('CLIENT_ID') == 4377 ||
                  localStorage.getItem('CLIENT_ID') == '4377'
                }
                className={
                  localStorage.getItem('SOURCE') === 'NEO' ||
                  localStorage.getItem('CLIENT_ID') == '6548' ||
                  localStorage.getItem('CLIENT_ID') == 6548 ||
                  localStorage.getItem('CLIENT_ID') == '4367' ||
                  localStorage.getItem('CLIENT_ID') == 4367 ||
                  localStorage.getItem('CLIENT_ID') == '5540' ||
                  localStorage.getItem('CLIENT_ID') == 5540 ||
                  localStorage.getItem('CLIENT_ID') == '4376' ||
                  localStorage.getItem('CLIENT_ID') == 4376 ||
                  localStorage.getItem('CLIENT_ID') == 5541 ||
                  localStorage.getItem('CLIENT_ID') == '5541' ||
                  localStorage.getItem('CLIENT_ID') == 4377 ||
                  localStorage.getItem('CLIENT_ID') == '4377'
                    ? 'programInfoButtonDisable'
                    : 'programInfoButton'
                }
                // style={{ margin: '10px 0px 30px 0px' }}
              >
                MANAGE ADD-ONS
              </button>
              {/* <button type="button" variant="outlined" onClick={openModal} className="programInfoButton" style={{ marginTop: '10px' }}>
             CHANGE PROGRAM
           </button> */}
            </Grid>
          </Grid>
        ) : (
          <button
            type="button"
            onClick={fetchData}
            disabled={
              localStorage.getItem('SOURCE') === 'NEO' ||
              localStorage.getItem('CLIENT_ID') == '6548' ||
              localStorage.getItem('CLIENT_ID') == 6548 ||
              localStorage.getItem('CLIENT_ID') == '4367' ||
              localStorage.getItem('CLIENT_ID') == 4367 ||
              localStorage.getItem('CLIENT_ID') == '5540' ||
              localStorage.getItem('CLIENT_ID') == 5540 ||
              localStorage.getItem('CLIENT_ID') == '4376' ||
              localStorage.getItem('CLIENT_ID') == 4376 ||
              localStorage.getItem('CLIENT_ID') == 5541 ||
              localStorage.getItem('CLIENT_ID') == '5541' ||
              localStorage.getItem('CLIENT_ID') == 4377 ||
              localStorage.getItem('CLIENT_ID') == '4377'
            }
            className={
              localStorage.getItem('SOURCE') === 'NEO' ||
              localStorage.getItem('CLIENT_ID') == '6548' ||
              localStorage.getItem('CLIENT_ID') == 6548 ||
              localStorage.getItem('CLIENT_ID') == '4367' ||
              localStorage.getItem('CLIENT_ID') == 4367 ||
              localStorage.getItem('CLIENT_ID') == '5540' ||
              localStorage.getItem('CLIENT_ID') == 5540 ||
              localStorage.getItem('CLIENT_ID') == '4376' ||
              localStorage.getItem('CLIENT_ID') == 4376 ||
              localStorage.getItem('CLIENT_ID') == 5541 ||
              localStorage.getItem('CLIENT_ID') == '5541' ||
              localStorage.getItem('CLIENT_ID') == 4377 ||
              localStorage.getItem('CLIENT_ID') == '4377'
                ? 'programInfoButtonDisable'
                : 'programInfoButton'
            }
            style={{ marginBottom: '20px ' }}
          >
            MANAGE ADD-ONS
          </button>
        )}
      </div>
    </div>
  )
}

const EnrolledMembersTabContent = ({ props }) => {
  const theme = createMuiTheme({
    MuiTableCell: {
      paddingLeft: '30px',
      borderBottom: 'none'
    }
  })

  const useRowStyles = makeStyles({
    root: {
      borderBottom: '0px',
      '& > *': {
        borderBottom: 'unset',
        color: 'red'
      }
    }
  })

  const classes = useRowStyles()
  const updateHousehold = () => {
    let obj = {
      clientId: props.state.clientName,
      associationId: props.state.associationId,
      brokerId: props.state.brokerId,
      fromMember: true,
      user_subId: localStorage.getItem('userMail'),
      isHouseholdUpdate: true,
      memberId: localStorage.getItem('sourceid'),
      subID: props.state.subID,
      isEditCensus: false
    }
    let windowReference = window.open()
    getEncryptData(obj).then(response => {
      let URL = process.env.REACT_APP_LOGIN_ENROLLMENT + 'login#state=' + response.data.response

      windowReference.location = URL
    })
    // }
  }

  const dateformat = date => {
    const enrollmentDate = getDateInUTC(date, true)
    let nowdate = getDateInUTC(new Date(), true)

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

  const getDateInUTC = (date, getInMillisecs) => {
    if (date) {
      let newDateTime = new Date(date)
      return new Date(newDateTime)
    }

    return date
  }
  return (
    <div style={{ backgroundColor: '#fcfcfc' }}>
      <div className={'enrolledTableClass '} style={{marginLeft:'40px'}}>
        <div className="enrolledTable">
        <Paper className={'tableContainer '}>
          <TableContainer style={{ height: 300, backgroundColor: '#fcfcfc' }}>
            <Table className="mainTable " aria-labelledby="tableTitle" size={'medium'} aria-label="enhanced table" stickyHeader>
              <TableBody>
                <ThemeProvider theme={theme}>
                  <TableRow className={classes.root}>
                    <TableCell style={{ padding: 0 }} colSpan={12}>
                      <Box>
                        <TableRow>
                          <TableHeadCell align="left" className="innerTh" style={{ width: '250px' }}>
                            Member Name
                          </TableHeadCell>
                          <TableHeadCell align="left" className="innerTh" style={{ width: '200px' }}>
                            Member ID
                          </TableHeadCell>
                          <TableHeadCell align="left" className="innerTh" style={{ width: '200px' }}>
                            Relationship
                          </TableHeadCell>

                          <TableHeadCell align="left" className="innerTh" style={{ width: '211px' }}>
                            Birth Date
                          </TableHeadCell>

                          <TableHeadCell align="left" className="innerTh" style={{ width: '200px' }}>
                            Birth Gender
                          </TableHeadCell>

                          <TableHeadCell align="left" className="innerTh" style={{ width: '200px' }}>
                            Effective Date
                          </TableHeadCell>
                        </TableRow>

                        <TableBody>
                          {props.state.enrolledDataMember &&
                            props.state.enrolledDataMember.map((val, idx) => {
                              return idx == 0 ? (
                                <TableRow className="MuiTableCellclass">
                                  <TableBodyCell style={{ fontWeight: 'bold' }}>Adult 1 {val.firstName + ' ' + val.lastName}</TableBodyCell>
                                  <TableBodyCell style={{ fontWeight: 'bolder', color: '#5f2161' }}>{val.memberId}</TableBodyCell>
                                  <TableBodyCell style={{ fontWeight: 'bolder' }}>
                                    {val.relationshipCd == '18' ? 'Self' : val.relationshipCd == '19' ? 'Child' : 'Spouse'}
                                  </TableBodyCell>
                                  <TableBodyCell style={{ fontWeight: 'bolder' }}>{dateformat(val.dateOfBirth)}</TableBodyCell>
                                  <TableBodyCell style={{ fontWeight: 'bolder' }}>{val.gender == 'F' ? 'Female' : 'Male'}</TableBodyCell>
                                  <TableBodyCell style={{ fontWeight: 'bolder' }}>
                                    {val.benefits.map(dt => {
                                      return dateformat(dt.benefitBegin)
                                    })}
                                  </TableBodyCell>
                                </TableRow>
                              ) : (
                                <TableRow className="headClass">
                                  <TableBodyCell>
                                    Adult {idx + 1} {val.firstName + ' ' + val.lastName}
                                  </TableBodyCell>
                                  <TableBodyCell style={{ color: '#5f2161' }}>{val.memberId}</TableBodyCell>
                                  <TableBodyCell>
                                    {val.relationshipCd == '18' ? 'Self' : val.relationshipCd == '19' ? 'Child' : 'Spouse'}
                                  </TableBodyCell>
                                  <TableBodyCell>{dateformat(val.dateOfBirth)}</TableBodyCell>
                                  <TableBodyCell>{val.gender == 'F' ? 'Female' : 'Male'}</TableBodyCell>
                                  <TableBodyCell>
                                    {val.benefits.map(dt => {
                                      return dateformat(dt.benefitBegin)
                                    })}
                                  </TableBodyCell>
                                </TableRow>
                              )
                            })}
                        </TableBody>
                      </Box>
                    </TableCell>
                  </TableRow>
                </ThemeProvider>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        </div>
        <div className="col-md-12" style={{ paddingLeft: '0px', backgroundColor: '#fcfcfc' }}>
          {window.mobileAndTabletCheck() ? (
            <Grid container className="Bottom-Blue">
              <Grid item xs={12} style={{ textAlign: 'center', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={updateHousehold}
                  disabled={
                    localStorage.getItem('SOURCE') === 'NEO' ||
                    localStorage.getItem('CLIENT_ID') == '6548' ||
                    localStorage.getItem('CLIENT_ID') == 6548 ||
                    localStorage.getItem('CLIENT_ID') == '4367' ||
                    localStorage.getItem('CLIENT_ID') == 4367 ||
                    localStorage.getItem('CLIENT_ID') == '5540' ||
                    localStorage.getItem('CLIENT_ID') == 5540 ||
                    localStorage.getItem('CLIENT_ID') == '4376' ||
                    localStorage.getItem('CLIENT_ID') == 4376
                  }
                  className="programInfoButton"
                >
                  UPDATE HOUSEHOLD
                </button>
              </Grid>
            </Grid>
          ) : (
            <button
              type="button"
              onClick={updateHousehold}
              disabled={
                localStorage.getItem('SOURCE') === 'NEO' ||
                localStorage.getItem('CLIENT_ID') == '6548' ||
                localStorage.getItem('CLIENT_ID') == 6548 ||
                localStorage.getItem('CLIENT_ID') == '4367' ||
                localStorage.getItem('CLIENT_ID') == 4367 ||
                localStorage.getItem('CLIENT_ID') == '5540' ||
                localStorage.getItem('CLIENT_ID') == 5540 ||
                localStorage.getItem('CLIENT_ID') == '4376' ||
                localStorage.getItem('CLIENT_ID') == 4376
              }
              className="programInfoButtonUpdateHousehold"
              style={{ marginBottom: '60px ' }}
            >
              UPDATE HOUSEHOLD
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
