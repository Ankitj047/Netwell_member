import React, { Component } from 'react'
import Modal from 'react-awesome-modal'
export default class ModalAlert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
    this.hanldeSubmit = this.hanldeSubmit.bind(this)
  }
  closeModal() {
    this.setState({
      visible: false
    })
  }

  hanldeSubmit() {
    this.props.handleInput(false)
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <div>
        <Modal visible={this.state.visible} width="50%" effect="fadeInUp">
          <div class="web_alert_diaglog">
            <div class="modal_text">Data not available for selected card </div>
            <div class="web_modal_close_button" onClick={this.hanldeSubmit}>
              Close
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
