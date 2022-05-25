import React, { Component } from 'react'

export default class WebFooter extends Component {
  render() {
    return (
      <div class="webfooterdesktop">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '95%' }}>
          <span>Copyright © 2020 Universal Health Fellowship. All rights reserved. | Powered by CarynHealth</span>
        </div>
        <div>Version 4.2.1</div>
      </div>
    )
  }
}
