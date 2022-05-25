import React, { Component } from 'react'
import { deviceType, isMobile, isTablet } from 'react-device-detect'
import { getMyneeds, getSourceID } from './ApiCall'
import MobileHome from './MobileScreen/MobileHome'
import WebHome from './WebScreen/WebHome'

export default class WebMobileRoot extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.myneedsdata()
    this.getSourceIDbyemail()
  }

  getSourceIDbyemail() {
    getSourceID().then(res => {
      console.log('Member source id issss', res.data.memberIdSource)
      localStorage.setItem('sourceid', res.data.memberIdSource)
    })
  }

  myneedsdata() {
    getMyneeds().then(res => {
      console.log('My Needs server response innnn WebRoot mobile', res)

      if (res && res.data.totalrecords > 0) {
        // this.setState({ showmyneeds: true })
        sessionStorage.setItem('myneedsfooter', 'true')
      } else {
        sessionStorage.setItem('myneedsfooter', 'false')
      }
    })
  }

  render() {
    return (
      <div>
        {deviceType == 'browser' && (isMobile == false || isMobile == 'false') && (isTablet == false || isTablet == 'false') ? (
          <WebHome />
        ) : (
          <MobileHome />
        )}

        {/*<BrowserView>*/}
        {/*<WebHome />*/}
        {/*/!* <Dashboard /> *!/*/}
        {/*</BrowserView>*/}
        {/*<MobileView>*/}
        {/*<MobileHome />*/}
        {/*</MobileView>*/}
      </div>
    )
  }
}
