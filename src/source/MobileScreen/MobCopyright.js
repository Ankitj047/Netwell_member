import React, { Component } from 'react'

export default class MobCopyright extends Component {
  navigation = val => {
    if (val === 'linkedin') {
      window.open('https://www.linkedin.com/company/universal-healthshare/')
    }
    if (val === 'facebook') {
      window.open('https://www.facebook.com/universalhealthshare')
    }
    if (val === 'instagram') {
      window.open('https://www.instagram.com/universalhealthshare/?hl=en')
    }
    if (val === 'youtube') {
      window.open('https://www.youtube.com/channel/UCRok91gnhqFQMUt9ATnjf3A')
    }
  }
  render() {
    return <div  className="fixed-bottom" style={{  backgroundColor: '#424951', bottom: '0', left: 0, right: 0, position: 'static', zIndex:100, width:'100vw'}}>
    <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '37px'}}>
      <div>
        <p className="fontStyles footerIcons" style={{ fontSize: '11px', color: '#e5e7ea', textAlign:'center' }}>
          Copyright © 2022 Universal Health Fellowship. All rights reserved. | Powered by CarynHealth <br />
          Version 4.1.0
        </p>
      </div>
      <div className="fontStyles footerIcons">
        <SocialIcon icon={'linkedin.svg'} onClick={() => this.navigation('linkedin')} />
        <SocialIcon icon={'facebook.png'} onClick={() => this.navigation('facebook')} />
        <SocialIcon icon={'instagram.png'} onClick={() => this.navigation('instagram')} />
        <SocialIcon icon={'youtube.svg'} onClick={() => this.navigation('youtube')} />
      </div>
    </div>
  </div>
  }
}
const SocialIcon = ({ icon, onClick }) => {
  return <img width={35} src={require(`../../assets/media/${icon}`)} style={{ marginRight: 10, marginTop:10, cursor: 'pointer', zIndex:1029 }} onClick={onClick} />
}