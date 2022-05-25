import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CloseIcon from '@material-ui/icons/Close'
import SendIcon from '@material-ui/icons/Send'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { getOs } from '../../../utils/utility'
import {
  gethealthcard,
  getProgramInfo,
  getprogramPlanName,
  getRxSimpleShareData,
  getsharingguidlineslink,
  getWelcomeBooklet
} from '../../ApiCall'
import './ChatBoxMobile.css'
import ChatInput from './ConstantChat'

class ChatMobile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chat: [],
      message: '',
      chats: [],
      fullScreen: [],
      loader: false,
      programName: '',
      programPlanName: '',
      planInfo: '',
      errPopUp: false,
      pharmaShow: false,
      ModalpopUp: false,
      urlOpen: '',
      acsmmet: 0,
      acsmTotal: 0,
      acsmremain: 0,
      nsamet: 0,
      nsaremain: 0,
      barRange: 0,
      barRangeYellow: 0,
      username: localStorage.getItem('subscriberName'),
      readMoreText: ''
    }
    this.mesRef = React.createRef()
  }

  componentDidMount() {
    const messages = [
      {
        answer: 'Hi, I’m Caryn.',
        context: `How can I help you today, ${this.state.username}?`,
        type: true,
        from: 'incoming'
      }
    ]
    if (sessionStorage.getItem('chathistory')) {
      var messageHistory = JSON.parse(sessionStorage.getItem('chathistory'))
      messageHistory = messageHistory.filter(i => !i.component)
      this.setState({ chats: messageHistory }, () => {
        this.scrollToBottom()
      })
    } else {
      this.setState({ chats: messages }, () => {
        this.scrollToBottom()
      })
    }

    getProgramInfo()
      .then(res => {
        if (res != null && res.data && res.status == 200) {
          var resp = res.data
          let planInfo = resp.planInfo.map((key, index) => {
            return key.idcardField
          })
          let percentascm = res.data.acsm.met / res.data.acsm.remaining
          percentascm = percentascm * 100
          let percentnsa = res.data.nsa.met / res.data.nsa.remaining
          percentnsa = percentnsa * 100
          this.setState(
            {
              programName: resp.programInfo.programName,

              planInfo: planInfo,
              acsmmet: resp.acsm.met,
              acsmTotal: resp.acsm.total,
              acsmremain: resp.acsm.remaining,
              nsamet: resp.nsa.met,
              nsaremain: resp.nsa.remaining,
              barRange: percentnsa,
              barRangeYellow: percentascm
            },
            () => {
              this.setState({ planInfo: this.state.planInfo.concat(this.state.programName) }, () => {
                this.getprogramPlanName()
              })
            }
          )
        }
      })
      .catch(error => {
        console.log('error', error.message)
      })
    this.pharmaCheck()
  }
  getprogramPlanName = () => {
    getprogramPlanName(this.state.programName.split(' ')[0]).then(response => {
      this.setState({ programPlanName: response.data.programName })
    })
  }
  pharmaCheck = () => {
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
  }

  navigate = intent => {
    this.props.navigate(intent)
  }

  readMoreHandle = () => {
    this.openModal(this.state.readMoreText)
  }

  openModal = url => {
    this.setState({ urlOpen: url }, () => {
      this.setState({ ModalpopUp: true })
    })
  }

  getEncryptedData = message => {
    let urlData = {
      query: message,
      ChannelUId: 'memberportal',
      contextkeywords: [
        {
          programName: this.state.programPlanName,
          planName: this.state.programName
        }
      ]
    }
    let key = CryptoJS.enc.Utf8.parse('000102030405060708090a0b0c0d0e0f')
    let iv = CryptoJS.enc.Utf8.parse('4t7w9z$C&F)J@NcR')
    let input = CryptoJS.enc.Utf8.parse(JSON.stringify(urlData))
    let dataEncrypt = CryptoJS.AES.encrypt(input, key, {
      keySize: 256 / 32,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString()
    return encodeURIComponent(dataEncrypt)
  }

  openAskCaryn = () => {
    let urlData = {
      memberId: localStorage.getItem('Member_EMPID'),
      query: this.state.readMoreText,
      ChannelUId: 'memberportal'
    }
    let key = CryptoJS.enc.Utf8.parse('000102030405060708090a0b0c0d0e0f')
    let iv = CryptoJS.enc.Utf8.parse('4t7w9z$C&F)J@NcR')
    let input = CryptoJS.enc.Utf8.parse(JSON.stringify(urlData))
    var dataEncrypt = CryptoJS.AES.encrypt(input, key, {
      keySize: 256 / 32,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString()
    window.open(`https://inf-labs.com/?isnav=true&data=${encodeURIComponent(dataEncrypt)}`)
  }

  showContactInformation = () => {
    const comp = {
      answer: '',
      context: '  ',
      from: 'incoming',
      type: true,
      component: <ContactInformationWidget />
    }

    this.setState({ chats: [...this.state.chats, comp] }, () => {
      this.scrollToBottom()
    })
  }

  render() {
    return (
      <div className="background-full-Chat" style={{ backgroundColor: '#fff', height: '100%', overflow: 'hidden' }}>
        <div className="header-containers  fixed-top">
          <div className="logo">
            <img src={require('../../../assets/media/ask_caryn_beta_logo_mobile.png')} />
          </div>
          <div className="caption">YOUR AI-POWERED ASSISTANT</div>
          <div>
            <IconButton onClick={() => this.props.history.push('/')}>
              <CloseIcon style={{ color: '#fff' }} />
            </IconButton>
          </div>
        </div>

        <div
          ref={this.mesRef}
          style={{
            height: '88%',
            width: '100%',
            paddingLeft: 6,
            paddingRight: 6,
            paddingTop: 70,
            overflowX: 'hidden',
            position: 'fixed',
            backgroundColor: 'white'
          }}
          id="chatbody"
          class="chatbodyMobile"
        >
          <Message
            chat={this.state.chats}
            fullScreen={this.state.fullScreen}
            widgets={this.widgets}
            contactNo={this.state.contactNumber}
            navigate={this.navigate}
            readMoreHandle={this.readMoreHandle}
            showContactInformation={this.showContactInformation}
            pharmaShow={this.state.pharmaShow}
          />
          {this.state.loader && (
            <div class="spinner fixed-bottom" style={{ paddingBottom: 80, paddingLeft: 6 }}>
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>
          )}
        </div>

        <div>
          <form onSubmit={this.sendMessage}>
            <div className="Bottom-Controls-BG" style={{ flexDirection: 'row', display: 'flex', position: 'absolute', overflow: 'hidden' }}>
              <div style={{ width: '85%' }}>
                <Form.Control
                  className="inputBoxChat"
                  placeholder="Type your request to Caryn..."
                  value={this.state.message}
                  style={{ borderRadius: 40, paddingRight: 20, paddingLeft: 20, zIndex: 10000, position: 'fixed', width: '83%' }}
                  onChange={e => this.setState({ message: e.target.value, readMoreText: e.target.value })}
                />{' '}
              </div>
              <div className="search-icon-mobile">
                <SendIcon
                  className="sendButton"
                  style={{ position: 'fixed', zIndex: 10000, color: this.state.message ? 'blue' : 'black' }}
                  onClick={() => this.sendMessage(true)}
                />
              </div>
            </div>
          </form>
        </div>
        <Dialog
          open={this.state.errPopUp}
          onClose={() => this.setState({ errPopUp: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
        >
          <DialogTitle id="alert-dialog-title">Something went wrong</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              We're having some difficulties connecting to our knowledge base. Please try again after some time.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ errPopUp: false })} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  widgets = message => {
    if (message.subintentrasa === 'program/NSA_ACSM') return this.nsaWidget()
  }

  nsaWidget = () => {
    if (localStorage.getItem('NETWORK_NAME') !== 'smartshare50' || localStorage.getItem('NETWORK_NAME') !== 'smartshare25')
      return (
        <div style={{ backgroundColor: '#dfdfdf80', padding: 12, width: '59%', borderRadius: 10, marginBottom: 10 }}>
          <div className="progessBarWrapperWidget">
            <div className="barTitleWidget">Non-Sharable amount</div>
            <div className="progressContainer">
              <div className="progressIndicator" style={{ width: this.state.barRange + '%' }}>
                <ArrowRightAltIcon viewBox="0 6 24 24" style={{ color: '#ffffff' }} />
              </div>
            </div>

            <div className="amtWrapperWidget">
              <span className="metAmtWidget">${this.numberWithCommas(this.state.nsamet)} met</span>
              <span className="remainingAmt">${this.numberWithCommas(this.state.nsaremain)} remaining</span>
            </div>
          </div>
          <div className="progessBarWrapperWidget">
            {(this.state.acsmmet == 0 && this.state.acsmremain == 0 && this.state.acsmTotal == 0) ||
            (this.state.acsmmet == 0.0 && this.state.acsmremain == 0.0 && this.state.acsmTotal == 0.0) ? null : (
              <>
                <div className="barTitleWidget">Annual Co-Share Maximum Amount</div>
                <div className="progressContainerYellow">
                  <div className="progressIndicatorYellow" style={{ width: this.state.barRangeYellow + '%' }}>
                    <ArrowRightAltIcon viewBox="0 6 24 24" style={{ color: '#ffffff' }} />
                  </div>
                </div>
                <div className="amtWrapperWidget">
                  <span className="metAmtWidget metAmtYellow">${this.numberWithCommas(this.state.acsmmet)} met</span>
                  <span className="remainingAmt">${this.numberWithCommas(this.state.acsmremain)} remaining</span>
                </div>
              </>
            )}
          </div>
        </div>
      )
  }

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  scrollToBottom = () => {
    this.mesRef.current.scrollTop = this.mesRef.current.scrollHeight
  }

  sendMessage = e => {
    if (e !== true) e.preventDefault()
    if (this.state.message !== '') {
      var messages = {
        text: this.state.message,
        userID: localStorage.getItem('Member_EMPID'),
        ChannelUId: 'memberportal',
        contextkeywords: this.state.planInfo
      }
      let message = {
        message: this.state.message,
        from: 'outgoing'
      }
      this.setState({ chats: this.state.chats.concat(message), message: '', loader: true }, () => {
        this.scrollToBottom()
        axios
          .post('https://55jtu399q4.execute-api.us-east-1.amazonaws.com/dev/rasabot', messages, {
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', Connection: 'keep-alive' }
          })
          .then(res => {
            this.recieveMessage(res.data.AIKBtext, res.data.intentRecognized, res.data.query, res.data)

            // this.splitMessage(res.data.message, res.data.intentRecognized)
          })
          .catch(error => {
            var fullScreen = this.state.fullScreen
            fullScreen[this.state.chats.length] = false
            this.setState(
              {
                errPopUp: true,
                loader: false,
                fullScreen: fullScreen
              },
              () => {
                this.scrollToBottom()
                sessionStorage.setItem('chathistory', JSON.stringify(this.state.chats))
              }
            )
          })
        sessionStorage.setItem('chathistory', JSON.stringify(this.state.chats))
      })
    }
  }

  recieveMessage = (message, intent, query, response) => {
    let messageDisplay = response.textfromrasa
    let urlData = {
      memberId: localStorage.getItem('Member_EMPID'),
      query: query,
      ChannelUId: 'memberportal'
    }
    let key = CryptoJS.enc.Utf8.parse('000102030405060708090a0b0c0d0e0f')
    let iv = CryptoJS.enc.Utf8.parse('4t7w9z$C&F)J@NcR')
    let input = CryptoJS.enc.Utf8.parse(JSON.stringify(urlData))
    let dataEncrypt = CryptoJS.AES.encrypt(input, key, {
      keySize: 256 / 32,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString()
    let messageAskCarynJumpto = [
      {
        context: messageDisplay,
        meta: {
          url: `https://inf-labs.com/?isnav=false&data=${encodeURIComponent(dataEncrypt)}`
        },
        intent: intent,
        intentrasa: response.intentrasa,
        subintentrasa: response.subintentfromrasa,
        slots: response?.slots?.cardtype
      }
    ]

    const subIntentRasa = response.subintentfromrasa.split('/')[1]

    this.setState(
      {
        chats: this.state.chats.concat(messageAskCarynJumpto),
        loader: false
      },
      () => {
        this.scrollToBottom()
        sessionStorage.setItem('chathistory', JSON.stringify(this.state.chats))
        ChatInput.map(res => {
          if (res.query === response.intentrasa) {
            let chats = this.state.chats
            if (res?.subSection?.some(i => i.subquery === response.subintentfromrasa)) {
              chats[chats.length - 1].options = res.subSection.filter(i => i.subquery === response.subintentfromrasa)[0].subOption
            } else {
              chats[chats.length - 1].options = res.options
            }

            this.setState({ chats: chats }, () => {
              this.scrollToBottom()
              sessionStorage.setItem('chathistory', JSON.stringify(this.state.chats))
            })
          }
        })
        if (messageDisplay.includes('here is your current contact information')) {
          this.showContactInformation()
        }
      }
    )
  }

  fullScreen = i => {
    if (this.state.fullScreen[i]) {
      var fullScreen = this.state.fullScreen
      fullScreen[i] = false
      this.setState({ fullScreen: fullScreen })
    } else {
      var fullScreen = this.state.fullScreen
      fullScreen[i] = true
      this.setState({ fullScreen: fullScreen })
    }
  }

  downloadMemberApp = () => {
    const os = getOs()
    if (os == 'Mac OS' || os == 'iOS' || os == 'iPadOS') {
      window.open('https://apps.apple.com/us/app/uhf-member/id1560157593')
    }
    if (os == 'Android' || os == 'Windows' || os == 'Linux') {
      window.open('https://play.google.com/store/apps/details?id=com.carrynhealth.memberapp')
    }
  }

  pharmaNavigation = () => {
    const os = getOs()
    if (os == 'Mac OS') {
      window.open('https://apps.apple.com/us/app/flipt/id1329040340')
    }
    if (os == 'iOS') {
      window.open('https://apps.apple.com/us/app/flipt/id1329040340')
    }
    if (os == 'iPadOS') {
      window.open('https://apps.apple.com/us/app/flipt/id1329040340')
    }
    if (os == 'Windows') {
      window.open('https://fliptrx.com/')
    }
    if (os == 'Android') {
      window.open('https://play.google.com/store/apps/details?id=com.gwlabs.flipt&hl=en_US&gl=US')
    }
    if (os == 'Linux') {
      window.open('https://fliptrx.com/')
    }
  }

  navigate = intent => {
    if (intent === 'Membership ID') {
      this.props.history.push('/ChatMobile')
      this.props.history.push('/DigitalHealthCardNew')
    } else if (intent === 'Health Tool') {
      this.props.history.push('/HealthToolsCard')
    } else if (intent === 'find_provider') {
      window.open('http://findprovider.universalhealthfellowship.org/')
    } else if (intent === 'faq') {
      window.open('https://www.universalhealthfellowship.org/FAQs/')
    } else if (intent === 'Payment Card') {
      this.props.history.push('/MyPaymentWalletMobile')
    } else if (intent === 'BillingDate') {
      this.props.history.push('/ChangeBilling')
    } else if (intent === 'Transactions') {
      this.props.history.push('/MyTransactionMobile')
    } else if (intent === 'documents') {
      this.props.history.push('/DocumentsScreen')
    } else if (intent === 'notifications') {
      this.props.history.push('/MobileNotification')
    } else if (intent === 'program information') {
      this.props.history.push('/ProgramInformation')
    } else if (intent === 'Call') {
      let call = JSON.parse(localStorage.getItem('AgentDetails'))
      window.open(`tel:${call.phone}`, '_self')
    } else if (intent === 'Call_MemberService') {
      window.open(`tel:18883666243`, '_self')
    } else if (intent === 'Call_Agent') {
      let call = JSON.parse(localStorage.getItem('AgentDetails'))
      window.open(`tel:${call.phone}`, '_self')
    } else if (intent === 'Email_Agent') {
      let call = JSON.parse(localStorage.getItem('AgentDetails'))
      window.open(`mailto:${call.email}`, '_self')
    } else if (intent === 'Download_Member_APP') {
      this.downloadMemberApp()
    } else if (intent === 'Email') {
      window.open(`mailto:customerservice@universalhealthfellowship.org`, '_self')
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
      window.open(`tel:${call}`, '_self')
    } else if (intent === 'Announcements') {
      this.props.history.push('/AnnouncementMobile')
    } else if (intent === 'change_addons') {
      this.props.history.push('/ProgramInformation?change_addons=true')
    } else if (intent === 'change_dependants') {
      this.props.history.push('/ProgramInformation?change_dependants=true')
    } else if (intent === 'PaymentMethod') {
      this.props.history.push('/MobileTransaction')
    } else if (intent === 'Read More') {
      this.openAskCaryn()
    } else if (intent === 'Search Sharing Guidelines') {
      this.openAskCaryn()
    } else if (intent === 'Search KnowledgeBase') {
      this.openAskCaryn()
    } else if (intent === 'RxSimpleShareFormuary') {
      window.open(
        `https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Important+Documents/UHS-RxSimpleShareFormuary.pdf`
      )
    } else if (intent === 'RxSimpleShareProgram') {
      window.open(`https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-RxSimpleShare-Flyer.pdf`)
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
    } else if (intent === 'ContactInformation') {
      this.showContactInformation()
    } else {
      this.props.history.push('/' + intent)
    }
  }
}
export default ChatMobile

const Message = ({ chat, fullScreen, widgets, contactNo, navigate, readMoreHandle, showContactInformation, pharmaShow }) => {
  return (
    <>
      {chat.map((message, i) => (
        <Chat
          message={message}
          key={i}
          contactNo={contactNo}
          navigate={navigate}
          fullScreen={fullScreen}
          widgets={widgets}
          readMoreHandle={readMoreHandle}
          showContactInformation={showContactInformation}
          pharmaShow={pharmaShow}
        />
      ))}
    </>
  )
}

const _ = {
  cursorStyle: { cursor: 'context-menu' },
  whiteSpace: { whiteSpace: 'pre-line' },
  flexRow: { display: 'flex', flexDirection: 'row' },
  flexWrap: { display: 'flex', flexWrap: 'wrap' },
  pharmaStyle: {
    backgroundColor: '#2da5c8',
    color: '#fff',
    marginRight: 5,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 'fit-content'
  },

  f35: { fontSize: '35px' }
}

const Chat = ({ message, contactNo, navigate, fullScreen, widgets, readMoreHandle, showContactInformation, pharmaShow }) => {
  return (
    <div class={message.context ? 'incoming' : 'outgoing'} style={_.cursorStyle} id="1">
      <div>
        <MessageText
          message={message}
          contactNo={contactNo}
          readMoreHandle={readMoreHandle}
          showContactInformation={showContactInformation}
          pharmaShow={pharmaShow}
        />
      </div>

      {message.options && (
        <div style={_.flexWrap} id="2">
          <div id="2.5" className="scrolling-wrapper">
            {message.options.map(intent => {
              if (message.intentrasa === 'pharma') {
                if (message.subintentrasa === 'pharma/signup') {
                  if (pharmaShow) {
                    if (intent.intent === 'RxSimpleShareFormuary' || intent.intent === 'pharma') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  } else {
                    if (intent.intent === 'program information') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  }
                } else if (message.subintentrasa === 'pharma/cancel') {
                  if (pharmaShow) {
                    if (intent.intent === 'Email') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  } else {
                    if (
                      intent.intent === 'program information' ||
                      intent.intent === 'RxSimpleShareFormuary' ||
                      intent.intent === 'RxSimpleShareProgram'
                    ) {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  }
                } else if (message.subintentrasa === 'pharma/medicines') {
                  if (pharmaShow) {
                    if (intent.intent === 'RxSimpleShareFormuary' || intent.intent === 'pharma') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  } else {
                    if (
                      intent.intent === 'program information' ||
                      intent.intent === 'RxSimpleShareFormuary' ||
                      intent.intent === 'RxSimpleShareProgram'
                    ) {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  }
                }
              } else if (message.intentrasa === 'healthtool') {
                if (message.subintentrasa === 'healthtool/signup') {
                  if (JSON.parse(localStorage.getItem('HealthTool'))) {
                    if (intent.intent === 'Health Tool') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  } else {
                    if (intent.intent === 'program information') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  }
                } else if (message.subintentrasa === 'healthtool/cancel') {
                  if (JSON.parse(localStorage.getItem('HealthTool'))) {
                    if (intent.intent === 'Email') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  } else {
                    if (intent.intent === 'program information') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  }
                } else {
                  if (JSON.parse(localStorage.getItem('HealthTool'))) {
                    if (intent.intent === 'Health Tool') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  } else {
                    if (intent.intent === 'program information') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  }
                }
              } else if (message.intentrasa === 'rxsimpleshare') {
                if (message.subintentrasa === 'rxsimpleshare/signup') {
                  if (pharmaShow) {
                    if (intent.intent === 'RxSimpleShareFormuary' || intent.intent === 'pharma') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  } else {
                    if (intent.intent === 'program information') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  }
                } else if (message.subintentrasa === 'rxsimpleshare/cancel') {
                  if (pharmaShow) {
                    if (intent.intent === 'Email') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  } else {
                    if (intent.intent === 'program information') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  }
                } else {
                  if (pharmaShow) {
                    if (intent.intent === 'RxSimpleShareFormuary' || intent.intent === 'pharma') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  } else {
                    if (intent.intent === 'program information') {
                      return <Addon intent={intent} navigate={navigate} />
                    }
                  }
                }
              }
              if (
                message.intentrasa !== 'idcard' &&
                message.intentrasa !== 'healthtool' &&
                message.intentrasa !== 'rxsimpleshare' &&
                message.intentrasa !== 'pharma'
              ) {
                return (
                  <>
                    <Addon intent={intent} navigate={navigate} />
                  </>
                )
              }
            })}
          </div>
        </div>
      )}

      <ShowIdCard message={message} navigate={navigate} />

      {message.intentrasa &&
        message.intentrasa !== 'fallback' &&
        message.intentrasa !== 'greet' &&
        message.intentrasa !== 'goodbye' &&
        message.intentrasa !== 'pharma' &&
        widgets(message)}
    </div>
  )
}

const Addon = ({ intent, navigate }) => (
  <div class="intentbubble" onClick={() => navigate(intent.intent)} style={_.pharmaStyle}>
    <p>{intent.message}</p> <ChevronRightIcon style={_.f35} />
  </div>
)

const ShowIdCard = ({ message, navigate }) => {
  if (
    message.intentrasa === 'idcard' &&
    (message.slots.toLowerCase().includes('idcard') ||
      message.slots.toLowerCase().includes('id card') ||
      message.slots.toLowerCase().includes('membership'))
  ) {
    return (
      <div style={{ ..._.flexWrap, flexWrap: 'nowrap', overflowX: 'auto' }}>
        <div class="intentbubble" onClick={() => navigate('Membership ID')} style={_.pharmaStyle}>
          <p>{'Show me my Membership ID'}</p> <ChevronRightIcon style={_.f35} />
        </div>
        {JSON.parse(localStorage.getItem('HealthTool')) === true ? (
          <div class="intentbubble" onClick={() => navigate('Health Tool')} style={_.pharmaStyle}>
            <p>{'Show me my Health Tool Card'}</p> <ChevronRightIcon style={_.f35} />
          </div>
        ) : (
          <></>
        )}
      </div>
    )
  } else if (message.intentrasa === 'idcard' && message.slots.toLowerCase().includes('healthtool')) {
    if (JSON.parse(localStorage.getItem('HealthTool')) === true) {
      return [
        <div class="intentbubble" onClick={() => navigate('Health Tool')} style={_.pharmaStyle}>
          <p>{'Show me my Health Tool Card'}</p> <ChevronRightIcon style={_.f35} />
        </div>
      ]
    }
  }
  return <></>
}

const findIfAgentIsPresent = () => {
  const agentDetails = localStorage.getItem('AgentDetails')
  if (agentDetails !== '{}') {
    return true
  }
  return false
}

const getIdCardType = slot => {
  const idCardSlots = ['id card', 'idcards', 'id cards', 'idcard']
  const membershipCardSlots = ['membership', 'membership card', 'membership cards', 'membership card']
  const healthtoolCaldSlots = [
    'health tool card',
    'healthtool card',
    'health tool cards',
    'healthtool cards',
    'health tool card',
    'health tool card',
    'healthtool',
    'healthtools'
  ]

  if (!slot) return ''
  if (idCardSlots.includes(slot.toLowerCase()) || membershipCardSlots.includes(slot.toLowerCase())) {
    return 'Here is your ID Cards'
  } else if (healthtoolCaldSlots.includes(slot.toLowerCase()) && JSON.parse(localStorage.getItem('HealthTool')) === true) {
    return 'Here is your HealthTool Card'
  } else if (JSON.parse(localStorage.getItem('HealthTool')) === true) {
    return ''
  } else {
    return `You have not subscribed to the Health Tools add-on.
    To add Health Tools to your membership, go to Program Information and click Change Add-ons. 
    You will be automatically signed into the Enrollment Portal, 
    where you can review available add-ons and choose what's best for you.`
  }
}

const getPharmaText = (isPharma, messageText, message) => {
  if (message.subintentrasa === 'pharma/signup') {
    if (!isPharma) {
      return messageText
    } else {
      return 'You already have RxSimpleShare added to your membership.'
    }
  } else if (message.subintentrasa === 'pharma/cancel') {
    if (isPharma) {
      return messageText
    } else {
      return `You have not subscribed to the RxSimpleShare Program. With RxSimpleShare, you can share prescription drug costs for 90 of the top 100 most commonly prescribed medications. To add RxSimpleShare to your membership, go to Program Information and click Change Add-ons. You will be automatically signed into the Enrollment Portal, where you can review available add-ons and choose what's best for you.`
    }
  } else if (message.subintentrasa === 'pharma/medicines') {
    if (isPharma) {
      return messageText
    } else {
      return `You have not subscribed to the RxSimpleShare Program. With RxSimpleShare, you can share prescription drug costs for 90 of the top 100 most commonly prescribed medications. To add RxSimpleShare to your membership, go to Program Information and click Change Add-ons. You will be automatically signed into the Enrollment Portal, where you can review available add-ons and choose what's best for you.`
    }
  } else return messageText
}

const MessageText = ({ message, contactNo, readMoreHandle, showContactInformationm, pharmaShow }) => {
  let messageText = message.message ? message.message : message.context || ''

  if (message?.intentrasa === 'pharma') {
    messageText = getPharmaText(pharmaShow, messageText, message)
  }

  if (message?.intentrasa === 'healthtool') {
    if (message.subintentrasa === 'healthtool/signup') {
      if (JSON.parse(localStorage.getItem('HealthTool')) === true) {
        messageText = 'You already have UHS Health Tools added to your membership.'
      } else {
        messageText =
          "With UHS Health Tools, you can get telephonic counseling for a wide variety of needs, and dental and vision discount programs. To add Health Tools to your membership, go to Program Information and click Change Add-ons. You will be automatically signed into the Enrollment Portal, where you can review available add-ons and choose what's best for you."
      }
    } else if (message.subintentrasa === 'healthtool/cancel') {
      if (JSON.parse(localStorage.getItem('HealthTool')) === true) {
        messageText =
          'To remove Health Tools from your membership, please contact our Member Services team at <Member Services Phone>, Monday through Friday 7:00 am to 6:00 pm CST or email at <Member Services Email>.'
      } else {
        messageText = 'You do not have UHS Health Tools added to your membership.'
      }
    } else if (JSON.parse(localStorage.getItem('HealthTool')) === true) {
      messageText = 'You already have UHS Health Tools added to your membership.'
    } else {
      messageText =
        "With UHS Health Tools, you can get telephonic counseling for a wide variety of needs, and dental and vision discount programs. To add Health Tools to your membership, go to Program Information and click Change Add-ons. You will be automatically signed into the Enrollment Portal, where you can review available add-ons and choose what's best for you."
    }
  }

  if (message?.intentrasa === 'rxsimpleshare') {
    if (message.subintentrasa === 'rxsimpleshare/signup') {
      if (pharmaShow) {
        messageText = 'You already have RxSimpleShare added to your membership.'
      } else {
        messageText =
          "To add RxSimpleShare to your membership, go to Program Information and click Change Add-ons. You will be automatically signed into the Enrollment Portal, where you can review available add-ons and choose what's best for you."
      }
    } else if (message.subintentrasa === 'rxsimpleshare/cancel') {
      if (pharmaShow) {
        messageText =
          'To remove RxSimpleShare from your membership, please contact our Member Services team at <Member Services Phone>, Monday through Friday 7:00 am to 6:00 pm CST or email at <Member Services Email>.'
      } else {
        messageText = 'You do not have RxSimpleShare added to your membership.'
      }
    } else if (pharmaShow) {
      messageText = 'You already have RxSimpleShare added to your membership.'
    } else {
      messageText =
        "To add RxSimpleShare to your membership, go to Program Information and click Change Add-ons. You will be automatically signed into the Enrollment Portal, where you can review available add-ons and choose what's best for you."
    }
  }

  messageText = messageText.replace(/My Transactions/g, '<b>My Transactions</b>')
  messageText = messageText.replace(/Change Payment Method/g, '<b>Change Payment Method</b>')
  messageText = messageText.replace(/Change Billing Date/g, '<b>Change Billing Date</b>')
  messageText = messageText.replace(/Program Information/g, '<b>Program Information</b>')
  messageText = messageText.replace(/Sharing Guidelines/g, '<b>Sharing Guidelines</b>')
  messageText = messageText.replace(/Change Add-ons/g, '<b>Change Add-ons</b>')
  messageText = messageText.replace(/Change Dependents/g, '<b>Change Dependents</b>')
  messageText = messageText.replace(/NSA\/ACMS/g, '<b>NSA/ACSM</b>')
  messageText = messageText.replace(/UHS Health Tools/g, '<b>UHS Health Tools</b>')
  messageText = messageText.replace(/RxSimpleShareFormuary/g, '<b>RxSimpleShareFormuary</b>')
  messageText = messageText.replace(/Health Questionnaire/g, '<b>Health Questionnaire</b>')
  messageText = messageText.replace(/My Needs/g, '<b>My Needs</b>')
  messageText = messageText.replace(/Documents Card/g, '<b>Documents Card</b>')
  messageText = messageText.replace(/Read More/g, '<b>Search Knowledge Base</b>')
  messageText = messageText.replace(/<Member Services Phone>/g, '1 (888) 366 6243')
  messageText = messageText.replace('Here is your <ID Card Type>', getIdCardType(message?.slots || ''))
  messageText = messageText.replace(/<Member Services Email>/g, 'customerservice@universalhealthfellowship.org')
  messageText = messageText.replace(/<Member First Name>/g, `${localStorage.getItem('subscriberName').split(' ')[0]}`)

  if (findIfAgentIsPresent()) {
    messageText = messageText.replace(/<Agent Phone>/g, `${JSON.parse(localStorage.getItem('AgentDetails'))?.phone}`)
    messageText = messageText.replace(/<Agent Email>/g, `${JSON.parse(localStorage.getItem('AgentDetails'))?.email}`)
    messageText = messageText.replace(/<Agent Name>/g, `${JSON.parse(localStorage.getItem('AgentDetails'))?.name}`)
  } else if (!findIfAgentIsPresent() && message.context && messageText.includes('<Agent Phone>')) {
    messageText = 'Agent is not available'
  }

  return (
    <div class={messageText.trim() !== '' ? 'bubble' : ''} style={_.whiteSpace}>
      <div style={_.flexRow}>
        <p className="searchfont">
          <p dangerouslySetInnerHTML={{ __html: messageText }}></p>
          <p className="component"> {message?.component || null}</p>
        </p>
      </div>
      {/* <div class="bubble">{ContactInformationWidget()}</div> */}
    </div>
  )
}

const agentDetials = () => {
  return JSON.parse(localStorage.getItem('AgentDetails'))
}

const ContactInformationWidget = () => {
  return (
    <div style={{ margin: 0, padding: 10 }} className="bubble">
      <div class="contact_infomiddiv text-left" style={{ height: 'auto', overflow: 'hidden', background: 'none' }}>
        <span class="Important-Documents">Contact Information</span>
        <div class="contactinfo_label" style={{ fontSize: 'inherit' }}>
          For Pre-notification or Customer Service call:{' '}
        </div>
        <div class="contactinfo_Value" style={{ fontSize: 'inherit' }}>
          1 (888) 366-6243
        </div>

        <div class="contactinfo_label mt-3" style={{ fontSize: 'inherit' }}>
          For Telemedicine call:
        </div>
        <div class="contactinfo_Value" style={{ fontSize: 'inherit' }}>
          1 (888) 501-2405
        </div>

        <div class="contactinfo_label mt-3" style={{ fontSize: 'inherit' }}>
          Send needs to:
        </div>
        <div class="contactinfo_Value" style={{ fontSize: 'inherit' }}>
          UHS Needs, PO Box 17580, Clearwater, FL 33762
        </div>
        {findIfAgentIsPresent() && (
          <>
            <div class="contactinfo_label mt-3" style={{ fontSize: 'inherit' }}>
              Your Agent Details:
            </div>
            <div class="contactinfo_Value" style={{ fontSize: 'inherit' }}>
              {agentDetials().name}
            </div>
            <div class="contactinfo_Value" style={{ fontSize: 'inherit' }}>
              {agentDetials().phone}
            </div>
            <div class="contactinfo_Value" style={{ fontSize: 'inherit' }}>
              {agentDetials().email}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
