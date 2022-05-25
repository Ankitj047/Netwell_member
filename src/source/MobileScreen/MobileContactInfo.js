import React, { Component } from 'react'
import { getAgentInfo, gethealthcard, getNetworkName, getSendNeedsToContactAddress, getSourceID } from '../ApiCall'

export default class MobileContactInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      digitalheathcard: null,
      plainId: null,
      network: null,
      provider: null,
      channel: null,
      contactNumber: null,
      cardId: null,
      showEmpId: false,
      agentemail: null,
      agentname: null,
      agentno: null,
      loader: false
    }
  }

  async gethealthcarddata() {
    gethealthcard().then(res => {
      //   console.log('Documents card server SERVER RESPONSE Health Card=', res.data)
      if (res.data.memberIdCardList != null) {
        this.setState({ digitalheathcard: res.data, plainId: res.data.memberIdCardList[0].planId })
        // this.sethealthcarddata()
        this.getNetworkData(res.data.memberIdCardList[0].planId)
        this.setContactandCardID(res.data)
      } else {
        // alert('Data not available.')
        // this.setState({ alertflag: true, loader: false })
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
      console.log('netowrok name againt plain id=======', res.data)
      this.setState({
        network: res.data.provider_network === 'HLC' ? 'PHCS' : res.data.provider_network,
        provider: res.data.provider_network
      })
      this.setState({
        // showHealthCard: true,
        // visible: true,
        loader: false
      })
    })
  }

  componentDidMount() {
    this.gethealthcarddata()
    this.getSourceIDbyemail()
  }

  openwelcome() {
    window.open(
      'https://carynhealth-memberportal-dev-documents.s3.us-east-2.amazonaws.com/AFA/UHS+Welcome+Booklet+-+6kAFAUHSR0626E060920.pdf'
    )
  }

  opensecond() {
    window.open(
      'https://carynhealth-memberportal-dev-documents.s3.us-east-2.amazonaws.com/Important+Documents/UHS+Member+Responsibilities.pdf'
    )
  }

  openthird() {
    window.open(
      'https://carynhealth-memberportal-dev-documents.s3.us-east-2.amazonaws.com/Important+Documents/UHF+Statement+of+Faith+%26+Beliefs.pdf'
    )
  }

  getSourceIDbyemail() {
    getSourceID().then(res => {
      console.log('Member source id issss in contact cardd', res.data.memberIdSource)
      this.agentInfoget(res.data.memberIdSource)
    })
  }

  agentInfoget(sourceid) {
    if (sourceid) {
      getAgentInfo(sourceid).then(res => {
        console.log('agent info get========', res)
        console.log('agent info get========', res.data.response)
        if (res.data.response) {
          localStorage.setItem('AgentDetails', JSON.stringify(res.data.response))
          this.setState({
            agentemail: res.data.response.email,
            agentname: res.data.response.name,
            agentno: res.data.response.phone
          })
          // alert("if call")
        } else {
          // alert("else call")
        }
      })
    }
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

  // agentInfoget() {
  //   getAgentInfo().then(res => {
  //     console.log('agent info get========', res)
  //     console.log('agent info get========', res.data.response)
  //     if(res.data.response){
  //       this.setState({agentemail:res.data.response.email,agentname:res.data.response.name,agentno:res.data.response.phone,})
  //       // alert("if call")
  //     }else{
  //       // alert("else call")
  //     }

  //   })
  // }
  render() {
    return (
      <div class="mob_contactinfocard">
        <div class="mob_myneeds_top_container">
          <img src={require('../Images/LeftDrawer Icon/contact-info-icon-active.svg')} class="mob_myneeds_header_image" />
          <div class="mob_myneeds_header_text">Contact Information</div>
          {/* < BsThreeDotsVertical   color="#4f4f4f" class="mob_card_threedot" /> */}
        </div>

        {this.props.contactCardData && this.props.contactCardData.enable ? (
          (() => {
            switch (this.state.network) {
              case 'PHCS':
                return (
                  <div class="">
                    <div class="mob_contact_infomiddiv text-left">
                      {this.state.contactNumber ? (
                        <>
                          <div class="mob_contactinfo_label">For Pre-notification or Customer Service call: </div>
                          <div class="mob_contactinfo_Value">
                            <a onClick={this.getTelNumber}>{this.state.contactNumber}</a>
                          </div>
                        </>
                      ) : null}

                      <div class="mob_contactinfo_label ">For Telemedicine call:</div>
                      <div class="mob_contactinfo_Value">
                        <a href="tel:1 (888) 501-2405" style={{ textDecoration: 'none' }}>
                          {' '}
                          1 (888) 501-2405
                        </a>
                      </div>

                      <div class="mob_contactinfo_label">Send needs to:</div>
                      <div class="mob_contactinfo_Value">
                        {this.state.provider === 'HLC'
                          ? '4555 Mansell Road, Suite 300 Alpharetta, GA 30022'
                          : getSendNeedsToContactAddress()}
                      </div>

                      {this.state.agentname ? (
                        <>
                          <div class="mob_contactinfo_label">Your Agent Details:</div>
                          <div class="mob_contactinfo_Value">{this.state.agentname}</div>
                          <div class="mob_contactinfo_Value">
                            <a href={this.getAgentTelNumber} onClick={this.getAgentTelNumber}>
                              {this.state.agentno}
                            </a>
                          </div>
                          <div class="mob_contactinfo_Value">{this.state.agentemail}</div>
                        </>
                      ) : null}
                    </div>
                  </div>
                )

              case 'Smartshare':
                return (
                  <div class="">
                    <div class="mob_contact_infomiddiv text-left">
                      {this.state.contactNumber ? (
                        <>
                          <div class="mob_contactinfo_label">For Pre-notification or Customer Service call: </div>
                          <div class="mob_contactinfo_Value">
                            <a href={this.getTelNumber} onClick={this.getTelNumber}>
                              {this.state.contactNumber}
                            </a>
                          </div>
                        </>
                      ) : null}
                      <div class="mob_contactinfo_label ">For Telemedicine call:</div>
                      <div class="mob_contactinfo_Value">
                        <a href="tel:1 (888) 501-2405" style={{ textDecoration: 'none' }}>
                          1 (888) 501-2405
                        </a>
                      </div>

                      <div class="mob_contactinfo_label">Send needs to:</div>
                      <div class="mob_contactinfo_Value">{getSendNeedsToContactAddress()}</div>

                      {this.state.agentname ? (
                        <>
                          <div class="mob_contactinfo_label">Your Agent Details:</div>
                          <div class="mob_contactinfo_Value">{this.state.agentname}</div>
                          <div class="mob_contactinfo_Value">
                            <a href={this.getAgentTelNumber} onClick={this.getAgentTelNumber}>
                              {this.state.agentno}
                            </a>
                          </div>
                          <div class="mob_contactinfo_Value">{this.state.agentemail}</div>
                        </>
                      ) : null}
                    </div>
                  </div>
                )

              case 'smartshare25':
                return (
                  <div class="mob_contact_infomiddiv text-left">
                    {this.state.contactNumber ? (
                      <>
                        <div class="mob_contactinfo_label">For Pre-notification or Customer Service call: </div>
                        <div class="mob_contactinfo_Value">
                          <a href={this.getTelNumber} onClick={this.getTelNumber}>
                            {this.state.contactNumber}
                          </a>
                        </div>
                      </>
                    ) : null}

                    <div class="mob_contactinfo_label">For Telemedicine call:</div>
                    <div class="mob_contactinfo_Value">
                      <a href="tel:1 (888) 501-2405" style={{ textDecoration: 'none' }}>
                        1 (888) 501-2405
                      </a>
                    </div>

                    <div class="mob_contactinfo_label">Send needs to:</div>
                    <div class="mob_contactinfo_Value">{getSendNeedsToContactAddress()}</div>

                    {this.state.agentname ? (
                      <>
                        <div class="mob_contactinfo_label">Your Agent Details:</div>
                        <div class="mob_contactinfo_Value">{this.state.agentname}</div>
                        <div class="mob_contactinfo_Value">
                          <a href={this.getAgentTelNumber} onClick={this.getAgentTelNumber}>
                            {this.state.agentno}
                          </a>
                        </div>
                        <div class="mob_contactinfo_Value">{this.state.agentemail}</div>
                      </>
                    ) : null}
                  </div>
                )

              case 'smartshare50':
                return (
                  <div class="mob_contact_infomiddiv text-left">
                    {this.state.contactNumber ? (
                      <>
                        <div class="mob_contactinfo_label">For Pre-notification or Customer Service call: </div>
                        <div class="mob_contactinfo_Value">
                          <a href={this.getTelNumber} onClick={this.getTelNumber}>
                            {this.state.contactNumber}
                          </a>
                        </div>
                      </>
                    ) : null}

                    <div class="mob_contactinfo_label">For Telemedicine call:</div>
                    <div class="mob_contactinfo_Value">
                      <a href="tel:1 (888) 501-2405" style={{ textDecoration: 'none' }}>
                        1 (888) 501-2405
                      </a>
                    </div>

                    <div class="mob_contactinfo_label">Send needs to:</div>
                    <div class="mob_contactinfo_Value">{getSendNeedsToContactAddress()}</div>

                    {this.state.agentname ? (
                      <>
                        <div class="mob_contactinfo_label">Your Agent Details:</div>
                        <div class="mob_contactinfo_Value">{this.state.agentname}</div>
                        <div class="mob_contactinfo_Value">
                          <a href={this.getAgentTelNumber} onClick={this.getAgentTelNumber}>
                            {this.state.agentno}
                          </a>
                        </div>
                        <div class="mob_contactinfo_Value">{this.state.agentemail}</div>
                      </>
                    ) : null}
                  </div>
                )

              case 'healthyLife':
                return (
                  <div class="mob_contact_infomiddiv text-left">
                    {this.state.contactNumber ? (
                      <>
                        <div class="mob_contactinfo_label">For Pre-notification or Customer Service call: </div>
                        <div class="mob_contactinfo_Value">
                          <a href={this.getTelNumber} onClick={this.getTelNumber}>
                            {this.state.contactNumber}
                          </a>
                        </div>
                      </>
                    ) : null}

                    <div class="mob_contactinfo_label">For Telemedicine call:</div>
                    <div class="mob_contactinfo_Value">
                      <a href="tel:1 (888) 501-2405" style={{ textDecoration: 'none' }}>
                        1 (888) 501-2405
                      </a>
                    </div>

                    <div class="mob_contactinfo_label">Send needs to:</div>
                    <div class="mob_contactinfo_Value">{getSendNeedsToContactAddress()}</div>

                    {this.state.agentname ? (
                      <>
                        <div class="mob_contactinfo_label">Your Agent Details:</div>
                        <div class="mob_contactinfo_Value">{this.state.agentname}</div>
                        <div class="mob_contactinfo_Value">
                          <a href={this.getAgentTelNumber} onClick={this.getAgentTelNumber}>
                            {this.state.agentno}
                          </a>
                        </div>
                        <div class="mob_contactinfo_Value">{this.state.agentemail}</div>
                      </>
                    ) : null}
                  </div>
                )

              case 'AFMC':
                return (
                  <div class="">
                    <div class="mob_contact_infomiddiv text-left">
                      {this.state.contactNumber ? (
                        <>
                          <div class="mob_contactinfo_label">For Pre-notification or Customer Service call: </div>
                          <div class="mob_contactinfo_Value">
                            <a href={this.getTelNumber} onClick={this.getTelNumber}>
                              {this.state.contactNumber}
                            </a>
                          </div>
                        </>
                      ) : null}

                      <div class="mob_contactinfo_label ">For Telemedicine call:</div>
                      <div class="mob_contactinfo_Value">
                        <a href="tel:1 (888) 501-2405" style={{ textDecoration: 'none' }}>
                          1 (888) 501-2405
                        </a>
                      </div>

                      <div class="mob_contactinfo_label">Send needs to:</div>
                      <div class="mob_contactinfo_Value">Arizona Foundation, PO Box 2909, Phoenix, AZ 85062-2909</div>

                      {this.state.agentname ? (
                        <>
                          <div class="mob_contactinfo_label">Your Agent Details:</div>
                          <div class="mob_contactinfo_Value">{this.state.agentname}</div>
                          <div class="mob_contactinfo_Value">
                            <a href={this.getAgentTelNumber} onClick={this.getAgentTelNumber}>
                              {this.state.agentno}
                            </a>
                          </div>
                          <div class="mob_contactinfo_Value">{this.state.agentemail}</div>
                        </>
                      ) : null}
                    </div>
                  </div>
                )
            }
          })()
        ) : this.props.contactCardData != null ? (
          <div style={{ padding: '35px' }}>
            <div className="tempModalTxt">
              We’re facing some technical difficulties, due to which this feature is currently unavailable. For support, call Member
              Services at {localStorage.getItem('CONTACT_NUMBER')}, Monday through Friday, 8.00am to 8.00pm CST.
            </div>
          </div>
        ) : null}

        {/* <div class="mob_contactcard_footer">
                    <div class="row">
                        <div class="col text-left">
                            <FaHeart color="rgba(0, 0, 0, 0.54)" size={16} />
                            <IoMdShare color="rgba(0, 0, 0, 0.54)" size={18} class="ml-4" />
                        </div>
                        <div class="col text-right">
                            <MdKeyboardArrowDown color="rgba(0, 0, 0, 0.54)" size={20} />
                        </div>
                    </div>
                </div> */}
      </div>
    )
  }
}
