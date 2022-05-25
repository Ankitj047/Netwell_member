import moment from 'moment'
import React, { Component } from 'react'
export default class FrontView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      network: this.props.network,
      digitalcarddata: this.props.data,
      contactNumber: this.props.contactNumber,
      planinfo: this.props.data.memberIdCardList[0].planInfo,
      plainId: this.props.data.memberIdCardList[0].planId,
      prefix: '',
      groupno: '',

                        membersince: ''
          }
    console.log('IDCARD FRONTVIEW PAGE PROPS IS===', this.props)
    
    this.printparentcall = this.printparentcall.bind(this)
  }
  componentDidMount() {
    this.dateformat()
    console.log('FIND PREFIX DARA', this.props.data.memberIdCardList[0].planInfo)
    this.state.planinfo.map((data, index) => {
      if (data.idcardField == 'prefix') {
        this.setState({ prefix: data.fieldValue })
      }
      if (data.idcardField == 'group') {
        this.setState({ groupno: data.fieldValue })
      }
      if (data.idcardField == 'contact number') {
        this.setState({ contactno: data.fieldValue })
      }
    })
  }

  dateformat() {
    var day = moment(this.props.data.memberIdCardList[0].enrollmentDate).format('DD')
    var mon = moment(this.props.data.memberIdCardList[0].enrollmentDate).format('MM')
    var year = moment(this.props.data.memberIdCardList[0].enrollmentDate).format('YYYY')
    var date = mon + '/' + day + '/' + year
    this.setState({ membersince: date })
  }

  printparentcall() {
    this.props.printCardView()
  }
  closeparentcall() {}
  render() {
    console.log('membersince ====', this.state.membersince)
    return (
      <div className="Rectangle">
        <div id="capture">
          <div class="web_fview">
            <div class="web_fv_background_image">
              <div class="web_fv_top_image_container">
                <img src={require('../../Images/Card/UHS_Logo_RGB_600px_200px.png')} class="web_ht_logo_left img-fluid" />
                <img src={require('../../Images/Health_Tools_logo.png')} class="web_ht_logo_left img-fluid" />
                {/* <div class="web_ht_healthtools_name" style={{fontFamily:'Anton'}}>Health Tools</div> */}
              </div>

              {/* =========================middle container */}
              <div class="web_ht_fv_card ">
                {/* =============ledt container=========  */}

                <div class="web_fv_left_container">
                  <div class="web_ht_username">
                    {this.props.data.memberIdCardList[0].firstName} {this.props.data.memberIdCardList[0].lastName}
                  </div>
                  {/* {
              carddata.leftdata.map((data,index)=>

              <div class="web_fv_list_view">
              <div class="web_ht_groupid_col">{data.fieldname}</div>
            <div class="web_ht_groupid_value_col">{data.fieldvalue}</div>
            </div>

              )
            } */}

                  <div class="web_fv_list_view">
                    <div class="web_ht_groupid_col">Member ID</div>
                    <div class="web_ht_groupid_value_col">
                      {/* {this.state.prefix}{this.props.showEmpId ? this.props.data.memberIdCardList[0].empId : this.props.data.memberIdCardList[0].memberId}  */}
                      {localStorage.getItem('SOURCE') === 'NEO' ? (
                        this.props.data.memberIdCardList[0].memberId
                      ) : (
                        <>
                          {this.state.prefix}
                          {this.props.data.memberIdCardList[0].empId}
                        </>
                      )}
                    </div>
                  </div>

                  <div class="web_fv_list_view">
                    <div class="web_ht_groupid_col">Group ID</div>
                    <div class="web_ht_groupid_value_col">{this.state.groupno}</div>
                  </div>
                </div>
                {/* =============ledt container end=========  */}

                {/* =============Right container=========  */}
                <div class="web_fv_right_container">
                  <div class="mb-3">
                    <div class="web_ht_right_header">To Access Your Health Tools,</div>
                    <div class="web_ht_right_header">Use These Contact Numbers:</div>
                  </div>

                  {/* <div class="web_fv_right_table1">
                <div class="web_fv_left_table">
                  <div class="web_fv_table_left_text">Member since</div>
                  <div class="web_fv_table_left_text">Group No.</div>
                  <div class="web_fv_table_left_text">Program ID</div>
                </div>
                <div class="web_fv_right_table">
                  <div class="web_fv_table_right_text">{this.state.membersince}</div>
                  <div class="web_fv_table_right_text">{this.state.groupno}</div>
                  <div class="web_fv_table_right_text">{this.state.digitalcarddata.memberIdCardList[0].planId}</div>
                </div>
              </div> */}

                  {/* <div class="web_fv_space_2table"></div> */}

                  {/* ====================Dyanmic content for all user========== */}

                  <div>
                    {carddata.rightdata.map(data => (
                      <div>
                        <div class="web_fv_right_new_table">
                          <div class="web_ht_right_fieldname">{data.fieldname}</div>
                          <div class="web_ht_right_fieldvalue">{data.fieldvalue}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* =============Right container end=========  */}
              </div>

              <div class="web__ht_fv_center_details_text ">
                This program is <span class="web_ht_bold_condition">NOT INSURANCE COVERAGE</span> and does not meet the minimum creditable
                coverage requirements under the Affordable Care Act or Massachusetts M.G.L. c. 111M and 956 CMR 5.00.
              </div>

              {/* {(() => {
                switch (this.state.network) {
                  case 'PHCS':
                    return (
                      <div class="web_fv_center_details_text ">
              Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs, not insurance. We are IN NETWORK for Multiplan/PHCS Practitioner & Ancillary Network. Providers & Members confirmations and questions {this.state.contactNumber}
          </div>
                    )

                  case 'Smartshare':
                    return (
                      <div class="web_fv_center_details_text ">
              Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs, not insurance. We are IN NETWORK for Multiplan/PHCS Practitioner & Ancillary Network. Providers & Members confirmations and questions {this.state.contactNumber}
          </div>
                    )

                  case 'AFMC':
                    return (
                    <div class="web_fv_center_details_text ">
                    Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs,
not insurance. We are IN NETWORK for The Arizona Foundation for physician and ancillary services. Providers & Members confirmations and questions {this.state.contactNumber}
                  </div>
                    )
                }
              })()} */}
            </div>
          </div>

          {/* =====================My health card component end===================== */}
        </div>

        <div className="close-flip-div">
          <div className="close-flip-row">
            <div style={{ float: 'left', paddingLeft: '20px' }}>
              {localStorage.getItem('USER_PORTAL') == 'serviceCloud' ? null : (
                <text className="text" style={{ paddingRight: '20px', marginTop: '28px', cursor: 'pointer' }} onClick={this.props.onClose}>
                  CLOSE
                </text>
              )}
            </div>
            <div style={{ float: 'right' }}>
              <text className="text" style={{ padding: '20px', cursor: 'pointer' }} onClick={this.printparentcall}>
                PRINT
              </text>
              <text className="text" style={{ paddingRight: '20px', marginTop: '28px', cursor: 'pointer' }} onClick={this.props.changeside}>
                VIEW BACK OF CARD
              </text>

              {/* <text className='Text' style={{ padding: '20px' }} onClick={() => html2canvas(document.querySelector("#capture")).then(canvas => {

							saveAs(canvas.toDataURL(), 'Health Card.png');
						})}>	 DOWNLOAD</text> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const carddata = {
  name: 'Avishkar Patil',
  leftdata: [
    {
      fieldname: 'Member ID',
      fieldvalue: 101
    },
    {
      fieldname: 'Group ID',
      fieldvalue: 102
    }
  ],

  rightdata: [
    {
      fieldname: 'Aetna Dental',
      fieldvalue: '855-647-6764'
    },
    {
      fieldname: 'Coast to Coast Vision',
      fieldvalue: '855-647-6764'
    },
    {
      fieldname: 'Telephonic EAP',
      fieldvalue: '866-799-2998'
    }
  ]
}
