import React, { Component } from 'react'
export default class MainCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div class="Card-BG text-center">
        <img src={this.props.img} class="maincard_image_icon" />
        <p class="captiontextdiv ">{this.props.name}</p>
      </div>
    )
  }
}
