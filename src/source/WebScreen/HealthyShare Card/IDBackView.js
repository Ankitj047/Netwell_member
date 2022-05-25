import React, { Component } from 'react'

export default class IDBackView extends Component {
  constructor(props) {
    super(props)
    console.log('props isssss', this.props.network)
    this.state = {
      network: this.props.network
    }
  }
  render() {
    return (
      <div className="Rectangle">
        <div id="capture">
          <div class="web_bv">
            <div class="web_bv_details_text_div">
              {/* ========================Top Blue container 1st  =================== */}
              {(() => {
                switch (this.state.network) {
                  case 'PHCS':
                    return (
                      <div>
                        <div class="web_bv_bluetext_common">
                          For Preventive Services Appointments visit: PreventiveServices.UniversalHealthFellowship.org
                        </div>
                        {/* <div class="web_bv_bluetext_common">For Customer Service call: {this.props.contactNumber}</div>
                        <div class="web_bv_bluetext_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div> */}

                        <div class="AFA_3rdtext">
                          <div>
                            <div class="web_bv_bluetext_common">For Customer Service call: {this.props.contactNumber}</div>
                            <div class="web_bv_bluetext_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div>
                          </div>

                          {/* <div class="AFA_id_no_div">EDI #53684</div> */}
                        </div>
                      </div>
                    )

                  case 'Smartshare':
                    return (
                      <div>
                        {/* <div class="web_bv_bluetext_common">
                          For Preventive Services Appointments visit PreventiveServices.UniversalHealthFellowship.org
                        </div>
                        <div class="web_bv_bluetext_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div>
                        <div class="web_bv_bluetext_common">Providers, send needs requests to: P.O Box 211223, Eagan, MN 55121</div>
                        <div class="web_bv_bluetext_common">For Customer Service call: {this.props.contactNumber}</div> */}

                        <div class="web_bv_bluetext_common">
                          For Preventive Services Appointments visit: PreventiveServices.UniversalHealthFellowship.org
                        </div>

                        <div class="AFA_3rdtext">
                          <div>
                            <div class="web_bv_bluetext_common">For Customer Service call : {this.props.contactNumber}</div>
                            <div class="web_bv_bluetext_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div>
                          </div>

                          {/* <div class="AFA_id_no_div">EDI #53684</div> */}
                        </div>
                      </div>
                    )

                  case 'healthyLife':
                    return (
                      <div>
                        <div class="web_bv_bluetext_common">
                          For Preventive Services Appointments visit: PreventiveServices.UniversalHealthFellowship.org
                        </div>
                        {/* <div class="web_bv_bluetext_common">For Customer Service call: {this.props.contactNumber}</div>
                        <div class="web_bv_bluetext_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div> */}

                        <div class="AFA_3rdtext">
                          <div>
                            <div class="web_bv_bluetext_common">
                              For Customer Service call:
                              {/* (888) 366-6243 */}
                              {this.props.contactNumber}
                            </div>
                            <div class="web_bv_bluetext_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div>
                          </div>

                          <div class="AFA_id_no_div">EDI #40585</div>
                        </div>
                      </div>
                    )

                  case 'smartshare25':
                    return (
                      <div>
                        {/* <div class="web_bv_bluetext_common">
                          For Preventive Services Appointments visit PreventiveServices.UniversalHealthFellowship.org
                        </div>
                        <div class="web_bv_bluetext_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div>
                        <div class="web_bv_bluetext_common">Providers, send needs requests to: P.O Box 211223, Eagan, MN 55121</div>
                        <div class="web_bv_bluetext_common">For Customer Service call: {this.props.contactNumber}</div> */}

                        <div class="web_bv_bluetext_common">
                          For Preventive Services Appointments visit: PreventiveServices.UniversalHealthFellowship.org
                        </div>

                        <div class="AFA_3rdtext">
                          <div>
                            <div class="web_bv_bluetext_common">
                              For Customer Service call:
                              {this.props.contactNumber}
                              {/* (888) 366-6243 */}
                            </div>
                            <div class="web_bv_bluetext_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div>
                          </div>

                          <div class="AFA_id_no_div">EDI #40585</div>
                        </div>
                      </div>
                    )

                  case 'smartshare50':
                    return (
                      <div>
                        {/* <div class="web_bv_bluetext_common">
                          For Preventive Services Appointments visit PreventiveServices.UniversalHealthFellowship.org
                        </div>
                        <div class="web_bv_bluetext_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div>
                        <div class="web_bv_bluetext_common">Providers, send needs requests to: P.O Box 211223, Eagan, MN 55121</div>
                        <div class="web_bv_bluetext_common">For Customer Service call: {this.props.contactNumber}</div> */}

                        <div class="web_bv_bluetext_common">
                          For Preventive Services Appointments visit: PreventiveServices.UniversalHealthFellowship.org
                        </div>

                        <div class="AFA_3rdtext">
                          <div>
                            <div class="web_bv_bluetext_common">
                              For Customer Service call:
                              {this.props.contactNumber}
                              {/* (888) 366-6243 */}
                            </div>
                            <div class="web_bv_bluetext_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div>
                          </div>

                          <div class="AFA_id_no_div">EDI #40585</div>
                        </div>
                      </div>
                    )

                  case 'AFMC':
                    return (
                      <div>
                        <div class="web_bv_bluetext_common">
                          For Preventive Services Appointments visit: PreventiveServices.UniversalHealthFellowship.org
                        </div>
                        {/* <div class="web_bv_bluetext_common">For Customer Service call: {this.props.contactNumber}</div> */}

                        {/* <div class="AFA_3rdtext">
                          <div class="web_bv_bluetext_common">To find a provider visit https://azfmc.com/providersearch</div>
                          <div class="AFA_id_no_div">AFMC EDI #86062</div>
                        </div> */}

                        <div class="AFA_3rdtext">
                          <div>
                            <div class="web_bv_bluetext_common">For Customer Service call: {this.props.contactNumber}</div>
                            <div class="web_bv_bluetext_common">To find a provider visit https://azfmc.com/providersearch</div>
                          </div>

                          {/* <div class="AFA_id_no_div">AFMC EDI #86062</div> */}
                        </div>
                      </div>
                    )
                }
              })()}

              {/* ========================Top Blue container 2st  =================== */}
              {(() => {
                switch (this.props.network) {
                  case 'PHCS':
                    return (
                      <div class="web_bv_second_container">
                        <div class="web_bv_bluetext_common">
                          {localStorage.getItem('CLIENT_ID') === '5541' || localStorage.getItem('CLIENT_ID') === '4377'
                            ? 'PO Box 21082 Eagan, MN 55121'
                            : 'Providers, send needs to: P.O. Box 211223, Eagon, MN 55121'}
                        </div>
                        <div class="web_bv_blacktext_common margintop_small">
                          Pre-notification is required before these procedures will be eligible for sharing: All Inpatient Hospital
                          Confinements, All Surgical Procedures (Inpatient, Outpatient and Ambulatory, Organ and Tissue Transplant Services)
                          Cancer Treatment and Oncology Services, Independent Lab Tests and Imaging, Home Health Care Services, Carpal
                          Tunnel Treatments. In addition, Pre-certification to confirm medical necessity is required before these procedures
                          may be eligible for sharing: Transplant of any organ or tissue, a coronary bypass or graft of any kind, or a knee
                          or hip replacement.<span class="bv_black_bold_text"> For Medical Emergencies Seek Immediate Medical Help.</span>
                        </div>

                        <div class="web_bv_blacktext_common margintop_small">
                          Participating member assignment of eligible medical expense sharing payment is permitted as consideration in full
                          for services rendered. Reimbursement for hospital facility services is determined at a percentage of the
                          facility’s Medicare allowable amounts (140% for Inpatient and 155% for Outpatient Services), or, in the absence of
                          an applicable CMS fee schedule, in accordance with published UHF Sharing Guidelines. Acceptance of sharing payment
                          for Eligible Expenses constitutes waiver of facility/provider right to balance bill patient.
                        </div>

                        <div class="web_bv_blacktext_common margintop_small">
                          See applicable Sharing Guidelines for more details.{' '}
                          <span class="bv_black_bold_text">Universal Health Fellowship</span> is a not-for-profit ministry that facilitates
                          medical expense sharing through Universal HealthShare Programs. Universal HealthShare is not insurance and does
                          not guarantee that eligible medical bills will be shared or otherwise paid. Universal HealthShare is not a
                          discount card or program.
                        </div>
                      </div>
                    )

                  case 'Smartshare':
                    return (
                      <div class="web_bv_second_container">
                        <div class="web_bv_bluetext_common">Providers, send needs requests to: P.O. Box 211223, Eagan, MN 55121</div>

                        <div class="smartshare_container_middle_text">
                          <div class="uhs_balck_text_design">
                            All medical services for the UHS SmartShare Program are limited to an annual maximum of $27,500 per member.
                          </div>
                        </div>
                        <div class="web_bv_blacktext_common margintop_small">
                          Member assignment to Providers of eligible medical expense sharing reimbursement as consideration for services
                          rendered is permitted by Universal Health Fellowship (UHF). Sharing reimbursement for eligible hospital or
                          ambulatory surgical center services/expenses is determined at a percentage of the facility’s Medicare allowable
                          amounts (140% for Inpatient and 155% for Outpatient Services), or, absent an applicable CMS fee schedule, in
                          accordance with current published UHF Sharing Guidelines. See applicable Sharing Guidelines for details.
                        </div>

                        <div class="web_bv_blacktext_common margintop_small">
                          See applicable Sharing Guidelines for details.{' '}
                          <span class="bv_black_bold_text">Universal Health Fellowship (UHF). </span>
                          is a not-for-profit ministry that facilitates medical expense sharing through Universal HealthShare Programs.
                          Universal HealthShare is not insurance and does not guarantee that eligible medical bills will be shared or
                          otherwise paid. Universal HealthShare is not a discount card or program.
                        </div>
                      </div>
                    )

                  case 'healthyLife':
                    return (
                      <div class="web_bv_second_container">
                        <div class="web_bv_bluetext_common">
                          {localStorage.getItem('CLIENT_ID') === '5541' || localStorage.getItem('CLIENT_ID') === '4377'
                            ? 'PO Box 21082 Eagan, MN 55121'
                            : 'Providers, send needs requests to: PO Box 106 Rutherford, NJ 07070-0106'}
                        </div>
                        <div class="web_bv_blacktext_common margintop_small">
                          Pre-notification is required before these procedures will be eligible for sharing: All Inpatient Hospital
                          Confinements, All Surgical Procedures (Inpatient, Outpatient and Ambulatory, Organ and Tissue Transplant Services)
                          Cancer Treatment and Oncology Services, Independent Lab Tests and Imaging, Home Health Care Services, Carpal
                          Tunnel Treatments. In addition, Pre-certification to confirm medical necessity is required before these procedures
                          may be eligible for sharing: Transplant of any organ or tissue, a coronary bypass or graft of any kind, or a knee
                          or hip replacement.<span class="bv_black_bold_text"> For Medical Emergencies Seek Immediate Medical Help.</span>
                        </div>

                        <div class="web_bv_blacktext_common margintop_small">
                          Participating member assignment of eligible medical expense sharing payment is permitted as consideration in full
                          for services rendered. Reimbursement for hospital facility services is determined at a percentage of the
                          facility’s Medicare allowable amounts (140% for Inpatient and 155% for Outpatient Services), or, in the absence of
                          an applicable CMS fee schedule, in accordance with published UHF Sharing Guidelines. Acceptance of sharing payment
                          for Eligible Expenses constitutes waiver of facility/provider right to balance bill patient.
                        </div>

                        <div class="web_bv_blacktext_common margintop_small">
                          See applicable Sharing Guidelines for more details.{' '}
                          <span class="bv_black_bold_text">Universal Health Fellowship</span> is a not-for-profit ministry that facilitates
                          medical expense sharing through Universal HealthShare Programs. Universal HealthShare is not insurance and does
                          not guarantee that eligible medical bills will be shared or otherwise paid. Universal HealthShare is not a
                          discount card or program.
                        </div>
                      </div>
                    )

                  case 'smartshare25':
                    return (
                      <div class="web_bv_second_container">
                        <div class="web_bv_bluetext_common">Providers, send needs requests to: PO Box 106 Rutherford, NJ 07070-0106</div>

                        <div class="smartshare_container_middle_text">
                          <div class="uhs_balck_text_design">
                            All medical services for the Healthy Life EasyShare Program 25 are limited to an annual maximum of $25,000 per
                            member.
                          </div>
                        </div>
                        <div class="web_bv_blacktext_common margintop_small">
                          Member assignment to Providers of eligible medical expense sharing reimbursement as consideration for services
                          rendered is permitted by Universal Health Fellowship (UHF). Sharing reimbursement for eligible hospital or
                          ambulatory surgical center services/expenses is determined at a percentage of the facility’s Medicare allowable
                          amounts (140% for Inpatient and 155% for Outpatient Services), or, absent an applicable CMS fee schedule, in
                          accordance with current published UHF Sharing Guidelines. See applicable Sharing Guidelines for details.
                        </div>

                        <div class="web_bv_blacktext_common margintop_small">
                          See applicable Sharing Guidelines for details.{' '}
                          <span class="bv_black_bold_text">Universal Health Fellowship (UHF). </span>
                          is a not-for-profit ministry that facilitates medical expense sharing through Universal HealthShare Programs.
                          Universal HealthShare is not insurance and does not guarantee that eligible medical bills will be shared or
                          otherwise paid. Universal HealthShare is not a discount card or program.
                        </div>
                      </div>
                    )

                  case 'smartshare50':
                    return (
                      <div class="web_bv_second_container">
                        <div class="web_bv_bluetext_common">Providers, send needs requests to: PO Box 106 Rutherford, NJ 07070-0106</div>

                        <div class="smartshare_container_middle_text">
                          <div class="uhs_balck_text_design">
                            All medical services for the Healthy Life EasyShare Program 50 are limited to an annual maximum of $50,000 per
                            member.
                          </div>
                        </div>
                        <div class="web_bv_blacktext_common margintop_small">
                          Member assignment to Providers of eligible medical expense sharing reimbursement as consideration for services
                          rendered is permitted by Universal Health Fellowship (UHF). Sharing reimbursement for eligible hospital or
                          ambulatory surgical center services/expenses is determined at a percentage of the facility’s Medicare allowable
                          amounts (140% for Inpatient and 155% for Outpatient Services), or, absent an applicable CMS fee schedule, in
                          accordance with current published UHF Sharing Guidelines. See applicable Sharing Guidelines for details.
                        </div>

                        <div class="web_bv_blacktext_common margintop_small">
                          See applicable Sharing Guidelines for details.{' '}
                          <span class="bv_black_bold_text">Universal Health Fellowship (UHF). </span>
                          is a not-for-profit ministry that facilitates medical expense sharing through Universal HealthShare Programs.
                          Universal HealthShare is not insurance and does not guarantee that eligible medical bills will be shared or
                          otherwise paid. Universal HealthShare is not a discount card or program.
                        </div>
                      </div>
                    )

                  case 'AFMC':
                    return (
                      <div class="web_bv_second_container">
                        <div class="web_bv_bluetext_common">
                          Providers, send needs requests to: Arizona Foundation, P.O. Box 2909, Phoenix, AZ 85062-2909
                        </div>
                        <div class="web_bv_blacktext_common margintop_small">
                          Pre-notification is required before these procedures will be eligible for sharing: All Inpatient Hospital
                          Confinements, All Surgical Procedures (Inpatient, Outpatient and Ambulatory, Organ and Tissue Transplant Services)
                          Cancer Treatment and Oncology Services, Independent Lab Tests and Imaging, Home Health Care Services, Carpal
                          Tunnel Treatments. In addition, Pre-certification to confirm medical necessity is required before these procedures
                          may be eligible for sharing: Transplant of any organ or tissue, a coronary bypass or graft of any kind, or a knee
                          or hip replacement.<span class="bv_black_bold_text"> For Medical Emergencies Seek Immediate Medical Help.</span>
                        </div>

                        <div class="web_bv_blacktext_common margintop_small">
                          Participating member assignment of eligible medical expense sharing payment is permitted as consideration in full
                          for services rendered. Reimbursement for hospital facility services is determined at a percentage of the
                          facility’s Medicare allowable amounts (140% for Inpatient and 155% for Outpatient Services), or, in the absence of
                          an applicable CMS fee schedule, in accordance with published UHF Sharing Guidelines. Acceptance of sharing payment
                          for Eligible Expenses constitutes waiver of facility/provider right to balance bill patient.
                        </div>

                        <div class="web_bv_blacktext_common margintop_small">
                          See applicable Sharing Guidelines for more details.{' '}
                          <span class="bv_black_bold_text">Universal Health Fellowship</span> is a not-for-profit ministry that facilitates
                          medical expense sharing through Universal HealthShare Programs. Universal HealthShare is not insurance and does
                          not guarantee that eligible medical bills will be shared or otherwise paid. Universal HealthShare is not a
                          discount card or program.
                          {/* <span class="AFA_bottom_id">AFMC EDI #86062</span> */}
                        </div>
                      </div>
                    )
                }
              })()}

              {this.props.network == 'Smartshare' || this.props.network == 'smartshare25' || this.props.network == 'smartshare50' ? (
                <div class="smaratshare_image_container">
                  <div class="bv_top_image_container">
                    <img src={require('../../Images/Card/thank-you-for.png')} class="smartshare_web_bv_thank_image" />
                    <img src={require('../../Images/Card/sharing.png')} class="smartshare_web_bv_sharing_image " />
                  </div>

                  {/* <div class="smartshare_web_bv_card_no_bottom">
                    <div class="web_bv_link_url">www.UniversalHealthFellowship.org</div>

                 <div class="web_bv_link_url">{this.props.cardId}</div>
                </div> */}
                </div>
              ) : null}
            </div>

            {this.props.network == 'smartshare50' ? (
              <div class="web_bv_card_no_bottom ">
                <div class="web_bv_link_url">www.UniversalHealthFellowship.org</div>

                <div class="web_bv_link_url">
                  {this.props.cardId}
                  {/* HLES50R022321E030121 */}
                </div>
              </div>
            ) : null}
            {this.props.network == 'smartshare25' ? (
              <div class="web_bv_card_no_bottom ">
                <div class="web_bv_link_url">www.UniversalHealthFellowship.org</div>

                <div class="web_bv_link_url">
                  {this.props.cardId}
                  {/* HLES25R022321E030121 */}
                </div>
              </div>
            ) : null}

            {this.props.network == 'PHCS' || this.props.network == 'healthyLife' ? (
              <div class="for_afmc_phcs_web_bv_card_no_bottom ">
                <div class="web_bv_link_url">www.UniversalHealthFellowship.org</div>

                <div>
                  <div class="bv_top_image_container">
                    <img src={require('../../Images/Card/thank-you-for.png')} class="web_bv_thank_image" />
                    <img src={require('../../Images/Card/sharing.png')} class="web_bv_sharing_image" />
                  </div>
                </div>

                <div class="web_bv_link_url">
                  {this.props.cardId}
                  {/* HLR022321E030121 */}
                </div>
              </div>
            ) : null}

            {/* {this.props.network == 'Smartshare'? (
          <div class="smartshare_web_bv_card_no_bottom">
            <div class="web_bv_link_url">www.UniversalHealthFellowship.org</div>

          

            <div class="web_bv_link_url">{this.props.cardId}</div>
          </div>
        ) : null} */}
          </div>

          {/* ====================Backview card============ */}

          <div className="close-flip-div">
            <div className="close-flip-row">
              <div style={{ float: 'left', paddingLeft: '20px' }}>
                <text className="text" style={{ paddingRight: '20px', marginTop: '28px', cursor: 'pointer' }} onClick={this.props.onClose}>
                  CLOSE
                </text>
              </div>
              <div style={{ float: 'right' }}>
                <text
                  className="text"
                  style={{ paddingRight: '20px', marginTop: '28px', cursor: 'pointer' }}
                  onClick={this.props.changeside}
                >
                  VIEW FRONT OF CARD
                </text>
                {/* <text className='Text' style={{ padding: '20px' }} onClick={() => html2canvas(document.querySelector("#capture")).then(canvas => {

							saveAs(canvas.toDataURL(), 'Health Card.png');
						})}>	 DOWNLOAD</text> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// <div className="Rectangle">
// <div id="capture">
//   <div class="web_bv">
//     <div class="web_bv_details_text_div">
//       {/* ========================Top Blue container 1st  =================== */}
//       {(() => {
//         switch (this.props.network) {
//           case 'PHCS':
//             return (
//               <div>
//                 <div class="web_bv_bluetext_common">
//                   For Preventive Services Appointments visit PreventiveServices.UniversalHealthFellowship.org
//                 </div>
//                 <div class="web_bv_bluetext_common">For Customer Service call: {this.props.contactNumber}</div>
//                 <div class="web_bv_bluetext_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div>
//               </div>
//             )

//           case 'Smartshare':
//             return (
//               <div>
//                 <div class="web_bv_bluetext_common">
//                   For Preventive Services Appointments visit PreventiveServices.UniversalHealthFellowship.org
//                 </div>
//                 <div class="web_bv_bluetext_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div>
//                 <div class="web_bv_bluetext_common">Providers, send needs requests to: P.O Box 211223, Eagan, MN 55121</div>
//                 <div class="web_bv_bluetext_common">For Customer Service call: {this.props.contactNumber}</div>
//               </div>
//             )

//           case 'AFMC':
//             return (
//               <div>
//                 <div class="web_bv_bluetext_common">
//                   For Preventive Services Appointments visit PreventiveServices.UniversalHealthFellowship.org
//                 </div>
//                 <div class="web_bv_bluetext_common">For Customer Service call: {this.props.contactNumber}</div>

//                 <div class="AFA_3rdtext">
//                   <div class="web_bv_bluetext_common">To find a provider visit https://azfmc.com/providersearch</div>
//                   <div class="AFA_id_no_div">AFMC EDI #86062</div>
//                 </div>
//               </div>
//             )
//         }
//       })()}

//       {/* ========================Top Blue container 2st  =================== */}
//       {(() => {
//         switch (this.props.network) {
//           case 'PHCS':
//             return (
//               <div class="web_bv_second_container">
//                 <div class="web_bv_bluetext_common">Providers, send needs to: PO Box 211223, Eagon, MN 55121</div>
//                 <div class="web_bv_blacktext_common margintop_small">
//                   Pre-notification is required before these procedures will be eligible for sharing: All Inpatient Hospital
//                   Confinements, All Surgical Procedures (Inpatient, Outpatient and Ambulatory, Organ and Tissue Transplant Services)
//                   Cancer Treatment and Oncology Services, Independent Lab Tests and Imaging, Home Health Care Services, Carpal
//                   Tunnel Treatments. In addition, Pre-certification to confirm medical necessity is required before these procedures
//                   may be eligible for sharing: Transplant of any organ or tissue, a coronary bypass or graft of any kind, or a knee
//                   or hip replacement.<span class="bv_black_bold_text"> For Medical Emergencies Seek Immediate Medical Help.</span>
//                 </div>

//                 <div class="web_bv_blacktext_common margintop_small">
//                   Participating member assignment of eligible medical expense sharing payment is permitted as consideration in full
//                   for services rendered. Reimbursement for hospital facility services is determined at a percentage of the
//                   facility’s Medicare allowable amounts (140% for Inpatient and 155% for Outpatient Services), or, in the absence of
//                   an applicable CMS fee schedule, in accordance with published UHF Sharing Guidelines. Acceptance of sharing payment
//                   for Eligible Expenses constitutes waiver of facility/provider right to balance bill patient.
//                 </div>

//                 <div class="web_bv_blacktext_common margintop_small">
//                   See applicable Sharing Guidelines for more details.{' '}
//                   <span class="bv_black_bold_text">Universal Health Fellowship (www.UniversalHealthFellowship.org) </span> is a
//                   not-for-profit ministry that facilitates medical expense sharing through Universal HealthShare Programs. Universal
//                   HealthShare is not insurance and does not guarantee that eligible medical bills will be shared or otherwise paid.
//                   Universal HealthShare is not a discount card or program.
//                 </div>
//               </div>
//             )

//           case 'Smartshare':
//             return (
//               <div class="web_bv_second_container">
//                 <div class="uhs_balck_text_design">
//                   All medical services for the UHS Smartshare program are limited to an annual maximum of $27,500 per member
//                 </div>
//                 <div class="web_bv_blacktext_common margintop_small">
//                   Member assignment to Providers of eligible medical expense sharing reimbursement as consideration for services
//                   rendered is permitted by Universal Health Fellowship (UHF). Sharing reimbursement for eligible hospital or
//                   ambulatory surgical center services/expenses is determined at a percentage of the facility’s Medicare allowable
//                   amounts (140% for Inpatient and 155% for Outpatient Services), or, absent an applicable CMS fee schedule, in
//                   accordance with current published UHF Sharing Guidelines. See applicable Sharing Guidelines for details.
//                 </div>

//                 <div class="web_bv_blacktext_common margintop_small">
//                   See applicable Sharing Guidelines for details.{' '}
//                   <span class="bv_black_bold_text">Universal Health Fellowship </span>
//                   is a not-for-profit ministry that facilitates medical expense sharing through Universal HealthShare Programs.
//                   Universal HealthShare is not insurance and does not guarantee that eligible medical bills will be shared or
//                   otherwise paid. Universal HealthShare is not a discount card or program.
//                 </div>
//               </div>
//             )

//           case 'AFMC':
//             return (
//               <div class="web_bv_second_container">
//                 <div class="web_bv_bluetext_common">
//                   Providers, send needs requests to: Arizona Foundation, PO Box 2909, Phoenix, AZ 86062-2909
//                 </div>
//                 <div class="web_bv_blacktext_common margintop_small">
//                   Pre-notification is required before these procedures will be eligible for sharing: All Inpatient Hospital
//                   Confinements, All Surgical Procedures (Inpatient, Outpatient and Ambulatory, Organ and Tissue Transplant Services)
//                   Cancer Treatment and Oncology Services, Independent Lab Tests and Imaging, Home Health Care Services, Carpal
//                   Tunnel Treatments. In addition, Pre-certification to confirm medical necessity is required before these procedures
//                   may be eligible for sharing: Transplant of any organ or tissue, a coronary bypass or graft of any kind, or a knee
//                   or hip replacement.<span class="bv_black_bold_text"> For Medical Emergencies Seek Immediate Medical Help.</span>
//                 </div>

//                 <div class="web_bv_blacktext_common margintop_small">
//                   Participating member assignment of eligible medical expense sharing payment is permitted as consideration in full
//                   for services rendered. Reimbursement for hospital facility services is determined at a percentage of the
//                   facility’s Medicare allowable amounts (140% for Inpatient and 155% for Outpatient Services), or, in the absence of
//                   an applicable CMS fee schedule, in accordance with published UHF Sharing Guidelines. Acceptance of sharing payment
//                   for Eligible Expenses constitutes waiver of facility/provider right to balance bill patient.
//                 </div>

//                 <div class="web_bv_blacktext_common margintop_small">
//                   See applicable Sharing Guidelines for more details.{' '}
//                   <span class="bv_black_bold_text">Universal Health Fellowship (www.UniversalHealthFellowship.org) </span> is a
//                   not-for-profit ministry that facilitates medical expense sharing through Universal HealthShare Programs. Universal
//                   HealthShare is not insurance and does not guarantee that eligible medical bills will be shared or otherwise paid.
//                   Universal HealthShare is not a discount card or program. <span class="AFA_bottom_id">AFMC EDI #86062</span>
//                 </div>
//               </div>
//             )
//         }
//       })()}

//       <div class="demoprint">hello111</div>

//       {this.props.network == 'Smartshare' ? (
//         <div class="smaratshare_image_container">
//           <div class="bv_top_image_container">
//             <img src={require('../../Images/Card/thank-you-for.png')} class="smartshare_web_bv_thank_image" />
//             <img src={require('../../Images/Card/sharing.png')} class="smartshare_web_bv_sharing_image " />
//           </div>

//           {/* <div class="smartshare_web_bv_card_no_bottom">
//     <div class="web_bv_link_url">www.UniversalHealthFellowship.org</div>

//     <div class="web_bv_link_url">{this.props.cardId}</div>
//   </div> */}
//         </div>
//       ) : null}
//     </div>

//     {this.props.network == 'PHCS' || this.props.network == 'AFMC' ? (
//       <div class="web_bv_card_no_bottom ">
//         <div class="web_bv_link_url">www.UniversalHealthFellowship.org</div>

//         <div>
//           <div class="bv_top_image_container">
//             <img src={require('../../Images/Card/thank-you-for.png')} class="web_bv_thank_image" />
//             <img src={require('../../Images/Card/sharing.png')} class="web_bv_sharing_image" />
//           </div>
//         </div>

//         <div class="web_bv_link_url">{this.props.cardId}</div>
//       </div>
//     ) : null}

//     {/* {this.props.network == 'Smartshare'? (
//   <div class="smartshare_web_bv_card_no_bottom">
//     <div class="web_bv_link_url">www.UniversalHealthFellowship.org</div>

//     <div class="web_bv_link_url">{this.props.cardId}</div>
//   </div>
// ) : null} */}
//   </div>

//   {/* ====================Backview card============ */}

//   <div className="close-flip-div">
//     <div className="close-flip-row">
//       <div style={{ float: 'left', paddingLeft: '20px' }}>
//         <text className="text" style={{ paddingRight: '20px', marginTop: '28px', cursor: 'pointer' }} onClick={this.props.onClose}>
//           CLOSE
//         </text>
//       </div>
//       <div style={{ float: 'right' }}>
//         <text
//           className="text"
//           style={{ paddingRight: '20px', marginTop: '28px', cursor: 'pointer' }}
//           onClick={this.props.changeside}
//         >
//           VIEW FRONT OF CARD
//         </text>
//         {/* <text className='Text' style={{ padding: '20px' }} onClick={() => html2canvas(document.querySelector("#capture")).then(canvas => {

//       saveAs(canvas.toDataURL(), 'Health Card.png');
//     })}>	 DOWNLOAD</text> */}
//       </div>
//     </div>
//   </div>
// </div>
// </div>
