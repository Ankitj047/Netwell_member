import React, { Component } from 'react'

export default class AccordionViewModal extends Component {
  constructor(props) {
    super(props)
    console.log('AccordionViewModal', this.props)

    this.state = {
      modalData: this.props.dataObj
    }
  }
  render() {
    return (
      <div>
        <p>{this.state.modalData.ExpenseNumberVal}</p>
        <p>{this.state.modalData.ProviderVal}</p>
      </div>
    )
  }
}
