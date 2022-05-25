import React, { Component } from 'react'
import './MobileCard.css'
export default class FrontView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userchannel: 'PHCS',
      digitalcarddata: this.props.data,
      planinfo: this.props.data.memberIdCardList[0].planInfo,
      plainId: this.props.data.memberIdCardList[0].planId
    }
    console.log('front view data==planInfo', this.props)
    console.log('CALL MOBILE FRONTVIEW')
  }
  render() {
    console.log('DATA is==', this.state.digitalcarddata.memberIdCardList[0].planId)
    console.log('pan info i is==', this.state.planinfo)
    return (
      <div class="fview">
        <div class="fv_background_image">
          {/* =============Top Imaghe container========= */}
          <div class="fv_top_image_container">
            <img src={require('../../Images/Card/frame.png')} class="fv_left_logo img-fluid" />

            {this.props.network == 'AFMC' ? (
              <img src={require('../../Images/Card/AZFMC_logo.png')} class="fv_right_logo  img-fluid" />
            ) : null}

            {this.props.network == 'PHCS' ? (
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
                        <div class="fv_username">{data.memberId}</div>
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
                          <div class="fv_list_username">{data.memberId}</div>
                        </div>
                      ) : null}
                    </div>
                  ))}
              </div>

              {/* <div>
                <div class="fv_adult_top_name">Adult 1 First Name Last Name</div>
                <div class="fv_username">
                  {this.state.digitalcarddata.memberIdCardList[0].firstName} {this.state.digitalcarddata.memberIdCardList[0].lastName}
                </div>
              </div> */}

              {/* ================name List========== */}
              {/* <div class="fv_name_container">
                <div class="fv_list_view">
                  <div class="fv_list_adultname">Adult 2 First Name Last Name</div>
                  <div class="fv_list_username">XXXXXXXXXX</div>
                </div>

                <div class="fv_list_view">
                  <div class="fv_list_adultname">Child 1 First Name Last Name</div>
                  <div class="fv_list_username">XXXXXXXXXX</div>
                </div>

                <div class="fv_list_view">
                  <div class="fv_list_adultname">Child 2 First Name Last Name</div>
                  <div class="fv_list_username">XXXXXXXXXX</div>
                </div>

                <div class="fv_list_view">
                  <div class="fv_list_adultname">Child 3 First Name Last Name</div>
                  <div class="fv_list_username">XXXXXXXXXX</div>
                </div>

                <div class="fv_list_view">
                  <div class="fv_list_adultname">Child 4 First Name Last Name</div>
                  <div class="fv_list_username">XXXXXXXXXX</div>
                </div>
              </div> */}
            </div>

            {/* =============Right Conrtainer========= */}
            <div class="fv_right_container">
              <div class="fv_joined_text">Program Details</div>

              <div class="fv_right_table1">
                <div class="fv_left_table">
                  <div class="fv_table_left_text">Member since</div>
                  <div class="fv_table_left_text">Group Number</div>
                  <div class="fv_table_left_text">Program ID</div>
                </div>
                <div class="fv_right_table">
                  <div class="fv_table_right_text">{this.state.digitalcarddata.memberIdCardList[0].enrollmentDate}</div>
                  <div class="fv_table_right_text">{this.state.digitalcarddata.memberIdCardList[0].groupNo}</div>
                  <div class="fv_table_right_text">{this.state.digitalcarddata.memberIdCardList[0].memberSSN}</div>
                </div>
              </div>

              {this.state.plainId == '6006' ? (
                <div class="fv_table_middle_text">Sharing for all medical services is limited t0 $27,500/- per Member/per year</div>
              ) : (
                <div class="fv_space_2table"></div>
              )}

              {/* ====================Dyanmic content for all user========== */}

              <div>
                {this.state.planinfo &&
                  this.state.planinfo.map(data => (
                    <div class="fv_right_new_table">
                      <div class="fv_new_table_left_text">{data.idcardField}</div>
                      <div class="fv_new_table_right_text">{data.fieldValue}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* =============Bttom  comntavt container========= */}
          <div class="fv_center_details_text">
            Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs, not insurance. We
            are IN NETWORK for Multiplan/PHCS Practitioner & Ancillary Network. Providers & Members confirmations and questions{' '}
            {this.props.contactNumber}
          </div>
        </div>

        {/* <div class="fv_bottom">card-bottoom</div> */}
      </div>
    )
  }
}
