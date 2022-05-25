import moment from 'moment'
import React, { Component } from 'react'
export default class IDCardFrontView extends Component {
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

  getDateInUTC = (date, getInMillisecs) => {
    if (date) {
      let newDateTime = date + new Date(date).getTimezoneOffset() * 60 * 1000

      if (getInMillisecs) {
        return newDateTime
      }

      return new Date(newDateTime)
    }

    return date
  }

  dateformat() {
    let enrollmentDate = this.getDateInUTC(this.props.data.memberIdCardList[0].enrollmentDate, true)

    var day = moment(enrollmentDate).format('DD')

    var mon = moment(enrollmentDate).format('MM')

    var year = moment(enrollmentDate).format('YYYY')

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
          {/* =====================My health card component===================== */}
          {/* {
              this.state.network == 'PHCS' || this.state.network == 'AFMC'
              ?
              : null
            } */}

          <div class="web_fview">
            <div class="web_fv_background_image">
              <div class="web_fv_top_image_container">
                <img src={require('../../Images/Card/UHS_Logo_RGB_600px_200px.png')} class="web_fv_left_logo img-fluid" />

                {this.state.network == 'AFMC' ? (
                  <img src={require('../../Images/Card/AZFMC_logo.png')} class="web_fv_right_logo_afmc  img-fluid" />
                ) : null}

                {this.state.network == 'PHCS' || this.state.network == 'Smartshare' ? (
                  <img
                    src={require('../../Images/Card/phcs_id_practitioner_ancillary_only.jpg')}
                    class="web_fv_right_logo_phcs  img-fluid"
                  />
                ) : null}
              </div>

              {/* =========================middle container */}
              <div class="web_fv_card ">
                {/* =============ledt container=========  */}

                <div class="web_fv_left_container">
                  {this.state.digitalcarddata &&
                    this.state.digitalcarddata.memberIdCardList.map((data, index) => (
                      <div>
                        {index == 0 ? (
                          <div>
                            <div class="web_fv_adult_top_name">
                              {data.firstName} {data.lastName}
                            </div>
                            <div class="web_fv_username">
                              {/* {this.state.prefix}{this.props.showEmpId ? data.empId : data.memberId}  */}
                              {localStorage.getItem('SOURCE') === 'NEO' ? (
                                data.memberId
                              ) : (
                                <>
                                  {this.state.prefix}
                                  {data.empId}
                                </>
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}

                  <div class="web_horizontal_scrollbar">
                    {this.state.digitalcarddata &&
                      this.state.digitalcarddata.memberIdCardList.map((data, index) => (
                        <div>
                          {index != 0 ? (
                            <div class="web_fv_list_view">
                              <div class="web_fv_list_adultname">
                                {data.firstName} {data.lastName}
                              </div>
                              <div class="web_fv_list_username">
                                {/* {this.state.prefix}{this.props.showEmpId ? data.empId : data.memberId} */}
                                {localStorage.getItem('SOURCE') === 'NEO' ? (
                                  data.memberId
                                ) : (
                                  <>
                                    {this.state.prefix}
                                    {data.empId}
                                  </>
                                )}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ))}
                  </div>
                </div>
                {/* =============ledt container end=========  */}

                {/* =============Right container=========  */}
                <div class="web_fv_right_container">
                  <div class="web_fv_joined_text">Program Details</div>

                  <div class="web_fv_right_table1">
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
                  </div>

                  <div class="web_fv_space_2table"></div>

                  {/* { this.props.network =='Smartshare' ? (
                 <div class="web_fv_table_middle_text">Sharing for all medical services is limited to $27,500/- per Member/per year</div>
              ) : (
                <div class="web_fv_space_2table"></div>
              )} */}

                  {/* ====================Dyanmic content for all user========== */}

                  <div>
                    {this.state.planinfo &&
                      this.state.planinfo.map(data => (
                        <div>
                          {data.idcardField != 'group' &&
                          data.idcardField != 'prefix' &&
                          data.idcardField != 'card id' &&
                          data.idcardField != 'contact number' &&
                          data.idcardField != 'Program Details' ? (
                            <div class="web_fv_right_new_table">
                              <div class="web_fv_new_table_left_text">{data.idcardField}</div>
                              <div class="web_fv_new_table_right_text" dangerouslySetInnerHTML={{ __html: data.fieldValue }}></div>
                            </div>
                          ) : null}
                        </div>
                      ))}
                  </div>
                </div>
                {/* =============Right container end=========  */}
              </div>

              {/* =============Bttom  comntavt container========= */}
              {/* <div class="web_fv_center_details_text ">
              Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs, not insurance. We are IN NETWORK for Multiplan/PHCS Practitioner & Ancillary Network. Providers & Members confirmations and questions {this.state.contactNumber}
          </div> */}

              {(() => {
                switch (this.state.network) {
                  case 'PHCS':
                    return (
                      <div class="web_fv_center_details_text ">
                        Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs, not
                        insurance. We are IN NETWORK for Multiplan/PHCS Practitioner & Ancillary Network. Providers & Members confirmations
                        and questions {this.state.contactNumber}
                      </div>
                    )

                  case 'Smartshare':
                    return (
                      <div class="web_fv_center_details_text ">
                        Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs, not
                        insurance. We are IN NETWORK for Multiplan/PHCS Practitioner & Ancillary Network. Providers & Members confirmations
                        and questions {this.state.contactNumber}
                      </div>
                    )

                  case 'AFMC':
                    return (
                      <div class="web_fv_center_details_text ">
                        Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs, not
                        insurance. We are IN NETWORK for The Arizona Foundation for physician and ancillary services. Providers & Members
                        confirmations and questions {this.state.contactNumber}
                      </div>
                    )
                }
              })()}
            </div>
          </div>

          {/* =====================My health card component end===================== */}
        </div>

        <div className="close-flip-div">
          <div className="close-flip-row">
            <div style={{ float: 'left', paddingLeft: '20px' }}>
              <text className="text" style={{ paddingRight: '20px', marginTop: '28px', cursor: 'pointer' }} onClick={this.props.onClose}>
                CLOSE
              </text>
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
