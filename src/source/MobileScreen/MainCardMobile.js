import React, { Component } from 'react'

export default class MainCardMobile extends Component {
  constructor(props) {
    super(props)
  }
  navigate() {
    if (this.props.name == 'Medical Questionnaire') {
      // this.props.history.replace("/Medical");
    }
  }
  render() {
    return (
      <div
        class="mob_Card-BG text-center"
        // onClick={this.props.onClick}
      >
        <img
          src={this.props.img}
          class="mob_maincard_image_icon"
          //  onClick={()=>this.navigate()}
        />
        <p class="mob_captiontextdiv ">{this.props.name}</p>
      </div>
    )
  }
}
