import moment from 'moment'
import React, { Component } from 'react'
export default class IDCardFrontViewMob extends Component {
  constructor(props) {
    super(props)
    this.state = {
      network: this.props.network,
      digitalcarddata: this.props.data,
      planinfo: this.props.data.memberIdCardList[0].planInfo,
      plainId: this.props.data.memberIdCardList[0].planId,
      prefix: '',
      groupno: '',
      contactno: this.props.contactNumber,
      //   day:moment(this.props.data.memberIdCardList[0].enrollmentDate).format('DD'),
      //   month:moment(this.props.data.memberIdCardList[0].enrollmentDate).format('MM'),
      //   year:moment(this.props.data.memberIdCardList[0].enrollmentDate).format('YYYY'),
      membersince: ''
      //    + this.state.day+this.state.year,
    }
    this.printparentcall = this.printparentcall.bind(this)
    console.log('MOB FRONT PROPS=================', this.props)
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

  // dateformat(){
  //     var day=moment(this.props.data.memberIdCardList[0].enrollmentDate).format('DD')
  //     var mon=moment(this.props.data.memberIdCardList[0].enrollmentDate).format('MM')
  //     var year=moment(this.props.data.memberIdCardList[0].enrollmentDate).format('YYYY')
  //     var date=mon+"/"+day+"/"+year
  //     this.setState({membersince:date})
  //   }

  printparentcall() {
    this.props.printCardView()
  }
  render() {
    return (
      <div class="fview">
        <div class="fv_background_image">
          {/* =============Top Imaghe container========= */}
          <div class="fv_top_image_container">
            <img src={require('../../Images/Card/UHS_Logo_RGB_600px_200px.png')} class="fv_left_logo img-fluid" />

            {this.props.network == 'AFMC' ? (
              <img src={require('../../Images/Card/AZFMC_logo.png')} class="fv_right_logo  img-fluid" />
            ) : null}

            {this.props.network == 'PHCS' || this.props.network == 'Smartshare' ? (
              <img src={require('../../Images/Card/phcs_id_practitioner_ancillary_only.jpg')} class="fv_right_logo  img-fluid" />
            ) : null}
            {/* <img src={require('../../Images/Card/image-4.png')} class="fv_right_logo  img-fluid" /> */}
          </div>

          <div class="fv_card ">
            {/* =============ledt container========= */}
            <div class="fv_left_container">
              {this.state.digitalcarddata &&
                this.state.digitalcarddata.memberIdCardList.map((data, index) => (
                  <div>
                    {index == 0 ? (
                      <div>
                        <div class="fv_adult_top_name">
                          {data.firstName} {data.lastName}
                        </div>
                        <div class="fv_username">
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
                    ) : null
                    //   <div class="fv_list_view">
                    //   <div class="fv_list_adultname">{data.firstName} {data.lastName}</div>
                    //   <div class="fv_list_username">{data.memberId}</div>
                    // </div>
                    }
                  </div>
                ))}

              <div class="mob_scrollbarview">
                {this.state.digitalcarddata &&
                  this.state.digitalcarddata.memberIdCardList.map((data, index) => (
                    <div>
                      {index != 0 ? (
                        <div class="fv_list_view">
                          <div class="fv_list_adultname">
                            {data.firstName} {data.lastName}
                          </div>
                          <div class="fv_list_username">
                            {this.state.prefix}
                            {this.props.showEmpId ? data.empId : data.memberId}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>

            {/* =============Right Conrtainer========= */}
            <div class="fv_right_container">
              <div class="fv_joined_text">Program Details</div>

              <div class="fv_right_table1">
                <div class="fv_left_table">
                  <div class="fv_table_left_text">Member since</div>
                  <div class="fv_table_left_text">Group No.</div>
                  <div class="fv_table_left_text">Program ID</div>
                </div>
                <div class="fv_right_table">
                  <div class="fv_table_right_text">{this.state.membersince}</div>
                  <div class="fv_table_right_text">{this.state.groupno}</div>
                  <div class="fv_table_right_text">{this.state.digitalcarddata.memberIdCardList[0].planId}</div>
                </div>
              </div>

              <div class="fv_space_2table"></div>

              {/* {this.props.network =='Smartshare' ? (
                    <div class="fv_table_middle_text">Sharing for all medical services is limited to $27,500/- per Member/per year</div>
                  ) : (
                    <div class="fv_space_2table"></div>
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
                        <div class="fv_right_new_table">
                          <div class="fv_new_table_left_text">{data.idcardField}</div>
                          <div class="fv_new_table_right_text" dangerouslySetInnerHTML={{ __html: data.fieldValue }}></div>
                        </div>
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* =============Bttom  comntavt container========= */}
          {/* dangerouslySetInnerHTML={{ __html: data.fieldValue }} */}

          {(() => {
            switch (this.props.network) {
              case 'PHCS':
                return (
                  <div class="fv_center_details_text">
                    Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs, not
                    insurance. We are IN NETWORK for Multiplan/PHCS Practitioner & Ancillary Network. Providers & Members confirmations and
                    questions {this.props.contactNumber}
                  </div>
                )

              case 'Smartshare':
                return (
                  <div class="fv_center_details_text">
                    Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs, not
                    insurance. We are IN NETWORK for Multiplan/PHCS Practitioner & Ancillary Network. Providers & Members confirmations and
                    questions {this.props.contactNumber}
                  </div>
                )

              case 'AFMC':
                return (
                  <div class="fv_center_details_text">
                    Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs, not
                    insurance. We are IN NETWORK for The Arizona Foundation for physician and ancillary services. Providers & Members
                    confirmations and questions {this.props.contactNumber}
                  </div>
                )
            }
          })()}
        </div>

        {/* <div class="fv_bottom">card-bottoom</div> */}
      </div>
    )
  }
}
