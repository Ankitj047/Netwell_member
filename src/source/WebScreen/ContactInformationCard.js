import CloseIcon from '@material-ui/icons/Close'
import React, { Component } from 'react'
import { getAgentInfo, gethealthcard, getNetworkName, getSendNeedsToContactAddress, getSourceID } from '../ApiCall'
export default class ContactInformationCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      digitalheathcard: null,
      plainId: null,
      provider: null,
      network: null,
      channel: null,
      contactNumber: null,
      cardId: null,
      showEmpId: false,
      agentemail: null,
      agentname: null,
      agentno: null
    }
  }
  componentDidMount() {
    this.gethealthcarddata()
    this.getSourceIDbyemail()
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
        } else {
        }
      })
    }
  }

  async gethealthcarddata() {
    gethealthcard().then(res => {
      if (res && res.data && res.data.memberIdCardList != null) {
        this.setState({ digitalheathcard: res.data, plainId: res.data.memberIdCardList[0].planId })
        this.getNetworkData(res.data.memberIdCardList[0].planId)
        this.setContactandCardID(res.data)
      } else {
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
        loader: false
      })
    })
  }

  render() {
    return (
      <div class="contactinfocard" >
        <div class="myneeds_top_container">
          <img src={require('../Images/LeftDrawer Icon/contact-info-icon-active.svg')} class="myneeds_header_image" />
          <div class="myneeds_header_text">Contact Information</div>
          {this.props.close ? <CloseIcon class="modal_close_cursor" onClick={this.props.onClick} /> : null}
          {/* < BsThreeDotsVertical   color="#4f4f4f" class="card_threedot" /> */}
        </div>

        {this.props.contactCardData && this.props.contactCardData.enable ? (
          (() => {
            switch (this.state.network) {
              case 'PHCS':
                return (
                  <div class="">
                    <div class="contact_infomiddiv text-left">
                      {this.state.contactNumber ? (
                        <>
                          <div class="contactinfo_label">For Pre-notification or Customer Service call: </div>
                          <div class="contactinfo_Value">{this.state.contactNumber}</div>
                        </>
                      ) : null}

                      <div class="contactinfo_label ">For Telemedicine call:</div>
                      <div class="contactinfo_Value">1 (888) 501-2405</div>

                      <div class="contactinfo_label">Send needs to:</div>
                      <div class="contactinfo_Value">
                        {this.state.provider === 'HLC'
                          ? '4555 Mansell Road, Suite 300 Alpharetta, GA 30022'
                          : getSendNeedsToContactAddress()}
                      </div>

                      {this.state.agentname ? (
                        <>
                          <div class="contactinfo_label">Your Agent Details:</div>
                          <div class="contactinfo_Value">{this.state.agentname}</div>
                          <div class="contactinfo_Value">{this.state.agentno}</div>
                          <div class="contactinfo_Value">{this.state.agentemail}</div>
                        </>
                      ) : null}
                    </div>
                  </div>
                )

              case 'Smartshare':
                return (
                  <div class="">
                    <div class="contact_infomiddiv text-left">
                      {this.state.contactNumber ? (
                        <>
                          <div class="contactinfo_label">For Pre-notification or Customer Service call: </div>
                          <div class="contactinfo_Value">{this.state.contactNumber}</div>
                        </>
                      ) : null}

                      <div class="contactinfo_label ">For Telemedicine call:</div>
                      <div class="contactinfo_Value">1 (888) 501-2405</div>

                      <div class="contactinfo_label">Send needs to:</div>
                      <div class="contactinfo_Value">P.O. Box 211223, Eagan, MN 55121</div>

                      {this.state.agentname ? (
                        <>
                          <div class="contactinfo_label">Your Agent Details:</div>
                          <div class="contactinfo_Value">{this.state.agentname}</div>
                          <div class="contactinfo_Value">{this.state.agentno}</div>
                          <div class="contactinfo_Value">{this.state.agentemail}</div>
                        </>
                      ) : null}
                    </div>
                  </div>
                )
              case 'smartshare25':
                return (
                  <div class="">
                    <div class="contact_infomiddiv text-left">
                      {this.state.contactNumber ? (
                        <>
                          <div class="contactinfo_label">For Pre-notification or Customer Service call: </div>
                          <div class="contactinfo_Value">{this.state.contactNumber}</div>
                        </>
                      ) : null}

                      <div class="contactinfo_label ">For Telemedicine call:</div>
                      <div class="contactinfo_Value">1 (888) 501-2405</div>

                      <div class="contactinfo_label">Send needs to:</div>
                      <div class="contactinfo_Value">{getSendNeedsToContactAddress()}</div>

                      {this.state.agentname ? (
                        <>
                          <div class="contactinfo_label">Your Agent Details:</div>
                          <div class="contactinfo_Value">{this.state.agentname}</div>
                          <div class="contactinfo_Value">{this.state.agentno}</div>
                          <div class="contactinfo_Value">{this.state.agentemail}</div>
                        </>
                      ) : null}
                    </div>
                  </div>
                )
              case 'smartshare50':
                return (
                  <div class="">
                    <div class="contact_infomiddiv text-left">
                      {this.state.contactNumber ? (
                        <>
                          <div class="contactinfo_label">For Pre-notification or Customer Service call: </div>
                          <div class="contactinfo_Value">{this.state.contactNumber}</div>
                        </>
                      ) : null}

                      <div class="contactinfo_label ">For Telemedicine call:</div>
                      <div class="contactinfo_Value">1 (888) 501-2405</div>

                      <div class="contactinfo_label">Send needs to:</div>
                      <div class="contactinfo_Value">{getSendNeedsToContactAddress()}</div>

                      {this.state.agentname ? (
                        <>
                          <div class="contactinfo_label">Your Agent Details:</div>
                          <div class="contactinfo_Value">{this.state.agentname}</div>
                          <div class="contactinfo_Value">{this.state.agentno}</div>
                          <div class="contactinfo_Value">{this.state.agentemail}</div>
                        </>
                      ) : null}
                    </div>
                  </div>
                )
              case 'healthyLife':
                return (
                  <div class="">
                    <div class="contact_infomiddiv text-left">
                      {this.state.contactNumber ? (
                        <>
                          <div class="contactinfo_label">For Pre-notification or Customer Service call: </div>
                          <div class="contactinfo_Value">{this.state.contactNumber}</div>
                        </>
                      ) : null}

                      <div class="contactinfo_label ">For Telemedicine call:</div>
                      <div class="contactinfo_Value">1 (888) 501-2405</div>

                      <div class="contactinfo_label">Send needs to:</div>
                      <div class="contactinfo_Value">{getSendNeedsToContactAddress()}</div>

                      {this.state.agentname ? (
                        <>
                          <div class="contactinfo_label">Your Agent Details:</div>
                          <div class="contactinfo_Value">{this.state.agentname}</div>
                          <div class="contactinfo_Value">{this.state.agentno}</div>
                          <div class="contactinfo_Value">{this.state.agentemail}</div>
                        </>
                      ) : null}
                    </div>
                  </div>
                )
              case 'AFMC':
                return (
                  <div class="">
                    <div class="contact_infomiddiv text-left">
                      {this.state.contactNumber ? (
                        <>
                          <div class="contactinfo_label">For Pre-notification or Customer Service call: </div>
                          <div class="contactinfo_Value">{this.state.contactNumber}</div>
                        </>
                      ) : null}

                      <div class="contactinfo_label ">For Telemedicine call:</div>
                      <div class="contactinfo_Value">1 (888) 501-2405</div>

                      <div class="contactinfo_label">Send needs to:</div>
                      <div class="contactinfo_Value">Arizona Foundation, P.O. Box 2909, Phoenix, AZ 85062-2909</div>

                      {this.state.agentname ? (
                        <>
                          <div class="contactinfo_label">Your Agent Details:</div>
                          <div class="contactinfo_Value">{this.state.agentname}</div>
                          <div class="contactinfo_Value">{this.state.agentno}</div>
                          <div class="contactinfo_Value">{this.state.agentemail}</div>
                        </>
                      ) : null}
                    </div>
                  </div>
                )
            }
          })()
        ) : (
          <div style={{ padding: '35px' }}>
            <div className="tempModalTxt">
              We’re facing some technical difficulties, due to which this feature is currently unavailable. For support, call Member
              Services at {localStorage.getItem('CONTACT_NUMBER')}, Monday through Friday, 8.00am to 8.00pm CST.
            </div>
          </div>
        )}

        <div class="container contactcard_footer">
          {/* <div class="row">
                        <div class="col text-left">
                            <FaHeart color="rgba(0, 0, 0, 0.54)" size={16} />
                            <IoMdShare color="rgba(0, 0, 0, 0.54)" size={18} class="ml-4" />
                        </div>
                        <div class="col text-right">
                            <MdKeyboardArrowDown color="rgba(0, 0, 0, 0.54)" size={20} />
                        </div>
                    </div> */}
        </div>
      </div>
    )
  }
}
