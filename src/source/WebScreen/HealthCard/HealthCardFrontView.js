import React, { Component } from 'react'
import IDBackView from './IDBackView'
import IDCardFrontView from './IDCardFrontView'
export default class HealthCardFrontView extends Component {
  constructor(props) {
    super(props)

    this.changeside = this.changeside.bind(this)
    this.printCardView = this.printCardView.bind(this)
    console.log('HEalthcard PAGE PROPS IS===', this.props)
  }

  changeside() {
        this.props.method(true)
  }

  printCardView() {
        window.print()
  }

  render() {
    return (
      <div className="id-card-front " id="printableId">
        <IDCardFrontView
          {...this.props}
          printCardView={this.printCardView}
          data={this.props.data}
          changeside={this.changeside}
          showEmpId={this.props.showEmpId}
          network={this.props.network}
          contactNumber={this.props.contactNumber}
                  />

        <div className="hidden printable">
          {' '}
          <IDBackView
            {...this.props}
            changeside={this.changeside}
            network={this.props.network}
            contactNumber={this.props.contactNumber}
            cardId={this.props.cardId}
          />{' '}
        </div>
      </div>
    )
  }
}
