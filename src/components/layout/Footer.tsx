import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            <div style={{
                marginTop: '30px',
                position: "fixed",
                bottom: 0,
                width: '100%', textAlign: 'center',
                paddingBottom:'14px',
                backgroundColor: '#eae8db',
                fontFamily: 'PalatinoLinotype-Roman',
                fontSize: '12px',
                fontWeight: 'normal',
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: '1.33',
                letterSpacing: 'normal',
                color: '#333333'
                     
            }}>
                Copyright © 2020 Universal Health Fellowship. All rights reserved.  |  Powered by CarynHealth
            </div>
        )
    }
}

export default Footer
