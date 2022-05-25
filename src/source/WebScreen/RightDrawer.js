import React, { Component } from 'react'
import { getOs } from '../../utils/utility'
import { gethealthcard, getRxSimpleShareData } from '../ApiCall'
export default class RightDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      link: 'http://www.mdlive.com/FlexCare',
      fliptLink: '',
      pharmaShow: false
    }
  }

  componentDidMount() {
    gethealthcard().then(resp => {
      let data = {
        memberSSN: resp.data.memberIdCardList[0].memberSSN,
        type: 'family'
      }
      getRxSimpleShareData(data).then(res => {
        if (res && Array.isArray(res)) {
          res.map(value => {
            if (value.addon === 'UHS RxSimpleShare' && value.status === 'AC') this.setState({ pharmaShow: true })
          })
        }
      })
    })
    var os = getOs()
    console.log('==========RIGHT DRAWER IS====', os)

    if (os == 'Mac OS') {
      this.setState({ link: 'http://www.mdlive.com/FlexCare', fliptLink: 'https://apps.apple.com/us/app/flipt/id1329040340' })
    }
    if (os == 'iOS') {
      this.setState({
        link: 'https://apps.apple.com/us/app/mdlive/id839671393',
        fliptLink: 'https://apps.apple.com/us/app/flipt/id1329040340'
      })
    }
    if (os == 'Windows') {
      this.setState({ link: 'http://www.mdlive.com/FlexCare', fliptLink: 'https://fliptrx.com/' })
    }
    if (os == 'Android') {
      this.setState({
        link: 'https://play.google.com/store/apps/details?id=com.mdlive.mobile',
        fliptLink: 'https://play.google.com/store/apps/details?id=com.gwlabs.flipt&hl=en_US&gl=US'
      })
    }
    if (os == 'Linux') {
      this.setState({ link: 'http://www.mdlive.com/FlexCare', fliptLink: 'https://fliptrx.com/' })
    }
  }

  opentelemed() {
    window.open(this.state.link)
  }
  openFlipt = () => {
    window.open(this.state.fliptLink)
  }
  render() {
    return (
      <div class="rightdrawer">
        {/* <div class="rightdrawer_card text-center">
                    <img src={require('../Images/Card/health_services_icon.svg')} style={{height:'84px',width:'84px'}}/>
                    <div class="rightdrawer_card_name">Member Services</div>
              </div> */}

        <div class="rightdrawer_card text-center" onClick={() => this.opentelemed()}>
          <img src={require('../Images/Card/telemed_icon_active.svg')} style={{ height: '84px', width: '84px' }} />
          <div class="rightdrawer_card_name">Telemed</div>
        </div>
        {this.state.pharmaShow && (
          <div class="rightdrawer_card text-center" onClick={() => this.openFlipt()}>
            <img src={require('../../assets/images/pharma_benefits_icon_active.svg')} style={{ height: '84px', width: '84px' }} />
            <div class="rightdrawer_card_name">Pharma</div>
          </div>
        )}
        {/* <div class="rightdrawer_card text-center" >
            <img src={require('../Images/Card/pharma_benefits_icon_active.svg')} style={{height:'84px',width:'84px'}}/>
                    <div class="rightdrawer_card_name">Pharma Benefits</div>
            </div> */}

        {/* <div class="rightdrawer_card text-center">
            <img src={require('../Images/Card/my_vitals_icon.svg')} style={{height:'84px',width:'84px'}}/>
                    <div class="rightdrawer_card_name">My Vitals</div>
            </div> */}

        {/* <div class="rightdrawer_card text-center">
            <img src={require('../Images/Card/health_records_icon.svg')} style={{height:'84px',width:'84px'}}/>
                    <div class="rightdrawer_card_name">Health Records</div>
            </div> */}

        {/* <div class="rightdrawer_card text-center">
            <img src={require('../Images/Card/lab_reports_icon.svg')} style={{height:'84px',width:'84px'}}/>
                    <div class="rightdrawer_card_name">Lab Reports</div>
            </div> */}
      </div>
    )
  }
}
