import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React, { Component } from 'react'
import {
  getAgentInfo,
  getCardDetails,
  getCardEnableData,
  gethealthcard,
  getNetworkName,
  getSendNeedsToContactAddress,
  getSourceID
} from '../ApiCall'
import CommonLoader from '../CommonLoader'
import MobCopyright from '../MobileScreen/MobCopyright'
import ChatIcon from '../WebScreen/ChatBox/ChatIcon'
import MobileFooter from './MobileFooter'
export default class ContactScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      digitalheathcard: null,
      plainId: null,
      network: null,
      channel: null,
      contactNumber: null,
      cardId: null,
      showEmpId: false,
      loader: true,
      agentemail: null,
      agentname: null,
      agentno: null,
      enable: null
    }
  }

  componentDidMount() {
    this.setState({ loader: true })
    this.getCardEnable()
    this.gethealthcarddata()
    this.getSourceIDbyemail()

    getCardDetails().then(res => {
      if (res.data.response) {
        let documentCardData = res.data.response.find(obj => obj.cardtitle === 'ContactInformation')
        this.setState({
          enable: documentCardData.enable,
          loader: false
        })
      }
    })
  }

  getCardEnable = () => {
    this.setState({ loader: true })

    let client_id = localStorage.getItem('CLIENT_ID')

    getCardEnableData(client_id, 'ContactInformation').then(res => {
      console.log('getCardEnableData=====', res.data.response.enable)
      this.setState({ loader: false })
      if (res.data.response.enable == 'false' || res.data.response.enable == false) {
        window.location.href = '/'
      }
    })
  }

  getSourceIDbyemail() {
    getSourceID().then(res => {
      console.log('Member source id issss in contact cardd', res.data.memberIdSource)
      this.agentInfoget(res.data.memberIdSource)
    })
  }

  agentInfoget(sourceid) {
    getAgentInfo(sourceid).then(res => {
      console.log('agent info get========', res)
      console.log('agent info get========', res.data.response)
      if (res.data.response) {
        localStorage.setItem('AgentDetails', JSON.stringify(res.data.response))
        this.setState({
          agentemail: res.data.response.email,
          agentname: res.data.response.name,
          agentno: res.data.response.phone,
          loader: false
        })
        // alert("if call")
      } else {
        this.setState({
          loader: false
        })
      }
    })
  }

  async gethealthcarddata() {
    gethealthcard().then(res => {
      if (res.data.memberIdCardList != null) {
        this.setState({ digitalheathcard: res.data, plainId: res.data.memberIdCardList[0].planId })
        this.getNetworkData(res.data.memberIdCardList[0].planId)
        this.setContactandCardID(res.data)
      } else {
        this.setState({ loader: false })
      }
    })
  }

  setContactandCardID(data) {
    data.memberIdCardList[0].planInfo.map((data, index) => {
      if (data.idcardField == 'contact number') {
        this.setState({ contactNumber: data.fieldValue })
      }
      if (data.idcardField == 'card id') {
        this.setState({ cardId: data.fieldValue })
      }
    })
  }

  getNetworkData(plainid) {
    getNetworkName(plainid).then(res => {
      this.setState({ network: res.data.provider_network })
      this.setState({
        loader: false
      })
    })
  }

  sethealthcarddata() {
    if (
      this.state.plainId == '1001' ||
      this.state.plainId == '1002' ||
      this.state.plainId == '1003' ||
      this.state.plainId == '1004' ||
      this.state.plainId == '1005' ||
      this.state.plainId == '1006' ||
      this.state.plainId == '1017' ||
      this.state.plainId == '1018' ||
      this.state.plainId == '1019' ||
      this.state.plainId == '1020' ||
      this.state.plainId == '1021' ||
      this.state.plainId == '1022'
    ) {
      this.setState({
        network: 'PHCS',
        channel: 'NEO',
        contactNumber: '(888) 366-6243',
        // cardId: '1kNEOUHSR071820E072020',
        cardId: 'UHSR101920E101220',
        showEmpId: false
      })
    }

    if (
      this.state.plainId == '7001' ||
      this.state.plainId == '7002' ||
      this.state.plainId == '7003' ||
      this.state.plainId == '7004' ||
      this.state.plainId == '7005' ||
      this.state.plainId == '7006' ||
      this.state.plainId == '7017' ||
      this.state.plainId == '7018' ||
      this.state.plainId == '7019' ||
      this.state.plainId == '7020' ||
      this.state.plainId == '7021' ||
      this.state.plainId == '7022'
    ) {
      this.setState({
        network: 'PHCS',
        channel: 'Tutela',
        contactNumber: '(800) 987-1990',
        // cardId: '7kTTUHSR071720E072020',
        cardId: 'UHSR101920E101220',
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '8001' ||
      this.state.plainId == '8002' ||
      this.state.plainId == '8003' ||
      this.state.plainId == '8004' ||
      this.state.plainId == '8005' ||
      this.state.plainId == '8006' ||
      this.state.plainId == '8017' ||
      this.state.plainId == '8018' ||
      this.state.plainId == '8019' ||
      this.state.plainId == '8020' ||
      this.state.plainId == '8021' ||
      this.state.plainId == '8022'
    ) {
      this.setState({
        network: 'PHCS',
        channel: 'HST',
        contactNumber: '(888) 942-4725',
        // cardId: '8kHSTUHSR071720E072020',
        cardId: 'UHSR101920E101220',
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '9001' ||
      this.state.plainId == '9002' ||
      this.state.plainId == '9003' ||
      this.state.plainId == '9004' ||
      this.state.plainId == '9005' ||
      this.state.plainId == '9006' ||
      this.state.plainId == '9017' ||
      this.state.plainId == '9018' ||
      this.state.plainId == '9019' ||
      this.state.plainId == '9020' ||
      this.state.plainId == '9021' ||
      this.state.plainId == '9022'
    ) {
      this.setState({
        network: 'PHCS',
        channel: 'Parish',
        contactNumber: '(855) 030-4941',
        // cardId: '9kPBUHSR071720E072020',
        cardId: 'UHSR101920E101220',
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '10001' ||
      this.state.plainId == '10002' ||
      this.state.plainId == '10003' ||
      this.state.plainId == '10004' ||
      this.state.plainId == '10005' ||
      this.state.plainId == '10006' ||
      this.state.plainId == '10017' ||
      this.state.plainId == '10018' ||
      this.state.plainId == '10019' ||
      this.state.plainId == '10020' ||
      this.state.plainId == '10021' ||
      this.state.plainId == '10022'
    ) {
      this.setState({
        network: 'PHCS',
        channel: 'CHS',
        planIds: [10001, 10002, 10003, 10004, 10005, 10006],
        contactNumber: '(888) 792-4722',
        // cardId: '9kPBUHSR071720E072020',
        cardId: 'UHSR101920E101220',
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '11001' ||
      this.state.plainId == '11002' ||
      this.state.plainId == '11003' ||
      this.state.plainId == '11004' ||
      this.state.plainId == '11005' ||
      this.state.plainId == '11006' ||
      this.state.plainId == '11017' ||
      this.state.plainId == '11018' ||
      this.state.plainId == '11019' ||
      this.state.plainId == '11020' ||
      this.state.plainId == '11021' ||
      this.state.plainId == '11022'
    ) {
      this.setState({
        network: 'PHCS',
        channel: 'CHS-Plus',
        contactNumber: '(888) 792-4722',
        // cardId: '9kPBUHSR071720E072020',
        cardId: 'UHSR101920E101220',
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '12001' ||
      this.state.plainId == '12002' ||
      this.state.plainId == '12003' ||
      this.state.plainId == '12004' ||
      this.state.plainId == '12005' ||
      this.state.plainId == '12006' ||
      this.state.plainId == '12017' ||
      this.state.plainId == '12018' ||
      this.state.plainId == '12019' ||
      this.state.plainId == '12020' ||
      this.state.plainId == '12021' ||
      this.state.plainId == '12022'
    ) {
      this.setState({
        network: 'PHCS',
        channel: 'BIG',
        contactNumber: '(855) 809-0110',
        // cardId: '12kBGUHS071720E072020',
        cardId: 'UHSR101920E101220',
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '6001' ||
      this.state.plainId == '6002' ||
      this.state.plainId == '6003' ||
      this.state.plainId == '6004' ||
      this.state.plainId == '6005' ||
      this.state.plainId == '6006' ||
      this.state.plainId == '6017' ||
      this.state.plainId == '6018' ||
      this.state.plainId == '6019' ||
      this.state.plainId == '6020' ||
      this.state.plainId == '6021' ||
      this.state.plainId == '6022'
    ) {
      this.setState({
        network: 'AFMC',
        channel: 'AFA',
        contactNumber: '(855) 229-0257',
        // cardId: '6kAFAUHSR071820E072020',
        cardId: '6kAFAUHSR101920E101220',
        showEmpId: true
      })
    }

    if (this.state.plainId == '1011') {
      this.setState({
        network: 'Smartshare',
        channel: 'NEO',
        contactNumber: '(888) 366-6243',
        cardId: 'SSR101920E101220',
        showEmpId: false //not sure for other than 1011 plans
      })
    }

    if (this.state.plainId == '6011') {
      this.setState({
        network: 'Smartshare',
        channel: 'UHF',
        contactNumber: '(888) 791-4722',
        cardId: 'SSR101920E101220',
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '13001' ||
      this.state.plainId == '13002' ||
      this.state.plainId == '13003' ||
      this.state.plainId == '13004' ||
      this.state.plainId == '13005' ||
      this.state.plainId == '13006' ||
      this.state.plainId == '13017' ||
      this.state.plainId == '13018' ||
      this.state.plainId == '13019' ||
      this.state.plainId == '13020' ||
      this.state.plainId == '13021' ||
      this.state.plainId == '13022'
    ) {
      this.setState({
        network: 'PHCS',
        channel: 'Aspire',
        contactNumber: '(888) 992-4789',
        cardId: 'UHSR101920E101220',
        showEmpId: true
      })
    }

    // if (this.state.plainId == '7011' || this.state.plainId == '8011' || this.state.plainId == '12011'  || this.state.plainId == '9011' || this.state.plainId == '10011'  || this.state.plainId == '11011' || this.state.plainId == '13011'  ) {
    //   this.setState({
    //     network: 'Smartshare',
    //     channel: 'PHCS',
    //     contactNumber: '(855) 809-0110',
    //     cardId: 'UHSR101920E101220',
    //     showEmpId: true
    //   })
    // }

    if (this.state.plainId == '7011') {
      this.setState({
        network: 'Smartshare',
        channel: 'PHCS',
        contactNumber: '(800) 987-1990',
        cardId: 'SSR101920E101220',
        showEmpId: true //not sure for other than 1011 plans
      })
    }

    if (this.state.plainId == '8011') {
      this.setState({
        network: 'Smartshare',
        channel: 'PHCS',
        contactNumber: '(888) 942-4725',
        cardId: 'SSR101920E101220',
        showEmpId: true //not sure for other than 1011 plans
      })
    }

    if (this.state.plainId == '9011') {
      this.setState({
        network: 'Smartshare',
        channel: 'PHCS',
        contactNumber: '(855) 030-4941',
        cardId: 'SSR101920E101220',
        showEmpId: true //not sure for other than 1011 plans
      })
    }

    if (this.state.plainId == '10011') {
      this.setState({
        network: 'Smartshare',
        channel: 'PHCS',
        contactNumber: '(888) 792-4722',
        cardId: 'SSR101920E101220',
        showEmpId: true //not sure for other than 1011 plans
      })
    }

    if (this.state.plainId == '11011') {
      this.setState({
        network: 'Smartshare',
        channel: 'PHCS',
        contactNumber: '(888) 792-4722',
        cardId: 'SSR101920E101220',
        showEmpId: true //not sure for other than 1011 plans
      })
    }

    if (this.state.plainId == '12011') {
      this.setState({
        network: 'Smartshare',
        channel: 'PHCS',
        contactNumber: '(855) 809-0110',
        cardId: 'SSR101920E101220',
        showEmpId: true //not sure for other than 1011 plans
      })
    }

    if (this.state.plainId == '13011') {
      this.setState({
        network: 'Smartshare',
        channel: 'PHCS',
        contactNumber: '(888) 992-4789',
        cardId: 'SSR101920E101220',
        showEmpId: true //not sure for other than 1011 plans
      })
    }

    // this.setState({
    //   loader: false
    // })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  getTelNumber = () => {
    let phoneNumber = ''
    phoneNumber = 'tel:' + this.state.contactNumber
    document.location.href = 'tel:' + this.state.contactNumber
  }
  getAgentTelNumber = () => {
    let phoneNumber = ''
    phoneNumber = 'tel:' + this.state.agentno
    document.location.href = 'tel:' + this.state.agentno
  }
  render() {
    return (
      <div>
        {this.state.loader ? <CommonLoader /> : null}
        <div class="digitalcard_header" style={{ position: 'fixed', overflow: 'hidden' }}>
          <ArrowBackIcon style={{ width: '24px', height: '24px', color: '#ffffff' }} onClick={() => this.goBack()} />
          <div class="digitalcard_headerdiv">Contact Information</div>
          {/* <NotificationsIcon style={{width:'24px',height:'24px',color:'rgba(255, 255, 255, 0.74)'}}/> */}
        </div>

        {this.state.enable ? (
          (() => {
            switch (this.state.network) {
              case 'PHCS':
                return (
                  <div class="con_info_middle_div text-left">
                    {this.state.contactNumber ? (
                      <>
                        <div class="con_info_label1">For Pre-notification or Customer Service call: </div>
                        <div class="con_info_value_text">
                          <a href={this.getTelNumber} onClick={this.getTelNumber}>
                            {this.state.contactNumber}
                          </a>
                        </div>
                      </>
                    ) : null}

                    <div class="con_info_label1">For Telemedicine call:</div>
                    <div class="con_info_value_text">
                      <a href="tel:1 (888) 501-2405" style={{ textDecoration: 'none' }}>
                        1 (888) 501-2405
                      </a>
                    </div>

                    <div class="con_info_label1">Send needs to:</div>
                    <div class="con_info_value_text">P.O. Box 211223, Eagan, MN 55121</div>

                    {this.state.agentname ? (
                      <>
                        <div class="con_info_label1">Your Agent Details:</div>
                        <div class="con_info_value_text">{this.state.agentname}</div>
                        <div class="con_info_value_text">
                          <a href={this.getAgentTelNumber} onClick={this.getAgentTelNumber}>
                            {this.state.agentno}
                          </a>
                        </div>
                        <div class="con_info_value_text">{this.state.agentemail}</div>
                      </>
                    ) : null}
                  </div>
                )

              case 'Smartshare':
                return (
                  <div class="con_info_middle_div text-left">
                    {this.state.contactNumber ? (
                      <>
                        <div class="con_info_label1">For Pre-notification or Customer Service call: </div>
                        <div class="con_info_value_text">
                          <a href={this.getTelNumber} onClick={this.getTelNumber}>
                            {this.state.contactNumber}
                          </a>
                        </div>
                      </>
                    ) : null}

                    <div class="con_info_label1">For Telemedicine call:</div>
                    <div class="con_info_value_text">
                      <a href="tel:1 (888) 501-2405" style={{ textDecoration: 'none' }}>
                        1 (888) 501-2405
                      </a>
                    </div>

                    <div class="con_info_label1">Send needs to:</div>
                    <div class="con_info_value_text">P.O. Box 211223, Eagan, MN 55121</div>

                    {this.state.agentname ? (
                      <>
                        <div class="con_info_label1">Your Agent Details:</div>
                        <div class="con_info_value_text">{this.state.agentname}</div>
                        <div class="con_info_value_text">
                          <a href={this.getAgentTelNumber} onClick={this.getAgentTelNumber}>
                            {this.state.agentno}
                          </a>
                        </div>
                        <div class="con_info_value_text">{this.state.agentemail}</div>
                      </>
                    ) : null}
                  </div>
                )
              case 'smartshare25':
                return (
                  <div class="con_info_middle_div text-left">
                    {this.state.contactNumber ? (
                      <>
                        <div class="con_info_label1">For Pre-notification or Customer Service call: </div>
                        <div class="con_info_value_text">
                          <a href={this.getTelNumber} onClick={this.getTelNumber}>
                            {this.state.contactNumber}
                          </a>
                        </div>
                      </>
                    ) : null}

                    <div class="con_info_label1">For Telemedicine call:</div>
                    <div class="con_info_value_text">
                      <a href="tel:1 (888) 501-2405" style={{ textDecoration: 'none' }}>
                        1 (888) 501-2405
                      </a>
                    </div>

                    <div class="con_info_label1">Send needs to:</div>
                    <div class="con_info_value_text">{getSendNeedsToContactAddress()}</div>

                    {this.state.agentname ? (
                      <>
                        <div class="con_info_label1">Your Agent Details:</div>
                        <div class="con_info_value_text">{this.state.agentname}</div>
                        <div class="con_info_value_text">
                          <a href={this.getAgentTelNumber} onClick={this.getAgentTelNumber}>
                            {this.state.agentno}
                          </a>
                        </div>
                        <div class="con_info_value_text">{this.state.agentemail}</div>
                      </>
                    ) : null}
                  </div>
                )

              case 'smartshare50':
                return (
                  <div class="con_info_middle_div text-left">
                    {this.state.contactNumber ? (
                      <>
                        <div class="con_info_label1">For Pre-notification or Customer Service call: </div>
                        <div class="con_info_value_text">
                          <a href={this.getTelNumber} onClick={this.getTelNumber}>
                            {this.state.contactNumber}
                          </a>
                        </div>
                      </>
                    ) : null}

                    <div class="con_info_label1">For Telemedicine call:</div>
                    <div class="con_info_value_text">
                      <a href="tel:1 (888) 501-2405" style={{ textDecoration: 'none' }}>
                        1 (888) 501-2405
                      </a>
                    </div>

                    <div class="con_info_label1">Send needs to:</div>
                    <div class="con_info_value_text">{getSendNeedsToContactAddress()}</div>

                    {this.state.agentname ? (
                      <>
                        <div class="con_info_label1">Your Agent Details:</div>
                        <div class="con_info_value_text">{this.state.agentname}</div>
                        <div class="con_info_value_text">
                          <a href={this.getAgentTelNumber} onClick={this.getAgentTelNumber}>
                            {this.state.agentno}
                          </a>
                        </div>
                        <div class="con_info_value_text">{this.state.agentemail}</div>
                      </>
                    ) : null}
                  </div>
                )

              case 'healthyLife':
                return (
                  <div class="con_info_middle_div text-left">
                    {this.state.contactNumber ? (
                      <>
                        <div class="con_info_label1">For Pre-notification or Customer Service call: </div>
                        <div class="con_info_value_text">
                          <a href={this.getTelNumber} onClick={this.getTelNumber}>
                            {this.state.contactNumber}
                          </a>
                        </div>
                      </>
                    ) : null}

                    <div class="con_info_label1">For Telemedicine call:</div>
                    <div class="con_info_value_text">
                      <a href="tel:1 (888) 501-2405" style={{ textDecoration: 'none' }}>
                        1 (888) 501-2405
                      </a>
                    </div>

                    <div class="con_info_label1">Send needs to:</div>
                    <div class="con_info_value_text">{getSendNeedsToContactAddress()}</div>

                    {this.state.agentname ? (
                      <>
                        <div class="con_info_label1">Your Agent Details:</div>
                        <div class="con_info_value_text">{this.state.agentname}</div>
                        <div class="con_info_value_text">
                          <a href={this.getAgentTelNumber} onClick={this.getAgentTelNumber}>
                            {this.state.agentno}
                          </a>
                        </div>
                        <div class="con_info_value_text">{this.state.agentemail}</div>
                      </>
                    ) : null}
                  </div>
                )

              case 'AFMC':
                return (
                  <div class="con_info_middle_div text-left">
                    {this.state.contactNumber ? (
                      <>
                        <div class="con_info_label1">For Pre-notification or Customer Service call: </div>
                        <div class="con_info_value_text">
                          <a href={this.getTelNumber} onClick={this.getTelNumber}>
                            {this.state.contactNumber}
                          </a>
                        </div>
                      </>
                    ) : null}

                    <div class="con_info_label1">For Telemedicine call:</div>
                    <div class="con_info_value_text">
                      <a href="tel:1 (888) 501-2405" style={{ textDecoration: 'none' }}>
                        1 (888) 501-2405
                      </a>
                    </div>

                    <div class="con_info_label1">Send needs to:</div>
                    <div class="con_info_value_text">Arizona Foundation, PO Box 2909, Phoenix, AZ 85062-2909</div>

                    {this.state.agentname ? (
                      <>
                        <div class="con_info_label1">Your Agent Details:</div>
                        <div class="con_info_value_text">{this.state.agentname}</div>
                        <div class="con_info_value_text">
                          <a href={this.getAgentTelNumber} onClick={this.getAgentTelNumber}>
                            {this.state.agentno}
                          </a>
                        </div>
                        <div class="con_info_value_text">{this.state.agentemail}</div>
                      </>
                    ) : null}
                  </div>
                )
            }
          })()
        ) : this.state.enable !== null ? (
          <div style={{ padding: '35px', marginTop: '50%' }}>
            <div className="tempModalTxt">
              We’re facing some technical difficulties, due to which this feature is currently unavailable. For support, call Member
              Services at {localStorage.getItem('CONTACT_NUMBER')}, Monday through Friday, 8.00am to 8.00pm CST.
            </div>
          </div>
        ) : null}
        <div class="fixed-bottom">
        {this.state.loader ? null : <div>
          <div style={{ bottom: '9vh', position: 'relative' }}>
            <ChatIcon showAIChatIcon={true} />
            <ChatIcon />
          </div>
          <div style={{ bottom: '9vh', position: 'relative' }}>
            <MobCopyright />
          </div>
          </div>}
          <div class="fixed-bottom">
            <MobileFooter />
          </div>
        </div>
      </div>
    )
  }
}
