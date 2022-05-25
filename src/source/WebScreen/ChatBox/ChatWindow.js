import { Fab } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CloseIcon from '@material-ui/icons/Close'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import React, { Component } from 'react'
import { Form, Modal } from 'react-bootstrap'
import AskCaryn from '../../../assets/images/ask_caryn_beta_logo_desktop.png'
import { contactNumbersArray } from '../../../constants/ContactNumbers'
import { gethealthcard, getProgramInfo, getprogramPlanName, getRxSimpleShareData } from '../../ApiCall'
import './ChatBox.css'
import ChatInput from './ConstantChat'

class ChatWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chat: [],
      message: '',
      chats: [],
      fullScreen: [],
      loader: false,
      dismissable: true,
      programName: '',
      programPlanName: '',
      planInfo: '',
      urlOpen: '',
      ModalpopUp: false,
      enlarge: false,
      errPopUp: false,
      contactNumber: '',
      plainId: null,
      pharmaShow: false,
      acsmmet: 0,
      acsmTotal: 0,
      acsmremain: 0,
      nsamet: 0,
      nsaremain: 0,
      barRange: 0,
      barRangeYellow: 0,
      showReadMore: false,
      readMoreText: ''
    }
    this.mesRef = React.createRef()
  }

  componentDidMount() {
    this.gethealthcard()
    this.pharmaCheck()

    const messages = [
      {
        answer: 'Hi, I’m Caryn',
        context: `How can I help you today, ${this.props.username}?`,
        type: true,
        from: 'incoming'
      }
    ]

    if (sessionStorage.getItem('chathistory')) {
      let messageHistory = JSON.parse(sessionStorage.getItem('chathistory'))
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
          let resp = res.data
          let planInfo = resp.planInfo.map(key => {
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
  }
  getprogramPlanName = () => {
    console.log('-------------------------------------', this.state.programName)
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
          if (value.addon === 'UHS RxSimpleShare' && value.status === 'AC') {
            this.setState({ pharmaShow: true })
          }
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

  getEncryptedData = message => {
    let urlData = {
      memberId: localStorage.getItem('sourceid'),
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
      <div>
        <div class="web_Chat_container">
          <div ref={this.mesRef} style={{ maxHeight: '100%', width: 760 }} id="chatbody" class="chatbody">
            <div>
              <img src={require('../../Images/HomeIcon/welcome-back.svg')} class="web_welcome_back" />
              <div class="web_top_usernameChat">{this.props.username}!</div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <img src={require('../../../assets/media/Ask Caryn Logo.png')} className="betaLogo" />
            </div>
            {
              <div>
                {this.state.dismissable && (
                  <div className="dismissable-info">
                    <div className="dismiss" onClick={() => this.setState({ dismissable: false })}>
                      <CloseIcon />
                    </div>
                    The Ask Caryn tool and resulting search results are built on Artificial Intelligence algorithms, to search our cache of
                    documents based on your expressed intent. The top search result may not be the answer you seek/need. If in doubt, please
                    refer the Sharing Guidelines or contact Customer Service. Universal Health Fellowship or its partner CarynHealth is not
                    responsible for the validity of the search results.
                  </div>
                )}

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
              </div>
            }
            {this.state.loader && (
              <div class="spinner" style={{ paddingBottom: 10 }}>
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
              </div>
            )}
          </div>
          <form onSubmit={this.sendMessage}>
            <div style={{ flexDirection: 'row', display: 'flex', position: 'absolute', marginTop: 13 }}>
              <div style={{ width: 760 }}>
                <Form.Control
                  placeholder="Type in your question to Caryn..."
                  value={this.state.message}
                  style={stylesheet.searchInputBox}
                  onChange={e => this.setState({ message: e.target.value, readMoreText: e.target.value })}
                />
              </div>
              <div className="search-icon">
                <Fab
                  style={{ backgroundColor: '#543379', width: 37, height: 37 }}
                  type="submit"
                  value="Submit"
                  onClick={() => this.sendMessage(true)}
                >
                  <img src={require('../../../assets/images/carynIcon.jpg')} width="120" />
                </Fab>
              </div>
            </div>
          </form>
        </div>
        <Modal
          size={this.state.enlarge ? 'xl' : 'lg'}
          show={this.state.ModalpopUp}
          onHide={() => this.setState({ ModalpopUp: false })}
          backdrop="static"
        >
          <Modal.Header className="header-container">
            <div className="logo">
              <img src={AskCaryn} />
            </div>
            <div className="caption">Your AI-Powered Assistant</div>
            <div className="icons-header">
              {this.state.enlarge ? (
                <FullscreenExitIcon style={{ color: 'white', cursor: 'pointer' }} onClick={() => this.setState({ enlarge: false })} />
              ) : (
                <FullscreenIcon style={{ color: 'white', cursor: 'pointer' }} onClick={() => this.setState({ enlarge: true })} />
              )}
              <CloseIcon
                style={{ color: 'white', marginLeft: 10, cursor: 'pointer' }}
                onClick={() => this.setState({ ModalpopUp: false })}
              />
            </div>
          </Modal.Header>
          <iframe
            height={this.state.enlarge ? '550px' : '500px'}
            width="100%"
            src={`https://inf-labs.com/?isnav=false&data=${this.getEncryptedData(this.state.readMoreText)}`}
          ></iframe>
        </Modal>
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

  openModal = url => {
    this.setState({ urlOpen: url }, () => {
      this.setState({ ModalpopUp: true })
    })
  }

  fullScreen = i => {
    if (this.state.fullScreen[i]) {
      let fullScreen = this.state.fullScreen
      fullScreen[i] = false
      this.setState({ fullScreen: fullScreen }, () => {
        if (this.state.chats.length - 1 === i) {
          this.scrollToBottom()
        }
      })
    } else {
      let fullScreen = this.state.fullScreen
      fullScreen[i] = true
      this.setState({ fullScreen: fullScreen }, () => {
        if (this.state.chats.length - 1 === i) {
          this.scrollToBottom()
        }
      })
    }
  }
  navigate = intent => {
    this.props.navigate(intent)
  }
  sendMessage = e => {
    if (e !== true) e.preventDefault()
    if (this.state.message !== '') {
      let messages = {
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
        this.fullScreen(this.state.chats.length)
        this.scrollToBottom()
        axios
          .post('https://55jtu399q4.execute-api.us-east-1.amazonaws.com/dev/rasabot', messages, {
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', Connection: 'keep-alive' }
          })
          .then(res => {
            this.recieveMessage(res.data.AIKBtext, res.data.intentRecognized, res.data.query, res.data)
          })
          .catch(error => {
            let fullScreen = this.state.fullScreen
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
      ChannelUId: 'memberportal',
      contextkeywords: [
        {
          programName: this.state.programName,
          planName: this.state.programPlanName
        }
      ]
    }
    console.log(urlData)
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

  nsaWidget = () => {
    if (localStorage.getItem('NETWORK_NAME') !== 'smartshare50' || localStorage.getItem('NETWORK_NAME') !== 'smartshare25')
      return (
        <div style={{ backgroundColor: '#fff', padding: 12, width: '59%', borderRadius: 10, marginBottom: 10 }}>
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

  getContactNumber = planId => {
    const contactNo = contactNumbersArray.find(item => {
      return item.plans.includes(planId)
    })
    this.setState({ contactNumber: contactNo.contactNumber })
    return contactNo.contactNumber
  }

  gethealthcard = () => {
    gethealthcard().then(res => {
      if (res.data.memberIdCardList != null) {
        this.getContactNumber(res.data.memberIdCardList[0].planId, this.setState)
        this.setState({ plainId: res.data.memberIdCardList[0].planId }, () => {
          this.getContactNumber(this.state.plainId)
        })
      }
    })
  }

  onIDCardPush = component => {
    const comp = {
      answer: '',
      context: '  ',
      from: 'incoming',
      type: true,
      component: component
    }
    this.setState({ chats: [...this.state.chats, comp] })
    this.scrollToBottom()
  }
}

export default ChatWindow
const stylesheet = {
  searchInputBox: {
    borderRadius: 40,
    borderColor: '#420045',
    borderWidth: 'revert',
    paddingRight: 40,
    paddingLeft: 20
  }
}

const findIfAgentIsPresent = () => {
  const agentDetails = localStorage.getItem('AgentDetails')
  if (agentDetails !== '{}') {
    return true
  }
  return false
}

const getIdCardType = (slot, pharmaShow) => {
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
  let messageText = message.message ? message.message : message.context

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

  messageText = messageText.replaceAll('My Transactions', '<b>My Transactions</b>')
  messageText = messageText.replaceAll('Change Payment Method', '<b>Change Payment Method</b>')
  messageText = messageText.replaceAll('Change Billing Date', '<b>Change Billing Date</b>')
  messageText = messageText.replaceAll('Program Information', '<b>Program Information</b>')
  messageText = messageText.replaceAll('Sharing Guidelines', '<b>Sharing Guidelines</b>')
  messageText = messageText.replaceAll('Change Add-ons', '<b>Change Add-ons</b>')
  messageText = messageText.replaceAll('Change Dependents', '<b>Change Dependents</b>')
  messageText = messageText.replaceAll('NSA/ACSM', '<b>NSA/ACSM</b>')
  messageText = messageText.replaceAll('UHS Health Tools', '<b>UHS Health Tools</b>')
  messageText = messageText.replaceAll('RxSimpleShareFormuary', '<b>RxSimpleShareFormuary</b>')
  messageText = messageText.replaceAll('Health Questionnaire', '<b>Health Questionnaire</b>')
  messageText = messageText.replaceAll('My Needs', '<b>My Needs</b>')
  messageText = messageText.replaceAll('Documents Card', '<b>Documents Card</b>')
  messageText = messageText.replaceAll('Read More', '<b>Search Knowledge Base</b>')
  messageText = messageText.replaceAll('<Member Services Phone>', '1 (888) 366 6243')
  messageText = messageText.replaceAll('Here is your <ID Card Type>', getIdCardType(message?.slots || '', pharmaShow))
  messageText = messageText.replaceAll('<Member Services Email>', 'customerservice@universalhealthfellowship.org')
  messageText = messageText.replaceAll('<Member First Name>', `${localStorage.getItem('subscriberName').split(' ')[0]}`)

  if (findIfAgentIsPresent()) {
    messageText = messageText.replaceAll('<Agent Phone>', `${JSON.parse(localStorage.getItem('AgentDetails')).phone}`)
    messageText = messageText.replaceAll('<Agent Email>', `${JSON.parse(localStorage.getItem('AgentDetails')).email}`)
    messageText = messageText.replaceAll('<Agent Name>', `${JSON.parse(localStorage.getItem('AgentDetails')).name}`)
  } else if (!findIfAgentIsPresent() && message.context && messageText.includes('<Agent Phone>')) {
    messageText = 'Agent is not available'
  }

  return (
    <>
      <div class={messageText.trim() !== '' ? 'bubble' : ''} style={_.whiteSpace}>
        <div style={_.flexRow}>
          <p className="searchfont">
            <p dangerouslySetInnerHTML={{ __html: messageText }}></p>
            <p className="component"> {message?.component || null}</p>
          </p>
        </div>
      </div>
    </>
  )
}

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
  flexWrap: { display: 'flex', flexWrap: 'no-wrap' },
  pharmaStyle: {
    backgroundColor: '#2da5c8',
    color: '#fff',
    marginRight: 5,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 'fit-content'
  },

  f35: { fontSize: '35px' }
}

const Chat = ({ message, contactNo, navigate, fullScreen, widgets, readMoreHandle, showContactInformation, pharmaShow }) => {
  console.log(":::::::::::::::: ::::::::::: ", message)
  return (
    <div class={message.context ? 'incoming' : 'outgoing'} style={_.cursorStyle}>
      <MessageText
        message={message}
        contactNo={contactNo}
        readMoreHandle={readMoreHandle}
        showContactInformation={showContactInformation}
        pharmaShow={pharmaShow}
      />

      {message.options && (
        <div style={_.flexWrap}>
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

  if (
    message.intentrasa === 'idcard' &&
    (idCardSlots.includes(message?.slots.toLowerCase()) || membershipCardSlots.includes(message?.slots.toLowerCase()))
  ) {
    return (
      <div style={_.flexWrap}>
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
  } else if (message.intentrasa === 'idcard' && healthtoolCaldSlots.includes(message?.slots.toLowerCase())) {
    if (JSON.parse(localStorage.getItem('HealthTool')) === true) {
      return [
        <div class="intentbubble" onClick={() => navigate('Health Tool')} style={_.pharmaStyle}>
          <p>{'Show me my Health Tool Card'}</p> <ChevronRightIcon style={_.f35} />
        </div>
      ]
    } else {
      return [
        <div class="intentbubble" onClick={() => navigate('program information')} style={_.pharmaStyle}>
          <p>{'Change Add-ons'}</p> <ChevronRightIcon style={_.f35} />
        </div>
      ]
    }
  }
  return <></>
}

const agentDetials = () => {
  return JSON.parse(localStorage.getItem('AgentDetails'))
}

const ContactInformationWidget = () => {
  return (
    <div class="mt-2 bubble">
      <div class="contact_infomiddiv text-left px-3 py-4" style={{ height: 'auto', overflow: 'hidden', background: 'none' }}>
        <span class="Important-Documents ml-3">Contact Information</span>
        <div class="contactinfo_label">For Pre-notification or Customer Service call: </div>
        <div class="contactinfo_Value">1 (888) 366-6243</div>

        <div class="contactinfo_label mt-3">For Telemedicine call:</div>
        <div class="contactinfo_Value">1 (888) 501-2405</div>

        <div class="contactinfo_label mt-3">Send needs to:</div>
        <div class="contactinfo_Value">UHS Needs, PO Box 17580, Clearwater, FL 33762</div>
        {findIfAgentIsPresent() && (
          <>
            <div class="contactinfo_label mt-3">Your Agent Details:</div>
            <div class="contactinfo_Value">{agentDetials().name}</div>
            <div class="contactinfo_Value">{agentDetials().phone}</div>
            <div class="contactinfo_Value">{agentDetials().email}</div>
          </>
        )}
      </div>
    </div>
  )
}
