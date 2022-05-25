import CloseIcon from '@material-ui/icons/Close'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import CryptoJS from 'crypto-js'
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { getsharingguidlineslink, getWelcomeBooklet } from '../ApiCall'
import AskCaryn from './ChatBox/AskCaryn.png'

class DocumentsCardNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      documentmessage: '',
      ModalpopUp: false,
      url: '',
      enlarge: false
    }
  }

  openwelcome() {
    var windowReference = window.open()

    getWelcomeBooklet().then(res => {
      console.log('Welcome booklet=======', res)
      if (res.data && res.data.length > 0) {
        console.log('Welcome booklet=======')
        let providerLink = res.data[0].fieldValue
        windowReference.location = providerLink
      } else {
        console.log('Welcome booklet else block')
        alert('Data Not Availabel')
      }
    })
  }

  opensecond() {
    window.open(
      'https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Important+Documents/UHS+Member+Responsibilities.pdf'
    )
  }

  openthird() {
    window.open(
      ' https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Important+Documents/UHF-Statement-of-Shared-Faith-%26-Beliefs.pdf'
    )
    // window.open("https://carynhealth-memberportal-dev-documents.s3.us-east-2.amazonaws.com/Important+Documents/UHF+Statement+of+Faith+%26+Beliefs.pdf")
  }

  getstartedHealth() {
    window.open(
      'https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Infographics/UHS+-+How+do+I+Get+Started+with+Health+Sharing.pdf'
    )
  }

  open5question() {
    window.open(
      'https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Infographics/UHS+-+5+Questions+about+Health+Sharing.pdf'
    )
  }

  tipsTelemedicin() {
    window.open('https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Infographics/UHS+-+Tips+on+Telemedicine.pdf')
  }

  great4reason() {
    window.open(
      'https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Infographics/UHS+-+4+Great+Reasons+to+share+Universal+HealthShare+with+Your+Friends.pdf'
    )
  }

  quick3facts() {
    window.open(
      'https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Infographics/UHS+-+Doctors!+3+Quick+Facts+about+Health+Sharing.pdf'
    )
  }

  opensharingguidlines() {
    var windowReference = window.open()

    getsharingguidlineslink().then(res => {
      console.log('Sharing Guidlines', res)
      if (res.data && res.data.length > 0) {
        console.log('Shating guidlines response')
        let providerLink = res.data[0].fieldValue
        windowReference.location = providerLink
      } else {
        console.log('Sharing guidlines else block')
        alert('Data Not Availabel')
      }
    })
  }

  openAskCaryn = () => {
    let urlData = {
      memberId: localStorage.getItem('Member_EMPID'),
      query: this.state.documentmessage,
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
    this.setState({ url: `https://inf-labs.com/?isnav=false&data=${encodeURIComponent(dataEncrypt)}` }, () => {
      this.setState({ ModalpopUp: true })
    })
  }

  render() {
    return (
      <div class="contactinfocard">
        <div class="myneeds_top_container">
          <img src={require('../Images/LeftDrawer Icon/documents-icon-active.svg')} class="myneeds_header_image" />
          <div class="myneeds_header_text">Documents</div>
          {this.props.close ? <CloseIcon class="modal_close_cursor" onClick={this.props.onClick} /> : null}
        </div>
        {this.props.documentCardData && this.props.documentCardData.enable ? (
          <div className="">
            <div className="documents_infomiddiv text-left">
              <div className="documentscardnew_welcome_div" onClick={() => this.openwelcome()}>
                Welcome Booklet
              </div>
              <div className="documentscardnew_welcome_div" onClick={() => this.opensharingguidlines()}>
                Sharing Guidelines
              </div>
              <div className="documentscardnew_welcome_div" onClick={() => this.opensecond()}>
                Member Responsibilities
              </div>
              <div className="documentscardnew_welcome_div" onClick={() => this.openthird()}>
                Statement of Shared Faith and Beliefs
              </div>

              <div className="documentscardnew_welcome_div" onClick={() => this.getstartedHealth()}>
                Get Started with Health Sharing
              </div>
              <div className="documentscardnew_welcome_div" onClick={() => this.open5question()}>
                5 Questions about Health Sharing
              </div>
              <div className="documentscardnew_welcome_div" onClick={() => this.tipsTelemedicin()}>
                Tips on Telemedicine
              </div>
              <div className="documentscardnew_welcome_div" onClick={() => this.great4reason()}>
                4 Great Reasons to share UHS
              </div>
              <div className="documentscardnew_welcome_div" onClick={() => this.quick3facts()}>
                {/* 3 Quick Facts for Doctors */}
              </div>
            </div>
            <div className="container contactcard_footer"></div>
          </div>
        ) : (
          <div style={{ padding: '35px' }}>
            <div className="tempModalTxt">
              We’re facing some technical difficulties, due to which this feature is currently unavailable. For support, call Member
              Services at {localStorage.getItem('CONTACT_NUMBER')}, Monday through Friday, 8.00am to 8.00pm CST.
            </div>
          </div>
        )}
        {/* <ChatIcon /> */}
        <Modal
          size={this.state.enlarge ? 'xl' : 'lg'}
          show={this.state.ModalpopUp}
          onHide={() => this.setState({ ModalpopUp: false, documentmessage: '' })}
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
                onClick={() => this.setState({ ModalpopUp: false, documentmessage: '' })}
              />
            </div>
          </Modal.Header>
          <iframe height={this.state.enlarge ? '550px' : '500px'} width="100%" src={this.state.url}></iframe>
        </Modal>
      </div>
    )
  }
}
export default withRouter(DocumentsCardNew)
const stylesheet = {
  searchInputBox: {
    borderRadius: 40,
    paddingRight: 32,
    paddingLeft: 12,
    width: '19vw',
    borderColor: '#420045',
    borderWidth: 'revert'
  }
}
