import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React, { Component } from 'react'
import ChatIcon from '../../WebScreen/ChatBox/ChatIcon'
import MobCopyright from '../MobCopyright'
import MobileCuramLifeCard from '../MobileCuramLifeCard'
import MobileFooter from '../MobileFooter'

export default class MobileCuramLifeCardNotification extends Component {
  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    return (
      <div>
        <div class="digitalcard_header" style={{ position: 'fixed', overflow: 'hidden' }}>
          <ArrowBackIcon style={{ width: '24px', height: '24px', color: '#ffffff' }} onClick={() => this.goBack()} />
          <div class="digitalcard_headerdiv" style={{ marginLeft: 10, marginRight: 10 }}>
            UHF / Curam Wellness Center™
          </div>
        </div>
        <div style={{ padding: '35px', marginTop: '10%', height: '75vh' }}>
          <MobileCuramLifeCard />
        </div>

        <div style={{ bottom: '9vh', position: 'relative' }}>
            <ChatIcon showAIChatIcon={true} />
          <ChatIcon />
        </div>
        <div style={{ bottom: '9vh', position: 'relative' }}>
          <MobCopyright />
        </div>
        {/* <MobileFooter /> */}
        <div class="fixed-bottom">
          <MobileFooter />
        </div>
      </div>
    )
  }
}
