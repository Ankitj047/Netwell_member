import React, { Component } from 'react'
import BackViewMob from './BackViewMob'
// import IdCardBackPHCS from './IdCardBackPHCS';
export default class HealthToolsBackRoot extends Component {
  constructor(props) {
    super(props)

    this.changeside = this.changeside.bind(this)
  }

  changeside() {
    this.props.method(true)
  }
  render() {
    return (
      <div>
        <BackViewMob
          {...this.props}
          changeside={this.changeside}
          network={this.props.network}
          contactNumber={this.props.contactNumber}
          cardId={this.props.cardId}
        />
      </div>
    )
  }
}
