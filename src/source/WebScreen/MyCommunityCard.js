import React, { Component } from 'react'
import GaugeChart from './GaugeChart'
import './WebScreens.css'
export default class CuramLifeCard extends Component {
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
      <div class="contactinfocard">
        <div class="myneeds_top_container">
          <img src={require('../Images/Community.svg')} class="CuramLife" />
          <div class="myneeds_header_text" style={{ margin: 0 }}>
            My Community
          </div>
        </div>
        <div class="">
          <div class="contact_infomiddiv text-left" style={{ paddingLeft: 13, paddingRight: 24, paddingBottom: 6 }}>
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
                      <span className="chartSpan" style={{color: '#9c769a'}}>614</span>
                    </div>
                    <div style={{ fontSize: 10 }}> Qualified Needs Submitted</div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
