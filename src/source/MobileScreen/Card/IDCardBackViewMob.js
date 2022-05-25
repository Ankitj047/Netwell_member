import React, { Component } from 'react'
import { getSendNeedsToContactAddress } from '../../ApiCall'
export default class IDCardBackViewMob extends Component {
  constructor(props) {
    super(props)
    this.state = {
      network: this.props.network
    }
    console.log('ID CARD BACK VIEW MOBILE==', this.props)
  }
  render() {
    return (
      <div class="bv">
        {/* <div class="bv_top_image_container">
                <img src={require('../../Images/Card/thank-you-for.png')} class="bv_thank_image"/>
                <img src={require('../../Images/Card/sharing.png')} class="bv_sharing_image"/>
            </div> */}

        <div class="bv_details_text_div">
          {/* ========================Top Blue container 1st  =================== */}
          {(() => {
            switch (this.state.network) {
              case 'PHCS':
                return (
                  <div class="">
                    <div class="bv_bluetext_new_common">
                      For Preventive Services Appointments visit: PreventiveServices.UniversalHealthFellowship.org
                    </div>

                    <div class="bv_card_emd_no_container">
                      <div>
                        <div class="bv_bluetext_new_common">For Customer Service call: {this.props.contactNumber}</div>
                        <div class="bv_bluetext_new_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div>
                      </div>
                      <div class="bv_edi_no">EDI #53684</div>
                    </div>
                  </div>
                )

              case 'Smartshare':
                return (
                  <div>
                    {/* <div class="bv_bluetext_new_common">
                      For Preventive Services Appointments visit PreventiveServices.UniversalHealthFellowship.org
                    </div>
                    <div class="bv_bluetext_new_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div>
                    <div class="bv_bluetext_new_common">Providers, send needs requests to: P.O Box 211223, Eagan, MN 55121</div>
                    <div class="bv_bluetext_new_common">For Customer Service call: {this.props.contactNumber}</div> */}

                    <div class="bv_bluetext_new_common">
                      For Preventive Services Appointments visit: PreventiveServices.UniversalHealthFellowship.org
                    </div>
                    <div class="bv_card_emd_no_container">
                      <div>
                        <div class="bv_bluetext_new_common">For Customer Service call: {this.props.contactNumber}</div>
                        <div class="bv_bluetext_new_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div>
                      </div>
                      <div class="bv_edi_no">EDI #53684</div>
                    </div>
                  </div>
                )

              case 'AFMC':
                return (
                  <div>
                    <div class="bv_bluetext_new_common">
                      For Preventive Services Appointments visit: PreventiveServices.UniversalHealthFellowship.org
                    </div>
                    <div class="bv_bluetext_new_common">For Customer Service call: {this.props.contactNumber}</div>

                    <div class="azmc_top_div">
                      <div class="bv_bluetext_new_common">To find a provider visit https://azfmc.com/providersearch</div>
                      <div class="azmc_id_card_no">AFMC EDI #86062</div>
                    </div>
                  </div>
                )
            }
          })()}

          {/* ========================Top Blue container 2st  =================== */}
          {(() => {
            switch (this.state.network) {
              case 'PHCS':
                return (
                  <div class="bv_second_container">
                    <div class="bv_bluetext_new_common">
                      Providers, send needs to:{' '}
                      {this.props.providerNetwork === 'HLC'
                        ? '4555 Mansell Road, Suite 300 Alpharetta, GA 30022'
                        : getSendNeedsToContactAddress()}
                    </div>
                    <div class="bv_blacktext_common margintop_small">
                      Pre-notification is required before these procedures will be eligible for sharing: All Inpatient Hospital
                      Confinements, All Surgical Procedures (Inpatient, Outpatient and Ambulatory, Organ and Tissue Transplant Services)
                      Cancer Treatment and Oncology Services, Independent Lab Tests and Imaging, Home Health Care Services, Carpal Tunnel
                      Treatments. In addition, Pre-certification to confirm medical necessity is required before these procedures may be
                      eligible for sharing: Transplant of any organ or tissue, a coronary bypass or graft of any kind, or a knee or hip
                      replacement. For Medical Emergencies Seek Immediate Medical Help.
                    </div>

                    <div class="bv_blacktext_common margintop_small">
                      Participating member assignment of eligible medical expense sharing payment is permitted as consideration in full for
                      services rendered. Reimbursement for hospital facility services is determined at a percentage of the facility’s
                      Medicare allowable amounts (140% for Inpatient and 155% for Outpatient Services), or, in the absence of an applicable
                      CMS fee schedule, in accordance with published UHF Sharing Guidelines. Acceptance of sharing payment for Eligible
                      Expenses constitutes waiver of facility/provider right to balance bill patient.
                    </div>

                    <div class="bv_blacktext_common margintop_small">
                      See applicable Sharing Guidelines for more details.{' '}
                      <span class="bv_black_bold_text">Universal Health Fellowship</span> is a not-for-profit ministry that facilitates
                      medical expense sharing through Universal HealthShare Programs. Universal HealthShare is not insurance and does not
                      guarantee that eligible medical bills will be shared or otherwise paid. Universal HealthShare is not a discount card
                      or program.
                    </div>
                  </div>
                )

              case 'Smartshare':
                return (
                  <div class="bv_second_container">
                    <div class="bv_bluetext_new_common">Providers, send needs requests to: P.O. Box 211223, Eagan, MN 55121</div>

                    <div class="bv_new_center_container">
                      <div class="bv_black_italic_text">
                        All medical services for the UHS SmartShare Program are limited to an annual maximum of $27,500 per member.
                      </div>
                    </div>

                    <div class="bv_blacktext_common margintop_small">
                      Member assignment to Providers of eligible medical expense sharing reimbursement as consideration for services
                      rendered is permitted by Universal Health Fellowship (UHF). Sharing reimbursement for eligible hospital or ambulatory
                      surgical center services/expenses is determined at a percentage of the facility’s Medicare allowable amounts (140% for
                      Inpatient and 155% for Outpatient Services), or, absent an applicable CMS fee schedule, in accordance with current
                      published UHF Sharing Guidelines. See applicable Sharing Guidelines for details.
                    </div>

                    <div class="bv_blacktext_common margintop_small">
                      See applicable Sharing Guidelines for details.{' '}
                      <span class="bv_black_bold_text">Universal Health Fellowship (UHF). </span> is a not-for-profit ministry that
                      facilitates medical expense sharing through Universal HealthShare Programs. Universal HealthShare is not insurance and
                      does not guarantee that eligible medical bills will be shared or otherwise paid. Universal HealthShare is not a
                      discount card or program.
                    </div>
                  </div>
                )

              case 'AFMC':
                return (
                  <div class="bv_second_container">
                    <div class="bv_bluetext_new_common">
                      Providers, send needs requests to: Arizona Foundation, P.O. Box 2909, Phoenix, AZ 85062-2909
                    </div>
                    <div class="bv_blacktext_common margintop_small">
                      Pre-notification is required before these procedures will be eligible for sharing: All Inpatient Hospital
                      Confinements, All Surgical Procedures (Inpatient, Outpatient and Ambulatory, Organ and Tissue Transplant Services)
                      Cancer Treatment and Oncology Services, Independent Lab Tests and Imaging, Home Health Care Services, Carpal Tunnel
                      Treatments. In addition, Pre-certification to confirm medical necessity is required before these procedures may be
                      eligible for sharing: Transplant of any organ or tissue, a coronary bypass or graft of any kind, or a knee or hip
                      replacement.<span class="bv_mob_bold"> For Medical Emergencies Seek Immediate Medical Help.</span>
                    </div>

                    <div class="bv_blacktext_common margintop_small">
                      Participating member assignment of eligible medical expense sharing payment is permitted as consideration in full for
                      services rendered. Reimbursement for hospital facility services is determined at a percentage of the facility’s
                      Medicare allowable amounts (140% for Inpatient and 155% for Outpatient Services), or, in the absence of an applicable
                      CMS fee schedule, in accordance with published UHF Sharing Guidelines. Acceptance of sharing payment for Eligible
                      Expenses constitutes waiver of facility/provider right to balance bill patient.
                    </div>

                    <div class="bv_blacktext_common margintop_small">
                      See applicable Sharing Guidelines for more details.{' '}
                      <span class="bv_mob_bold">Universal Health Fellowship (www.UniversalHealthFellowship.org) </span> is a not-for-profit
                      ministry that facilitates medical expense sharing through Universal HealthShare Programs. Universal HealthShare is not
                      insurance and does not guarantee that eligible medical bills will be shared or otherwise paid. Universal HealthShare
                      is not a discount card or program.
                      {/* <span class="azmc_id_card_no_bottonm">AFMC EDI #86062</span> */}
                    </div>
                  </div>
                )
            }
          })()}
        </div>

        {this.state.network == 'Smartshare' ? (
          <div>
            <div class="bv_top_image_container">
              <img src={require('../../Images/Card/thank-you-for.png')} class="bv_thank_image_smartshare" />
              <img src={require('../../Images/Card/sharing.png')} class="bv_sharing_image_smartshare" />
            </div>
            <div class="botom_container_smaratshare">
              <div class="bottom_link_backview">www.UniversalHealthFellowship.org</div>
              <div class="bv_card_no_bottom">{this.props.cardId}</div>
            </div>
          </div>
        ) : null}

        {this.state.network == 'PHCS' || this.state.network == 'AFMC' ? (
          <div class="bottomview_image_and_no">
            <div class="bottom_link_backview">www.UniversalHealthFellowship.org</div>

            <div class="bv_top_image_container">
              <img src={require('../../Images/Card/thank-you-for.png')} class="bv_thank_image" />
              <img src={require('../../Images/Card/sharing.png')} class="bv_sharing_image" />
            </div>

            <div class="bv_card_no_bottom">{this.props.cardId}</div>
          </div>
        ) : null}
      </div>
    )
  }
}
