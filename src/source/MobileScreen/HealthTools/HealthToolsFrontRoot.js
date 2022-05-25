import React, { Component } from 'react'
// import IDCardFrontViewMob from './IDCardFrontViewMob';
// import HealthCardBackViewMob from './HealthCardBackViewMob';
import FrontViewMob from './FrontViewMob'
import HealthToolsBackRoot from './HealthToolsBackRoot'
export default class HealthToolsFrontRoot extends Component {
  constructor(props) {
    super(props)

    this.changeside = this.changeside.bind(this)
    this.printCardView = this.printCardView.bind(this)
  }

  changeside() {
    //    alert("gekas")
    this.props.method(true)
  }

  printCardView() {
    alert('printcaard call mob')
    window.print()
  }

  render() {
    return (
      <div className="container id-card-front ">
        <FrontViewMob
          {...this.props}
          printCardView={this.printCardView}
          data={this.props.data}
          changeside={this.changeside}
          showEmpId={this.props.showEmpId}
          network={this.props.network}
          //   templateData={this.props.templateData}
          contactNumber={this.props.contactNumber}
        />

        <div className="hidden printable">
          <HealthToolsBackRoot />
        </div>
      </div>
    )
  }
}
