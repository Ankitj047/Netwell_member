import React, { Component } from 'react'
import '../../WebScreen/WebScreens.css'
import GaugeChart from './GaugeChart'

export default class MobileMyCommunityCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subscribed: false,
      memberDetails: []
    }
  }

  componentDidMount() {}

  render() {
    return (
      //   <div class="contactinfocard">
      //     <div class="myneeds_top_container">
      //       <img src={require('../../Images/Community.svg')} class="CuramLife" />
      //       <div class="myneeds_header_text" style={{ margin: 0 }}>
      //         My Community
      //       </div>
      //     </div>
      //     <div class="">
      //       <div class="contact_infomiddiv text-left" style={{ paddingLeft: 13, paddingRight: 24, paddingBottom: 6 }}>
      //         <div className="Total-members-in-community" style={{ fontWeight: 'bold', fontSize: 12, color: '#8c827a' }}>
      //           Last Month's Snapshot
      //         </div>
      //         <div style={{ display: 'flex', flexDirection: 'row' }}>
      //           <div style={{ flexGrow: 1, marginRight: 10 }}>
      //             <div className="Total-members-in-community" style={{ marginBottom: 0 }}>
      //               Total Members
      //             </div>
      //             <div className="Value_community_card" style={{ marginBottom: 10 }}>
      //               7554
      //             </div>
      //             <div className="Total-members-in-community" style={{ marginTop: 20, marginBottom: 0 }}>
      //               Member Participation
      //             </div>
      //             <div>
      //               <GaugeChart
      //                 id="1"
      //                 backgroundColor={'rgba(235, 87, 87, 0.6)'}
      //                 foregroundColor={'#eb5757'}
      //                 textValue={1745}
      //                 caption={'members'}
      //                 chartPercent={83}
      //               />
      //             </div>
      //           </div>
      //           <div style={{ flexGrow: 1, textAlign: 'center' }}>
      //             <div className="Total-members-in-community" style={{ marginBottom: 0, marginLeft: 24 }}>
      //               # of New Members
      //             </div>
      //             <div className="Value_community_card" style={{ marginBottom: 10, marginLeft: 24 }}>
      //               102
      //             </div>
      //             <div className="Total-members-in-community" style={{ marginLeft: 24, marginTop: 20, marginBottom: 0 }}>
      //               Qualified Needs Paid
      //             </div>
      //             <div>
      //               <GaugeChart
      //                 id="2"
      //                 backgroundColor={'rgba(95, 33, 97, 0.6)'}
      //                 foregroundColor={'#5f2161'}
      //                 textValue={596}
      //                 caption={'needs paid'}
      //                 chartPercent={324}
      //               />
      //               <p className="needs-submitted" style={{ marginLeft: 15, display: 'flex', flexDirection: 'row' }}>
      //                 <div style={{ marginRight: 10 }}>
      //                   <span className="chartSpan" style={{ color: '#9c769a' }}>
      //                     614
      //                   </span>
      //                 </div>
      //                 <div style={{ fontSize: 10 }}> Qualified Needs Submitted</div>
      //               </p>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>

      <div class="mob_contactinfocard" style={{ height: 300, overflow: 'hidden', overflowY: 'hidden' }}>
        <div class=" tab_bottom_border">
          <img src={require('../../Images/Community.svg')} style={{ zIndex: 0 }} />
          <div class="mob_myneeds_header_text" style={{ margin: 0, overflow: 'hidden' }}>
            My Community
          </div>
        </div>
        {/* <div>
          <div
            class="contact_infomiddiv text-left mob_documents_infomiddiv"
            // style={{ paddingLeft: 13, paddingRight: 24, height: 'fit-content' }}
          >
            {/* {this.state.subscribed && (
          <div style={{ margin: 10, paddingBottom: 10 }}>
            <div>
              <span class="Subscribed-Program">Subscribed Program</span>
            </div>
            <div>
              <span class="Value">{`Kelly's Choice Wellness and Nutrition Program`}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 18 }}>
              <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
                <div style={{ width: '50%' }}>
                  <span class="Title">Subscribers</span>
                </div>
                <div>
                  <span class="Title">Effective Date</span>
                </div>
              </div>
              {this.state.memberDetails.map(item => (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
                      <div style={{ width: '50%' }}>
                        <span class="number1">{item.firstName + ' ' + item.lastName}</span>
                      </div>
                      <div>
                        <span class="number1">{item.addOnEffectiveDate}</span>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}  */}
        <div class="">
          <div
            class="contact_infomiddiv text-left"
            style={{ height: 300, paddingLeft: 13, paddingRight: 24, paddingBottom: 6, overflowY: 'hidden' }}
          >
            <div className="Total-members-in-community" style={{ fontWeight: 'bold', fontSize: 12, color: '#8c827a' }}>
              Last Month's Snapshot
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flexGrow: 1, marginRight: 10 }}>
                <div className="Total-members-in-community" style={{ marginBottom: 0 }}>
                  Total Members
                </div>
                <div className="Value_community_card" style={{ marginBottom: 10 }}>
                  7554
                </div>
                <div className="Total-members-in-community" style={{ marginTop: 20, marginBottom: 0 }}>
                  Member Participation
                </div>
                <div>
                  <GaugeChart
                    id="1"
                    backgroundColor={'rgba(235, 87, 87, 0.6)'}
                    foregroundColor={'#eb5757'}
                    textValue={1745}
                    caption={'members'}
                    chartPercent={83}
                  />
                </div>
              </div>
              <div style={{ flexGrow: 1, textAlign: 'center' }}>
                <div className="Total-members-in-community" style={{ marginBottom: 0, marginLeft: 24 }}>
                  # of New Members
                </div>
                <div className="Value_community_card" style={{ marginBottom: 10, marginLeft: 24 }}>
                  102
                </div>
                <div className="Total-members-in-community" style={{ marginLeft: 24, marginTop: 20, marginBottom: 0 }}>
                  Qualified Needs Paid
                </div>
                <div>
                  <GaugeChart
                    id="2"
                    backgroundColor={'rgba(95, 33, 97, 0.6)'}
                    foregroundColor={'#5f2161'}
                    textValue={596}
                    caption={'needs paid'}
                    chartPercent={324}
                  />
                  <p className="needs-submitted" style={{ marginLeft: 15, display: 'flex', flexDirection: 'row' }}>
                    <div style={{ marginRight: 10 }}>
                      <span className="chartSpan" style={{ color: '#9c769a' }}>
                        614
                      </span>
                    </div>
                    <div style={{ fontSize: 10 }}> Qualified Needs Submitted</div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      // </div>
      // </div>
    )
  }
}
