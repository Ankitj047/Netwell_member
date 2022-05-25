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
    console.log('MOB FRONT PROPS++', this.props)
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
  render() {
    return (
      <div class="fview">
        <div class="fv_background_image">
          {/* =============Top Imaghe container========= */}
          <div class="fv_top_image_container">
            <img src={require('../../Images/Card/UHS_Logo_RGB_600px_200px.png')} class="fv_left_logo img-fluid" />
            <img src={require('../../Images/Health_Tools_logo.png')} class="fv_left_logo img-fluid" />
            {/* <div class="fv_ht_healthtools_name"  style={{fontFamily:'Anton'}}>Health Tools</div> */}
          </div>

          <div class="fv_card ">
            {/* =============ledt container========= */}
            <div class="fv_left_container">
              <div class="fv_ht_username">
                {this.props.data.memberIdCardList[0].firstName} {this.props.data.memberIdCardList[0].lastName}
              </div>

              {/* {
                  this.state.digitalcarddata && this.state.digitalcarddata.memberIdCardList.map((data,index)=>

                    <div>
                      {
                        index==0
                        ? <div>
                        <div class="fv_adult_top_name">{data.firstName} {data.lastName}</div>
                        <div class="fv_username">
                        {this.state.prefix}{this.props.showEmpId ? data.empId : data.memberId}
                        </div>
                      </div>
                        :
                        null
                      }
                    </div>
                  )
                } */}

              <div class="mob_scrollbarview">
                <div class="fv_list_view">
                  <div class="fv_ht_group_fieldname">Member ID</div>
                  <div class="fv_ht_group_fieldname">
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

                <div class="fv_list_view">
                  <div class="fv_ht_group_fieldname">Group ID</div>
                  <div class="fv_ht_group_fieldname">{this.state.groupno}</div>
                </div>

                {/* {
                   this.state.digitalcarddata && this.state.digitalcarddata.memberIdCardList.map((data,index)=>
                   <div>
                     {
                        index != 0
                        ?

                      <div class="fv_list_view">
                         <div class="fv_list_adultname">{data.firstName} {data.lastName}</div>
                         <div class="fv_list_username">{this.state.prefix}{this.props.showEmpId ? data.empId : data.memberId}</div>
                      </div>
                        :null
                     }
                   </div>
                   )
                } */}
              </div>
            </div>

            {/* =============Right Conrtainer========= */}
            <div class="fv_right_container">
              <div class="mb-3">
                <div class="fv_ht_right_heading">To Access Your Health Tools,</div>
                <div class="fv_ht_right_heading">Use These Contact Numbers:</div>
              </div>

              {/* <div class="fv_joined_text">Program Details</div> */}

              {/* <div class="fv_right_table1">
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
                  </div> */}

              {/* <div class="fv_space_2table"></div> */}

              {/* {this.props.network =='Smartshare' ? (
                    <div class="fv_table_middle_text">Sharing for all medical services is limited to $27,500/- per Member/per year</div>
                  ) : (
                    <div class="fv_space_2table"></div>
                  )} */}

              {/* ====================Dyanmic content for all user========== */}

              <div>
                {carddata.rightdata.map(data => (
                  <div>
                    <div class="fv_right_new_table">
                      <div class="fv_new_table_left_text">{data.fieldname}</div>
                      <div class="fv_new_table_right_text">{data.fieldvalue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* =============Bttom  comntavt container========= */}

          <div class="fv_ht_bottom_center_text">
            This program is <span class="fv_ht_bold_text">NOT INSURANCE COVERAGE</span> and does not meet the minimum creditable coverage
            requirements under the Affordable Care Act or Massachusetts M.G.L. c. 111M and 956 CMR 5.00.
          </div>

          {/* {(() => {
                switch ( this.props.network) {
                  case 'PHCS':
                    return (
                      <div class="fv_center_details_text">
                      Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs, not insurance. We are IN NETWORK for Multiplan/PHCS Practitioner & Ancillary Network. Providers & Members confirmations and questions {this.props.contactNumber}
                  </div>
                    )

                  case 'Smartshare':
                    return (
                      <div class="fv_center_details_text">
                      Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs, not insurance. We are IN NETWORK for Multiplan/PHCS Practitioner & Ancillary Network. Providers & Members confirmations and questions {this.props.contactNumber}
                  </div>
                    )

                  case 'AFMC':
                    return (
                      <div class="fv_center_details_text">
                      Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs,
not insurance. We are IN NETWORK for The Arizona Foundation for physician and ancillary services. Providers & Members confirmations and questions {this.props.contactNumber}
                  </div>
                    )
                }
              })()} */}
        </div>

        {/* <div class="fv_bottom">card-bottoom</div> */}
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
