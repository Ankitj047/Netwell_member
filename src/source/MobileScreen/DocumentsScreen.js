import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React, { Component } from 'react'
import { getCardDetails, getCardEnableData, getsharingguidlineslink, getWelcomeBooklet } from '../ApiCall'
import CommonLoader from '../CommonLoader'
import ChatIcon from '../WebScreen/ChatBox/ChatIcon'
import MobCopyright from './MobCopyright'
import MobileFooter from './MobileFooter'
export default class DocumentsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enable: null,
      loader: false,
      providerLink: ''
    }
  }

  componentDidMount() {
    this.setState({ loader: true })

    this.getCardEnable()
    getCardDetails().then(res => {
      if (res.data.response) {
        let documentCardData = res.data.response.find(obj => obj.cardtitle === 'Documents')
        this.setState({
          enable: documentCardData.enable,
          loader: false
        })
      }
    })
  }

  getCardEnable = () => {
    let client_id = localStorage.getItem('CLIENT_ID')

    this.setState({ loader: true })
    getCardEnableData(client_id, 'Documents').then(res => {
      console.log('getCardEnableData=====', res.data.response.enable)
      this.setState({ loader: false })
      if (res.data.response.enable == 'false' || res.data.response.enable == false) {
        window.location.href = '/'
      }
    })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  openwelcome = () => {
    // window.open("https://carynhealth-memberportal-dev-documents.s3.us-east-2.amazonaws.com/AFA/UHS+Welcome+Booklet+-+6kAFAUHSR0626E060920.pdf");

    getWelcomeBooklet().then(res => {
      console.log('Welcome booklet=======', res)
      if (res.data && res.data.length > 0) {
        console.log('Welcome booklet=======')
        let providerLink = res.data[0].fieldValue
        window.location.href = providerLink
        // saveAs(providerLink, "Welcome booklet.pdf");
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

  opensharingguidlines = () => {
    getsharingguidlineslink().then(res => {
      console.log('Sharing Guidlines', res)
      if (res.data && res.data.length > 0) {
        console.log('Shating guidlines response')
        let providerLink = res.data[0].fieldValue
        window.location.href = providerLink
        //saveAs(providerLink, "Sharing Guidlines.pdf");
      } else {
        console.log('Sharing guidlines else block')
        alert('Data Not Availabel')
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.loader ? <CommonLoader /> : null}
        <div class="digitalcard_header">
          <ArrowBackIcon style={{ width: '24px', height: '24px', color: '#ffffff' }} onClick={() => this.goBack()} />
          <div class="digitalcard_headerdiv">Documents</div>
          {/* <NotificationsIcon style={{width:'24px',height:'24px',color:'rgba(255, 255, 255, 0.74)'}}/> */}
        </div>

        {this.state.enable ? (
          <div className="doc_infomiddiv text-left" style={{overflowY:"auto",height:"70vh"}}>
            <div className="doc_welcome_text" onClick={this.openwelcome}>
              Welcome Booklet
            </div>
            <div className="doc_welcome_text" onClick={this.opensharingguidlines}>
              Sharing Guidelines
            </div>
            <div className="doc_welcome_text" onClick={() => this.opensecond()}>
              Member Responsibilities
            </div>
            <div className="doc_welcome_text" onClick={() => this.openthird()}>
              Statement of Shared Faith and Beliefs
            </div>

            <div className="doc_welcome_text" onClick={() => this.getstartedHealth()}>
              Get Started with Health Sharing
            </div>
            <div className="doc_welcome_text" onClick={() => this.open5question()}>
              5 Questions about Health Sharing
            </div>
            <div className="doc_welcome_text" onClick={() => this.tipsTelemedicin()}>
              Tips on Telemedicine
            </div>
            <div className="doc_welcome_text" onClick={() => this.great4reason()}>
              4 Great Reasons to share UHS
            </div>
            <div className="doc_welcome_text" onClick={() => this.quick3facts()}>
              3 Quick Facts for Doctors
            </div>
          </div>
        ) : this.state.enable !== null ? (
          <div style={{ padding: '35px', marginTop: '50%' }}>
            <div className="tempModalTxt">
              We’re facing some technical difficulties, due to which this feature is currently unavailable. For support, call Member
              Services at {localStorage.getItem('CONTACT_NUMBER')}, Monday through Friday, 8.00am to 8.00pm CST.
            </div>
          </div>
        ) : null}

            {/* <ChatIcon showAIChatIcon={true} />
          <ChatIcon />
          <MobCopyright  style={{display: 'relative', marginBottom: 60}} />
        <div class="fixed-bottom">
          <MobileFooter />
        </div> */}

        <div class="fixed-bottom">
        {this.state.loader ?null: <div>
          <div style={{ bottom: '9vh', position: 'relative' }}>
            <ChatIcon showAIChatIcon={true} />
            <ChatIcon />
          </div>
          <div style={{ bottom: '9vh', position: 'relative' }}>
            <MobCopyright />
          </div>
          </div>}
          <div class="fixed-bottom">
            <MobileFooter name="Documents"/>
          </div>
        </div>
      </div>
    )
  }
}
  