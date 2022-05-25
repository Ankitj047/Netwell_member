import React, { Component } from 'react'
import BackView from './BackView'
import FrontView from './FrontView'

export default class HealthToolsFrontRoot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      encryptUrl: null
    }
    this.changeside = this.changeside.bind(this)
    this.printCardView = this.printCardView.bind(this)
    console.log('HEalthcard PAGE PROPS IS===', this.props)
     }

  changeside() {
    this.props.method(true)
  }

  printCardView = () => {
    // if (localStorage.getItem('USER_PORTAL') == 'serviceCloud') {
    //   this.printDiv()
    // } else {
      window.print()
    // }
  }
  printDiv = () => {
    var printContents = document.getElementById('printableId').innerHTML

    var originalContents = document.body.innerHTML

    document.body.innerHTML = printContents

    window.print()

    document.body.innerHTML = originalContents
  }

  render() {
    return (
      <div className="id-card-front" id="printableId">
        <FrontView
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
          <BackView
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
