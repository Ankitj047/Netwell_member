import React from 'react'
class CommonFooter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

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
    return (
      <div style={{ backgroundColor: '#424951', bottom: 0, left: 0, right: 0, position: 'static' }}>
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div>
            <p className="fontStyles footerIcons" style={{ fontSize: '11px', color: '#e5e7ea' }}>
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
    )
  }
}
export default CommonFooter

const SocialIcon = ({ icon, onClick }) => {
  return <img width={35} src={require(`../../assets/media/${icon}`)} style={{ marginRight: 10, cursor: 'pointer' }} onClick={onClick} />
}
