import React, { Component } from 'react'

export default class BackView extends Component {
  constructor(props) {
    super(props)
    console.log('props isssss', this.props.network)
    this.state = {
      network: this.props.network,
      custServiceNum: ''
    }
  }

  componentDidMount() {
    var getMemberData = JSON.parse(localStorage.getItem('MEMBER_IDCARD_DATA'))

    if (getMemberData) {
      console.log('getMemberData ===>', getMemberData)
      getMemberData.memberIdCardList[0].planInfo.map((data, index) => {
        if (data.idcardField == 'contact number') {
          this.setState({ custServiceNum: data.fieldValue })
        }
      })
    }
  }

  render() {
    return (
      <div className="Rectangle">
        <div id="capture">
          <div class="web_bv">
            <div class="web_bv_details_text_div" style={{ paddingBottom: '3px' }}>
              <div class="web_ht_bluetext_all">
                Discount Plan Organization: New Benefits, PO Box 803475, Dallas, TX 75380-3475, 800-800-7616
              </div>

              <div class="web_ht_bluetext_all">
                For other questions, call Universal HealthShare Customer Service:{' '}
                {this.props.contactNumber ? this.props.contactNumber : this.state.custServiceNum}
              </div>

              <div class="web_ht_black_text_common">
                <span class="web_ht_bold_condition">Aetna Dental</span> provides discounts on dental procedures through a network of dental
                practice locations nationwide. Members present this card with payment in full of the discounted fee, for immediate savings
                when services are rendered. Actual costs and savings vary by provider, service and geographical area.{' '}
                <span class="web_ht_underline_span">Call 855-647-6764</span> for more information or to locate dental network providers.
                This dental discount program is not available to VT residents.
              </div>

              <div class="web_ht_black_text_common">
                <span class="web_ht_bold_condition">Coast to Coast VisionTM</span> has contracted with 20,000+ locations nationwide.
                Prescription glasses and contact lenses are discounted 20% to 60% in most cases. Eye exams and surgery are discounted 10% to
                30% where available. LASIK discounts are available. This network includes ophthalmologists, optometrists, and national chain
                locations such as Pearle Vision, JCPenney Optical, Target Optical, LensCrafters, Visionworks and QualSight LASIK.{' '}
                <span class="web_ht_underline_span">Call 855-647-6764</span> for more information or to locate vision network providers.
              </div>

              <div class="web_ht_black_text_common">
                <span class="web_ht_bold_condition">Telephonic EAP </span>provides free unlimited, confidential telephone counseling
                services 24/7. <span class="web_ht_underline_span">Call 866-799-2998</span> for more information or to speak with an EAP
                counselor.
              </div>

              <div class="web_ht_thankyou_container ">
                <div class="web_bv_link_url">www.UniversalHealthFellowship.org</div>

                <div>
                  <div class="bv_top_image_container">
                    <img src={require('../../Images/Card/thank-you-for.png')} class="web_bv_thank_image" />
                    <img src={require('../../Images/Card/sharing.png')} class="web_bv_sharing_image" />
                  </div>
                </div>

                <div class="web_bv_link_url">UHFHTR102820E110120</div>
              </div>

              {/* ========================Top Blue container 1st  =================== */}

              {/* ========================Top Blue container 2st  =================== */}
            </div>

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
                {localStorage.getItem('USER_PORTAL') == 'serviceCloud' ? null : (
                  <text
                    className="text"
                    style={{ paddingRight: '20px', marginTop: '28px', cursor: 'pointer' }}
                    onClick={this.props.onClose}
                  >
                    CLOSE
                  </text>
                )}
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
























