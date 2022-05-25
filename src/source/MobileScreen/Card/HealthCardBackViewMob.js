import React, { Component } from 'react'
import IDBackViewMob from './IDCardBackViewMob'
// import IdCardBackPHCS from './IdCardBackPHCS';
export default class HealthCardBackViewMob extends Component {
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
        <IDBackViewMob
          {...this.props}
          changeside={this.changeside}
          network={this.props.network}
          providerNetwork={this.props.providerNetwork}
          contactNumber={this.props.contactNumber}
          cardId={this.props.cardId}
        />
      </div>
    )
  }
}
