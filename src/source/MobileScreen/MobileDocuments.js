import CryptoJS from 'crypto-js'
import React, { Component } from 'react'
import { getsharingguidlineslink, getWelcomeBooklet } from '../ApiCall'
import CommonLoader from '../CommonLoader'
export default class MobileDocuments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      documentmessage: '',
      loader: false
    }
    this.gotoDoc = this.gotoDoc.bind(this)
  }

  gotoDoc = () => {
    this.props.history.push('/DocumentsScreen')
  }

  openwelcome() {
    getWelcomeBooklet().then(res => {
      if (res.data && res.data.length > 0) {
        let providerLink = res.data[0].fieldValue
        let url = ''
        url = providerLink
        window.location.href = providerLink
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

  opensharingguidlines() {
    getsharingguidlineslink().then(res => {
      console.log('Sharing Guidlines', res)
      if (res.data && res.data.length > 0) {
        console.log('Shating guidlines response')
        let providerLink = res.data[0].fieldValue
        let url = ''
        url = providerLink
        window.location.href = providerLink
      }
    })
  }

  render() {
    return (
      <div class="mob_contactinfocard">
        {this.state.loader ? <CommonLoader /> : null}

        <div class="mob_myneeds_top_container">
          <img src={require('../Images/LeftDrawer Icon/documents-icon-active.svg')} class="mob_myneeds_header_image" />
          <div class="mob_myneeds_header_text">Documents</div>
        </div>

        {this.props.documentCardData && this.props.documentCardData.enable ? (
          <div className="">
            <div className="mob_documents_infomiddiv text-left">
              <div className="mob_documentscardnew_welcome_div" onClick={() => this.openwelcome()}>
                Welcome Booklet
              </div>
              <div className="mob_documentscardnew_welcome_div" onClick={() => this.opensharingguidlines()}>
                Sharing Guidelines
              </div>
              <div className="mob_documentscardnew_welcome_div" onClick={() => this.opensecond()}>
                Member Responsibilities
              </div>
              <div className="mob_documentscardnew_welcome_div" onClick={() => this.openthird()}>
                Statement of Shared Faith and Beliefs
              </div>

              <div className="mob_documentscardnew_welcome_div" onClick={() => this.getstartedHealth()}>
                Get Started with Health Sharing
              </div>
              <div className="mob_documentscardnew_welcome_div" onClick={() => this.open5question()}>
                5 Questions about Health Sharing
              </div>
              <div className="mob_documentscardnew_welcome_div" onClick={() => this.tipsTelemedicin()}>
                Tips on Telemedicine
              </div>
              <div className="mob_documentscardnew_welcome_div" onClick={() => this.great4reason()}>
                4 Great Reasons to share UHS
              </div>
              <div className="mob_documentscardnew_welcome_div" onClick={() => this.quick3facts()}>
                3 Quick Facts for Doctors
              </div>
            </div>
          </div>
        ) : this.props.documentCardData != null ? (
          <div style={{ padding: '35px' }}>
            <div className="tempModalTxt">
              We’re facing some technical difficulties, due to which this feature is currently unavailable. For support, call Member
              Services at {localStorage.getItem('CONTACT_NUMBER')}, Monday through Friday, 8.00am to 8.00pm CST.
            </div>
          </div>
        ) : null}
      </div>
    )
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
    window.open(`https://inf-labs.com/?isnav=true&data=${encodeURIComponent(dataEncrypt)}`)
  }
}
