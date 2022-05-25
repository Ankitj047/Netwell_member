import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class MobileHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      heading: props.name
    }
  }

  render() {
    return (
      <div className="mobileHeaderWrapper">
        <Link to="/">
          <ArrowBackIcon style={{ width: '24px', height: '24px', color: '#ffffff' }} />
        </Link>
        <div className="mobileHeaderTitle">{this.state.heading} </div>
      </div>
    )
  }
}
