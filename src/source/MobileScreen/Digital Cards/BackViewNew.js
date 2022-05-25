import React, { Component } from 'react'
import './MobileCard.css'
export default class BackView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channel: 'UHS'
    }
  }
  render() {
    return (
      <div class="bv">
        <div class="bv_top_image_container">
          <img src={require('../../Images/Card/thank-you-for.png')} class="bv_thank_image" />
          <img src={require('../../Images/Card/sharing.png')} class="bv_sharing_image" />
        </div>

        <div class="bv_details_text_div">
          {/* ========================Top Blue container 1st  =================== */}
          {(() => {
            switch (this.state.channel) {
              case 'UHS':
                return (
                  <div class="">
                    <div class="bv_bluetext_new_common">
                      For Preventive Services Appointments visit PreventiveServices.UniversalHealthFellowship.org
                    </div>
                    <div class="bv_bluetext_new_common">For Customer Service call: {this.props.contactNumber}</div>
                    <div class="bv_bluetext_new_common">To find a provider visit FindProvider.UniversalHealthFellowship.org</div>
                  </div>
                )

              case 'Smartshare':
                return <div>2</div>

              case 'AFA':
                return <div>3</div>
            }
          })()}

          {/* ========================Top Blue container 2st  =================== */}
          {(() => {
            switch (this.state.channel) {
              case 'UHS':
                return (
                  <div class="bv_second_container">
                    <div class="bv_bluetext_new_common">Providers, send needs to: PO Box 211223, Eagon, MN 55121</div>
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
                      <span class="bv_black_bold_text">Universal Health Fellowship (www.UniversalHealthFellowship.org) </span> is a
                      not-for-profit ministry that facilitates medical expense sharing through Universal HealthShare Programs. Universal
                      HealthShare is not insurance and does not guarantee that eligible medical bills will be shared or otherwise paid.
                      Universal HealthShare is not a discount card or program.
                    </div>
                  </div>
                )

              case 'Smartshare':
                return <div>2</div>

              case 'AFA':
                return <div>3</div>
            }
          })()}
        </div>

        <div class="bv_card_no_bottom">
          {/* xUHSR071720E072020 */}
          {this.props.cardId}
        </div>
      </div>
    )
  }
}

// Participating member assignment of eligible medical expense sharing payment is permitted as consideration in full for services rendered. Reimbursement for hospital facility services is determined at a percentage of the facility’s Medicare allowable amounts (140% for Inpatient and 155% for Outpatient Services), or, in the absence of an applicable CMS fee schedule, in accordance with published UHF Sharing Guidelines. Acceptance of sharing payment for Eligible Expenses constitutes waiver of facility/provider right to balance bill patient.

// See applicable Sharing Guidelines for more details. Universal Health Fellowship (www.UniversalHealthFellowship.org) is a not-for-profit ministry that facilitates medical expense sharing through Universal HealthShare Programs. Universal HealthShare is not insurance and does not guarantee that eligible medical bills will be shared or otherwise paid. Universal HealthShare is not a discount card or program.
